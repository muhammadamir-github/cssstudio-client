export default class MembershipHandler{
    constructor(){}

    checkIfIsMember(expires_at){
        if(moment(expires_at).isBefore(moment.utc().format('YYYY-MM-DD HH:mm:ss'))){
            return false;
        }else{
            return true;
        }
    }

    notice(type, date){
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
}
