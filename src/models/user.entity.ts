/* eslint-disable prettier/prettier */
import {Entity,Column,PrimaryColumn} from 'typeorm'
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const { Column, Entity, PrimaryColumn } = require("typeorm");
@Entity("users")
export class User {
    @PrimaryColumn({type:'varchar'})
    uuid:string;

    @Column({type:'varchar',unique:true})
    email:string;

    @Column({type:'varchar'})
    password:string;

    @Column({type:'varchar', default:null})
    access_token:string;
}