import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Columns } from './column.model';
import { CreateColumnDto } from './column.dto';

@Injectable()
export class ColumnService {
    constructor(
        @InjectModel(Columns)
        private columnRepository: typeof Columns,
    ) {}

    async findByPk(id: number): Promise<Columns> {
        return this.columnRepository.findByPk(id);
    }

    async create(
        userId: number,
        createColumnDto: CreateColumnDto,
    ): Promise<Columns> {
        return this.columnRepository.create({ ...createColumnDto, userId });
    }

    async findAll(userId: number): Promise<Columns[]> {
        return this.columnRepository.findAll({ where: { userId } });
    }

    async remove(userId: number, id: number): Promise<void> {
        const column = await this.columnRepository.findOne({
            where: { id, userId },
        });
        if (column) {
            await column.destroy();
        }
    }

    async update(id: number, title: string) {
        const column = await this.columnRepository.findOne({
            where: { id: id },
        });

        if (!column) {
            throw new HttpException(
                'Колонка не найдена',
                HttpStatus.BAD_REQUEST,
            );
        }

        column.title = title;
        return column.save();
    }
}
