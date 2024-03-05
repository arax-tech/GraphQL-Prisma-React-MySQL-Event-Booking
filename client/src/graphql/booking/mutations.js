import { gql } from '@apollo/client'

export const BOOK_EVENT = gql`
    mutation BookEvent($eventId: String!) {
         event : bookEvent(event_id: $eventId) {
            id
        }
    }
 `;
export const CANCEL_BOOKING = gql`
    mutation CancelBooking($cancelBookingId: String!){
        cancelBooking(id: $cancelBookingId) 
    }
 `;
