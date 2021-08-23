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
        var notice = Globals.elements.new({
            type: "notice",
            parent: Globals.window.body,
            children: [
                {
                    type: "p",
                    classes: [ "heading" ],
                    text: type == 'plan-expired' ? "Plan Expiry Notice" : null,
                },
                {
                    type: "p",
                    classes: [ "message" ],
                    text: type == 'plan-expired' ? `Dear user, your membership has expired on '${date}'. You have lost access to premium features. You can upgrade your account to continue using premium features.` : null,
                },
                {
                    type : "i",
                    classes: [ "fas fa-times close" ],
                    listeners: {
                        click: () => {
                            $('#profileTabs').css({'opacity':'1','pointer-events':'unset'});
                            //$('#upgp').css({'opacity':'1','pointer-events':'unset'});
                            $('#ptHistory').css({'opacity':'1','pointer-events':'unset'});
                            $('#ptGeneral').css({'opacity':'1','pointer-events':'unset'});
                            notice.remove();
                        }
                    }
                }
            ]
        });

        setTimeout(function(){
            $('#profileTabs').css({'opacity':'0.5','pointer-events':'none'});
            //$('#upgp').css({'opacity':'0.5','pointer-events':'none'});
            $('#ptHistory').css({'opacity':'0.5','pointer-events':'none'});
            $('#ptGeneral').css({'opacity':'0.5','pointer-events':'none'});
        },1000);
    }
}
