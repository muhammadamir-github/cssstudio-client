var billy = '';
var callbillyElement = '';
var billy_tongue = '';
var billy_orders_div = '';
var billy_orders = '';
var billy_orders_types = '';

setTimeout(function(){
    billy = document.getElementsByTagName('billy')[0];
    callbillyElement = document.getElementsByTagName('callbilly')[0];
    billy_tongue = billy.getElementsByTagName('tongue')[0];
    billy_orders_div = billy.getElementsByTagName('orders')[0];
    billy_orders = billy_orders_div.getElementsByTagName('order');
    billy_orders_types = billy_orders_div.getElementsByTagName('type');

    callbillyElement.addEventListener('click',function(){
        if(billy_tongue.style.display == 'block'){
            Globals.pageHandler.BillyAssistant.leave();
        }else{
            Globals.pageHandler.BillyAssistant.spawn();
        }
    });

    callbillyElement.style.opacity = '1';
    callbillyElement.style.pointerEvents = 'unset';
},15000);

//---------------------------------------------------------------

class Suggest{
    constructor(){
        this.helper = new Helper;
    }

    fontColor(hex,type){
        const self = this;
        if(type == 'Dark'){
            return self.helper.lighten(hex,75);
        }else{
            if(type == 'Light'){
                return self.helper.darken(hex,35);
            }
        }
    }

    display(type,hex,rgb){
        $('suggestion').remove();

        billy_tongue.innerText = 'Give me few secs please...';

        //billy.style.opacity = '0.3';
        billy.style.pointerEvents = 'none';
        callbillyElement.style.pointerEvents = 'none';

        var suggestion = Globals.elements.new({
            type: "suggestion",
            parent: Globals.window.body,
            children: [
                {
                    type: "p",
                    text: `${type == 'FontColor' ? 'Billy has suggested you a font color.' : 'Billy has suggested you a Background color.'}`
                },
                { type: "verticalline" },
                {
                    type: "color",
                    style: { backgroundColor: hex },
                },
                {
                    type: "i",
                    classes: [ "fas fa-times close" ],
                    listeners: {
                        click: () => {
                            if(type == 'FontColor'){
                                $('.fc-suggestion').remove();
                            }else{
                                if(type == 'BackgroundColor'){
                                    $('.bgc-suggestion').remove();
                                }
                            }
                        }
                    }
                },
                {
                    type: "input",
                    classes: [ "hex" ],
                    attributes: {
                        type: "text",
                        placeholder: "Hex: ",
                        value: "Hex: "+hex
                    }
                },
                {
                    type: "input",
                    classes: [ "rgb" ],
                    attributes: {
                        type: "text",
                        placeholder: "RGB: ",
                        value: "RGB: "+rgb
                    }
                },
                {
                    type: "button",
                    classes: [ "previewbtn" ],
                    text: "Preview",
                    style: {
                        backgroundColor: '#1a1a1a',
                        color: 'white'
                    },
                    listeners: {
                        mouseover: (e) => {
                            var target = document.getElementById('preview'+Globals.pageHandler.BillyAssistant.elementtype);

                            if(type == 'FontColor'){
                                var previouscolor = target.style.color;
                                target.style.color = hex;

                                this.addEventListener('mouseleave',function(){
                                    target.style.color = previouscolor;
                                });
                            }else{
                                if(type == 'BackgroundColor'){
                                    var previouscolor = target.style.backgroundColor;
                                    target.style.backgroundColor = hex;

                                    this.addEventListener('mouseleave',function(){
                                        target.style.backgroundColor = previouscolor;
                                    });
                                }
                            }
                        }
                    }
                },
                {
                    type: "button",
                    classes: [ "applybtn" ],
                    text: "Apply",
                    style: {
                        backgroundColor: '#1a1a1a',
                        color: 'white'
                    },
                    listeners: {
                        click: () => {
                            var target = document.getElementById('preview'+Globals.pageHandler.BillyAssistant.elementtype);

                            if(type == 'FontColor'){
                                target.style.color = hex;
                                $('.fc-suggestion').remove();
                            }else{
                                if(type == 'BackgroundColor'){
                                    target.style.backgroundColor = hex;
                                    $('.bgc-suggestion').remove();
                                }
                            }
                        }
                    }
                },
            ],
            classes: [ `${type == 'FontColor' ? 'fc-suggestion' : 'bgc-suggestion'}` ],
        });

        var suggestion_p = suggestion.getElementsByTagName('p')[0];
        var suggestion_vline = suggestion.getElementsByTagName('verticalline')[0];
        var suggestion_colordisplay = suggestion.getElementsByTagName('color')[0];
        var suggestion_close = suggestion.getElementsByTagName('i')[0];
        var suggestion_hex = suggestion.getElementsByTagName('input')[0];
        var suggestion_rgb = suggestion.getElementsByTagName('input')[0];
        var suggestion_preview = suggestion.getElementsByTagName('button')[0];
        var suggestion_apply = suggestion.getElementsByTagName('button')[0];

        setTimeout(function(){
            billy_tongue.innerText = 'Let me know if you need anything else.';

            //billy.style.opacity = '1';
            billy.style.pointerEvents = 'unset';
            callbillyElement.style.pointerEvents = 'unset';

            setTimeout(function(){
                Globals.pageHandler.BillyAssistant.leave();
            },2000);

            setTimeout(function(){
                billy_tongue.innerText = 'Hey , how can i help you today?';
            },5000);

        },6000);

        setTimeout(function(){
            suggestion_p.style.display = 'inline-block';
            suggestion_vline.style.display = 'block';
            suggestion_colordisplay.style.display = 'inline-block';
            suggestion_hex.style.display = 'inline-block';
            suggestion_rgb.style.display = 'inline-block';
            suggestion_apply.style.display = 'inline-block';
            suggestion_preview.style.display = 'inline-block';
        },8000);

        setTimeout(function(){
            suggestion_p.style.opacity = '1';
            suggestion_vline.style.opacity = '1';
            suggestion_colordisplay.style.opacity = '1';
            suggestion_hex.style.opacity = '1';
            suggestion_rgb.style.opacity = '1';
            suggestion_apply.style.opacity = '1';
            suggestion_preview.style.opacity = '1';
        },8100);

    }

}

