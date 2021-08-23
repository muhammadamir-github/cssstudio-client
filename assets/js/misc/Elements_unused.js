export default class Elements{
    constructor(){}

    newFromDOM(domElement, parent = null){
        // Wraps a DOMElement into CSSStudioElement but without adding or updating anything else.
        const self = this;
        if(!(domElement instanceof CSSStudioElement) && domElement !== null && domElement !== undefined){
            domElement = new CSSStudioElement({
                type: domElement.tagName,
                parent: self.newFromDOM(parent ? parent : domElement.parentElement),
                ref: domElement
            });

            domElement.refreshChildren();
            return domElement;
        }else{ return domElement; }

        return null;
    }

    new(options = {}){
        // Wraps a DOMElement into CSSStudioElement.
        const self = this;
        if(options.type && options.parent){
            var parentElement = self.newFromDOM(options.parent);
            let element = new CSSStudioElement({
                type: options.type,
                parent: parentElement,
                ref: null
            });

            element.build();
            element.addAttributes(options.attributes); // {}
            element.addClasses(options.classes); // []
            element.addListeners(options.listeners); // {}
            element.updateId(options.id); // ""
            element.updateStyle(options.style); // {}
            element.updateText(options.text); // ""
            element.updateHtml(options.html); // ""
            element.addChildren(options.children); // [{}]
            element.refreshChildren();
            return element;
        }
    }

    getElementById(id){
        let domElement = document.getElementById(id);
        if(domElement){ return this.newFromDOM(domElement); }

        return null;
    }

    getElementsByTagName(tagName){
        let domElements = [...document.getElementsByTagName(tagName.toLowerCase())]; // HTMLCollection
        return domElements.map(x => { return this.newFromDOM(x); });
    }

    getElementsByClassName(className){
        let domElements = [...document.getElementsByClassName(className)]; // HTMLCollection
        return domElements.map(x => { return this.newFromDOM(x); });
    }
}

class CSSStudioElement{
    constructor(options){
        this.type = options.type.toLowerCase(); // tagName
        this.parent = options.parent; // Parent CSSStudioElement.
        this.ref = options.ref ? options.ref : null; // DOMElement for this CSSStudioElement.
        this.children = []; // Children DOMElements of this DOMElement each wrapped in CSSStudioElement.
    }

    build(){
        this.ref = document.createElement(this.type);
        this.parent.appendChildren([ this ]);
    }

    remove(){
        this.ref.remove();
        this.ref = null;
    }

    hide(){
        this.addAttributes({ "data-internal[style.display]": this.ref.style.display });
        this.ref.style.display = "none";
    }

    show(){
        let attributes = this.ref.getAttributes([ "data-internal[style.display]" ]);
        this.ref.style.display = attributes["data-internal[style.display]"] ? attributes["data-internal[style.display]"] : "block";
    }

    addAttributes(attributes = {}){
        if(typeof attributes === "object"){
            for(var i=0; i<Object.keys(attributes).length; i++){
                this.ref.setAttribute(Object.keys(attributes)[i], attributes[Object.keys(attributes)[i]]);
            }
        }
    }

    getAttributes(attributes = []){
        const self = this;
        var toReturn = {};

        if(attributes && Array.isArray(attributes) && attributes.length > 0){
            for(var i=0; i<attributes.length; i++){
                toReturn[attributes[i]] = self.ref.getAttribute(attributes[i]);
            }
        }else{
            for(var i=0; i<self.ref.attributes.length; i++){
                toReturn[self.ref.attributes[i].nodeName] = self.ref.attributes[i].nodeValue;
            }
        }

        return toReturn;
    }

    removeAttributes(attributes = []){
        const self = this;
        if(attributes && Array.isArray(attributes) && attributes.length > 0){
            for(var i=0; i<attributes.length; i++){
                self.ref.removeAttribute(attributes[i]);
            }
        }else{
            // If none specified, remove all.
            for(var i=0; i<self.ref.attributes.length; i++){
                self.ref.removeAttribute(self.ref.attributes[i].nodeName);
            }
        }
    }

