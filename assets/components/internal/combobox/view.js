class InternalComboboxView{
    constructor(controller){
        this.controller = controller;
        this._element = null;
        this.textKeyMap = { // Style properties to update according to combobox text.
            "Font Size": { key: "fontSize", valueSuffix: "px", keyValueSuffix: "px" },
            "Height": { key: "height", valueSuffix: "px", keyValueSuffix: "px" },
            "Width": { key: "width", valueSuffix: "px", keyValueSuffix: "px" },
            "Border Size": { key: "borderWidth", valueSuffix: "px", keyValueSuffix: "px solid black" },
            "Border Radius": { key: "borderRadius", valueSuffix: "px", keyValueSuffix: "px" },
            "Border Style": { key: "borderStyle", valueSuffix: "", keyValueSuffix: "" },
            "Text Align": { key: "textAlign", valueSuffix: "", keyValueSuffix: "" },
            "Margin Top": { key: "marginTop", valueSuffix: "px", keyValueSuffix: "px" },
            "Margin Left": { key: "marginLeft", valueSuffix: "px", keyValueSuffix: "px" },
            "Margin Right": { key: "marginRight", valueSuffix: "px", keyValueSuffix: "px" },
            "Margin Bottom": { key: "marginBottom", valueSuffix: "px", keyValueSuffix: "px" },
            "Padding Top": { key: "paddingTop", valueSuffix: "px", keyValueSuffix: "px" },
            "Padding Left": { key: "paddingLeft", valueSuffix: "px", keyValueSuffix: "px" },
            "Padding Right": { key: "paddingRight", valueSuffix: "px", keyValueSuffix: "px" },
            "Padding Bottom": { key: "paddingBottom", valueSuffix: "px", keyValueSuffix: "px" },
            "Letter Space": { key: "letterSpacing", valueSuffix: "px", keyValueSuffix: "px" },
            "Word Space": { key: "wordSpacing", valueSuffix: "px", keyValueSuffix: "px" },
            "Outline Width": { key: "outlineWidth", valueSuffix: "px", keyValueSuffix: "px" },
            "Box Shadow": { key: "boxShadow", valueSuffix: "", keyValueSuffix: "", minCustomValueLength: 11, },
            "Text Shadow": { key: "textShadow", valueSuffix: "", keyValueSuffix: "", minCustomValueLength: 11, },
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
            "Animation Duration": { key: "animationDuration", valueSuffix: "s", keyValueSuffix: "s" },
            "Animation Delay": { key: "animationDelay", valueSuffix: "s", keyValueSuffix: "s" },
            "Animation Timing": { key: "animationTimingFunction", valueSuffix: "", keyValueSuffix: "" },
            "Opacity": { key: "opacity", valueSuffix: "", keyValueSuffix: "" },
            //"Color 1": { key: "backgroundGradient1", valueSuffix: "", keyValueSuffix: "" },
            //"Color 2": { key: "backgroundGradient2", valueSuffix: "", keyValueSuffix: "" },
            "Font Family": { key: "fontFamily", valueSuffix: "", keyValueSuffix: "" },
            "Google Fonts": { key: "fontFamily", valueSuffix: "", keyValueSuffix: "" }
        };

        this.initialData = {};
    }

    create(options = {}){
        const self = this;
        const { data, parent, prepend, before, component_id } = options;

        self.initialData = {...data};

        const structure = {
            type: "combobox",
            parent,
            id: data.id,
            style: data.style,
            before: before,
            prepend: prepend,
            attributes: {
                "data-component-id": component_id,
                "data-combobox-title": data.text,
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
                                            keyup: function(e){ self.customValueChange(this.value, this, self, false); },
                                        }
                                    }] : [];
                                })(),
                                ...(() => {
                                    return typeof data.colorPicker === "object" && data.colorPicker !== null ? [
                                        {
                                            type: "colordisplay",
                                            style: { display: "none" },
                                            listeners: {
                                                click: function(e){
                                                    let applyTo = data.forAnimator === true ? document.getElementById("animator-preview-element") : document.getElementsByClassName("selected-element")[0];

                                                    if(self.textKeyMap[data.text]){
                                                        let key = self.textKeyMap[data.text].key;
                                                        Globals.colorPicker.toggle(applyTo, this, key, function(key, value){
                                                            const data = self.controller._getModelState();
                                                            data.forAnimator === true ? (data.callbacks.onApplyForAnimator ? data.callbacks.onApplyForAnimator(key, value) : false) : false;
                                                        });
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
                                                                let applyTo = data.forAnimator === true ? document.getElementById("animator-preview-element") : document.getElementsByClassName("selected-element")[0];

                                                                if(self.textKeyMap[data.text]){
                                                                    let key = self.textKeyMap[data.text].key;

                                                                    this.classList.add("combobox-selected-preview"); // This stops syncing since this value is just being set for preview.
                                                                    applyTo.setAttribute(`data-style-temp-${key}`, applyTo.style[key]);
                                                                    applyTo.style[key] = option;
                                                                }
                                                            },
                                                            mouseout: function(){
                                                                let applyTo = data.forAnimator === true ? document.getElementById("animator-preview-element") : document.getElementsByClassName("selected-element")[0];

                                                                if(self.textKeyMap[data.text]){
                                                                    let key = self.textKeyMap[data.text].key;

                                                                    this.classList.remove("combobox-selected-preview"); // This stops syncing since this value is just being set for preview.
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

        // Set provided value.
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

                valueSuffix = self.initialData.unit ? valueSuffix.replaceAll("px", self.initialData.unit).replaceAll("%", data.unit) : valueSuffix;
                keyValueSuffix = self.initialData.unit ? keyValueSuffix.replaceAll("px", self.initialData.unit).replaceAll("%", data.unit) : keyValueSuffix;

                let inputElement = self._element.getElementsByClassName("custom")[0] || self._element.getElementsByClassName("customlarge")[0];
                if(inputElement){ self.customValueChange(data.value.replaceAll(keyValueSuffix, "").replaceAll(valueSuffix, ""), inputElement, self, false); }
            }
        }
    }

    customValueChange(value, inputElement, self, isSyncCall = false){
        if(value && inputElement && (inputElement === document.activeElement && isSyncCall === false) || (isSyncCall === true && inputElement !== document.activeElement)){
            // If user is not typing
            const data = self.controller._getModelState();
            let minCustomValueLength = self.textKeyMap[data.text].minCustomValueLength;

            if(((value.length >= minCustomValueLength) || !minCustomValueLength) && (value.length > 0)){
                self.controller._updateModelState({ value });
                let selected_a_span = inputElement.parentElement.getElementsByTagName("span")[0];

                let key = self.textKeyMap[data.text].key;
                let valueSuffix = self.textKeyMap[data.text].valueSuffix;
                let keyValueSuffix = self.textKeyMap[data.text].keyValueSuffix;
                let applyTo = data.forAnimator === true ? document.getElementById("animator-preview-element") : document.getElementsByClassName("selected-element")[0];

                valueSuffix = self.initialData.unit ? valueSuffix.replaceAll("px", self.initialData.unit).replaceAll("%", data.unit) : valueSuffix;
                keyValueSuffix = self.initialData.unit ? keyValueSuffix.replaceAll("px", self.initialData.unit).replaceAll("%", data.unit) : keyValueSuffix;
                value = data.unit ? (data.unit === "px" ? value.replaceAll("%", "px") : value.replaceAll("px", "%")) : value;

                if(data.customValue.call === "updateElement"){
                    selected_a_span.innerText = (`${data.text}: ${key === "textShadow" || key === "boxShadow" ? (value.includes("rgb") ? `${value.split(")")[1]}` : "0px 0px 0px") : value}${value.includes(valueSuffix) ? "" : valueSuffix}`).trim();

                    if(key === "textShadow" || key === "boxShadow"){
                        // For updateElement, value should include the color of text and box shadow
                        if(!value.includes("rgb")){
                            if(applyTo.style[key].includes("rgb")){
                                value = `${applyTo.style[key].split(")")[0]}) ${value}`;
                            }else{
                                value = `rgba(0, 0, 0, 1) ${value}`;
                            }
                        }
                    }

                    updateElement(key, value+(value.includes(valueSuffix) ? "" : valueSuffix));
                    data.forAnimator === true ? (data.callbacks.onApplyForAnimator ? data.callbacks.onApplyForAnimator(key, value+(value.includes(valueSuffix) ? "" : valueSuffix)) : false) : false;
                }else{
                    if(data.customValue.call === "dataAttributeBalancer"){
                        selected_a_span.innerText = `${data.text}: ${value}`;
                        dataAttributeBalancer(key, value);
                    }else{
                        if(data.customValue.call === "updatePageElement"){
                            selected_a_span.innerText = `${data.text}: ${value}${(value.includes(valueSuffix) ? "" : valueSuffix)}`;
                            document.getElementsByClassName("selected-element")[0].style[key] = `${value}${keyValueSuffix}`;
                        }
                    }
                }

                inputElement.value = (key === "textShadow" || key === "boxShadow" ? (value.includes("rgb") ? `${value.split(")")[1]}` : "0px 0px 0px") : value.replaceAll("%", "").replaceAll("px", "")).trim(); // Making sure the value is same if customValueChange(this function) was called not from an input keyup event.
            }
        }
    }

    changeValue(optionElement, value, toggle = true){
        const data = this.controller._getModelState();

        this.controller._updateModelState({ selected: value });

        this._element.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = `${data.text}: ${value}`;
        $(this._element).find(".combobox-selected").removeClass("combobox-selected");
        optionElement.classList.add("combobox-selected");

        toggle === true ? this.toggle(this, "hide") : false;

        let applyTo = data.forAnimator === true ? document.getElementById("animator-preview-element") : document.getElementsByClassName("selected-element")[0];
        let key = this.textKeyMap[data.text].key;

        if(data.id == "timing"){
            updateElement('atiming', value);
        }else{
            if(this.textKeyMap[data.text]){
                if(key && applyTo.hasAttribute(`data-style-temp-${key}`)){
                    applyTo.setAttribute(`data-style-temp-${key}`, value);
                }

                if(applyTo && applyTo.classList.contains("selected-element")){
                    if(data.id === "googlefonts"){
                        applyTo.style.fontFamily = value;
                    }
                }
            }else{
                updateElement(key, value);
                data.forAnimator === true ? (data.callbacks.onApplyForAnimator ? data.callbacks.onApplyForAnimator(key, value) : false) : false;
            }
        }
    }

    async syncValue(){
        const self = this;
        const data = await self.controller._getModelState();

        let applyTo = data.forAnimator === true ? document.getElementById("animator-preview-element") : document.getElementsByClassName("selected-element")[0];
        if(applyTo){
            let key = self.textKeyMap[data.text].key;
            let currentStyleValue = applyTo && key ? applyTo.style[key] : null;

            if(currentStyleValue !== undefined && currentStyleValue !== null && Array.isArray(data.options) && data.options.length > 0 && data.options.map(x => (x.toLowerCase())).includes(currentStyleValue)){
                let optionElements = self._element.getElementsByTagName("ul")[0].getElementsByTagName("a");
                if(optionElements){
                    let optionElement = [...optionElements].find(x => (x.getAttribute("data-combobox-option-value").toString().toLowerCase() === currentStyleValue));
                    if(optionElement && !optionElement.classList.contains("combobox-selected-preview")){
                        await self.changeValue(optionElement, optionElement.getAttribute("data-combobox-option-value"), false);
                    }
                }
            }

            if(currentStyleValue !== undefined && currentStyleValue !== null && currentStyleValue !== data.unit && typeof data.customValue === "object" && data.customValue !== null){
                await self.customValueChange(currentStyleValue, self._element.getElementsByClassName("custom")[0] || self._element.getElementsByClassName("customlarge")[0], self, true);
            }

            if(currentStyleValue !== undefined && currentStyleValue !== null && currentStyleValue !== data.unit && typeof data.colorPicker === "object" && data.colorPicker !== null){
                let colorDisplay = self._element.getElementsByTagName("colordisplay");
                if(colorDisplay[0]){
                    colorDisplay[0].style.backgroundColor = key === "textShadow" || key === "boxShadow" ? (currentStyleValue.includes("rgb") ? `${currentStyleValue.split(")")[0]})` : "rgba(0, 0, 0, 1)") : currentStyleValue;
                }
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
    }
}
