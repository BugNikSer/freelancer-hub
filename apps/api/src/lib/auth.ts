import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { expo } from "@better-auth/expo";
import { db } from "../db";
import * as schema from "../db/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    expo(), // Обеспечивает работу сессий в React Native без браузерных кук
  ],
  trustedOrigins: [
    'http://localhost:5173', // Веб-приложение (Vite)
    'http://localhost:8081', // Expo Web
    'freelancer-hub://',     // Схема продакшен-приложения
    'exp://**',              // Expo Go на телефоне
  ],
});

export type AuthType = typeof auth;
