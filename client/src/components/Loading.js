import React from 'react'
import './Loading.css'
const Loading = () => {
    return (
        <div className="container mt-5 d-flex align-items-center justify-content-center">
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loading
