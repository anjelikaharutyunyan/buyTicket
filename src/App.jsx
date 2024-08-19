import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './screens/Home/Home'
import Login from './screens/Login/Login'
import Menu from "./components/Menu/Menu"
import Ticket from './screens/Ticket/Ticket'
import AboutUs from './screens/AboutUs/AboutUs'
import FavoriteTicket from './screens/FavoriteTicket/FavoriteTicket'

const App = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/favoriteTicket" element={<FavoriteTicket />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App
