import { Migration } from '@mikro-orm/migrations';

export class Migration20211015171620 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "post" add column "user_id" int4 not null;');

    this.addSql('alter table "post" add constraint "post_user_id_foreign" foreign key ("user_id") references "user" ("id") on update cascade;');
  }

}
