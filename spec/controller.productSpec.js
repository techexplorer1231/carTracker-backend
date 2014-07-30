var superagent = require('superagent')
describe('admin', function() {
    var id = "";
    it('can add product', function(done) {
        superagent.post('http://localhost:3001/products').send({
            "category": "testCategory",
            "created": "03/24/2014",
            "description": {
                "brand": "Centizu",
                "detail": "Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.",
                "offer": "Praesent blandit.",
                "price": 5158,
                "stock": 3,
                "seller": "Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst.",
                "title": "Latz"
            },
            "image": {
                "main": "http://erwin.aicsi.com/demo/mimity/images/product-9.jpg",
                "thumbnail": "http://erwin.aicsi.com/demo/mimity/images/product-4.jpg"
            },
            "review": 3
        }).end(function(e, res) {
            expect(res.status).toEqual(200)
            id = res.body._id
            done();
        })
    })
    it("can get list of all products", function(done) {
        superagent.get('http://localhost:3001/products').end(function(e, res) {
            expect(res.status).toEqual(200)
            done();
        })
    });
    it('can get detail of specific product', function(done) {
        superagent.get('http://localhost:3001/products/' + id).end(function(e, res) {
            expect(res.status).toEqual(200)
            expect(res.body.category).toEqual('testCategory')
            expect(res.body.created).toEqual('2014-03-24T00:00:00.000Z')
            expect(res.body.description[0].brand).toEqual('Centizu')
            expect(res.body.description[0].detail).toEqual('Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.')
            expect(res.body.description[0].offer).toEqual('Praesent blandit.')
            expect(res.body.description[0].price).toEqual(5158)
            expect(res.body.description[0].stock).toEqual(3)
            expect(res.body.description[0].seller).toEqual('Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst.')
            expect(res.body.description[0].title).toEqual('Latz')
            expect(res.body.image[0].main).toEqual('http://erwin.aicsi.com/demo/mimity/images/product-9.jpg')
            expect(res.body.image[0].thumbnail).toEqual('http://erwin.aicsi.com/demo/mimity/images/product-4.jpg')
            expect(res.body.review).toEqual(3)
            expect(res.body._id).not.toBeUndefined()
            done();
        })
    });
    it('can updates a product details', function(done) {
        superagent.put('http://localhost:3001/products/' + id).send({
            category: 'testCategoryUpdated'
        }).end(function(e, res) {
            expect(res.status).toEqual(200)
            expect(res.body.message).toEqual('Product updated!')
            expect(res.body.message).not.toBeUndefined()
            done();
        })
    });
    it('can check if product was updated', function(done) {
        superagent.get('http://localhost:3001/products/' + id).end(function(e, res) {
            expect(res.status).toEqual(200)
            expect(res.body.category).toEqual('testCategoryUpdated')
            expect(res.body.created).toEqual('2014-03-24T00:00:00.000Z')
            expect(res.body.description[0].brand).toEqual('Centizu')
            expect(res.body.description[0].detail).toEqual('Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.')
            expect(res.body.description[0].offer).toEqual('Praesent blandit.')
            expect(res.body.description[0].price).toEqual(5158)
            expect(res.body.description[0].stock).toEqual(3)
            expect(res.body.description[0].seller).toEqual('Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa. Donec dapibus. Duis at velit eu est congue elementum. In hac habitasse platea dictumst.')
            expect(res.body.description[0].title).toEqual('Latz')
            expect(res.body.image[0].main).toEqual('http://erwin.aicsi.com/demo/mimity/images/product-9.jpg')
            expect(res.body.image[0].thumbnail).toEqual('http://erwin.aicsi.com/demo/mimity/images/product-4.jpg')
            expect(res.body.review).toEqual(3)
            expect(res.body.category).not.toBeUndefined()
            done();
        })
    });
	
    // http://localhost:3001/products/randomProducts?productsCount=20
    it("can get list specific number of products", function(done) {
        superagent.get('http://localhost:3001/products/randomProducts/'+ 2).end(function(e, res) {
            expect(res.status).toEqual(200)
			expect(res.body.length).toEqual(2)
            done();
        })
    });
    it('can remove a product', function(done) {
        superagent.del('http://localhost:3001/products/' + id).end(function(e, res) {
            expect(res.status).toEqual(200)
            expect(typeof res.body).toEqual('number')
            expect(res.body).toBeGreaterThan(0);
            done();
        })
    });
});