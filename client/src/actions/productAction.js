import axios from "axios";

export const listProducts = (keyword = "", pageNumber = '') => async (dispatch) => {
    try {

        dispatch({ type: 'product_list_request' });
        const { data } = await axios.get(`http://localhost:8000/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
        // console.log(data, 'here is data');
        dispatch({ type: 'product_list_success', payload: data })

    } catch (error) {
        dispatch({
            type: 'product_list_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}


export const productListDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'product_detail_request' });
        const { data } = await axios.get(`http://localhost:8000/api/products/${id}`);
        dispatch({ type: 'product_detail_success', payload: data })

    } catch (error) {
        dispatch({
            type: 'product_detail_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })

    }
}


export const createProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'product_create_request' });

        const { user } = getState();

        const config = {
            headers: {
                "Content-Type": "Application/json",
                authToken: `${user.token}`
            }
        }
        const { data } = await axios.post(`http://localhost:8000/api/products`, product, config);
        dispatch({ type: 'product_create_success', payload: data })
    } catch (error) {
        dispatch({
            type: 'product_create_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}



export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'product_update_request' });

        const { user } = getState();

        const config = {
            headers: {
                "Content-Type": "Application/json",
                authToken: `${user.token}`
            }
        }
        const { data } = await axios.put(`http://localhost:8000/api/products/${product._id}`, product, config);
        dispatch({ type: 'product_update_success', payload: data })
    } catch (error) {
        dispatch({
            type: 'product_update_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}



export const deleteProduct = (id) => async (dispatch, getState) => {
    try {

        dispatch({ type: 'product_delete_request' });
        const { user } = getState();

        const config = {
            headers: {
                authtoken: `${user.token}`
            }
        }

        await axios.delete(`http://localhost:8000/api/products/${id}`, config);

        dispatch({ type: 'product_delete_success' })


    } catch (error) {

        dispatch({
            type: 'product_delete_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })

    }
}




export const updateProductForQty = (id) => async (dispatch, getState) => {
    try {
        const { user } = getState();
        const config = {
            headers: {
                authtoken: `${user.token}`
            }
        }
        const { data } = await axios.put(`http://localhost:8000/api/products/qty/${id}`, {}, config);
        console.log(data);
        // window.location.reload();

    } catch (error) {
        console.log(error)
    }
}


export const updateProductForReviews = (id, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'product_reviews_request' })
        const { user } = getState();
        const config = {
            headers: {
                'Content-Type': 'application/json',
                authtoken: `${user.token}`
            }
        }
        await axios.post(`http://localhost:8000/api/products/rating/${id}`, review, config);
        dispatch({ type: 'product_reviews_success' })
    } catch (error) {
        dispatch({
            type: 'product_reviews_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}

