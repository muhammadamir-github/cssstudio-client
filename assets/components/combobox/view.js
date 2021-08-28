class ComboboxView{
    constructor(){
        this._element = null;
        this.textKeyMap = {
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
            "Box Shadow": { key: "boxShadowColor", valueSuffix: "", keyValueSuffix: "" },
            "Text Decoration Color": { key: "textDecorationColor", valueSuffix: "", keyValueSuffix: "" },
            "Duration": { key: "animatedr", valueSuffix: "s", keyValueSuffix: "s" },
            "Delay": { key: "animated", valueSuffix: "s", keyValueSuffix: "s" },
            "Iteration": { key: "animatei", valueSuffix: "", keyValueSuffix: "" },
            "Percentage": { key: "slidePercentage", valueSuffix: "%", keyValueSuffix: "%" },
            "Opacity": { key: "slideOpacity", valueSuffix: "", keyValueSuffix: "" },
            "Color 1": { key: "backgroundGradient1", valueSuffix: "", keyValueSuffix: "" },
            "Color 2": { key: "backgroundGradient2", valueSuffix: "", keyValueSuffix: "" }
        };

        this.colorPicker = {
            isdragging: false,
            applyTo: null
        };

        this.data = {};
    }

    create(options = {}){
        const self = this;
        const parent = options.parent;
        const elementType = options.elementType;
        const data = options.data;

        self.data = {...data, elementType};

        const structure = {
            type: "combobox",
            parent,
            id: data.id,
            style: data.style,
            before: options.before,
            prepend: options.prepend,
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
                                        click: function(e){
                                            self.toggle(e, self);
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
                                    keyup: function(e){ self.customValueChange(e, self); },
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
                                            //var colorpicker = document.getElementById(data.colorPicker.id);

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
                                                    self.isdragging = true;
                                                    self.color(e);
                                                },
                                                mouseup: function(e){
                                                    if(self.isdragging){
                                                        self.color(e);
                                                    }
                                                },
                                                mousemove: function(e){
                                                    self.isdragging = false;
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
                                                        classes: i === data.options.length-1 ? [ "lastoption" ] : null,
                                                        listeners: {
                                                            click: function(){
                                                                self.changeValue(this.innerText);
                                                            }
                                                        },
                                                        children: [
                                                            {
                                                                type: "span",
                                                                text: option,
                                                                classes: [ "value" ],
                                                            }
                                                        ]
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
            }, 250);
        }
    }

    customValueChange(e, self){
        let selected_a_span = e.target.parentElement.getElementsByTagName("a")[0].getElementsByTagName("span")[0];

        let key = self.textKeyMap[self.data.text].key;
        let valueSuffix = self.textKeyMap[self.data.text].valueSuffix;
        let keyValueSuffix = self.textKeyMap[self.data.text].keyValueSuffix;

        if(self.data.customValue.call === "updateElement"){
            selected_a_span.innerText = `${self.data.text}: ${e.target.value}${valueSuffix}`;
            updateElement(self.data.elementType, key, e.target.value+valueSuffix);
        }else{
            if(self.data.customValue.call === "dataAttributeBalancer"){
                selected_a_span.innerText = `${self.data.text}: ${e.target.value}`;
                self.dataAttributeBalancer(key, e.target.value);
            }else{
                if(self.data.customValue.call === "updatePageElement"){
                    selected_a_span.innerText = `${self.data.text}: ${e.target.value}${valueSuffix}`;
                    document.getElementsByClassName('selected')[0].style[key] = `${e.target.value}${keyValueSuffix}`;
                }
            }
        }
    }

    changeValue(value){
        this._element.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = `${this.data.text}: ${value}`;
        this._element.getElementsByTagName('options')[0]/*.getElementsByTagName('ul')[0]*/.style.display = 'none';

        let applyTo = document.getElementById(`preview${this.data.elementType}`) || document.getElementsByClassName(`selected`)[0];
        if(applyTo && applyTo.classList.contains("selected")){
            if(this.data.id === "googlefonts"){
                applyTo.style.fontFamily = value;
            }

            this._element.classList.remove('selectedCombobox');
        }else{
            if(this.data.id === "timing"){
                updateElement(this.data.elementType, 'atiming', value);
                //tb(element, 'animatet', value); tb calls updateElement
            }else{
                if(this.data.id === "googlefonts"){
                    updateElement(this.data.elementType, 'googlefonts', value);
                }else{
                    if(this.data.id === "endx" || this.data.id === "endy"){
                        tb(this.data.elementType,'bgge'+this.data.id.replace("end", ""), value);
                    }else{
                        let key = this.textKeyMap[this.data.text].key;
                        updateElement(this.data.elementType, key, value);
                    }
                }
            }
        }
    }

    toggle(e, self){
        if(e.target.tagName == "SPAN"){
            let options = e.target.parentElement.parentElement.parentElement.getElementsByTagName("options");
            let customValue = e.target.parentElement.parentElement.getElementsByClassName("custom")[0] || e.target.parentElement.parentElement.getElementsByClassName("customlarge")[0];
            let combobox = e.target.parentElement.parentElement.parentElement;
            let colordisplay = e.target.parentElement.parentElement.getElementsByTagName("colordisplay");
            let selected_a_span = e.target;

            if(options[0]){
                options = options[0];
                let options_ul = options.getElementsByTagName("ul");

                if(options_ul[0]){
                    options_ul = options_ul[0];
                    if(options.style.display == 'block'){
                        options.style.display = 'none';
                        options_ul.style.display = 'none';
                    }else{
                        options.style.display = 'block';
                        options_ul.style.display = 'block';
                    }
                }
            }

            if(customValue){
                if(customValue.style.display == 'block'){
                    customValue.style.display = 'none';
                    selected_a_span.style.textAlign = 'unset';
                }else{
                    customValue.style.display = 'block';
                    selected_a_span.style.textAlign = 'left';
                }
            }

            if(colordisplay[0]){
                colordisplay = colordisplay[0];
                if(colordisplay.style.display == 'block'){
                    colordisplay.style.display = 'none';
                    combobox.style.textAlign = 'unset';
                }else{
                    colordisplay.style.display = 'block';
                    combobox.style.textAlign = 'left';
                }
            }

            if(self.colorPicker.applyTo && self.colorPicker.applyTo.classList.contains("selected")){
                combobox.classList.add('selectedCombobox');
            }
        }
    }

    dataAttributeBalancer(property, value){
        var sSlide = document.getElementsByClassName('slideSelected')[0];
        var attributesAvailable = $(sSlide).attr('data-attr-avail');
        var propertySplited = property.split('slide')[1];

        if(value == '' || property == ''){

        }else{
            if(value == '0' || value == '0px' || value == '0%' || value != ' %' || value != ' px' || value != ''){
                //checks for first action availability.
                if($(sSlide).attr('data-action-one') == propertySplited){
                    sSlide.setAttribute('data-action-one-value',value);
                }else{
                    //checks for second action availability.
                    if($(sSlide).attr('data-action-two') == propertySplited){
                        sSlide.setAttribute('data-action-two-value',value);
                    }else{
                        //checks for third action availability.
                        if($(sSlide).attr('data-action-three') == propertySplited){
                            sSlide.setAttribute('data-action-three-value',value);
                        }else{
                            //checks for fourth action availability.
                            if($(sSlide).attr('data-action-four') == propertySplited){
                                sSlide.setAttribute('data-action-four-value',value);
                            }else{
                                //if no action's property is matched with the property , create a new action.
                                if(attributesAvailable == '1'){
                                    sSlide.setAttribute('data-action-four',propertySplited);
                                    sSlide.setAttribute('data-action-four-value',value);
                                    sSlide.setAttribute('data-attr-avail','0');
                                }

                                if(attributesAvailable == '2'){
                                    sSlide.setAttribute('data-action-three',propertySplited);
                                    sSlide.setAttribute('data-action-three-value',value);
                                    sSlide.setAttribute('data-attr-avail','1');
                                }

                                if(attributesAvailable == '3'){
                                    sSlide.setAttribute('data-action-two',propertySplited);
                                    sSlide.setAttribute('data-action-two-value',value);
                                    sSlide.setAttribute('data-attr-avail','2');
                                }

                                if(attributesAvailable == '4'){
                                    sSlide.setAttribute('data-action-one',propertySplited);
                                    sSlide.setAttribute('data-action-one-value',value);
                                    sSlide.setAttribute('data-attr-avail','3');
                                }

                                if(attributesAvailable == '0'){
                                    Globals.notificationHandler.new('Error , No more actions can be assigned to this slide.');
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    updateStrip(e, self){
        let strip = document.getElementById(`${self.data.colorPicker.idPrefix}cps`);
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
        let box = document.getElementById(`${this.data.colorPicker.idPrefix}cpb`);
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
            self.colorPicker.applyto = document.getElementsByClassName('selected')[0];
        }else{
            self.colorPicker.applyto = document.getElementById(forid);
        }

        self.updateStrip(null, self);
        self.updateBox();
    }

    fillGradient(rgba){
        let box = document.getElementById(`${this.data.colorPicker.idPrefix}cpb`);
        let box2d = box.getContext('2d');
        let boxwidth = box.width;
        let boxheight = box.height;

        let strip = document.getElementById(`${this.data.colorPicker.idPrefix}cps`);
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

        let key = self.textKeyMap[self.data.text].key;

        let boxid = `${self.data.colorPicker.idPrefix}cpb`;
        let stripid = `${self.data.colorPicker.idPrefix}cps`;

        let box = document.getElementById(boxid);
        let box2d = box.getContext('2d');

        let displayinvoker = `${self.data.colorPicker.idPrefix}cd`;
        let display = document.getElementById(displayinvoker);
        let rgbainput = document.getElementById(`${self.data.colorPicker.idPrefix}cprgba`);
        let hexinput = document.getElementById(`${self.data.colorPicker.idPrefix}cphex`);

        let xaxis = e.offsetX;
        let yaxis = e.offsetY;

        var imagedata = box2d.getImageData(xaxis, yaxis, 1, 1).data;
        let rgba = 'rgba(' + imagedata[0] + ',' + imagedata[1] + ',' + imagedata[2] + ',1)';
        var hexfromrgba = rgb2hex(rgba);

        if(boxid.includes('animate') || stripid.includes('animate')){
            self.dataAttributeBalancer('slide'+displayinvoker, rgba);
        }else{
            if(key == 'backgroundColor'){
                self.colorPicker.applyto.style.backgroundColor = rgba;
            }

            if(key == 'color'){
                self.colorPicker.applyto.style.color = rgba;
            }

            if(key == 'borderColor'){
                if(self.colorPicker.applyto.style.borderColor != ''){
                    self.colorPicker.applyto.style.bordercolor = '';
                    self.colorPicker.applyto.style.borderColor = rgba;
                }else{
                    if(self.colorPicker.applyto.style.borderBottomColor != ''){
                        self.colorPicker.applyto.style.borderBottomColor = rgba;
                    }else{
                        self.colorPicker.applyto.style.bordercolor = '';
                        self.colorPicker.applyto.style.borderColor = rgba;
                    }
                }
            }

            if(key == 'textDecorationColor'){
                self.colorPicker.applyto.style.textDecorationColor = rgba;
            }

            if(key == 'boxShadow'){
                var currentboxshadow = self.colorPicker.applyto.style.boxShadow;

                if(currentboxshadow.includes('rgb')){
                    var newboxshadow = self.colorPicker.applyto.style.boxShadow.split(')')[1];
                    self.colorPicker.applyto.style.boxShadow = rgba + newboxshadow;
                }else{
                    var newboxshadow = self.colorPicker.applyto.style.boxShadow;
                    self.colorPicker.applyto.style.boxShadow = rgba + newboxshadow;
                }
            }

            if(key == 'textShadow'){
                var currenttextshadow = self.colorPicker.applyto.style.textShadow;

                if(currenttextshadow.includes('rgb')){
                    var newtextshadow = self.colorPicker.applyto.style.textShadow.split(')')[1];
                    self.colorPicker.applyto.style.textShadow = rgba + newtextshadow;
                }else{
                    var newtextshadow = self.colorPicker.applyto.style.textShadow;
                    self.colorPicker.applyto.style.textShadow = rgba + newtextshadow;
                }
            }

            if(key == 'outlineColor'){
                self.colorPicker.applyto.style.outlineColor = rgba;
            }
        }

        display.style.backgroundColor = rgba;
        rgbainput.value = 'Color Rgba: ' + rgba;
        hexinput.value = 'Color Hex: ' + rgb2hex(rgba);
    }

    textToColorPickerColor(e){
        // update color from input
        const self = this;

        let key = self.textKeyMap[self.data.text].key;

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
    }
}
