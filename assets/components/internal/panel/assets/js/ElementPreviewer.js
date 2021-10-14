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
        let selected = document.getElementsByClassName("selected-element");
        let parent = selected[0] ? selected[0] : Array.isArray(this._previewElements) && this._previewElements.length > 0 ? this._previewElements[0].element : this._element;
        let element = Globals.elements.new({
            type: this.config.options.find(x => (x.name === elementType)).tag,
            parent: parent,
            text: `Preview ${elementType}`,
            classes: [ "selected-element" ],
            style: {
                "animation-duration": "1s",
                "animation-delay": "0s",
                "animation-timing-function": "linear",
                "animation-iteration-count": "infinite",
            },
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
        console.log(this._previewElements);
    }

    deleteChildElements(parentElement, recursrive = false){
        let parentElementId = parentElement.getAttribute("data-element-id") || "";
        let doesParentExists = this._previewElements.find(element => (element.element.getAttribute("data-element-id") === parentElementId));

        if(doesParentExists){
            let childElements = this._previewElements.filter(element => (element.element.parentElement.getAttribute("data-element-id") === parentElementId));
            for (let child of childElements){
                if(recursrive === true){
                    this.deleteChildElements(child.element, true);
                }

                this._previewElements = this._previewElements.filter(element => (element.element.getAttribute("data-element-id") !== child.element.getAttribute("data-element-id")));
                child.element.remove();
            }
        }
    }

    deleteElementByElementId(elementId = ""){
        let element = this._previewElements.find(element => (element.element.getAttribute("data-element-id") === elementId));
        if(element){
            this._previewElements = this._previewElements.filter(element => (element.element.getAttribute("data-element-id") !== elementId));
            element.element.remove();
        }
    }

    deleteSelectedElement(){
        let selectedElement = document.getElementsByClassName("selected-element")[0] || null;
        if(selectedElement){
            let elementCheck = this._previewElements.find(element => (element.element.getAttribute("data-element-id") === selectedElement.getAttribute("data-element-id")));
            if(elementCheck){
                this.deleteChildElements(selectedElement, true);
                this._previewElements = this._previewElements.filter(element => (element.element.getAttribute("data-element-id") !== selectedElement.getAttribute("data-element-id")));
                selectedElement.remove();
            }
        }
    }
}
