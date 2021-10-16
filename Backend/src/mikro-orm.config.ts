import { user } from './entities/user';
import { Post } from './entities/post';
import { AppSettings } from './AppSettings';
import { MikroORM } from '@mikro-orm/core';
import path from 'path';
export default{
    dbName:"dummy2",
    type: "postgresql",
    debug: AppSettings.Devmode,
    user: "postgres",
    password: "secret", 
    entities:[Post,user],
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    }     
} as Parameters<typeof MikroORM.init>[0];