"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("./entities/user");
const post_1 = require("./entities/post");
const AppSettings_1 = require("./AppSettings");
const path_1 = __importDefault(require("path"));
exports.default = {
    dbName: "dummy2",
    type: "postgresql",
    debug: AppSettings_1.AppSettings.Devmode,
    user: "postgres",
    password: "secret",
    entities: [post_1.Post, user_1.user],
    migrations: {
        path: path_1.default.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/,
    }
};
//# sourceMappingURL=mikro-orm.config.js.map