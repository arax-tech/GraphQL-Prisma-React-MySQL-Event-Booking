import prisma from "../../client";

const queries = {
    bookings: async (_: any, paramaters: any, context: any) => {
        if (!context.user) throw new Error("Please Login to Access...")
        const bookings = await prisma.booking.findMany({
            where: { user_id: context.user.id },
            include: {
                event: true, user: true
            }
        });

        return bookings;
    }
};
const mutations = {
    bookEvent: async (_: any, payload: { event_id: number }, context: any) => {
        if (!context.user) throw new Error("Please Login to Access...")
        const { event_id } = payload;
        const result = await prisma.booking.create({
            data: {
                user_id: context.user.id,
                event_id: Number(event_id),
            },
            include: { event: true, user: true }
        });
        return result;
    },
    cancelBooking: async (_: any, payload: { id: number }, context:any) => {
        if (!context.user) throw new Error("Please Login to Access...")
        console.log(payload.id)
        await prisma.booking.delete({ where: { id: Number(payload.id) } });
        return `Booking Canceled Successfully...`;
    }
};

export const resolvers = { queries, mutations };