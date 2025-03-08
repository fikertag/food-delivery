import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//components
import Nav from "./components/Nav"
import Footer from "./components/Footer"
import {Toaster} from "react-hot-toast"

//pages
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup"
import Profile from './pages/Profile';
import UserTabs from './components/UserTab';
import Catagory from './pages/Catgory';
import Users from './pages/Users';
import Order from './pages/Order';
import MenuItems from './pages/MenuItems';
import UserProfile from './pages/UserProfile';
import Menu from './pages/Menu';
import Cart from './pages/Cart';

function App() {
  return (
    <>
    <Toaster />
    <Nav />
     <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/menu' element={<Menu />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/about' element={<UserTabs isAdmin={true} />} >
            <Route path='profile' element={<Profile />} />
            <Route path='categorie' element={<Catagory />} />
            <Route path='users' element={<Users />} />
            <Route path='users/editprofile/:id' element={<UserProfile />} />
            <Route path='orders' element={<Order />} />
            <Route path='menuitems' element={<MenuItems />} />
            
        </Route>
      </Routes>
    {/* <Footer /> */}

{/* <Router>
    <div>
      <Routes>
        <Route path="/login" element={<UserTabs />} />
        <Route path="/register" element={<UserTabs />} />
        <Route path="*" element={<Nav />} />
      </Routes>
      <Routes>
      <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </div>
  </Router> */}
    </>
      
    

  )
}

export default App
