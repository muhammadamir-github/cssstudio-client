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
                {
                    type: "p",
                    text: "Getting things ready..."
                }
            ]
        });

        this.element = element;
    }

    hide(){
        this.element.remove();
        this.element = null;
    }
}
