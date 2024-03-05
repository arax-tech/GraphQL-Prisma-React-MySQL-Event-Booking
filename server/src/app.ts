import dotenv from 'dotenv'
dotenv.config();

import express from 'express'
import {expressMiddleware} from '@apollo/server/express4'
import GraphQLServer from './graphql';
import JWT from "jsonwebtoken";
import cors from "cors";

const start = async() => {
    const app = express();
    const PORT = process.env.PORT || 8000;

    // Middlewares
    app.use(express.json());
    app.use(cors());

    // Start GraphQL Server
    const server = await GraphQLServer();

    // Routes
    app.use('/graphql', expressMiddleware(server,{
        context:async({req}) => {
            const token = req.headers.authorization;
            try {
                const user = await JWT.verify(token as string, process.env.JWT_SECRET as string);
                return { user };
            } catch (error) {
                return {};
            }
        }
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


}

start();
