"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migration20211015171620 = void 0;
const migrations_1 = require("@mikro-orm/migrations");
class Migration20211015171620 extends migrations_1.Migration {
    async up() {
        this.addSql('alter table "post" add column "user_id" int4 not null;');
        this.addSql('alter table "post" add constraint "post_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
    }
}
exports.Migration20211015171620 = Migration20211015171620;
//# sourceMappingURL=Migration20211015171620.js.map