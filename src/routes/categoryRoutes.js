let express = require('express');
let mongodb = require('mongodb').MongoClient;
let mongoUrl = 'mongodb+srv://test:test1@cluster0.ib5m3.mongodb.net/?retryWrites=true&w=majority';


/*
function router(menu) {
    let categoryRouter = express.Router();
    categoryRouter.route('/').get((req, res) => {
        //res.send(category);
        res.render('category', { title: 'Category Page', data: category, menu });
    })
    categoryRouter.route('/details').get((req, res) => {
        res.send('Category Details');
    })
    return categoryRouter;
}
*/

let router = (menu) => {
    let categoryRouter = express.Router();
    categoryRouter.route('/').get((req, res) => {
        mongodb.connect(mongoUrl, (err, dc) => {
            if (err) {
                res.status(500).send('Error while Connecting');
            }
            else {
                let dbObj = dc.db('fullstack');
                dbObj.collection('category').find().toArray((err, response) => {
                    res.render('category', { title: 'Category Page', menu, data: response })
                })
            }
        })
    })
    categoryRouter.route('/details').get((req, res) => {
        res.send('Category Details');
    })

    return categoryRouter;
}

module.exports = router;