import { Migration } from '@mikro-orm/migrations';

export class Migration20211015171552 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "first_name" varchar(255) not null, "last_name" text not null, "user_name" varchar(255) not null, "email" varchar(255) not null, "password" varchar(255) not null, "phone" varchar(255) not null, "img_url" varchar(255) null);');
    this.addSql('alter table "user" add constraint "user_user_name_unique" unique ("user_name");');
    this.addSql('alter table "user" add constraint "user_email_unique" unique ("email");');
    this.addSql('alter table "user" add constraint "user_phone_unique" unique ("phone");');

    this.addSql('create table "post" ("id" serial primary key, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "title" varchar(255) not null, "content" text not null);');
  }

}
