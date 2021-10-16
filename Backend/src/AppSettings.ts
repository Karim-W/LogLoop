import { userResolver } from './GraphQl/Resolvers/users';
import { PostResolver } from './GraphQl/Resolvers/posts';
export const AppSettings = {
    Devmode:true,
    GraphQLResolvers:[PostResolver,userResolver]
}