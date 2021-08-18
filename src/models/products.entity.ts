/* eslint-disable prettier/prettier */
import {Entity,Column,PrimaryColumn, PrimaryGeneratedColumn} from 'typeorm'
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { Column, Entity, PrimaryColumn } = require("typeorm");
@Entity("products")
export class Products {
    @PrimaryColumn({type:'varchar'})
    uuid:string;

    @Column({type:'varchar',unique:true})
    name:string;

    @Column({type:'varchar'})
    description:string;
    
    @Column({type:'varchar'})
    owner:string;
    
}