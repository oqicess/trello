import { Module, forwardRef } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Cards } from './cards.model';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../auth/auth.module';
import { CommentsModule } from '../comments/comments.module';
import { ColumnModule } from '../column/column.module';
import { Columns } from '../column/column.model';
import { Comments } from '../comments/comments.model';

@Module({
    imports: [
        SequelizeModule.forFeature([Cards, Columns, Comments]),
        JwtModule,
        forwardRef(() => CommentsModule),
        forwardRef(() => AuthModule),
        forwardRef(() => ColumnModule),
    ],
    providers: [CardsService],
    controllers: [CardsController],
    exports: [CardsService],
})
export class CardsModule {}
