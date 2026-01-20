import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Explore from './pages/Explore'
import Create from './pages/Create'
import Profile from './pages/Profile'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Layout from './components/Layout'
import { DataProvider } from './context/DataContext'

function App() {
  return (
    <DataProvider>
      <Routes>
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
         <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/create" element={<Create />} />
            <Route path="/profile" element={<Profile />} />
         </Route>
      </Routes>
    </DataProvider>
  )
}

export default App
