import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsString, Length, MinLength } from 'class-validator';

export class LoginUserDto {
    @ApiPropertyOptional({ example: 'oqicess@trello.ru' })
    @IsString({ message: 'Должно быть строкой' })
    @IsEmail({}, { message: 'Неправильный формат логина' })
    readonly email: string;

    @IsString({ message: 'Должно быть строкой' })
    @MinLength(8, { message: 'Пароль должен быть не меньше 8 символов' })
    @ApiPropertyOptional({ example: '12345678' })
    readonly password: string;
}
