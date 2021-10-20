import GQLClient from "./Client";
import { gql } from "@apollo/client";
import { userResponse } from "./classes/userResponse";

export async function loginUserbyEmail(
  email: string,
  pass: string
): Promise<userResponse> {
  const { data } = await GQLClient.query({
    query: gql`
      query {
        loginUser(password: "${pass}", email: "${email}") {
          code
          user {
            id
            email
            userName
            firstName
            lastName
            phone
            createdAt
            updatedAt
          }
          token
        }
      }
    `,
  });
  return data.loginUser;
}

export function fetchLoginUser(email: string, pass: string): any {
  return gql`query {
        loginUser(password: "${pass}", email: "${email}") {
          code
          user {
            id
            email
            userName
            firstName
            lastName
            phone
            createdAt
            updatedAt
          }
          token
        }
      }`;
}
