// import React from 'react'
// import { BrowserRouter,Routes,Route } from 'react-router-dom'
// import Home from '../../Screens/Home/Home'
// import Navbar from '../../Component/Navbar/Navbar'
// import Signup from '../../Screens/Signup/Signup'
// import Signin from '../../Screens/Signin/Signin'
// import ProductDetails from '../../Screens/productDetailpage/ProductDetails'
// import CardProduct from '../../Screens/CartProducts/CardProduct'
// import Footer from '../../Component/Footer/Footer'
// // import SellCenter from '../../Screens/SellCenter/SellCenter'
// import DashBoard from '../../Screens/SellCenter/DashBoard'

// const RouterConfig = () => {
//   return ( <>
//    <BrowserRouter>
//    <Navbar/>
//    <Routes>
//     <Route path='/' element={<Home/>}  />
//     <Route path='Singup' element={<Signup/>}  />
//     <Route path='Signin' element={<Signin/>}  />
//     <Route path='Product/:id' element={<ProductDetails/>}  />
//     <Route path='CartProducts' element={<CardProduct/>}  />
//     {/* <Route path='SellCenter' element={<SellCenter/>}  /> */}
//     <Route path='Dashboard' element={<DashBoard/>}  />



//    </Routes>
//    <Footer/>
//    </BrowserRouter>




//    </>)
// }

// export default RouterConfig









import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Home from '../../Screens/Home/Home';
import Navbar from '../../Component/Navbar/Navbar';
import Signup from '../../Screens/Signup/Signup';
import Signin from '../../Screens/Signin/Signin';
import ProductDetails from '../../Screens/productDetailpage/ProductDetails';
import CardProduct from '../../Screens/CartProducts/CardProduct';
import Footer from '../../Component/Footer/Footer';
import DashBoard from '../../Screens/SellCenter/DashBoard';
import AllProductsExplore from '../../Screens/all-products-explore/AllProductsExplore';
import TShirtProducts from '../../Screens/T-Shirt/TShirt';
import Bottomwear from '../../Screens/Bottomwear/Bottomwear';
import Causal from '../../Screens/Causal/Causal';
import MinimalTshirt from '../../Screens/Minimal T-shirt/MinimalTshirt'
import OversizeTshirts from '../../Screens/Oversize T-shirts/OversizeTshirts'
import ShirtProducts from '../../Screens/Shirts/Shirts';
// import UserProfile from '../../Screens/UserProfile/UserProfile';

const RouterConfig = () => {
  const location = useLocation();
  const isDashboard = location.pathname === '/Dashboard';

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="T-shirtsProducts" element={<TShirtProducts />} />
        <Route path="Bottomwear" element={<Bottomwear />} />
        <Route path="Causal" element={<Causal />} />
        <Route path="MinimalTshirt" element={<MinimalTshirt />} />
        <Route path="OversizeTshirts" element={<OversizeTshirts />} />
        <Route path="ShirtsProducts" element={<ShirtProducts />} />

        <Route path='Singup' element={<Signup />} />
        <Route path="Signup" element={<Signup />} />
        <Route path="ExploreProducts" element={<AllProductsExplore />} />


        <Route path="Signin" element={<Signin />} />
        <Route path="Product/:id" element={<ProductDetails />} />
        <Route path="CartProducts" element={<CardProduct />} />
        {/* <Route path="Profile" element={<UserProfile/>} /> */}
        <Route path="Dashboard" element={<DashBoard />} />
      </Routes>
      {!isDashboard && <Footer />}
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <RouterConfig />
  </BrowserRouter>
);

export default App;
