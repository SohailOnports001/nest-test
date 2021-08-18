/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductServices } from './products.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from '../Config/config.service';
import { Products } from '../models/products.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports : [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([Products]),
        JwtModule.register({
            secret:'ggduhehbhifghfujeijfbferfbhfnedhvbh',
            signOptions:{
                expiresIn:"1d"
            }
        })
    ],
    controllers : [ProductsController],
    providers:[ProductServices]
})

export class ProductsModule {}