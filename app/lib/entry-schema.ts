import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const entry = pgTable("entry", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  content: text("content").notNull(),
  author: text("author").notNull(), // "The Guide" or system identifier
  isCurated: boolean("is_curated").default(false).notNull(),
  relatedTopics: text("related_topics"), // JSON stringified array of slugs
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const hyperlink = pgTable("hyperlink", {
  id: text("id").primaryKey(),
  entryId: text("entry_id")
    .notNull()
    .references(() => entry.id, { onDelete: "cascade" }),
  linkedEntryId: text("linked_entry_id")
    .references(() => entry.id, { onDelete: "cascade" }),
  linkedEntrySlug: text("linked_entry_slug"), // Fallback for entries that don't exist yet
  anchorText: text("anchor_text").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const readingHistory = pgTable("reading_history", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  entryId: text("entry_id")
    .notNull()
    .references(() => entry.id, { onDelete: "cascade" }),
  visitedAt: timestamp("visited_at").defaultNow().notNull(),
});
