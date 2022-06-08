let express = require('express');
let mongodb = require('mongodb').MongoClient;
let mongoUrl = "mongodb+srv://test:test1@cluster0.ib5m3.mongodb.net/?retryWrites=true&w=majority"


/*
function router(menu) {
    let productRouter = express.Router();
    productRouter.route('/').get((req, res) => {
        //res.send(products);
        res.render('product', { title: 'Products Page', data: products, menu });
    })
    productRouter.route('/details').get((req, res) => {
        res.send('Product Details');
    })
    return productRouter
}
*/

function router(menu) {
    let productRouter = express.Router();
    productRouter.route('/').get((req, res) => {
        mongodb.connect(mongoUrl, (err, dc) => {
            if (err) {
                res.status(500).send('Error while Connecting');
            }
            else {
                let dbObj = dc.db('fullstack');
                dbObj.collection('products').find().toArray((err, response) => {
                    res.render('product', { title: 'Products Page', menu, data: response })
                })
            }
        })
    })
    productRouter.route('/category/:id').get((req, res) => {  //why /category/:id? why not /:id also what is significance of : 
        let id = req.params.id;
        mongodb.connect(mongoUrl, (err, dc) => {
            if (err) {
                res.status(500).send('Error while Connecting');
            }
            else {
                let dbObj = dc.db('fullstack');
                dbObj.collection('products').find({ category_id: Number(id) }).toArray((err, response) => {
                    res.render('product', { title: 'Products Page', menu, data: response })
                })
            }
        })
    })
    productRouter.route('/details').get((req, res) => {
        res.send('Product Details Page');
    })

    return productRouter;
}






module.exports = router;