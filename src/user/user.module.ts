import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { User } from './user.model';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [SequelizeModule.forFeature([User]), forwardRef(() => AuthModule)],
    exports: [UserService],
})
export class UserModule {}
