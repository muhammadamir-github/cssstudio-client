class InternalPanelElementPreviewer{
    constructor(config){
        this.config = config;
        this.hidden = false;
        this._element = null;
        this._previewElements = [];

        this._build();
    }

    _build(){
        const self = this;
        self._element = Globals.elements.new({
            type: "div",
            parent: document.getElementById("panel"),
            id: "element-previewer",
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

    reset(elementType){
        while (this._element.firstChild) {
            this._element.removeChild(this._element.firstChild);
        }

        let element = Globals.elements.new({
            type: this.config.options.find(x => (x.name === elementType)).tag,
            parent: this._element,
            text: `Preview ${elementType}`,
            listeners: {
                click: function(e){
                    e.preventDefault();
                    this.classList.toggle("selected-element");
                }
            }
        });

        let elementInfo = {
            element,
            _resizeDetails: {
                mouse: {
                    isDown: false,
                    x: 0,
                    y: 0,
                },
                height: element.getBoundingClientRect().height,
                width: element.getBoundingClientRect().width,
            }
        };

        Globals.resizeableFactory.new({
            element,
            detailsHolder: elementInfo._resizeDetails,
        });

        this._previewElements.push(elementInfo);
    }
}
