export default class Components{
    constructor(){
        this.dir = "../assets/components"; // Dir path of components relative to the file loading this components.js.
        this.loaded = [];
    }

    async new(options = {}){
        const self = this;
        if(options.name && options.parent){
            if(self.isLoaded(options.name) === false){
                await self.load(options.name);
            }

            let controllerClass = self.loaded.find(x => (x.name === options.name)).controller;
            let instance = new controllerClass(options.data); // Data related to component should be passed here

            await instance.init({
                // Data not related to component should be passed here
                elementType: options.elementType,
                parent: options.parent,
                before: options.before,
                prepend: options.prepend
            });

            return instance.view._element;
        }
    }

    isLoaded(name){
        return this.loaded.find(x => (x.name === name)) ? true : false;
    }

    async load(name){
        const self = this;
        const response = await fetch(`${self.dir}/${name}/`, { headers: { 'Content-Type': 'text/html;charset=UTF-8' }, }).then(response => { return response.text(); });

        const jsRegex = /href="([^"]*.js")/g;
        var allFilesInDir = response.match(jsRegex);

        if(allFilesInDir && Array.isArray(allFilesInDir)){
            allFilesInDir = allFilesInDir.map(x => { return x.split("=")[1].replaceAll(/\\/g,"\\\\", '').replaceAll('"', ''); });

            for(var x=0; x<allFilesInDir.length; x++){
                await new Promise((resolve, reject) => {
                    let file = Globals.elements.new({
                        type: "script",
                        parent: Globals.window.head,
                        attributes: {
                            type: "text/javascript",
                            src: `${self.dir}/${name}/${allFilesInDir[x]}`
                        },
                        listeners: {
                            load: function(){
                                if(allFilesInDir[x].includes("controller.js")){
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
