class InternalStylerView{
    constructor(controller){
        this.controller = controller;
        this._element = null;

        this._dragDetails = {
            x: 0,
            y: 0,
            mouse: {
                x: 0,
                y: 0,
                isDown: false,
            },
        };
    }

    async create(options = {}){
        const self = this;
        const { data, parent, prepend, before, component_id } = options;

        self._element = Globals.elements.new({
            type: "div",
            parent,
            style: data.style ? data.style : null,
            id: "styler",
            attributes: {
                "data-component-id": component_id,
            },
            children: [
                {
                    type: "div",
                    classes: [ "banner" ],
                    children: [
                        {
                            type: "p",
                            text: "Styler"
                        },
                        {
                            type: "i",
                            classes: [ "fas", "fa-times" ],
                            listeners: {
                                click: function(){
                                    self.hide();
                                }
                            }
                        }
                    ]
                },
                {
                    type: "div",
                    classes: [ "combobox-container" ],
                    id: "styler-container"
                },
                {
                    type: "div",
                    id: "styler-settings",
                    children: [
                        {
                            type: "p",
                            text: "Unit: ",
                        },
                        {
                            type: "input",
                            attributes: {
                                type: "text",
                                placeholder: "% or px",
                                maxLength: "2",
                            },
                            listeners: {
                                input: function(){
                                    if(this.value == 'px'){
                                        self.controller._updateModelState({ unit: "px" });
                                        self.reset();
                                    }else{
                                        if(this.value == '%'){
                                            self.controller._updateModelState({ unit: "%" });
                                            self.reset();
                                        }
                                    }
                                }
                            }
                        },
                    ]
                }
            ],
            before: before,
            prepend: prepend
        });

        await Globals.draggableFactory.new({
            element: self._element,
            triggers: [
                self._element.getElementsByClassName("banner")[0]
            ],
            detailsHolder: self._dragDetails,
        });

        await this.loadComboboxes();

        this.show();
    }

    async show(){
        await this.syncComboboxes();
        this._element.style.display = "flex";
        this._element.style.left = ((window.innerWidth/2) - (this._element.getBoundingClientRect().width/2))+"px";
        this._element.style.top = ((window.innerHeight/2) - (this._element.getBoundingClientRect().height/2))+"px";
        this.hidden = false;
    }

    hide(){
        this._element.style.display = "none";
        this.hidden = true;
    }

    toggle(){
        this.hidden ? this.show() : this.hide();
    }

    async syncComboboxes(){
        let comboboxs = this._element.getElementsByClassName("combobox-container")[0].getElementsByTagName("combobox");
        await [...comboboxs].forEach(async (x) => {
            let controller = await Globals.components.controller(x);
            await controller.syncValue();
        });
    }

    async reset(){
        let comboboxs = this._element.getElementsByClassName("combobox-container")[0].getElementsByTagName("combobox");
        await [...comboboxs].forEach(async (x) => { x.remove(); });
        await this.loadComboboxes();
    }

    async loadComboboxes(){
        const self = this;
        let unit = this.controller._getModelState()["unit"];

        let comboboxs = [
            { text: "Width", colorPicker: false, customValue: true, options: [] },
            { text: "Height", colorPicker: false, customValue: true, options: [] },
            { text: "Display", colorPicker: false, customValue: false, options: ["Block", "Inline",  "Contents",  "Flex",  "Grid",  "Inline-Block",  "Inline-Flex",  "Inline-Grid",  "Inline-Table",  "List-Item",  "Run-In",  "Table-Caption",  "Table-Column-Group",  "Table-Header-Group",  "Table-Footer-Group",  "Table-Row-Group",   "Table-Cell",  "Table-Column",  "Table-Row",  "None"] },
            { text: "Background Color", colorPicker: true, customValue: false, options: [] },
            { text: "Font Size", colorPicker: false, customValue: true, options: [] },
            { text: "Font Color", colorPicker: true, customValue: false, options: [] },
            { text: "Text Align", colorPicker: false, customValue: false, options: ["Left", "Center", "Right"] },
            { text: "Text Decoration", colorPicker: false, customValue: false, options: ["OverLine", "Line-Through", "Underline", "Underline Overline", "None"] },
            { text: "Text Decoration Style", colorPicker: false, customValue: false, options: ["Solid", "Double", "Dotted", "Dashed", "Wavy"] },
            { text: "Text Decoration Color", colorPicker: true, customValue: false, options: [] },
            { text: "Font Style", colorPicker: false, customValue: false, options: ["Normal", "Italic"] },
            { text: "Font Weight", colorPicker: false, customValue: false, options: ["Normal", "Bold"] },
            { text: "Font Variant", colorPicker: false, customValue: false, options: ["Normal", "Small-Caps"] },
            { text: "Font Stretch", colorPicker: false, customValue: false, options: ["Normal", "Condensed", "Expanded"] },
            { text: "Border Size", colorPicker: false, customValue: true, options: [] },
            { text: "Border Color", colorPicker: true, customValue: false, options: [] },
            { text: "Border Radius", colorPicker: false, customValue: true, options: [] },
            { text: "Border Style", colorPicker: false, customValue: false, options: ["Solid", "Dotted", "Double", "Dashed", "Groove", "Ridge", "Dotted Solid", "Dotted Solid Double Dashed", "OutSet", "Inset"] },
            { text: "White Space", colorPicker: false, customValue: false, options: ["Normal", "NoWrap", "Pre", "Pre-Line", "Pre-Wrap"] },
            { text: "Margin Left", colorPicker: false, customValue: true, options: [] },
            { text: "Margin Right", colorPicker: false, customValue: true, options: [] },
            { text: "Margin Top", colorPicker: false, customValue: true, options: [] },
            { text: "Margin Bottom", colorPicker: false, customValue: true, options: [] },
            { text: "Padding Left", colorPicker: false, customValue: true, options: [] },
            { text: "Padding Right", colorPicker: false, customValue: true, options: [] },
            { text: "Padding Top", colorPicker: false, customValue: true, options: [] },
            { text: "Padding Bottom", colorPicker: false, customValue: true, options: [] },
            { text: "Letter Space", colorPicker: false, customValue: true, options: [] },
            { text: "Word Space", colorPicker: false, customValue: true, options: [] },
            { text: "Outline Width", colorPicker: false, customValue: true, options: [] },
            { text: "Outline Color", colorPicker: true, customValue: false, options: [] },
            { text: "Outline Style", colorPicker: false, customValue: false, options: ["Solid", "Dotted", "Double", "Dashed", "Groove", "Ridge", "Hidden", "Outset", "Inset", "None"] },
            { text: "Outline Color", colorPicker: true, customValue: false, options: [] },
            { text: "Text Shadow", colorPicker: true, customValue: true, options: [] },
        ];

        for (let combobox of comboboxs){
            await Globals.components.new({
                name: "internal-combobox",
                parent: document.getElementById('styler-container'),
                data: {
                    unit,
                    text: combobox.text,
                    options: combobox.options,
                    customValue: combobox.customValue === true ? {
                        classes: combobox.text === 'Box Shadow' || combobox.text === 'Text Shadow' ? [ "customlarge" ] : null,
                        placeholder: combobox.text === 'Box Shadow' || combobox.text === 'Text Shadow' ? "0px 0px 0px" : null,
                        call: "updateElement"
                    } : null,
                    colorPicker: combobox.colorPicker === true ? {} : null,
                }
            });
        }
    }
}
