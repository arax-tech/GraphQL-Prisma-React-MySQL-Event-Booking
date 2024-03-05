import {ApolloServer} from '@apollo/server'
import { Event } from './event';
import { User } from './user';
import { Booking } from './booking';


const GraphQLServer = async () => {

    // Create GraphQL Server
    const typeDefs = `
        # type
            ${User.typeDefs}
            ${Event.typeDefs}
            ${Booking.typeDefs}
        type Query{
            ${User.queries}
            ${Event.queries}
            ${Booking.queries}
        }
        type Mutation {
            ${Event.mutations}
            ${User.mutations}
            ${Booking.mutations}
        }
    `;


    
    
    const resolvers = {
        Query:{
            ...User.resolvers.queries,
            ...Event.resolvers.queries,
            ...Booking.resolvers.queries,
        },
        Mutation:{
            ...User.resolvers.mutations,
            ...Event.resolvers.mutations,
            ...Booking.resolvers.mutations,
        }
    };


    const server = new ApolloServer({
        typeDefs,
        resolvers
    });

    await server.start();

    return server;
};

export default GraphQLServer;