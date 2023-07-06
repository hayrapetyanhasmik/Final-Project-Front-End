import { Route, Routes } from "react-router-dom";
import Products from "../components/Products/Products";
import Registration from "../pages/Registration/registration";
import Home from "../pages/Home/home";
import Login from "../pages/Login/login";
import Cart from "../components/Cart/Cart";
import Layout from "../Layouts/Layout";
import Description from "../pages/Description/Description";
import About from "../pages/About/About";

export default function MainRoutes(){
    
    return(
        <div>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/" element={<Home/>} /> 
                    <Route path="/shop" element={<Products/>} /> 
                    <Route path="/about" element={<About />} />
                    <Route path="/register" element={<Registration />} />
                    <Route path="/login" element={<Login />} /> 
                    <Route path="/cart/:id" element={<Cart />} />
                    <Route path="/description/:id" element={<Description />} />
                </Route>
            </Routes>
        </div>
    )
}