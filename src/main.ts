import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({whitelist : true, disableErrorMessages: false}));

  app.setGlobalPrefix('api/v1')


  const port = process.env.PROJECT_PORT;
  await app.listen(port, ()=>{ console.log( `Project listening on port ${port}`)});
}
bootstrap();
