const Globals = window.globals;

class ProfileHandler{
    constructor(data){
        this.data = data;
    }

    setup(){
        const self = this;

        var profiletabs = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            id: "profileTabs",
            children: [
                {
                    type: "ul",
                    children: [
                        {
                            type: "li",
                            text: "General",
                            style: { color: "#e67300" },
                            listeners: {
                                click: function(){
                                    self.switchProfileTab(this);
                                }
                            }
                        },
                        {
                            type: "li",
                            text: "History",
                            listeners: {
                                click: function(){
                                    self.switchProfileTab(this);
                                }
                            }
                        }
                    ]
                }
            ]
        });

        if(window.location.href.includes('p=')){
            if(window.location.href.includes('pi=')){
                if(window.location.href.includes('pi2=')){
                    var pi = self.getParameter("pi");
                    var pi2 = self.getParameter("pi2");
                    paypal_sale(pi,pi2);
                }
            }
        }

        if(window.location.href.includes('plan=')){
            if(window.location.href.includes('paymentId=')){
                if(window.location.href.includes('token=')){
                    if(window.location.href.includes('PayerID=')){
                        if(window.location.href.includes('ct=')){
                            if(window.location.href.includes('c=')){
                                var plan = self.getParameter("plan");
                                var paymentId = self.getParameter("paymentId");
                                var token = self.getParameter("token");
                                var PayerID = self.getParameter("PayerID");
                                var ct = self.getParameter("ct");
                                var c = self.getParameter("c");
                                Globals.paypalHandler.paypal_execute(paymentId,PayerID,token,plan,ct,c);
                            }
                        }
                    }
                }
            }
        }

        String.prototype.capitalize = function(){
            return this.charAt(0).toUpperCase() + this.slice(1);
        }

        var ms = moment.utc(self.data.created_at).local().format("dddd, MMMM Do YYYY");
        var exat = moment(self.data.expires_at.substring(0,10)).format("dddd, MMMM Do YYYY");
        var general = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            id: "ptGeneral",
            children: [
                {
                    type: "profileBox",
                    style: { marginTop: "125px" },
                    children: [
                        {
                            type: "img",
                            classes: [ "profileimage" ],
                            attributes: {
                                src: '../../assets/images/application/membership/'+self.data.plan.toLowerCase()+'.png'
                            }
                        },
                        /*{
                            type: "p",
                            text: "Change",
                            id: "changeProfileimagetext"
                        }*/
                        {
                            type: "p",
                            text: self.data.username.capitalize(),
                            style: { fontWeight: "bolder", fontSize: "20px" }
                        },
                        {
                            type: "p",
                            text: 'Member since '+ ms + '.',
                            style: { top: "65px", left: "205px", fontSize: "12px" }
                        },
                        {
                            type: "ul",
                            children: [
                                {
                                    type: "li",
                                    text: moment(self.data.expires_at).isBefore(moment()) ? 'Your ' + self.data.plan + ' plan expired on '+ exat + '.' : 'Your ' + self.data.plan + ' plan will expire on '+ exat + '.',
                                },
                                {
                                    type: "li",
                                    text: 'You have ' + self.data.metadata.total_animations + ' animations & ' + self.data.metadata.total_elements + ' elements saved in your storage.',
                                }
                            ]
                        },
                        {
                            type: "button",
                            id: "upgbtn",
                            text: "Upgrade Account",
                            listeners: {
                                click: function(){
                                    let basic = this.parentElement;
                                    let history = document.getElementById('ptHistory');
                                    document.getElementById('upgp').style.display = "block";

                                    setTimeout(function(){
                                        document.getElementById('upgp').style.opacity = 1;

                                        general.style.opacity = '0.5';
                                        history.style.opacity = '0.5';
                                        basic.style.opacity = '0.5';

                                        general.style.pointerEvents = 'none';
                                        history.style.pointerEvents = 'none';
                                        basic.style.pointerEvents = 'none';
                                    },450);
                                }
                            }
                        }
                    ]
                },
                {
                    type: "profileBox",
                    style: { height: "320px" },
                    children: [
                        ...(() => {
                            return [
                                { text: "Email", value: self.data.email },
                                { text: "Phone", value: self.data.personal.phone },
                                { text: "Password", value: "" },
                                { text: "Username", value: self.data.username },
                            ].map((field, i) => {
                                return {
                                    type: "textinput",
                                    style: i === 0 || i === 1 ? { display: "inline-block" } : null,
                                    children: [
                                        {
                                            type: "label",
                                            text: field.text,
                                        },
                                        {
                                            type: "input",
                                            text: field.value,
                                            attributes: { value: field.value },
                                            listeners: {
                                                click: function(){
                                                    $(this.parentElement.parentElement).find('input').css({ border: "1px solid black" });
                                                    this.style.border = '1px solid #e67300';
                                                }
                                            }
                                        }
                                    ]
                                }
                            })
                        })(),
                        {
                            type: "orangebutton",
                            text: "Update",
                            listeners: {
                                click: function(){
                                    self.update();
                                }
                            }
                        },
                        {
                            type: "divlabel",
                            text: "Update Profile"
                        }
                    ]
                },
                {
                    type: "profileBox",
                    children: [
                        {
                            type: "button",
                            classes: [ "dactbtn" ],
                            text: "Deactivate Account",
                            listeners: {
                                click: function(){
                                    self.deactivateacc();
                                }
                            }
                        },
                        {
                            type: "p",
                            classes: [ "dwar" ],
                            text: "On deactivating , your account & all of your saved data including profile information , elements , animations & history will be deleted from our servers. You will not be able to login to this account in future again."
                        }
                    ]
                }
            ]
        });

        var history = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            id: "ptHistory",
            children: [
                {
                    type: "profileBox",
                    style: {
                        height: "1000px",
                        minHeight: "min-content",
                        marginTop: "125px"
                    },
                    children: [
                        {
                            type: "h6",
                            text: "Activity",
                            style: { top: "0px" }
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
                                                return ["Action", "Time"].map((x, i) => {
                                                    return {
                                                        type: "th",
                                                        text: x,
                                                    }
                                                });
                                            })(),
                                        }
                                    ]
                                },
                                {
                                    type: "tbody",
                                    children: (() => {
                                        return self.data.activity.map((x, i) => {
                                            return {
                                                type: "tr",
                                                children: [
                                                    {
                                                        type: "td",
                                                        text: x.type,
                                                    },
                                                    {
                                                        type: "td",
                                                        text: moment(moment.utc(x.created_at)).fromNow(),
                                                    }
                                                ]
                                            }
                                        })
                                    })(),
                                }
                            ]
                        },
                    ]
                },
                {
                    type: "profileBox",
                    style: {
                        height: "1000px",
                        minHeight: "min-content",
                        marginTop: "125px",
                        marginBottom: "50px"
                    },
                    children: [
                        {
                            type: "h6",
                            text: "Session"
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
                                                return ["Ip Address", "Country", "Time"].map((x, i) => {
                                                    return {
                                                        type: "th",
                                                        text: x,
                                                        style: {
                                                            width: i === 0 ? "30%" : i === 1 ? "20%" : i === 2 ? "50%" : null,
                                                            borderRight: i === 1 ? "1px solid #f1f1f1" : null
                                                        }
                                                    }
                                                });
                                            })(),
                                        }
                                    ]
                                },
                                {
                                    type: "tbody",
                                    children: (() => {
                                        return self.data.loginhistory.map((x, i) => {
                                            return {
                                                type: "tr",
                                                children: [
                                                    {
                                                        type: "td",
                                                        text: x.ip_address,
                                                    },
                                                    {
                                                        type: "td",
                                                        children: [
                                                            {
                                                                type: "img",
                                                                attributes: { src: x.flag }
                                                            },
                                                            {
                                                                type: "span",
                                                                text: x.country
                                                            }
                                                        ]
                                                    },
                                                    {
                                                        type: "td",
                                                        text: moment(moment.utc(x.created_at)).fromNow(),
                                                    }
                                                ]
                                            }
                                        })
                                    })(),
                                }
                            ]
                        },
                    ]
                }
            ]
        });

        var basic = general.getElementsByTagName('profileBox')[0];

        if(moment(self.data.expires_at).isBefore(moment())){
            Globals.membershipHandler.notice('plan-expired', exat);
        }

        self.ip();

        var upgradeplan = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            id: "upgp",
            children: [
                {
                    type: "i",
                    classes: [ "fas", "fa-times", "close" ],
                    listeners: {
                        click: function(){
                            upgradeplan.style.opacity = 0;
                            setTimeout(function(){
                                upgradeplan.style.display = "none";
                                general.style.opacity = '1';
                                history.style.opacity = '1';
                                basic.style.opacity = '1';

                                general.style.pointerEvents = 'unset';
                                history.style.pointerEvents = 'unset';
                                basic.style.pointerEvents = 'unset';
                            },750);
                        }
                    }
                }
            ]
        });

        Globals.paypalHandler.setup(self.data);
    }

    planExpired(){
        const self = this;
        var exatExpiry = moment(self.data.expires_at.substring(0,10)).format("dddd, MMMM Do YYYY");
        Globals.membershipHandler.notice('plan-expired',exatExpiry);

        var upgradeplan = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            id: "upgp",
        });

        Globals.paypalHandler.setup(self.data);
        document.getElementById('upgp').style.display = 'block';
        document.getElementById('upgp').style.opacity = '1';

        if(window.location.href.includes('p=')){
            if(window.location.href.includes('pi=')){
                if(window.location.href.includes('pi2=')){
                    var pi = self.getParameter("pi");
                    var pi2 = self.getParameter("pi2");
                    paypal_sale(pi,pi2);
                }
            }
        }

        if(window.location.href.includes('plan=')){
            if(window.location.href.includes('paymentId=')){
                if(window.location.href.includes('token=')){
                    if(window.location.href.includes('PayerID=')){
                        if(window.location.href.includes('ct=')){
                            if(window.location.href.includes('c=')){
                                var plan = self.getParameter("plan");
                                var paymentId = self.getParameter("paymentId");
                                var token = self.getParameter("token");
                                var PayerID = self.getParameter("PayerID");
                                var ct = self.getParameter("ct");
                                var c = self.getParameter("c");
                                Globals.paypalHandler.paypal_execute(paymentId,PayerID,token,plan,ct,c);
                            }
                        }
                    }
                }
            }
        }
    }

    getParameter(p){
        var url_string = window.location.href;
        var url = new URL(url_string);
        return url.searchParams.get(p);
    }

    async update(){
        var textinputs = document.getElementsByTagName('textinput');
        var email = textinputs[0].getElementsByTagName('input')[0].value;
        var password = textinputs[3].getElementsByTagName('input')[0].value;
        var phone = textinputs[1].getElementsByTagName('input')[0].value;
        var username = textinputs[2].getElementsByTagName('input')[0].value;

        const response = await Globals.api.request({ route: "me/profile/update", method: "post", data: { 'email': email, 'password': password, 'phone': phone, 'username': username }, });
        if(response.success === true){
            if(response.message == 'Sent confirmation mail.'){
                Globals.notificationHandler.new('Confirmation mail sent successfully , Please check your email.');
            }
        }else{
            Globals.notificationHandler.new('An error occured, please try again later.');
        }
    }

    ip(){
        const self = this;
        $.ajax({
            url:'https://api.ipify.org/?format=json',
            type:'get',
            success: self.country,
        });
    }

    async country(data){
        var ip = data.ip;

        const response = await Globals.api.request({ route: "ip/"+ip, method: "get" });
        if(response.success === true){
            var basic = document.getElementsByTagName('profilebox')[0];

            var countryflag = Globals.elements.new({
                type: "img",
                parent: basic,
                classes: [ "cflag" ],
                attributes: { src: JSON.parse(response.data).location.country_flag }
            });
        }
    }

    async deactivateacc(){
        const response = await Globals.api.request({ route: "me/profile/deactivate", method: "get" });
        if(response.success === true){
            Globals.notificationHandler.new('We have successfully sent you a deactivation confirm mail.Please check your email.');
        }else{
            Globals.notificationHandler.new('Error , please try again.');
        }
    }

    async getIpFlag(ip, imageElement){
        const self = this;
        const response = await Globals.api.request({ route: "ip/"+ip, method: "get" });
        if(response.success === true){
            var url = JSON.parse(response.data).location.country_flag;
            self.attachflagToIp(imageElement, url);
        }
    }

    attachflagToIp(imageElement, flagUrl){
        imageElement.src = flagUrl;
    }

    logout(){
        localStorage.removeItem('auth');
        window.location.href = '../home/';
    }

    switchProfileTab(e){
        var tabName = e.innerText;
        var tabs = document.getElementById('profileTabs').getElementsByTagName('ul')[0].getElementsByTagName('li');

        var general = document.getElementById('ptGeneral');
        general.style.display = 'none';
        var history = document.getElementById('ptHistory');
        history.style.display = 'none';

        for(var i=0; i < tabs.length; i++){
            tabs[i].style.color = 'black';
        }

        if(tabName == 'General'){
            general.style.display = 'block';
        }else{
            if(tabName == 'History'){
                history.style.display = 'block';
            }
        }

        e.style.color = '#e67300';
    }
}
