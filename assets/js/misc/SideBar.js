import Globals from '../globals.js';

export default class SideBar{
    constructor(pageName){
        const self = this;
        self.pageName = pageName;
        self.sections = [
            {
                name: "Account",
                options: [
                    { name: "Profile", icon: "fas fa-user-circle", href: "../profile/" },
                    { name: "Billing", icon: "fas fa-credit-card", href: "../billing/" },
                    { name: "Notifications", icon: "fas fa-bell", href: "../notifications/" }
                ]
            },
            {
                name: "Manage",
                options: [
                    { name: "Studio", icon: "fas fa-tools", href: "../studio/" },
                    { name: "Storage", icon: "fas fa-archive", href: "../storage/" },
                    { name: "Support", icon: "fas fa-life-ring", href: "../support/" }
                ]
            },
            {
                name: null,
                options: [
                    { name: "Logout", icon: "fas fa-sign-out-alt", href: null }
                ]
            }
        ];

        self.element = Globals.elements.new({
            type: "sidebar",
            parent: Globals.window.body,
        });

        for(let i=0; i<self.sections.length; i++){
            let ul = Globals.elements.new({
                type: "ul",
                parent: self.element,
            });

            if(self.sections[i].name){
                let p = Globals.elements.new({
                    type: "p",
                    parent: ul,
                    text: self.sections[i].name
                });
            }

            for(let x=0; x<self.sections[i].options.length; x++){
                let li = Globals.elements.new({
                    type: "li",
                    parent: ul,
                    text: " "+self.sections[i].options[x].name,
                    style: self.pageName.toLowerCase() === self.sections[i].options[x].name.toLowerCase() ? { color: "white" } : null,
                    attributes: self.sections[i].options[x].href ? { "data-link": self.sections[i].options[x].href } : null,
                    listeners: {
                        click: self.sections[i].options[x].name.toLowerCase() === "logout" ? () => { Globals.pageHandler.logout(); } : (e) => { window.location.href = $(e.target).attr('data-link'); }
                    }
                });

                let icon = Globals.elements.new({
                    type: "i",
                    parent: li,
                    classes: [...self.sections[i].options[x].icon.split(" ")],
                    prepend: true
                });
            }

            if(self.sections.length-1 !== i){
                let line = Globals.elements.new({
                    type: "div",
                    parent: ul,
                    classes: [ "ulLine" ]
                });
            }else{
                let openclose = Globals.elements.new({
                    type: "i",
                    parent: self.element,
                    classes: [ "fas", "fa-angle-left" ],
                    id: "openclose",
                    listeners: {
                        click: function(){
                            self.toggle();
                        }
                    }
                });
            }
        }
    }

    toggle(){
        const self = this;
        if(self.element.style.left == '0px'){
            self.close();
        }else{
            self.open();
        }
    }

    open(){
        const self = this;
        self.element.style.left = '0px';

        $('.ulLine').css({'display':'block'});
        document.getElementById("openclose").setAttribute('class','fas fa-angle-left');
    }

    close(){
        const self = this;
        self.element.style.left = '-170px';

        setTimeout(function(){ $('.ulLine').css({'display':'none'}); },500);
        document.getElementById("openclose").setAttribute('class','fas fa-angle-right');
    }
}
