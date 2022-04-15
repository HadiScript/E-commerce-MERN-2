import React, { useEffect, lazy, Suspense } from "react";

import { useDispatch } from "react-redux";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'
import { Switch, Route } from "react-router-dom";
import { currentUser } from "./oop/AuthFunc";


import { auth } from "./firebase";
import { LoadingOutlined } from "@ant-design/icons";
import Other from "./screens/Categories/Other";
const Home = lazy(() => import('./screens/Home'))
const Login = lazy(() => import("./screens/Login"))
const Header = lazy(() => import("./components/Header"))
const Register = lazy(() => import("./screens/Register"));
const ForgotPassword = lazy(() => import("./screens/ForgotPassword"))
const RegisterComplete = lazy(() => import("./screens/RegisterComplete"))
const UserHistory = lazy(() => import("./screens/UserHistory"))
const UserRoutes = lazy(() => import("./components/UserRoutes"))
const Password = lazy(() => import("./screens/Password"))
const WishList = lazy(() => import("./screens/WishList"));
const AdminRoutes = lazy(() => import("./components/AdminRoutes"));
const AdminDashboard = lazy(() => import("./screens/AdminDasboard"));
const ProductDetail = lazy(() => import("./screens/ProductDetail"));
const CartScreen = lazy(() => import("./screens/CartScreen"));
const ShippingScreen = lazy(() => import("./screens/Shipping"));
const Payment = lazy(() => import("./screens/Payment"));
const PlacingOrder = lazy(() => import("./screens/PlacingOrder"));
const Order = lazy(() => import("./screens/Order"));
const CreateProduct = lazy(() => import("./screens/CreateProduct"));
const ProductEditScreen = lazy(() => import("./screens/ProductEditScreen"));
const AdminProduct = lazy(() => import("./screens/AdminProducts"));
const MyOrder = lazy(() => import("./screens/MyOrder"));
const AdminOrderList = lazy(() => import("./screens/AdminOrderList"));
const AdminOrderDetails = lazy(() => import("./screens/AdminOrderDetails"));
const UserListScreens = lazy(() => import("./screens/UserListScreen"));
const UserEditScreen = lazy(() => import("./screens/UserEditScreen"));
const Laptops = lazy(() => import("./screens/Categories/Laptops"));
const Watch = lazy(() => import("./screens/Categories/Watch"));
const Accessories = lazy(() => import("./screens/Categories/Accessories"));
const Mobiles = lazy(() => import("./screens/Categories/Mobiles"));
const SmartTv = lazy(() => import("./screens/Categories/SmartTv"));
const Camera = lazy(() => import("./screens/Categories/Cameras"));
const Tripods = lazy(() => import("./screens/Categories/Tripods"));
const HeadPhones = lazy(() => import("./screens/Categories/Headphones"));
const Suppliers = lazy(() => import("./screens/Suppliers"));
const AdminReports = lazy(() => import("./screens/AdminReports"));
const AdminUserDetail = lazy(() => import("./screens/AdminUserDetail"));
const NotFound = lazy(() => import("./screens/NotFound"));
const SuppliersDetail = lazy(() => import("./screens/SuppliersDetail"));




const App = () => {

  const dispatch = useDispatch()

  // for current login user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      // may user undefined
      if (user) {
        const token = await user.getIdTokenResult();

        currentUser(token.token)
          .then(
            res => {
              dispatch({
                type: 'logged_in_user',
                payload: {
                  email: res.data.email,
                  token: token.token,
                  name: res.data.name,
                  _id: res.data._id,
                  isAdmin: res.data.isAdmin
                }
              })
            }
          )
          .catch(
            err => console.log(err)
          )
      }
    });

    // cleaning 
    return () => unsubscribe();
  }, [])


  return (
    <Suspense fallback={
      <div><div className="col text-center p-5">
        __ Dev Project
        <LoadingOutlined />
        for Software Engineering __
      </div></div>
    }>
      <Header />
      <ToastContainer />
      <Switch>

        <Route exact path="/" component={Home} />
        <Route path="/page/:pageNumber" component={Home} />
        <Route path="/search/:keyword/page/:pageNumber" component={Home} />
        <Route path='/search/:keyword' component={Home} />

        <Route exact path="/login" component={Login} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/register/complete" component={RegisterComplete} />

        <UserRoutes exact path="/user/history" component={UserHistory} />
        <UserRoutes exact path="/user/password" component={Password} />
        <UserRoutes exact path="/user/wishlist" component={WishList} />

        <Route exact path="/shipping" component={ShippingScreen} />
        <Route exact path="/payment" component={Payment} />
        <Route exact path="/placingOrder" component={PlacingOrder} />
        <Route exact path="/order/:id" component={Order} />

        <UserRoutes exact path="/myorders" component={MyOrder} />

        <Route exact path="/cart" component={CartScreen} />


        <Route exact path="/product/:id" component={ProductDetail} />


        <AdminRoutes exact path="/admin/dashboard" component={AdminDashboard} />
        <AdminRoutes exact path="/create/product" component={CreateProduct} />
        <AdminRoutes exact path="/admin/product/:id/edit" component={ProductEditScreen} />

        <AdminRoutes exact path="/admin/products" component={AdminProduct} />
        <AdminRoutes path='/admin/product/:keyword' component={AdminProduct} />
        <Route path='/admin/orders/:pageNumber' exact component={AdminProduct} />

        <AdminRoutes exact path="/admin/password" component={Password} />
        <AdminRoutes exact path="/admin/supplier" component={Suppliers} />
        <AdminRoutes exact path="/admin/supplier/:name" component={SuppliersDetail} />
        <AdminRoutes exact path="/admin/report" component={AdminReports} />
        <AdminRoutes exact path="/admin/orders" component={AdminOrderList} />
        <AdminRoutes exact path="/admin/order/:id" component={AdminOrderDetails} />
        <AdminRoutes exact path="/admin/user/:id" component={AdminUserDetail} />

        <AdminRoutes exact path="/admin/user" component={UserListScreens} />
        <AdminRoutes path='/user/:keyword' component={UserListScreens} />

        <AdminRoutes exact path="/admin/user/:id/edit" component={UserEditScreen} />


        <Route exact path="/category/laptops" component={Laptops} />
        <Route exact path="/category/watch" component={Watch} />
        <Route exact path="/category/accessories" component={Accessories} />
        <Route exact path="/category/mobile" component={Mobiles} />
        <Route exact path="/category/smarttv" component={SmartTv} />
        <Route exact path="/category/cameras" component={Camera} />
        <Route exact path="/category/tripods" component={Tripods} />
        <Route exact path="/category/headphones" component={HeadPhones} />
        <Route exact path="/category/other" component={Other} />

        <Route path="*" component={NotFound} />
      </Switch>
    </Suspense>
  );
};

export default App;
