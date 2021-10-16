import { user } from './user';
import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, Int, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
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
    title!: string;

    @Field(()=> String)
    @Property({type: 'text'})
    content!: string;

    @Field(()=> user)
    @ManyToOne({ entity: () => user })
    user!: user;
}