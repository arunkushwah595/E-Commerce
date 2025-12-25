const { productSchema, reviewSchema } = require('./schema');


const validateProduct = (req, res, next) => {
    let { name, img, price, desc } = req.body;
    const { error, value } = productSchema.validate({ name, img, price, desc });
    if (error) {
        return res.render('error', { err: error.message });
    }
    next();
}


const validateReview = (req, res, next) => {
    let { rating, comment } = req.body;
    const { error, value } = reviewSchema.validate({ rating, comment });
    if (error) {
        return res.render('error', { err: error.message });
    }
    next();
}



const isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.flash('error', 'please login first');
        return res.redirect('/login');
    }
    next();
}


module.exports = { isLoggedIn, validateProduct, validateReview };