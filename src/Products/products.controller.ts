/* eslint-disable prettier/prettier */
import { 
    Controller,
    Get,
    Post, 
    Body,
    Headers,
    Query,
    Delete,
    Patch,
    BadRequestException,
    UnauthorizedException,
    NotFoundException
} from '@nestjs/common';
import { ProductServices } from './products.service';
import { JwtService } from '@nestjs/jwt';

@Controller('/products')
export class ProductsController{
    constructor(
        private readonly productServices: ProductServices,
        private jwtService : JwtService
        ){
        console.log("Products");
    }
    
    @Get('getAllProducts')
    async getAllProducts()
    {
        const result =  this.productServices.getAllProducts();
        return result;
    }

    @Get('getProduct')
    async getProductById(
        @Query('owner') owner:string,
        @Headers('authorization') token:string
    )
    {
        console.log("getProducts")
        token = token.split(" ")[1];
        try{
            const isValid = await this.jwtService.verify(token);
            const result = await this.productServices.getProductsByOwnerId({owner:owner});
            if(result.length>0)
            {
                return result;
            }
            else
            {
                throw new NotFoundException("No data Found")
            }
        }
        catch(error)
        {
            throw new UnauthorizedException("Token Invalid or Expired")
        }
    }

    @Get('getProductInfo')
    async getProductInfo(
        @Query("productid") productid : string
    )
    {
        const result = await this.productServices.getProductInfo({uuid:productid})
        if(result)
        {
            return result;
        }
        else{
            throw new NotFoundException("No Data Found")
        }
    }

    @Post('createProduct')
    async createProduct(
        @Body('name') name:string,
        @Body('description') description:string,
        @Body('owner') owner:string,
    )
    {
        const uniqueId = new Date().getTime().toString(); 
        const result = await this.productServices.createProducts(uniqueId,name,description,owner);
        return result
    }

    @Delete('deleteProduct')
    async deleteProduct(
        @Body('owner') owner:string,
        @Body('productid') productid:string
    )
    {
        console.log("deleteProduct");
        const result =  await this.productServices.deleteProduct({owner:owner,uuid:productid});
        if(result.affected>0)
        {
            return result;
        }
        else{
            throw new BadRequestException("productid or owner not matched")
        }
    }

    @Patch('updateProduct')
    async updateProduct(
        @Body() body:any
    )
    {
        if(body.productid==undefined || body.owner==undefined || body.productid==null || body.owner==null || body.productid=="" || body.owner=="")
        {
            throw new BadRequestException("productid or owner should have value")
        }
        const result = await this.productServices.updateProduct(body);
        if(result.affected>0)
        {
            return result
        }
        else{
            throw new BadRequestException("productid or owner not matched")
        }
    }
}