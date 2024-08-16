import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
    NotFoundException,
} from '@nestjs/common';
import { ColumnService } from '../column/column.service';
import { CommentsService } from '../comments/comments.service';
import { CardsService } from '../cards/cards.service';

@Injectable()
export class ColumnOwnershipGuard implements CanActivate {
    constructor(
        private readonly columnService: ColumnService,
        private readonly commentService: CommentsService,
        private readonly cardService: CardsService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const userId = parseInt(req.params.userId);
        const columnId = req.params.id;
        const [controller, user, type, id] = req.path
            .split('/')
            .filter(Boolean);

        let entity;
        switch (type) {
            case 'columns':
                entity = await this.columnService.findByPk(columnId);
                break;
            case 'comments':
                entity = await this.commentService.findByPk(columnId);
                break;
            case 'cards':
                entity = await this.cardService.findByPk(columnId);
                break;
            default:
                throw new NotFoundException('Тип сущности не найден');
        }

        if (!entity) {
            throw new NotFoundException('Сущность не найдена');
        }

        if (entity.userId !== userId) {
            throw new ForbiddenException('Недостаточно прав');
        }

        return true;
    }
}
