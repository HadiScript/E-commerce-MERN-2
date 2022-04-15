import axios from 'axios';


const create_or_update_user = async (authToken) => {
    return await axios.post(`http://localhost:8000/api/create-or-update-user`, {}, {
        headers: {
            authToken
        }
    })
}

export default create_or_update_user


export const currentUser = async (authToken) => {
    return await axios.post(`http://localhost:8000/api/create-user`, {}, {
        headers: {
            authToken
        }
    })
}

export const currentAdmin = async (authToken) => {
    return await axios.post(`http://localhost:8000/api/create-admin`, {}, {
        headers: {
            authToken
        }
    })
}