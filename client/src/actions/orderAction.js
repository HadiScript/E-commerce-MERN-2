import axios from "axios";
import { removeCart } from "./cartAction";

export const createOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'order_create_request' });

        const { user } = getState();
        // console.log(user, "from create order")

        const config = {
            headers: {
                "Content-Type": "Application/json",
                authtoken: `${user.token}`
            }
        }
        const { data } = await axios.post(`http://localhost:8000/api/orders/`, order, config);
        dispatch({ type: 'order_create_success', payload: data });


    }
    catch (error) {
        dispatch({
            type: 'order_create_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}



export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'order_details_request' });

        const { user } = getState();
        // console.log(user, "from getOrderDetails");


        const config = {
            headers: {
                // "Content-Type": "Application/json",
                authtoken: `${user.token}`
            }
        }
        const { data } = await axios.get(`http://localhost:8000/api/orders/${id}`, config);
        dispatch({ type: 'order_details_success', payload: data });

    }
    catch (error) {
        dispatch({
            type: 'order_details_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}

export const confirmOrder = (orderId,) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'order_pay_request' });

        const { user } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                authtoken: user.token ? `${user.token}` : ""
            }
        }
        if (user.token) {
            const { data } = await axios.put(`http://localhost:8000/api/orders/${orderId}/confirm`, {}, config);
            dispatch({ type: 'order_pay_success' });

        }
    }
    catch (error) {
        dispatch({
            type: 'order_pay_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
};

export const myOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: 'my_order_request' });
        let bool = false;

        const { user } = getState();

        const config = {
            headers: {
                // "Content-Type": "application/json",
                authtoken: user.token ? `${user.token}` : ""
            }
        }

        const { data } = await axios.post(`http://localhost:8000/api/orders/myorders`, { email: user.email }, config);
        dispatch({ type: 'my_order_success', payload: data });

    }
    catch (error) {
        dispatch({
            type: 'my_order_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
};


export const OrdersList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: 'order_list_request' });
        let bool = false;

        const { user } = getState();

        const config = {
            headers: {
                // "Content-Type": "application/json",
                authtoken: user.token ? `${user.token}` : ""
            }
        }

        const { data } = await axios.get(`http://localhost:8000/api/orders/`, config);
        dispatch({ type: 'order_list_success', payload: data });

    }
    catch (error) {
        dispatch({
            type: 'order_list_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
};

export const OrderDelivered = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'order_deliver_request' });
        let bool = false;

        const { user } = getState();

        const config = {
            headers: {
                // "Content-Type": "application/json",
                authtoken: user.token ? `${user.token}` : ""
            }
        }

        const { data } = await axios.put(`http://localhost:8000/api/orders/${id}/deliver/pay`, {}, config);
        dispatch({ type: 'order_deliver_success', payload: data });

    }
    catch (error) {
        dispatch({
            type: 'order_deliver_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
};


export const OrderDeliveredDelete = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'order_deliver_delete_request' });
        let bool = false;

        const { user } = getState();

        const config = {
            headers: {
                authtoken: user.token ? `${user.token}` : ""
            }
        }

        const { data } = await axios.delete(`http://localhost:8000/api/orders/${id}`, config);
        dispatch({ type: 'order_deliver_delete_success' });
        console.log(data, 'from order action delete orders')

    }
    catch (error) {
        dispatch({
            type: 'order_deliver_delete_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
};


export const myOrdersDelete = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'myorder_delete_request' });
        let bool = false;

        const { user } = getState();

        const config = {
            headers: {
                authtoken: user.token ? `${user.token}` : ""
            }
        }

        const { data } = await axios.delete(`http://localhost:8000/api/orders/myorders/${id}`, config);
        dispatch({ type: 'myorder_delete_success' });
        console.log(data, 'from order action delete orders')

    }
    catch (error) {
        dispatch({
            type: 'myorder_delete_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
};