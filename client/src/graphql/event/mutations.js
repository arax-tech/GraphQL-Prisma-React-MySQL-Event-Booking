import { gql } from '@apollo/client'

export const CREATE_EVENT = gql`
    mutation CreateEvent($title: String!, $price: String!, $description: String!, $date: String!){
        event:createEvent(title: $title, price: $price, description: $description, date: $date) {
            title
        }
    }
 `;
export const DELETE_EVENT = gql`
    mutation DeleteEvent($deleteEventId: ID!){
        event:deleteEvent(id: $deleteEventId)
    }
 `;