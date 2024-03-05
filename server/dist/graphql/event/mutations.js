"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `
    createEvent(
        title:String!
        price:String!
        date:String!
        description:String
    ) : Event
    deleteEvent(id:ID!) : String
`;
