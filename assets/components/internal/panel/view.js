class InternalPanelView{
    constructor(controller){
        const self = this;

        self.controller = controller;
        self._element = null;
        self._elementSelectionSidebar = null;
        self._toolbar = null;
        self._styler = null;

        self.elementOptions = [
            { name: "Button", tag: "button", },
            { name: "Div", tag: "div", },
            { name: "Paragraph", tag: "p", },
            { name: "Heading", tag: "h3", },
            { name: "Text Input", tag: "input", },
            { name: "Textarea", tag: "textarea", },
            { name: "Image", tag: "img", },
            { name: "Video", tag: "video", },
        ];
        self.toolbarOptions = [
            { name: "New Element", icon: "fas fa-plus", callback: function(){ self._elementSelectionSidebar.toggle(); } },
            { name: "Reset", icon: "fas fa-undo", callback: function(){ self._elementPreviewer.reset(); } },
            { name: "Style Element", icon: "fas fa-paint-brush", callback: function(){ self._styler.toggle(); } },
        ];
    }

    async create(options = {}){
        const self = this;
        const { data, parent, prepend, before, component_id } = options;

        self._element = Globals.elements.new({
            type: "div",
            parent,
            id: data.id ? data.id : null,
            style: data.style ? data.style : null,
            attributes: {
                "data-component-id": component_id,
            },
            listeners: {
                click: function(event){
                    if(event.target.id == this.id || event.target.id == 'advance' || event.target.id == 'animate'){
                        document.getElementsByClassName('shapechangediv')[0].style.opacity = '0';
                        setTimeout(function(){
                            document.getElementsByClassName('shapechangediv')[0].style.display = 'none';
                        }, 1000);
                    }
                }
            },
            before: before,
            prepend: prepend
        });

        self._elementSelectionSidebar = new InternalPanelElementSelectionSidebar({
            options: self.elementOptions,
            callback: self.newPreviewElement.bind(self),
        });

        self._toolbar = new InternalPanelToolBar({
            options: self.toolbarOptions,
            canShow: () => { return self._elementSelectionSidebar.hidden; },
        });

        self._elementPreviewer = new InternalPanelElementPreviewer({
            options: self.elementOptions
        });

        self._styler = await Globals.components.new({ // Returns styler's HTML element
            name: "internal-styler",
            parent: Globals.window.body,
            data: {
                unit: "px",
            },
        });

        self._styler = await Globals.components.controller(self._styler); // Get styler's controller
    }

    newPreviewElement(elementType){
        const self = this;
        self._elementPreviewer.add(elementType);
        //self._toolbar.reset();
    }

    setEnvironment(element){
        const self = this;

        //$('#basicdiv').remove();
        //$('#rotatebox').remove();
        //$('#skewbox').remove();
        //$('#scalebox').remove();
        //$('#stepsdiv').remove();
        //$('#advance').remove();
        //$('#animate').remove();
        //$('giphy').remove();
    }
}
