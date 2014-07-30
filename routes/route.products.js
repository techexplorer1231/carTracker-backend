/**
* Created with MEAN.
* User: dreamweaver1231
* Date: 2014-07-25
* Time: 09:17 PM
* To change this template use Tools | Templates.
*/

var express = require('express');
var router = express.Router();
var productController = require('../controllers/controller.products')

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

// for routes like /products
router.route('/')
    .post(productController.insert)
    .get(productController.list)

// for routes like /products/:product_id
router.route('/:product_id')
    .get(productController.read)
    .put(productController.update)
    .delete(productController.delete)

router.route('/randomProducts/:productsCount')
	.get(productController.randomProducts)

module.exports = router;
