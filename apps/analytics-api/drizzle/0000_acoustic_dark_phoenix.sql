CREATE TABLE "api_key" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"key" text NOT NULL,
	"website_id" uuid NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"last_used_at" timestamp,
	"is_active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "api_key_key_unique" UNIQUE("key")
);
--> statement-breakpoint
CREATE TABLE "website" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"domain" text NOT NULL,
	"owner_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "website_slug_unique" UNIQUE("slug"),
	CONSTRAINT "website_domain_unique" UNIQUE("domain")
);
--> statement-breakpoint
ALTER TABLE "api_key" ADD CONSTRAINT "api_key_website_id_website_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."website"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "api_key_website_id_idx" ON "api_key" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "api_key_active_idx" ON "api_key" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX "website_owner_id_idx" ON "website" USING btree ("owner_id");--> statement-breakpoint
CREATE INDEX "website_owner_created_at_idx" ON "website" USING btree ("owner_id","created_at");