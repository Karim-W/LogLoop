import GQLClient from "./Client";
import { gql } from "@apollo/client";
import { userResponse } from "./classes/userResponse";

// export async function loginUserbyEail(
//   email: string,
//   pass: string
// ): Promise<userResponse> {
//   console.log(GQLClient);
//   const data = await GQLClient.query({
//     query: gql`{loginUser(
//     password: ${pass},
//     email: ${email}
//     ){
//         code
//         user{
//             id
//             email
//             userName
//             firstName
//             lastName
//             phone
//             createdAt
//             updatedAt
//         }
//     }}`,
//   });

//   console.log(data);
//   return data.data.loginUser;
// }
export async function loginUserbyEmail(email:string, pass:string): Promise<userResponse>  {
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
        }
      }
    `,
  });
  return data.loginUser;
}
