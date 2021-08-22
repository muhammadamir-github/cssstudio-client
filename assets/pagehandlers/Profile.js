const Globals = window.globals;

class ProfileHandler{
    constructor(data){
        this.data = data;
    }

    setup(){
        const self = this;

        var head = document.getElementsByTagName('head')[0];
        head.innerHTML += '';

        var profiletabs = document.createElement('div');
        profiletabs.setAttribute('id','profileTabs');
        profiletabs.innerHTML = '<ul><li style="color: #e67300;">General</li><li>History</li></ul>';

        document.getElementsByTagName('body')[0].appendChild(profiletabs);

        setTimeout(function(){
            var tabs = document.getElementById('profileTabs').getElementsByTagName('ul')[0].getElementsByTagName('li');

            for(var i=0; i < tabs.length; i++){
                tabs[i].addEventListener('click',function(){
                    self.switchProfileTab(this);
                });
            }
        },2000);

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

        String.prototype.capitalize = function() {
            return this.charAt(0).toUpperCase() + this.slice(1);
        }

        var general = document.createElement('div');
        general.setAttribute("id",'ptGeneral');

        var history = document.createElement('div');
        history.setAttribute("id",'ptHistory');

        var basic = document.createElement('profileBox');
        basic.style.marginTop = '125px';

        var profileimage = document.createElement('img');
        profileimage.setAttribute('class','profileimage');
        profileimage.setAttribute('src','https://www.cssstudio.co/assets/images/application/membership/'+self.data.plan.toLowerCase()+'.png');

        var profileImage_changetext = document.createElement('p');
        profileImage_changetext.innerText = 'Change';
        profileImage_changetext.setAttribute('id','changeProfileimagetext');

        var name = document.createElement('p');
        name.innerText = self.data.username.capitalize();
        name.style.fontWeight = 'bolder';
        name.style.fontSize = '20px';

        var ms = moment.utc(self.data.created_at).local().format("dddd, MMMM Do YYYY");

        var membersince = document.createElement('p');
        membersince.innerText = 'Member since '+ ms + '.';
        membersince.style.top = '65px';
        membersince.style.left = '205px';
        membersince.style.fontSize = '12px';

        var detailsul = document.createElement('ul');

        var exat = moment(self.data.expires_at.substring(0,10)).format("dddd, MMMM Do YYYY");

        var membershipExpiresAt = document.createElement('li');
        if(moment(self.data.expires_at).isBefore(moment())){
            membershipExpiresAt.innerText = 'Your ' + self.data.plan + ' plan expired on '+ exat + '.';
            Globals.membershipHandler.notice('plan-expired',exat);
        }else{
            membershipExpiresAt.innerText = 'Your ' + self.data.plan + ' plan will expire on '+ exat + '.';
        }


        var total = document.createElement('li');
        total.innerText = 'You have ' + self.data.metadata.total_animations + ' animations & ' + self.data.metadata.total_elements + ' elements saved in your storage.';

        detailsul.appendChild(membershipExpiresAt);
        detailsul.appendChild(total);

        var upgrade_account = document.createElement('button');
        upgrade_account.setAttribute('id','upgbtn');
        upgrade_account.innerText = 'Upgrade Account';
        upgrade_account.addEventListener('click',function(){
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

        });


        basic.appendChild(profileimage);
        //basic.appendChild(profileImage_changetext);
        basic.appendChild(name);
        basic.appendChild(upgrade_account);

        self.ip();

        basic.appendChild(membersince);
        basic.appendChild(detailsul);

        var updateprofile = document.createElement('profilebox');
        updateprofile.style.height = '320px';

        var emailinput = document.createElement("textinput");
        emailinput.style.display = 'inline-block';
        var emailinput_label = document.createElement('label');
        emailinput_label.innerText = 'Email';
        var emailinput_input = document.createElement('input');
        emailinput_input.value = self.data.email;
        emailinput.appendChild(emailinput_label);
        emailinput.appendChild(emailinput_input);

        var phoneinput = document.createElement("textinput");
        phoneinput.style.display = 'inline-block';
        var phoneinput_label = document.createElement('label');
        phoneinput_label.innerText = 'Phone';
        var phoneinput_input = document.createElement('input');
        phoneinput_input.value = self.data.personal.phone;
        phoneinput.appendChild(phoneinput_label);
        phoneinput.appendChild(phoneinput_input);

        var passwordinput = document.createElement("textinput");
        var passwordinput_label = document.createElement('label');
        passwordinput_label.innerText = 'Password';
        var passwordinput_input = document.createElement('input');
        passwordinput.appendChild(passwordinput_label);
        passwordinput.appendChild(passwordinput_input);

        var usernameinput = document.createElement("textinput");
        var usernameinput_label = document.createElement('label');
        usernameinput_label.innerText = 'Username';
        var usernameinput_input = document.createElement('input');
        usernameinput_input.value = self.data.username;
        usernameinput.appendChild(usernameinput_label);
        usernameinput.appendChild(usernameinput_input);

        var orangebutton = document.createElement('orangebutton');
        orangebutton.addEventListener('click',function(){
            self.update();
        });
        orangebutton.innerText = 'Update';

        emailinput_input.addEventListener('click',function(){
            this.style.border = '1px solid #e67300';
            passwordinput_input.style.border = '1px solid black';
            usernameinput_input.style.border = '1px solid black';
            phoneinput_input.style.border = '1px solid black';
        });

        usernameinput_input.addEventListener('click',function(){
            this.style.border = '1px solid #e67300';
            passwordinput_input.style.border = '1px solid black';
            emailinput_input.style.border = '1px solid black';
            phoneinput_input.style.border = '1px solid black';
        });

        passwordinput_input.addEventListener('click',function(){
            this.style.border = '1px solid #e67300';
            emailinput_input.style.border = '1px solid black';
            usernameinput_input.style.border = '1px solid black';
            phoneinput_input.style.border = '1px solid black';
        });

        phoneinput_input.addEventListener('click',function(){
            this.style.border = '1px solid #e67300';
            emailinput_input.style.border = '1px solid black';
            usernameinput_input.style.border = '1px solid black';
            passwordinput_input.style.border = '1px solid black';
        });

        updateprofile.appendChild(emailinput);
        updateprofile.appendChild(phoneinput);
        updateprofile.appendChild(usernameinput);
        updateprofile.appendChild(passwordinput);
        updateprofile.appendChild(orangebutton);

        var divlabel_updateprofile = document.createElement('divlabel');
        divlabel_updateprofile.innerText = "Update Profile";

        updateprofile.appendChild(divlabel_updateprofile);

        var activity = document.createElement('profilebox');
        activity.style.height = '1000px;';
        activity.style.minHeight = 'min-content';
        activity.style.marginTop = '125px';

        var activityHeading = document.createElement('h6');
        activityHeading.innerText = 'Activity';
        activityHeading.style.top = '0px';

        var table = document.createElement('table');
        table.setAttribute('cellpadding','0');
        table.setAttribute('cellspacing','0');
        var tablehead = document.createElement('thead');
        var tablehead_tr = document.createElement('tr');

        var tablehead_th1 = document.createElement('th');
        var tablehead_th2 = document.createElement('th');

        tablehead_th1.innerText = 'Action';
        tablehead_th2.innerText = 'Time';

        tablehead_tr.appendChild(tablehead_th1);
        tablehead_tr.appendChild(tablehead_th2);
        tablehead.appendChild(tablehead_tr);
        table.appendChild(tablehead);

        var tablebody = document.createElement('tbody');

        for(var i=0; i < self.data.activity.length; i++){
            var tr = document.createElement('tr');
            var th1 = document.createElement('td');
            var th2 = document.createElement('td');
            th1.innerText = self.data.activity[i].type;
            th2.innerText = moment(moment.utc(self.data.activity[i].created_at)).fromNow();//.local().format("dddd, MMMM Do YYYY, h:mm:ss a");
            tr.appendChild(th1);
            tr.appendChild(th2);
            tablebody.appendChild(tr);
        }

        table.appendChild(tablebody);
        activity.appendChild(activityHeading);
        activity.appendChild(table);

        var loginhistory = document.createElement('profilebox');
        loginhistory.style.height = '1000px;';
        loginhistory.style.minHeight = 'min-content';
        loginhistory.style.marginBottom = '50px';
        loginhistory.style.marginTop = '125px';

        var loginhistoryHeading = document.createElement('h6');
        loginhistoryHeading.innerText = 'Session';

        var table2 = document.createElement('table');
        table2.setAttribute('cellpadding','0');
        table2.setAttribute('cellspacing','0');
        var table2head = document.createElement('thead');
        var table2head_tr = document.createElement('tr');

        var table2head_th1 = document.createElement('th');
        var table2head_th2 = document.createElement('th');
        var table2head_th3 = document.createElement('th');

        table2head_th1.innerText = 'Ip Address';
        table2head_th1.style.width = '30%';
        table2head_th2.innerText = 'Country';
        table2head_th2.style.width = '20%';
        table2head_th2.style.borderRight = '1px solid #f1f1f1';
        table2head_th3.innerText = 'Time';
        table2head_th3.style.width = '50%';

        table2head_tr.appendChild(table2head_th1);
        table2head_tr.appendChild(table2head_th2);
        table2head_tr.appendChild(table2head_th3);
        table2head.appendChild(table2head_tr);
        table2.appendChild(table2head);


        var table2body = document.createElement('tbody');

        for(var i=0; i < self.data.loginhistory.length; i++){
            var tr = document.createElement('tr');
            var th1 = document.createElement('td');
            var th2 = document.createElement('td');
            var th3 = document.createElement('td');

            var th2ip = document.createElement('span');
            th2ip.innerText = self.data.loginhistory[i].country;

            var flag = document.createElement('img');

            //self.getIpFlag(self.data.loginhistory[i].ip_address,flag);

            th1.innerText = self.data.loginhistory[i].ip_address;
            th2.appendChild(flag);
            th2.appendChild(th2ip);
            flag.src = self.data.loginhistory[i].flag;
            th3.innerText = moment(moment.utc(self.data.loginhistory[i].created_at)).fromNow();//.local().format("dddd, MMMM Do YYYY, h:mm:ss a");
            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            table2body.appendChild(tr);
        }

        table2.appendChild(table2body);
        loginhistory.appendChild(loginhistoryHeading);
        loginhistory.appendChild(table2);

        var deactivate = document.createElement('profilebox');
        var deactivatebtn = document.createElement('button');
        deactivatebtn.setAttribute('class','dactbtn');
        deactivatebtn.innerText = "Deactivate Account";
        deactivatebtn.addEventListener('click',function(){
            self.deactivateacc();
        });

        var deactivate_warning = document.createElement('p');
        deactivate_warning.setAttribute('class','dwar');
        deactivate_warning.innerText = "On deactivating , your account & all of your saved data including profile information , elements , animations & history will be deleted from our servers. You will not be able to login to this account in future again."

        deactivate.appendChild(deactivatebtn);
        deactivate.appendChild(deactivate_warning);

        var upgradeplan = document.createElement('div');
        upgradeplan.setAttribute('id','upgp');

        var upgradeplanclose = document.createElement('i');
        upgradeplanclose.setAttribute('class','fas fa-times close');
        upgradeplanclose.addEventListener('click',function(){
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
        });

        upgradeplan.appendChild(upgradeplanclose);

        general.appendChild(basic);
        general.appendChild(updateprofile);
        general.appendChild(deactivate);
        $('body').append(general);
        $('body').append(upgradeplan);

        history.appendChild(activity);
        history.appendChild(loginhistory);
        $('body').append(history);

        Globals.paypalHandler.setup(self.data);
    }

    planExpired(){
        const self = this;
        var exatExpiry = moment(self.data.expires_at.substring(0,10)).format("dddd, MMMM Do YYYY");
        Globals.membershipHandler.notice('plan-expired',exatExpiry);

        var upgradeplan = document.createElement('div');
        upgradeplan.setAttribute('id','upgp');

        document.getElementsByTagName('body')[0].appendChild(upgradeplan);

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
            var countryflag = document.createElement('img');
            countryflag.setAttribute('class','cflag');
            countryflag.src = JSON.parse(response.data).location.country_flag;
            basic.appendChild(countryflag);
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
