import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

const Header = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    const Logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        toast.success('Logout Successfully...', { theme: "colored" });
        navigate("/")
    }
    return (
        <nav className="navbar navbar-expand-lg bg-primary " data-bs-theme="dark">


            <div className="container">
                <Link className="navbar-brand" to="/home">Easy Event</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/home">Home</NavLink>
                        </li>

                        {
                            token &&
                            <React.Fragment>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/bookings">Bookings</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/profile">Profile</NavLink>
                                </li>
                            </React.Fragment>
                        }

                    </ul>
                    <div className="d-flex">
                        {
                            !token ?
                                <Link className="btn btn-dark" to="/login">Login</Link>
                                :
                                <button onClick={Logout} className="btn btn-dark">Logout</button>
                        }
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Header
