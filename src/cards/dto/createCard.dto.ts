import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateCardDto {
    @ApiPropertyOptional({ example: 'Заголовок' })
    @IsNotEmpty()
    @IsString({ message: 'Должно быть строкой' })
    title: string;

    @ApiPropertyOptional({ example: 'Описание' })
    @IsString({ message: 'Должно быть строкой' })
    @IsOptional()
    description?: string;

    @ApiPropertyOptional({ example: 1 })
    @IsNotEmpty()
    @IsNumber({}, { message: 'Должно быть числом' })
    columnId: number;

    @ApiPropertyOptional({ example: 1 })
    @IsNotEmpty()
    @IsNumber({}, { message: 'Должно быть числом' })
    userId: number;
}
