import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comments } from './comments.model';
import { CardsModule } from '../cards/cards.module';
import { ColumnModule } from '../column/column.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Comments]),
        forwardRef(() => CardsModule),
        forwardRef(() => ColumnModule),
        forwardRef(() => AuthModule),
    ],
    providers: [CommentsService],
    controllers: [CommentsController],
    exports: [CommentsService],
})
export class CommentsModule {}
