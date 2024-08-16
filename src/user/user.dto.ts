import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class UserDto {
    @ApiPropertyOptional({ example: 'oqicess@trello.ru' })
    @IsOptional()
    @IsEmail({}, { message: 'Неправильный формат логина' })
    readonly email?: string;

    @ApiPropertyOptional({ example: '12345678' })
    @IsOptional()
    @IsString({ message: 'Должно быть строкой' })
    @MinLength(8, { message: 'Пароль должен быть не меньше 8 символов' })
    readonly password?: string;

    @ApiPropertyOptional({ example: 'Andrey' })
    @IsOptional()
    @MinLength(4, { message: 'Имя должно быть не меньше 4 символов' })
    @IsString({ message: 'Должно быть строкой' })
    readonly name?: string;
}
