
export const ReportListReducer = (state = { reports: [] }, action) => {
    switch (action.type) {
        case 'report_list_request':
            return { loading: true, reports: [] }
        case 'report_list_success':
            return {
                loading: false,
                reports: action.payload.reports,
            }
        case 'report_list_fail':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}

export const reportDetailReducer = (state = { report: {} }, action) => {

    switch (action.type) {

        case 'report_detail_request':
            return { loading: true, ...state }
        case 'report_detail_success':
            return { loading: false, report: action.payload }
        case 'report_detail_fail':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}



export const reportCreateReducer = (state = {}, action) => {

    switch (action.type) {

        case "report_create_request":
            return { loading: true, ...state }
        case "report_create_success":
            return { loading: false, success: true, report: action.payload }
        case "report_create_fail":
            return { loading: false, error: action.payload }
        case "report_create_reset":
            return {}
        default:
            return state;
    }
}


export const UserOrderdReportReducer = (state = { ordered: [] }, action) => {
    switch (action.type) {
        case 'ordered_user_list_request':
            return { loading: true, ordered: [] }
        case 'ordered_user_list_success':
            return {
                loading: false,
                ordered: action.payload
            }
        case 'ordered_user_list_fail':
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}



export const ReportConfirmReducer = (state = {}, action) => {

    switch (action.type) {
        case 'report_confirm_request':
            return {
                loading: true
            }
        case 'report_confirm_success':
            return {
                loading: false,
                success: true
            }
        case 'report_confirm_fail':
            return {
                loading: false,
                error: action.payload
            }

        default:
            return state;
    }
}


export const ReportDeleteReducer = (state = {}, action) => {

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