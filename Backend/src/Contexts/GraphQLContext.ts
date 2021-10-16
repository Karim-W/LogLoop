import { IDatabaseDriver,Connection ,EntityManager} from "@mikro-orm/core";
import express from "express";

export type GraphQLContext = {
    em: EntityManager<IDatabaseDriver<Connection>>,
    req: any,
    res:any
}