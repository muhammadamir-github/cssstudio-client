class InternalPanelElementSelectionSidebar{
    constructor(config){
        this.config = config;
        this.hidden = true;
        this._element = null;

        this._build();
    }

    _build(){
        const self = this;
        self._element = Globals.elements.new({
            type: "div",
            parent: document.getElementById("panel"),
            id: "element-selection-sidebar",
            children: (() => {
                return self.config.options.map((option, i) => {
                    return {
                        type: "button",
                        text: option.name,
                        listeners: {
                            click: function(){
                                self.config.callback(option.name);
                                self.hide();
                            }
                        }
                    }
                });
            })(),
        });
    }

    show(){
        const self = this;
        self._element.style.right = "0px";
        self.hidden = false;

        setTimeout(() => {
            if(!self.hidden){
                self.hide();
            }
        }, 10000);
    }

    hide(){
        this._element.style.right = "-100%";
        this.hidden = true;
    }

    toggle(){
        this.hidden ? this.show() : this.hide();
    }
}
