import { serial, pgTable, uuid, varchar, pgEnum } from "drizzle-orm/pg-core";
import { timestamps } from "../helpers/columns.helpers";
import { createInsertSchema } from "drizzle-zod";

const rolesEnum = pgEnum("roles", ["user", "admin", "anon"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: varchar("username").notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  password: varchar("password_hash").notNull(),
  role: rolesEnum("role").notNull().default("user"),
  firstName: varchar("first_name", { length: 48 }).notNull(),
  lastName: varchar("last_name", { length: 48 }),
  ...timestamps,
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Role = (typeof rolesEnum.enumValues)[number];
export const userInsertSchema = createInsertSchema(users);
