import { Query, Resolver } from "type-graphql";
import "reflect-metadata"

@Resolver()
export class helloResolver {
  @Query(()=>String)
  hello() {
      return "hi there"
  }
}