import { Injectable } from '@nestjs/common';
import { Cards } from './cards.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class CardsService {
    constructor(
        @InjectModel(Cards)
        private cardsRepository: typeof Cards,
    ) {}

    async findByPk(id: number) {
        return this.cardsRepository.findByPk(id);
    }
}
