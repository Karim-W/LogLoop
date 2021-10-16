import GQLClient from "./Client";
import { gql } from "@apollo/client";
import { Post } from "./classes/post";

export async function getMyPosts(): Promise<Post> {
  const { data } = await GQLClient.query({
    query: gql`
      query {
        myposts {
          id
          title
          content
          createdAt
        }
      }
    `,
  });
  return data.myposts;
}
