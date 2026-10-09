import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260921213710 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "asset_meta" ("id" text not null, "rimYPct" integer not null, "rimWidthPct" integer not null, "baseYPct" integer not null, "version" integer not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "asset_meta_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_asset_meta_deleted_at" ON "asset_meta" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "asset_meta" cascade;`);
  }

}
