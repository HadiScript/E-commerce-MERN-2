import admin from "firebase-admin"

import * as serviceAccount from '../config/firebaseServiceAccountKey.js'
// console.log(serviceAccount.default);

const Admin = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount.default)
});

export default Admin;