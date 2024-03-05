import React, { useEffect, useState } from 'react'
import App from './layouts/App'
import { Link, useNavigate } from 'react-router-dom';
import MetaData from '../components/MetaData'
import { useMutation } from '@apollo/client';
import { REGISTER } from '../graphql/auth/mutations.js';
import Loading from '../components/Loading';
import { toast } from 'react-toastify';
const Register = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    useEffect(() => {
        token && navigate("/home")
    }, [navigate, token])



    const [register, setRegister] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const InpChange = (event) => {
        setRegister({ ...register, [event.target.name]: event.target.value });
    };



    const [RegisterUser, { error, loading }] = useMutation(REGISTER, {
        onCompleted(data) {
            toast.success(data.register, { theme: "colored" })
            navigate("/login");
        },
    });
    const OnSubmit = (event) => {
        event.preventDefault();
        if (register.password === register.confirmPassword) {
            RegisterUser({
                variables: {
                    name: register.name,
                    email: register.email,
                    password: register.password,
                },
            });
        } else {
            alert('Password Confirmation Does not matched...')
        }
    };

    if (error && error) { toast.error(error.message, { theme: "colored" }) }
    
    return (
        <App>

            <MetaData title='Register' />
            <div className="container mt-5 d-flex align-items-center justify-content-center">
                <div className="card" style={{ width: "30rem" }}>
                    <div className="card-body p-0">
                        <h2 className="card-title text-center p-4 bg-light ">Register Login</h2>
                        {
                            loading ? <Loading /> :
                                <form method='post' className='p-4' onSubmit={OnSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Name <span className='text-danger'>*</span></label>
                                        <input type="text" onChange={InpChange} value={register.name} className="form-control form-control-lg" name='name' autoFocus required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Email <span className='text-danger'>*</span></label>
                                        <input type="email" onChange={InpChange} value={register.email} className="form-control form-control-lg" name='email' required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Password <span className='text-danger'>*</span></label>
                                        <input type="password" onChange={InpChange} value={register.password} className="form-control form-control-lg" name="password" required />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Confirm Password <span className='text-danger'>*</span></label>
                                        <input type="password" onChange={InpChange} value={register.confirmPassword} className="form-control form-control-lg" name="confirmPassword" required />
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg  w-100 ">Register</button>

                                </form>
                        }

                        <Link to={'/login'} className="btn btn-link p-4 pt-0 ">Have a Account ? Login </Link>

                    </div>
                </div>
            </div>
        </App>
    )
}

export default Register
