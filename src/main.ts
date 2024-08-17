import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
    const PORT = process.env.PORT || 8001;
    const docs = new DocumentBuilder()
        .setTitle('Тестовое задание')
        .setDescription('Описание проекта')
        .addTag('github: oqicess')
        .addBearerAuth()
        .build();
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api');
    const document = SwaggerModule.createDocument(app, docs);
    SwaggerModule.setup('/api/docs', app, document);

    app.enableCors({
        origin: ['http://localhost:8080'],
        credentials: true,
    });

    await app.listen(PORT, () =>
        console.log(`Server started on port = ${PORT}`),
    );
}

start();
