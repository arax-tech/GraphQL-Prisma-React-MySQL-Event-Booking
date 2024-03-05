import prisma from "../../client";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";

const queries = {
    
    profile: async (_: any, parameters: any, context: any) => {
        if (!context.user) throw new Error("Please Login to Access...")
        const id = context.user.id;
        return await prisma.user.findUnique({ where: { id }, include: { events: true } });

    }
};
const mutations = {
    login: async (_: any, payload: { email: string, password: string }) => {
        const { email, password } = payload;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error("Invalid Email OR Password...")

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw new Error("Invalid Email OR Password...")

        // Generate JSONWebToken
        const token = await JWT.sign({ id: user.id }, process.env.JWT_SECRET as string, {
            expiresIn: process.env.JWT_EXPIRE
        });
        return {token, user};
    },
    register: async (_: any, payload: { name: string, email: string, password: string }) => {
        const { name, email, password } = payload;
        const user = await prisma.user.findUnique({ where: { email } });
        if (user) throw new Error("User Already Exist with this email...")

        const hashedPassword = await bcrypt.hash(password, 10);
        await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        return `Registration Successfully...`;
    }
};

export const resolvers = { queries, mutations };