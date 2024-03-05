import { useMutation } from '@apollo/client';
import React from 'react'
import { toast } from 'react-toastify';
import { CANCEL_BOOKING } from '../graphql/booking/mutations';
import moment from 'moment';
const Booking = ({ booking, refetch }) => {
   
    const [cancelBooking, { error }] = useMutation(CANCEL_BOOKING, {
        onCompleted(data) {
            refetch()
            toast.error("Book Cancelled Successfully...", { theme: "colored" })
        }
    })

    const CancelBookings = (id) => {
        if (window.confirm("Are you sure to cancel booking ?")) {
            cancelBooking({
                variables: {
                    cancelBookingId: id
                }
            })
        }

    }

    if (error && error) { toast.error(error.message, { theme: "colored" }) }
    return (
        <div className="card bg-light mb-2 " style={{ width: "100%" }}>
            <div className="card-body">
                <div className='row'>
                    <div className='col-9'>
                        <h5 className="card-title">{booking?.event?.title}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">{booking?.event?.price}$</h6>
                        <p>{booking?.event?.description}</p>
                        <p className="card-text">{moment(booking?.event?.data).format('DD MMM yyyy, hh:mm A')}</p>
                    </div>
                    <div className='col-3'>
                        <button className='btn btn-danger' onClick={() => CancelBookings(booking?.id)}>Cancel</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Booking
