import asyncHandler from 'express-async-handler';

import User from '../models/userModel.js';
import Product from '../models/ProductModel.js';
import Order from '../models/OrderModel.js';

const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 20;
    const page = Number(req.query.pageNumber) || 1;

    // for searching
    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.count({ ...keyword })


    // {...keyword} searching
    // .limit(pageSize) we want result as pagesize
    // what product you want in first is defined by skip
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1)) //find everything
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
})

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        res.json(product);
    } else {
        res.status(404)
        throw new Error('Product Not Found');
        // res.status(404).json({message : "Product Not Found"})
    }
})


const addingComments = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    const user = await User.findOne({ email: req.user.email });


    const newCommment = {
        text: req.body.text,
        name: user.name,
        user
    };
    console.log("its user", user);

    product.comments.unshift(newCommment);
    await product.save();
    console.log('from adding post server', product)
    res.json(product.comments);

})

// const deleteComments = asyncHandler(async (req, res) => {

//     const product

// })



// delete a product 
// delete 
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({ message: "product has been removed" })

    } else {
        res.status(404)
        throw new Error('Product Not Found');
        // res.status(404).json({message : "Product Not Found"})
    }
})


// idea we just save a sample into database 
// and immediately push user to go and update it

// create a product , private admin
// post
const createProduct = asyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.user.email })
    const productLists = await Product.find({});
    if (productLists) {
        const AlreadyVersioned = productLists.find(x => x.modelVersion === req.body.modelVersion)
        if (AlreadyVersioned) {
            res.status(400);
            throw new Error('Model Version Must be Change !');
            return;
        }
    }
    const product = {
        name: req.body.name,
        price: req.body.price,
        user: user._id,
        category: req.body.category,
        countInStock: req.body.countInStock,
        description: req.body.description,
        keyMarket: req.body.keyMarket,
        brand: req.body.brand,
        shipping: req.body.shipping,
        images: req.body.images,
        rating: req.body.rating ? req.body.rating : 0,
        modelVersion: req.body.modelVersion,
        supplier: req.body.supplier,
        totalPay: req.body.totalPay,
        givePay: req.body.givePay
    }
    if (req.body.categoryName) {
        product.categoryName = req.body.categoryName
    }
    if (req.body.supplierName) {
        product.supplierName = req.body.supplierName;
    }


    if (req.body.brandName) {
        product.brandName = req.body.brandName;
    }

    const savingProducts = new Product(product);


    // const savingProducts =;

    const createProduct = await savingProducts.save();
    if (createProduct) {
        res.status(201).json(createProduct)
    } else {
        res.status(400);
        throw new Error('Server error')
    }
})


// update  a product , private admin
// put
const updateProduct = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
        keyMarket
    } = req.body;
    const product = await Product.findById(req.params.id);
    if (product) {
        product.name = name;
        product.brand = brand;
        product.category = category;
        product.image = image;
        product.countInStock = countInStock;
        product.description = description;
        product.price = price;
        product.keyMarket = keyMarket;
        const updatedProduct = await product.save();
        res.json(updatedProduct)
    } else {
        res.status(400);
        throw new Error('Product not found')
    }
})


const updateProductRating = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
    const product = await Product.findById(req.params.id)
    const user = await User.findOne({ email: req.user.email })
    if (product) {
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === user._id.toString());
        if (alreadyReviewed) {
            res.status(400);
            throw new Error('Already Reviewed')
        }
        else {
            const review = {
                name: user.name ? user.name : user.email.split("@")[0],
                rating: Number(rating),
                comment,
                user: user._id
            }
            product.reviews.push(review);
            product.numReviews = product.reviews.length;
            product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
            await product.save();

            res.status(201).json({ message: 'review added' })
        }
    }
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})




const updateProductQty = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    for (let i = 0; i < order.orderItems.length; i++) {
        await Order.findById(order.orderItems[1]._id);
        console.log(order.orderItems[1].qty);
    }
    console.log(order);
})



// update  a product , private admin
// put
const deleteSupplierInfoInProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        product.supplier = req.body.supplierName;
        product.totalPay = 0;
        product.givePay = 0;
        const updatedProduct = await product.save();
        res.json(updatedProduct)
    } else {
        res.status(400);
        throw new Error('Product not found')
    }
})



// update  a product , private admin
// put
const UpdateSupplierInfoInProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (product) {
        product.givePay = Number(product.givePay) + Number(req.body.givePay);
        console.log(req.body.givePay)
        const updatedProduct = await product.save();
        res.json(updatedProduct)
        console.log(updateProduct)
    } else {
        res.status(400);
        throw new Error('Product not found')
    }
})




export {
    getProductById,
    getProducts,
    deleteProduct,
    createProduct,
    updateProduct,
    addingComments,
    updateProductQty,
    updateProductRating,
    deleteSupplierInfoInProduct,
    UpdateSupplierInfoInProduct
}