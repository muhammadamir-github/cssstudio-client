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

        this.colorPicker = {
            isMouseDown: false,
            applyTo: null
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
                                }
                            ]
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
                                    id: `${data.colorPicker.idPrefix}cd`,
                                    style: { display: "none" },
                                    listeners: {
                                        click: function(){
                                            var colorpicker = this.parentElement.getElementsByClassName("colorpicker")[0];

                                            if(colorpicker.style.display == 'block'){
                                                colorpicker.style.display = 'none';
                                            }else{
                                                colorpicker.style.display = 'block';
                                            }
                                        }
                                    }
                                },
                                {
                                    type: "div",
                                    classes: [ "colorpicker" ],
                                    id: `${data.colorPicker.idPrefix}cp`,
                                    style: data.colorPicker.style ? data.colorPicker.style : null,
                                    children: [
                                        {
                                            type: "canvas",
                                            classes: [ "colorpickerbox" ],
                                            id: `${data.colorPicker.idPrefix}cpb`,
                                            listeners: {
                                                mousedown: function(e){
                                                    self.isMouseDown = true;
                                                    self.color(e);
                                                },
                                                mouseup: function(e){
                                                    if(self.isMouseDown){
                                                        self.color(e);
                                                    }

                                                    self.isMouseDown = false;
                                                },
                                                mousemove: function(e){
                                                    if(self.isMouseDown){
                                                        self.color(e);
                                                    }
                                                },
                                            }
                                        },
                                        {
                                            type: "canvas",
                                            classes: [ "colorpickerstrip" ],
                                            id: `${data.colorPicker.idPrefix}cps`,
                                            listeners: {
                                                click: function(e){
                                                    self.updateStrip(e, self);
                                                }
                                            }
                                        },
                                        {
                                            type: "input",
                                            attributes: { placeholder: "Color Rgba: " },
                                            id: `${data.colorPicker.idPrefix}cprgba`,
                                            listeners: {
                                                input: function(){
                                                    self.textToColorPickerColor(this);
                                                }
                                            }
                                        },
                                        {
                                            type: "input",
                                            attributes: { placeholder: "Color Hex: " },
                                            id: `${data.colorPicker.idPrefix}cphex`,
                                            listeners: {
                                                input: function(){
                                                    self.textToColorPickerColor(this);
                                                }
                                            }
                                        }
                                    ]
                                }
                            ] : [];
                        })(),
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

        if(typeof data.colorPicker === "object" && data.colorPicker !== null){
            setTimeout(() => {
                // This timeout is required due to element being created dynamically.
                self.setupColorPicker(elementType == "selected" ? elementType : `preview${elementType}`);

                if(data.color){
                    let inputElement = data.color.startsWith("#") ? document.getElementById(`${data.colorPicker.idPrefix}cphex`) : document.getElementById(`${data.colorPicker.idPrefix}cprgba`);
                    if(inputElement){ inputElement.value = data.color; self.textToColorPickerColor(inputElement); }
                }
            }, 250);
        }

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

        if(this.textKeyMap[this.initialData.text]){
            let key = this.textKeyMap[this.initialData.text].key;

            if(key && applyTo.hasAttribute(`data-style-temp-${key}`)){
                applyTo.setAttribute(`data-style-temp-${key}`, value);
            }

            if(applyTo && applyTo.classList.contains("selected")){
                if(this.initialData.id === "googlefonts"){
                    applyTo.style.fontFamily = value;
                }

                this._element.classList.remove('selectedCombobox');
            }else{
                if(this.initialData.id === "timing"){
                    updateElement(this.initialData.elementType, 'atiming', value);
                }else{
                    if(this.initialData.id === "googlefonts"){
                        updateElement(this.initialData.elementType, 'googlefonts', value);
                    }else{
                        updateElement(this.initialData.elementType, key, value);
                    }
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
                if((specficAction === null && options.style.display == 'block') || specficAction === "hide"){
                    options.style.display = 'none';
                    options_ul.style.display = 'none';
                }else{
                    options.style.display = 'block';
                    options_ul.style.display = 'block';
                }
            }
        }

        if(customValue){
            if((specficAction === null && customValue.style.display == 'block') || specficAction === "hide"){
                customValue.style.display = 'none';
                selected_a_span.style.textAlign = 'unset';
            }else{
                customValue.style.display = 'block';
                selected_a_span.style.textAlign = 'left';
            }
        }

        if(colordisplay[0]){
            colordisplay = colordisplay[0];
            if((specficAction === null && colordisplay.style.display == 'block') || specficAction === "hide"){
                colordisplay.style.display = 'none';
                combobox.style.textAlign = 'unset';
            }else{
                colordisplay.style.display = 'block';
                combobox.style.textAlign = 'left';
            }
        }

        if((specficAction === null || specficAction === "hide") && self.colorPicker.applyTo && self.colorPicker.applyTo.classList.contains("selected")){
            combobox.classList.add('selectedCombobox');
        }
    }

    updateStrip(e, self){
        let strip = document.getElementById(`${self.initialData.colorPicker.idPrefix}cps`);
        let strip2d = strip.getContext('2d');
        let stripwidth = strip.width;
        let stripheight = strip.height;
        strip2d.rect(0, 0, stripwidth, stripheight);

        let gradientone = strip2d.createLinearGradient(0, 0, stripwidth, 0);
        gradientone.addColorStop(0, 'rgba(255, 0, 0, 1)');
        gradientone.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
        gradientone.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
        gradientone.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
        gradientone.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
        gradientone.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
        gradientone.addColorStop(1, 'rgba(255, 0, 0, 1)');
        strip2d.fillStyle = gradientone;
        strip2d.fill();

        let xaxis = e ? e.offsetX : 0;
        let yaxis = e ? e.offsetY : 0;

        let imagedata = strip2d.getImageData(xaxis, yaxis, 1, 1).data;
        let rgba = 'rgba(' + imagedata[0] + ',' + imagedata[1] + ',' + imagedata[2] + ',1)';

        self.fillGradient(rgba);
    }

    updateBox(){
        const self = this;
        let box = document.getElementById(`${this.initialData.colorPicker.idPrefix}cpb`);
        var box2d = box.getContext('2d');
        var boxwidth = box.width;
        var boxheight = box.height;

        var rgba = 'rgba(255,0,0,1)';

        box2d.rect(0, 0, boxwidth, boxheight);
        self.fillGradient(rgba);
    }

    setupColorPicker(forid){
        const self = this;

        if(forid == "selected"){
            self.colorPicker.applyTo = document.getElementsByClassName('selected')[0] || document.getElementById(forid);
        }else{
            self.colorPicker.applyTo = document.getElementById(forid);
        }

        self.updateStrip(null, self);
        self.updateBox();
    }

    fillGradient(rgba){
        let box = document.getElementById(`${this.initialData.colorPicker.idPrefix}cpb`);
        let box2d = box.getContext('2d');
        let boxwidth = box.width;
        let boxheight = box.height;

        let strip = document.getElementById(`${this.initialData.colorPicker.idPrefix}cps`);
        let strip2d = strip.getContext('2d');

        box2d.fillStyle = rgba;
        box2d.fillRect(0, 0, boxwidth, boxheight);

        let gradientwhite = strip2d.createLinearGradient(0, 0, boxheight, 0);
        gradientwhite.addColorStop(0, 'rgba(255,255,255,1)');
        gradientwhite.addColorStop(1, 'rgba(255,255,255,0)');
        box2d.fillStyle = gradientwhite;
        box2d.fillRect(0, 0, boxwidth, boxheight);

        let gradientblack = strip2d.createLinearGradient(0, 0, 0, boxheight);
        gradientblack.addColorStop(0, 'rgba(0,0,0,0)');
        gradientblack.addColorStop(1, 'rgba(0,0,0,1)');
        box2d.fillStyle = gradientblack;
        box2d.fillRect(0, 0, boxwidth, boxheight);
    }

    color(e){
        // update color from mouse
        const self = this;

        let key = self.textKeyMap[self.initialData.text].key;

        let boxid = `${self.initialData.colorPicker.idPrefix}cpb`;
        let stripid = `${self.initialData.colorPicker.idPrefix}cps`;

        let box = document.getElementById(boxid);
        let box2d = box.getContext('2d');

        let displayinvoker = `${self.initialData.colorPicker.idPrefix}cd`;
        let display = document.getElementById(displayinvoker);
        let rgbainput = document.getElementById(`${self.initialData.colorPicker.idPrefix}cprgba`);
        let hexinput = document.getElementById(`${self.initialData.colorPicker.idPrefix}cphex`);

        let xaxis = e.offsetX;
        let yaxis = e.offsetY;

        var imagedata = box2d.getImageData(xaxis, yaxis, 1, 1).data;
        let rgba = 'rgba(' + imagedata[0] + ',' + imagedata[1] + ',' + imagedata[2] + ',1)';
        var hexfromrgba = self.rgb2hex(rgba);

        if(boxid.includes('animate') || stripid.includes('animate')){
            dataAttributeBalancer('slide'+displayinvoker, rgba);
        }else{
            if(key == 'backgroundColor'){
                self.colorPicker.applyTo.style.backgroundColor = rgba;
            }

            if(key == 'color'){
                self.colorPicker.applyTo.style.color = rgba;
            }

            if(key == 'borderColor'){
                if(self.colorPicker.applyTo.style.borderColor != ''){
                    self.colorPicker.applyTo.style.bordercolor = '';
                    self.colorPicker.applyTo.style.borderColor = rgba;
                }else{
                    if(self.colorPicker.applyTo.style.borderBottomColor != ''){
                        self.colorPicker.applyTo.style.borderBottomColor = rgba;
                    }else{
                        self.colorPicker.applyTo.style.bordercolor = '';
                        self.colorPicker.applyTo.style.borderColor = rgba;
                    }
                }
            }

            if(key == 'textDecorationColor'){
                self.colorPicker.applyTo.style.textDecorationColor = rgba;
            }

            if(key == 'boxShadow'){
                var currentboxshadow = self.colorPicker.applyTo.style.boxShadow;

                if(currentboxshadow.includes('rgb')){
                    var newboxshadow = self.colorPicker.applyTo.style.boxShadow.split(')')[1];
                    self.colorPicker.applyTo.style.boxShadow = rgba + newboxshadow;
                }else{
                    var newboxshadow = self.colorPicker.applyTo.style.boxShadow;
                    self.colorPicker.applyTo.style.boxShadow = rgba + newboxshadow;
                }
            }

            if(key == 'textShadow'){
                var currenttextshadow = self.colorPicker.applyTo.style.textShadow;

                if(currenttextshadow.includes('rgb')){
                    var newtextshadow = self.colorPicker.applyTo.style.textShadow.split(')')[1];
                    self.colorPicker.applyTo.style.textShadow = rgba + newtextshadow;
                }else{
                    var newtextshadow = self.colorPicker.applyTo.style.textShadow;
                    self.colorPicker.applyTo.style.textShadow = rgba + newtextshadow;
                }
            }

            if(key == 'outlineColor'){
                self.colorPicker.applyTo.style.outlineColor = rgba;
            }
        }

        display.style.backgroundColor = rgba;
        rgbainput.value = 'Color Rgba: ' + rgba;
        hexinput.value = 'Color Hex: ' + self.rgb2hex(rgba);

        self.controller._updateModelState({ color: rgba });
    }

    textToColorPickerColor(e){
        // update color from input
        const self = this;

        let key = self.textKeyMap[self.initialData.text].key;

        var colorpicker_box = e.parentElement.getElementsByClassName('colorpickerbox')[0];
        var colordisplay = e.parentElement.parentElement.getElementsByTagName('colordisplay')[0];

        var color;
        var text = e.value;
        if(text.includes('Color Rgba:') || text.includes('Color Hex:')){
            color = text.split(':')[1];
        }else{
            if(text.includes('(') || text.includes(')') || text.includes('rgba')){
                color = 'rgba('+text.split('(')[1];
            }

            if(text.includes('#')){
                color = text;
            }
        }

        colordisplay.style.backgroundColor = color;

        if(text.includes('Color Rgba:') || text.includes('(') || text.includes(')') || text.includes('rgba')){
            e.value = 'Color Rgba: rgba('+text.split('(')[1];
        }else{
            if(text.includes('#')){
                e.value = 'Color Hex: #'+text.split('#')[1];
            }
        }

        if(key.includes('animation') || key.includes('backgroundGradient')){

        }else{
            self.colorPicker.applyTo.style[key] = color;
        }

        self.controller._updateModelState({ color });
    }

    rgb2hex(rgb){
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    }
}
