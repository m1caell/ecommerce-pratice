import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import environment from './config/environment';

const { port, database } = environment();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Server is running on: http://localhost:${port}`);
  console.log(`Database is running on: ${database.host}:${database.port}`);
}
bootstrap();
