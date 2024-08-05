import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import environment from './config/environment';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const { port, database } = environment();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Ecommerce API')
    .setDescription('This is the Ecommerce API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    deepScanRoutes: true,
  });
  SwaggerModule.setup('api', app, document);

  await app.listen(port);

  console.log(`Server is running on: http://localhost:${port}`);
  console.log(`Database is running on: ${database.host}:${database.port}`);
}
bootstrap();
