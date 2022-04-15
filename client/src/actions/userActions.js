import axios from "axios";


//  we may pass out here profile as id for getting login user profile
export const getUserDetail = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'user_details_request' });

        const { user } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                authtoken: user.token ? `${user.token}` : ""
            }
        }
        const { data } = await axios.get(`http://localhost:8000/api/users/${id}`, config);
        dispatch({ type: 'user_details_success', payload: data });

    }
    catch (error) {
        dispatch({
            type: 'user_details_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}


//  update user profile
export const userUdpateProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'user_udpate_profile_request' });

        const { user } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                authtoken: user.token ? `${user.token}` : ""
            }
        }
        const { data } = await axios.put(`http://localhost:8000/api/users/profile`, user, config);
        dispatch({ type: 'user_udpate_profile_success', payload: data });

    }
    catch (error) {
        dispatch({
            type: 'user_udpate_profile_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}



//  list users
export const usersList = (keyword = '') => async (dispatch, getState) => {
    try {
        dispatch({ type: 'user_list_request' });

        const { user } = getState();

        const config = {
            headers: {
                // "Content-Type": "application/json",
                authtoken: user.token ? `${user.token}` : ""
            }
        }
        const { data } = await axios.get(`http://localhost:8000/api/users/?keyword=${keyword}`, config);
        dispatch({ type: 'user_list_success', payload: data });

    }
    catch (error) {
        dispatch({
            type: 'user_list_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}



//  delete users
export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'user_delete_request' });

        const { user } = getState();

        const config = {
            headers: {
                // "Content-Type": "application/json",
                authtoken: user.token ? `${user.token}` : ""
            }
        }
        await axios.delete(`http://localhost:8000/api/users/${id}`, config);
        dispatch({ type: 'user_delete_success' });

    }
    catch (error) {
        dispatch({
            type: 'user_delete_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}



//  delete users
export const updateUser = (user_for_update) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'user_update_request' });

        const { user } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                authtoken: user.token ? `${user.token}` : ""
            }
        }
        const { data } = await axios.put(`http://localhost:8000/api/users/${user_for_update._id}`, user_for_update, config);
        dispatch({ type: 'user_update_success' });
        dispatch({ type: 'user_details_success', payload: data });

    }
    catch (error) {
        dispatch({
            type: 'user_update_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}



//  delete users
export const UserDetailAdmin = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'user_admin_detail_request' });

        const { user } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                authtoken: user.token ? `${user.token}` : ""
            }
        }
        const { data } = await axios.get(`http://localhost:8000/api/users/${id}`, config);
        dispatch({ type: 'user_admin_detail_success', payload: data });

    }
    catch (error) {
        dispatch({
            type: 'user_admin_detail_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}

