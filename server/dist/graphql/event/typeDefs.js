"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `
    type Event {
        id          :   ID!
        title       :   String!
        price       :   String!
        date        :   String!
        description :   String
        createdAt   :   String!
        user        :   User
    }
`;
