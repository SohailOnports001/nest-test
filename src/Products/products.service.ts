/* eslint-disable prettier/prettier */
import {
    Injectable,
    NotFoundException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductsModel } from './products.model'
import { Products } from 'src/models/products.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductServices{
    constructor(
        @InjectRepository(Products) private readonly productRepository: Repository<Products>
    ){

    }

    async createProducts(
        uniqueId:string,
        name:string,
        description:string,
        owner:string
    ) : Promise<Products>
    {
        const newProduct = new ProductsModel(uniqueId,name,description,owner);
        return this.productRepository.save(newProduct)
    }

    async getAllProducts() : Promise<Products[]>
    {
        return this.productRepository.find();
    }

    async getProductsByOwnerId(condition:any) : Promise<Products[]>
    {
        return this.productRepository.find({owner:condition.owner})
    }
    
    async deleteProduct(condition:any):Promise<DeleteResult>{
        return this.productRepository.delete(condition)
    }

    async getProductInfo(condition:any):Promise<Products>
    {
        return this.productRepository.findOne(condition);
    }

    async updateProduct(condition:any):Promise<UpdateResult>
    {
        const {productid,owner} = condition;
        delete condition.productid;
        delete condition.owner;
        return this.productRepository.update(
            {uuid:productid,owner:owner},
            condition)
    }
}