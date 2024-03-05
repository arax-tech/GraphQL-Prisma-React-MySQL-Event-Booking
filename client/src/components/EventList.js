import { useMutation } from '@apollo/client';
import React from 'react'
import { DELETE_EVENT } from '../graphql/event/mutations';
import { toast } from 'react-toastify';
import moment from 'moment';
const EventList = ({ event, refetch, ViewEventDetails }) => {
    const user_id = localStorage.getItem("user_id");
    const [deleteEvent, { error }] = useMutation(DELETE_EVENT, {
        onCompleted(data) {
            refetch()
            toast.error("Event Delete Successfully...", { theme: "colored" })
        }
    })

    const DeleteEvent = (id) => {
        if (window.confirm("Are you sure to delete ?")) {
            deleteEvent({
                variables: {
                    deleteEventId: id
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
                      <h5 className="card-title">{event.title}</h5>
                      <h6 className="card-subtitle mb-2 text-body-secondary">{event.price}$</h6>
                  </div>
                  <div className='col-3'>
                      <button className='btn btn-primary  m-lg-1 ' onClick={() => ViewEventDetails(event.id)}>View Details</button>
                      {
                          user_id === event.user.id &&
                          <button onClick={() => DeleteEvent(event.id)} className='btn btn-danger'>Delete</button>
                      }
                      <p className="card-text">{moment(event?.data).format('DD MMM yyyy, hh:mm A')}</p>
                  </div>
              </div>

          </div>
      </div>
  )
}

export default EventList
