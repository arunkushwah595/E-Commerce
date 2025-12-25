const express = require('express');
const Product = require('../models/Product');
const Review = require('../models/Review');
const router = express.Router(); // mini instance
const { validateReview } = require('../middleware');

router.post('/products/:id/review', validateReview, async (req, res) => {
    try {
        let { id } = req.params;
        let { rating, comment } = req.body;
        const product = await Product.findById(id);
        const review = new Review({ rating, comment });
        product.reviews.push(review);
        await review.save();
        await product.save();
        req.flash('success', 'Review added sucessfully');
        res.redirect(`/products/${id}`);
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})


router.get('/products/:id/:idd', async (req, res) => {
    try {
        let { idd, id } = req.params;
        await Review.findByIdAndDelete(id);
        req.flash('success', 'Review deleted sucessfully');
        res.redirect(`/products/${idd}`);
    }
    catch (e) {
        res.status(500).render('error', { err: e.message })
    }
})



module.exports = router;