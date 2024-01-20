import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import ContactUs from "./components/contactus/ContactUs";
import Login from "./components/login/Login";
import Cart from "./components/cart/Cart";
import Shop from "./components/shop/Shop";
import ForgotPassword from "./components/forgotpassword/ForgotPassword";
import SignUp from "./components/signup/SignUp";
import Product from "./components/product/Product";
import Checkout from "./components/checkout/Checkout";
import Orders from "./components/orders/Orders";
import Addresspage from "./components/addresspage/Addresspage";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "./firebase";
import { setUser } from "./redux/Action";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PaymentPage from "./components/paymentpage/PaymentPage";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(setUser(user?.uid));
      } else dispatch(setUser(""));

      console.log(user);
    });

    return unsubscribe;
  });

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />

      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shop/:id" element={<Product />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/addresspage" element={<Addresspage />} />
          <Route path="/paymentpage" element={<PaymentPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;

// nav bar:   Home  shop contactUs     cart   login

//Home page: hero Image, some intro(content highlighting our shopping app), few main products

//In  shop page: put a serach bar and a category bar and all products will be shown and add to cart (product ---buy and proceed to checkout)

//contactUs:

// not logined/ looged: always step in  home page

// navigated to shop : if logged in ? product get elobarated :navigate to login page

// after logged in -log button get changed with an avatar (which has drop down with options of my orders(cancel, deliveray date),ccount settings,add card

// cart ---proceed to checkout -> review-> card details-> suceess-> my orders
