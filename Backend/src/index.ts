import { userResolver } from './GraphQl/Resolvers/users';
import { PostResolver } from './GraphQl/Resolvers/posts';
import { helloResolver } from './GraphQl/Resolvers/Hello';
import {MikroORM} from '@mikro-orm/core';
import DbConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';

const main = async () => {
    const orm = await MikroORM.init(DbConfig);
    await orm.getMigrator().up();
    console.log('Migrations complete');
    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({resolvers:[helloResolver,PostResolver,userResolver],validate:false}),
        context: () => ({ em: orm.em })
    });
    apolloServer.applyMiddleware({app});
    app.listen(4000, () => {
        console.log(`Server started on port http://localhost:4000${apolloServer.graphqlPath}`);
    })
}
main().catch(err => {
    console.log("--------ERR-----------")
    console.error(err);
});
