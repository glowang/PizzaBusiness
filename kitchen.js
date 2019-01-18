const notification = require('./notification')

let orders = new Array();

async function make(order) {
    let promise = new Promise((resolve,reject) => {
        setTimeout(() => resolve(order), 10000) // resolve(send notification)
    })
    //let result = await promise; // await is followed by a computational intensive, long function? 
    promise.then(notification.notify(order));
}

function checkOrder(phone) {
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
}