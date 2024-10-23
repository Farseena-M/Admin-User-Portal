import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLogin from './pages/adminLogin'
import AddUser from './pages/AddUser'
import UsersList from './pages/UsersList'
import EditUser from './pages/EditUser'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<AdminLogin />} />
        <Route path='/adduser' element={<AddUser />} />
        <Route path='/users' element={<UsersList />} />
        <Route path='/edit-user/:userId' element={<EditUser />} />
      </Routes>
    </>
  )
}

export default App