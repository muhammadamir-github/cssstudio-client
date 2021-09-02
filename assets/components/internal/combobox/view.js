class InternalComboboxView{
    constructor(controller){
        this.controller = controller;
        this._element = null;
        this.textKeyMap = { // Style properties to update according to combobox text.
            "Font Size": { key: "fontSize", valueSuffix: "px", keyValueSuffix: "px" },
            "Height": { key: "height", valueSuffix: "px", keyValueSuffix: "px" },
            "Width": { key: "width", valueSuffix: /*unit*/"px", keyValueSuffix: /*unit*/"px" },
            "Border Size": { key: "borderSize", valueSuffix: "px", keyValueSuffix: "px solid black" },
            "Border Radius": { key: "borderRadius", valueSuffix: /*unit*/"px", keyValueSuffix: /*unit*/"px" },
            "Border Style": { key: "borderStyle", valueSuffix: "", keyValueSuffix: "" },
            "Text Align": { key: "textAlign", valueSuffix: "", keyValueSuffix: "" },
            "Margin Top": { key: "marginTop", valueSuffix: /*unit*/"px", keyValueSuffix: /*unit*/"px" },
            "Margin Left": { key: "marginLeft", valueSuffix: /*unit*/"px", keyValueSuffix: /*unit*/"px" },
            "Margin Right": { key: "marginRight", valueSuffix: /*unit*/"px", keyValueSuffix: /*unit*/"px" },
            "Margin Bottom": { key: "marginBottom", valueSuffix: /*unit*/"px", keyValueSuffix: /*unit*/"px" },
            "Padding Top": { key: "paddingTop", valueSuffix: /*unit*/"px", keyValueSuffix: /*unit*/"px" },
            "Padding Left": { key: "paddingLeft", valueSuffix: /*unit*/"px", keyValueSuffix: /*unit*/"px" },
            "Padding Right": { key: "paddingRight", valueSuffix: /*unit*/"px", keyValueSuffix: /*unit*/"px" },
            "Padding Bottom": { key: "paddingBottom", valueSuffix: /*unit*/"px", keyValueSuffix: /*unit*/"px" },
            "Letter Space": { key: "letterSpacing", valueSuffix: /*unit*/"px", keyValueSuffix: /*unit*/"px" },
            "Word Space": { key: "wordSpacing", valueSuffix: /*unit*/"px", keyValueSuffix: /*unit*/"px" },
            "Outline Width": { key: "outlineWidth", valueSuffix: /*unit*/"px", keyValueSuffix: /*unit*/"px" },
            "Box Shadow": { key: "boxShadow", valueSuffix: "", keyValueSuffix: "" },
            "Text Shadow": { key: "textShadow", valueSuffix: "", keyValueSuffix: "" },
            "Text Decoration": { key: "textDecoration", valueSuffix: "", keyValueSuffix: "" },
            "Text Decoration Style": { key: "textDecorationStyle", valueSuffix: "", keyValueSuffix: "" },
            "Font Style": { key: "fontStyle", valueSuffix: "", keyValueSuffix: "" },
            "Font Stretch": { key: "fontStretch", valueSuffix: "", keyValueSuffix: "" },
            "Font Variant": { key: "fontVariant", valueSuffix: "", keyValueSuffix: "" },
            "Font Stretch": { key: "fontStretch", valueSuffix: "", keyValueSuffix: "" },
            "Font Weight": { key: "fontWeight", valueSuffix: "", keyValueSuffix: "" },
            "Display": { key: "display", valueSuffix: "", keyValueSuffix: "" },
            "White Space": { key: "whiteSpace", valueSuffix: "", keyValueSuffix: "" },
            "Outline Style": { key: "outlineStyle", valueSuffix: "", keyValueSuffix: "" },
            "Font Color": { key: "color", valueSuffix: "", keyValueSuffix: "" },
            "Outline Color": { key: "outlineColor", valueSuffix: "", keyValueSuffix: "" },
            "Background Color": { key: "backgroundColor", valueSuffix: "", keyValueSuffix: "" },
            "Border Color": { key: "borderColor", valueSuffix: "", keyValueSuffix: "" },
            "Text Decoration Color": { key: "textDecorationColor", valueSuffix: "", keyValueSuffix: "" },
            "Duration": { key: "animatedr", valueSuffix: "s", keyValueSuffix: "s" },
            "Delay": { key: "animated", valueSuffix: "s", keyValueSuffix: "s" },
            "Iteration": { key: "animatei", valueSuffix: "", keyValueSuffix: "" },
            "Percentage": { key: "slidePercentage", valueSuffix: "%", keyValueSuffix: "%" },
            "Opacity": { key: "slideOpacity", valueSuffix: "", keyValueSuffix: "" },
            "Color 1": { key: "backgroundGradient1", valueSuffix: "", keyValueSuffix: "" },
            "Color 2": { key: "backgroundGradient2", valueSuffix: "", keyValueSuffix: "" },
            "Font Family": { key: "fontFamily", valueSuffix: "", keyValueSuffix: "" },
            "Google Fonts": { key: "fontFamily", valueSuffix: "", keyValueSuffix: "" }
        };

        this.initialData = {};
    }

    create(options = {}){
        const self = this;
        const { data, parent, prepend, before, elementType, component_id } = options;

        self.initialData = {...data, elementType};

        const structure = {
            type: "combobox",
            parent,
            id: data.id,
            style: data.style,
            before: before,
            prepend: prepend,
            attributes: {
                "data-component-id": component_id,
            },
            children: [
                {
                    type: "selected",
                    children: [
                        {
                            type: "a",
                            style: data.width ? { width: data.width } : null,
                            children: [
                                {
                                    type: "span",
                                    text: data.text,
                                    style: data.fontSize ? { fontSize: data.fontSize } : null,
                                    listeners: {
                                        click: function(){
                                            self.toggle(self);
                                        },
                                    }
                                },
                                ...(() => {
                                    return typeof data.customValue === "object" && data.customValue !== null ? [{
                                        type: "input",
                                        attributes: {
                                            placeholder: data.customValue.placeholder ? data.customValue.placeholder : "",
                                            value: data.customValue.value ? data.customValue.value : ""
                                        },
                                        classes: data.customValue.classes ? data.customValue.classes : [ "custom" ],
                                        style: data.customValue.style ? data.customValue.style : null,
                                        listeners: {
                                            keyup: function(e){ self.customValueChange(this.value, this, self); },
                                        }
                                    }] : [];
                                })(),
                                ...(() => {
                                    return typeof data.colorPicker === "object" && data.colorPicker !== null ? [
                                        {
                                            type: "colordisplay",
                                            style: { display: "none" },
                                            listeners: {
                                                click: function(){
                                                    let applyTo = document.getElementById(`preview${elementType}`) || document.getElementsByClassName(`selected`)[0];

                                                    if(self.textKeyMap[data.text]){
                                                        let key = self.textKeyMap[data.text].key;
                                                        Globals.colorPicker.toggle(applyTo, this, key);
                                                    }
                                                }
                                            }
                                        },
                                    ] : [];
                                })(),
                            ]
                        },
                        ...(() => {
                            return typeof data.tooltip === "object" && data.tooltip !== null ? [{
                                type: "span",
                                classes: [ "tooltip" ],
                                text: data.tooltip.text,
                            }] : [];
                        })(),
                    ]
                },
                ...(() => {
                    if(Array.isArray(data.options) && data.options.length > 0){
                        return [{
                            type: "options",
                            children: [
                                {
                                    type: "ul",
                                    children: (() => {
                                        return data.options.map((option, i) => {
                                            return {
                                                type: "li",
                                                children: [
                                                    {
                                                        type: "a",
                                                        text: option,
                                                        attributes: {
                                                            "data-combobox-option-value": option
                                                        },
                                                        classes: [
                                                            ...(() => { return i === data.options.length-1 ? ["lastoption"] : []; })(),
                                                        ],
                                                        listeners: {
                                                            click: function(){
                                                                self.changeValue(this, option);
                                                            },
                                                            mouseover: function(){
                                                                let applyTo = document.getElementById(`preview${elementType}`) || document.getElementsByClassName(`selected`)[0];

                                                                if(self.textKeyMap[data.text]){
                                                                    let key = self.textKeyMap[data.text].key;

                                                                    applyTo.setAttribute(`data-style-temp-${key}`, applyTo.style[key]);
                                                                    applyTo.style[key] = option;
                                                                }
                                                            },
                                                            mouseout: function(){
                                                                let applyTo = document.getElementById(`preview${elementType}`) || document.getElementsByClassName(`selected`)[0];

                                                                if(self.textKeyMap[data.text]){
                                                                    let key = self.textKeyMap[data.text].key;

                                                                    applyTo.style[key]  = applyTo.getAttribute(`data-style-temp-${key}`);
                                                                    applyTo.setAttribute(`data-style-temp-${key}`, "");
                                                                }
                                                            },
                                                        },
                                                    }
                                                ]
                                            }
                                        });
                                    })(),
                                }
                            ]
                        }];
                    }else{ return []; }
                })(),
            ]
        };

        self._element = Globals.elements.new(structure);

        if(Array.isArray(data.options)){
            if(data.selected){
                let optionElement = [...self._element.getElementsByTagName("a")].find(x => (x.getAttribute("data-combobox-option-value") === data.selected));
                if(optionElement){ self.changeValue(optionElement, data.selected); }
            }
        }

        if(typeof data.customValue === "object" && data.customValue !== null){
            if(data.value){
                let valueSuffix = self.textKeyMap[self.initialData.text].valueSuffix;
                let keyValueSuffix = self.textKeyMap[self.initialData.text].keyValueSuffix;

                let inputElement = self._element.getElementsByClassName("custom")[0] || self._element.getElementsByClassName("customlarge")[0];
                if(inputElement){ self.customValueChange(data.value.replaceAll(keyValueSuffix, "").replaceAll(valueSuffix, ""), inputElement, self); }
            }
        }
    }

    customValueChange(value, inputElement, self){
        self.controller._updateModelState({ value });
        let selected_a_span = inputElement.parentElement.getElementsByTagName("a")[0].getElementsByTagName("span")[0];

        let key = self.textKeyMap[self.initialData.text].key;
        let valueSuffix = self.textKeyMap[self.initialData.text].valueSuffix;
        let keyValueSuffix = self.textKeyMap[self.initialData.text].keyValueSuffix;

        if(self.initialData.customValue.call === "updateElement"){
            selected_a_span.innerText = `${self.initialData.text}: ${value}${valueSuffix}`;
            updateElement(self.initialData.elementType, key, value+valueSuffix);
        }else{
            if(self.initialData.customValue.call === "dataAttributeBalancer"){
                selected_a_span.innerText = `${self.initialData.text}: ${value}`;
                dataAttributeBalancer(key, value);
            }else{
                if(self.initialData.customValue.call === "updatePageElement"){
                    selected_a_span.innerText = `${self.initialData.text}: ${value}${valueSuffix}`;
                    document.getElementsByClassName('selected')[0].style[key] = `${value}${keyValueSuffix}`;
                }
            }
        }
    }

    changeValue(optionElement, value){
        this.controller._updateModelState({ selected: value });

        this._element.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = `${this.initialData.text}: ${value}`;
        $(this._element).find(".combobox-selected").removeClass("combobox-selected");
        optionElement.classList.add("combobox-selected");

        this.toggle(this, "hide");

        let applyTo = document.getElementById(`preview${this.initialData.elementType}`) || document.getElementsByClassName(`selected`)[0];
        let key = this.textKeyMap[this.initialData.text].key;

        if(this.initialData.id == "timing"){
            updateElement(this.initialData.elementType, 'atiming', value);
        }else{
            if(this.textKeyMap[this.initialData.text]){
                if(key && applyTo.hasAttribute(`data-style-temp-${key}`)){
                    applyTo.setAttribute(`data-style-temp-${key}`, value);
                }

                if(applyTo && applyTo.classList.contains("selected")){
                    if(this.initialData.id === "googlefonts"){
                        applyTo.style.fontFamily = value;
                    }

                    this._element.classList.remove('selectedCombobox');
                }
            }else{
                updateElement(this.initialData.elementType, key, value);
            }
        }
    }

    toggle(self, specficAction = null){
        let options = self._element.getElementsByTagName("options");
        let customValue = self._element.getElementsByClassName("custom")[0] || self._element.getElementsByClassName("customlarge")[0];
        let combobox = self._element;
        let colordisplay = self._element.getElementsByTagName("colordisplay");
        let selected_a_span = self._element.getElementsByTagName("selected")[0].getElementsByTagName("span")[0];

        if(options[0]){
            options = options[0];
            let options_ul = options.getElementsByTagName("ul");

            if(options_ul[0]){
                options_ul = options_ul[0];
                if((specficAction === null && options.style.display == 'flex') || specficAction === "hide"){
                    options.style.display = 'none';
                    options_ul.style.display = 'none';
                }else{
                    options.style.display = 'flex';
                    options_ul.style.display = 'flex';
                }
            }
        }

        if(customValue){
            if((specficAction === null && customValue.style.display == 'flex') || specficAction === "hide"){
                customValue.style.display = 'none';
                selected_a_span.style.textAlign = 'unset';
            }else{
                customValue.style.display = 'flex';
                selected_a_span.style.textAlign = 'left';
            }
        }

        if(colordisplay[0]){
            colordisplay = colordisplay[0];
            if((specficAction === null && colordisplay.style.display == 'flex') || specficAction === "hide"){
                colordisplay.style.display = 'none';
                combobox.style.textAlign = 'unset';
            }else{
                colordisplay.style.display = 'flex';
                combobox.style.textAlign = 'left';
            }
        }

        if((specficAction === null || specficAction === "hide") && self.applyTo && self.applyTo.classList.contains("selected")){
            combobox.classList.add('selectedCombobox');
        }
    }
}
