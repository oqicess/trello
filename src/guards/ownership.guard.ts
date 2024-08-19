import {
    CanActivate,
    ExecutionContext,
    Injectable,
    ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class ColumnOwnershipGuard implements CanActivate {
    constructor() {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        if (req.user.id !== parseInt(req.params.userId)) {
            throw new ForbiddenException('Недостаточно прав');
        }

        return true;
    }
}
