'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProductSchema = new Schema({
    category: {
        type: String,
        unique: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    description: [{
        brand: {
            type: String
        },
        detail: {
            type: String
        },
        offer: {
            type: String
        },
        price: {
            type: String
        },
        stock: {
            type: String
        },
        seller: {
            type: String
        },
        title: {
            type: String
        }
    }],
    image: [{
        main: {
            type: String
        },
		thumbnail: {
            type: String
        }
    }],
    review: {
        type: String
    }
});
module.exports = mongoose.model('Product', ProductSchema);