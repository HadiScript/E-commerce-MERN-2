import axios from "axios";


//  get state becouse we want to store in the local stroage
export const addToCart = (id, qty, userId) => async (dispatch, getstate) => {

    const { data } = await axios.get(`http://localhost:8000/api/products/${id}`);
    dispatch({
        type: 'cart_add_item',
        payload: {
            product: data._id,
            name: data.name,
            price: data.price,
            countInStock: data.countInStock,
            images: data.images,
            qty,
            userId: userId
        }
    });

    // getstate() ----> goes to combine reducer
    // getstate().cart ---> in combine reducer have cart where cartItems present
    // so its similiar to useSelector;
    // & its give the JS object and localStorage always save the string;
    // JSON.stringfy convert to string & JSON.parse convert back to object

    localStorage.setItem('cartItems', JSON.stringify(getstate().cart.cartItems))
}


export const removeCart = (id) => async (dispatch, getstate) => {
    dispatch({ type: 'cart_remove_item', payload: id });
    localStorage.removeItem('cartItems');
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    localStorage.removeItem('phoneNumber')
}


export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({ type: 'cart_shipping_address', payload: data });
    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => async (dispatch) => {
    dispatch({ type: 'cart_payment_method', payload: data });
    localStorage.setItem('paymentMethod', JSON.stringify(data))
}



