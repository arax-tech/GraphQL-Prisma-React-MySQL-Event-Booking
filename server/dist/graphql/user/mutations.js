"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mutations = void 0;
exports.mutations = `
    register(
        name        :   String!,
        email       :   String!,
        password    :   String!,
    ):String,
    login(email:String!, password:String!):AuthData

`;
