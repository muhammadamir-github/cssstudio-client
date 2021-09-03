class InternalPanelToolBar{
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
            id: "toolbar",
            children: [
                ...(() => {
                    return self.config.options.map((option, i) => {
                        return {
                            type: "div",
                            attributes: {
                                "data-name": option.name,
                            },
                            listeners: {
                                click: option.callback,
                            },
                            children: [
                                ...(() => {
                                    return option.icon ? [{
                                        type: "i",
                                        classes: option.icon.split(" "),
                                    }] : [];
                                })(),
                            ]
                        };
                    });
                })(),
            ]
        });

        Globals.window.body.addEventListener("mousemove", function(e){
            let toolbarHeight = 50;
            let mouseY = e.clientY;

            if((mouseY <= toolbarHeight) && self.config.canShow() === true){
                self.show()
            }else{
                self.hide();
            }
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
                type: "div",
                parent: this._element,
                attributes: {
                    "data-name": option.name,
                },
                listeners: {
                    click: option.callback,
                },
                children: [
                    ...(() => {
                        return option.icon ? [{
                            type: "i",
                            classes: option.icon.split(" "),
                        }] : [];
                    })(),
                ]
            });
        }
    }
}
