"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = require("./GraphQl/Resolvers/users");
const posts_1 = require("./GraphQl/Resolvers/posts");
const Hello_1 = require("./GraphQl/Resolvers/Hello");
const core_1 = require("@mikro-orm/core");
const mikro_orm_config_1 = __importDefault(require("./mikro-orm.config"));
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const main = async () => {
    const orm = await core_1.MikroORM.init(mikro_orm_config_1.default);
    await orm.getMigrator().up();
    console.log('Migrations complete');
    const app = (0, express_1.default)();
    const apolloServer = new apollo_server_express_1.ApolloServer({
        schema: await (0, type_graphql_1.buildSchema)({ resolvers: [Hello_1.helloResolver, posts_1.PostResolver, users_1.userResolver], validate: false }),
        context: () => ({ em: orm.em })
    });
    apolloServer.applyMiddleware({ app });
    app.listen(4000, () => {
        console.log(`Server started on port http://localhost:4000${apolloServer.graphqlPath}`);
    });
};
main().catch(err => {
    console.log("--------ERR-----------");
    console.error(err);
});
//# sourceMappingURL=index.js.map