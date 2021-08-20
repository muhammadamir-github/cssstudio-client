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
            BillyAssistant.leave();
        }else{
            BillyAssistant.spawn();
        }

    });

    callbillyElement.style.opacity = '1';
    callbillyElement.style.pointerEvents = 'unset';

},15000);

//---------------------------------------------------------------

class BillyTheAssistant{
    constructor(){}

    ready(elementtype){

        for(var i=0; i < billy_orders_types.length; i++){
            billy_orders_types[i].addEventListener('click',function(){

                var datapaneltrigger = $(this).attr('data-panel-trigger');

                (function(datapaneltrigger){
                    setTimeout(function(){
                        if(datapaneltrigger == 'suggestion'){
                            billy_tongue.innerText = 'Alright, suggestion for what?';
                        }else{
                            if(datapaneltrigger == 'calculation'){
                                billy_tongue.innerText = 'What do you want me to calculate?';
                            }
                        }
                    },1000);
                })(datapaneltrigger);

                for(var j = 0; j < billy_orders_types.length; j++){
                    if($(billy_orders_types[j]).attr('data-panel-trigger') == datapaneltrigger){

                    }else{
                        billy_orders_types[j].style.pointerEvents = 'none';

                        (function(billy_orders_types,j){
                            setTimeout(function(){billy_orders_types[j].style.pointerEvents = 'unset';},1000);
                        })(billy_orders_types,j);
                    }
                }

                for(var o=0; o < billy_orders.length; o++){

                    if($(billy_orders[o]).attr('class') == datapaneltrigger){
                        billy_orders[o].style.display = 'block';

                        var spinner = this.getElementsByClassName('billyspinner')[0];
                        spinner.style.opacity = '1';

                        (function(spinner,billy_orders,o){
                            setTimeout(function(){spinner.style.opacity = '0'; billy_orders[o].style.opacity = '1'; },1000);
                        })(spinner,billy_orders,o);

                    }else{
                        billy_orders[o].style.display = 'none';

                        (function(billy_orders,o){
                            setTimeout(function(){billy_orders[o].style.opacity = '0'; },1000);
                        })(billy_orders,o);
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
                                var targetfontcolor = new color(target.style.color);
                                suggestor.display('BackgroundColor',targetfontcolor.matchingFontColor,helper.hexToRGB(targetfontcolor.matchingFontColor));
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
                                    var targetbgcolor = new color(target.style.backgroundColor);
                                    suggestor.display('FontColor',targetbgcolor.matchingFontColor,helper.hexToRGB(targetbgcolor.matchingFontColor));
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

            BillyAssistant.ready(elementtype);

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

var BillyAssistant = new BillyTheAssistant();
var assets = new Storage();

class Storage{
    constructor(){}
}

class suggest{
    constructor(){}

    fontColor(hex,type){
        if(type == 'Dark'){
            return helper.lighten(hex,75);
        }else{
            if(type == 'Light'){
                return helper.darken(hex,35);
            }
        }
    }

    display(type,hex,rgb){

        $('suggestion').remove();

        billy_tongue.innerText = 'Give me few secs please...';

        //billy.style.opacity = '0.3';
        billy.style.pointerEvents = 'none';
        callbillyElement.style.pointerEvents = 'none';

        var suggestion = document.createElement('suggestion');
        var suggestion_p = document.createElement('p');
        var suggestion_vline = document.createElement('verticalline');
        var suggestion_colordisplay = document.createElement('color');
        var suggestion_close = document.createElement('i');
        var suggestion_hex = document.createElement('input');
        var suggestion_rgb = document.createElement('input');
        var suggestion_preview = document.createElement('button');
        var suggestion_apply = document.createElement('button');

        suggestion.appendChild(suggestion_p);
        suggestion.appendChild(suggestion_vline);
        suggestion.appendChild(suggestion_colordisplay);
        suggestion.appendChild(suggestion_close);
        suggestion.appendChild(suggestion_hex);
        suggestion.appendChild(suggestion_rgb);
        suggestion.appendChild(suggestion_apply);
        suggestion.appendChild(suggestion_preview);

        if(type == 'FontColor'){
            suggestion.setAttribute('class','fc-suggestion');
        }else{
            if(type == 'BackgroundColor'){
                suggestion.setAttribute('class','bgc-suggestion');
            }
        }

        suggestion_colordisplay.style.backgroundColor = hex;
        suggestion_close.setAttribute('class','fas fa-times close');
        suggestion_close.addEventListener('click',function(){
            if(type == 'FontColor'){
                $('.fc-suggestion').remove();
            }else{
                if(type == 'BackgroundColor'){
                    $('.bgc-suggestion').remove();
                }
            }
        });

        suggestion_rgb.setAttribute('type','text');
        suggestion_hex.setAttribute('type','text');
        suggestion_rgb.setAttribute('placeholder','RGB: ');
        suggestion_hex.setAttribute('placeholder','Hex: ');
        suggestion_rgb.setAttribute('class','rgb');
        suggestion_hex.setAttribute('class','hex');

        suggestion_preview.setAttribute('class','previewbtn');
        suggestion_apply.setAttribute('class','applybtn');

        suggestion_apply.addEventListener('click',function(){
            var target = document.getElementById('preview'+elementtype);

            if(type == 'FontColor'){
                target.style.color = hex;
                $('.fc-suggestion').remove();
            }else{
                if(type == 'BackgroundColor'){
                    target.style.backgroundColor = hex;
                    $('.bgc-suggestion').remove();
                }
            }
        });

        suggestion_preview.addEventListener('mouseover',function(){

            var target = document.getElementById('preview'+elementtype);

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

        });

        suggestion_rgb.value = 'RGB: '+rgb;
        suggestion_hex.value = 'Hex: '+hex;

        suggestion_preview.innerText = 'Preview';
        suggestion_apply.innerText = 'Apply';

        suggestion_preview.style.backgroundColor = '#1a1a1a';
        suggestion_apply.style.backgroundColor = '#1a1a1a';
        suggestion_preview.style.color = 'white';
        suggestion_apply.style.color = 'white';

        if(type == 'FontColor'){
            suggestion_p.innerText = 'Billy has suggested you a font color.';
        }else{
            if(type == 'BackgroundColor'){
                suggestion_p.innerText = 'Billy has suggested you a Background color.';
            }
        }

        setTimeout(function(){
            document.getElementsByTagName('body')[0].appendChild(suggestion);
        },5000);

        setTimeout(function(){
            billy_tongue.innerText = 'Let me know if you need anything else.';

            //billy.style.opacity = '1';
            billy.style.pointerEvents = 'unset';
            callbillyElement.style.pointerEvents = 'unset';

            setTimeout(function(){
                BillyAssistant.leave();
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

//---------------------------------------------------------------

class help{
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

var helper = new help();
var suggestor = new suggest();

class color{
    constructor(colorInput){

        this.rgb = colorInput;
        this.hex = helper.rgbToHex(this.rgb);

        if (colorInput.match(/^rgb/)) {
            // If HEX --> store the red, green, blue values in separate variables
            colorInput = colorInput.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

            this.r = colorInput[1];
            this.g = colorInput[2];
            this.b = colorInput[3];
        }
        else {
            // If RGB --> Convert it to HEX: http://gist.github.com/983661
            colorInput = +("0x" + colorInput.slice(1).replace(
                colorInput.length < 5 && /./g, '$&$&'));

                this.r = colorInput >> 16;
                this.g = colorInput >> 8 & 255;
                this.b = colorInput & 255;
            }

            /*this.hsl = helper.hsl(this.r,this.g,this.b);
            this.h = this.hsl[0];
            this.s = this.hsl[1];
            this.l = this.hsl[2];*/

            this.type = helper.colorType(this.r,this.g,this.b);
            this.matchingFontColor = suggestor.fontColor(this.hex,this.type);
        }

        apply(){
            document.getElementsByTagName('body')[0].style.backgroundColor = 'rgba('+this.r+','+this.g+','+this.b+',1)';
            document.getElementsByTagName('h2')[0].style.color = this.matchingFontColor;
        }

    }
