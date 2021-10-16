import { user } from "./../../entities/user";
import { GraphQLContext } from "./../../Contexts/GraphQLContext";
import { Post } from "./../../entities/post";
import { Arg, Ctx, Query, Resolver, Int, Mutation } from "type-graphql";
import "reflect-metadata";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() ctx: GraphQLContext) {
    return ctx.em.find(Post, {});
  }
  @Query(() => Post, { nullable: true })
  findOnePost(
    @Arg("id", () => Int) id: number,
    @Ctx() ctx: GraphQLContext
  ): Promise<Post | null> {
    return ctx.em.findOne(Post, { id: id });
  }
  @Mutation(() => Post, { nullable: true })
  async createPost(
    @Arg("userId", () => Int) userId: number,
    @Arg("title") title: string,
    @Arg("content") content: string,
    @Ctx() ctx: GraphQLContext
  ): Promise<Post | null> {
    let post = new Post();
    const theUser = await ctx.em.findOne(user, { id: userId });
    if (!theUser) return null;
    post.user = theUser;
    post.title = title;
    post.content = content;
    await ctx.em.persistAndFlush(post);
    return post;
  }
  @Query(() => [Post], { nullable: true })
  async myposts(@Ctx() ctx: GraphQLContext) {
    console.log(ctx.req.user);
    if (!ctx.req.user.user) {
      return null;
    }
    const userId = JSON.parse(ctx.req.user.user).id;
    return ctx.em.find(Post, { user: userId });
  }
  @Mutation(() => Post, { nullable: true })
  async newPost(
    @Arg("title", () => String, { nullable: true }) title: string,
    @Arg("content", () => String, { nullable: true }) content: string,
    @Ctx() ctx: GraphQLContext
  ) {
    if (!ctx.req.user.user) {
      return null;
    }
    console.log("heyo");
    const userId = JSON.parse(ctx.req.user.user).id;
    const aUser = await ctx.em.findOne(user, { id: userId });
    if (aUser === null) return null;
    const post = new Post();
    post.user = aUser;
    post.title = title;
    post.content = content;
    await ctx.em.persistAndFlush(post);
    return post;
  }
  @Mutation(() => Post, { nullable: true })
  async updatePost(
    @Arg("id", () => Int) id: number,
    @Arg("title", () => String, { nullable: true }) title: string,
    @Arg("content", () => String, { nullable: true }) content: string,
    @Ctx() ctx: GraphQLContext
  ): Promise<Post | null> {
    let post = await ctx.em.findOne(Post, { id: id });
    console.log(`title:${title}`);
    if (!post) return null;
    if (title !== undefined) {
      post.title = title;
    }
    if (content !== undefined) {
      post.content = content;
    }
    await ctx.em.persistAndFlush(post);
    return post;
  }
  @Mutation(() => Boolean)
  async deletePost(
    @Arg("id", () => Int) id: number,
    @Ctx() ctx: GraphQLContext
  ): Promise<boolean> {
    let post = await ctx.em.findOne(Post, { id: id });
    if (!post) return false;
    await ctx.em.removeAndFlush(post);
    return true;
  }
}
