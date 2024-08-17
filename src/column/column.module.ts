import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { Columns } from './column.model';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';
import { CommentsModule } from '../comments/comments.module';
import { CardsModule } from '../cards/cards.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Columns]),
        JwtModule,
        forwardRef(() => AuthModule),
        forwardRef(() => CommentsModule),
        forwardRef(() => CardsModule),
    ],
    providers: [ColumnService],
    controllers: [ColumnController],
    exports: [ColumnService],
})
export class ColumnModule {}
