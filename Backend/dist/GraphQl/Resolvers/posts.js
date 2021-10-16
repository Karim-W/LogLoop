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
exports.PostResolver = void 0;
const user_1 = require("./../../entities/user");
const post_1 = require("./../../entities/post");
const type_graphql_1 = require("type-graphql");
require("reflect-metadata");
let PostResolver = class PostResolver {
    posts(ctx) {
        return ctx.em.find(post_1.Post, {});
    }
    findOnePost(id, ctx) {
        return ctx.em.findOne(post_1.Post, { id: id });
    }
    async createPost(userId, title, content, ctx) {
        let post = new post_1.Post();
        const theUser = await ctx.em.findOne(user_1.user, { id: userId });
        if (!theUser)
            return null;
        post.user = theUser;
        post.title = title;
        post.content = content;
        await ctx.em.persistAndFlush(post);
        return post;
    }
    async updatePost(id, title, content, ctx) {
        let post = await ctx.em.findOne(post_1.Post, { id: id });
        console.log(`title:${title}`);
        if (!post)
            return null;
        if (title !== undefined) {
            post.title = title;
        }
        if (content !== undefined) {
            post.content = content;
        }
        await ctx.em.persistAndFlush(post);
        return post;
    }
    async deletePost(id, ctx) {
        let post = await ctx.em.findOne(post_1.Post, { id: id });
        if (!post)
            return false;
        await ctx.em.removeAndFlush(post);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [post_1.Post]),
    __param(0, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostResolver.prototype, "posts", null);
__decorate([
    (0, type_graphql_1.Query)(() => post_1.Post, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "findOnePost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => post_1.Post, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("userId", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("title")),
    __param(2, (0, type_graphql_1.Arg)("content")),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "createPost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => post_1.Post, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Arg)("title", () => String, { nullable: true })),
    __param(2, (0, type_graphql_1.Arg)("content", () => String, { nullable: true })),
    __param(3, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "updatePost", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.Int)),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PostResolver.prototype, "deletePost", null);
PostResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], PostResolver);
exports.PostResolver = PostResolver;
//# sourceMappingURL=posts.js.map