$(document).ready(function (){

    if(localStorage.getItem("auth") === null) {
       window.location.href = '../login/';
    }else{
      token = localStorage.getItem("auth");
      $.ajax({
        url:'http://localhost:8000/api/me',
        type:'GET',
        beforeSend: function(request) {
            request.setRequestHeader('Authorization', 'Bearer '+token);
            request.setRequestHeader('Accept', 'application/json');
        },
        success: function(response){
          if(response.message == 'Unauthenticated.'){
            window.location.href = '../login/';
          }else{
            if(isMember(response)){
              loggedin(response);
            }else{
              planExpired(response);
            }
          }
        },
        error: function(response){
          //window.location.href = '../login/';
        }
      })
    }

});

function getParameter(p){

var url_string = window.location.href;
var url = new URL(url_string);
return url.searchParams.get(p);

}

function updatePaymentStatus(step){

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

function planExpired(response){
  document.getElementsByTagName('loader')[0].remove();
  var exatExpiry = moment(response.success.expires_at.substring(0,10)).format("dddd, MMMM Do YYYY");
  notice('plan-expired',exatExpiry);

  var upgradeplan = document.createElement('div');
  upgradeplan.setAttribute('id','upgp');

  //document.getElementsByTagName('head')[0].innerHTML += '<style>payment{position:absolute;z-index:7;width:100%;height:100%;background:rgba(0,0,0,.7);overflow:hidden;left:0;top:0}payment .fa-paypal{position:relative;left:50%;transform:translate(-50%);font-size:75px;color:#fff;margin-top:20%}payment p{position:absolute;font-size:25px;color:#fff;left:50%;transform:translate(-50%);display:block;margin-top:20px;font-family:ProximaNovaBold;text-align:center} #upgp::-webkit-scrollbar{width: 4px;background-color: #F5F5F5;}#upgp::-webkit-scrollbar-track{-webkit-box-shadow: inset 0 0 4px rgba(0,0,0,0.3);background-color: #F5F5F5;}#upgp::-webkit-scrollbar-thumb{background-color: #000000;}#upgp{display: block;position: absolute; z-index: 4; width: 50%;/* height: 50%; */background: white;border-radius: 5px;left: 50%;transform: translate(-50%,-50%);top: 50%;transition: opacity 0.4s ease-in-out;opacity: 0;display: none;overflow: hidden;overflow-y: scroll;box-shadow: 0 0 5px black;padding-bottom: 20px;padding-top: 10px;}#upgp form{width: 80%;padding-left: 20px;padding-right: 20px;padding-top: 20px;padding-bottom: 20px;min-height: fit-content;max-height: 1000px;position: relative;display: block;opacity: 1;}#upgp form input[type='+'text'+']{width: 90%;height: 10px;margin-top: 10px;margin-bottom: 10px;padding: 10px;position: relative;display: block;opacity: 1;padding: 15px;font-size: 14px;font-family: sans-serif;border: 1px solid #f1f1f1;transition: border 0.5s ease-in-out;background: white;}#upgp form input[type='+'text'+']:hover{border: 1px solid black;}#upgp form input[type='+'submit'+']{width: 250px;height: 45px;margin-top: 10px;margin-bottom: 10px;padding: 20px;text-align: left;position: relative;display: inline-block;opacity: 1;padding: 15px;font-size: 15px;font-family: ProximaNovaBold;border: 1px solid #f1f1f1;background: #1a1a1a;color: white;border: none;outline: none;}#upgp button{position: relative;transform: translate(-50%);width: 200px;height: 35px;margin-top: 20px;left: 50%;background: #1a1a1a;border: none;outline: none;color: white;transition: 0.5s opacity ease-out;cursor: pointer;border-radius: 5px;}#upgbtn{position: absolute;right: 10px;top: 0px;background: #1a1a1a;color: white;width: 150px;height: 30px;border: none;outline: none;border-bottom-left-radius: 5px;border-bottom-right-radius: 5px;cursor: pointer;transition: 0.5s opacity ease-out;font-family: ProximaNovaBold;font-size: 13px;}#upgp button:hover, #upgbtn:hover{opacity: 0.5;}#upgp .adfree{position: absolute;font-size: 10px;left: 50%;transform: translate(-50%);width: 80%;margin-top: 10px;font-family: sans-serif;text-align: center;margin-top: 5px;}membershipplan{position:relative;display:block;width:90%;left:50%;border:1px solid rgba(0,0,0,1);border-radius:3px;transform:translate(-50%);margin-top:25px;max-height:300px;height:90px;transition:height .4s,border .4s ease-in-out;cursor:pointer;overflow:hidden}membership[data-plan]{background:#f0b7a1;background:-moz-linear-gradient(45deg,#f0b7a1 0,#8c3310 29%,#752201 30%,#752201 30%,#bf6e4e 100%);background:-webkit-linear-gradient(45deg,#f0b7a1 0,#8c3310 29%,#752201 30%,#752201 30%,#bf6e4e 100%);background:linear-gradient(45deg,#f0b7a1 0,#8c3310 29%,#752201 30%,#752201 30%,#bf6e4e 100%)}membershipplan:hover{border:1px solid rgba(0,0,0,.3)}.selectedplan{height:300px;border:1px solid green}.selectedplan:hover{border:1px solid green}membershipplan span{position:absolute;right:10px;top:10px;color:#fff;background:#1a1a1a;padding:5px;text-align:center;font-size:14px;font-family:ProximaNovaBold}membershipplan ul{position:relative;list-style:none;display:block;padding:0;height:200px;max-height:300px;min-height:fit-content}membershipplan ul li{width:100%;position:relative;display:block;height:30px;font-family:sans-serif;text-align:center}membershipplan ul li .fa-check{color:green}membershipplan ul li .fa-times{color:#8b0000}membershipplan ul li .fa-angle-double-up{color:green;margin-left:5px}membershipplan p{width:100%;font-size:30px;text-align:center;font-family:ProximaNovaBold;letter-spacing:1.5px;color:#000;position:relative} @media only screen and (min-device-width : 300px) and (max-device-width : 480px) { #upgp{ width: 75%;} }</style>';

  document.getElementsByTagName('body')[0].appendChild(upgradeplan);

  setUpPaypal(response);
  document.getElementById('upgp').style.display = 'block';
  document.getElementById('upgp').style.opacity = '1';

  if(window.location.href.includes('p=')){
    if(window.location.href.includes('pi=')){
      if(window.location.href.includes('pi2=')){
        var pi = getParameter("pi");
        var pi2 = getParameter("pi2");
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
              var plan = getParameter("plan");
              var paymentId = getParameter("paymentId");
              var token = getParameter("token");
              var PayerID = getParameter("PayerID");
              var ct = getParameter("ct");
              var c = getParameter("c");
              paypal_execute(paymentId,PayerID,token,plan,ct,c);
            }
          }
        }
      }
    }
  }

}

