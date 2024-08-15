import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}

    async getUserByEmail(email: string): Promise<User> {
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
}
