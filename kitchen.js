const notification = require('./notification')

/** Pizza Constructor */
Pizza = class {
    constructor(order) {
        this.phone = order.phone;
        this.flavor = order.flavor;
        this.email = order.email;
        this.status = false;
    } 

    /** A pizza takes 25 seconds to make. Once it is ready, an email
     * notification will be sent out.
     */
    async make() {
        const me = this;
        let promise = new Promise((resolve,reject) => {
            setTimeout(() => resolve(this.email), 10000) 
        })
        promise.then(function(result) {
            try {
                me.status = true;
            } catch {
                console.log('pizza is '+ me);
            }
        })
        promise.then(notification.notify(me.email));
    }
}


/** A function that triggers the make function to make pizza */
Manager = class {
    constructor() {
        this.orders = new Array();
        this.answer = false;
    }; 
    placeOrder (order) {
        const p = new Pizza(order);
        this.orders.push(p);
        p.make();
    }

/** Responds to customer's inquiry on pizza status. Two statuses 
 * are possible: done or still making the pizza. 
 */
    checkStatus (phone) {
    try {
        this.orders.forEach(element => {
            if (element.phone === phone) {
                this.answer = element.status;
            }
        })
            return this.answer;
        } catch (err) {
        console.log(err);
    }
}
}

manager = new Manager();
module.exports = manager;