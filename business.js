const kitchen = require('./kitchen.js');

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const moment = require('moment');
const nodemailer = require('nodemailer');

app.listen(3000, () => console.log('app listening on port 3000!'));

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

/** middleware function to parse the body of incoming request */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/** middleware function for home directory */
app.get('/', function(req,res) {
    res.send('Welcome to Gloria \'s pizza place.' +
    'proceed to order by using the path /buy_pizza ');
})

/** buy_pizza API end point */
const buyRouter = express.Router();
app.use('/buy_pizza',buyRouter); 
buyRouter.get('/', function(req,res) {
    res.render('order_form');
})

/* Middleware function to screen pizza orders. If customer's input is not meat or veggie, 
responses will not be submitted and the order form will be displayed again. */
buyRouter.post('/', function(req,res,next) { 
    const flavor = req.body._flavor;
    if (flavor === 'meat' || flavor === 'veggie') {
        next();
    } else {
        res.render('order_form');
    }
});

/** Middleware function to record customers' orders and start the pizza making process */
buyRouter.post('/', function(req,res) {
    const order = {
        name: req.body._name,
        email: req.body._email,
        phone: req.body._phone,
        flavor: req.body._flavor,
    }
    try {
        res.send("Your order has been recorded!");
        kitchen.placeOrder(order);
    } catch(err) {
        console.log(err)
    };
});


const serviceRouter = express.Router();
app.use('/help',serviceRouter);

/** For customers to check the status of their pizzas. Will render an html
 * form called "status" to ask for customer's phone number. Which will be used 
 * for status checking
 */
serviceRouter.get('/status', function(req,res) {
    res.render('index');
}) 

/** Middleware function for checking whether a phone number is valid */
serviceRouter.post('/status', function(req,res,next) {
    const phone = req.body._phone;
    let exist = false;
    manager.orders.forEach(element => {
        if (element.phone === phone) {
            exist = true;
        }
    });
    if (exist === true) {
        next();
    } else {
        res.send('Your phone number is not on our record.');
    }
});

/** Middleware function for returning the status of a pizza based on the 
 * valid phone number provided
 */
serviceRouter.post('/status', function(req,res) {
    const phone = req.body._phone;
    status = kitchen.checkStatus(phone);
    if (status === true) {
        return res.send("It's ready!");
    } else {
        return res.send("We are still making it");
    }
});

/** Another API endpoint called /help/complain for customers who wish to contact customer service */
serviceRouter.get('/complain', function(req,res) {
    res.send("Please call 510-XXX-XXXX");
});

