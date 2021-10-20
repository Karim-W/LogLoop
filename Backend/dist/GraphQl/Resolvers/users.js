"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolver = void 0;
const user_1 = require("./../../entities/user");
const type_graphql_1 = require("type-graphql");
require("reflect-metadata");
const loginUserResponse_1 = require("../ObjectTypes/loginUserResponse");
const jsonwebtoken_1 = require("jsonwebtoken");
let userResolver = class userResolver {
    users(ctx) {
        return ctx.em.find(user_1.user, {});
    }
    findOnePost(id, ctx) {
        return ctx.em.findOne(user_1.user, { id: id });
    }
    me(ctx) {
        var theToken = ctx.req.rawHeaders.find((x) => x.includes("AccessToken:"));
        if (theToken === undefined) {
            console.log("no token");
            return null;
        }
        else {
            const Conv = theToken.split("AccessToken:")[1];
            const decoded = (0, jsonwebtoken_1.verify)(Conv, "test");
            const aUser = JSON.parse(decoded.user);
            return ctx.em.findOne(user_1.user, { id: aUser.id });
        }
    }
    async loginUser(email, password, ctx) {
        if (email !== undefined) {
            const aUser = await ctx.em.findOne(user_1.user, { email: email.toLowerCase() });
            if (aUser && aUser.password === password) {
                const accessToken = (0, jsonwebtoken_1.sign)({ user: JSON.stringify(aUser) }, "test", {
                    expiresIn: "1h",
                });
                ctx.res.cookie("accessToken", accessToken, { expire: 3000 });
                return { user: aUser, code: 200, token: accessToken };
            }
            else {
                return { code: 404 };
            }
        }
        else {
            return { code: 405 };
        }
    }
    createUser(firstname, lastname, email, password, phone, username, imgUrl, ctx) {
        let newUser = new user_1.user();
        newUser.firstName = firstname;
        newUser.lastName = lastname;
        newUser.email = email;
        newUser.password = password;
        newUser.phone = phone;
        newUser.userName = username;
        if (imgUrl !== undefined) {
            newUser.imgUrl = imgUrl;
        }
        ctx.em.persistAndFlush(newUser);
        return newUser;
    }
    async updateUser(id, firstname, lastname, email, password, phone, username, imgUrl, ctx) {
        var newUser = new user_1.user();
        if (id !== undefined) {
            const aUser = await ctx.em.findOne(user_1.user, { id: id });
            if (aUser) {
                newUser = aUser;
            }
            else {
                return newUser;
            }
        }
        else if (username !== undefined) {
            const aUser = await ctx.em.findOne(user_1.user, {
                userName: username.toLowerCase(),
            });
            if (aUser) {
                newUser = aUser;
            }
            else {
                return newUser;
            }
        }
        else if (email !== undefined) {
            const aUser = await ctx.em.findOne(user_1.user, { email: email.toLowerCase() });
            if (aUser) {
                newUser = aUser;
            }
            else {
                return newUser;
            }
        }
        if (firstname) {
            newUser.firstName = firstname;
        }
        if (lastname) {
            newUser.lastName = lastname;
        }
        if (email) {
            newUser.email = email;
        }
        if (password) {
            newUser.password = password;
        }
        if (phone) {
            newUser.phone = phone;
        }
        if (username) {
            newUser.userName = username;
        }
        if (imgUrl) {
            newUser.imgUrl = imgUrl;
        }
        await ctx.em.persistAndFlush(newUser);
        return newUser;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [user_1.user]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], userResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_1.user, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "findOnePost", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_1.user, { nullable: true }),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], userResolver.prototype, "me", null);
__decorate([
    (0, type_graphql_1.Query)(() => loginUserResponse_1.userResponse, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("email", () => String, { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)("password", () => String)),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "loginUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.user),
    __param(0, (0, type_graphql_1.Arg)("firstname")),
    __param(1, (0, type_graphql_1.Arg)("lastname")),
    __param(2, (0, type_graphql_1.Arg)("email")),
    __param(3, (0, type_graphql_1.Arg)("password")),
    __param(4, (0, type_graphql_1.Arg)("phone")),
    __param(5, (0, type_graphql_1.Arg)("username")),
    __param(6, (0, type_graphql_1.Arg)("imgUrl", { nullable: true })),
    __param(7, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String, String, Object]),
    __metadata("design:returntype", void 0)
], userResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.user),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int, { nullable: true })),
    __param(1, (0, type_graphql_1.Arg)("firstname", { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)("lastname", { nullable: true })),
    __param(3, (0, type_graphql_1.Arg)("email", { nullable: true })),
    __param(4, (0, type_graphql_1.Arg)("password", { nullable: true })),
    __param(5, (0, type_graphql_1.Arg)("phone", { nullable: true })),
    __param(6, (0, type_graphql_1.Arg)("username", { nullable: true })),
    __param(7, (0, type_graphql_1.Arg)("imgUrl", { nullable: true })),
    __param(8, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, String, String, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "updateUser", null);
userResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], userResolver);
exports.userResolver = userResolver;
//# sourceMappingURL=users.js.map