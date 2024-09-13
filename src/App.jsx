import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './screens/Home/Home'
import Login from './screens/Login/Login'
import Menu from "./components/Menu/Menu"
import Ticket from './screens/Ticket/Ticket'
import AboutUs from './screens/AboutUs/AboutUs'
import FavoriteTicket from './screens/FavoriteTicket/FavoriteTicket'
import './components/i18next/i18next';
import Statistics from './screens/Statistics/Statistics';
import Footer from './components/Footer/Footer';


const App = () => {
  return (
    <Router>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/statistic" element={<Statistics />} />
        <Route path="/favoriteTicket" element={<FavoriteTicket />} />
        <Route path="/aboutUs" element={<AboutUs />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
