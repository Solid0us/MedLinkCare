"use server";
import { prisma } from "@/db/prisma";
import * as bcrypt from "bcrypt";
import { ZodError, z } from "zod";
import { NextResponse } from "next/server";

export type SignupUserForm = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
};

export type FormState<T> = {
  message: string;
  errors: Record<keyof T, string> | undefined;
  fieldValues: T;
};

export const signupUser = async (
  prevState: FormState<SignupUserForm>,
  formData: FormData
): Promise<FormState<SignupUserForm>> => {
  const email = formData.get("email") as string;
  const firstName = formData.get("firstName") as string;
  const lastName = formData.get("lastName") as string;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;
  const signupSchema = z.object({
    email: z
      .string({
        invalid_type_error: "Email must be a string.",
        required_error: "Missing Email",
      })
      .email("Email must be a valid email."),
    firstName: z
      .string({
        invalid_type_error: "First Name must be a string",
        required_error: "Missing First Name",
      })
      .min(1, "First name must be at least one character long."),
    lastName: z
      .string({
        invalid_type_error: "Last Name must be a string",
        required_error: "Missing last name",
      })
      .min(1, "Last name must be at least one character long."),
    password: z
      .string({
        invalid_type_error: "First Name must be a string",
        required_error: "Missing First Name",
      })
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string({
        invalid_type_error: "Confirm Password must be a string",
        required_error: "Missing confirm password",
      })
      .refine((val) => val === password, "Passwords must match."),
  });
  try {
    signupSchema.parse({
      email,
      firstName,
      lastName,
      password,
      confirmPassword,
    });
  } catch (err) {
    NextResponse.json({ status: 400 });
    const zodError = err as ZodError;
    const errorMap = zodError.flatten().fieldErrors;

    return {
      errors: {
        confirmPassword: errorMap["confirmPassword"]?.[0] ?? "",
        password: errorMap["password"]?.[0] ?? "",
        firstName: errorMap["firstName"]?.[0] ?? "",
        lastName: errorMap["lastName"]?.[0] ?? "",
        email: errorMap["email"]?.[0] ?? "",
      },
      message: "failure",
      fieldValues: {
        confirmPassword,
        password,
        email,
        firstName,
        lastName,
      },
    };
  }
  const existingEmail = await prisma.users.findUnique({
    where: {
      email,
    },
  });
  if (existingEmail) {
    return {
      errors: {
        confirmPassword: "",
        password: "",
        firstName: "",
        lastName: "",
        email: "Email already exists!",
      },
      message: "failure",
      fieldValues: {
        confirmPassword,
        password,
        email,
        firstName,
        lastName,
      },
    };
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.users.create({
    data: {
      email,
      firstName,
      lastName,
      password: hashedPassword,
    },
  });
  const role = await prisma.roles.findUnique({
    where: {
      role: "client",
    },
  });
  if (role) {
    const createdRole = await prisma.userRoles.create({
      data: {
        usersId: user.id,
        rolesId: role.id,
      },
    });
  }
  return {
    errors: undefined,
    message: "success",
    fieldValues: {
      confirmPassword,
      password,
      email,
      firstName,
      lastName,
    },
  };
};
