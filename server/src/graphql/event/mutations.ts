export const mutations = `
    createEvent(
        title:String!
        price:String!
        date:String!
        description:String
    ) : Event
    deleteEvent(id:ID!) : String
`