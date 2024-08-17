import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
    HasMany,
} from 'sequelize-typescript';
import { Columns } from '../column/column.model';
import { Comments } from '../comments/comments.model';
import { User } from '../user/user.model';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'cards', timestamps: false })
export class Cards extends Model<Cards> {
    @ApiProperty({
        example: '1',
        description: 'Уникальный идентификатор карточки',
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({ example: 'Заголовок', description: 'Заголовок карточки' })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @ApiProperty({ example: 'Описание', description: 'Описание карточки' })
    @Column({
        type: DataType.TEXT,
    })
    description: string;

    @ApiProperty({
        example: '1',
        description: 'Идентификатор колонки, к которой относится карточка',
    })
    @ForeignKey(() => Columns)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    columnId: number;

    @ApiProperty({
        example: '1',
        description: 'Идентификатор пользователя, который создал карточку',
    })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @ApiProperty({
        example: '2024-08-17T10:59:25.704Z',
        description: 'Дата и время создания карточки',
    })
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;

    @ApiProperty({
        type: () => Columns,
        description: 'Колонка, к которой относится карточка',
    })
    @BelongsTo(() => Columns)
    column: Columns;

    @ApiProperty({
        type: () => User,
        description: 'Пользователь, который создал карточку',
    })
    @BelongsTo(() => User)
    user: User;

    @ApiProperty({
        type: () => [Comments],
        description: 'Список комментариев, связанных с карточкой',
    })
    @HasMany(() => Comments)
    comments: Comments[];
}
