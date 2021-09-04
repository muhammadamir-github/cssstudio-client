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

    reset(){
        this._previewElements.forEach((element, i) => {
            element.element.remove();
        });

        this._previewElements = [];
    }

    add(elementType){
        let element = Globals.elements.new({
            type: this.config.options.find(x => (x.name === elementType)).tag,
            parent: Array.isArray(this._previewElements) && this._previewElements.length > 0 ? this._previewElements[0].element : this._element,
            text: `Preview ${elementType}`,
            classes: [ "selected-element" ],
            listeners: {
                click: function(e){
                    e.stopPropagation();
                    e.preventDefault();
                    this.classList.toggle("selected-element");

                    let elementResizer = this.getElementsByClassName("eResizer");
                    if(elementResizer[0]){ this.classList.contains("selected-element") ? elementResizer[0].classList.add("eResizer-visible") : elementResizer[0].classList.remove("eResizer-visible"); }
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
