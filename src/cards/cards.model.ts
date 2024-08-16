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

@Table({ tableName: 'cards', timestamps: false })
export class Cards extends Model<Cards> {
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    title: string;

    @Column({
        type: DataType.TEXT,
    })
    description: string;

    @ForeignKey(() => Columns)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    columnId: number;

    @Column({
        type: DataType.DATE,
        defaultValue: DataType.NOW,
    })
    createdAt: Date;

    @BelongsTo(() => Columns)
    column: Columns;

    @HasMany(() => Comments)
    comments: Comments[];
}
