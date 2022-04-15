import axios from "axios";

export const createReport = (report, authtoken) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'report_create_request' });

        const { user } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                authtoken: user.token ? `${user.token}` : ""
            }
        }
        const { data } = await axios.post(`http://localhost:8000/api/reports`, report, config);
        dispatch({ type: 'report_create_success', payload: data })
        // console.log(data, 'from report action')

    } catch (error) {
        dispatch({
            type: 'report_create_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })

    }
    // await axios.post(`http://localhost:8000/api/reports`, report, {
    //     headers: {
    //         authtoken,
    //     },
    // });
}

export const ReportListDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'report_detail_request' });
        const { data } = await axios.get(`http://localhost:8000/api/reports/${id}`);
        dispatch({ type: 'report_detail_success', payload: data })

    } catch (error) {
        dispatch({
            type: 'report_detail_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })

    }
}

export const ReportsList = () => async (dispatch) => {
    try {

        dispatch({ type: 'report_list_request' });
        const { data } = await axios.get(`http://localhost:8000/api/reports`);
        // console.log(data, 'here is data');
        dispatch({ type: 'report_list_success', payload: data })

    } catch (error) {
        dispatch({
            type: 'report_list_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}

export const UserOrderedList = (id) => async (getState, dispatch) => {
    try {
        dispatch({ type: 'ordered_user_list_request' });

        const { user } = getState();

        const config = {
            headers: {
                "Content-Type": "application/json",
                authtoken: user.token ? `${user.token}` : ""
            }
        }

        const { data } = await axios.get(`http://localhost:8000/api/orders/${id}`, config);
        // console.log(data, 'here is data');
        dispatch({ type: 'ordered_user_list_success', payload: data })

    } catch (error) {
        dispatch({
            type: 'ordered_user_list_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
}


export const ReportHasUpdated = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'report_confirm_request' });
        const { user } = getState();
        const config = {
            headers: {
                // "Content-Type": "application/json",
                authtoken: user.token ? `${user.token}` : ""
            }
        }
        const { data } = await axios.put(`http://localhost:8000/api/reports/${id}`, {}, config);
        dispatch({ type: 'report_confirm_success', payload: data });
    }
    catch (error) {
        dispatch({
            type: 'report_confirm_fail',
            payload: error.response && error.response.data.message ?
                error.response.data.message : error.message
        })
    }
};


export const ReportDelete = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: 'order_deliver_delete_request' });

        const { user } = getState();

        const config = {
            headers: {
                authtoken: user.token ? `${user.token}` : ""
            }
        }

        const { data } = await axios.delete(`http://localhost:8000/api/reports/${id}`, config);
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