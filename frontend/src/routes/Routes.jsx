import React from 'react'
import {Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Header from '../layout/Header'
import NotFound from '../pages/NotFound'
import EditNote from '../pages/EditNote'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element = {<Header/>}> 
            <Route index element = {<Dashboard/>}/>
            <Route path='/login' element = {<Login/>}/>
            <Route path='/register' element = {<Register/>}/>
            <Route path='/edit-notes' element = {<EditNote/>}/>
            <Route path='*' element = {<NotFound/>} />
        </Route>    
    )
)
export default router