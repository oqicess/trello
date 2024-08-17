import { Module, forwardRef } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserController } from './user.controller';
import { User } from './user.model';
import { UserService } from './user.service';
import { AuthModule } from '../auth/auth.module';
import { ColumnService } from 'src/column/column.service';
import { Columns } from '../column/column.model';

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports: [SequelizeModule.forFeature([User]), forwardRef(() => AuthModule)],
    exports: [UserService],
})
export class UserModule {}
