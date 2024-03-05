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
    events: (_) => __awaiter(void 0, void 0, void 0, function* () {
        const events = yield client_1.default.event.findMany({
            include: { user: true }
        });
        return events;
    }),
    event: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = payload;
        const event = yield client_1.default.event.findUnique({
            where: { id: Number(id) },
            include: { user: true }
        });
        return event;
    })
};
const mutations = {
    createEvent: (_, input, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (!context.user)
            throw new Error("Please Login to Access...");
        const { title, price, date, description } = input;
        const result = yield client_1.default.event.create({
            data: {
                user_id: context.user.id,
                title,
                price,
                date: new Date(date),
                description,
            }
        });
        return result;
    }),
    deleteEvent: (_, payload, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (!context.user)
            throw new Error("Please Login to Access...");
        yield client_1.default.event.delete({ where: { id: Number(payload.id) } });
        return `Event Delete Successfully`;
    })
};
exports.resolvers = { queries, mutations };
