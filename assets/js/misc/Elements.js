export default class Elements{
    constructor(){}

    new(options = {}){
        const self = this;
        if(options.type && options.parent){
            let element = document.createElement(options.type);

            self.addAttributes(element, options.attributes); // [{}]
            self.addClasses(element, options.classes); // []
            self.addListeners(element, options.listeners); // {}
            self.updateId(element, options.id); // ""
            self.updateStyle(element, options.style); // {}
            self.updateText(element, options.text); // ""
            self.updateHtml(element, options.html); // ""
            self.addChildren(element, options.children); // [{}]

            if(options.prepend === true){
                options.parent.prepend(element);
            }else{
                if(options.before === true){
                    options.parent.parentElement.insertBefore(element, options.parent);
                }else{
                    options.parent.appendChild(element);
                }
            }
            return element;
        }
    }

    addAttributes(element, attributes = {}){
        if(typeof attributes === "object" && attributes){
            for(var i=0; i<Object.keys(attributes).length; i++){
                if(attributes[Object.keys(attributes)[i]]){
                    element.setAttribute(Object.keys(attributes)[i], attributes[Object.keys(attributes)[i]]);
                }
            }
        }
    }

    addClasses(element, classes = []){
        if(classes && Array.isArray(classes)){
            for(var i=0; i<classes.length; i++){
                if(classes[i]){
                    element.classList.add(classes[i]);
                }
            }
        }
    }

    addListeners(element, listeners = {}){
        if(typeof listeners === "object" && listeners){
            for(var i=0; i<Object.keys(listeners).length; i++){
                if(listeners[Object.keys(listeners)[i]]){
                    element.addEventListener(Object.keys(listeners)[i], listeners[Object.keys(listeners)[i]]);
                }
            }
        }
    }

    updateId(element, id){
        id ? element.id = id : false;
    }

    updateStyle(element, style = {}){
        if(typeof style === "object" && style){
            for(var i=0; i<Object.keys(style).length; i++){
                if(style[Object.keys(style)[i]]){
                    element.style[Object.keys(style)[i]] = style[Object.keys(style)[i]];
                }
            }
        }
    }

    addChildren(element, children = []){
        const self = this;
        if(children && Array.isArray(children)){
            for(var i=0; i<children.length; i++){
                self.new({
                    parent: element,
                    ...children[i]
                });
            }
        }
    }

    updateText(element, text = null){ text ? element.innerText = text : false; }
    updateHtml(element, html = null){ html ? element.innerHTML = html : false; }
}
