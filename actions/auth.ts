"use server";

import * as z from "zod";

import { LoginSchema, RegisterSchema } from "@/schemas";
import { signIn } from "@/next-auth-config/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/next-auth-config/routes";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { userService } from "@/services/UserService";

export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validateFields = LoginSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password } = validateFields.data;
  try {
    //give this function the provider for login, in this case, it is credentials
    //also give this function the information that is used to sign in
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);
  if (!validateFields.success) {
    return { error: "Invalid Fields" };
  }

  const { email, password, name } = validateFields.data;

  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await userService.getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already in use" };
  }

  await userService.createNewUser({
    name,
    email,
    hashedPassword,
  });

  //TODO: Send verification token email

  return { success: "User created!" };
};
