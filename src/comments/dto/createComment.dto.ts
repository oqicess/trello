import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
    @ApiPropertyOptional({ example: 'Заголовок' })
    @IsNotEmpty()
    @IsString({ message: 'Должно быть строкой' })
    content: string;

    @ApiPropertyOptional({ example: 1 })
    @IsNotEmpty()
    @IsNumber({}, { message: 'Должно быть числом' })
    cardId: number;
}
