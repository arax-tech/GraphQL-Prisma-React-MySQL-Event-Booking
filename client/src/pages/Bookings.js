import React from 'react'
import App from './layouts/App'
import { useQuery } from '@apollo/client'
import { GET_BOOKINGS } from '../graphql/booking/queries'
import Booking from '../components/Booking'
import Loading from '../components/Loading'
import { toast } from 'react-toastify'

const Bookings = () => {

    const { refetch, data, error, loading } = useQuery(GET_BOOKINGS);
    if (error && error) { toast.error(error.message, { theme: "colored" }) }
    return (
        <App>
            {
                loading ? <Loading /> :
                    <div className='container  mt-3 mb-5'>
                        <h2>My Bookings</h2>
                        {
                            data?.bookings?.map((booking, index) => (
                                <Booking key={index} booking={booking} refetch={refetch} />
                            ))
                        }
                    </div>
            }
        </App>
    )
}

export default Bookings
