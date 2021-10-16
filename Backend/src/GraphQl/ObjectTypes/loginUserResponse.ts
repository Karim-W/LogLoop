import { Int, ObjectType, Field} from "type-graphql";
import "reflect-metadata"
import { user } from "../../entities/user";
@ObjectType()
export class userResponse{
    @Field(()=>user,{nullable:true})
    user?:user
    @Field(()=>Int)
    code: number
    @Field(() => String)
    token?: string
}