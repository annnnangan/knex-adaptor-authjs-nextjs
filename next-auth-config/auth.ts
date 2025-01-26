import NextAuth from "next-auth";
import authConfig from "@/next-auth-config/auth.config";
import { knex } from "@/services/knex"; //db - config
import { KnexAdapter } from "@/next-auth-config/knex-adapter";

export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: KnexAdapter(knex),
  session: { strategy: "jwt" },
  ...authConfig,
});
