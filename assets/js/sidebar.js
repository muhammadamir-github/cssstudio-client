import Globals from './globals.js';

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

        self.element = document.createElement('sidebar');

        for(let i=0; i<self.sections.length; i++){
            let ul = document.createElement("ul");

            if(self.sections[i].name){
                let p = document.createElement("p");
                p.innerText = self.sections[i].name;

                ul.appendChild(p);
            }

            for(let x=0; x<self.sections[i].options.length; x++){
                let li = document.createElement("li");

                if(self.sections[i].options[x].name.toLowerCase() === "logout"){
                    li.addEventListener('click',function(){
                        Globals.pageHandler.logout();
                    });
                }else{
                    li.addEventListener('click',function(){
                        window.location.href = $(this).attr('data-link');
                    });
                }

                if(self.sections[i].options[x].href){
                    li.setAttribute("data-link", self.sections[i].options[x].href);
                }

                li.innerText = " "+self.sections[i].options[x].name;
                if(self.pageName.toLowerCase() === self.sections[i].options[x].name.toLowerCase()){
                    li.style.color = "white";
                }

                let icon = document.createElement("i");
                icon.className = self.sections[i].options[x].icon;

                li.prepend(icon);
                ul.appendChild(li);
            }

            self.element.appendChild(ul);

            if(self.sections.length-1 !== i){
                let line = document.createElement("div");
                line.className = "ulLine";

                ul.appendChild(line);
            }else{
                let openclose = document.createElement("i");
                openclose.className = "fas fa-angle-left";
                openclose.id = "openclose";

                openclose.addEventListener("click", function(){
                    self.toggle();
                });

                self.element.appendChild(openclose);
            }
        }

        Globals.window.body.appendChild(self.element);
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
