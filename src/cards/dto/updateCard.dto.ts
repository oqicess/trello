import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCardDto {
    @ApiPropertyOptional({ example: 'Заголовок' })
    @IsNotEmpty()
    @IsString({ message: 'Должно быть строкой' })
    @IsOptional()
    title?: string;

    @ApiPropertyOptional({ example: 'Описание' })
    @IsString({ message: 'Должно быть строкой' })
    @IsOptional()
    description?: string;
}