    addClasses(classes = []){
        if(classes && Array.isArray(classes)){
            for(var i=0; i<classes.length; i++){
                this.ref.classList.add(classes[i]);
            }
        }
    }

    getClasses(){ return this.ref.classList; }

    removeClasses(classes = []){
        const self = this;
        if(classes && Array.isArray(classes) && classes.length > 0){
            for(var i=0; i<classes.length; i++){
                if(self.ref.classList.contains(classes[i])){
                  self.ref.classList.remove(classes[i]);
                }
            }
        }else{
            // If none specified, remove all.
            self.ref.className = "";
        }
    }

    toggleClasses(classes = []){
        if(classes && Array.isArray(classes)){
            for(var i=0; i<classes.length; i++){
                this.ref.classList.toggle(classes[i]);
            }
        }
    }

    addListeners(listeners = {}){
        if(typeof listeners === "object"){
            for(var i=0; i<Object.keys(listeners).length; i++){
                this.ref.addEventListener(Object.keys(listeners)[i], listeners[Object.keys(listeners)[i]]);
            }
        }
    }

    addEventListener(event, callback){
        this.addListeners({
            event: callback
        });
    }

    removeListeners(listeners = {}){
        const self = this;
        if(typeof listeners === "object" && Object.keys(listeners).length > 0){
            for(var i=0; i<Object.keys(listeners).length; i++){
                self.ref.addEventListener(Object.keys(listeners)[i], listeners[Object.keys(listeners)[i]]);
            }
        }else{
            // If none specified, remove all.
            self.ref.removeAllEventListeners();
        }
    }

    updateId(id){
        this.ref.id = id;
    }

    updateStyle(style = {}){
        if(typeof style === "object"){
            for(var i=0; i<Object.keys(style).length; i++){
                this.ref.style[Object.keys(style)[i]] = style[Object.keys(style)[i]];
            }
        }
    }

    isStyle(style = {}){
        const self = this;
        if(typeof style === "object"){
            for(var i=0; i<Object.keys(style).length; i++){
                if(self.ref.style[Object.keys(style)[i]] !== style[Object.keys(style)[i]]){
                    return false;
                }
            }
        }else{ return false; }

        return true;
    }

    addChildren(children = []){
        // Builds (appends) new elements to this by calling Elements.new foreach.
        const self = this;
        if(children && Array.isArray(children)){
            for(var i=0; i<children.length; i++){
                let element = Globals.elements.new({
                    type: children[i].type,
                    parent: self,
                    attributes: children[i].attributes,
                    classes: children[i].classes,
                    listeners: children[i].listeners,
                    style: children[i].style,
                    text: children[i].text,
                    html: children[i].html,
                    children: children[i].children
                });

                self.children.push(element);
            }
        }
    }

    refreshChildren(){
        // Syncs this.children[CSSStudioElement] with this.ref.children[DOMElement].
        const self = this;
        self.children = [];

        for(var i=0; i<self.ref.children.length; i++){
            self.children.push(Globals.elements.newFromDOM(self.ref.children[i], self));
        }
    }

    appendChildren(children = []){
        // Appends a DOMElement of a CSSStudioElement and pushes the CSSStudioElement to children[].
        const self = this;

        for(var i=0; i<children.length; i++){
            self.ref.appendChild(children[i].ref);
            self.children.push(children[i]);
        }
    }

    updateText(text = null){ text ? this.ref.innerText = text : false; }
    updateHtml(html = null){ html ? this.ref.innerHTML = html : false; }
    getElementById(id){ return this.children.find(x => (x.ref.id === id)); }
    getElementsByTagName(tagName){ return this.children.filter(x => (x.ref.tagName.toLowerCase() === tagName.toLowerCase())); }
    getElementsByClassName(className){ return this.children.filter(x => (x.ref.classList.contains(className))); }
    getBoundingClientRect(){ return this.ref.getBoundingClientRect(); }
}
