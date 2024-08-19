import {
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { Cards } from './cards.model';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCardDto } from './dto/createCard.dto';
import { UpdateCardDto } from './dto/updateCard.dto';
import { ColumnService } from '../column/column.service';
import { Comments } from '../comments/comments.model';

@Injectable()
export class CardsService {
    constructor(
        @InjectModel(Cards)
        private cardsRepository: typeof Cards,
        private columnsService: ColumnService,
    ) {}

    async findAll(userId: number): Promise<Cards[]> {
        return this.cardsRepository.findAll({
            where: { userId },
            include: [{ model: Comments }],
        });
    }

    async findByPk(id: number): Promise<Cards> {
        return this.cardsRepository.findByPk(id);
    }

    async create(userId: number, dto: CreateCardDto): Promise<Cards> {
        const column = await this.columnsService.findByPk(dto.columnId);

        if (!column) {
            throw new NotFoundException('Колонки не существует');
        }

        return this.cardsRepository.create({ ...dto, userId });
    }

    async remove(userId: number, id: number): Promise<HttpStatus> {
        const cards = await this.cardsRepository.findOne({
            where: { id, userId },
        });

        if (!cards) {
            throw new HttpException(
                'Карточка не найдена',
                HttpStatus.NOT_FOUND,
            );
        }

        await cards.destroy();
        return HttpStatus.OK;
    }

    async update(id: number, dto: UpdateCardDto): Promise<Cards> {
        const cards = await this.cardsRepository.findOne({
            where: { id },
        });

        if (!cards) {
            throw new HttpException(
                'Карточка не найдена',
                HttpStatus.NOT_FOUND,
            );
        }

        cards.description = dto.description;
        cards.title = dto.title;

        return cards.save();
    }
}
