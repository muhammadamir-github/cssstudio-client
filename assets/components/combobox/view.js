class ComboboxView{
    constructor(){
        this._element = null;
        this.colorPicker = {
            isdragging: false,
            applyTo: null
        };

        this.data = {};
    }

    async create(options = {}){
        const self = this;
        const parent = options.parent;
        const element = options.elementType;
        const data = options.data;

        self.data = data;

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
                                        click: self.toggle,
                                    }
                                }
                            ]
                        },
                        ...(() => {
                            return typeof data.customValue === "object" && data.customValue !== null ? [{
                                type: "input",
                                classes: [ "custom" ],
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
                                                    textToColorPickerColor(this, data.colorPicker.key, data.elementType);
                                                }
                                            }
                                        },
                                        {
                                            type: "input",
                                            attributes: { placeholder: "Color Hex: " },
                                            id: `${data.colorPicker.idPrefix}cphex`,
                                            listeners: {
                                                input: function(){
                                                    textToColorPickerColor(this, data.colorPicker.key, data.elementType);
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
                {
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
                }
            ]
        };

        self._element = await Globals.elements.newAsync(structure);

        if(typeof data.colorPicker === "object" && data.colorPicker !== null){
            self.setupColorPicker(`preview${element}`);
        }
    }

    customValueChange(e, self){
        let selected_a_span = e.target.parentElement.getElementsByTagName("a")[0].getElementsByTagName("span")[0];

        if(self.data.customValue.call === "updateElement"){
            selected_a_span.innerText = `${self.data.text}: ${e.target.value}${self.data.customValue.valueSuffix}`;
            updateElement(self.data.elementType, self.data.customValue.key, e.target.value+self.data.customValue.valueSuffix);
        }else{
            if(self.data.customValue.call === "dataAttributeBalancer"){
                selected_a_span.innerText = `${self.data.text}: ${e.target.value}`;
                self.dataAttributeBalancer(self.data.customValue.key, e.target.value);
            }
        }
    }

    changeValue(value){
        this._element.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = `${this.data.text}: ${value}`;
        this._element.getElementsByTagName('options')[0]/*.getElementsByTagName('ul')[0]*/.style.display = 'none';

        if(this.data.id === "timing"){
            updateElement(this.data.elementType, 'atiming', value);
            //tb(element, 'animatet', value); tb calls updateElement
        }
    }

    toggle(e){
        if(e.target == this){
            let options = this.parentElement.parentElement.parentElement.getElementsByTagName("options");
            let customValue = this.parentElement.parentElement.getElementsByClassName("custom");
            let combobox = this.parentElement.parentElement.parentElement;
            let colordisplay = this.parentElement.parentElement.getElementsByTagName("colordisplay");
            let selected_a_span = this;

            if(options[0]){
                options = options[0];
                let options_ul = options.getElementsByTagName("ul")[0];

                if(options_ul[0]){
                    options_ul = options_ul[0];
                    if(options.style.display == 'block'){
                        options.style.display = 'none';
                        options_ul.style.display = 'none';
                        selected_a_span.style.textAlign = '';
                    }else{
                        options.style.display = 'block';
                        options_ul.style.display = 'block';
                        selected_a_span.style.textAlign = 'left';
                    }
                }
            }

            if(customValue[0]){
                customValue = customValue[0];
                if(customValue.style.display == 'block'){
                    customValue.style.display = 'none';
                    selected_a_span.style.textAlign = '';
                }else{
                    customValue.style.display = 'block';
                    selected_a_span.style.textAlign = 'left';
                }
            }

            if(colordisplay[0]){
                colordisplay = colordisplay[0];
                if(colordisplay.style.display == 'block'){
                    colordisplay.style.display = 'none';
                    combobox.style.textAlign = '';
                }else{
                    colordisplay.style.display = 'block';
                    combobox.style.textAlign = 'left';
                }
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

        if(forid == '.selected'){
            self.applyto = document.getElementsByClassName('selected')[0];
        }else{
            self.applyto = document.getElementById(forid);
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
        const self = this;

        let boxid = `${this.data.colorPicker.idPrefix}cpb`;
        let box = document.getElementById(boxid);
        let box2d = box.getContext('2d');

        let displayinvoker = `${this.data.colorPicker.idPrefix}cd`;
        let display = document.getElementById(displayinvoker);
        let rgbainput = document.getElementById(`${this.data.colorPicker.idPrefix}cprgba`);
        let hexinput = document.getElementById(`${this.data.colorPicker.idPrefix}cphex`);

        let xaxis = e.offsetX;
        let yaxis = e.offsetY;

        var imagedata = box2d.getImageData(xaxis, yaxis, 1, 1).data;
        let rgba = 'rgba(' + imagedata[0] + ',' + imagedata[1] + ',' + imagedata[2] + ',1)';
        var hexfromrgba = rgb2hex(rgba);

        if(boxid.includes('animate') || stripid.includes('animate')){
            self.dataAttributeBalancer('slide'+displayinvoker, rgba);
        }else{
            if(property == 'background'){
                self.applyto.style.backgroundColor = rgba;
            }

            if(property == 'font'){
                self.applyto.style.color = rgba;
            }

            if(property == 'border'){
                if(self.applyto.style.borderColor != ''){
                    self.applyto.style.bordercolor = '';
                    self.applyto.style.borderColor = rgba;
                }else{
                    if(self.applyto.style.borderBottomColor != ''){
                        self.applyto.style.borderBottomColor = rgba;
                    }else{
                        self.applyto.style.bordercolor = '';
                        self.applyto.style.borderColor = rgba;
                    }
                }
            }

            if(property == 'textdecorationcolor'){
                self.applyto.style.textDecorationColor = rgba;
            }

            if(property == 'boxshadowcolor'){
                var currentboxshadow = self.applyto.style.boxShadow;

                if(currentboxshadow.includes('rgb')){
                    var newboxshadow = self.applyto.style.boxShadow.split(')')[1];
                    self.applyto.style.boxShadow = rgba + newboxshadow;
                }else{
                    var newboxshadow = self.applyto.style.boxShadow;
                    self.applyto.style.boxShadow = rgba + newboxshadow;
                }
            }

            if(property == 'textshadowcolor'){
                var currenttextshadow = self.applyto.style.textShadow;

                if(currenttextshadow.includes('rgb')){
                    var newtextshadow = self.applyto.style.textShadow.split(')')[1];
                    self.applyto.style.textShadow = rgba + newtextshadow;
                }else{
                    var newtextshadow = self.applyto.style.textShadow;
                    self.applyto.style.textShadow = rgba + newtextshadow;
                }
            }

            if(property == 'outlinecolor'){
                self.applyto.style.outlineColor = rgba;
            }
        }

        display.style.backgroundColor = rgba;
        rgbainput.value = 'Color Rgba: ' + rgba;
        hexinput.value = 'Color Hex: ' + rgb2hex(rgba);
    }
}
