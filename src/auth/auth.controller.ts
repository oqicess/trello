import {
    Body,
    Controller,
    HttpStatus,
    Post,
    Req,
    Res,
    UnauthorizedException,
    UsePipes,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginUserDto } from './dto/login.dto';
import { Request, Response } from 'express';
import { RegisterUserDto } from './dto/register.dto';
import { ValidationPipe } from 'src/pipes/validation.pipe';

@ApiTags('auth-controller')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @ApiOperation({ summary: 'Авторизация пользователя' })
    @UsePipes(ValidationPipe)
    @Post('/login')
    async login(
        @Body() dto: LoginUserDto,
        @Res({ passthrough: true }) res: Response,
    ): Promise<any> {
        const { refreshToken, ...response } = await this.authService.login(dto);
        this.authService.addRefreshTokenToResponse(res, refreshToken);

        return response;
    }

    @ApiOperation({ summary: 'Регистрация пользователя' })
    @Post('/registration')
    @UsePipes(ValidationPipe)
    async registration(@Body() dto: RegisterUserDto): Promise<HttpStatus> {
        await this.authService.registration(dto);

        return HttpStatus.OK;
    }

    @ApiOperation({ summary: 'Генерация токенов' })
    @Post('login/access-token')
    async getNewTokens(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        const refreshTokenFromCookies =
            req.cookies[this.authService.REFRESH_TOKEN_NAME];

        if (!refreshTokenFromCookies) {
            this.authService.removeRefreshTokenToResponse(res);
            throw new UnauthorizedException('Refresh token not passed');
        }

        const { refreshToken, ...response } =
            await this.authService.getNewTokens(refreshTokenFromCookies);
        this.authService.addRefreshTokenToResponse(res, refreshToken);

        return response;
    }

    @ApiOperation({ summary: 'Выход пользователя' })
    @Post('/logout')
    async logout(@Res({ passthrough: true }) res: Response) {
        this.authService.removeRefreshTokenToResponse(res);

        return true;
    }
}
