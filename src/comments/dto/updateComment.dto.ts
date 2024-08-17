import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCommentDto {
    @ApiPropertyOptional({ example: 'Заголовок' })
    @IsNotEmpty()
    @IsString({ message: 'Должно быть строкой' })
    content: string;
}
