import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260921213719 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "pot_meta" ("id" text not null, "name_en" text not null, "name_ar" text not null, "material" text not null, "color_hex" text not null, "finish" text not null, "inner_diameter_cm" integer not null, "height_cm" integer not null, "drainage" boolean not null, "saucer" boolean not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "pot_meta_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_pot_meta_deleted_at" ON "pot_meta" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "pot_meta" cascade;`);
  }

}