class BillyTheAssistant{
    constructor(){
        this.helper = new Helper;
        this.suggestor = new Suggest;
        this.elementtype = null;
    }

    ready(elementtype){
        const self = this;
        self.elementtype = elementtype;

        for(var i=0; i < billy_orders_types.length; i++){
            billy_orders_types[i].addEventListener('click',function(){

                var datapaneltrigger = $(this).attr('data-panel-trigger');

                setTimeout(function(){
                    if(datapaneltrigger == 'suggestion'){
                        billy_tongue.innerText = 'Alright, suggestion for what?';
                    }else{
                        if(datapaneltrigger == 'calculation'){
                            billy_tongue.innerText = 'What do you want me to calculate?';
                        }
                    }
                },1000);

                for(var j = 0; j < billy_orders_types.length; j++){
                    if($(billy_orders_types[j]).attr('data-panel-trigger') == datapaneltrigger){

                    }else{
                        billy_orders_types[j].style.pointerEvents = 'none';

                        setTimeout(function(){billy_orders_types[j].style.pointerEvents = 'unset';},1000);
                    }
                }

                for(var o=0; o < billy_orders.length; o++){
                    if($(billy_orders[o]).attr('class') == datapaneltrigger){
                        billy_orders[o].style.display = 'block';

                        var spinner = this.getElementsByClassName('billyspinner')[0];
                        spinner.style.opacity = '1';

                        setTimeout(function(){spinner.style.opacity = '0'; billy_orders[o].style.opacity = '1'; },1000);
                    }else{
                        billy_orders[o].style.display = 'none';

                        setTimeout(function(){billy_orders[o].style.opacity = '0'; },1000);
                    }
                }
            });
        }

        for(var k=0; k < billy_orders.length; k++){
            var target = document.getElementById('preview'+elementtype);
            if($(billy_orders[k]).attr('class') == 'suggestion'){
                if(billy_orders[k].innerText == 'Background Color'){
                    billy_orders[k].addEventListener('click',function(){
                        if(target !== null){
                            if(target.style.color == '' || target.style.color == null){
                                billy_tongue.innerText = 'No font color to match.';
                            }else{
                                var targetfontcolor = new Color(target.style.color);
                                self.suggestor.display('BackgroundColor',targetfontcolor.matchingFontColor, self.helper.hexToRGB(targetfontcolor.matchingFontColor));
                            }
                        }else{
                            if(target == null){
                                billy_tongue.innerText = 'Please create an element first.';
                            }
                        }
                    });
                }else{
                    if(billy_orders[k].innerText == 'Font Color'){
                        billy_orders[k].addEventListener('click',function(){
                            if(target !== null){
                                if(target.style.backgroundColor == '' || target.style.backgroundColor == null){
                                    billy_tongue.innerText = 'No background color to match.';
                                }else{
                                    var targetbgcolor = new Color(target.style.backgroundColor);
                                    self.suggestor.display('FontColor',targetbgcolor.matchingFontColor, self.helper.hexToRGB(targetbgcolor.matchingFontColor));
                                }
                            }else{
                                if(target == null){
                                    billy_tongue.innerText = 'Please create an element first.';
                                }
                            }
                        });
                    }
                }
            }else{
                if($(billy_orders[k]).attr('class') == 'calculation'){
                    //tutorials
                }
            }
        }

    }

