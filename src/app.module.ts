/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './Products/products.module';
import { UsersModule } from './User/user.module';
// import { JwtModule } from '@nestjs/jwt';
// import { configService } from './config/config.service';
// import { User } from './models/user.entity';

@Module({
  imports: [
    // TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    // TypeOrmModule.forFeature([User]),
    UsersModule,
    ProductsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
