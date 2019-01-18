const kitchen = require('./kitchen');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const moment = require('moment');
const nodemailer = require('nodemailer');
app.listen(3000, () => console.log('Gator app listening on port 3000!'));

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

/** middleware function to parse incoming request */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req,res) {
    res.send("Welcome to My Pizza!");
})

const buyRouter = express.Router();

app.use('/buy_pizza',buyRouter); // associate the buyRouter with the path 

buyRouter.get('/', function(req,res) {
    res.render('order_form');
})

/* Middleware function to screen pizza orders */
buyRouter.post('/', function(req,res,next) { // the path is actually "buy_pizza" already
    const flavor = req.body._flavor;
    if (flavor === 'meat' || flavor === 'veggie') {
        next();
    } else {
        res.send("We don't have the flavor you specified. Try again!");
    }
});

buyRouter.post('/', function(req,res) {
    console.log(req.body);
    const order = {
        name: req.body._name,
        email: req.body._email,
        phone: req.body._phone,
        flavor: req.body._flavor,
        timeStamp: moment().valueOf()
    }
    arr = kitchen.orders;
    arr.push(order);
    try {
        res.send("Your order has been recorded!");
        kitchen.make(order);
    } catch(err) {
        console.log(err)
    };
});

const serviceRouter = express.Router();
app.use('/help',serviceRouter);

serviceRouter.get('/status', function(req,res) {
    res.render('index');
}) 

app.post('/status', function(req,res) {
    const phone = req.body._phone;
    kitchen.checkOrder(phone);
});

serviceRouter.get('/complain', function(req,res) {
    res.send("Please call 5103169699");
})