    spawn(){
        const self = this;
        billy_orders_div.style.display = 'none';
        billy_orders_div.style.opacity = '0';

        billy_tongue.style.display = 'none';
        billy_tongue.style.opacity = '0';

        billy.style.display = 'block';
        billy.style.opacity = '1';

        billy.classList.add('spawnbilly');

        setTimeout(function(){
            billy_orders_div.style.display = 'block';
            billy_tongue.style.display = 'block';
            billy.classList.remove('spawnbilly');
        },2000);

        setTimeout(function(){
            billy_orders_div.style.opacity = '1';
            billy_tongue.style.opacity = '1';

            Globals.pageHandler.BillyAssistant.ready(self.elementtype);
        },2200);
    }

    leave(){
        billy_orders_div.style.opacity = '0';
        billy_tongue.style.opacity = '0';

        setTimeout(function(){
            billy_orders_div.style.display = 'none';
            billy_tongue.style.display = 'none';
            billy.classList.add('leavebilly');

            setTimeout(function(){
                billy.classList.remove('leavebilly');
                billy.style.display = 'none';
                billy.style.opacity = '0';
            },1000);
        },1000);
    }
}

//---------------------------------------------------------------

class Helper{
    constructor(){}

    rgbToHex(rgb){
        rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
        return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
    }

    hexToRGB(hex){
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        var r = parseInt(result[1], 16);
        var g = parseInt(result[2], 16);
        var b = parseInt(result[3], 16);
        return 'rgb(' + r + ',' + g + ',' + b + ')';
    }

    colorType(r,g,b){
        // HSP (Highly Sensitive Poo) equation from http://alienryderflex.com/hsp.html
        var hsp = Math.sqrt(
            0.299 * (r * r) +
            0.587 * (g * g) +
            0.114 * (b * b)
        );

        // Using the HSP value, determine whether the color is light or dark
        if (hsp>127.5) {
            this.type = 'Light';
            return 'Light';
        }
        else {
            this.type = 'Dark';
            return 'Dark';
        }
    }

    hsl(r,g,b){
        var min, max, delta, h, s, l;

        min = Math.min(r, Math.min(g, b));
        max = Math.max(r, Math.max(g, b));
        delta = max - min;
        l = (min + max) / 2;

        s = 0;
        if(l > 0 && l < 1)
        s = delta / (l < 0.5 ? (2 * l) : (2 - 2 * l));

        h = 0;
        if(delta > 0)
        {
            if (max == r && max != g) h += (g - b) / delta;
            if (max == g && max != b) h += (2 + (b - r) / delta);
            if (max == b && max != r) h += (4 + (r - g) / delta);
            h /= 6;
        }
        return [parseInt(h * 255), parseInt(s * 255), parseInt(l * 255)];
    }

    subtractLight(color, amount){
        var cc = parseInt(color,16) - amount;
        var c = (cc < 0) ? 0 : (cc);
        c = (c.toString(16).length > 1 ) ? c.toString(16) : `0${c.toString(16)}`;
        return c;
    }

    addLight(color, amount){
        var cc = parseInt(color,16) + amount;
        var c = (cc > 255) ? 255 : (cc);
        c = (c.toString(16).length > 1 ) ? c.toString(16) : `0${c.toString(16)}`;
        return c;
    }

    lighten(color, amount){
        color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
        amount = parseInt((255*amount)/100);
        return color = `#${this.addLight(color.substring(0,2), amount)}${this.addLight(color.substring(2,4), amount)}${this.addLight(color.substring(4,6), amount)}`;
    }

    darken(color, amount){
        color = (color.indexOf("#")>=0) ? color.substring(1,color.length) : color;
        amount = parseInt((255*amount)/100);
        return color = `#${this.subtractLight(color.substring(0,2), amount)}${this.subtractLight(color.substring(2,4), amount)}${this.subtractLight(color.substring(4,6), amount)}`;
    }

}

class Color{
    constructor(colorInput){
        this.helper = new Helper;
        this.suggestor = new Suggestor;
        this.rgb = colorInput;
        this.hex = this.helper.rgbToHex(this.rgb);

        if(colorInput.match(/^rgb/)){
            // If HEX --> store the red, green, blue values in separate variables
            colorInput = colorInput.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

            this.r = colorInput[1];
            this.g = colorInput[2];
            this.b = colorInput[3];
        }else{
            // If RGB --> Convert it to HEX
            colorInput = +("0x" + colorInput.slice(1).replace(
                colorInput.length < 5 && /./g, '$&$&')
            );

            this.r = colorInput >> 16;
            this.g = colorInput >> 8 & 255;
            this.b = colorInput & 255;
        }

        /*this.hsl = this.helper.hsl(this.r,this.g,this.b);
        this.h = this.hsl[0];
        this.s = this.hsl[1];
        this.l = this.hsl[2];*/

        this.type = this.helper.colorType(this.r,this.g,this.b);
        this.matchingFontColor = this.suggestor.fontColor(this.hex,this.type);
    }

    apply(){
        document.getElementsByTagName('body')[0].style.backgroundColor = 'rgba('+this.r+','+this.g+','+this.b+',1)';
        document.getElementsByTagName('h2')[0].style.color = this.matchingFontColor;
    }
}
