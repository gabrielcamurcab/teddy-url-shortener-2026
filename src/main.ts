import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const packageJson = JSON.parse(readFileSync('package.json', 'utf-8'));

  const config = new DocumentBuilder()
    .setTitle('URL Shortener API')
    .setDescription('URL Shortener API')
    .setVersion(packageJson.version)
    .addBearerAuth()
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);


  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
