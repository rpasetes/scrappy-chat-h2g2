CREATE TABLE "entry" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"content" text NOT NULL,
	"author" text NOT NULL,
	"is_curated" boolean DEFAULT false NOT NULL,
	"table_of_contents" text,
	"references" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "entry_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "hyperlink" (
	"id" text PRIMARY KEY NOT NULL,
	"entry_id" text NOT NULL,
	"linked_entry_id" text,
	"linked_entry_slug" text,
	"anchor_text" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "reading_history" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"entry_id" text NOT NULL,
	"visited_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "hyperlink" ADD CONSTRAINT "hyperlink_entry_id_entry_id_fk" FOREIGN KEY ("entry_id") REFERENCES "public"."entry"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "hyperlink" ADD CONSTRAINT "hyperlink_linked_entry_id_entry_id_fk" FOREIGN KEY ("linked_entry_id") REFERENCES "public"."entry"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_history" ADD CONSTRAINT "reading_history_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "reading_history" ADD CONSTRAINT "reading_history_entry_id_entry_id_fk" FOREIGN KEY ("entry_id") REFERENCES "public"."entry"("id") ON DELETE cascade ON UPDATE no action;