import { gql } from '@apollo/client'

export const GET_EVENTS = gql`
    query GetEvents {
        events {
            id
            title
            price
            date
            createdAt
            user {
                id
                name
            }
        }
    }
 `;

 export const GET_SINGLE_EVENT = gql`
    query SingleEvent($eventId: ID!) {
        event(id: $eventId) {
            id
            title
            price
            date
            description
            createdAt
            user {
                id
                name
            }
        }
    }
 `;