import { Module, forwardRef } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Cards } from './cards.model';
import { JwtModule } from '@nestjs/jwt';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { CommentsModule } from 'src/comments/comments.module';

@Module({
    providers: [CardsService],
    controllers: [CardsController],
    exports: [CardsService],
    imports: [
        SequelizeModule.forFeature([Cards]),
        JwtModule,
        forwardRef(() => AuthModule),
        CommentsModule,
    ],
})
export class CardsModule {}
