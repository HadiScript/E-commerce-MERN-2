import User from '../models/userModel.js'

const CreatingOrUpdatingUser = async (req, res) => {
    const { name, email, picture } = req.user;

    // find by emial, update name and picture
    const user = await User.findOneAndUpdate({ email }, { name, picture }, { new: true });
    if (user) res.json(user);
    else {
        const newUser = await new User({ email, name: email.split("@")[0], picture, }).save();
        res.json(newUser)
    }
};



const CurrentUser = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.user.email });
        res.json(user)
    } catch (error) {
        throw new Error(err)
    }
}


export default {
    CreatingOrUpdatingUser,
    CurrentUser
}