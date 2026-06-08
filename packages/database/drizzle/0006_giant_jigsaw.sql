CREATE TABLE "audit_log" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" text NOT NULL,
	"action" text NOT NULL,
	"resource_type" text NOT NULL,
	"resource_id" text NOT NULL,
	"timestamp" timestamp DEFAULT now() NOT NULL,
	"metadata" jsonb
);
--> statement-breakpoint
ALTER TABLE "api_key" DROP CONSTRAINT "api_key_key_unique";--> statement-breakpoint
DROP INDEX "api_key_active_idx";--> statement-breakpoint
ALTER TABLE "api_key" ADD COLUMN "name" text NOT NULL;--> statement-breakpoint
ALTER TABLE "api_key" ADD COLUMN "prefix" text NOT NULL;--> statement-breakpoint
ALTER TABLE "api_key" ADD COLUMN "hashed_key" text NOT NULL;--> statement-breakpoint
ALTER TABLE "api_key" ADD COLUMN "updated_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "api_key" ADD COLUMN "expires_at" timestamp;--> statement-breakpoint
ALTER TABLE "api_key" ADD COLUMN "rotated_at" timestamp;--> statement-breakpoint
ALTER TABLE "api_key" ADD COLUMN "revoked_at" timestamp;--> statement-breakpoint
ALTER TABLE "api_key" ADD COLUMN "created_by" text NOT NULL;--> statement-breakpoint
ALTER TABLE "website" ADD COLUMN "description" text;--> statement-breakpoint
ALTER TABLE "website" ADD COLUMN "status" text DEFAULT 'ACTIVE' NOT NULL;--> statement-breakpoint
ALTER TABLE "website" ADD COLUMN "environment" text DEFAULT 'production' NOT NULL;--> statement-breakpoint
ALTER TABLE "website" ADD COLUMN "timezone" text DEFAULT 'UTC';--> statement-breakpoint
ALTER TABLE "website" ADD COLUMN "favicon" text;--> statement-breakpoint
ALTER TABLE "website" ADD COLUMN "deleted_at" timestamp;--> statement-breakpoint
CREATE INDEX "audit_log_user_id_idx" ON "audit_log" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "audit_log_resource_idx" ON "audit_log" USING btree ("resource_type","resource_id");--> statement-breakpoint
CREATE INDEX "api_key_hashed_key_idx" ON "api_key" USING btree ("hashed_key");--> statement-breakpoint
ALTER TABLE "api_key" DROP COLUMN "key";--> statement-breakpoint
ALTER TABLE "api_key" DROP COLUMN "is_active";--> statement-breakpoint
ALTER TABLE "api_key" ADD CONSTRAINT "api_key_hashed_key_unique" UNIQUE("hashed_key");