export default class Loader{
    constructor(parent){
        this.parent = parent;
    }

    show(){
        let element = document.createElement("loader");
        let elementView = document.createElement("view");
        let elementPara = document.createElement("p");
        elementPara.innerText = "Getting things ready...";
        element.appendChild(elementView);
        element.appendChild(elementPara);
        this.parent.appendChild(element);
        this.element = element;
    }

    hide(){
        this.element.remove();
        this.element = null;
    }
}
