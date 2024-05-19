import { prisma } from "@/db/prisma";
import { NextResponse, NextRequest } from "next/server";

interface HasUsers {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const GET = async () => {
  const users = await prisma.users.findMany({});
  return NextResponse.json({
    status: "success",
    data: users,
  });
};

export const POST = async (req: Request) => {
  const data: HasUsers = await req.json();
  const { email, firstName, lastName, password } = data;
  const createdUser = await prisma.users.create({
    data: {
      email,
      firstName,
      lastName,
      password,
    },
  });
  return NextResponse.json({
    status: "success",
    data: createdUser,
  });
};
