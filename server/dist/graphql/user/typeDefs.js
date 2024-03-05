"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `
    type User{
        id          :   ID!
        name        :   String!
        email       :   String!
        image       :   String
        createdAt   :   String
        events      :   [Event]
    }
    type AuthData {
        token       :   String 
        user        :   User
    }
`;
