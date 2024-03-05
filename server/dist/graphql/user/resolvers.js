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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const queries = {
    profile: (_, parameters, context) => __awaiter(void 0, void 0, void 0, function* () {
        if (!context.user)
            throw new Error("Please Login to Access...");
        const id = context.user.id;
        return yield client_1.default.user.findUnique({ where: { id }, include: { events: true } });
    })
};
const mutations = {
    login: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const { email, password } = payload;
        const user = yield client_1.default.user.findUnique({ where: { email } });
        if (!user)
            throw new Error("Invalid Email OR Password...");
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch)
            throw new Error("Invalid Email OR Password...");
        // Generate JSONWebToken
        const token = yield jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE
        });
        return { token, user };
    }),
    register: (_, payload) => __awaiter(void 0, void 0, void 0, function* () {
        const { name, email, password } = payload;
        const user = yield client_1.default.user.findUnique({ where: { email } });
        if (user)
            throw new Error("User Already Exist with this email...");
        const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
        yield client_1.default.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        return `Registration Successfully...`;
    })
};
exports.resolvers = { queries, mutations };
