$(document).ready(function (){

    if(localStorage.getItem("auth") === null) {
       window.location.href = '../login/';
    }else{
      token = localStorage.getItem("auth");
      $.ajax({
        url:'https://api.cssstudio.co/api/me/payments',
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
         // window.location.href = '../login/';
        }
      })
    }

});

function planExpired(response){
  document.getElementsByTagName('loader')[0].remove();
  var exatExpiry = moment(response.success.expires_at.substring(0,10)).format("dddd, MMMM Do YYYY");
  notice('plan-expired',exatExpiry);

  setTimeout(function(){
    window.location.href = '../profile/';
  },7500);

  document.getElementsByTagName('head')[0].innerHTML += '<link rel="stylesheet" type="text/css" href="../assets/css/notice.css">';

  //var upgradeplan = document.createElement('div');
  //upgradeplan.setAttribute('id','upgp');

  //document.getElementsByTagName('body')[0].appendChild(upgradeplan);

  //setUpPaypal(response);
  //document.getElementById('upgp').style.display = 'block';
  //document.getElementById('upgp').style.opacity = '1';
}

function loggedin(response){

  loadBaseStructure(response,'billing');

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

document.getElementsByTagName('loader')[0].remove();

var heading = document.createElement('div');
heading.setAttribute('class','ph');
var heading_p = document.createElement('p');
heading_p.innerText = 'Billing';
heading.appendChild(heading_p);

var p_totalspending_div = document.createElement('div');
p_totalspending_div.setAttribute('class','ts');

var p_totalspending = document.createElement('p');
p_totalspending.innerText = 'You have spent '+response.success.total_spending+'$ till now.';
p_totalspending_div.appendChild(p_totalspending);

var billinghistory = document.createElement('profilebox');
billinghistory.style.height = '1000px;';
billinghistory.style.minHeight = 'min-content';
//billinghistory.style.marginTop = '125px';

var billinghistoryHeading = document.createElement('h6');
billinghistoryHeading.innerText = 'Billing History';
billinghistoryHeading.style.top = '0px';

var table = document.createElement('table');
table.setAttribute('cellpadding','0');
table.setAttribute('cellspacing','0');
var tablehead = document.createElement('thead');
var tablehead_tr = document.createElement('tr');

var tablehead_th1 = document.createElement('th');
var tablehead_th2 = document.createElement('th');
tablehead_th2.style.borderRight = '1px solid rgb(241, 241, 241)';
var tablehead_th3 = document.createElement('th');
tablehead_th3.style.borderRight = '1px solid rgb(241, 241, 241)';
var tablehead_th4 = document.createElement('th');

tablehead_th1.innerText = 'Description';
tablehead_th1.style.width  = '50%';
tablehead_th2.innerText = 'Amount';
tablehead_th2.style.width  = '10%';
tablehead_th3.innerText = 'Method';
tablehead_th3.style.width  = '10%';
tablehead_th4.innerText = 'Date & Time';
tablehead_th4.style.width  = '30%';

tablehead_tr.appendChild(tablehead_th1);
tablehead_tr.appendChild(tablehead_th2);
tablehead_tr.appendChild(tablehead_th3);
tablehead_tr.appendChild(tablehead_th4);
tablehead.appendChild(tablehead_tr);
table.appendChild(tablehead);

var tablebody = document.createElement('tbody');

for(var i=0; i < response.success.payments.length; i++){
  var tr = document.createElement('tr');
  var th1 = document.createElement('td');
  var th2 = document.createElement('td');
  var th3 = document.createElement('td');
  var th4 = document.createElement('td');
  var th3icon = document.createElement('i');
  th3icon.style.fontSize = '30px';
  th1.innerText = 'Purchased ' + response.success.payments[i].product;
  th2.innerText = response.success.payments[i].amount + '$';
  
  if(response.success.payments[i].method == 'paypal'){
    th3icon.setAttribute('class','fab fa-paypal');
  } 
  
  if(response.success.payments[i].method == 'card'){
    th3icon.setAttribute('class','fab fa-cc-visa');

    var th3icon2 = document.createElement('i');
    th3icon2.setAttribute('class','fab fa-cc-mastercard');
    th3icon2.style.fontSize = '30px';
    th3icon.style.marginLeft = '5px';
    th3.appendChild(th3icon2);
  }   
  var datetimetext = moment.utc(response.success.payments[i].created_at).local().format("dddd, MMMM Do YYYY, h:mm:ss a");
  var datetimeobjmoment = moment.utc(response.success.payments[i].created_at);
  var now = moment.utc();
  th4.innerText =  moment(datetimeobjmoment).fromNow();
  tr.appendChild(th1);
  tr.appendChild(th2);
  tr.appendChild(th3);
  th3.appendChild(th3icon);
  tr.appendChild(th4);
  tablebody.appendChild(tr);
}

table.appendChild(tablebody);
billinghistory.appendChild(billinghistoryHeading);
billinghistory.appendChild(table);

$('body').append(heading);
$('body').append(p_totalspending_div);
$('body').append(billinghistory);

}

function logout(){
  localStorage.removeItem('auth');
  window.location.href = '../home/';
}

function isMember(response){

if(moment(response.success.expires_at).isBefore(moment.utc().format('YYYY-MM-DD HH:mm:ss'))){
  return false;
}else{
  return true;
}

}

