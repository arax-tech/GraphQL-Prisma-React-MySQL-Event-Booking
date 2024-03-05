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
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const express4_1 = require("@apollo/server/express4");
const graphql_1 = __importDefault(require("./graphql"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cors_1 = __importDefault(require("cors"));
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    const app = (0, express_1.default)();
    const PORT = process.env.PORT || 8000;
    // Middlewares
    app.use(express_1.default.json());
    app.use((0, cors_1.default)());
    // Start GraphQL Server
    const server = yield (0, graphql_1.default)();
    // Routes
    app.use('/graphql', (0, express4_1.expressMiddleware)(server, {
        context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
            const token = req.headers.authorization;
            try {
                const user = yield jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                return { user };
            }
            catch (error) {
                return {};
            }
        })
    }));
    app.get("/", (request, response) => {
        response.json({
            message: "Welcome...",
        });
    });
    // Server
    app.listen(PORT, () => {
        console.log(`Server is Running at http://localhost:${PORT}`);
    });
});
start();
