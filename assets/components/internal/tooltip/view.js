class InternalTooltipView{
    constructor(controller){
        this.controller = controller;
        this._element = null;
        this.hidden = true;
    }

    create(options = {}){
        const self = this;
        const { data, parent, prepend, before, component_id } = options;

        self._element = Globals.elements.new({
            type: "div",
            parent,
            style: data.style ? data.style : null,
            id: "tooltip",
            attributes: {
                "data-component-id": component_id,
            },
            children: [
                {
                    type: "p",
                    text: data.text,
                }
            ],
            before: before,
            prepend: prepend
        });
    }

    refresh(){
        const data = this.controller._getModelState();
        this._element.getElementsByTagName("p")[0].innerText = data.text;
    }

    show(element, text, position){
        this.controller._updateModelState({ text });
        this._element.style.display = "flex";
        this.hidden = false;

        Globals.draggableFactory.positionElementRelatively(this._element, element, position ? position : "centerBottom");
    }

    hide(){
        this._element.style.display = "none";
        this.hidden = true;
    }

    toggle(...args){
        this.hidden ? this.show(args) : this.hide();
    }
}
