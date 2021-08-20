import Globals from './globals.js';
import Loader from './loader.js';
import Api from './api.js';
import SideBar from './sidebar.js';
import NotificationHandler from './notification.js';
import MembershipHandler from './membership.js';

window.onload = () => {
    let pageName = new URL(window.location.href).pathname.split("/").filter(x => { return x.toString().trim() !== ""; }).pop();
    window.globals = Globals;

    Globals.window.body = document.getElementsByTagName("body")[0];
    Globals.window.head = document.getElementsByTagName("head")[0];

    Globals.api = new Api(Globals.api.hostname, Globals.api.port);
    Globals.notificationHandler = new NotificationHandler;
    Globals.membershipHandler = new MembershipHandler;
    Globals.bootLoader = new BootLoader("../assets");
    Globals.bootLoader.load(pageName);
};

class BootLoader{
    constructor(dir){
        this.dir = dir; // Dir path of assets relative to the file loading this bootloader.js.
        this.loader = new Loader(Globals.window.body);
    }

    async load(pageName){
        const self = this;
        self.loader.show();

        const files = Globals.files.find(x => (x.pageName === pageName));
        if(files && Array.isArray(files.paths)){
            for(var i=0; i<files.paths.length; i++){
                let type = files.paths[i].type;
                let elementTag = type === "css" || type === "icon" ? "link" : type === "js" ? "script" : type;
                let file = null;

                if(files.paths[i].isRaw === false){
                    let encoding = type === "js" ? "text/javascript" : type === "css" ? "text/css" : type === "icon" ? "image/png" : null;
                    let rel = type === "css" ? "stylesheet" : type === "icon" ? "icon" : null;
                    let folder = type === "icon" ? "images" : type;
                    let src = files.paths[i].isURL === true ? files.paths[i].src : (pageName === "termsandconditions" ? "../"+self.dir : self.dir)+"/"+folder+"/"+files.paths[i].src;

                    file = document.createElement(elementTag);
                    file.type = encoding;
                    file.rel = rel;

                    if(type === "icon"){
                        file.sizes = "32x32";
                    }

                    if(type === "icon" || type === "css"){
                        file.href = src;
                    }

                    file.src = src;

                    Globals.window.head.appendChild(file);

                    if(type !== "icon"){
                        await new Promise((resolve, reject) => {
                            file.addEventListener('load', function(){
                                console.log("loaded!");
                                resolve();
                            });
                        });
                    }
                }else{
                    file = document.createElement(type === "css" ? "style" : elementTag);
                    file.innerHTML = files.paths[i].src;

                    Globals.window.head.appendChild(file);
                }
            }
        }

        await self.checkIfLoggedIn(pageName);
    }

    async checkIfLoggedIn(pageName){
        const self = this;
        const route = pageName === "profile" || pageName === "studio" ? "me" : pageName === "billing" ? "me/payments" : pageName === "notifications" ? "me/notifications" : pageName === "storage" ? "me/storage" : pageName === "support" ? "me/tickets" : "";
        const response = await Globals.api.request({ route: route, method: "get" });
        //if(response.success === true){
        const isMember = Globals.membershipHandler.checkIfIsMember(response.data.success.expires_at);
        if(isMember === true){
            Globals.pageHandler = pageName === "profile" ? new ProfileHandler(response.data.success) : pageName === "billing" ? new BillingHandler(response.data.success) : pageName === "notifications" ? new NotificationsHandler(response.data.success) : pageName === "storage" ? new StorageHandler(response.data.success) : pageName === "support" ? new SupportHandler(response.data.success) : pageName === "studio" ? new StudioHandler(response.data.success) : null;
            Globals.paypalHandler = pageName === "profile" ? new PaypalHandler(response.data.success) : null;

            Globals.sideBar = new SideBar(pageName);
            Globals.pageHandler.setup();
        }else{
            Globals.pageHandler.planExpired();
        }

        self.loader.hide();
        /*}else{
        if(pageName !== "login"){
        window.location.href = '../login/';
    }
}*/
}
}
