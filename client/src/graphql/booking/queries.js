import { gql } from '@apollo/client'

export const GET_BOOKINGS = gql`
    query GetBookings {
        bookings {
            id
            event {
                id
                title
                price
                date
                description
                createdAt
            }
            user {
                id
                name
            }
            createdAt
        }
    }
 `;

