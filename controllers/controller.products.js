'use strict'
var productModel = require('../models/model.product')
// create a user (accessed at POST http://localhost:3001/products
exports.insert = function(req, res) {
    var product = new productModel(); // create a new instance of the Product model
    product.category = req.body.category;
    product.created = req.body.created;
    product.description = req.body.description;
    product.image = req.body.image;
    product.review = req.body.review;
    product.save(function(err, data) {
        if(err) res.send(err);
        res.json(data);
    });
}
// create a user (accessed at GET http://localhost:3000/products
exports.list = function(req, res) {
    productModel.find(function(err, data) {
        if(err) res.send(err);
        res.json(data);
    });
}
// get the user with that id
exports.read = function(req, res) {
    productModel.findById(req.params.product_id, function(err, data) {
        if(err) res.send(err);
        res.json(data);
    });
}
// update the user with that id
exports.update = function(req, res) {
    productModel.findById(req.params.product_id, function(err, user) {
        if(err) res.send(err);
        user.category = req.body.category;
        user.save(function(err) {
            if(err) res.send(err);
            res.json({
                message: 'Product updated!'
            });
        });
    });
}
// delete the user with that id
exports.delete = function(req, res) {
    productModel.remove({
        _id: req.params.product_id
    }, function(err, data) {
        if(err) res.send(err);
        res.json(data);
    });
}
//accessed at GET http://localhost:3001/products/randomProducts?productsCount=20
exports.randomProducts = function(req, res) {
	productModel.count().exec(function(err, count) {
		var skip = Math.floor(Math.random() * (count - 1 + req.param('productsCount'))) + 1;
		productModel.find().sort('stock').limit(req.param('productsCount')).skip(req.param('skip')).exec(function(err, data){
			if(err) res.send(err);
			res.json(data);		
		});
	});
}