import { user } from './../../entities/user';
import { GraphQLContext } from './../../Contexts/GraphQLContext';
import { Arg, Ctx, Query, Resolver,Int, Mutation} from "type-graphql";
import "reflect-metadata"
import { userResponse } from '../ObjectTypes/loginUserResponse';


@Resolver()
export class userResolver {
  @Query(()=>[user])
  users(
      @Ctx() ctx: GraphQLContext
  ) {
      return ctx.em.find(user, {});
  }
  @Query(()=>user,{nullable:true})
  findOnePost(
      @Arg("id",()=>Int) id: number,
      @Ctx() ctx: GraphQLContext
  ):Promise<user|null> {
      return ctx.em.findOne(user, {id:id});
  }
  @Query(()=>userResponse,{nullable:true})
  async loginUser(
      @Arg("email",()=>String,{nullable:true}) email: string,
      @Arg("username",()=>String,{nullable:true}) username: string,
      @Arg("password",()=>String,) password: string,
      @Ctx() ctx: GraphQLContext
  ):Promise<userResponse> {
        if(email!==undefined){
            const aUser = await ctx.em.findOne(user, {email:email.toLowerCase()});
            if(aUser&&aUser.password===password){
                return {user:aUser,code:200};
            }else{
                return {code:404};
            }
        }
        else if(username!==undefined){
            const aUser = await ctx.em.findOne(user, {id:1});
            if(aUser&&aUser.password===password){
                return {user:aUser,code:200};
            }else{
                return {code:404};
            }
        }
        else{
            return {code:405};
        }
        
  }
  @Mutation(()=>user)
  createUser(
        @Arg("firstname") firstname: string,
        @Arg("lastname") lastname: string,
        @Arg("email") email: string,
        @Arg("password") password: string,
        @Arg("phone") phone: string,
        @Arg("username") username: string,
        @Arg("imgUrl",{nullable:true}) imgUrl: string,
        @Ctx() ctx: GraphQLContext
  ) {
      let newUser: user = new user();
      newUser.firstName = firstname;
      newUser.lastName = lastname;
      newUser.email = email;
      newUser.password = password;
      newUser.phone = phone;
      newUser.userName = username;
      if(imgUrl!==undefined){
      newUser.imgUrl = imgUrl;
    }
      ctx.em .persistAndFlush(newUser);
      return newUser;
  }
  @Mutation(()=>user)
  async updateUser(
        @Arg("id",()=>Int,{nullable:true}) id: number,
        @Arg("firstname",{nullable:true}) firstname: string,
        @Arg("lastname",{nullable:true}) lastname: string,
        @Arg("email",{nullable:true}) email: string,
        @Arg("password",{nullable:true}) password: string,
        @Arg("phone",{nullable:true}) phone: string,
        @Arg("username",{nullable:true}) username: string,
        @Arg("imgUrl",{nullable:true}) imgUrl: string,
        @Ctx() ctx: GraphQLContext
  ):Promise<user|null> {
      
      var newUser=new user();
        if(id!==undefined){
            const aUser = await ctx.em.findOne(user, {id:id});
            if(aUser){newUser=aUser;}else{return newUser;}
        }else if(username!==undefined){
            const aUser = await ctx.em.findOne(user, {userName:username.toLowerCase()});
            if(aUser){newUser=aUser;}else{return newUser;}
        }else if(email!==undefined){
            const aUser = await ctx.em.findOne(user, {email:email.toLowerCase()});
            if(aUser){newUser=aUser;}else{return newUser;}
        }
        if(firstname){newUser.firstName = firstname}
        if(lastname){newUser.lastName = lastname}
        if(email){newUser.email = email}
        if(password){newUser.password = password}
        if(phone){newUser.phone = phone}
        if(username){newUser.userName = username}
        if(imgUrl){newUser.imgUrl = imgUrl}
      await ctx.em.persistAndFlush(newUser);
      return newUser;
  }
}