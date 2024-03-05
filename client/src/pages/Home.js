import React, { useState } from 'react'
import App from './layouts/App'
import MetaData from '../components/MetaData'
import { CREATE_EVENT } from '../graphql/event/mutations';
import { toast } from 'react-toastify';
import Loading from '../components/Loading';

import { useMutation, useQuery } from '@apollo/client';
import { GET_EVENTS, GET_SINGLE_EVENT } from '../graphql/event/queries';
import EventList from '../components/EventList';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import moment from 'moment';
import { BOOK_EVENT } from '../graphql/booking/mutations';
import { GET_BOOKINGS } from '../graphql/booking/queries';

const Home = () => {

    const [events, setEvents] = useState({
        title: "",
        price: "",
        date: "",
        description: "",
    });
    const InpChange = (event) => {
        setEvents({ ...events, [event.target.name]: event.target.value });
    };

    const { refetch: refetchBookings } = useQuery(GET_BOOKINGS);
    
    // Mutations
    const { data, refetch, loading: GetEventLoading } = useQuery(GET_EVENTS);
    const [createEvent, { error, loading }] = useMutation(CREATE_EVENT, {
        onCompleted(data) {
            refetch()
            toast.success("Event Create Successfully...", { theme: "colored" })
            setEvents({
                title: "",
                price: "",
                date: "",
                description: "",
            });
            setEventModal(false); 
        },
    });
    
    const [bookEvent, { error:bookError, loading:bookLoading }] = useMutation(BOOK_EVENT, {
        onCompleted(data) {
            toast.success("Event Booked Successfully...", { theme: "colored" })
            setEventModalDetail(false)
            refetchBookings()
        },
    });


    // useQuery
    const [eventId, setEventId] = useState(null);
    
    const { loading: singleEventLoading, error: singleEventError, data: singleEventData } = useQuery(GET_SINGLE_EVENT, {
        variables: { eventId },
        skip: !eventId,
    });

    

    // Functions
    const OnSubmit = (event) => {
        event.preventDefault();
        createEvent({
            variables: {
                title: events.title,
                price: events.price,
                description: events.description,
                date: events.date,
            }
        })
    }


    const ViewEventDetails = (id) => {
        setEventModalDetail(true);
        setEventId(id);

    }
    
    const BooKEvent = (id) => {
        bookEvent({
            variables:{
                eventId:id
            }
        })

    }


    const [eventModal, setEventModal] = useState(false);
    const [eventModalDetail, setEventModalDetail] = useState(false);

    // Error Handler
    if (error && error) { toast.error(error.message, { theme: "colored" }) }
    if (singleEventError && singleEventError) { toast.error(singleEventError.message, { theme: "colored" }) }
    if (bookError && bookError) { toast.error(bookError.message, { theme: "colored" }) }

    const token = localStorage.getItem('token');
    const user_id = localStorage.getItem("user_id");
    return (
        <App>
            <MetaData title='Home' />

            <div className='container mt-3 mb-5'>
                <h2>
                    Events
                    {
                        token &&
                        <button type="button" className="btn btn-primary float-end " onClick={() => setEventModal(true)}>
                            Create Event
                        </button>
                    }

                    <Modal
                        show={eventModal}
                        // size="lg"
                        onHide={() => setEventModal(false)}
                        backdrop="static"
                        keyboard={false}
                    >
                        <Modal.Header className='bg-primary text-white' closeButton>
                            <Modal.Title>Create Event</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {
                                loading ? <Loading /> :
                                    <form method='post' className='row' onSubmit={OnSubmit}>
                                        <div className="col-12  mb-2">
                                            <label className="form-label">Title <span className='text-danger'>*</span></label>
                                            <input type="text" onChange={InpChange} value={events.title} className="form-control" name='title' autoFocus required />
                                        </div>
                                        <div className="col-6  mb-2">
                                            <label className="form-label">Price <span className='text-danger'>*</span></label>
                                            <input type="text" onChange={InpChange} value={events.price} className="form-control" name='price' required />
                                        </div>
                                        <div className="col-6  mb-2">
                                            <label className="form-label">Date <span className='text-danger'>*</span></label>
                                            <input type="datetime-local" onChange={InpChange} value={events.date} className="form-control" name="date" required />
                                        </div>
                                        <div className="col-12 mb-3   mb-2">
                                            <label className="form-label">Description</label>
                                            <textarea onChange={InpChange} value={events.description} className="form-control" name="description" rows="3"></textarea>
                                        </div>
                                        <div className="col-12 mb-2">
                                            <button type="submit" className="btn btn-primary col-12 ">Create</button>

                                        </div>


                                    </form>
                            }
                        </Modal.Body>
                    </Modal>

                </h2>
                {
                    GetEventLoading ? <Loading /> :
                        data?.events?.map((event, index) => (
                            <EventList key={index} event={event} ViewEventDetails={ViewEventDetails} refetch={refetch} />
                        ))
                }

                {
                    singleEventLoading || bookLoading ? <Loading /> :
                        <>
                            <Modal
                                show={eventModalDetail}
                                onHide={() => setEventModalDetail(false)}
                                backdrop="static"
                                keyboard={false}

                            >
                                <Modal.Header className="bg-primary text-white" closeButton>
                                    <Modal.Title>{singleEventData?.event?.title}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>

                                    <h4>${singleEventData?.event?.price}</h4>
                                    <p>{singleEventData?.event?.description}</p>
                                    <p className="card-text">{moment(singleEventData?.event?.data).format('DD MMM yyyy, hh:mm A')}</p>


                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={() => setEventModalDetail(false)}>
                                        Close
                                    </Button>
                                    {
                                        user_id === singleEventData?.event?.user?.id ? '' :
                                            <Button variant="primary" onClick={() => BooKEvent(singleEventData?.event?.id)}>
                                                Book Now
                                            </Button>
                                    }
                                </Modal.Footer>
                            </Modal>
                        </>
                }

            </div>
        </App>
    )
}

export default Home
