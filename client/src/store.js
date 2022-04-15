import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { cartReducer } from "./reducers/CartReducer";
import { myOrderDeleteReducer, MyOrderReducer, OrderDeliveredDeleteReducer, orderDetailsReducers, OrderListReducer, orderPayReducer, orderReducers } from "./reducers/OrderReducer";
import { createProductReducer, productDeleteReducer, productDetailReducer, productListReducer, productReviewReducer, productUpdateReducer } from "./reducers/productReducer";
import { ReportConfirmReducer, reportCreateReducer, ReportDeleteReducer, reportDetailReducer, ReportListReducer, UserOrderdReportReducer } from "./reducers/ReportReducers";
import { userAdminDetailReducer, userDeleteReducer, userDetailsReducer, userListReducer, userReducer, userUpdateReducer } from "./reducers/userReducer";



const rootReducer = combineReducers({
    user: userReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userDetail: userDetailsReducer,
    userUpdate: userUpdateReducer,
    userAdminDetail: userAdminDetailReducer,
    cart: cartReducer,
    order: orderReducers,
    orderDetails: orderDetailsReducers,
    listProducts: productListReducer,
    productDetail: productDetailReducer,
    productUpdate: productUpdateReducer,
    productDelete: productDeleteReducer,
    createProduct: createProductReducer,
    orderPay: orderPayReducer,
    myOrder: MyOrderReducer,
    orderList: OrderListReducer,
    orderDelivered: orderDetailsReducers,
    productReviews: productReviewReducer,
    reportList: ReportListReducer,
    reportDetail: reportDetailReducer,
    reportCreate: reportCreateReducer,
    orderedUser: UserOrderdReportReducer,
    reportConfirm: ReportConfirmReducer,
    orderDelete: OrderDeliveredDeleteReducer,
    reportDelete: ReportDeleteReducer,
    myOrderDelete: myOrderDeleteReducer
})


const cartFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : []
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};


const init = {
    cart: {
        cartItems: cartFromLocalStorage,
        shippingAddress: shippingAddressFromLocalStorage
    }
};


const middleware = [thunk];
const store = createStore(rootReducer, init, composeWithDevTools(applyMiddleware(...middleware)));
export default store;