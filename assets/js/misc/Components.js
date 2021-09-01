export default class Components{
    constructor(){
        this.dir = "../assets/components"; // Dir path of components relative to the file loading this components.js.
        this.loaded = [];
        this.created = [];
    }

    async new(options = {}){
        const self = this;
        if(options.name && options.parent){
            if(await self.isLoaded(options.name) === false){ await self.load(options.name); }

            let controllerClass = self.loaded.find(x => (x.name === options.name)).controller;
            let instance = new controllerClass(options.data); // Data related to component should be passed here

            let component_id = Globals.randomizer.id(100);
            await instance._init({
                // Data not related to component should be passed here
                elementType: options.elementType,
                parent: options.parent,
                before: options.before,
                prepend: options.prepend,
                component_id,
            });

            self.created.push({
                component_id,
                name: options.name,
                controller: instance
            });

            return instance.view._element;
        }
    }

    async isLoaded(name){
        return this.loaded.find(x => (x.name === name)) ? true : false;
    }

    async load(name){
        const self = this;

        let dirs = [
            name.startsWith("internal-") ? `${self.dir}/internal/${name.replace("internal-", "")}/` : `${self.dir}/${name}/`,
            name.startsWith("internal-") ? `${self.dir}/internal/${name.replace("internal-", "")}/assets/js/` : `${self.dir}/${name}/assets/js/`,
            name.startsWith("internal-") ? `${self.dir}/internal/${name.replace("internal-", "")}/assets/css/` : `${self.dir}/${name}/assets/css/`,
        ];

        let files = [];
        const jsRegex = /href="([^"]*.js")/g;
        const cssRegex = /href="([^"]*.css")/g;

        for (let dir of dirs){
            const res = await fetch(dir, { mode: 'no-cors', headers: { 'Content-Type': 'text/html;charset=UTF-8' }, }).then(response => {
                if(response.ok){
                    return response.text();
                }

                return null;
            });

            if(res){
                let currentDirFiles = [...(() => { let js = res.match(jsRegex); return js ? js : []; })(), ].concat([...(() => { let css = res.match(cssRegex); return css ? css : []; })(), ]).filter(x => (x ? true : false));

                if(currentDirFiles && Array.isArray(currentDirFiles)){
                    currentDirFiles = currentDirFiles.map(x => { return x.split("=")[1].replaceAll(/\\/g,"\\\\", '').replaceAll('"', ''); });
                }

                for (let file of currentDirFiles){
                    files.push(`${dir}${file}`);
                }
            }
        }

        if(files && Array.isArray(files)){
            for (let f of files){
                await new Promise((resolve, reject) => {
                    let file = Globals.elements.new({
                        type: f.endsWith(".js") ? "script" : "link",
                        parent: Globals.window.head,
                        attributes: {
                            type: f.endsWith(".js") ? "text/javascript" : "text/css",
                            src: f.endsWith(".js") ? f : null,
                            rel: f.endsWith(".css") ? "stylesheet" : null,
                            href: f.endsWith(".css") ? f : null,
                        },
                        listeners: {
                            load: function(){
                                if(f.includes("controller.js")){
                                    let className = name.split("-").map(x => (x.charAt(0).toUpperCase() + x.slice(1))).join("").toString();

                                    self.loaded.push({
                                        name,
                                        controller: eval(`${className}Controller`),
                                    });
                                }

                                resolve();
                            }
                        }
                    });
                });
            }
        }
    }
}
