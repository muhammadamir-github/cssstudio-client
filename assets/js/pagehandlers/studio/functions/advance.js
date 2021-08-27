async function advance(element,createnew){

    if(createnew == 'false'){

        var backbutton = document.createElement('button');
        backbutton.setAttribute('class','barbutton backbutton');
        backbutton.innerText = 'Go Back';
        backbutton.style.marginLeft = '10px';
        backbutton.addEventListener('click',function(){

            var spinner = document.getElementsByClassName('spinner')[0];
            spinner.style.display = 'block';

            var panel = document.getElementById('panel');
            panel.style.opacity = '0.3';
            panel.style.pointerEvents = 'none';

            var advancediv = document.getElementById('advance');

            setTimeout(function(){

                spinner.style.display = 'none';
                panel.style.opacity = '1';
                panel.style.pointerEvents = 'unset';
                advancediv.style.display = 'none';
                backbutton.remove();
                $('.info').remove();

            },1);

        });

        document.getElementsByClassName('spinner')[0].style.display = 'block';
        var panel = document.getElementById('panel');
        panel.style.opacity = '0.3';
        panel.style.pointerEvents = 'none';

        setTimeout(function(){

            $('#buttons').append(backbutton);
            document.getElementsByClassName('spinner')[0].style.display = 'none';
            document.getElementById('advance').style.display = 'block';
            panel.style.opacity = '1';
            panel.style.pointerEvents = 'unset';

        },1);

    }

    if(createnew == 'true'){

        getGoogleFonts(element,'elementCreator');

        var advancediv = document.createElement('div');
        advancediv.setAttribute('id','advance');

        var backbutton = document.createElement('button');
        backbutton.setAttribute('class','barbutton backbutton');
        backbutton.innerText = 'Go Back';
        backbutton.style.marginLeft = '10px';
        backbutton.addEventListener('click',function(){

            var spinner = document.getElementsByClassName('spinner')[0];
            spinner.style.display = 'block';

            var panel = document.getElementById('panel');
            panel.style.opacity = '0.3';
            panel.style.pointerEvents = 'none';

            var advancediv = document.getElementById('advance');

            setTimeout(function(){

                spinner.style.display = 'none';
                panel.style.opacity = '1';
                panel.style.pointerEvents = 'unset';
                advancediv.style.display = 'none';
                backbutton.remove();
                $('.info').remove();

            },1);

        });

        var advancediv1 = Globals.elements.new({
            type: "div",
            parent: advancediv,
            id: "advance_div1"
        });

        var advancediv2 = Globals.elements.new({
            type: "div",
            parent: advancediv,
            id: "bggradientdiv",
            classes: [ "box" ],
            children: [
                {
                    type: "banner",
                    children: [
                        {
                            type: "h5",
                            text: "Background Gradient"
                        }
                    ]
                },
                {
                    type: "ul",
                    classes: [ "pstick" ],
                    children: [
                        {
                            type: "li",
                            listeners: {
                                click: function(){
                                    applybgg('preview'+element);
                                }
                            }
                        }
                    ]
                }
            ]
        });

        //-------LetterSpace--------

        var letterspace = document.createElement('combobox');
        letterspace.setAttribute('id','letterspace');
        letterspace.style.left = '50%';
        letterspace.style.top = '50%';
        letterspace.style.marginTop = '25px';
        letterspace.style.marginLeft = '0px';
        letterspace.style.transform = 'translate(-50%,-50%)';

        var letterspace_customedit = document.createElement('input');
        letterspace_customedit.classList.add('custom');

        var letterspace_selected = document.createElement('selected');
        var letterspace_selected_a = document.createElement('a');
        var letterspace_selected_a_span = document.createElement('span');
        letterspace_selected_a_span.innerText = 'Letter Space';

        letterspace_selected_a.appendChild(letterspace_selected_a_span);
        letterspace_selected.appendChild(letterspace_selected_a);
        letterspace_selected.appendChild(letterspace_customedit);

        letterspace.appendChild(letterspace_selected);

        //-----------------Event Handlers--------------------

        letterspace_selected_a_span.addEventListener('click',function(e){

            if(e.target == this){

                if(letterspace_customedit.style.display == 'block'){

                    letterspace_customedit.style.display = 'none';
                    letterspace_selected_a_span.style.textAlign = '';

                }else{

                    letterspace_customedit.style.display = 'block';
                    letterspace_selected_a_span.style.textAlign = 'left';

                }

            }else{

            }

        });

        letterspace_customedit.addEventListener('keyup',function(){
            letterspace_selected_a_span.innerText = 'Letter Space: ' + this.value+'px';
            updateElement(element,'letterspace',this.value+'px');

        });

        //-------End LetterSpace--------

        //-------OutlineWidth--------

        var outlinewidth = document.createElement('combobox');
        outlinewidth.setAttribute('id','outlinewidth');
        outlinewidth.style.left = '50%';
        outlinewidth.style.transform = 'translate(-50%)';
        outlinewidth.style.zIndex = '0';

        var outlinewidth_customedit = document.createElement('input');
        outlinewidth_customedit.classList.add('custom');

        var outlinewidth_selected = document.createElement('selected');
        var outlinewidth_selected_a = document.createElement('a');
        var outlinewidth_selected_a_span = document.createElement('span');
        outlinewidth_selected_a_span.innerText = 'Outline Width';

        outlinewidth_selected_a.appendChild(outlinewidth_selected_a_span);
        outlinewidth_selected.appendChild(outlinewidth_selected_a);
        outlinewidth_selected.appendChild(outlinewidth_customedit);

        outlinewidth.appendChild(outlinewidth_selected);

        //-----------------Event Handlers--------------------

        outlinewidth_selected_a_span.addEventListener('click',function(e){

            if(e.target == this){

                if(outlinewidth_customedit.style.display == 'block'){

                    outlinewidth_customedit.style.display = 'none';
                    outlinewidth_selected_a_span.style.textAlign = '';

                }else{

                    outlinewidth_customedit.style.display = 'block';
                    outlinewidth_selected_a_span.style.textAlign = 'left';

                }

            }else{

            }

        });

        outlinewidth_customedit.addEventListener('keyup',function(){
            outlinewidth_selected_a_span.innerText = 'Outline Width: ' + this.value+'px';
            updateElement(element,'outlinewidth',this.value+'px');

        });

        //-------End OutlineWidth--------

        //-------OutlineStyle--------

        var outlinestyle = document.createElement('combobox');
        outlinestyle.setAttribute('id','outlinestyle');
        outlinestyle.style.left = '50%';
        outlinestyle.style.transform = 'translate(-50%)';
        outlinestyle.style.zIndex = '1';

        var outlinestyle_selected = document.createElement('selected');
        var outlinestyle_selected_a = document.createElement('a');
        var outlinestyle_selected_a_span = document.createElement('span');
        outlinestyle_selected_a_span.innerText = 'Outline Style';

        var outlinestyle_options = document.createElement('options');
        var outlinestyle_options_ul = document.createElement('ul');

        //------------------OutlineStyle Options--------------------
        //-------------------------1----------------------------

        var outlinestyle_options_1 = document.createElement('li');

        var outlinestyle_options_1_a = document.createElement('a');
        outlinestyle_options_1_a.innerText = 'Solid';

        var outlinestyle_options_1_a_span = document.createElement('span');
        outlinestyle_options_1_a_span.innerText = 'Solid';
        outlinestyle_options_1_a_span.setAttribute('class','value');

        outlinestyle_options_1_a.appendChild(outlinestyle_options_1_a_span);
        outlinestyle_options_1.appendChild(outlinestyle_options_1_a);

        outlinestyle_options_1.addEventListener('click',function(){
            tb(element,'osty',outlinestyle_options_1_a.innerText);
        });

        //-------------------------2----------------------------

        var outlinestyle_options_2 = document.createElement('li');

        var outlinestyle_options_2_a = document.createElement('a');
        outlinestyle_options_2_a.innerText = 'Dotted';

        var outlinestyle_options_2_a_span = document.createElement('span');
        outlinestyle_options_2_a_span.innerText = 'Dotted';
        outlinestyle_options_2_a_span.setAttribute('class','value');

        outlinestyle_options_2_a.appendChild(outlinestyle_options_2_a_span);
        outlinestyle_options_2.appendChild(outlinestyle_options_2_a);

        outlinestyle_options_2.addEventListener('click',function(){
            tb(element,'osty',outlinestyle_options_2_a.innerText);
        });

        //-------------------------3----------------------------

        var outlinestyle_options_3 = document.createElement('li');

        var outlinestyle_options_3_a = document.createElement('a');
        outlinestyle_options_3_a.innerText = 'Double';

        var outlinestyle_options_3_a_span = document.createElement('span');
        outlinestyle_options_3_a_span.innerText = 'Double';
        outlinestyle_options_3_a_span.setAttribute('class','value');

        outlinestyle_options_3_a.appendChild(outlinestyle_options_3_a_span);
        outlinestyle_options_3.appendChild(outlinestyle_options_3_a);

        outlinestyle_options_3.addEventListener('click',function(){
            tb(element,'osty',outlinestyle_options_3_a.innerText);
        });

        //-------------------------4----------------------------

        var outlinestyle_options_4 = document.createElement('li');

        var outlinestyle_options_4_a = document.createElement('a');
        outlinestyle_options_4_a.innerText = 'Dashed';

        var outlinestyle_options_4_a_span = document.createElement('span');
        outlinestyle_options_4_a_span.innerText = 'Dashed';
        outlinestyle_options_4_a_span.setAttribute('class','value');

        outlinestyle_options_4_a.appendChild(outlinestyle_options_4_a_span);
        outlinestyle_options_4.appendChild(outlinestyle_options_4_a);

        outlinestyle_options_4.addEventListener('click',function(){
            tb(element,'osty',outlinestyle_options_4_a.innerText);
        });

        //-------------------------5----------------------------

        var outlinestyle_options_5 = document.createElement('li');

        var outlinestyle_options_5_a = document.createElement('a');
        outlinestyle_options_5_a.innerText = 'Groove';

        var outlinestyle_options_5_a_span = document.createElement('span');
        outlinestyle_options_5_a_span.innerText = 'Groove';
        outlinestyle_options_5_a_span.setAttribute('class','value');

        outlinestyle_options_5_a.appendChild(outlinestyle_options_5_a_span);
        outlinestyle_options_5.appendChild(outlinestyle_options_5_a);

        outlinestyle_options_5.addEventListener('click',function(){
            tb(element,'osty',outlinestyle_options_5_a.innerText);
        });

        //-------------------------6----------------------------

        var outlinestyle_options_6 = document.createElement('li');

        var outlinestyle_options_6_a = document.createElement('a');
        outlinestyle_options_6_a.innerText = 'Ridge';

        var outlinestyle_options_6_a_span = document.createElement('span');
        outlinestyle_options_6_a_span.innerText = 'Ridge';
        outlinestyle_options_6_a_span.setAttribute('class','value');

        outlinestyle_options_6_a.appendChild(outlinestyle_options_6_a_span);
        outlinestyle_options_6.appendChild(outlinestyle_options_6_a);

        outlinestyle_options_6.addEventListener('click',function(){
            tb(element,'osty',outlinestyle_options_6_a.innerText);
        });

        //-------------------------7----------------------------

        var outlinestyle_options_7 = document.createElement('li');

        var outlinestyle_options_7_a = document.createElement('a');
        outlinestyle_options_7_a.innerText = 'None';

        var outlinestyle_options_7_a_span = document.createElement('span');
        outlinestyle_options_7_a_span.innerText = 'None';
        outlinestyle_options_7_a_span.setAttribute('class','value');

        outlinestyle_options_7_a.appendChild(outlinestyle_options_7_a_span);
        outlinestyle_options_7.appendChild(outlinestyle_options_7_a);

        outlinestyle_options_7.addEventListener('click',function(){
            tb(element,'osty',outlinestyle_options_7_a.innerText);
        });

        //-------------------------8----------------------------

        var outlinestyle_options_8 = document.createElement('li');

        var outlinestyle_options_8_a = document.createElement('a');
        outlinestyle_options_8_a.innerText = 'Hidden';

        var outlinestyle_options_8_a_span = document.createElement('span');
        outlinestyle_options_8_a_span.innerText = 'Hidden';
        outlinestyle_options_8_a_span.setAttribute('class','value');

        outlinestyle_options_8_a.appendChild(outlinestyle_options_8_a_span);
        outlinestyle_options_8.appendChild(outlinestyle_options_8_a);

        outlinestyle_options_8.addEventListener('click',function(){
            tb(element,'osty',outlinestyle_options_8_a.innerText);
        });

        //-------------------------9----------------------------

        var outlinestyle_options_9 = document.createElement('li');

        var outlinestyle_options_9_a = document.createElement('a');
        outlinestyle_options_9_a.innerText = 'Outset';

        var outlinestyle_options_9_a_span = document.createElement('span');
        outlinestyle_options_9_a_span.innerText = 'Outset';
        outlinestyle_options_9_a_span.setAttribute('class','value');

        outlinestyle_options_9_a.appendChild(outlinestyle_options_9_a_span);
        outlinestyle_options_9.appendChild(outlinestyle_options_9_a);

        outlinestyle_options_9.addEventListener('click',function(){
            tb(element,'osty',outlinestyle_options_9_a.innerText);
        });

        //-------------------------10----------------------------

        var outlinestyle_options_10 = document.createElement('li');

        var outlinestyle_options_10_a = document.createElement('a');
        outlinestyle_options_10_a.innerText = 'Inset';
        outlinestyle_options_10_a.classList.add('lastoption');

        var outlinestyle_options_10_a_span = document.createElement('span');
        outlinestyle_options_10_a_span.innerText = 'Inset';
        outlinestyle_options_10_a_span.setAttribute('class','value');

        outlinestyle_options_10_a.appendChild(outlinestyle_options_10_a_span);
        outlinestyle_options_10.appendChild(outlinestyle_options_10_a);

        outlinestyle_options_10.addEventListener('click',function(){
            tb(element,'osty',outlinestyle_options_10_a.innerText);
        });

        //---------------OutlineStyle Options End---------------------

        outlinestyle_selected_a.appendChild(outlinestyle_selected_a_span);
        outlinestyle_selected.appendChild(outlinestyle_selected_a);

        outlinestyle_options_ul.appendChild(outlinestyle_options_1);
        outlinestyle_options_ul.appendChild(outlinestyle_options_2);
        outlinestyle_options_ul.appendChild(outlinestyle_options_3);
        outlinestyle_options_ul.appendChild(outlinestyle_options_4);
        outlinestyle_options_ul.appendChild(outlinestyle_options_5);
        outlinestyle_options_ul.appendChild(outlinestyle_options_6);
        outlinestyle_options_ul.appendChild(outlinestyle_options_7);
        outlinestyle_options_ul.appendChild(outlinestyle_options_8);
        outlinestyle_options_ul.appendChild(outlinestyle_options_9);
        outlinestyle_options_ul.appendChild(outlinestyle_options_10);

        outlinestyle_options.appendChild(outlinestyle_options_ul);

        outlinestyle.appendChild(outlinestyle_selected);
        outlinestyle.appendChild(outlinestyle_options);

        //-----------------Event Handlers--------------------
        outlinestyle_selected_a_span.addEventListener('click',function(e){

            if(e.target == this){

                if(outlinestyle_options.style.display == 'block'){

                    outlinestyle_options.style.display = 'none';
                    outlinestyle_options_ul.style.display = 'none';

                }else{

                    outlinestyle_options.style.display = 'block';
                    outlinestyle_options_ul.style.display = 'block';

                }

            }else{

            }

        });

        //-------End OutlineStyle--------

        //------OutlineColor-------

        var outlinecolor = document.createElement('combobox');
        outlinecolor.setAttribute('id','outlinecolor');
        outlinecolor.style.left = '50%';
        outlinecolor.style.transform = 'translate(-50%)';
        outlinecolor.style.zIndex = '0';

        var outlinecolor_selected = document.createElement('selected');
        var outlinecolor_selected_a = document.createElement('a');
        var outlinecolor_selected_a_span = document.createElement('span');
        outlinecolor_selected_a_span.innerText = 'Outline Color';
        outlinecolor_selected_a_span.style.fontSize = '12px';

        var outlinecolor_colordisplay = document.createElement('colordisplay');
        outlinecolor_colordisplay.setAttribute('id','ocd');
        outlinecolor_colordisplay.style.display = 'none';
        outlinecolor_colordisplay.addEventListener('click',function(){

            var colorpicker = document.getElementById('ocp');

            if(colorpicker.style.display == 'block'){

                colorpicker.style.display = 'none';

            }else{

                colorpicker.style.display = 'block';

            }

        });

        var outlinecolor_colorpicker = document.createElement('div');
        outlinecolor_colorpicker.setAttribute('class','colorpicker');
        outlinecolor_colorpicker.setAttribute('id','ocp');
        outlinecolor_colorpicker.style.top = '-155px';

        var outlinecolor_colorpicker_box = document.createElement('canvas');
        outlinecolor_colorpicker_box.setAttribute('class','colorpickerbox');
        outlinecolor_colorpicker_box.setAttribute('id','ocpb');

        var outlinecolor_colorpicker_strip = document.createElement('canvas');
        outlinecolor_colorpicker_strip.setAttribute('class','colorpickerstrip');
        outlinecolor_colorpicker_strip.setAttribute('id','ocps');

        var outlinecolor_colorpicker_input_rgba = document.createElement('input');
        outlinecolor_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
        outlinecolor_colorpicker_input_rgba.setAttribute('id','ocprgba');
        outlinecolor_colorpicker_input_rgba.addEventListener('input',function(){
            textToColorPickerColor(this,'outline-color',element);
        });

        var outlinecolor_colorpicker_input_hex = document.createElement('input');
        outlinecolor_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
        outlinecolor_colorpicker_input_hex.setAttribute('id','ocphex');
        outlinecolor_colorpicker_input_hex.addEventListener('input',function(){
            textToColorPickerColor(this,'outline-color',element);
        });

        outlinecolor_colorpicker.appendChild(outlinecolor_colorpicker_box);
        outlinecolor_colorpicker.appendChild(outlinecolor_colorpicker_strip);
        outlinecolor_colorpicker.appendChild(outlinecolor_colorpicker_input_rgba);
        outlinecolor_colorpicker.appendChild(outlinecolor_colorpicker_input_hex);

        outlinecolor_selected_a.appendChild(outlinecolor_selected_a_span);
        outlinecolor_selected.appendChild(outlinecolor_selected_a);
        outlinecolor_selected.appendChild(outlinecolor_colordisplay);
        outlinecolor_selected.appendChild(outlinecolor_colorpicker);

        outlinecolor.appendChild(outlinecolor_selected);

        //-----------------Event Handlers--------------------

        outlinecolor_selected_a_span.addEventListener('click',function(e){

            if(e.target == this){

                if(outlinecolor_colordisplay.style.display == 'block'){

                    outlinecolor_colordisplay.style.display = 'none';
                    outlinecolor.style.textAlign = '';

                }else{

                    outlinecolor_colordisplay.style.display = 'block';
                    outlinecolor.style.textAlign = 'left';

                }

            }else{

            }

        });

        //-----End OutlineColor------

        //------Color1-------

        var color1 = document.createElement('combobox');
        color1.setAttribute('id','c1');
        color1.style.left = '205px';
        color1.style.top = '5px';
        color1.style.textAlign = 'Left';

        var color1_selected = document.createElement('selected');
        var color1_selected_a = document.createElement('a');
        var color1_selected_a_span = document.createElement('span');
        color1_selected_a_span.innerText = 'Color 1';
        color1_selected_a_span.style.fontSize = '12px';

        var color1_colordisplay = document.createElement('colordisplay');
        color1_colordisplay.setAttribute('id','bggc1cd');
        color1_colordisplay.addEventListener('click',function(){

            var colorpicker = document.getElementById('bggc1cp');

            if(colorpicker.style.display == 'block'){

                colorpicker.style.display = 'none';

            }else{

                colorpicker.style.display = 'block';

            }

        });

        var color1_colorpicker = document.createElement('div');
        color1_colorpicker.setAttribute('class','colorpicker');
        color1_colorpicker.setAttribute('id','bggc1cp');

        var color1_colorpicker_box = document.createElement('canvas');
        color1_colorpicker_box.setAttribute('class','colorpickerbox');
        color1_colorpicker_box.setAttribute('id','bggc1cpb');

        var color1_colorpicker_strip = document.createElement('canvas');
        color1_colorpicker_strip.setAttribute('class','colorpickerstrip');
        color1_colorpicker_strip.setAttribute('id','bggc1cps');

        var color1_colorpicker_input_rgba = document.createElement('input');
        color1_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
        color1_colorpicker_input_rgba.setAttribute('id','bggc1cprgba');
        color1_colorpicker_input_rgba.addEventListener('input',function(){
            textToColorPickerColor(this,'backgroundGradient1',element);
        });

        var color1_colorpicker_input_hex = document.createElement('input');
        color1_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
        color1_colorpicker_input_hex.setAttribute('id','bggc1cphex');
        color1_colorpicker_input_hex.addEventListener('input',function(){
            textToColorPickerColor(this,'backgroundGradient1',element);
        });

        color1_colorpicker.appendChild(color1_colorpicker_box);
        color1_colorpicker.appendChild(color1_colorpicker_strip);
        color1_colorpicker.appendChild(color1_colorpicker_input_rgba);
        color1_colorpicker.appendChild(color1_colorpicker_input_hex);
        color1_colorpicker.style.left = '200px';
        color1_colorpicker.style.top = '-100px';

        color1_selected_a.appendChild(color1_selected_a_span);
        color1_selected.appendChild(color1_selected_a);
        color1_selected.appendChild(color1_colordisplay);
        color1_selected.appendChild(color1_colorpicker);

        color1.appendChild(color1_selected);

        //-----End Color1------

        //------Color2-------

        var color2 = document.createElement('combobox');
        color2.setAttribute('id','c2');
        color2.style.left = '205px';
        color2.style.top = '60px';
        color2.style.zIndex = '4';
        color2.style.textAlign = 'Left';

        var color2_selected = document.createElement('selected');
        var color2_selected_a = document.createElement('a');
        var color2_selected_a_span = document.createElement('span');
        color2_selected_a_span.innerText = 'Color 2';
        color2_selected_a_span.style.fontSize = '12px';

        var color2_colordisplay = document.createElement('colordisplay');
        color2_colordisplay.setAttribute('id','bggc2cd');
        color2_colordisplay.addEventListener('click',function(){

            var colorpicker = document.getElementById('bggc2cp');

            if(colorpicker.style.display == 'block'){

                colorpicker.style.display = 'none';

            }else{

                colorpicker.style.display = 'block';

            }

        });

        var color2_colorpicker = document.createElement('div');
        color2_colorpicker.setAttribute('class','colorpicker');
        color2_colorpicker.setAttribute('id','bggc2cp');

        var color2_colorpicker_box = document.createElement('canvas');
        color2_colorpicker_box.setAttribute('class','colorpickerbox');
        color2_colorpicker_box.setAttribute('id','bggc2cpb');

        var color2_colorpicker_strip = document.createElement('canvas');
        color2_colorpicker_strip.setAttribute('class','colorpickerstrip');
        color2_colorpicker_strip.setAttribute('id','bggc2cps');

        var color2_colorpicker_input_rgba = document.createElement('input');
        color2_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
        color2_colorpicker_input_rgba.setAttribute('id','bggc2cprgba');
        color2_colorpicker_input_rgba.addEventListener('input',function(){
            textToColorPickerColor(this,'backgroundGradient2',element);
        });

        var color2_colorpicker_input_hex = document.createElement('input');
        color2_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
        color2_colorpicker_input_hex.setAttribute('id','bggc2cphex');
        color2_colorpicker_input_hex.addEventListener('input',function(){
            textToColorPickerColor(this,'backgroundGradient2',element);
        });

        color2_colorpicker.appendChild(color2_colorpicker_box);
        color2_colorpicker.appendChild(color2_colorpicker_strip);
        color2_colorpicker.appendChild(color2_colorpicker_input_rgba);
        color2_colorpicker.appendChild(color2_colorpicker_input_hex);
        color2_colorpicker.style.left = '200px';
        color2_colorpicker.style.top = '-130px';

        color2_selected_a.appendChild(color2_selected_a_span);
        color2_selected.appendChild(color2_selected_a);
        color2_selected.appendChild(color2_colordisplay);
        color2_selected.appendChild(color2_colorpicker);

        color2.appendChild(color2_selected);

        //-----End Color2------

        //-----End Background Gradient------

        //----------------Extras----------------------

        var letterspacediv = document.createElement('div');
        letterspacediv.setAttribute('class','box');
        letterspacediv.setAttribute('id','letterspacediv');
        letterspacediv.appendChild(letterspace);
        var letterspacedivbanner = document.createElement('banner');
        var letterspacedivbannerh5 = document.createElement('h5');
        letterspacedivbannerh5.innerText = 'Letter Space';
        letterspacedivbanner.appendChild(letterspacedivbannerh5);
        letterspacediv.appendChild(letterspacedivbanner);

        /*var fontcombinationsdiv = document.createElement('div');
        fontcombinationsdiv.setAttribute('class','box');
        fontcombinationsdiv.setAttribute('id','fontcombinationsdiv');
        fontcombinationsdiv.appendChild(fontcombinations);
        var fontcombinationsdivbanner = document.createElement('banner');
        var fontcombinationsdivbannerh5 = document.createElement('h5');
        fontcombinationsdivbannerh5.innerText = 'Font Combination';
        fontcombinationsdivbanner.appendChild(fontcombinationsdivbannerh5);
        fontcombinationsdiv.appendChild(fontcombinationsdivbanner);*/

        var googlefontssdiv = document.createElement('div');
        googlefontssdiv.style.overflow = 'unset';
        googlefontssdiv.style.zIndex = '5';
        googlefontssdiv.setAttribute('class','box');
        googlefontssdiv.setAttribute('id','googlefontssdiv');
        var googlefontssdivbanner = document.createElement('banner');
        var googlefontssdivbannerh5 = document.createElement('h5');
        googlefontssdivbannerh5.innerText = 'Google Fonts';
        googlefontssdivbanner.appendChild(googlefontssdivbannerh5);
        googlefontssdiv.appendChild(googlefontssdivbanner);

        var outlinediv = document.createElement('div');
        outlinediv.style.zIndex = '5';
        outlinediv.setAttribute('class','box');
        outlinediv.setAttribute('id','outlinediv');
        outlinediv.appendChild(outlinestyle);
        outlinediv.appendChild(outlinewidth);
        outlinediv.appendChild(outlinecolor);

        //------------------End Extras-------------------------

        let ends = [
            {
                id: "endx",
                text: "End X",
                style: {
                    left: "15px",
                    top: "5px"
                },
                options: [ "Left", "Right" ],
                spanId: "bggexvalue",
            },
            {
                id: "endy",
                text: "End Y",
                style: {
                    left: "15px",
                    top: "60px",
                    zIndex: "4"
                },
                options: [ "Top", "Bottom" ],
                spanId: "bggeyvalue",
            }
        ];

        for (let end of ends){
            let el = await Globals.components.new({
                name: "combobox",
                parent: advancediv2,
                elementType: element,
                data: {
                    id: end.id,
                    style: end.style,
                    text: end.text,
                    options: end.options,
                }
            });

            Globals.elements.new({
                type: "span",
                parent: el,
                id: end.spanId,
                attribute: {
                    hidden: true
                }
            });
        }

        advancediv2.appendChild(color1);
        advancediv2.appendChild(color2);

        var backgroundImageDiv = Globals.elements.new({
            type: "div",
            parent: advancediv1,
            id: "bgimgbox",
            children: [
                {
                    type: "banner",
                    children: [
                        {
                            type: "h5",
                            text: "Background Image",
                        }
                    ]
                },
                {
                    type: "button",
                    classes: [ "filebtn" ],
                    text: "Select image",
                    listeners: {
                        click: function(){
                            this.parentElement.getElementsByTagName("input")[0].click();
                        }
                    }
                },
                {
                    type: "giphybutton",
                    listeners: {
                        click: function(){
                            let giphydiv = document.getElementsByTagName("giphy")[0];
                            let giphydivopacity = giphydiv.style.opacity;
                            if(giphydivopacity == 0){
                                giphydiv.style.opacity = 1;
                                setTimeout(function(){giphydiv.style.display = "block";},750);
                                document.getElementById('panel').style.opacity = 0.5;
                                document.getElementById('panel').style.pointerEvents = "none";
                                Globals.pageHandler.thirdPartyMediaManager.resetGiphy();
                            }

                            if(giphydivopacity == 1){
                                giphydiv.style.opacity = 0;
                                setTimeout(function(){giphydiv.style.display = "none";},750);
                                document.getElementById('panel').style.opacity = 1;
                                document.getElementById('panel').style.pointerEvents = "unset";
                                Globals.pageHandler.thirdPartyMediaManager.resetGiphy();
                            }
                        }
                    }
                },
                {
                    type: "input",
                    attributes: {
                        hidden: true,
                        type: "file"
                    },
                    listeners: {
                        change: function(){
                            var file = this.files[0];
                            var reader = new FileReader();
                            reader.onload = function () {
                                $('#preview'+element).css({"background-image":"url(" + reader.result + ")","background-size":"cover"});
                            }
                            reader.readAsDataURL(file);
                        }
                    }
                },
            ]
        })

        var giphydiv = Globals.elements.new({
            type: "giphy",
            parent: document.getElementsByTagName('body')[0],
            children: [
                {
                    type: "i",
                    classes: [ "fas", "fa-times", "close" ],
                    listeners: {
                        click: function(){
                            let giphydiv = document.getElementsByTagName("giphy")[0];
                            giphydiv.style.opacity = 0;
                            setTimeout(function(){giphydiv.style.display = "none";},750);
                            document.getElementById('panel').style.opacity = 1;
                            document.getElementById('panel').style.pointerEvents = "unset";
                            Globals.pageHandler.thirdPartyMediaManager.resetGiphy();
                        }
                    }
                },
                {
                    type: "p",
                    classes: [ "heading" ],
                    text: "Search gifs from giphy.com",
                },
                {
                    type: "input",
                    attributes: {
                        placeholder: "Enter keyword here. Ex: Smile",
                    },
                    classes: [ "searchbar" ]
                },
                {
                    type: "button",
                    classes: [ "searchbutton" ],
                    listeners: {
                        click: function(){
                            let giphysearchinput = this.parentElement.getElementsByTagName("input")[0];
                            Globals.pageHandler.thirdPartyMediaManager.resetImages('elementCreator');
                            Globals.pageHandler.thirdPartyMediaManager.searchGIFS(giphysearchinput.value, element,'elementCreator');
                        }
                    },
                    children: [
                        {
                            type: "i",
                            classes: [ "fas", "fa-search" ]
                        }
                    ]
                },
            ]
        });

        var textShadowDiv = Globals.elements.new({
            type: "div",
            parent: advancediv1,
            classes: [ "box" ],
            style: { zIndex: "2" },
            children: [
                {
                    type: "banner",
                    children: [
                        {
                            type: "h5",
                            text: "Text Shadow",
                        }
                    ]
                },
            ]
        });

        let comboboxes = [
            {
                id: "textshadow",
                parent: textShadowDiv,
                width: "250px",
                style: {
                    left: "50%",
                    transform: "translate(-50%)"
                },
                text: "Text Shadow",
                customValue: {
                    placeholder: "0px 0px 0px",
                    call: "updateElement"
                },
                colorPicker: {
                    idPrefix: "texts",
                    style: {
                        top: "-10px",
                        left: "-170px"
                    }
                }
            },
        ];

        for (let x of comboboxes){
            await Globals.components.new({
                name: "combobox",
                parent: x.parent,
                elementType: element,
                data: {
                    id: x.id,
                    width: x.width,
                    style: x.style,
                    text: x.text,
                    options: x.options,
                    customValue: x.customValue,
                    colorPicker: x.colorPicker
                }
            });
        }

        var marginDiv = Globals.elements.new({
            type: "div",
            parent: advancediv1,
            classes: [ "box" ],
            style: { height: "300px" },
            children: [
                {
                    type: "banner",
                    children: [
                        {
                            type: "h5",
                            text: "Margin",
                        }
                    ]
                },
            ]
        });

        let margins = [
            {
                id: "marginleft",
                text: "Margin Left",
                style: {
                    transform: "translate(-50%,-50%)",
                    top: "50%",
                    left: "50%",
                    marginTop: "-50px",
                },
            },
            {
                id: "marginbottom",
                text: "Margin Bottom",
                style: {
                    transform: "translate(-50%,-50%)",
                    top: "50%",
                    left: "50%",
                    marginTop: "0px",
                },
            },
            {
                id: "marginright",
                text: "Margin Right",
                style: {
                    transform: "translate(-50%,-50%)",
                    top: "50%",
                    left: "50%",
                    marginTop: "50px",
                },
            },
            {
                id: "margintop",
                text: "Margin Top",
                style: {
                    transform: "translate(-50%,-50%)",
                    top: "50%",
                    left: "50%",
                    marginTop: "100px",
                },
            },
        ];

        for (let margin of margins){
            await Globals.components.new({
                name: "combobox",
                parent: marginDiv,
                data: {
                    id: margin.id,
                    elementType: element,
                    style: margin.style,
                    text: margin.text,
                    customValue: {
                        call: "updateElement"
                    }
                }
            });
        }

        var paddingDiv = Globals.elements.new({
            type: "div",
            parent: advancediv1,
            classes: [ "box" ],
            style: { height: "150px", width: "625px" },
            children: [
                {
                    type: "banner",
                    children: [
                        {
                            type: "h5",
                            text: "Padding",
                        }
                    ]
                },
            ]
        });

        let paddings = [
            {
                id: "paddingleft",
                text: "Padding Left",
                style: {
                    top: "5px",
                    left: "5px",
                },
            },
            {
                id: "paddingbottom",
                text: "Padding Bottom",
                width: "120px",
                style: {
                    top: "155px",
                    left: "5px",
                },
            },
            {
                id: "paddingright",
                text: "Padding Right",
                width: "120px",
                style: {
                    top: "305px",
                    left: "5px",
                },
            },
            {
                id: "paddingtop",
                text: "Padding Top",
                width: "120px",
                style: {
                    top: "455px",
                    left: "5px",
                },
            }
        ];

        for (let padding of paddings){
            await Globals.components.new({
                name: "combobox",
                parent: paddingDiv,
                data: {
                    id: padding.id,
                    width: padding.width,
                    elementType: element,
                    style: padding.style,
                    text: padding.text,
                    customValue: {
                        call: "updateElement"
                    }
                }
            });
        }

        advancediv.appendChild(advancediv1);
        advancediv.appendChild(advancediv2);
        advancediv.appendChild(letterspacediv);
        advancediv.appendChild(googlefontssdiv);
        advancediv.appendChild(outlinediv);

        //----------------Fade in timming------------------

        document.getElementsByClassName('spinner')[0].style.display = 'block';
        var panel = document.getElementById('panel');
        panel.style.opacity = '0.3';
        panel.style.pointerEvents = 'none';

        setTimeout(function(){

            $('#buttons').append(backbutton);
            $('#panel').append(advancediv);
            document.getElementsByClassName('spinner')[0].style.display = 'none';
            panel.style.opacity = '1';
            panel.style.pointerEvents = 'unset';

        },1);

    }
}
