const roleBaisedRedirect = (res, history) => {
    if (res.data.isAdmin) {
        history.push('/admin/dashboard')
    } else {
        history.push('/user/history')
    }
}

export default roleBaisedRedirect