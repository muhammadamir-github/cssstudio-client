class InternalPanelElementPreviewer{
    constructor(config){
        this.config = config;
        this.hidden = false;
        this._element = null;
        this._previewElement = null;
        this._previewElementType = null; // Which type of element is being created. = this.config.options.name

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

        this._previewElement = Globals.elements.new({
            type: this.config.options.find(x => (x.name === elementType)).tag,
            parent: document.getElementById("element-previewer"),
            text: `Preview ${elementType}`,
            id: `preview${elementType.toLowerCase()}`,
            classes: [ "preview-element" ],
            attributes: elementType === "video" ? { controls: false } : null,
        });

        this._previewElementType = elementType;
        Globals.elementType = elementType;
    }
}
