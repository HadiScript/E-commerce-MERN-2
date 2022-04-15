

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'product_list_request':
            return { loading: true, products: [] }
        case 'product_list_success':
            return {
                loading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                page: action.payload.page
            }
        case 'product_list_fail':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const productDetailReducer = (state = { product: { reviews: [] } }, action) => {

    switch (action.type) {

        case 'product_detail_request':
            return { loading: true, ...state }
        case 'product_detail_success':
            return { loading: false, product: action.payload }
        case 'product_detail_fail':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}


export const productUpdateReducer = (state = { product: {} }, action) => {

    switch (action.type) {

        case 'product_update_request':
            return { loading: true, ...state }
        case 'product_update_success':
            return { loading: false, success: true, product: action.payload }
        case 'product_update_fail':
            return { loading: false, error: action.payload }
        case 'product_create_reset':
            return { product: {} }
        default:
            return state;
    }
}



export const productDeleteReducer = (state = {}, action) => {

    switch (action.type) {

        case 'product_delete_request':
            return { loading: true, ...state }
        case 'product_delete_success':
            return { loading: false, success: true }
        case 'product_delete_fail':
            return { loading: false, error: action.payload }
        default:
            return state;
    }

}


export const productReviewReducer = (state = {}, action) => {

    switch (action.type) {

        case 'product_reviews_request':
            return { loading: true, }
        case 'product_reviews_success':
            return { loading: false, success: true }
        case 'product_reviews_fail':
            return { loading: false, error: action.payload }
        case 'product_reset_fail':
            return {}
        default:
            return state;
    }

}

export const createProductReducer = (state = {}, action) => {

    switch (action.type) {

        case 'product_create_request':
            return { loading: true, }
        case 'product_create_success':
            return { loading: false, success: true }
        case 'product_create_fail':
            return { loading: false, error: action.payload }
        case 'product_reset_fail':
            return {}
        default:
            return state;
    }

}