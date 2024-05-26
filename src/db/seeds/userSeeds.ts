import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import * as bcrypt from "bcrypt"

const seedUsers = async() => {
    const hashedPW1 = await bcrypt.hash(process.env.HEALTHCAREPW1 ?? "", 10)
    const hashedPW2 = await bcrypt.hash(process.env.HEALTHCAREPW2 ?? "", 10)
    const usersData: Prisma.UsersCreateManyInput[] = [
        {
            id: "58046505-9903-47fc-a182-94da0a138d35",
            firstName: "Albert",
            lastName: "Schneider",
            email: "albertS@medlink.com",
            password: hashedPW1,
        },
        {
            id: "609d439f-5ba1-430e-86cc-a1611bda416b",
            firstName: "Colleen",
            lastName: "Fischer",
            email: "colleanF@medlink.com",
            password: hashedPW2
        }
    ]
    const createdUsers = await prisma.users.createMany({
        data: usersData,
        skipDuplicates: true
    })
    const healthcareProviderRole = await prisma.roles.findUnique({
        where: {
            role: "healthcareProvider"
        }
    })
    if (healthcareProviderRole){
        const createdUserRoles = await prisma.userRoles.createMany({
            data: [{
                rolesId: healthcareProviderRole.id,
                usersId:"58046505-9903-47fc-a182-94da0a138d35"
            },
        {
            rolesId: healthcareProviderRole.id,
            usersId: "609d439f-5ba1-430e-86cc-a1611bda416b"
        }],
        skipDuplicates: true
        })
    }
    
}

export default seedUsers