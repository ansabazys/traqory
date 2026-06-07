ALTER TABLE "event" ADD COLUMN IF NOT EXISTS "country" text;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN IF NOT EXISTS "region" text;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN IF NOT EXISTS "city" text;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN IF NOT EXISTS "latitude" double precision;--> statement-breakpoint
ALTER TABLE "event" ADD COLUMN IF NOT EXISTS "longitude" double precision;--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "event_website_timestamp_idx" ON "event" USING btree ("website_id","timestamp");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "event_country_idx" ON "event" USING btree ("country");
