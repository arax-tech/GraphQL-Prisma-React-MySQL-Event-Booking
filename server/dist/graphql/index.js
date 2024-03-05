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
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const event_1 = require("./event");
const user_1 = require("./user");
const booking_1 = require("./booking");
const GraphQLServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // Create GraphQL Server
    const typeDefs = `
        # type
            ${user_1.User.typeDefs}
            ${event_1.Event.typeDefs}
            ${booking_1.Booking.typeDefs}
        type Query{
            ${user_1.User.queries}
            ${event_1.Event.queries}
            ${booking_1.Booking.queries}
        }
        type Mutation {
            ${event_1.Event.mutations}
            ${user_1.User.mutations}
            ${booking_1.Booking.mutations}
        }
    `;
    const resolvers = {
        Query: Object.assign(Object.assign(Object.assign({}, user_1.User.resolvers.queries), event_1.Event.resolvers.queries), booking_1.Booking.resolvers.queries),
        Mutation: Object.assign(Object.assign(Object.assign({}, user_1.User.resolvers.mutations), event_1.Event.resolvers.mutations), booking_1.Booking.resolvers.mutations)
    };
    const server = new server_1.ApolloServer({
        typeDefs,
        resolvers
    });
    yield server.start();
    return server;
});
exports.default = GraphQLServer;
