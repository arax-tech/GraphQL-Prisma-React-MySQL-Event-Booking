export const typeDefs = `
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