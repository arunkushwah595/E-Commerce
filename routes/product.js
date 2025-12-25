const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router(); // mini instance
const { isLoggedIn, validateProduct } = require('../middleware');


router.get('/', (req, res) => {
    res.redirect('/products');
})


//  To show All the Products
router.get('/products', isLoggedIn, async (req, res) => {
    try {
        let products = await Product.find({});
        res.render('products/index', { products });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})



// To show Form for new Product
router.get('/products/new', isLoggedIn, (req, res) => {
    try {
        res.render('products/new')
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})


//  To actually add the product
router.post('/products', validateProduct, isLoggedIn, async (req, res) => {
    try {
        let { name, img, price, desc } = req.body;
        await Product.create({ name, img, price, desc });
        req.flash('success', 'Product added successfully');
        res.redirect('/products');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})


// To show particular Product
router.get('/products/:id', isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id).populate('reviews');
        res.render('products/show', { foundProduct, msg: req.flash('msg') });
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})


// form to edit the product
router.get('/products/:id/edit', isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let foundProduct = await Product.findById(id);
        res.render('products/edit', { foundProduct })
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})

// to actually edit the data in db
router.patch('/products/:id', validateProduct, isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        let { name, img, price, desc } = req.body;
        await Product.findByIdAndUpdate(id, { name, img, price, desc })
        req.flash('success', 'Product edited successfully');
        res.redirect(`/products/${id}`);
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})



// to delete a product
router.delete('/products/:id', isLoggedIn, async (req, res) => {
    try {
        let { id } = req.params;
        // const product = await Product.findById(id);
        // for(let id of product.reviews){
        //     await Review.findByIdAndDelete(id);
        // }

        await Product.findByIdAndDelete(id);
        req.flash('success', 'Product deleted successfully');
        res.redirect('/products');
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})


module.exports = router;