import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import Login from './pages/Login'
import Register from './pages/Register'

import Home from './pages/Home'
import Bookings from './pages/Bookings'
import Profile from './pages/Profile'
import PageNotFound from './pages/PageNotFound'

import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
const App = () => {
    return (
        <Routes>
            <Route path='/' exect element={<Navigate to='/login' />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/home' element={<Home />} />
            <Route path='/bookings' element={<Bookings />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='*' element={<PageNotFound />} />
        </Routes>
    )
}

export default App
