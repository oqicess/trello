import { ApiProperty } from '@nestjs/swagger';
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Cards } from '../cards/cards.model';

@Table({ tableName: 'columns', timestamps: false })
export class Columns extends Model<Columns> {
    @ApiProperty({
        example: '1',
        description: 'Уникальный идентификатор колонки',
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'Таски', description: 'Название колонки' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @ApiProperty({
        example: '1',
        description: 'ID пользователя, которому принадлежит колонка',
    })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @ApiProperty({
        example: '2024-08-17T12:34:56Z',
        description: 'Дата и время создания колонки',
    })
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;

    @ApiProperty({
        type: () => User,
        description: 'Пользователь, которому принадлежит колонка',
    })
    @BelongsTo(() => User)
    user: User;

    @ApiProperty({
        type: () => [Cards],
        description: 'Список карточек, принадлежащих колонке',
    })
    @HasMany(() => Cards)
    cards: Cards[];
}