function loadSideBar(){
    var sidebar = document.createElement('sidebar');
    sidebar.innerHTML = '<ul><p>Account</p><li data-link='+'../profile/'+'><i class="fas fa-user-circle"></i> Profile</li><li data-link='+'../billing/'+'><i class="fas fa-credit-card"></i> Billing</li><li data-link='+'../notifications/'+'><i class="fas fa-bell"></i> Notifications</li><div class="ulLine"></div><p>Manage</p><li data-link='+'../studio/'+' style="color: white;"><i class="fas fa-tools"></i> Workspace</li><li data-link='+'../storage/'+'><i class="fas fa-archive"></i> Storage</li><li data-link='+'../support/'+'><i class="fas fa-life-ring"></i> Support</li><div class="ulLine"></div><li onclick="logout();"><i class="fas fa-sign-out-alt"></i> Logout</li><i class="fas fa-angle-left" id="openclose"></i></ul>';

    document.getElementsByTagName('body')[0].appendChild(sidebar);
}

function loggedin(response){

    loadSideBar();

var head = document.getElementsByTagName('head')[0];
head.innerHTML += '';

var profiletabs = document.createElement('div');
profiletabs.setAttribute('id','profileTabs');
profiletabs.innerHTML = '<ul><li style="color: #e67300;">General</li><li>History</li></ul>';

document.getElementsByTagName('body')[0].appendChild(profiletabs);

var openclose = document.getElementById('openclose');
    openclose.addEventListener("click",function(){
      if(document.getElementsByTagName('sidebar')[0].style.left == '0px'){
        document.getElementsByTagName('sidebar')[0].style.left = '-170px';
        setTimeout(function(){;$('.ulLine').css({'display':'none'})},500);
        this.setAttribute('class','fas fa-angle-right');
      }else{
        document.getElementsByTagName('sidebar')[0].style.left = '0px';
        $('.ulLine').css({'display':'block'});
        this.setAttribute('class','fas fa-angle-left');
      }
    });

    var siderbar_lis = document.getElementsByTagName('sidebar')[0].getElementsByTagName('li');
    for(var i=0; i < siderbar_lis.length; i++){
      if(siderbar_lis[i].innerText.includes('Logout')){
        //console.log('found');
      }else{
        siderbar_lis[i].addEventListener('click',function(){
            window.location.href = $(this).attr('data-link');
        });
      }
    }

setTimeout(function(){
  var tabs = document.getElementById('profileTabs').getElementsByTagName('ul')[0].getElementsByTagName('li');

    for(var i=0; i < tabs.length; i++){
      tabs[i].addEventListener('click',function(){
        switchProfileTab(this);
    });
    }
},2000);

document.getElementsByTagName('loader')[0].remove();

if(window.location.href.includes('p=')){
  if(window.location.href.includes('pi=')){
    if(window.location.href.includes('pi2=')){
      var pi = getParameter("pi");
      var pi2 = getParameter("pi2");
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
              var plan = getParameter("plan");
              var paymentId = getParameter("paymentId");
              var token = getParameter("token");
              var PayerID = getParameter("PayerID");
              var ct = getParameter("ct");
              var c = getParameter("c");
              paypal_execute(paymentId,PayerID,token,plan,ct,c);
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
profileimage.setAttribute('src','https://www.cssstudio.co/assets/images/application/membership/'+response.success.plan.toLowerCase()+'.png');

var profileImage_changetext = document.createElement('p');
profileImage_changetext.innerText = 'Change';
profileImage_changetext.setAttribute('id','changeProfileimagetext');

var name = document.createElement('p');
name.innerText = response.success.username.capitalize();
name.style.fontWeight = 'bolder';
name.style.fontSize = '20px';

var ms = moment.utc(response.success.created_at).local().format("dddd, MMMM Do YYYY");

var membersince = document.createElement('p');
membersince.innerText = 'Member since '+ ms + '.';
membersince.style.top = '65px';
membersince.style.left = '205px';
membersince.style.fontSize = '12px';

var detailsul = document.createElement('ul');

var exat = moment(response.success.expires_at.substring(0,10)).format("dddd, MMMM Do YYYY");

var membershipExpiresAt = document.createElement('li');
if(moment(response.success.expires_at).isBefore(moment())){
  membershipExpiresAt.innerText = 'Your ' + response.success.plan + ' plan expired on '+ exat + '.';
  notice('plan-expired',exat);
}else{
  membershipExpiresAt.innerText = 'Your ' + response.success.plan + ' plan will expire on '+ exat + '.';
}


var total = document.createElement('li');
total.innerText = 'You have ' + response.success.metadata.total_animations + ' animations & ' + response.success.metadata.total_elements + ' elements saved in your storage.';

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

ip();

basic.appendChild(membersince);
basic.appendChild(detailsul);

var updateprofile = document.createElement('profilebox');
updateprofile.style.height = '320px';

var emailinput = document.createElement("textinput");
emailinput.style.display = 'inline-block';
var emailinput_label = document.createElement('label');
emailinput_label.innerText = 'Email';
var emailinput_input = document.createElement('input');
emailinput_input.value = response.success.email;
emailinput.appendChild(emailinput_label);
emailinput.appendChild(emailinput_input);

var phoneinput = document.createElement("textinput");
phoneinput.style.display = 'inline-block';
var phoneinput_label = document.createElement('label');
phoneinput_label.innerText = 'Phone';
var phoneinput_input = document.createElement('input');
phoneinput_input.value = response.success.personal.phone;
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
usernameinput_input.value = response.success.username;
usernameinput.appendChild(usernameinput_label);
usernameinput.appendChild(usernameinput_input);

var orangebutton = document.createElement('orangebutton');
orangebutton.addEventListener('click',function(){
  update();
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

for(var i=0; i < response.success.activity.length; i++){
	var tr = document.createElement('tr');
	var th1 = document.createElement('td');
	var th2 = document.createElement('td');
	th1.innerText = response.success.activity[i].type;
	th2.innerText = moment(moment.utc(response.success.activity[i].created_at)).fromNow();//.local().format("dddd, MMMM Do YYYY, h:mm:ss a");
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

for(var i=0; i < response.success.loginhistory.length; i++){
  var tr = document.createElement('tr');
  var th1 = document.createElement('td');
  var th2 = document.createElement('td');
  var th3 = document.createElement('td');

  var th2ip = document.createElement('span');
  th2ip.innerText = response.success.loginhistory[i].country;

  var flag = document.createElement('img');

  //getIpFlag(response.success.loginhistory[i].ip_address,flag);

  th1.innerText = response.success.loginhistory[i].ip_address;
  th2.appendChild(flag);
  th2.appendChild(th2ip);
  flag.src = response.success.loginhistory[i].flag;
  th3.innerText = moment(moment.utc(response.success.loginhistory[i].created_at)).fromNow();//.local().format("dddd, MMMM Do YYYY, h:mm:ss a");
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
  deactivateacc();
});

deactivate_warning = document.createElement('p');
deactivate_warning.setAttribute('class','dwar');
deactivate_warning.innerText = "On deactivating , your account & all of your saved data including profile information , elements , animations & history will be deleted from our servers. You will not be able to login to this account in future again."

deactivate.appendChild(deactivatebtn);
deactivate.appendChild(deactivate_warning);

var upgradeplan = document.createElement('div');
upgradeplan.setAttribute('id','upgp');

upgradeplanclose = document.createElement('i');
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

setUpPaypal(response);

}

function setUpPaypal(response){

var referralcode = document.createElement('input');
referralcode.setAttribute('type','text');
referralcode.setAttribute('placeholder','Referral/Discount Code');
referralcode.setAttribute('class','refcode');
referralcode.setAttribute('maxlength','8');
referralcode.addEventListener('input',function(){
  if(this.value.length == '8'){
    checkReferralCode(this.value);
  }
});

var bronzeplan = document.createElement('membershipplan');
var silverplan = document.createElement('membershipplan');
var goldplan = document.createElement('membershipplan');
var diamondplan = document.createElement('membershipplan');

var bronzeplan_price = document.createElement('span');
var silverplan_price = document.createElement('span');
var goldplan_price = document.createElement('span');
var diamondplan_price = document.createElement('span');

bronzeplan_price.innerText = '4.99 $';
silverplan_price.innerText = '9.99 $';
goldplan_price.innerText = '19.99 $';
diamondplan_price.innerText = '44.99 $';

bronzeplan.setAttribute('data-plan','Bronze');
silverplan.setAttribute('data-plan','Silver');
goldplan.setAttribute('data-plan','Gold');
diamondplan.setAttribute('data-plan','Diamond');

bronzeplan.appendChild(bronzeplan_price);
silverplan.appendChild(silverplan_price);
goldplan.appendChild(goldplan_price);
diamondplan.appendChild(diamondplan_price);

bronzeplan.addEventListener('click',function(){
  silverplan.classList.remove('selectedplan');
  goldplan.classList.remove('selectedplan');
  diamondplan.classList.remove('selectedplan');
  this.classList.add('selectedplan');
});
silverplan.addEventListener('click',function(){
  bronzeplan.classList.remove('selectedplan');
  goldplan.classList.remove('selectedplan');
  diamondplan.classList.remove('selectedplan');
  this.classList.add('selectedplan');
});
goldplan.addEventListener('click',function(){
  bronzeplan.classList.remove('selectedplan');
  silverplan.classList.remove('selectedplan');
  diamondplan.classList.remove('selectedplan');
  this.classList.add('selectedplan');
});
diamondplan.addEventListener('click',function(){
  bronzeplan.classList.remove('selectedplan');
  silverplan.classList.remove('selectedplan');
  goldplan.classList.remove('selectedplan');
  this.classList.add('selectedplan');
});


var bronzeplan_p_heading = document.createElement('p');
bronzeplan_p_heading.setAttribute('class','heading');
bronzeplan_p_heading.innerText = 'Bronze Plan';

var bronzeplan_ul = document.createElement('ul');
var bronzeplan_ul_li_1 = document.createElement('li');
var bronzeplan_ul_li_2 = document.createElement('li');
var bronzeplan_ul_li_3 = document.createElement('li');
var bronzeplan_ul_li_4 = document.createElement('li');
var bronzeplan_ul_li_5 = document.createElement('li');
var bronzeplan_ul_li_6 = document.createElement('li');

var bronzeplan_ul_li_1_icon = document.createElement('i');
var bronzeplan_ul_li_2_icon = document.createElement('i');
var bronzeplan_ul_li_3_icon = document.createElement('i');
var bronzeplan_ul_li_4_icon = document.createElement('i');
var bronzeplan_ul_li_5_icon = document.createElement('i');
var bronzeplan_ul_li_6_icon = document.createElement('i');

bronzeplan_ul_li_1.innerText = 'Access to element creator. (1 Month) ';
bronzeplan_ul_li_2.innerText = 'Save upto 10 items in storage. ';
bronzeplan_ul_li_3.innerText = 'Ability to open support tickets. ';
bronzeplan_ul_li_4.innerText = 'Access to element animator. (1 Month) ';
bronzeplan_ul_li_5.innerText = 'Ability to use premium ready made animations. ';
bronzeplan_ul_li_6.innerText = 'Save maxium 0 animations a day. ';

bronzeplan_ul_li_1_icon.setAttribute('class','fas fa-check');
bronzeplan_ul_li_2_icon.setAttribute('class','fas fa-check');
bronzeplan_ul_li_3_icon.setAttribute('class','fas fa-check');
bronzeplan_ul_li_4_icon.setAttribute('class','fas fa-times');
bronzeplan_ul_li_5_icon.setAttribute('class','fas fa-times');
bronzeplan_ul_li_6_icon.setAttribute('class','fas fa-times');

bronzeplan_ul_li_1.appendChild(bronzeplan_ul_li_1_icon);
bronzeplan_ul_li_2.appendChild(bronzeplan_ul_li_2_icon);
bronzeplan_ul_li_3.appendChild(bronzeplan_ul_li_3_icon);
bronzeplan_ul_li_4.appendChild(bronzeplan_ul_li_4_icon);
bronzeplan_ul_li_5.appendChild(bronzeplan_ul_li_5_icon);
bronzeplan_ul_li_6.appendChild(bronzeplan_ul_li_6_icon);

bronzeplan_ul.appendChild(bronzeplan_ul_li_1);
bronzeplan_ul.appendChild(bronzeplan_ul_li_2);
bronzeplan_ul.appendChild(bronzeplan_ul_li_3);
bronzeplan_ul.appendChild(bronzeplan_ul_li_4);
bronzeplan_ul.appendChild(bronzeplan_ul_li_6);
bronzeplan_ul.appendChild(bronzeplan_ul_li_5);

bronzeplan.appendChild(bronzeplan_p_heading);
bronzeplan.appendChild(bronzeplan_ul);

var silverplan_p_heading = document.createElement('p');
silverplan_p_heading.setAttribute('class','heading');
silverplan_p_heading.innerText = 'Silver Plan';

var silverplan_ul = document.createElement('ul');
var silverplan_ul_li_1 = document.createElement('li');
var silverplan_ul_li_2 = document.createElement('li');
var silverplan_ul_li_3 = document.createElement('li');
var silverplan_ul_li_4 = document.createElement('li');
var silverplan_ul_li_5 = document.createElement('li');
var silverplan_ul_li_6 = document.createElement('li');

var silverplan_ul_li_1_icon = document.createElement('i');
var silverplan_ul_li_2_icon = document.createElement('i');
var silverplan_ul_li_3_icon = document.createElement('i');
var silverplan_ul_li_4_icon = document.createElement('i');
var silverplan_ul_li_5_icon = document.createElement('i');
var silverplan_ul_li_6_icon = document.createElement('i');

silverplan_ul_li_1.innerText = 'Access to element creator. (1 Month) ';
silverplan_ul_li_2.innerText = 'Save upto 75 items in storage. ';
silverplan_ul_li_3.innerText = 'Ability to open support tickets. ';
silverplan_ul_li_4.innerText = 'Access to element animator. (1 Month) ';
silverplan_ul_li_5.innerText = 'Ability to use premium ready made animations. ';
silverplan_ul_li_6.innerText = 'Save maxium 15 animations a day. ';

silverplan_ul_li_1_icon.setAttribute('class','fas fa-check');
silverplan_ul_li_2_icon.setAttribute('class','fas fa-check');
silverplan_ul_li_3_icon.setAttribute('class','fas fa-check');
silverplan_ul_li_4_icon.setAttribute('class','fas fa-check');
silverplan_ul_li_5_icon.setAttribute('class','fas fa-times');
silverplan_ul_li_6_icon.setAttribute('class','fas fa-check');

silverplan_ul_li_1.appendChild(silverplan_ul_li_1_icon);
silverplan_ul_li_2.appendChild(silverplan_ul_li_2_icon);
silverplan_ul_li_3.appendChild(silverplan_ul_li_3_icon);
silverplan_ul_li_4.appendChild(silverplan_ul_li_4_icon);
silverplan_ul_li_5.appendChild(silverplan_ul_li_5_icon);
silverplan_ul_li_6.appendChild(silverplan_ul_li_6_icon);

silverplan_ul.appendChild(silverplan_ul_li_1);
silverplan_ul.appendChild(silverplan_ul_li_2);
silverplan_ul.appendChild(silverplan_ul_li_3);
silverplan_ul.appendChild(silverplan_ul_li_4);
silverplan_ul.appendChild(silverplan_ul_li_6);
silverplan_ul.appendChild(silverplan_ul_li_5);

silverplan.appendChild(silverplan_p_heading);
silverplan.appendChild(silverplan_ul);

var goldplan_p_heading = document.createElement('p');
goldplan_p_heading.setAttribute('class','heading');
goldplan_p_heading.innerText = 'Gold Plan';

var goldplan_ul = document.createElement('ul');
var goldplan_ul_li_1 = document.createElement('li');
var goldplan_ul_li_2 = document.createElement('li');
var goldplan_ul_li_3 = document.createElement('li');
var goldplan_ul_li_4 = document.createElement('li');
var goldplan_ul_li_5 = document.createElement('li');
var goldplan_ul_li_6 = document.createElement('li');

var goldplan_ul_li_1_icon = document.createElement('i');
var goldplan_ul_li_2_icon = document.createElement('i');
var goldplan_ul_li_3_icon = document.createElement('i');
var goldplan_ul_li_4_icon = document.createElement('i');
var goldplan_ul_li_5_icon = document.createElement('i');
var goldplan_ul_li_6_icon = document.createElement('i');

goldplan_ul_li_1.innerText = 'Access to element creator. (1 Month) ';
goldplan_ul_li_2.innerText = 'Save upto 150 items in storage. ';
goldplan_ul_li_3.innerText = 'Ability to open support tickets. ';
goldplan_ul_li_4.innerText = 'Access to element animator. (1 Month) ';
goldplan_ul_li_5.innerText = 'Ability to use premium ready made animations. ';
goldplan_ul_li_6.innerText = 'Save 50 animations a day. ';

goldplan_ul_li_1_icon.setAttribute('class','fas fa-check');
goldplan_ul_li_2_icon.setAttribute('class','fas fa-check');
goldplan_ul_li_3_icon.setAttribute('class','fas fa-check');
goldplan_ul_li_4_icon.setAttribute('class','fas fa-check');
goldplan_ul_li_5_icon.setAttribute('class','fas fa-check');
goldplan_ul_li_6_icon.setAttribute('class','fas fa-check');

goldplan_ul_li_1.appendChild(goldplan_ul_li_1_icon);
goldplan_ul_li_2.appendChild(goldplan_ul_li_2_icon);
goldplan_ul_li_3.appendChild(goldplan_ul_li_3_icon);
goldplan_ul_li_4.appendChild(goldplan_ul_li_4_icon);
goldplan_ul_li_5.appendChild(goldplan_ul_li_5_icon);
goldplan_ul_li_6.appendChild(goldplan_ul_li_6_icon);

goldplan_ul.appendChild(goldplan_ul_li_1);
goldplan_ul.appendChild(goldplan_ul_li_2);
goldplan_ul.appendChild(goldplan_ul_li_3);
goldplan_ul.appendChild(goldplan_ul_li_4);
goldplan_ul.appendChild(goldplan_ul_li_6);
goldplan_ul.appendChild(goldplan_ul_li_5);

goldplan.appendChild(goldplan_p_heading);
goldplan.appendChild(goldplan_ul);

var diamondplan_p_heading = document.createElement('p');
diamondplan_p_heading.setAttribute('class','heading');
diamondplan_p_heading.innerText = 'Diamond Plan';

var diamondplan_ul = document.createElement('ul');
var diamondplan_ul_li_1 = document.createElement('li');
var diamondplan_ul_li_2 = document.createElement('li');
var diamondplan_ul_li_3 = document.createElement('li');
var diamondplan_ul_li_4 = document.createElement('li');
var diamondplan_ul_li_5 = document.createElement('li');
var diamondplan_ul_li_6 = document.createElement('li');

var diamondplan_ul_li_1_icon = document.createElement('i');
var diamondplan_ul_li_2_icon = document.createElement('i');
var diamondplan_ul_li_3_icon = document.createElement('i');
var diamondplan_ul_li_4_icon = document.createElement('i');
var diamondplan_ul_li_5_icon = document.createElement('i');
var diamondplan_ul_li_6_icon = document.createElement('i');

diamondplan_ul_li_1.innerText = 'Access to element creator. (3 Months) ';
diamondplan_ul_li_2.innerText = 'Save upto 1000 items in storage. ';
diamondplan_ul_li_3.innerText = 'Ability to open support tickets. ';
diamondplan_ul_li_4.innerText = 'Access to element animator. (3 Months) ';
diamondplan_ul_li_5.innerText = 'Ability to use premium ready made animations. ';
diamondplan_ul_li_6.innerText = 'Save maxium 100 animations a day. ';

diamondplan_ul_li_1_icon.setAttribute('class','fas fa-check');
diamondplan_ul_li_2_icon.setAttribute('class','fas fa-check');
diamondplan_ul_li_3_icon.setAttribute('class','fas fa-check');
diamondplan_ul_li_4_icon.setAttribute('class','fas fa-check');
diamondplan_ul_li_5_icon.setAttribute('class','fas fa-check');
diamondplan_ul_li_6_icon.setAttribute('class','fas fa-check');

diamondplan_ul_li_1.appendChild(diamondplan_ul_li_1_icon);
diamondplan_ul_li_2.appendChild(diamondplan_ul_li_2_icon);
diamondplan_ul_li_3.appendChild(diamondplan_ul_li_3_icon);
diamondplan_ul_li_4.appendChild(diamondplan_ul_li_4_icon);
diamondplan_ul_li_5.appendChild(diamondplan_ul_li_5_icon);
diamondplan_ul_li_6.appendChild(diamondplan_ul_li_6_icon);

diamondplan_ul.appendChild(diamondplan_ul_li_1);
diamondplan_ul.appendChild(diamondplan_ul_li_2);
diamondplan_ul.appendChild(diamondplan_ul_li_3);
diamondplan_ul.appendChild(diamondplan_ul_li_4);
diamondplan_ul.appendChild(diamondplan_ul_li_6);
diamondplan_ul.appendChild(diamondplan_ul_li_5);

diamondplan.appendChild(diamondplan_p_heading);
diamondplan.appendChild(diamondplan_ul);

var ads_p = document.createElement('p');
ads_p.innerText = 'Upgrading to any plan will make your account ad free.';
ads_p.setAttribute('class','adfree');

var custombtn = document.createElement('button');
custombtn.innerText = 'Purchase Plan';
custombtn.addEventListener('click',function(){
  paypal_link($(document.getElementsByClassName('selectedplan')[0]).attr('data-plan'));
});

document.getElementById('upgp').appendChild(referralcode);

if(response.success.plan == 'Bronze'){
  silverplan.setAttribute('class','selectedplan');
  document.getElementById('upgp').appendChild(silverplan);
  document.getElementById('upgp').appendChild(goldplan);
  document.getElementById('upgp').appendChild(diamondplan);
}

if(response.success.plan == 'Silver'){
  goldplan.setAttribute('class','selectedplan');
  document.getElementById('upgp').appendChild(goldplan);
  document.getElementById('upgp').appendChild(diamondplan);
}

if(response.success.plan == 'Gold'){
  diamondplan.setAttribute('class','selectedplan');
  document.getElementById('upgp').appendChild(diamondplan);
}

if(response.success.plan == 'Diamond'){
  ads_p.innerText = 'You have upgraded your account to diamond plan already.';
  ads_p.style.fontSize = '20px';

  custombtn.addEventListener('click',function(){
    //console.log('upgraded to max already');
  });

  custombtn.style.display = 'none';
  custombtn.style.pointerEvents = 'none';
  referralcode.remove();
}

if(response.success.plan == 'Free'){
  bronzeplan.setAttribute('class','selectedplan');
  document.getElementById('upgp').appendChild(bronzeplan);
  document.getElementById('upgp').appendChild(silverplan);
  document.getElementById('upgp').appendChild(goldplan);
  document.getElementById('upgp').appendChild(diamondplan);
}

document.getElementById('upgp').appendChild(custombtn);
document.getElementById('upgp').appendChild(ads_p);

}

function paypal_link(p){

var payment = document.createElement('payment');

var payment_pp_i = document.createElement('i');
payment_pp_i.setAttribute('class','fab fa-paypal');

var payment_p = document.createElement('p');
payment_p.innerText = 'Creating your payment...';

payment.appendChild(payment_pp_i);
payment.appendChild(payment_p);
document.getElementsByTagName('body')[0].appendChild(payment);

setInterval(function(){updatePaymentStatus('Creating');},1000);

var referralcode = document.getElementsByClassName('refcode')[0];
var code = '';

if(referralcode.value.length == '8'){
  if(referralcode.style.pointerEvents == 'none'){
    code = referralcode.value;
  }
}

var token = localStorage.getItem('auth');

  $.ajax({
    url:'http://localhost:8000/api/me/payment/create',
    type:'post',
    dataType:'json',
    data:{'p':p, 'code':code},
    beforeSend: function(request){
      request.setRequestHeader('Authorization','Bearer '+token);
    },
    success: function(response){
      if(response.message == 'You have already used a referral code.'){
        notification('Error, '+response.message+' A user can only use one referral code.');
        payment.remove();
      }else{
        if(response.message.includes('https')){
          window.location.href = response.message;
        }
      }
    }
  });
}

function paypal_execute(payID,payerID,t,plan,ct,c){

var payment = document.createElement('payment');

var payment_pp_i = document.createElement('i');
payment_pp_i.setAttribute('class','fab fa-paypal');

var payment_p = document.createElement('p');
payment_p.innerText = 'Processing your payment...';

payment.appendChild(payment_pp_i);
payment.appendChild(payment_p);
document.getElementsByTagName('body')[0].appendChild(payment);

setInterval(function(){updatePaymentStatus('Processing');},1000);

if(ct == '' || ct == null || ct == ' ' || c == '' || c == null || c == ' '){
  ct = 'none';
  c = 'none';
}

var token = localStorage.getItem('auth');
var url = 'http://localhost:8000/api/me/payment/'+plan+'/'+ct+'/'+c+'/execute';

$.ajax({
    url:url,
    type:'post',
    dataType:'json',
    data:{'token':t,'payId':payID,'payerID':payerID},
    beforeSend: function(request){
      request.setRequestHeader('Authorization','Bearer '+token);
    },
    success: function(response){
      if(response.message == 'success'){
         window.location.href = 'https://www.cssstudio.co/profile/?p=t&pi='+response.data.si+'&pi2='+response.data.pi;
      }

      if(response.message == 'already executed.'){
        payment_p.innerText = 'Error occured while executing your payment. Please open a support ticket.';
        setTimeout(function(){
          window.location.href = 'https://www.cssstudio.co/profile/'
        },5000);
      }
    }
  });

}

function paypal_sale(pid,pid2){

var payment = document.createElement('payment');

var payment_pp_i = document.createElement('i');
payment_pp_i.setAttribute('class','fab fa-paypal');

var payment_p = document.createElement('p');
payment_p.innerText = 'Checking your payment...';

payment.appendChild(payment_pp_i);
payment.appendChild(payment_p);
document.getElementsByTagName('body')[0].appendChild(payment);

setInterval(function(){updatePaymentStatus('Checking');},1000);

var token = localStorage.getItem('auth');

$.ajax({
    url:'http://localhost:8000/api/me/payment/info',
    type:'post',
    dataType:'json',
    data:{'id':pid},
    beforeSend: function(request){
      request.setRequestHeader('Authorization','Bearer '+token);
    },
    success: function(response){
      //console.log(response.status);
      if(response.status == 'completed'){
        verifyPayment(pid,pid2);
      }

      if(response.status == 'error'){
        payment_p.innerText = 'An error has occured while checking your payment , please open a support ticket.';
        setTimeout(function(){
          window.location.href = 'https://www.cssstudio.co/profile/'
        },5000);
      }
    }
  });
}

function verifyPayment(pid,pid2){

var payment_p = document.getElementsByTagName('payment')[0].getElementsByTagName('p')[0];

var token = localStorage.getItem('auth');

$.ajax({
    url:'http://localhost:8000/api/me/payment/verify',
    type:'post',
    dataType:'json',
    data:{'sid':pid,'pid':pid2},
    beforeSend: function(request){
      request.setRequestHeader('Authorization','Bearer '+token);
    },
    success: function(response){
      if(response.message == 'verified'){
        payment_p.innerText = 'Your account has been successfully upgraded. Refreshing...';
        setTimeout(function(){
          window.location.href = 'https://www.cssstudio.co/profile/'
        },5000);
      }

      if(response.message == 'not verified, error'){
        payment_p.innerText = 'An error has occured while verifying your payment , please open a support ticket.';
        setTimeout(function(){
          window.location.href = 'https://www.cssstudio.co/profile/'
        },5000);
      }
    }
  });

}

function update(){
  var textinputs = document.getElementsByTagName('textinput');
  var email = textinputs[0].getElementsByTagName('input')[0].value;
  var password = textinputs[3].getElementsByTagName('input')[0].value;
  var phone = textinputs[1].getElementsByTagName('input')[0].value;
  var username = textinputs[2].getElementsByTagName('input')[0].value;

  var token = localStorage.getItem("auth");

  $.ajax({
        url:'http://localhost:8000/api/me/profile/update',
        type:'POST',
        dataType:'json',
        data:{'email':email,'password':password,'phone':phone,'username':username},
        beforeSend: function(request){
            request.setRequestHeader('Authorization','Bearer '+token);
        },
        success: function(response){
          if(response.message == 'Sent confirmation mail.'){
            notification('Confirmation mail sent successfully , Please check your email.');
          }
        },
        error: function(response){
          notification('An error occured, please try again later.');
        }
  });
}

function ip(){
	$.ajax({
		url:'https://api.ipify.org/?format=json',
		type:'get',
		success: country,
	});
}

function country(response){

var ip = response.ip;
var token = localStorage.getItem('auth');

$.ajax({
	url:'http://localhost:8000/api/ip/'+ip,
	type:'get',
  beforeSend: function(request){
    request.setRequestHeader('Authorization','Bearer '+token);
  },
	success: function(r){
		 var basic = document.getElementsByTagName('profilebox')[0];
         var countryflag = document.createElement('img');
         countryflag.setAttribute('class','cflag');
         countryflag.src = JSON.parse(r).location.country_flag;
         basic.appendChild(countryflag);
	},
});

}

function switchProfileTab(e){

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

function logout(){
  localStorage.removeItem('auth');
  window.location.href = '../home/';
}

function notification(text){

var notification = document.createElement('notification');
var notification_heading = document.createElement('p');
notification_heading.setAttribute('class','heading');
var notification_message = document.createElement('p');
notification_message.setAttribute('class','message');
notification_message.innerText = text;

if(text.includes('saved') || text.includes('Saved')){
  notification_heading.innerText = 'Saved';
  notification_heading.style.color = 'Green';
  notification.style.border = '2px solid Green';
}

if(text.includes('successfully') || ('Successfully')){
  notification_heading.innerText = 'Successfully';
  notification_heading.style.color = 'Green';
  notification.style.border = '2px solid Green';
}

if(text.includes('error') || text.includes('Error')){
  notification_heading.innerText = 'Error';
  notification_heading.style.color = 'DarkRed';
  notification.style.border = '2px solid DarkRed';
}

notification.appendChild(notification_heading);
notification.appendChild(notification_message);

notification.addEventListener('click',function(){
  this.remove();
});

$('body').append(notification);

}

function getIpFlag(ip,imageElement){
  var token = localStorage.getItem('auth');

  $.ajax({
    url:'http://localhost:8000/api/ip/'+ip,
    type:'get',
    beforeSend: function(request){
      request.setRequestHeader('Authorization','Bearer '+token);
    },
    success: function(response){
           var url = JSON.parse(response).location.country_flag;
           attachflagToIp(imageElement,url);
    },
  });
}

function attachflagToIp(imageElement,flagUrl){

imageElement.src = flagUrl;

}

function notification(text){

var notification = document.createElement('notification');
var notification_heading = document.createElement('p');
notification_heading.setAttribute('class','heading');
var notification_message = document.createElement('p');
notification_message.setAttribute('class','message');
notification_message.innerText = text;

if(text.includes('saved') || text.includes('Saved')){
  notification_heading.innerText = 'Saved';
  notification_heading.style.color = 'Green';
  notification.style.border = '2px solid Green';
}

if(text.includes('successfully') || ('Successfully')){
  notification_heading.innerText = 'Success';
  notification_heading.style.color = 'Green';
  notification.style.border = '2px solid Green';
}

if(text.includes('error') || text.includes('Error')){
  notification_heading.innerText = 'Error';
  notification_heading.style.color = 'DarkRed';
  notification.style.border = '2px solid DarkRed';
}

notification.appendChild(notification_heading);
notification.appendChild(notification_message);

notification.addEventListener('click',function(){
  this.remove();
});

$('body').append(notification);

}

function deactivateacc(){

var token = localStorage.getItem("auth");
$.ajax({
        url:'http://localhost:8000/api/me/profile/deactivate',
        type:'GET',
        beforeSend: function(request) {
            request.setRequestHeader('Authorization', 'Bearer '+token);
            request.setRequestHeader('Accept', 'application/json');
        },
        success: function(response){
          notification('We have successfully sent you a deactivation confirm mail.Please check your email.');
        },
        error: function(response){
          notification('Error , please try again.');
        }
})

}

function notice(type,date){

var notice = document.createElement('notice');
var heading = document.createElement('p');
var message = document.createElement('p');
var close = document.createElement('i');

close.addEventListener('click',function(){
  $('#profileTabs').css({'opacity':'1','pointer-events':'unset'});
  //$('#upgp').css({'opacity':'1','pointer-events':'unset'});
  $('#ptHistory').css({'opacity':'1','pointer-events':'unset'});
  $('#ptGeneral').css({'opacity':'1','pointer-events':'unset'});
  notice.remove();
});

heading.setAttribute('class','heading');
message.setAttribute('class','message');
close.setAttribute('class','fas fa-times close');

if(type == 'plan-expired'){
  heading.innerText = 'Plan Expiry Notice';
  message.innerText = 'Dear user, your membership has expired on '+date+'. You have lost access to premium features. You can upgrade your account to continue using premium features.';
}

//notice.appendChild(close);
notice.appendChild(heading);
notice.appendChild(message);
document.getElementsByTagName('body')[0].appendChild(notice);

setTimeout(function(){
  $('#profileTabs').css({'opacity':'0.5','pointer-events':'none'});
  //$('#upgp').css({'opacity':'0.5','pointer-events':'none'});
  $('#ptHistory').css({'opacity':'0.5','pointer-events':'none'});
  $('#ptGeneral').css({'opacity':'0.5','pointer-events':'none'});
},1000);

}

function isMember(response){

if(moment(response.success.expires_at).isBefore(moment.utc().format('YYYY-MM-DD HH:mm:ss'))){
  return false;
}else{
  return true;
}

}

function checkReferralCode(code){

var referralcode = document.getElementsByClassName('refcode')[0];
referralcode.style.opacity = '0.5';
referralcode.style.pointerEvents = 'none';
referralcode.style.animation = 'refcode 1s ease-in-out infinite';

$.ajax({
    url:'http://localhost:8000/api/me/check/referralcode',
    type:'post',
    dataType:'json',
    data:{'code':code},
    beforeSend: function(request){
      request.setRequestHeader('Authorization','Bearer '+token);
    },
    success: function(response){
      if(response.message == 'Valid'){
        referralcode.style.opacity = '0.3';
        referralcode.style.pointerEvents = 'none';
        referralcode.style.animation = '';
        referralcode.style.border = '2px solid darkgreen';

        discountPrices();
      }else{
        if(response.message == 'Invalid'){
          referralcode.style.opacity = '1';
          referralcode.style.pointerEvents = 'unset';
          referralcode.style.animation = '';
          referralcode.style.border = '2px solid indianred';
        }else{
          if(response.message == 'You have already used a referral code.'){
            referralcode.style.opacity = '1';
            referralcode.style.pointerEvents = 'unset';
            referralcode.style.animation = '';
            referralcode.style.border = '2px solid indianred';
            notification('Error, '+response.message);
          }
        }
      }
    }
});

}

function discountPrices(){

var membershipplans = document.getElementsByTagName('membershipplan');

for(var i = 0; i < membershipplans.length; i++){
  var price = membershipplans[i].getElementsByTagName('span')[0];

  var discounted_price = document.createElement('span');

  if(price.innerText == '4.99 $'){
    discounted_price.innerText = '3.75 $';
  }

  if(price.innerText == '9.99 $'){
    discounted_price.innerText = '7.50 $';
  }

  if(price.innerText == '19.99 $'){
    discounted_price.innerText = '14.99 $';
  }

  if(price.innerText == '44.99 $'){
    discounted_price.innerText = '33.75 $';
  }

  discounted_price.style.top = '35px';
  discounted_price.style.background = 'darkgreen';
  discounted_price.style.textDecoration = 'none';

  price.style.background = 'darkred';
  price.style.textDecoration = 'line-through';

  membershipplans[i].appendChild(discounted_price);
}

}
