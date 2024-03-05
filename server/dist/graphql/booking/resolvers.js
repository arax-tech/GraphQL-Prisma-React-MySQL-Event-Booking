"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const client_1 = __importDefault(require("../../client"));
const queries = {
    bookings: (_, paramaters, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (!context.user)
            throw new Error("Please Login to Access...");
        const bookings = yield client_1.default.booking.findMany({
            where: { user_id: context.user.id },
            include: {
                event: true, user: true
            }
        });
        return bookings;
    })
};
const mutations = {
    bookEvent: (_, payload, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (!context.user)
            throw new Error("Please Login to Access...");
        const { event_id } = payload;
        const result = yield client_1.default.booking.create({
            data: {
                user_id: context.user.id,
                event_id: Number(event_id),
            },
            include: { event: true, user: true }
        });
        return result;
    }),
    cancelBooking: (_, payload, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (!context.user)
            throw new Error("Please Login to Access...");
        console.log(payload.id);
        yield client_1.default.booking.delete({ where: { id: Number(payload.id) } });
        return `Booking Canceled Successfully...`;
    })
};
exports.resolvers = { queries, mutations };
