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

        if (req.user.id !== parseInt(req.params.userId)) {
            throw new ForbiddenException('Недостаточно прав');
        }

        return true;
    }
}
