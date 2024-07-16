import { integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MOCKInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDescription: varchar("jobDescription").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull(),
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  useEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});

export const UserDetails = pgTable("userDetails", {
  id: serial("id").primaryKey(),
  userEmail: varchar("userEmail").unique().notNull(),
  credits: integer("credits").default(6).notNull(),
  totalAmountSpent: integer("totalAmountSpent"), // total amount spent by user to buy credits
  createdAt: varchar("createdAt"),
});
