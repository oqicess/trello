import { Module, forwardRef } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comments } from './comments.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    controllers: [CommentsController],
    providers: [CommentsService],
    imports: [
        SequelizeModule.forFeature([Comments]),
        forwardRef(() => AuthModule),
    ],
    exports: [CommentsService],
})
export class CommentsModule {}
