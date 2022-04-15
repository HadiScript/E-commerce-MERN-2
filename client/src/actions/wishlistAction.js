import axios from "axios"

export const GetWishlist = async (authtoken) => {
    const res = await axios.get(`${process.env.REACT_APP_API}/wishlist`, {
        headers: {
            authtoken
        }
    })
    // console.log(res);
}


export const removeWishlist = async (productId, authtoken) => {
    await axios.put(`${process.env.REACT_APP_API}/wishlist/${productId}`, {},
        {
            headers: {
                authtoken
            }
        }
    )
}


export const AddToWishlist = async (productId, authtoken) => {
    await axios.post(`${process.env.REACT_APP_API}/wishlist/`, { productId },
        {
            headers: {
                authtoken
            }
        }
    )
}

