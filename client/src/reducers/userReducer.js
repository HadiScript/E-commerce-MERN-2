export const userReducer = (state = null, action) => {

    const { type, payload } = action;

    switch (type) {

        case "logged_in_user":
            return payload

        case "log_out":
            return payload


        default:
            return state;
    }
}

export const userListReducer = (state = { users: [] }, action) => {

    const { type, payload } = action;

    switch (type) {

        case "user_list_request":
            return { loading: true }

        case "user_list_success":
            return { loading: false, users: action.payload }

        case "user_list_fail":
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}

export const userDeleteReducer = (state = { users: [] }, action) => {

    const { type, payload } = action;

    switch (type) {

        case "user_delete_request":
            return { loading: true }

        case "user_delete_success":
            return { loading: false, success: true }

        case "user_delete_fail":
            return { loading: false, error: action.payload }

        default:
            return state;
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {

    switch (action.type) {

        case 'user_details_request':
            return { ...state, loading: true }
        case 'user_details_success':
            return { loading: false, user: action.payload }
        case 'user_details_fail':
            return { loading: false, error: action.payload }

        default:
            return state;
    }

}


export const userUpdateReducer = (state = { user: {} }, action) => {

    switch (action.type) {

        case 'user_update_request':
            return { ...state, loading: true }
        case 'user_update_success':
            return { loading: false, success: true }
        case 'user_update_fail':
            return { loading: false, error: action.payload }
        case 'user_update_reset':
            return {
                user: {}
            }

        default:
            return state;
    }

}



export const userAdminDetailReducer = (state = { user: {} }, action) => {

    switch (action.type) {

        case 'user_admin_detail_request':
            return { loading: true, ...state }
        case 'user_admin_detail_success':
            return { loading: false, user: action.payload }
        case 'user_admin_detail_fail':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}