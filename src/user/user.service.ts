import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcryptjs';
import { UserDto } from './user.dto';
import { Cards } from 'src/cards/cards.model';
import { Comments } from 'src/comments/comments.model';
import { Columns } from 'src/column/column.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    getById(id: number): Promise<User> {
        return this.userRepository.findOne({
            where: { id: id },
            attributes: ['id', 'email', 'name', 'createdAt'],
            include: [
                { model: Columns, include: [{ model: Cards }] },
                { model: Comments },
            ],
        });
    }

    getUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOne({
            where: {
                email: email,
            },
            attributes: ['id', 'email', 'password'],
        });
    }

    async createUser(dto): Promise<User> {
        try {
            const existingUser = await this.userRepository.findOne({
                where: { email: dto.email },
            });

            if (existingUser) {
                throw new HttpException(
                    'Пользователь с таким E-mail уже существует',
                    HttpStatus.BAD_REQUEST,
                );
            }

            return this.userRepository.create(dto);
        } catch (error) {
            throw new HttpException(
                'Ошибка при создании пользователя',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    async update(id: number, dto: UserDto) {
        let data = dto;

        if (dto.password) {
            data = { ...dto, password: await bcrypt.hash(dto.password, 5) };
        }

        return this.userRepository.update(data, { where: { id: id } });
    }
}
