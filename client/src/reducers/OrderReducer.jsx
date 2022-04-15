



export const orderReducers = (state = {}, action) => {

    switch (action.type) {

        case 'order_create_request':
            return {
                loading: true
            }

        case 'order_create_success':
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case 'order_create_fail':
            return {
                loading: false,
                error: action.payload
            }


        default:
            return state;
    }

}



export const orderDetailsReducers = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {

    switch (action.type) {

        case 'order_details_request':
            return {
                loading: true
            }

        case 'order_details_success':
            return {
                loading: false,
                success: true,
                order: action.payload
            }
        case 'order_details_fail':
            return {
                loading: false,
                error: action.payload
            }


        default:
            return state;
    }

}


export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case 'order_pay_request':
            return {
                loading: true
            }
        case 'order_pay_seccess':
            return {
                loading: false,
                success: true,
            }
        case 'order_pay_fail':
            return {
                loading: false,
                error: action.payload
            }
        case 'order_pay_reset':
            return {}
        default:
            return state;
    }
}

export const MyOrderReducer = (state = { orders: [] }, action) => {

    switch (action.type) {
        case 'my_order_request':
            return {
                loading: true
            }
        case 'my_order_success':
            return {
                loading: false,
                orders: action.payload
            }
        case 'my_order_fail':
            return {
                loading: false,
                error: action.payload
            }
        case 'my_order_reset':
            return {
                orders: []
            }
        default:
            return state;
    }
}


export const OrderListReducer = (state = { orders: [] }, action) => {

    switch (action.type) {
        case 'order_list_request':
            return {
                loading: true
            }
        case 'order_list_success':
            return {
                loading: false,
                orders: action.payload
            }
        case 'order_list_fail':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


export const orderDeliveredReducer = (state = {}, action) => {

    switch (action.type) {
        case 'order_deliver_request':
            return {
                loading: true
            }
        case 'order_deliver_success':
            return {
                loading: false,
                success: true
            }
        case 'order_deliver_fail':
            return {
                loading: false,
                error: action.payload
            }

        case 'order_deliver_reset':
            return {}
        default:
            return state;
    }
}


// OrderDelivered

export const OrderDeliveredDeleteReducer = (state = {}, action) => {

    switch (action.type) {

        case 'order_deliver_delete_request':
            return {
                loading: true
            }
        case 'order_deliver_delete_success':
            return {
                loading: false,
                success: true
            }
        case 'order_deliver_delete_fail':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}


export const myOrderDeleteReducer = (state = {}, action) => {

    switch (action.type) {

        case 'myorder_delete_request':
            return {
                loading: true
            }
        case 'myorder_delete_success':
            return {
                loading: false,
                success: true
            }
        case 'myorder_delete_fail':
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}