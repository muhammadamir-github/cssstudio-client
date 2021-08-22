class Elements{
    constructor(){}

    new(options = {}){
        const self = this;
        if(options.type && options.parent){
            var element = new Element({ type: options.type, parent: options.parent });
            element.build();
            element.addAttributes(options.attributes);
            element.addClasses(options.classes);
            element.addListeners(options.listeners);

            return element;
        }
    }
}

class Element{
    constructor(options){
        this.type = options.type;
        this.parent = options.parent;
        this.ref = null;
    }

    build(){
        this.ref = document.createElement(this.type);
        this.parent.appendChild(this.ref);
    }

    remove(){
        this.ref.remove();
        this.ref = null;
    }

    hide(){
        this.addAttributes([{ name: "data-internal[style.display]", value: this.ref.style.display }]);
        this.ref.style.display = "none";
    }

    show(){
        let attributes = this.ref.getAttributes([ "data-internal[style.display]" ]);
        this.ref.style.display = attributes["data-internal[style.display]"] ? attributes["data-internal[style.display]"] : "block";
    }

    addAttributes(attributes = []){
        if(attributes && Array.isArray(attributes)){
            for(var i=0; i<attributes.length; i++){
                this.ref.setAttribute(attributes[i].name, attributes[i].value);
            }
        }
    }

    getAttributes(attributes = []){
        const self = this;
        var toReturn = {};

        if(attributes && Array.isArray(attributes)){
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
        if(attributes && Array.isArray(attributes)){
            for(var i=0; i<attributes.length; i++){
                this.ref.removeAttribute(attributes[i]);
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

    getClasses(){
        return this.ref.classList;
    }

    removeClasses(classes = []){
        if(classes && Array.isArray(classes)){
            for(var i=0; i<classes.length; i++){
                if(this.ref.classList.contains(classes[i]){
                  this.ref.classList.remove(classes[i]);
                }
            }
        }
    }

    toggleClasses(classes = []){
        if(classes && Array.isArray(classes)){
            for(var i=0; i<classes.length; i++){
                this.ref.classList.toggle(classes[i]);
            }
        }
    }

    addListeners(listeners = []){
        if(listeners && Array.isArray(listeners)){
            for(var i=0; i<listeners.length; i++){
                this.ref.addEventListener(listeners[i].event, listeners[i].callback);
            }
        }
    }
}
