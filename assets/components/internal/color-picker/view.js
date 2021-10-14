class InternalColorPickerView{
    constructor(controller){
        this.controller = controller;
        this._element = null;

        this.isMouseDown = false;
        this.applyTo = null; // Element to update
        this.colorDisplay = null;
        this.key = null; // Style key to update
        this.hidden = true;
    }

    create(options = {}){
        const self = this;
        const { data, parent, prepend, before, component_id } = options;

        self._element = Globals.elements.new({
            type: "div",
            parent: parent,
            attributes: {
                "data-component-id": component_id,
            },
            classes: [ "colorpicker" ],
            id: `cp`,
            style: data.style ? data.style : null,
            children: [
                {
                    type: "canvas",
                    classes: [ "colorpickerbox" ],
                    id: `cpb`,
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
                    id: `cps`,
                    listeners: {
                        click: function(e){
                            self.updateStrip(e, self);
                        }
                    }
                },
                {
                    type: "input",
                    attributes: { placeholder: "Color Rgba: " },
                    id: `cprgba`,
                    listeners: {
                        input: function(){
                            self.textToColorPickerColor(this);
                        }
                    }
                },
                {
                    type: "input",
                    attributes: { placeholder: "Color Hex: " },
                    id: `cphex`,
                    listeners: {
                        input: function(){
                            self.textToColorPickerColor(this);
                        }
                    }
                }
            ],
            before: before,
            prepend: prepend
        });

        setTimeout(() => {
            // This timeout is required due to element being created dynamically.
            self.setupColorPicker();

            if(data.color){
                let inputElement = data.color.startsWith("#") ? document.getElementById(`cphex`) : document.getElementById(`cprgba`);
                if(inputElement){ inputElement.value = data.color; self.textToColorPickerColor(inputElement); }
            }
        }, 250);
    }

    updateStrip(e, self){
        let strip = document.getElementById(`cps`);
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
        let box = document.getElementById(`cpb`);
        var box2d = box.getContext('2d');
        var boxwidth = box.width;
        var boxheight = box.height;

        var rgba = 'rgba(255,0,0,1)';

        box2d.rect(0, 0, boxwidth, boxheight);
        self.fillGradient(rgba);
    }

    setupColorPicker(forid){
        const self = this;
        const data = self.controller._getModelState();
        self.applyTo = document.getElementById("animator-preview-element") || document.getElementsByClassName("selected-element")[0];

        self.updateStrip(null, self);
        self.updateBox();
    }

    fillGradient(rgba){
        let box = document.getElementById(`cpb`);
        let box2d = box.getContext('2d');
        let boxwidth = box.width;
        let boxheight = box.height;

        let strip = document.getElementById(`cps`);
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

    color(e, key = this.key){
        // update color from mouse
        const self = this;
        const data = self.controller._getModelState();

        self.applyTo = document.getElementById("animator-preview-element") || document.getElementsByClassName("selected-element")[0];

        let boxid = `cpb`;
        let stripid = `cps`;

        let box = document.getElementById(boxid);
        let box2d = box.getContext('2d');

        let display = self.colorDisplay;
        let rgbainput = document.getElementById(`cprgba`);
        let hexinput = document.getElementById(`cphex`);

        let xaxis = e.offsetX;
        let yaxis = e.offsetY;

        var imagedata = box2d.getImageData(xaxis, yaxis, 1, 1).data;
        let rgba = 'rgba(' + imagedata[0] + ',' + imagedata[1] + ',' + imagedata[2] + ', 1)';
        var hexfromrgba = self.rgb2hex(rgba);

        if(boxid.includes('animate') || stripid.includes('animate')){
            dataAttributeBalancer('slide'+displayinvoker, rgba);
        }else{
            if(key == 'backgroundColor'){
                self.applyTo.style.backgroundColor = rgba;
                self.callback ? self.callback(key, rgba) : false;
            }

            if(key == 'color'){
                self.applyTo.style.color = rgba;
                self.callback ? self.callback(key, rgba) : false;
            }

            if(key == 'borderColor'){
                if(self.applyTo.style.borderColor != ''){
                    self.applyTo.style.bordercolor = '';
                    self.applyTo.style.borderColor = rgba;
                }else{
                    if(self.applyTo.style.borderBottomColor != ''){
                        self.applyTo.style.borderBottomColor = rgba;
                    }else{
                        self.applyTo.style.bordercolor = '';
                        self.applyTo.style.borderColor = rgba;
                    }
                }

                self.callback ? self.callback(key, rgba) : false;
            }

            if(key == 'textDecorationColor'){
                self.applyTo.style.textDecorationColor = rgba;
                self.callback ? self.callback(key, rgba) : false;
            }

            if(key == 'boxShadow'){
                var currentboxshadow = self.applyTo.style.boxShadow;

                if(currentboxshadow.includes('rgb')){
                    var newBoxShadow = self.applyTo.style.boxShadow.split(')')[1];
                    newBoxShadow = newBoxShadow ? newBoxShadow : "0px 0px 0px";

                    self.applyTo.style.boxShadow = rgba + newBoxShadow;
                    self.callback ? self.callback(key, rgba + newBoxShadow) : false;
                }else{
                    var newBoxShadow = self.applyTo.style.boxShadow;
                    newBoxShadow = newBoxShadow ? newBoxShadow : "0px 0px 0px";

                    self.applyTo.style.boxShadow = rgba + newBoxShadow;
                    self.callback ? self.callback(key, rgba + newBoxShadow) : false;
                }
            }

            if(key == 'textShadow'){
                var currenttextshadow = self.applyTo.style.textShadow;

                if(currenttextshadow.includes('rgb')){
                    var newTextShadow = self.applyTo.style.textShadow.split(')')[1];
                    newTextShadow = newTextShadow ? newTextShadow : "0px 0px 0px";

                    self.applyTo.style.textShadow = rgba + newTextShadow;
                    self.callback ? self.callback(key, rgba + newTextShadow) : false;
                }else{
                    var newTextShadow = self.applyTo.style.textShadow;
                    newTextShadow = newTextShadow ? newTextShadow : "0px 0px 0px";

                    self.applyTo.style.textShadow = rgba + newTextShadow;
                    self.callback ? self.callback(key, rgba + newTextShadow) : false;
                }
            }

            if(key == 'outlineColor'){
                self.applyTo.style.outlineColor = rgba;
                self.callback ? self.callback(key, rgba) : false;
            }
        }

        display.style.backgroundColor = rgba;
        rgbainput.value = 'Color Rgba: ' + rgba;
        hexinput.value = 'Color Hex: ' + self.rgb2hex(rgba);

        self.controller._updateModelState({ color: rgba });
    }

    textToColorPickerColor(e, key = this.key){
        // update color from input
        const self = this;

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
            self.applyTo.style[key] = color;
            self.callback ? self.callback(key, color) : false;
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

    show(applyTo, colorDisplay, key, callback = null){
        this.colorDisplay = colorDisplay;
        this.applyTo = applyTo;
        this.key = key;
        this.callback = callback ? callback : null;

        this.controller._updateModelState({ color: colorDisplay.style.backgroundColor, });

        this._element.style.display = "flex";
        this.hidden = false;

        Globals.draggableFactory.positionElementRelatively(this._element, colorDisplay, "centerBottom");
    }

    hide(){
        this._element.style.display = "none";
        this.hidden = true;
    }

    toggle(...args){
        this.hidden ? this.show(...args) : this.hide();
    }

    refresh(){
        const data = this.controller._getModelState();//
    }
}
