import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers/columns.helpers";
import { createInsertSchema } from "drizzle-zod";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  email: text("email", { length: 255 }).notNull().unique(),
  password: text("password_hash").notNull(),
  firstName: text("first_name", { length: 48 }).notNull(),
  lastName: text("last_name", { length: 48 }),
  ...timestamps,
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;

export const userInsertSchema = createInsertSchema(users);
