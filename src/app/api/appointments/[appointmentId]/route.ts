import { prisma } from "@/db/prisma";
import { NextResponse, NextRequest } from "next/server";

export const GET = async(req:NextRequest, {params}: {params: {appointmentId: string}}) => {
    const appointment = await prisma.appointments.findUnique({
        where: {
            id: params.appointmentId ?? ""
        },
        include: {
            providers: {
                select: {
                    firstName: true,
                    lastName: true,
                    email: true
                }
            }
        }
    })
    return NextResponse.json({
        status: "success",
        data: appointment
    })
}