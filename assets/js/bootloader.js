import Globals from './globals.js';
import Loader from './misc/Loader.js';
import Api from './misc/Api.js';
import NotificationHandler from './misc/Notification.js';
import Randomizer from './misc/Randomizer.js';
import Elements from './misc/Elements.js';
import Components from './misc/Components.js';
import DraggableFactory from './misc/DraggableFactory.js';
import ResizeableFactory from './misc/ResizeableFactory.js';
import WindowHandler from './misc/WindowHandler.js';

window.onload = () => {
    window.globals = Globals;
    let pageName = new URL(window.location.href).pathname.split("/").filter(x => { return x.toString().trim() !== ""; }).pop();

    Globals.window.body = document.getElementsByTagName("body")[0];
    Globals.window.head = document.getElementsByTagName("head")[0];

    Globals.api = new Api(Globals.api.hostname, Globals.api.port);
    Globals.randomizer = new Randomizer;
    Globals.notificationHandler = new NotificationHandler;
    Globals.draggableFactory = new DraggableFactory;
    Globals.resizeableFactory = new ResizeableFactory;
    Globals.windowHandler = new WindowHandler;
    Globals.elements = new Elements;
    Globals.components = new Components;
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
            { name: "adminpanel", dataRoute: null, hasSidebar: false, loads: false },
            { name: "home.html", dataRoute: null, hasSidebar: false, loads: false },
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
                            if(Array.isArray(files.paths[i].ignore) && !files.paths[i].ignore.includes(src)){
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

                            if(type !== "icon"){
                                await new Promise((resolve, reject) => {
                                    file = Globals.elements.new({
                                        type: elementTag,
                                        parent: Globals.window.head,
                                        attributes: {
                                            type: encoding,
                                            href: type === "css" ? src : null,
                                            src: type === "css" ? null : src,
                                            rel
                                        },
                                        listeners: {
                                            load: () => { resolve(); }
                                        }
                                    });
                                });
                            }else{
                                file = Globals.elements.new({
                                    type: elementTag,
                                    parent: Globals.window.head,
                                    attributes: {
                                        type: encoding,
                                        sizes: type === "icon" ? "32x32" : null,
                                        href: type === "icon" || type === "css" ? src : null,
                                        rel
                                    }
                                });
                            }
                        }else{
                            file = Globals.elements.new({
                                type: type === "css" ? "style" : elementTag,
                                parent: Globals.window.head,
                                html: files.paths[i].src
                            });
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
        /*if(page){
            if(page.name == "adminpanel" || page.name == "home.html"){
                Globals.pageHandler = page.name == "adminpanel" ? new AdminPanelLoginHandler : new AdminPanelHandler;
                Globals.pageHandler.setup();
            }else{
                const response = page.dataRoute ? await Globals.api.request({ route: page.dataRoute, method: "get" }) : { success: false, data: null };
                const data = response && response.data ? response.data : null;

                if(response.success === true){
                    const isMember = response === null ? true : Globals.membershipHandler.checkIfIsMember(data.success.expires_at);
                    Globals.pageHandler = page.dataRoute === false ? new StaticPageHandler : pageName === "profile" ? new ProfileHandler(data.success) : pageName === "billing" ? new BillingHandler(data.success) : pageName === "notifications" ? new NotificationsHandler(data.success) : pageName === "storage" ? new StorageHandler(data.success) : pageName === "support" ? new SupportHandler(data.success) : pageName === "studio" ? new StudioHandler(data.success) : pageName === "blog" ? new BlogHandler(data.success) : pageName === "login" ? new LoginHandler(data.success) : null;

                    if(isMember === true && Globals.pageHandler){
                        //if(page.hasSidebar === true){ Globals.sideBar = new SideBar(pageName); }
                        Globals.pageHandler.setup();
                    }

                    self.loader.hide();
                }else{
                    if(pageName !== "login"){
                        //window.location.href = '../login/';
                    }
                }
            }
        }*/

        Globals.pageHandler = new StudioHandler({});
        await Globals.pageHandler.setup();
        self.loader.hide();
    }
}
