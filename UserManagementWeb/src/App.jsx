import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddUser from './pages/AddUser'
import UsersList from './pages/UsersList'
import EditUser from './pages/EditUser'
import UserProfile from './pages/UserProfile'
import Login from './pages/Login'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/adduser' element={<AddUser />} />
        <Route path='/users' element={<UsersList />} />
        <Route path='/edit-user/:userId' element={<EditUser />} />
        <Route path='/profile' element={<UserProfile />} />
      </Routes>
    </>
  )
}

export default App