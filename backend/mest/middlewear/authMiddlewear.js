import Admin from "../Firebase/firebase.js";

const authCheck = async (req, res, next) => {
    // console.log(req.headers); //token

    try {
        const firebaseUser = await Admin.auth().verifyIdToken(req.headers.authtoken)
        // console.log("firebase user check", firebaseUser);
        req.user = firebaseUser;
        next()
    } catch (err) {
        console.log(err);
        res.status(401).json({
            err: 'Invalid or expired token'
        })
    }

    // next()
}



export default authCheck;