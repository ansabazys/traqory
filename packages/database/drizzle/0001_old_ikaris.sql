CREATE TABLE "event" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"website_id" uuid NOT NULL,
	"event" text NOT NULL,
	"path" text NOT NULL,
	"url" text NOT NULL,
	"ip" text NOT NULL,
	"user_agent" text NOT NULL,
	"timestamp" timestamp NOT NULL,
	"received_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "event" ADD CONSTRAINT "event_website_id_website_id_fk" FOREIGN KEY ("website_id") REFERENCES "public"."website"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "event_website_id_idx" ON "event" USING btree ("website_id");--> statement-breakpoint
CREATE INDEX "event_timestamp_idx" ON "event" USING btree ("timestamp");