import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Columns } from './column.model';
import { CreateColumnDto } from './column.dto';
import { Cards } from '../cards/cards.model';
import { Comments } from '../comments/comments.model';

@Injectable()
export class ColumnService {
    constructor(
        @InjectModel(Columns)
        private columnsRepository: typeof Columns,
    ) {}

    async findByPk(id: number): Promise<Columns> {
        return this.columnsRepository.findByPk(id);
    }

    async create(
        userId: number,
        createColumnDto: CreateColumnDto,
    ): Promise<Columns> {
        return this.columnsRepository.create({ ...createColumnDto, userId });
    }

    async findAll(userId: number): Promise<Columns[]> {
        return this.columnsRepository.findAll({
            where: { userId },
            include: [{ model: Cards, include: [{ model: Comments }] }],
        });
    }

    async remove(userId: number, id: number): Promise<HttpStatus> {
        const column = await this.columnsRepository.findOne({
            where: { id, userId },
        });

        await column.destroy();
        return HttpStatus.OK;
    }

    async update(id: number, title: string): Promise<Columns> {
        const column = await this.columnsRepository.findOne({
            where: { id: id },
        });

        column.title = title;
        return column.save();
    }
}
