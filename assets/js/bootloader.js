import Globals from './globals.js';
import Loader from './misc/loader.js';
import Api from './misc/api.js';
import SideBar from './misc/sidebar.js';
import NotificationHandler from './misc/notification.js';
import MembershipHandler from './misc/membership.js';

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
        this.pages = [
            { name: "home", dataRoute: null, hasSidebar: false, loads: false },
            { name: "features", dataRoute: null, hasSidebar: false, loads: false },
            { name: "blog", dataRoute: "blogs", hasSidebar: false, loads: false },
            { name: "termsandconditions", dataRoute: null, hasSidebar: false, loads: false },
            { name: "login", dataRoute: "me", hasSidebar: false, loads: false },
            { name: "profile", dataRoute: "me", hasSidebar: true, loads: true },
            { name: "billing", dataRoute: "me/payments", hasSidebar: true, loads: true },
            { name: "notifications", dataRoute: "me/notifications", hasSidebar: true, loads: true },
            { name: "studio", dataRoute: "me", hasSidebar: true, loads: true },
            { name: "storage", dataRoute: "me/storage", hasSidebar: true, loads: true },
            { name: "support", dataRoute: "me/tickets", hasSidebar: true, loads: true }
        ];
    }

    async load(pageName){
        const self = this;
        const page = self.pages.find(x => (x.name === pageName));

        if(page){
            if(page.loads === true){ self.loader.show(); }

            const files = Globals.files.find(x => (x.pageName === pageName));
            if(files && Array.isArray(files.paths)){
                for(var i=0; i<files.paths.length; i++){
                    const type = files.paths[i].type;
                    const isURL = files.paths[i].isURL;
                    const isRaw = files.paths[i].isRaw;
                    const jsRegex = /href="([^"]*.js")/g;
                    const cssRegex = /href="([^"]*.css")/g;
                    const regex = type === "css" ? cssRegex : jsRegex;

                    if(files.paths[i].src.includes("*")){
                        const folder = (pageName === "termsandconditions" ? "../"+self.dir : self.dir)+"/"+type+"/"+files.paths[i].src.replace("*", "").toString();
                        const response = await fetch(folder, { headers: { 'Content-Type': 'text/html;charset=UTF-8' }, }).then(response => { return response.text(); });
                        var allFilesInDir = [];

                        if(type === "css" || type === "js"){ allFilesInDir = response.match(regex).map(x => { return x.split("=")[1].replaceAll(/\\/g,"\\\\", '').replaceAll('"', ''); }); }

                        for(var x=0; x<allFilesInDir.length; x++){
                            let src = `${files.paths[i].src.replace("*", "")}${allFilesInDir[x]}`;
                            if(!files.paths[i].ignore.includes(src)){
                                files.paths.push({ type, src, isURL, isRaw, });
                            }
                        }

                        files.paths[i] = null;
                    }
                }

                for(var i=0; i<files.paths.length; i++){
                    if(files.paths[i]){
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
            }

            await self.setupPage(pageName);
        }
    }

    async setupPage(pageName){
        const self = this;
        const page = self.pages.find(x => (x.name === pageName));
        if(page){
            const response = page.dataRoute ? await Globals.api.request({ route: page.dataRoute, method: "get" }) : null;
            const data = response && response.data ? response.data : null;

            if(response.success === true){
                const isMember = response === null ? true : Globals.membershipHandler.checkIfIsMember(data.success.expires_at);
                Globals.pageHandler = page.dataRoute === false ? new StaticPageHandler : pageName === "profile" ? new ProfileHandler(data.success) : pageName === "billing" ? new BillingHandler(data.success) : pageName === "notifications" ? new NotificationsHandler(data.success) : pageName === "storage" ? new StorageHandler(data.success) : pageName === "support" ? new SupportHandler(data.success) : pageName === "studio" ? new StudioHandler(data.success) : pageName === "blog" ? new BlogHandler(data.success) : pageName === "login" ? new LoginHandler(data.success) : null;

                if(isMember === true && Globals.pageHandler){
                    Globals.paypalHandler = pageName === "profile" ? new PaypalHandler(data.success) : null;

                    if(page.hasSidebar === true){ Globals.sideBar = new SideBar(pageName); }
                    Globals.pageHandler.setup();
                }else{
                    Globals.pageHandler.planExpired();
                }

                self.loader.hide();
            }else{
                if(pageName !== "login"){
                    window.location.href = '../login/';
                }
            }
        }
    }
}
