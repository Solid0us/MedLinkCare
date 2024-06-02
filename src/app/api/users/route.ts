import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

interface HasUsers {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const GET = async (req: NextRequest) => {
  let whereOptions: Prisma.UsersWhereInput = {
    UserRoles: {
      some: {
        roles: { role: req.nextUrl.searchParams.get("role") ?? undefined },
      },
    },
  };
  const users = await prisma.users.findMany({
    where: whereOptions,
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  });
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
