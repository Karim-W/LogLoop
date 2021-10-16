import { Post } from './post';
import { Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class user {
    @Field(()=> Int)
    @PrimaryKey()
    id!: number;

    @Field(()=> String)
    @Property({type: "date"})
    createdAt = new Date();

    @Field(()=> String)
    @Property({type: 'date',onUpdate: () => new Date()})
    updatedAt = new Date();
    
    @Field(()=> String)
    @Property()
    firstName!: string;

    @Field(()=> String)
    @Property({type: 'text'})
    lastName!: string;

    @Field(()=> String)
    @Property({unique: true})
    userName!: string;

    @Field(()=> String)
    @Property({unique: true})
    email!: string;

    @Property()
    password!: string;

    @Field(()=> String)
    @Property({unique: true})
    phone!: string;

    @Field(()=> String)
    @Property({nullable: true})
    imgUrl: string;

    @Field(()=> [Post])
    @OneToMany(() => Post, post => post.user)
    posts: Post[] = [];


}