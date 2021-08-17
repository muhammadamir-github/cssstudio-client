$(document).ready(function (){

    if(localStorage.getItem("auth") === null) {
       window.location.href = '../login/';
    }else{
      token = localStorage.getItem("auth");
      $.ajax({
        url:'https://api.cssstudio.co/api/me/storage',
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
          window.location.href = '../login/';
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

  loadBaseStructure(response,'storage');

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

var animations = response.success.animations;
var elements = response.success.elements;

var heading = document.createElement('div');
heading.setAttribute('class','ph');
var heading_p = document.createElement('p');
heading_p.innerText = 'Storage';
heading.appendChild(heading_p);


var elements_div = document.createElement('div');
elements_div.setAttribute('id','eldiv');
var ellabel = document.createElement('span');
ellabel.setAttribute('class','alabel_new');
ellabel.innerText = 'Elements';
elements_div.appendChild(ellabel);

var animations_div = document.createElement('div');
animations_div.setAttribute('id','andiv');
var anlabel = document.createElement('span');
anlabel.setAttribute('class','alabel_new');
anlabel.innerText = 'Animations';
animations_div.appendChild(anlabel);



for(var i=0; i < elements.length; i++){
  var storagepreview = document.createElement('storagePreview');

  var css = document.createElement("input");
  css.setAttribute("type",'text');
  var style = elements[i].css;
  css.value = style;
  css.style.visible = 'false';
  css.style.pointerEvents = 'none';
  css.style.width = '1px';
  css.style.height = '1px';
  css.style.opacity = '0';
  css.style.left = '-500px';
  css.style.position = 'relative';
  storagepreview.appendChild(css);

  if(elements[i].type == 'paragraph'){
    var element = document.createElement('p');
  }else{
    var element = document.createElement(elements[i].type);
  }
  element.setAttribute('class',elements[i].name);
  element.style.transform = 'translate(-50%,-50%)';
  element.style.left = '50%';
  element.style.top = '50%';

  if(elements[i].type == 'button' || elements[i].type == 'input' || elements[i].type == 'heading'){
    element.style.width = '70%';
    element.style.height = '20%';
    element.innerText = 'Preview '+elements[i].type;
  }

  if(elements[i].type == 'image' || elements[i].type == 'video'){
    element.style.width = '45%';
    element.style.height = '45%';
    element.style.minWidth = '0%';
    element.style.minHeight = '0%';
  }

  if(elements[i].type == 'div'){
    element.style.width = '45%';
    element.style.height = '45%';
    element.innerText = 'Preview '+elements[i].type;
  }

  if(elements[i].type == 'paragraph' || elements[i].type == 'textarea'){
    element.style.width = '75%';
    element.style.height = '45%';
    element.innerText = 'Preview '+elements[i].type;
  }

  if(elements[i].type == 'textarea' || elements[i].type == 'input'){
    element.value = 'Preview ';+elements[i].name;
    element.innerText = 'Preview '+elements[i].type;
  }

  element.style.marginTop = '0px';
  element.style.animationDuration = '0s';

  storagepreview.appendChild(element);

  var label = document.createElement('span');
  label.setAttribute('class','alabel_new');
  label.innerText = elements[i].name;
  label.style.backgroundColor = '#1a1a1a';
  label.style.color = 'white';
  label.style.fontSize = '12px';
  label.style.borderRadius = '0px';
  label.style.height = '17px';
  label.style.bottom = '0px';
  label.style.width = '100%';
  storagepreview.appendChild(label);

  var p = document.createElement('p');
  p.setAttribute('class','ctc');
  p.innerText = 'Copy Css';
  p.addEventListener('click',function(){
    this.classList.add('ctca');
    this.parentElement.getElementsByTagName('input')[0].select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    setTimeout(function(){$('.ctca').removeClass('ctca');},1000);
  });
  storagepreview.appendChild(p);

  var eid = elements[i].id;
  var etype = elements[i].type;

  var deleteicon = document.createElement('i');
  deleteicon.setAttribute('class','fas fa-trash');
  
  (function(eid){
    deleteicon.addEventListener('click',function(){
      deleteElement('element',eid,this);
    });
  })(eid);

  var toggleanimationicon = document.createElement('i');
  toggleanimationicon.setAttribute('class','fas fa-toggle-off');
  toggleanimationicon.style.marginLeft = '25px';
  
  (function(eid,etype){
    toggleanimationicon.addEventListener('click',function(){
      stopAnimation('element',eid,etype,this);
    });
  })(eid,etype);

  storagepreview.appendChild(deleteicon);
  storagepreview.appendChild(toggleanimationicon);

  elements_div.appendChild(storagepreview);

  var stylesheet = document.createElement('style');
  stylesheet.innerText = elements[i].css;

  document.getElementsByTagName('head')[0].appendChild(stylesheet);
}

for(var i=0; i < animations.length; i++){
  var storagepreview = document.createElement('storagePreview');

  var animation = document.createElement('textarea');
  animation.setAttribute('readonly','');
  animation.innerText = animations[i].css;
  animation.style.resize = 'none';
  animation.style.height = '85%';
  animation.style.width = '100%';
  animation.style.marginTop = '10%';

  storagepreview.appendChild(animation);

  var label = document.createElement('span');
  label.setAttribute('class','alabel_new');
  label.innerText = animations[i].name;
  label.style.backgroundColor = '#1a1a1a';
  label.style.color = 'white';
  label.style.fontSize = '12px';
  label.style.borderRadius = '0px';
  label.style.height = '17px';
  label.style.bottom = '0px';
  label.style.width = '100%';
  storagepreview.appendChild(label);

  var aid = animations[i].id;

  var deleteicon = document.createElement('i');
  deleteicon.setAttribute('class','fas fa-trash');

  (function(aid){
    deleteicon.addEventListener('click',function(){
      deleteElement('animation',aid,this);
    });
  })(aid);

  storagepreview.appendChild(deleteicon);

  var p = document.createElement('p');
  p.setAttribute('class','ctc');
  p.innerText = 'Copy css';
  p.addEventListener('click',function(){
    this.classList.add('ctca');
    this.parentElement.getElementsByTagName('textarea')[0].select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();
    setTimeout(function(){$('.ctca').removeClass('ctca');},1000);
  });
  storagepreview.appendChild(p);

  animations_div.appendChild(storagepreview);

  var stylesheet = document.createElement('style');
  stylesheet.innerText = animations[i].css;

  document.getElementsByTagName('head')[0].appendChild(stylesheet);
}

$('body').append(heading);
$('body').append(elements_div);
$('body').append(animations_div);

}

function deleteElement(type,id,element){
  
  var data;

  if(type == 'animation'){
    data = {'a_id':id};
  }

  if(type == 'element'){
    data = {'e_id':id};
  }

  $.ajax({
    url:'https://api.cssstudio.co/api/me/'+type+'/delete',
    type:'POST',
    dataType:'json',
    data:data,
    beforeSend: function(request){
      request.setRequestHeader('Authorization','Bearer '+token);
      request.setRequestHeader('Accept','application/json');
    }, 
    success: function(response){
      notification(type+' deleted successfully.');
      element.parentNode.remove();
    },
  });
}

function stopAnimation(type,id,etype,element){
  var state = '';
  var duration = '';

  if($(element).attr('class').includes('off')){
    console.log('1');
    state = 'on';
    duration = '1s';
  }else{
    if($(element).attr('class').includes('on')){
      console.log('2');
      state = 'off';
      duration = '0s';
    }
  }

  if(type == 'element'){
    if(etype == 'paragraph'){
      element.parentNode.getElementsByTagName('p')[0].style.animationDuration = duration;
      element.setAttribute('class','fas fa-toggle-'+state);
    }else{
      if(etype == 'input'){
        element.parentNode.getElementsByTagName(etype)[1].style.animationDuration = duration;
        element.setAttribute('class','fas fa-toggle-'+state);
      }else{
        element.parentNode.getElementsByTagName(etype)[0].style.animationDuration = duration;
        element.setAttribute('class','fas fa-toggle-'+state);
      }
    }
  }

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
sidebar.innerHTML = '<ul><p>Account</p><li data-link='+'../profile/'+'><i class="fas fa-user-circle"></i> Profile</li><li data-link='+'../billing/'+'><i class="fas fa-credit-card"></i> Billing</li><li data-link='+'../notifications/'+'><i class="fas fa-bell"></i> Notifications</li><div class="ulLine"></div><p>Manage</p><li data-link='+'../studio/'+'><i class="fas fa-tools"></i> Workspace</li><li data-link='+'../storage/'+' style="color: white;"><i class="fas fa-archive"></i> Storage</li><li data-link='+'../support/'+'><i class="fas fa-life-ring"></i> Support</li><div class="ulLine"></div><li onclick="logout();"><i class="fas fa-sign-out-alt"></i> Logout</li><i class="fas fa-angle-left" id="openclose"></i></ul>';

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