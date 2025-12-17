import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { timestamps } from "../helpers/columns.helpers";

export const users = sqliteTable("users", {
    id: integer("id").primaryKey({ autoIncrement: true }),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    password_hash: text("password_hash").notNull(),
    ...timestamps,
});

export type IUser = typeof users.$inferSelect;