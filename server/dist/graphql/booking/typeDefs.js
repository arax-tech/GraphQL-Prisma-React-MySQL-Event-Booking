"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
exports.typeDefs = `
    type Booking {
        id          :       ID!
        user        :       User!
        event       :       Event!
        createdAt   :       String 
    }
`;
