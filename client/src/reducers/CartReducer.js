
export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {

    switch (action.type) {
        case 'cart_add_item':
            const item = action.payload;
            // it will return the whole object at that particular product
            const existItem = state.cartItems.find(x => x.product === item.product);

            if (existItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case 'cart_remove_item':
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        case 'cart_reset_item':
            return {
                cartItems: [],
                shippingAddress: {}
            }

        case 'cart_shipping_address':
            return {
                ...state,
                shippingAddress: action.payload
            }

        case 'cart_payment_method':
            return {
                ...state,
                paymentMethod: action.payload
            }




        default:
            return state;
    }

}