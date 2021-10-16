import { IDatabaseDriver,Connection ,EntityManager} from "@mikro-orm/core";

export type GraphQLContext = {
    em: EntityManager<IDatabaseDriver<Connection>>
}