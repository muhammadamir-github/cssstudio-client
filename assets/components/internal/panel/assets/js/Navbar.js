class InternalPanelNavbar{
    constructor(config){
        this.config = config;
        this.hidden = false;
        this._element = null;

        this._build();
    }

    _build(){
        const self = this;
        self._element = Globals.elements.new({
            type: "div",
            parent: document.getElementById("panel"),
            id: "navbar",
            children: [
                ...(() => {
                    return self.config.options.map((option, i) => {
                        return {
                            type: "button",
                            text: option.name,
                            listeners: {
                                click: option.callback,
                            }
                        };
                    });
                })(),
            ]
        });

        Globals.window.body.addEventListener("mousemove", function(e){
            let navbarHeight = 50;
            let mouseY = e.clientY;

            mouseY <= navbarHeight ? self.show() : self.hide();
        });
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
        while (this._element.firstChild) {
            this._element.removeChild(this._element.firstChild);
        }

        for (let option of this.config.options){
            Globals.elements.new({
                type: "button",
                parent: this._element,
                text: option.name,
                listeners: {
                    click: option.callback,
                }
            });
        }
    }
}
