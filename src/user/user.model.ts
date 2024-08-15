import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType } from 'sequelize-typescript';

interface UserCreateAttrs {
    email: string;
    password: string;
    name: string;
}

@Table({ tableName: 'user' })
export class User extends Model<User, UserCreateAttrs> {
    @ApiProperty({ example: '1', description: 'Уникальный индентификатор' })
    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: 'login@trello.ru',
        description: 'Логин пользователя',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: number;

    @ApiProperty({ example: '12345678', description: 'Пароль пользователя' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: number;

    @ApiProperty({ example: 'IvanovIvan', description: 'Имя пользователя' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: number;
}
