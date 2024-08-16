import { Module } from '@nestjs/common';
import { User } from './user/user.model';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { ColumnModule } from './column/column.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { Columns } from './column/column.model';
import { Cards } from './cards/cards.model';
import { Comments } from './comments/comments.model';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            username: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB,
            models: [User, Columns, Cards, Comments],
            autoLoadModels: true,
            logging: false,
        }),
        AuthModule,
        UserModule,
        ColumnModule,
        CardsModule,
        CommentsModule,
    ],
    controllers: [],
    providers: [],
})
export class AppModule {}
