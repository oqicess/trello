import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ColumnService } from './column.service';
import { ColumnController } from './column.controller';
import { Columns } from './column.model';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';
import { Comments } from 'src/comments/comments.model';
import { Cards } from 'src/cards/cards.model';
import { CommentsModule } from 'src/comments/comments.module';
import { CardsModule } from 'src/cards/cards.module';

@Module({
    imports: [
        SequelizeModule.forFeature([Columns, Comments, Cards]),
        JwtModule,
        forwardRef(() => AuthModule),
        CommentsModule,
        CardsModule,
    ],
    providers: [ColumnService],
    controllers: [ColumnController],
    exports: [ColumnService],
})
export class ColumnModule {}
