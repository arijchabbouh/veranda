import { Migration } from "@medusajs/framework/mikro-orm/migrations";

export class Migration20260921213433 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table if not exists "plant_meta" ("id" text not null, "name_botanical" text not null, "name_ar" text not null, "growth_habit" text not null, "light" text not null, "water_frequency_days" integer not null, "toxicity" text not null, "real_height_cm" integer not null, "nursery_pot_diameter_cm" integer not null, "care_notes_en" text not null, "care_notes_ar" text not null, "created_at" timestamptz not null default now(), "updated_at" timestamptz not null default now(), "deleted_at" timestamptz null, constraint "plant_meta_pkey" primary key ("id"));`);
    this.addSql(`CREATE INDEX IF NOT EXISTS "IDX_plant_meta_deleted_at" ON "plant_meta" ("deleted_at") WHERE deleted_at IS NULL;`);
  }

  override async down(): Promise<void> {
    this.addSql(`drop table if exists "plant_meta" cascade;`);
  }

}
