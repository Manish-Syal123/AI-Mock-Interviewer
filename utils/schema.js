import {
  boolean,
  integer,
  pgTable,
  serial,
  text,
  varchar,
} from "drizzle-orm/pg-core";

export const MOCKInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDescription: varchar("jobDescription").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  favourite: boolean("favourite").default(false).notNull(),
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
  creditsUsed: integer("creditsUsed").default(0).notNull(),
  totalAmountSpent: integer("totalAmountSpent").default(0).notNull(),
  paymentSecretKey: varchar("paymentSecretKey"),
  createdAt: varchar("createdAt"),
});
