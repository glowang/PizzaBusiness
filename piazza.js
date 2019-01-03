const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const moment = require('moment');

let orders = new Array();

app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

/** middleware function to parse incoming request */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const buyRouter = express.Router();

/* Middleware function to screen pizza orders */
buyRouter.use('/buy_pizza', function(req,res,next) {
    const flavor = req.body._flavor;
    if (flavor === 'meat' || flavor === 'veggie') {
        next();
    }
});
app.use('/buy_pizza',buyRouter); // calling the middleware function


app.get('/buy_pizza',function(req,res){
    res.render('order_form');
})

app.post('/buy_pizza', function(req,res) {
    console.log(req.body);
    const order = {
        name: req.body._name,
        phone: req.body._phone,
        flavor: req.body._flavor,
        timeStamp: moment().valueOf()
    }
    orders.push(order);
    try {
        res.send("Your order has been recorded!");
        //await setTimeout(() =>  res.send("your " + req.body._flavor + " flavor pizza is done"), 50000);
    } catch(err) {
        console.log(err)
    };
});

app.get('/', function(req,res) {
    res.send("Welcome to My Pizza!");
})

app.get('/my_pizza', function(req,res) {
    res.render('index');
}) 
/** get endpoint, used to query pizza status */
app.post('/my_pizza/status', function(req,res) {
    const phone = req.body._phone;
    //console.log(orders);
    //console.log(moment().valueOf());
    orders.forEach(element => {
        try {
            if (element.phone === phone) {
                const orderTime = element.timeStamp;
                const currTime = moment().valueOf();
                console.log('the real diff is');
                console.log(currTime-orderTime);
                if (currTime - orderTime < 0) {
                    console.log("two");
                    res.send("system error")
                    console.error("Wrong order time");
                }
                else if (currTime - orderTime < 15000) {
                    console.log("three");
                    res.send("Dough-prepping");
                }
                else if (currTime - orderTime < 30000) {
                    console.log("four");
                    res.send("oven-bake");
                }
                else if (currTime - orderTime < 50000) {
                    console.log("five");
                    res.send("topping-art"); 
                }
                else if (currTime - orderTime > 50000) {
                    console.log("five");
                    res.send("Ready for pick up!");
                }
            } 
        } catch(err) {
            console.log("six");
            res.render("order_form"); // use ejs to change the title
        }
       
    })
});

/* function mimicing the pizza making process */
   

app.listen(3000, function() {
    console.log("server started on port 3000.")});