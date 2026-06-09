ALTER TABLE "website" DROP CONSTRAINT "website_slug_unique";--> statement-breakpoint
ALTER TABLE "website" DROP CONSTRAINT "website_domain_unique";--> statement-breakpoint
CREATE UNIQUE INDEX "website_slug_active_unique" ON "website" USING btree ("slug") WHERE "website"."deleted_at" IS NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "website_domain_active_unique" ON "website" USING btree ("domain") WHERE "website"."deleted_at" IS NULL;