function loadBaseStructure(response,page){

if(isMember(response)){

var sidebar = document.createElement('sidebar');
sidebar.innerHTML = '<ul><p>Account</p><li data-link='+'../profile/'+'><i class="fas fa-user-circle"></i> Profile</li><li data-link='+'../billing/'+' style="color: white;"><i class="fas fa-credit-card"></i> Billing</li><li data-link='+'../notifications/'+'><i class="fas fa-bell"></i> Notifications</li><div class="ulLine"></div><p>Manage</p><li data-link='+'../studio/'+'><i class="fas fa-tools"></i> Workspace</li><li data-link='+'../storage/'+'><i class="fas fa-archive"></i> Storage</li><li data-link='+'../support/'+'><i class="fas fa-life-ring"></i> Support</li><div class="ulLine"></div><li onclick="logout();"><i class="fas fa-sign-out-alt"></i> Logout</li><i class="fas fa-angle-left" id="openclose"></i></ul>';

if(page == 'profile'){
  var head = document.getElementsByTagName('head')[0];
  head.innerHTML += '<link rel="stylesheet" type="text/css" href="../assets/css/style.css"><link rel="stylesheet" type="text/css" href="../assets/css/notification.css"><link rel="stylesheet" type="text/css" href="../assets/css/r.css"><link rel="stylesheet" type="text/css" href="../assets/css/notice.css"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">';

  var profiletabs = document.createElement('div');
  profiletabs.setAttribute('id','profileTabs');
  profiletabs.innerHTML = '<ul><li style="color: #e67300;">General</li><li>History</li></ul>';

  document.getElementsByTagName('body')[0].appendChild(profiletabs);
}else{
  if(page == 'studio'){
    var head = document.getElementsByTagName('head')[0];
    head.innerHTML += '<link rel="stylesheet" type="text/css" href="../assets/css/billy.css"><link rel="stylesheet" type="text/css" href="../assets/css/style.css"><link rel="stylesheet" type="text/css" href="../assets/css/notification.css"><link rel="stylesheet" type="text/css" href="../assets/css/r.css"><link rel="stylesheet" type="text/css" href="../assets/css/notice.css"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">';
    
    //document.getElementsByTagName('body')[0].innerHTML += '<script src="../assets/js/giphy.js"></script><script src="../assets/js/billy.js"></script>';

    var callbilly = document.createElement('callbilly');
    var billyDiv = document.createElement('billy');
    
    var notesdiv = document.createElement('div');
    notesdiv.setAttribute('id','notes');
    
    billyDiv.innerHTML = '<tongue>Hey , how can i help you today?</tongue><orders><type data-panel-trigger="suggestion"><p>I would like to have a suggestion.</p><div class="billyspinner"></div></type><order class="suggestion"><p>Background Color</p></order><order class="suggestion"><p>Font Color</p></order></orders>';
    notesdiv.innerHTML = '<h6>We are sorry if you are facing any ux/ui problems.The software does not supports all small screen sizes.</h6><button id="ntsbtn">Okay</button>';
    
    document.getElementsByTagName('body')[0].appendChild(notesdiv);
    document.getElementsByTagName('body')[0].appendChild(callbilly);
    document.getElementsByTagName('body')[0].appendChild(billyDiv);
  }else{
    if(page == 'support'){
      var head = document.getElementsByTagName('head')[0];
      head.innerHTML += '<link rel="stylesheet" type="text/css" href="../assets/css/style.css"><link rel="stylesheet" type="text/css" href="../assets/css/notification.css"><link rel="stylesheet" type="text/css" href="../assets/css/r.css"><link rel="stylesheet" type="text/css" href="../assets/css/notice.css"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">';
    }else{
      if(page == 'storage'){
        var head = document.getElementsByTagName('head')[0];
        head.innerHTML += '<link rel="stylesheet" type="text/css" href="../assets/css/fonts.css"><link rel="stylesheet" type="text/css" href="../assets/css/style.css"><link rel="stylesheet" type="text/css" href="../assets/css/notification.css"><link rel="stylesheet" type="text/css" href="../assets/css/r.css"><link rel="stylesheet" type="text/css" href="../assets/css/notice.css"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">';
      }else{
        if(page == 'billing'){
          var head = document.getElementsByTagName('head')[0];
          head.innerHTML += '<link rel="stylesheet" type="text/css" href="../assets/css/style.css"><link rel="stylesheet" type="text/css" href="../assets/css/notification.css"><link rel="stylesheet" type="text/css" href="../assets/css/r.css"><link rel="stylesheet" type="text/css" href="../assets/css/notice.css"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">';
        }else{
          if(page == 'notifications'){
            var head = document.getElementsByTagName('head')[0];
            head.innerHTML += '<link rel="stylesheet" type="text/css" href="../assets/css/style.css"><link rel="stylesheet" type="text/css" href="../assets/css/notification.css"><link rel="stylesheet" type="text/css" href="../assets/css/r.css"><link rel="stylesheet" type="text/css" href="../assets/css/notice.css"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.6.3/css/all.css" integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/" crossorigin="anonymous">';
          }
        }
      }
    }
  }
}

document.getElementsByTagName('body')[0].appendChild(sidebar);

}else{
 window.location.href = '../login/';
}

}


function notice(type,plan,date){

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
  message.innerText = 'Dear user, your '+plan+' plan has expired on '+date+'. You have lost access to premium features. You can upgrade your account to continue using premium features.';
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
  message.innerText = 'Dear user, your membership has expired on '+date+'. You have lost access to premium features. You can upgrade your account to continue using premium features.'+'\n\n'+'Redirecting you to profile page...';
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