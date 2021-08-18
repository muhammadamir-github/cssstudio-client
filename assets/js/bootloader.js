import globals from './globals.js';

window.onload = () => {
    globals.window.body = document.getElementsByTagName("body")[0];
    globals.window.head = document.getElementsByTagName("head")[0];
    globals.bootLoader = new BootLoader("../assets");

    let pageName = new URL(window.location.href).pathname.split("/").filter(x => { return x.toString().trim() !== ""; }).pop();
    globals.bootLoader.load(pageName);
};

class BootLoader{
    constructor(dir){
        this.dir = dir; // Dir path of assets relative to the file loading this bootloader.js.
    }

    async load(pageName){
        const self = this;

        const files = globals.files.find(x => (x.pageName === pageName));
        if(files && Array.isArray(files.paths)){
            for(var i=0; i<files.paths.length; i++){
                let type = files.paths[i].type;
                let elementTag = type == "css" || type == "icon" ? "link" : type == "js" ? "script" : type;
                let file = null;

                if(files.paths[i].isRaw === false){
                    let encoding = type == "js" ? "text/javascript" : type == "css" ? "text/css" : type == "icon" ? "image/png" : null;
                    let rel = type == "css" ? "stylesheet" : type == "icon" ? "icon" : null;
                    let folder = type == "icon" ? "images" : type;
                    let src = files.paths[i].isURL === true ? files.paths[i].src : (pageName == "termsandconditions" ? "../"+self.dir : self.dir)+"/"+folder+"/"+files.paths[i].src;

                    file = document.createElement(elementTag);
                    file.type = encoding;
                    file.rel = rel;

                    if(type == "icon"){
                        file.sizes = "32x32";
                    }

                    if(type == "icon" || type == "css"){
                        file.href = src;
                    }

                    file.src = src;

                    globals.window.head.appendChild(file);

                    if(type !== "icon"){
                        await new Promise((resolve, reject) => {
                            file.addEventListener('load', function(){
                                console.log("loaded!");
                                resolve();
                            });
                        });
                    }
                }else{
                    file = document.createElement(type == "css" ? "style" : elementTag);
                    file.innerHTML = files.paths[i].src;

                    globals.window.head.appendChild(file);
                }
            }
        }
    }
}
