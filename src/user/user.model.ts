import { ApiProperty } from '@nestjs/swagger';
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Comments } from '../comments/comments.model';
import { Columns } from '../column/column.model';

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
    email: string;

    @ApiProperty({ example: '12345678', description: 'Пароль пользователя' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @ApiProperty({ example: 'IvanovIvan', description: 'Имя пользователя' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @HasMany(() => Columns)
    columns: Columns[];

    @HasMany(() => Comments)
    comments: Comments[];
}
