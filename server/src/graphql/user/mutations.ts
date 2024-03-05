export const mutations = `
    register(
        name        :   String!,
        email       :   String!,
        password    :   String!,
    ):String,
    login(email:String!, password:String!):AuthData

`;