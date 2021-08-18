/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
require("dotenv").config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const PORT = process.env.PORT || 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  await app.listen(PORT,()=>
  {
    console.log("Started");
  });
}
bootstrap();
