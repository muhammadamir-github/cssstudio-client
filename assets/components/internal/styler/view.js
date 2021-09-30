class InternalStylerView{
    constructor(controller){
        this.controller = controller;
        this._element = null;
        this.hidden = true;
        this._hasLoadedBefore = false;

        this._dragDetails = {
            x: 0,
            y: 0,
            mouse: {
                x: 0,
                y: 0,
                isDown: false,
            },
        };

        this._resizeDetails = {
            mouse: {
                isDown: false,
                x: 0,
                y: 0,
            },
            height: 0,
            width: 0,
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
                            text: "Styler",
                            classes: [ "banner-heading" ],
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
                    classes: [ "flex-container", "styler-container" ],
                },
                {
                    type: "div",
                    id: "styler-settings",
                    children: [
                        {
                            type: "p",
                            text: "Unit: ",
                            classes: [ "banner-heading" ],
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
                self._element.getElementsByClassName("banner-heading")[0],
                self._element.getElementsByClassName("banner-heading")[1],
            ],
            detailsHolder: self._dragDetails,
        });

        await Globals.resizeableFactory.new({
            element: self._element,
            detailsHolder: self._resizeDetails,
        });

        self._element.getElementsByClassName("eResizer")[0].classList.add("eResizer-visible");

        await this.load();
        setInterval(async () => {
            await self.syncValues();
        }, 1000);
    }

    async show(){
        await this.syncValues();
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

    async syncValues(){
        let comboboxes = this._element.getElementsByClassName("flex-container")[0].getElementsByTagName("combobox");
        await [...comboboxes].forEach(async (x) => {
            let controller = await Globals.components.controller(x);
            await controller.syncValue();
        });

        let sliders = this._element.getElementsByClassName("flex-container")[0].getElementsByTagName("slider");
        await [...sliders].forEach(async (x) => {
            let controller = await Globals.components.controller(x);
            await controller.syncValue();
        });

        let imagepickers = this._element.getElementsByClassName("flex-container")[0].getElementsByTagName("imagepicker");
        await [...imagepickers].forEach(async (x) => {
            let controller = await Globals.components.controller(x);
            await controller.syncValue();
        });
    }

    async reset(){
        let comboboxes = this._element.getElementsByClassName("flex-container")[0].getElementsByTagName("combobox");
        await [...comboboxes].forEach(async (x) => { x.getAttribute("data-combobox-title") === "Google Fonts" ? false : x.remove(); });

        let sliders = this._element.getElementsByClassName("flex-container")[0].getElementsByTagName("slider");
        await [...sliders].forEach(async (x) => { x.remove(); });

        let imagepickers = this._element.getElementsByClassName("flex-container")[0].getElementsByTagName("imagepicker");
        await [...imagepickers].forEach(async (x) => { x.remove(); });
        await this.load();
    }

    async load(){
        const self = this;
        const data = await self.controller._getModelState();
        const unit = data["unit"];

        let comboboxes = [
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
            { text: "Font Family", colorPicker: false, customValue: false, options: ["Sans", "Sans-Serif", "Helvectia", "Monospace", "Cursive", "Fantasy"] },
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
            { text: "Box Shadow", colorPicker: true, customValue: true, options: [] },
            { text: "Opacity", colorPicker: false, customValue: true, options: [] },
        ];

        if(self._hasLoadedBefore === false){
            let googleFonts = Array.isArray(Globals.pageHandler.WebFonts) && Globals.pageHandler.WebFonts.length > 0 ? Globals.pageHandler.WebFonts : await getGoogleFonts();
            comboboxes = [{ text: "Google Fonts", colorPicker: false, customValue: false, options: googleFonts.map(font => {
                return font.variants.map(variant => {
                    return (font.family + ' ' + variant).replace(/ /g,"_")
                })
            }).flat() }, ...comboboxes];
        }

        for (let combobox of comboboxes){
            await Globals.components.new({
                name: "internal-combobox",
                parent: self._element.getElementsByClassName('styler-container')[0],
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
                    forAnimator: data.forAnimator,
                }
            });
        }

        let sliders = [
            { text: "Skew x-axis", min: 0, max: 180, step: 1, value: 0 },
            { text: "Skew y-axis", min: 0, max: 180, step: 1, value: 0 },
            { text: "Scale x-axis", min: 0, max: 1, step: 0.1, value: 0 },
            { text: "Scale y-axis", min: 0, max: 1, step: 0.1, value: 0 },
            { text: "Rotate x-axis", min: 0, max: 180, step: 1, value: 0 },
            { text: "Rotate y-axis", min: 0, max: 180, step: 1, value: 0 },
        ];

        for (let slider of sliders){
            await Globals.components.new({
                name: "internal-slider",
                parent: self._element.getElementsByClassName('styler-container')[0],
                data: {
                    text: slider.text,
                    min: slider.min,
                    max: slider.max,
                    step: slider.step,
                    value: slider.value,
                    forAnimator: data.forAnimator,
                }
            });
        }

        let imagepickers = [
            { text: "Image" },
        ];

        for (let imagepicker of imagepickers){
            await Globals.components.new({
                name: "internal-image-picker",
                parent: self._element.getElementsByClassName('styler-container')[0],
                data: {
                    text: imagepicker.text,
                    forAnimator: data.forAnimator,
                }
            });
        }

        if(self._hasLoadedBefore === false){ self._hasLoadedBefore = true; }
    }
}
