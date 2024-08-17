import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class RegisterUserDto {
    @ApiPropertyOptional({ example: 'oqicess@trello.ru' })
    @IsString({ message: 'Должно быть строкой' })
    readonly email: string;

    @ApiPropertyOptional({ example: '12345678' })
    @IsString({ message: 'Должно быть строкой' })
    readonly password: string;

    @ApiPropertyOptional({ example: 'oqicess' })
    @IsString({ message: 'Должно быть строкой' })
    readonly name: string;
}
