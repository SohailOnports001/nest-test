/* eslint-disable prettier/prettier */
import { 
    Controller,
    Post, 
    Body,
    Headers,
    BadRequestException,
    UnauthorizedException
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt';

@Controller('/user')
export class UsersController{
    constructor(
        private readonly userServices: UserService,
        private jwtService: JwtService
        ){
        // console.log("User");
    }
    @Post('/register')
    async registerUser(
        @Body('email') userEmail :string,
        @Body('pass') userPassword :string,
    ){
        console.log("Register");
        const uniqueId = new Date().getTime().toString(); 
        const payload = {email:userEmail,uuid:uniqueId};
        const token = await this.jwtService.sign(payload);
        const hashedPassword = await bcrypt.hash(userPassword,12)
        const result = await this.userServices.registerUser(
            uniqueId,
            userEmail,
            hashedPassword,
            token
        );
        return {uuid:result.uuid,token:result.access_token}
    }

    @Post('login')
    async loginUser(
        @Body('email') userEmail :string,
        @Body('pass') userPassword :string,
    )
    {
        console.log("Login");
        const user = await this.userServices.loginUser({email:userEmail});
        if(!user)
        {
            throw new BadRequestException("User Not Found");
        }
        if(!await bcrypt.compare(userPassword,user.password))
        {
            throw new BadRequestException("Password unmatch");
        }
        const payload = {email:user.email,uuid:user.uuid};
        const token = await this.jwtService.sign(payload);
        await this.userServices.updateToken({uuid:user.uuid,access_token:token})
        return token;    
    }

    @Post('autoSignIn')
    async autoSignIn(
        @Headers('authorization') token:any
    ){
        console.log("autoSignIn");
        console.log(token)
        token = token.split(" ")[1];
        const user = await this.userServices.loginUser({access_token:token});
        if(!user)
        {
            throw new BadRequestException("User Not Found");
        }
        const isValid = await this.jwtService.verify(token);
        // console.log("Is Valid : ",isValid.TokenExpiredError);
        if(isValid)
        {
            const payload = {email:user.email,uuid:user.uuid};
            const token = await this.jwtService.sign(payload);
            await this.userServices.updateToken({uuid:user.uuid,access_token:token})
            return token;    
        }
        else
        {
            throw new UnauthorizedException("Invalid Token");
        }
        // return user;
    }
}