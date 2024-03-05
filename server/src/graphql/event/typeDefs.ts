export const typeDefs = `
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
