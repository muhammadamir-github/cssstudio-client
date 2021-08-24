class PaypalHandler{
    constructor(data){
        this.data = data;
    }

    setup(){
        const self = this;

        var referralcode = self.data.plan == 'Diamond' ? null : Globals.elements.new({
            type: "input",
            parent: document.getElementById('upgp'),
            attributes: {
                type: "text",
                placeholder: "Referral/Discount Code",
                maxlength: "8"
            },
            classes: [ "refcode" ],
            listeners: {
                input: (e) => {
                    if(e.target.value.length == '8'){
                        self.checkReferralCode(e.target.value);
                    }
                }
            }
        });

        var plansInfo = [
            {
                name: "Bronze",
                featuresAvailable: [
                    "Access to element creator. (1 Month) ",
                    "Save upto 10 items in storage. ",
                    "Ability to open support tickets. "
                ],
                featuresUnavailable: [
                    "Access to element animator. (1 Month) ",
                    "Ability to use premium ready made animations. ",
                    "Save maxium 0 animations a day. "
                ],
            },
            {
                name: "Silver",
                featuresAvailable: [
                    "Access to element creator. (1 Month) ",
                    "Save upto 75 items in storage. ",
                    "Ability to open support tickets. ",
                    "Access to element animator. (1 Month) ",
                    "Save maxium 15 animations a day. "
                ],
                featuresUnavailable: [
                    "Ability to use premium ready made animations. "
                ],
            },
            {
                name: "Gold",
                featuresAvailable: [
                    "Access to element creator. (1 Month) ",
                    "Save upto 150 items in storage. ",
                    "Ability to open support tickets. ",
                    "Access to element animator. (1 Month) ",
                    "Ability to use premium ready made animations. ",
                    "Save 50 animations a day. "
                ],
                featuresUnavailable: [],
            },
            {
                name: "Diamond",
                featuresAvailable: [
                    "Access to element creator. (3 Months) ",
                    "Save upto 1000 items in storage. ",
                    "Ability to open support tickets. ",
                    "Access to element animator. (3 Months) ",
                    "Ability to use premium ready made animations. " ,
                    "Save maxium 100 animations a day. "
                ],
                featuresUnavailable: [],
            }
        ]

        var bronzeplan = self.data.plan === "Free" ? Globals.elements.new({
            type: "membershipplan",
            parent: document.getElementById('upgp'),
            attributes: {
                "data-plan": "Bronze"
            },
            classes: self.data.plan === "Free" ? [ "selectedplan" ] : [],
            listeners: {},
            children: [
                {
                    type: "span",
                    text: "4.99 $"
                },
                {
                    type: "p",
                    text: "Bronze Plan",
                    classes: [ "heading" ]
                },
                {
                    type: "ul",
                    children: (() => {
                        return [
                            ...plansInfo.find(x => (x.name === "Bronze")).featuresAvailable.map(x => ({ type: "li", text: x, children: [{ type: "i", classes: [ "fas", "fa-check" ] }] })),
                            ...plansInfo.find(x => (x.name === "Bronze")).featuresUnavailable.map(x => ({ type: "li", text: x, children: [{ type: "i", classes: [ "fas", "fa-times" ] }] })),
                        ]
                    })(),
                }
            ]
        }) : null;

        var silverplan = self.data.plan === "Free" || self.data.plan === "Bronze" ? Globals.elements.new({
            type: "membershipplan",
            parent: document.getElementById('upgp'),
            attributes: {
                "data-plan": "Silver"
            },
            classes: self.data.plan === "Bronze" ? [ "selectedplan" ] : [],
            listeners: {},
            children: [
                {
                    type: "span",
                    text: "9.99 $"
                },
                {
                    type: "p",
                    text: "Silver Plan",
                    classes: [ "heading" ]
                },
                {
                    type: "ul",
                    children: (() => {
                        return [
                            ...plansInfo.find(x => (x.name === "Silver")).featuresAvailable.map(x => ({ type: "li", text: x, children: [{ type: "i", classes: [ "fas", "fa-check" ] }] })),
                            ...plansInfo.find(x => (x.name === "Silver")).featuresUnavailable.map(x => ({ type: "li", text: x, children: [{ type: "i", classes: [ "fas", "fa-times" ] }] })),
                        ]
                    })(),
                }
            ]
        }) : null;

        var goldplan = self.data.plan === "Free" || self.data.plan === "Bronze" || self.data.plan === "Silver" ? Globals.elements.new({
            type: "membershipplan",
            parent: document.getElementById('upgp'),
            attributes: {
                "data-plan": "Gold"
            },
            classes: self.data.plan === "Silver" ? [ "selectedplan" ] : [],
            listeners: {},
            children: [
                {
                    type: "span",
                    text: "19.99 $"
                },
                {
                    type: "p",
                    text: "Gold Plan",
                    classes: [ "heading" ]
                },
                {
                    type: "ul",
                    children: (() => {
                        return [
                            ...plansInfo.find(x => (x.name === "Gold")).featuresAvailable.map(x => ({ type: "li", text: x, children: [{ type: "i", classes: [ "fas", "fa-check" ] }] })),
                            ...plansInfo.find(x => (x.name === "Gold")).featuresUnavailable.map(x => ({ type: "li", text: x, children: [{ type: "i", classes: [ "fas", "fa-times" ] }] })),
                        ]
                    })(),
                }
            ]
        }) : null;

        var diamondplan = self.data.plan === "Free" || self.data.plan === "Bronze" || self.data.plan === "Silver" || self.data.plan === "Gold" ? Globals.elements.new({
            type: "membershipplan",
            parent: document.getElementById('upgp'),
            attributes: {
                "data-plan": "Diamond"
            },
            classes: self.data.plan === "Gold" ? [ "selectedplan" ] : [],
            listeners: {},
            children: [
                {
                    type: "span",
                    text: "44.99 $"
                },
                {
                    type: "p",
                    text: "Diamond Plan",
                    classes: [ "heading" ]
                },
                {
                    type: "ul",
                    children: (() => {
                        return [
                            ...plansInfo.find(x => (x.name === "Diamond")).featuresAvailable.map(x => ({ type: "li", text: x, children: [{ type: "i", classes: [ "fas", "fa-check" ] }] })),
                            ...plansInfo.find(x => (x.name === "Diamond")).featuresUnavailable.map(x => ({ type: "li", text: x, children: [{ type: "i", classes: [ "fas", "fa-times" ] }] })),
                        ]
                    })(),
                }
            ]
        }) : null;

        self.data.plan === "Free" ? bronzeplan.addEventListener('click',function(){
            try{ silverplan.classList.remove('selectedplan'); }catch{}
            try{ goldplan.classList.remove('selectedplan'); }catch{}
            try{ diamondplan.classList.remove('selectedplan'); }catch{}
            try{ this.classList.add('selectedplan'); }catch{}
        }) : false;

        self.data.plan === "Free" || self.data.plan === "Bronze" ? silverplan.addEventListener('click',function(){
            try{ bronzeplan.classList.remove('selectedplan'); }catch{}
            try{ goldplan.classList.remove('selectedplan'); }catch{}
            try{ diamondplan.classList.remove('selectedplan'); }catch{}
            try{ this.classList.add('selectedplan'); }catch{}
        }) : false;

        self.data.plan === "Free" || self.data.plan === "Bronze" || self.data.plan === "Silver" ? goldplan.addEventListener('click',function(){
            try{ bronzeplan.classList.remove('selectedplan'); }catch{}
            try{ silverplan.classList.remove('selectedplan'); }catch{}
            try{ diamondplan.classList.remove('selectedplan'); }catch{}
            try{ this.classList.add('selectedplan'); }catch{}
        }) : false;

        self.data.plan === "Free" || self.data.plan === "Bronze" || self.data.plan === "Silver" || self.data.plan === "Gold" ? diamondplan.addEventListener('click',function(){
            try{ bronzeplan.classList.remove('selectedplan'); }catch{}
            try{ silverplan.classList.remove('selectedplan'); }catch{}
            try{ goldplan.classList.remove('selectedplan'); }catch{}
            try{ this.classList.add('selectedplan'); }catch{}
        }) : false;

        var ads_p = Globals.elements.new({
            type: "p",
            parent: document.getElementById('upgp'),
            text: self.data.plan == 'Diamond' ? "You have upgraded your account to diamond plan already." : "Upgrading to any plan will make your account ad free.",
            classes: [ "adfree" ],
            style: self.data.plan == 'Diamond' ? { fontSize: "20px" } : null,
        });

        var custombtn = Globals.elements.new({
            type: "button",
            parent: document.getElementById('upgp'),
            text: "Purchase Plan",
            style: self.data.plan == 'Diamond' ? { display: "none", pointerEvents: "none" } : null,
            listeners: {
                click: () => {
                    self.paypal_link($(document.getElementsByClassName('selectedplan')[0]).attr('data-plan'));
                }
            }
        });
    }

    async paypal_link(p){
        const self = this;

        var payment = Globals.elements.new({
            type: "payment",
            parent: Globals.window.body,
            children: [
                {
                    type: "i",
                    classes: [ "fab", "fa-paypal" ]
                },
                {
                    type: "p",
                    text: "Creating your payment..."
                }
            ]
        });

        setInterval(function(){
            self.updatePaymentStatus('Creating');
        },1000);

        var referralcode = document.getElementsByClassName('refcode')[0];
        var code = '';

        if(referralcode.value.length == '8'){
            if(referralcode.style.pointerEvents == 'none'){
                code = referralcode.value;
            }
        }

        const response = await Globals.api.request({ route: "me/payment/create", method: "post", data: { 'p': p, 'code': code }, });
        if(response.success === true){
            if(response.data.message == 'You have already used a referral code.'){
                Globals.notificationHandler.new('Error, '+response.data.message+' A user can only use one referral code.');
                payment.remove();
            }else{
                if(response.data.message.includes('https')){
                    window.location.href = response.data.message;
                }
            }
        }
    }

    async paypal_execute(payID,payerID,t,plan,ct,c){
        const self = this;

        var payment = Globals.elements.new({
            type: "payment",
            parent: Globals.window.body,
            children: [
                {
                    type: "i",
                    classes: [ "fab", "fa-paypal" ]
                },
                {
                    type: "p",
                    text: "Processing your payment..."
                }
            ]
        });

        var payment_p = payment.getElementsByTagName('p'[0]);

        setInterval(function(){
            self.updatePaymentStatus('Processing');
        },1000);

        if(ct == '' || ct == null || ct == ' ' || c == '' || c == null || c == ' '){
            ct = 'none';
            c = 'none';
        }

        var route = 'me/payment/'+plan+'/'+ct+'/'+c+'/execute';
        const response = await Globals.api.request({ route: route, method: "post", data: { 'token': t, 'payId': payID, 'payerID': payerID }, });
        if(response.success === true){
            if(response.data.message == 'success'){
                window.location.href = 'https://www.cssstudio.co/profile/?p=t&pi='+response.data.data.si+'&pi2='+response.data.data.pi;
            }

            if(response.data.message == 'already executed.'){
                payment_p.innerText = 'Error occured while executing your payment. Please open a support ticket.';
                setTimeout(function(){
                    window.location.href = 'https://www.cssstudio.co/profile/'
                },5000);
            }
        }
    }

    async paypal_sale(pid,pid2){
        const self = this;

        var payment = Globals.elements.new({
            type: "payment",
            parent: Globals.window.body,
            children: [
                {
                    type: "i",
                    classes: [ "fab", "fa-paypal" ]
                },
                {
                    type: "p",
                    text: "Checking your payment..."
                }
            ]
        });

        var payment_p = payment.getElementsByTagName('p')[0];

        setInterval(function(){
            self.updatePaymentStatus('Checking');
        },1000);

        const response = await Globals.api.request({ route: "me/payment/info", method: "post", data: { 'id': pid }, });
        if(response.success === true){
            if(response.data.status == 'completed'){
                self.verifyPayment(pid,pid2);
            }

            if(response.data.status == 'error'){
                payment_p.innerText = 'An error has occured while checking your payment , please open a support ticket.';
                setTimeout(function(){
                    window.location.href = 'https://www.cssstudio.co/profile/'
                },5000);
            }
        }
    }

    updatePaymentStatus(step){
        var payment = document.getElementsByTagName('payment')[0];
        var payment_p = payment.getElementsByTagName('p')[0];

        if(payment_p.innerText == step+' your payment.'){
            payment_p.innerText = step+' your payment..';
        }else{
            if(payment_p.innerText == step+' your payment..'){
                payment_p.innerText = step+' your payment...';
            }else{
                if(payment_p.innerText == step+' your payment...'){
                    payment_p.innerText = step+' your payment.';
                }
            }
        }
    }

    async verifyPayment(pid,pid2){
        var payment_p = document.getElementsByTagName('payment')[0].getElementsByTagName('p')[0];
        const response = await Globals.api.request({ route: "me/payment/verify", method: "post", data: { 'sid': pid, 'pid': pid2 }, });
        if(response.success === true){
            if(response.data.message == 'verified'){
                payment_p.innerText = 'Your account has been successfully upgraded. Refreshing...';
                setTimeout(function(){
                    window.location.href = 'https://www.cssstudio.co/profile/'
                },5000);
            }

            if(response.data.message == 'not verified, error'){
                payment_p.innerText = 'An error has occured while verifying your payment , please open a support ticket.';
                setTimeout(function(){
                    window.location.href = 'https://www.cssstudio.co/profile/'
                },5000);
            }
        }
    }

    async checkReferralCode(code){
        var referralcode = document.getElementsByClassName('refcode')[0];
        referralcode.style.opacity = '0.5';
        referralcode.style.pointerEvents = 'none';
        referralcode.style.animation = 'refcode 1s ease-in-out infinite';

        const response = await Globals.api.request({ route: "me/check/referralcode", method: "post", data: { 'code': code }, });
        if(response.success === true){
            if(response.data.message == 'Valid'){
                referralcode.style.opacity = '0.3';
                referralcode.style.pointerEvents = 'none';
                referralcode.style.animation = '';
                referralcode.style.border = '2px solid darkgreen';

                self.discountPrices();
            }else{
                if(response.data.message == 'Invalid'){
                    referralcode.style.opacity = '1';
                    referralcode.style.pointerEvents = 'unset';
                    referralcode.style.animation = '';
                    referralcode.style.border = '2px solid indianred';
                }else{
                    if(response.data.message == 'You have already used a referral code.'){
                        referralcode.style.opacity = '1';
                        referralcode.style.pointerEvents = 'unset';
                        referralcode.style.animation = '';
                        referralcode.style.border = '2px solid indianred';
                        Globals.notificationHandler.new('Error, '+response.data.message);
                    }
                }
            }
        }
    }

    discountPrices(){
        var membershipplans = document.getElementsByTagName('membershipplan');

        for(var i = 0; i < membershipplans.length; i++){
            var price = membershipplans[i].getElementsByTagName('span')[0];

            var discounted_price = Globals.elements.new({
                type: "span",
                parent: membershipplans[i],
                text: price.innerText == '4.99 $' ? "3.75 $" : price.innerText == '9.99 $' ? "7.50 $" : price.innerText == '19.99 $' ? "14.99 $" : price.innerText == '44.99 $' ? "33.75 $" : price.innerText,
                style: {
                    top: "35px",
                    background: "darkgreen",
                    textDecoration: "none"
                }
            });

            price.style.background = 'darkred';
            price.style.textDecoration = 'line-through';
        }
    }
}
