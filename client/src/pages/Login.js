import React, { useEffect, useState } from 'react'
import App from './layouts/App'
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../components/MetaData'
import { useMutation } from '@apollo/client';
import { LOGIN } from '../graphql/auth/mutations.js';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
const Login = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    useEffect(() => {
        token && navigate("/home")
    }, [navigate, token])



    const [login, setlogin] = useState({
        email: "",
        password: "",
    });
    const InpChange = (event) => {
        setlogin({ ...login, [event.target.name]: event.target.value });
    };



    const [LoginUser, { error, loading }] = useMutation(LOGIN, {
        onCompleted(data) {
            localStorage.setItem("token", data.login.token);
            localStorage.setItem("user_id", data.login.user.id);
            toast.success("Login Successfully...", { theme: "colored" })
            navigate("/home");
        },
    });
    const OnSubmit = (event) => {
        event.preventDefault();
        LoginUser({
            variables: {
                email: login.email,
                password: login.password,
            },
        });
    };
    if (error && error) { toast.error(error.message, { theme: "colored" }) }
    return (
        <App>

            <MetaData title='Login' />
            <div className="container mt-5 d-flex align-items-center justify-content-center">
                <div className="card" style={{ width: "30rem" }}>
                    <div className="card-body p-0">
                        <h2 className="card-title text-center p-4 bg-light ">Login</h2>
                        {
                            loading ? <Loading /> :
                                <form method='post' className='p-4' onSubmit={OnSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Email <span className='text-danger'>*</span></label>
                                        <input type="email" onChange={InpChange} value={login.email} autoFocus className="form-control form-control-lg" name='email' required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password <span className='text-danger'>*</span></label>
                                        <input type="password" onChange={InpChange} value={login.password} className="form-control form-control-lg" name="password" required />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg  w-100 ">Login</button>

                                </form>
                        }

                        <Link to={'/register'} className="btn btn-link p-4 pt-0 ">Don't Have a Account ? Register </Link>

                    </div>
                </div>
            </div>
        </App>
    )
}

export default Login
