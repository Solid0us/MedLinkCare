import { prisma } from "@/db/prisma";
import { Prisma } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  let whereOptions: Prisma.AppointmentsWhereInput = {
    clientsId: req.nextUrl.searchParams.get("clientId") ?? undefined,
  };
  let includeOptions: Prisma.AppointmentsInclude = {
    providers: req.nextUrl.searchParams.get("providers") === "true" && {
      select: {
        firstName: true,
        lastName: true,
        email: true,
      },
    },
    appointmentReasons: {
      select: {
        description: true,
        reason: true,
      },
    },
  };
  let orderByOptions: Prisma.AppointmentsOrderByWithRelationInput = {};
  req.nextUrl.searchParams.get("start-date-order") === "asc" &&
    Object.assign(orderByOptions, { startDate: "asc" });
  req.nextUrl.searchParams.get("start-date-order") === "desc" &&
    Object.assign(orderByOptions, { startDate: "desc" });

  const appointments = await prisma.appointments.findMany({
    where: whereOptions,
    include: includeOptions,
    orderBy: orderByOptions,
  });
  return NextResponse.json({
    status: "success",
    data: appointments,
  });
};
