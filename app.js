let express = require('express');
let port = 7600;

let app = express();

let menu = [
    { link: '/', name: 'Home' },
    { link: '/category', name: 'Category' },
    { link: '/products', name: 'Products' }
]

let categoryRouter = require('./src/routes/categoryRoutes')(menu);
let productRouter = require('./src/routes/productRoutes')(menu);


/*
Static files are typically files such as scripts, CSS files, images, etc... that aren't server-generated, but must be sent to the
browser when requested. If node. js is your web server, it does not serve any static files by default, you must configure it to 
serve the static content you want it to serve.
*/
//static file path
app.use(express.static(__dirname + '/public'));
//html file path
app.set('views', './src/views')
//view engine 
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    //res.send('First Page');
    res.render('first', { title: 'Home Page', menu });
})

// app.get('/category', (req, res) => {
//     res.send(category); //.send() sends the data in json format 
// })
// app.get('/products', (req, res) => {
//     res.send(products);
// })

app.use('/category', categoryRouter);
app.use('/products', productRouter);

app.listen(port, (err) => {
    if (err) throw err;
    else {
        console.log(`Server running on ${port}`)
    }
})