import { ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterUserDto {
    @ApiPropertyOptional({ example: 'oqicess@trello.ru' })
    readonly email: string;

    @ApiPropertyOptional({ example: '12345678' })
    readonly password: string;
    
    @ApiPropertyOptional({ example: 'oqicess' })
    readonly name: string;
}
