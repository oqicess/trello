import { ApiProperty } from '@nestjs/swagger';
import {
    Table,
    Column,
    Model,
    DataType,
    ForeignKey,
    BelongsTo,
} from 'sequelize-typescript';
import { Cards } from '../cards/cards.model';
import { User } from '../user/user.model';

@Table({ tableName: 'comments', timestamps: false })
export class Comments extends Model<Comments> {
    @ApiProperty({
        example: '1',
        description: 'Уникальный идентификатор комментария',
    })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @ApiProperty({
        example: 'Комментарий',
        description: 'Содержимое комментария',
    })
    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    content: string;

    @ApiProperty({
        example: '1',
        description: 'ID карточки, к которой относится комментарий',
    })
    @ForeignKey(() => Cards)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    cardId: number;

    @ApiProperty({
        example: '1',
        description: 'ID пользователя, который оставил комментарий',
    })
    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @ApiProperty({
        example: '2024-08-17T12:34:56Z',
        description: 'Дата и время создания комментария',
    })
    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;

    @ApiProperty({
        type: () => Cards,
        description: 'Карточка, к которой относится комментарий',
    })
    @BelongsTo(() => Cards)
    card: Cards;

    @ApiProperty({
        type: () => User,
        description: 'Пользователь, который оставил комментарий',
    })
    @BelongsTo(() => User)
    user: User;
}
