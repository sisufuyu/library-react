import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Root from 'pages/Root'
import Home from 'pages/Home'
import Book from 'pages/Book'
import Search from 'pages/Search'
import Login from 'pages/Login'
import Profile from 'pages/Profile'
import ErrorPage from 'pages/ErrorPage'
import Logout from 'pages/Logout'
import Dashboard from 'pages/Dashboard'
import ProtectedRoute from 'pages/ProtectedRoute'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path = "" element ={<Home />} />
          <Route path="books/:bookId" element={<Book />} />
          <Route path="search" element={<Search />} />
          <Route element={<ProtectedRoute permission={['USER', 'ADMIN']}/>} >
            <Route path="profile" element={<Profile />} />
          </Route>
          <Route element={<ProtectedRoute permission={['ADMIN']}/>} >
            <Route path="dashboard" element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
