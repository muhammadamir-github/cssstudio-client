class LoginHandler{
    constructor(data){
        this.data = data;
    }

    setup(){
        const self = this;
        document.getElementById('loginform').getElementsByTagName('a')[0].addEventListener('click',function(){
        	document.getElementById('signupform').style.display = 'block';
        	document.getElementById('loginform').style.display = 'none';
        });

        document.getElementById('signupform').getElementsByTagName('a')[0].addEventListener('click',function(){
        	document.getElementById('loginform').style.display = 'block';
        	document.getElementById('signupform').style.display = 'none';
        });

        document.getElementById('signupform').getElementsByTagName('button')[0].addEventListener('click',function(){
        	self.s1();
        });

        document.getElementById('loginform').getElementsByTagName('button')[0].addEventListener('click',function(){
        	self.l1();
        });

        if(window.location.href.includes('new')){
            document.getElementById('loginform').style.display = 'none';
            document.getElementById('signupform').style.display = 'block';
        }

        if(localStorage.getItem("auth") !== null && self.data){
            window.location.href = '../profile/';
        }
    }

    s1(){
        const self = this;
        self.d();
        document.getElementById('signupform').style.opacity = '0.2';
        document.getElementById('signupform').style.pointerEvents = 'none';
    }

    d(){
        const self = this;
        $.ajax({
            url:'https://api.ipify.org/?format=json',
            type:'get',
            success: self.c1,
        });
    }

    async c1(response){
        const self = this;
        var ip = response.ip;

        const res = await Globals.api.request({ route: `ip/${ip}`, method: "get" });
        if(res.success === true){
            self.sf(res.data);
        }
    }

    async sf(response){
        const self = this;
        var username = document.getElementById('susername').value;
        var password = document.getElementById('spassword').value;
        var email = document.getElementById('semail').value;

        response = JSON.parse(response);

        var i = response.ip;
        var cy = response.city;
        var cty = response.country_name;
        var ctyc = response.country_code;
        var cnt = response.continent_name;
        var cntc = response.continent_code;
        var la = response.latitude;
        var lo = response.longitude;
        var r = response.region_name;
        var rc = response.region_code;
        var z = response.zip;
        var f = response.location.country_flag;

        var data = {
            'username':username,
            'email':email,
            'password':password,
            't':'f',
            'i':i,
            'cy':cy,
            'cty':cty,
            'ctyc': ctyc,
            'cnt':cnt,
            'cntc':cntc,
            'la':la,
            'lo':lo,
            'r':r,
            'rc':rc,
            'z':z,
            'f':f,
        };

        const res = await Globals.api.request({ route: 'signup', method: "post", data });
        if(res.success === true){
            self.sr(res.data);
        }else{
            //Globals.notificationHandler.new('An Error Occured, please try again later.');
            document.getElementById('signupform').style.opacity = '1';
            document.getElementById('signupform').style.pointerEvents = 'unset';
		}
    }

    sr(response){
        document.getElementById('signupform').style.opacity = '1';
        document.getElementById('signupform').style.pointerEvents = 'unset';

        if(response.message == 'an error occured'){
            //Globals.notificationHandler.new('An Error Occured, please make sure you have filled all fields correctly.');
        }else{
            if(response.message == 'We have sent you a mail with instructions, please verify your account to get started.'){
                //Globals.notificationHandler.new('Verification mail has been sent to your email address successfully , please verify your email to get started.');
            }else{
                if(response.message == 'Email address already registered with us.'){
                    //Globals.notificationHandler.new('Error Occured, An account has been already registered with this email address.');
                }else{
                    if(response.message == 'Signups are put on hold for sometime.'){
                        //Globals.notificationHandler.new('Error, Maintenance Undergoing.');
                    }
                }
            }
        }
    }

    l1(){
        d2();
        document.getElementById('loginform').style.opacity = '0.2';
        document.getElementById('loginform').style.pointerEvents = 'none';
    }

    d2(){
        const self = this;
        $.ajax({
            url:'https://api.ipify.org/?format=json',
            type:'get',
            success: self.c2,
        });
    }

    async c2(response){
        const self = this;
        var ip = response.ip;

        const res = await Globals.api.request({ route: `ip/${ip}`, method: "get" });
        if(res.success === true){
            self.lf(res.data);
        }
    }

    async lf(response){
        const self = this;
        response = JSON.parse(response);
        var i = response.ip;
        var la = response.latitude;
        var lo = response.longitude;
        var f = response.location.country_flag;
        var c = response.country_name;

        var e = document.getElementById('lemail').value;
        var p = document.getElementById('lpassword').value;

        var data = {
            'email':e,
            'password':p,
            'i':i,
            'la':la,
            'lo':lo,
            'f':f,
            'c':c,
        };

        const res = await Globals.api.request({ route: 'login', method: "post", data });
        if(res.success === true){
            self.lr(res.data);
        }else{
            //Globals.notificationHandler.new('Error , Invalid Credentials');
            document.getElementById('loginform').style.opacity = '1';
            document.getElementById('loginform').style.pointerEvents = 'unset';
		}
    }

    lr(response){
        if(response.message == 'an error occured.'){
            //Globals.notificationHandler.new('An Error Occured, please make sure you have filled all fields correctly.');
        }

        if(response.message == 'Please verify your account to continue.'){
            //Globals.notificationHandler.new('Error , Your email is not verified. We have just sent you a mail with instructions, Please verify your email.')
        }

        if(response.message == 'Unauthorized'){
            //Globals.notificationHandler.new('Error , Incorrect Credentials Entered.');
        }

        if(response.message == 'Deactivated'){
            //Globals.notificationHandler.new('Error , You can not login to a deactivated account.');
        }

        if(response.message == 'Logged in successfully!'){

            //Globals.notificationHandler.new('Logged in successfully, redirecting you to profile page....');
            localStorage.setItem("auth",response.accessToken);
            setTimeout(function(){
                window.location.href = '../profile/';
            },3500);

        }

        if(response.message == "User doesn't exist"){
            //Globals.notificationHandler.new('Error , Incorrect Credentials Entered.');
        }

        document.getElementById('loginform').style.opacity = '1';
        document.getElementById('loginform').style.pointerEvents = 'unset';
    }
}
