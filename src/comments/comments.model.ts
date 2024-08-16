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
export class Comments extends Model<Comment> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    content: string;

    @ForeignKey(() => Cards)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    cardId: number;

    @ForeignKey(() => User)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    userId: number;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;

    @BelongsTo(() => Cards)
    card: Cards;

    @BelongsTo(() => User)
    user: User;
}
