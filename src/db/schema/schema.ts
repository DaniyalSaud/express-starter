import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers/columns.helpers";

export const notes = sqliteTable("notes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  content: text("content").notNull(),
  ...timestamps,
});

export type INote = typeof notes.$inferSelect;
