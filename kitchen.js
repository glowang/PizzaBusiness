const notification = require('./notification')
var exports = module.exports= {};

exports.orders = new Array();

exports.Pizza = class {
    constructor(order) {
        this.phone = order.phone;
        this.flavor = order.flavor;
        this.ordertime = order.time;
        this.email = order.email;
        this.status = false;
    } 

    async make() {
        const me = this;
        let promise = new Promise((resolve,reject) => {
            setTimeout(() => resolve(this.email), 25000) // resolve(send notification)
        })
        promise.then(function(result) {
            try {
                me.status = true;
                console.log(me.status);
            } catch {
                console.log(me);
            }
        })
        promise.then(notification.notify(me.email));
    }
}

exports.placeOrder = function(order) {
    const p = new exports.Pizza(order);
    exports.orders.push(p);
    p.make();
}

exports.checkStatus = function(phone) {
    try {
        exports.orders.forEach(element => {
            if (element.phone === phone) {
                console.log(element.phone);
                console.log(element.status);
                return element.status;
            }
        })
    }
    catch {
        console.log(err);
    }
}
