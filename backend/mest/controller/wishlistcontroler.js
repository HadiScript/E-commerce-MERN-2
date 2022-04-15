import User from '../models/userModel.js'

const addToWishlist = async (req, res) => {
    const { productId } = req.body;
    // for no duplication $addtoset
    const user = await User.findOneAndUpdate(
        { email: req.user.email },
        { $addToSet: { wishlist: productId } }
    ).exec();

    res.json({ ok: true });

}

const wishlist = async (req, res) => {
    const list = await User.findOne({ email: req.user.email }).select('wishlist').populate('wishlist').exec();
    res.json(list);
}

// const removeFromWishlist = async (req, res) => {
//     const { id } = req.params.id;
//     const user = await User.findOneAndUpdate(
//         { email: req.user.email },
//         { $pull: { wishlist: id } },
//     ).exec();
//     res.json({ ok: true })
// }

const removeFromWishlist = async (req, res) => {
    const productId = req.params.id;
    const user = await User.findOneAndUpdate(
        { email: req.user.email },
        { $pull: { wishlist: productId } }
    ).exec();

    res.json({ ok: true });
};

export {
    addToWishlist,
    removeFromWishlist,
    wishlist
}