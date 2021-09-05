class InternalAnimatorView{
    constructor(controller){
        const self = this;

        self.controller = controller;
        self._element = null;
        this.hidden = true;
    }

    async create(options = {}){
        const self = this;
        const { data, parent, prepend, before, component_id } = options;

        self._element = Globals.elements.new({
            type: "div",
            parent,
            id: "animator",
            style: data.style ? data.style : null,
            attributes: {
                "data-component-id": component_id,
            },
            children: [
                {
                    type: "div",
                    id: "animator-container",
                    children: [
                        {
                            type: "div",
                            id: "animator-preview",
                        },
                        {
                            type: "div",
                            id: "animator-ready-made-animations",
                        },
                    ]
                },
                {
                    type: "div",
                    id: "animator-timeline",
                }
            ],
            before: before,
            prepend: prepend
        });

        /*self._elementSelectionSidebar = new InternalPanelElementSelectionSidebar({
            options: self.elementOptions,
            callback: self.newPreviewElement.bind(self),
        });*/
    }

    show(){
        this._element.style.display = "flex";
        this.hidden = false;
    }

    hide(){
        this._element.style.display = "none";
        this.hidden = true;
    }

    toggle(){
        this.hidden ? this.show() : this.hide();
    }

    reset(){

    }
}
