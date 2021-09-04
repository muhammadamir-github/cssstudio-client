export default class Loader{
    constructor(parent){
        this.parent = parent;
    }

    show(){
        let element = window.globals.elements.new({
            type: "loader",
            parent: this.parent,
            children: [
                { type: "view" },
            ]
        });

        this.element = element;
    }

    hide(){
        this.element.remove();
        this.element = null;
    }
}
