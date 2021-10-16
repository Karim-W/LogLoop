import { userResolver } from './GraphQl/Resolvers/users';
import { PostResolver } from './GraphQl/Resolvers/posts';
import { helloResolver } from './GraphQl/Resolvers/Hello';
import {MikroORM} from '@mikro-orm/core';
import DbConfig from "./mikro-orm.config";
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import cookieParser from 'cookie-parser';
import { verify } from 'jsonwebtoken';


const main = async () => {
    const orm = await MikroORM.init(DbConfig);
    await orm.getMigrator().up();
    console.log('Migrations complete');
    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({ resolvers: [helloResolver, PostResolver, userResolver], validate: false }),
        context: ({ req,res}) => ({ em: orm.em, req:  req ,res: res })
    });
    app.use(cookieParser());
    app.use((req, res, next) => {
        try {
            const accessToken = req.cookies.accessToken;
            const data = verify(accessToken, "test") as any;
            (req as any).user = data;
        } catch (err) {
            console.log(err);
        }
        next();
    })
    apolloServer.applyMiddleware({app});
    app.listen(4000, () => {
        console.log(`Server started on port http://localhost:4000${apolloServer.graphqlPath}`);
    })
}
main().catch(err => {
    console.log("--------ERR-----------")
    console.error(err);
});
