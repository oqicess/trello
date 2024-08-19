import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from './comments.model';
import { CreateCommentDto } from './dto/createComment.dto';
import { CardsService } from '../cards/cards.service';
import { UpdateCommentDto } from './dto/updateComment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comments)
        private commentsRepository: typeof Comments,
        private cardsService: CardsService,
    ) {}

    async findAll(userId: number): Promise<Comments[]> {
        return this.commentsRepository.findAll({
            where: { userId },
        });
    }

    async findByPk(id: number) {
        return this.commentsRepository.findByPk(id);
    }

    async create(userId: number, dto: CreateCommentDto): Promise<Comments> {
        const card = await this.cardsService.findByPk(dto.cardId);

        if (!card) {
            throw new NotFoundException('Карточки не существует');
        }

        return this.commentsRepository.create({ ...dto, userId });
    }

    async remove(userId: number, id: number): Promise<HttpStatus> {
        const cards = await this.commentsRepository.findOne({
            where: { id, userId },
        });

        if (!cards) {
            throw new NotFoundException('Карточки не существует');
        }

        await cards.destroy();
        return HttpStatus.OK;
    }

    async update(id: number, dto: UpdateCommentDto): Promise<Comments> {
        const cards = await this.commentsRepository.findOne({
            where: { id },
        });

        if (!cards) {
            throw new NotFoundException('Карточки не существует');
        }

        cards.content = dto.content;

        return cards.save();
    }
}
