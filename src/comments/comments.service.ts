import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Comments } from './comments.model';

@Injectable()
export class CommentsService {
    constructor(
        @InjectModel(Comments)
        private commentsRepository: typeof Comments,
    ) {}

    async findByPk(id: number) {
        return this.commentsRepository.findByPk(id);
    }
}
