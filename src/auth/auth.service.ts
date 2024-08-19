import {
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { LoginUserDto } from './dto/login.dto';
import { Response } from 'express';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { RegisterUserDto } from './dto/register.dto';

@Injectable()
export class AuthService {
    EXPIRE_DAY_REFRESH_TOKEN = 1;
    REFRESH_TOKEN_NAME = 'refreshToken';

    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async login(
        userDto: LoginUserDto,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const user = await this.validateUser(userDto);
        return this.generateToken(user);
    }

    async registration(
        userDto: RegisterUserDto,
    ): Promise<{ accessToken: string }> {
        const candidate = await this.userService.getUserByEmail(userDto.email);

        if (candidate)
            throw new HttpException(
                'Пользоватеь с таким email уже существует',
                HttpStatus.BAD_REQUEST,
            );
        const hashPassword = await bcrypt.hash(userDto.password, 5);
        const user = await this.userService.createUser({
            ...userDto,
            password: hashPassword,
        });
        return this.generateToken(user);
    }

    private async generateToken(
        user: User,
    ): Promise<{ accessToken: string; refreshToken: string }> {
        const payload = {
            email: user.email,
            id: user.id,
        };
        return {
            accessToken: this.jwtService.sign(payload, {
                expiresIn: '1h',
            }),
            refreshToken: this.jwtService.sign(payload, {
                expiresIn: '24h',
            }),
        };
    }

    private async validateUser(userDto: LoginUserDto): Promise<User> {
        const user = await this.userService.getUserByEmail(userDto.email);

        if (!user) {
            throw new HttpException(
                'Пользователь не найден',
                HttpStatus.BAD_REQUEST,
            );
        }

        const passwordEquals = await bcrypt.compare(
            userDto.password,
            user.password,
        );

        if (user && passwordEquals) {
            return user;
        }

        throw new UnauthorizedException({
            message: 'Неверный логин или пароль',
        });
    }

    async getNewTokens(refreshToken: string) {
        const result = await this.jwtService.verify(refreshToken);

        if (!result) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const user = await this.userService.getUserByEmail(result.email);
        const tokens = this.generateToken(user);
        return tokens;
    }

    addRefreshTokenToResponse(res: Response, refreshToken: string) {
        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

        if (process.env.NODE_ENV === 'development') {
            res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
                httpOnly: true,
                domain: 'localhost',
                expires: expiresIn,
                sameSite: 'none',
            });
        } else {
            res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
                httpOnly: true,
                domain: 'localhost',
                expires: expiresIn,
                secure: true,
                sameSite: 'lax',
            });
        }
    }

    removeRefreshTokenToResponse(res: Response) {
        if (process.env.NODE_ENV === 'development') {
            res.cookie(this.REFRESH_TOKEN_NAME, '', {
                httpOnly: true,
                domain: 'localhost',
                expires: new Date(0),
                sameSite: 'none',
            });
        } else {
            res.cookie(this.REFRESH_TOKEN_NAME, '', {
                httpOnly: true,
                domain: 'localhost',
                expires: new Date(0),
                secure: true,
                sameSite: 'lax',
            });
        }
    }
}
