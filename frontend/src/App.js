import './App.css';
import Header from "./component/layout/Header/Header.js"
import { BrowserRouter as Router, Route } from "react-router-dom"
import Webfont from "webfontloader";
import React from "react";
import Footer from "./component/layout/Footer/footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails.js";
import Products from "./component/Product/Products.js";
import Search from "./component/Product/Search.js";
import LoginSignUp from './component/User/LoginSignUp.js';
import UserOptions from './component/layout/Header/UserOptions';
import { loadUser, updatePassword } from "./actions/userAction.js";
import store from "./store.js";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from './Route/ProtectedRoute.js';
import UpdateProfile from "./component/User/UpdateProfile.js";
import { updatePassword } from './component/User/UpdatePassword.js';
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";


function App() {


  const { isAuthenticated, user } = useSelector(state => state.user)
  React.useEffect(() => {
    Webfont.load({
      google: { families: ["Roboto", "Droid Sans", "Chilanks"], },

    });
  }, []);


  return
  <Router>
    <Header />
    {isAuthenticated && <UserOptions user={user} />}
    <Route exact path="/" component={Home} />
    <Route exact path="/product/:id" component={ProductDetails} />
    <Route exact path="/products" component={Products} />
    <Route path="/products:keyword" component={Products} />
    <Route exact path="/search" component={Search} />
    <ProtectedRoute exact path="/password/update" component={updatePassword} />
    <Route exact path="password/forgot" component={ForgotPassword} />
    <ProtectedRoute exact path="/account" component={Profile} />
    <Route exact path="/login" component={LoginSignUp} />
    <ProtectedRoute exact path="/me/account" component={UpdateProfile} />
    <Route exact path="/password/reset/:token" component={ResetPassword} />
    <Route exact path="cart" component={Cart} />
    <Footer />
  </Router>;

}

export default App;
