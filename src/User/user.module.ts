/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { UsersController } from './user.controller'
import { UserService } from './user.service'
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from 'src/config/config.service';
import { User } from 'src/models/user.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports : [
        TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
        TypeOrmModule.forFeature([User]),
        JwtModule.register({
            secret:'ggduhehbhifghfujeijfbferfbhfnedhvbh',
            signOptions:{
                expiresIn:"1d"
            }
        })
    ],
    controllers : [UsersController],
    providers:[UserService]
})

export class UsersModule {}