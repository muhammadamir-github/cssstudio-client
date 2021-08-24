const Globals = window.globals;

class BillingHandler{
    constructor(data){
        this.data = data;
    }

    setup(){
        const self = this;

        var heading = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "ph" ],
            children: [
                {
                    type: "p",
                    text: "Billing"
                }
            ]
        });

        var p_totalspending_div = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "ts" ],
            children: [
                {
                    type: "p",
                    text: 'You have spent '+self.data.total_spending+'$ till now.',
                }
            ]
        });

        var billinghistory = Globals.elements.new({
            type: "profilebox",
            parent: Globals.window.body,
            style: {
                height: "1000px",
                minHeight: "min-content"
            },
            children: [
                {
                    type: "h6",
                    text: "Billing History",
                    style: {
                        top: "0px"
                    }
                },
                {
                    type: "table",
                    attributes: {
                        cellpadding: 0,
                        cellspacing: 0
                    },
                    children: [
                        {
                            type: "thead",
                            children: [
                                {
                                    type: "tr",
                                    children: (() => {
                                        return ["Description", "Amount", "Method", "Date & Time"].map((x, i) => {
                                            return { type: "th", text: x, style: { width: i === 3 ? "30%" : i === 0 ? "50%" : "10%", borderRight: i === 1 || i === 2 ? "1px solid rgb(241, 241, 241)" : null } }
                                        });
                                    })(),
                                }
                            ]
                        },
                        {
                            type: "tbody",
                            children: (() => {
                                return self.data.payments.map(payment => {
                                    return {
                                        type: "tr",
                                        children: (() => {
                                            return [`Purchased ${payment.product}`, `${payment.amount}$`, "", moment(moment.utc(payment.created_at)).fromNow()].map((x, i) => {
                                                return i === 2 ? {
                                                    type: "td",
                                                    children: self.data.payments[i].method == 'paypal' ? [
                                                        {
                                                            type: "i",
                                                            classes: ["fab", "fa-paypal"],
                                                            style: { fontSize: "30px" }
                                                        }
                                                    ] : [
                                                        {
                                                            type: "i",
                                                            classes: ["fab", "fa-cc-visa"],
                                                            style: { fontSize: "30px" }
                                                        },
                                                        {
                                                            type: "i",
                                                            classes: ["fab", "fa-cc-mastercard"],
                                                            style: { fontSize: "30px", marginLeft: "5px" }
                                                        }
                                                    ]
                                                } : {
                                                    type: "td",
                                                    text: x
                                                }
                                            });
                                        })(),
                                    }
                                });
                            })(),
                        }
                    ]
                }
            ]
        });
    }

    planExpired(response){
        const self = this;
        var exatExpiry = moment(self.data.expires_at.substring(0,10)).format("dddd, MMMM Do YYYY");
        Globals.membershipHandler.notice('plan-expired',exatExpiry);

        setTimeout(function(){
            window.location.href = '../profile/';
        },7500);

        document.getElementsByTagName('head')[0].innerHTML += '<link rel="stylesheet" type="text/css" href="../assets/css/notice.css">';
    }
}
