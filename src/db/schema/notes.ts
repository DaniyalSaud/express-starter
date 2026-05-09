import { pgTable, text, serial } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/columns.helpers";

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  ...timestamps,
});

export type INote = typeof notes.$inferSelect;
