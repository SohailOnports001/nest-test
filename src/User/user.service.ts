/* eslint-disable prettier/prettier */
import {
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { UserModel} from './user.model';
import { User } from "../models/user.entity";
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UserService{
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ){

    }
    // private users: UserModel[] = [];

    async registerUser(
        uniqueId:string,
        userEmail:string,
        hashedPassword:string,
        token:string
    ) : Promise<User> {
        // const uniqueId = new Date().getTime().toString();
        const newUser = new UserModel(uniqueId,userEmail,hashedPassword,token);
        console.log("New User : ",newUser);
        return this.userRepository.save(newUser);
        // this.users.push(newUser);
        // return uniqueId;
    }

    async loginUser(
        condition:any
    ) : Promise<User>
    {
        return this.userRepository.findOne(condition)
    }

    async updateToken(
        condition:any
    ): Promise<UpdateResult>
    {
        return this.userRepository.update(condition.uuid,{access_token:condition.access_token})
    }
}