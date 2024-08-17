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
import { Comments } from '../comments/comments.model';
import { Cards } from '../cards/cards.model';
import { Columns } from '../column/column.model';

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
        const [api, controller, user, type, id] = req.path
            .split('/')
            .filter(Boolean);

        let entity: Columns | Comments | Cards;
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
            throw new NotFoundException('Объект не найден');
        }

        if (entity.userId !== userId) {
            throw new ForbiddenException('Недостаточно прав');
        }

        return true;
    }
}
