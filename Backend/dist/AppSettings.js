"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppSettings = void 0;
const users_1 = require("./GraphQl/Resolvers/users");
const posts_1 = require("./GraphQl/Resolvers/posts");
exports.AppSettings = {
    Devmode: true,
    GraphQLResolvers: [posts_1.PostResolver, users_1.userResolver]
};
//# sourceMappingURL=AppSettings.js.map