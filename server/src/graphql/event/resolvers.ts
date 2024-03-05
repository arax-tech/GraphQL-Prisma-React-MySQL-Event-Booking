import prisma from "../../client";

const queries = {
    events: async (_: any) => {
        const events = await prisma.event.findMany({
            include: { user: true }
        });
        
        return events;
    },
    event: async (_: any, payload: { id: string }) => {
        const { id } = payload;
        const event = await prisma.event.findUnique({
            where: { id: Number(id) },
            include: { user: true }
        });
        return event;
    }
};

interface CreateEventInput {
    title: string
    price: string
    date: string
    description: string
}
const mutations = {
    createEvent: async (_: any, input: CreateEventInput, context: any) => {
        if (!context.user) throw new Error("Please Login to Access...")

        const { title, price, date, description } = input;
        const result = await prisma.event.create({
            data: {
                user_id: context.user.id,
                title,
                price,
                date: new Date(date),
                description,
            }
        })
        return result;
    },
    deleteEvent: async (_: any, payload:{id:Number}, context: any) => {
        if (!context.user) throw new Error("Please Login to Access...")
        await prisma.event.delete({ where: { id: Number(payload.id) }})
        return `Event Delete Successfully`;
    }
};

export const resolvers = { queries, mutations };
