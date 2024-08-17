import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateColumnDto {
    @ApiPropertyOptional({ example: 'Заголовок' })
    @IsNotEmpty()
    @IsString({ message: 'Должно быть строкой' })
    title: string;
}
