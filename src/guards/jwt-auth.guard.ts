import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}

    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException({
                message: 'Пользователь не авторизован',
            });
        }
        const [bearer, token] = authHeader.split(' ');

        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({
                message: 'Пользователь не авторизован',
            });
        }

        try {
            const user = this.jwtService.verify(token);
            req.user = user;
            return true;
        } catch (error) {
            if (error.name === 'TokenExpiredError') {
                throw new UnauthorizedException('Token has expired');
            }
            if (error.name === 'JsonWebTokenError') {
                throw new UnauthorizedException('Invalid token');
            }
            throw new UnauthorizedException('Authorization failed');
        }
    }
}
