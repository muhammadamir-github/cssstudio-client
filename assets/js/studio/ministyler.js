class MiniStyler{

    constructor(){}

    load(){
    }

    empty(){
        var comboboxes = document.getElementsByClassName('miniStyler')[0].getElementsByTagName('combobox');

        for(var i = comboboxes.length -1; i >= 0 ; i--){
            comboboxes[i].remove();
        }
    }

    open(){
        const self = this;
        var stylerDiv = document.createElement('div');
        stylerDiv.className = 'miniStyler';
        stylerDiv.addEventListener('mousedown',function(e){
            self.mousedown(e);
        });

        var box = document.createElement('div');
        box.className = 'miniStyler_box';

        var banner = document.createElement('div');
        banner.className = 'banner';

        var banner_p = document.createElement('p');
        banner_p.innerText = 'Mini Styler';

        var stylerSettings = document.createElement('div');
        stylerSettings.className = 'settings';

        var unitLabel = document.createElement('p');
        unitLabel.innerText = 'Unit: ';

        var unitInput = document.createElement('input');
        unitInput.type = 'text';
        unitInput.placeholder = '%% or px';
        unitInput.maxLength = '2';

        unitInput.addEventListener('input',function(){
            if(unitInput.value.length == 2){
                if(unitInput.value == 'px'){
                    self.loadComboboxes('px');
                }else{
                    if(unitInput.value == '%%'){
                        self.loadComboboxes('%');
                    }else{
                        notification('Error, '+unitInput.value+' unit not supported');
                    }
                }
            }
        });

        var stylerSpinner = document.createElement('div');
        stylerSpinner.className = 'spinner';

        banner.appendChild(banner_p);

        stylerSettings.appendChild(unitLabel);
        stylerSettings.appendChild(unitInput);

        stylerDiv.appendChild(stylerSpinner);
        stylerDiv.appendChild(banner);
        stylerDiv.appendChild(box);
        stylerDiv.appendChild(stylerSettings);
        Globals.window.body.appendChild(stylerDiv);

        this.loadComboboxes('default');

    }

    loadComboboxes(unit){
        const self = this;
        $('.miniStyler').find('.spinner').css({'display':'block'});
        $('.miniStyler').find('*').not('.spinner').css({'opacity':'0.7','pointer-events':'none'});

        setTimeout(function(){
            $('.miniStyler').find('.spinner').css({'display':'none'});
            $('.miniStyler').find('*').not('.spinner').css({'opacity':'1','pointer-events':'unset'});

            self.empty();

            var width_unit = 'px', height_unit = 'px';

            var width_values_px = [{value:'50'},{value:'70'},{value:'90'},{value:'125'},{value:'150'},{value:'175'}];
            var width_values_percentage = [{value:'25'},{value:'50'},{value:'75'},{value:'100'}];

            var height_values_px = [{value:'20'},{value:'40'},{value:'70'},{value:'90'},{value:'125'},{value:'150'}];
            var height_values_percentage = [{value:'10'},{value:'25'},{value:'45'},{value:'75'}];

            if(unit == 'default'){
                if(document.getElementsByClassName('selected')[0].classList.contains('topnavbar')){
                    width_unit = '%';
                    height_unit = 'px';
                    self.addComboBox('Width','wpb_styler_width',1,0,width_unit,width_values_percentage);
                    self.addComboBox('Height','wpb_styler_height',1,0,height_unit,height_values_px);
                }else{
                    self.addComboBox('Width','wpb_styler_width',1,0,width_unit,width_values_px);
                    self.addComboBox('Height','wpb_styler_height',1,0,height_unit,height_values_px);
                }
            }else{
                if(unit == 'px'){
                    width_unit = 'px';
                    height_unit = 'px';
                    self.addComboBox('Width','wpb_styler_width',1,0,width_unit,width_values_px);
                    self.addComboBox('Height','wpb_styler_height',1,0,height_unit,height_values_px);
                }else{
                    if(unit == '%'){
                        width_unit = '%';
                        height_unit = '%';
                        self.addComboBox('Width','wpb_styler_width',1,0,width_unit,width_values_percentage);
                        self.addComboBox('Height','wpb_styler_height',1,0,height_unit,height_values_percentage);
                    }
                }
            }

            self.addComboBox('Display','wpb_styler_display',0,0,'',[{value:'Block'},{value:'Inline'},{value:'Contents'},{value:'Flex'},{value:'Grid'},{value:'Inline-Block'},{value:'Inline-Flex'},{value:'Inline-Grid'},{value:'Inline-Table'},{value:'List-Item'},{value:'Run-In'},{value:'Table-Caption'},{value:'Table-Column-Group'},{value:'Table-Header-Group'},{value:'Table-Footer-Group'},{value:'Table-Row-Group'},{value:'Table-Cell'},{value:'Table-Column'},{value:'Table-Row'},{value:'None'}]);
            self.addComboBox('Background Color','wpb_styler_backgroundColor',0,1,'',[]);
            self.addComboBox('Font Size','wpb_styler_fontSize',1,0,'px',[{value:'10'},{value:'12'},{value:'15'},{value:'17'},{value:'19'},{value:'22'}]);
            self.addComboBox('Font Color','wpb_styler_fontColor',0,1,'',[]);
            self.addComboBox('Text Align','wpb_styler_textAlign',0,0,'',[{value:'Left'},{value:'Center'},{value:'Right'}]);
            self.addComboBox('Text Decoration','wpb_styler_textDecoration',0,0,'',[{value:'OverLine'},{value:'Line-Through'},{value:'Underline'},{value:'Underline Overline'},{value:'None'}]);
            self.addComboBox('Text Decoration Style','wpb_styler_textDecorationStyle',0,0,'',[{value:'Solid'},{value:'Double'},{value:'Dotted'},{value:'Dashed'},{value:'Wavy'}]);
            self.addComboBox('Text Decoration Color','wpb_styler_textDecorationColor',0,1,'',[]);
            self.addComboBox('Font Style','wpb_styler_fontStyle',0,0,'',[{value:'Normal'},{value:'Italic'}]);
            self.addComboBox('Font Weight','wpb_styler_fontWeight',0,0,'',[{value:'Normal'},{value:'Bold'}]);
            self.addComboBox('Font Variant','wpb_styler_fontVariant',0,0,'',[{value:'Normal'},{value:'Small-Caps'}]);
            self.addComboBox('Font Stretch','wpb_styler_fontStretch',0,0,'',[{value:'Normal'},{value:'Condensed'},{value:'Expanded'}]);
            self.addComboBox('Border Size','wpb_styler_borderSize',1,0,'px',[{value:'2'},{value:'4'},{value:'8'}]);
            self.addComboBox('Border Color','wpb_styler_borderColor',0,1,'',[]);
            self.addComboBox('Border Radius','wpb_styler_borderRadius',1,0,'px',[{value:'3'},{value:'6'},{value:'12'}]);
            self.addComboBox('Border Style','wpb_styler_borderSize',0,0,'',[{value:'Solid'},{value:'Dotted'},{value:'Double'},{value:'Dashed'},{value:'Groove'},{value:'Ridge'},{value:'Dotted Solid'},{value:'Dotted Solid Double Dashed'},{value:'OutSet'},{value:'Inset'}]);
            self.addComboBox('White Space','wpb_styler_whiteSpace',0,0,'',[{value:'Normal'},{value:'NoWrap'},{value:'Pre'},{value:'Pre-Line'},{value:'Pre-Wrap'}]);
            self.addComboBox('Margin Left','wpb_styler_marginLeft',1,0,'px',[]);
            self.addComboBox('Margin Right','wpb_styler_marginRight',1,0,'px',[]);
            self.addComboBox('Margin Top','wpb_styler_marginTop',1,0,'px',[]);
            self.addComboBox('Margin Bottom','wpb_styler_marginBottom',1,0,'px',[]);
            self.addComboBox('Padding Left','wpb_styler_paddingLeft',1,0,'px',[]);
            self.addComboBox('Padding Right','wpb_styler_paddingRight',1,0,'px',[]);
            self.addComboBox('Padding Top','wpb_styler_paddingTop',1,0,'px',[]);
            self.addComboBox('Padding Bottom','wpb_styler_paddingBottom',1,0,'px',[]);
            self.addComboBox('Letter Space','wpb_styler_letterSpace',1,0,'px',[]);
            self.addComboBox('Word Space','wpb_styler_wordSpace',1,0,'px',[]);
            self.addComboBox('Outline Width','wpb_styler_outlineWidth',1,0,'px',[]);
            self.addComboBox('Outline Color','wpb_styler_outlineColor',1,1,'',[]);
            self.addComboBox('Outline Style','wpb_styler_outlineStyle',0,0,'',[{value:'Solid'},{value:'Dotted'},{value:'Double'},{value:'Dashed'},{value:'Groove'},{value:'Ridge'},{value:'Hidden'},{value:'Outset'},{value:'Inset'},{value:'None'}]);
            self.addComboBox('Box Shadow','wpb_styler_boxShadowColor',1,1,'',[]);
            self.addComboBox('Text Shadow','wpb_styler_textShadowColor',1,1,'',[]);

        },3000);

    }

    close(){
        document.getElementsByClassName('miniStyler')[0].remove();
    }

    addComboBox(comboboxTitle,comboboxId,addCustomEdit,addColorPicker,unit,comboboxOptions){
        var combobox = document.createElement('combobox');
        combobox.setAttribute('id',comboboxId);
        combobox.style.left = '10px';

        var combobox_selected = document.createElement('selected');
        var combobox_selected_a = document.createElement('a');
        var combobox_selected_a_span = document.createElement('span');
        combobox_selected_a_span.innerText = comboboxTitle;

        combobox_selected.appendChild(combobox_selected_a);
        combobox_selected_a.appendChild(combobox_selected_a_span);

        var combobox_options = document.createElement('options');
        var combobox_options_ul = document.createElement('ul');

        if(addCustomEdit == 1){
            var combobox_customedit = document.createElement('input');
            combobox_customedit.classList.add('custom');
            combobox_selected.appendChild(combobox_customedit);
            if(comboboxTitle == 'Box Shadow' || comboboxTitle == 'Text Shadow'){
                combobox_customedit.className = 'customlarge';
                combobox_customedit.value = '0px 0px 0px';
            }
        }

        if(addColorPicker == 1){

            var randomId = Globals.pageHandler.randomize.elementId(10);

            var colordisplay = document.createElement('colordisplay');
            colordisplay.setAttribute('id',randomId+'_cd');
            colordisplay.addEventListener('click',function(){

                var colorpicker = document.getElementById(randomId+'_cp');

                if(colorpicker.style.display == 'block'){

                    colorpicker.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');

                }else{

                    colorpicker.style.display = 'block';
                    combobox.classList.add('selectedCombobox');

                }

            });

            colordisplay.style.display = 'none';

            var colorpicker = document.createElement('div');
            colorpicker.setAttribute('class','colorpicker');
            colorpicker.setAttribute('id',randomId+'_cp');

            if(comboboxTitle == 'Box Shadow' || comboboxTitle == 'Text Shadow'){
                colorpicker.style.left = '0px';
                colorpicker.style.right = 'unset';
            }

            var colorpicker_box = document.createElement('canvas');
            colorpicker_box.setAttribute('class','colorpickerbox');
            colorpicker_box.setAttribute('id',randomId+'_cpb');

            var colorpicker_strip = document.createElement('canvas');
            colorpicker_strip.setAttribute('class','colorpickerstrip');
            colorpicker_strip.setAttribute('id',randomId+'_cps');

            var colorpicker_input_rgba = document.createElement('input');
            colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
            colorpicker_input_rgba.setAttribute('id',randomId+'_cprgba');
            colorpicker_input_rgba.addEventListener('input',function(){
                var value;
                if(comboboxTitle == 'Font Color'){
                    value = 'color';
                }
                if(comboboxTitle == 'Outline Color'){
                    value = 'outline-color';
                }
                if(comboboxTitle == 'Border Color'){
                    value = 'border-color';
                }
                if(comboboxTitle == 'Background Color'){
                    value = 'background-color';
                }
                if(comboboxTitle == 'Text Shadow'){
                    value = 'textShadowColor';
                }
                if(comboboxTitle == 'Box Shadow'){
                    value = 'box-shadow-color';
                }
                if(comboboxTitle == 'Text Decoration Color'){
                    value = 'text-decoration-color';
                }
                textToColorPickerColor(this,value,'.selected');
            });

            var colorpicker_input_hex = document.createElement('input');
            colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
            colorpicker_input_hex.setAttribute('id',randomId+'_cphex');
            colorpicker_input_hex.addEventListener('input',function(){
                var value;
                if(comboboxTitle == 'Font Color'){
                    value = 'color';
                }
                if(comboboxTitle == 'Outline Color'){
                    value = 'outline-color';
                }
                if(comboboxTitle == 'Border Color'){
                    value = 'border-color';
                }
                if(comboboxTitle == 'Background Color'){
                    value = 'background-color';
                }
                if(comboboxTitle == 'Text Shadow'){
                    value = 'textShadowColor';
                }
                if(comboboxTitle == 'Box Shadow'){
                    value = 'box-shadow-color';
                }
                if(comboboxTitle == 'Text Decoration Color'){
                    value = 'text-decoration-color';
                }
                textToColorPickerColor(this,value,'.selected');
            });

            colorpicker.appendChild(colorpicker_box);
            colorpicker.appendChild(colorpicker_strip);
            colorpicker.appendChild(colorpicker_input_rgba);
            colorpicker.appendChild(colorpicker_input_hex);

            combobox_selected.appendChild(colordisplay);
            combobox_selected.appendChild(colorpicker);

            setTimeout(function(){
                if(comboboxTitle == 'Font Color'){
                    setupColorPicker(randomId+'_cpb',randomId+'_cps','.selected','font',randomId+'_cd',randomId+'_cprgba',randomId+'_cphex');
                }

                if(comboboxTitle == 'Outline Color'){
                    setupColorPicker(randomId+'_cpb',randomId+'_cps','.selected','outlinecolor',randomId+'_cd',randomId+'_cprgba',randomId+'_cphex');
                }

                if(comboboxTitle == 'Background Color'){
                    setupColorPicker(randomId+'_cpb',randomId+'_cps','.selected','background',randomId+'_cd',randomId+'_cprgba',randomId+'_cphex');
                }

                if(comboboxTitle == 'Border Color'){
                    setupColorPicker(randomId+'_cpb',randomId+'_cps','.selected','border',randomId+'_cd',randomId+'_cprgba',randomId+'_cphex');
                }

                if(comboboxTitle == 'Box Shadow'){
                    setupColorPicker(randomId+'_cpb',randomId+'_cps','.selected','boxshadowcolor',randomId+'_cd',randomId+'_cprgba',randomId+'_cphex');
                }

                if(comboboxTitle == 'Text Shadow'){
                    setupColorPicker(randomId+'_cpb',randomId+'_cps','.selected','textshadowcolor',randomId+'_cd',randomId+'_cprgba',randomId+'_cphex');
                }

                if(comboboxTitle == 'Text Decoration Color'){
                    setupColorPicker(randomId+'_cpb',randomId+'_cps','.selected','textdecorationcolor',randomId+'_cd',randomId+'_cprgba',randomId+'_cphex');
                }
            },5000);

        }

        for(var x=0; x<comboboxOptions.length; x++){
            var combobox_option = document.createElement('li');

            var combobox_option_a = document.createElement('a');
            combobox_option_a.innerText = comboboxOptions[x].value+unit;

            if(x == comboboxOptions.length-1){
                combobox_option_a.className = 'lastoption';
            }

            if(comboboxTitle == 'Text Align'){
                combobox_option_a.style.textAlign = comboboxOptions[x].value;
            }

            if(comboboxTitle == 'Text Decoration'){
                combobox_option_a.style.textDecoration = comboboxOptions[x].value;
            }

            if(comboboxTitle == 'Text Decoration Style'){
                combobox_option_a.style.textDecoration = 'Underline';
                combobox_option_a.style.textDecorationStyle = comboboxOptions[x].value;
            }

            if(comboboxTitle == 'Font Size'){
                combobox_option_a.style.fontSize = comboboxOptions[x].value+'px';
            }

            if(comboboxTitle == 'Font Style'){
                combobox_option_a.style.fontStyle = comboboxOptions[x].value;
            }

            if(comboboxTitle == 'Font Stretch'){
                combobox_option_a.style.fontStretch = comboboxOptions[x].value;
            }

            if(comboboxTitle == 'Font Weight'){
                combobox_option_a.style.fontWeight = comboboxOptions[x].value;
            }

            if(comboboxTitle == 'Font Variant'){
                combobox_option_a.style.fontVariant = comboboxOptions[x].value;
            }

            if(comboboxTitle == 'Border Style' || comboboxTitle == 'White Space' || comboboxTitle == 'Outline Style'){
                combobox_options_ul.style.overflowX = 'hidden';
                combobox_options_ul.style.overflowY = 'scroll';
                combobox_options_ul.style.height = '125px';
            }

            if(comboboxTitle == 'Display'){
                combobox_options_ul.style.overflowX = 'hidden';
                combobox_options_ul.style.overflowY = 'scroll';
                combobox_options_ul.style.height = '155px';
            }

            var combobox_option_a_span = document.createElement('span');
            combobox_option_a_span.innerText = comboboxOptions[x].value;
            combobox_option_a_span.setAttribute('class','value');

            combobox_option_a.appendChild(combobox_option_a_span);
            combobox_option.appendChild(combobox_option_a);

            if(comboboxTitle == 'Font Size'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.fontSize = this.getElementsByTagName('span')[0].innerText+'px';
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+'px';
                    combobox_options.style.display = 'none';
                    combobox_customedit.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Height'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.height = this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_options.style.display = 'none';
                    combobox_customedit.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Width'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.width = this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_options.style.display = 'none';
                    combobox_customedit.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Text Align'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.textAlign = this.getElementsByTagName('span')[0].innerText;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
                    combobox_options.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Text Decoration'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.textDecoration = this.getElementsByTagName('span')[0].innerText;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
                    combobox_options.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Text Decoration Style'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.textDecorationStyle = this.getElementsByTagName('span')[0].innerText;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
                    combobox_options.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Font Style'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.fontStyle = this.getElementsByTagName('span')[0].innerText;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
                    combobox_options.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Font Stretch'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.fontStretch = this.getElementsByTagName('span')[0].innerText;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
                    combobox_options.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Font Variant'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.fontVariant = this.getElementsByTagName('span')[0].innerText;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
                    combobox_options.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Font Weight'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.fontWeight = this.getElementsByTagName('span')[0].innerText;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
                    combobox_options.style.display = 'none';
                    combobox_customedit.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Border Size'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.border = this.getElementsByTagName('span')[0].innerText+'px'+' solid black';
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+'px';
                    combobox_options.style.display = 'none';
                    combobox_customedit.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Border Style'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.borderStyle = this.getElementsByTagName('span')[0].innerText;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
                    combobox_options.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Display'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.display = this.getElementsByTagName('span')[0].innerText;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
                    combobox_options.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'White Space'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.whiteSpace = this.getElementsByTagName('span')[0].innerText;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
                    combobox_options.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Border Radius'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.borderRadius = this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_options.style.display = 'none';
                    combobox_customedit.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Margin Top'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.marginTop = this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_customedit.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Margin Left'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.marginLeft = this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_customedit.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Margin Right'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.marginRight = this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_customedit.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Margin Bottom'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.marginBottom = this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_customedit.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Padding Top'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.paddingTop = this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_customedit.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Padding Left'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.paddingLeft = this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_customedit.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Padding Right'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.paddingRight = this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_customedit.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Padding Bottom'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.paddingBottom = this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_customedit.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Letter Space'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.letterSpacing = this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_customedit.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Word Space'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.wordSpacing = this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_customedit.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Outline Width'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.outlineWidth = this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText+unit;
                    combobox_customedit.style.display = 'none';
                    combobox.classList.remove('selectedCombobox');
                });
            }

            if(comboboxTitle == 'Outline Style'){
                combobox_option.addEventListener('click',function(){
                    document.getElementsByClassName('selected')[0].style.outlineStyle = this.getElementsByTagName('span')[0].innerText;
                    combobox_selected_a_span.innerText = comboboxTitle + ': ' + this.getElementsByTagName('span')[0].innerText;
                    combobox.classList.remove('selectedCombobox');
                });
            }

            combobox_options_ul.appendChild(combobox_option);

        }

        combobox_selected_a_span.addEventListener('click',function(e){

            if(e.target == combobox_selected_a_span){

                if(combobox_options.style.display == 'block'){

                    combobox_options.style.display = 'none';
                    combobox_options_ul.style.display = 'none';
                    if(addCustomEdit == 1){
                        combobox_customedit.style.display = 'none';
                    }
                    if(addColorPicker == 1){
                        colordisplay.style.display = 'none';
                        colorpicker.style.display = 'none'
                    }
                    combobox_selected_a_span.style.textAlign = '';
                    combobox.classList.remove('selectedCombobox');

                }else{

                    combobox_options.style.display = 'block';
                    combobox_options_ul.style.display = 'block';
                    if(addCustomEdit == 1){
                        combobox_customedit.style.display = 'block';
                    }
                    if(addColorPicker == 1){
                        colordisplay.style.display = 'block';
                    }
                    combobox_selected_a_span.style.textAlign = 'left';
                    combobox.classList.add('selectedCombobox');

                }

            }else{

            }

        });

        if(comboboxTitle == 'Font Size'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+'px';
                document.getElementsByClassName('selected')[0].style.fontSize = combobox_customedit.value+'px';
            });
        }

        if(comboboxTitle == 'Height'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
                document.getElementsByClassName('selected')[0].style.height = combobox_customedit.value+unit;
            });
        }

        if(comboboxTitle == 'Width'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
                document.getElementsByClassName('selected')[0].style.width = combobox_customedit.value+unit;
            });
        }

        if(comboboxTitle == 'Border Size'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+'px';
                document.getElementsByClassName('selected')[0].style.border = combobox_customedit.value+'px'+' solid black';
            });
        }

        if(comboboxTitle == 'Border Radius'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
                document.getElementsByClassName('selected')[0].style.borderRadius = combobox_customedit.value+unit;
            });
        }

        if(comboboxTitle == 'Margin Top'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
                document.getElementsByClassName('selected')[0].style.marginTop = combobox_customedit.value+unit;
            });
        }

        if(comboboxTitle == 'Margin Left'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
                document.getElementsByClassName('selected')[0].style.marginLeft = combobox_customedit.value+unit;
            });
        }

        if(comboboxTitle == 'Margin Right'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
                document.getElementsByClassName('selected')[0].style.marginRight = combobox_customedit.value+unit;
            });
        }

        if(comboboxTitle == 'Margin Bottom'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
                document.getElementsByClassName('selected')[0].style.marginBottom = combobox_customedit.value+unit;
            });
        }

        if(comboboxTitle == 'Padding Top'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
                document.getElementsByClassName('selected')[0].style.paddingTop = combobox_customedit.value+unit;
            });
        }

        if(comboboxTitle == 'Padding Left'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
                document.getElementsByClassName('selected')[0].style.paddingLeft = combobox_customedit.value+unit;
            });
        }

        if(comboboxTitle == 'Padding Right'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
                document.getElementsByClassName('selected')[0].style.paddingRight = combobox_customedit.value+unit;
            });
        }

        if(comboboxTitle == 'Padding Bottom'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
                document.getElementsByClassName('selected')[0].style.paddingBottom = combobox_customedit.value+unit;
            });
        }

        if(comboboxTitle == 'Letter Space'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
                document.getElementsByClassName('selected')[0].style.letterSpacing = combobox_customedit.value+unit;
            });
        }

        if(comboboxTitle == 'Word Space'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
                document.getElementsByClassName('selected')[0].style.wordSpacing = combobox_customedit.value+unit;
            });
        }

        if(comboboxTitle == 'Outline Width'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value+unit;
                document.getElementsByClassName('selected')[0].style.outlineWidth = combobox_customedit.value+unit;
            });
        }

        if(comboboxTitle == 'Box Shadow'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value;
                document.getElementsByClassName('selected')[0].style.boxShadow = combobox_customedit.value;
            });
        }

        if(comboboxTitle == 'Text Shadow'){
            combobox_customedit.addEventListener('keyup',function(){
                combobox_selected_a_span.innerText = comboboxTitle + ': ' + combobox_customedit.value;
                document.getElementsByClassName('selected')[0].style.textShadow = combobox_customedit.value;
            });
        }

        combobox.appendChild(combobox_selected);

        if(comboboxOptions.length>0){
            combobox_options.appendChild(combobox_options_ul);
            combobox.appendChild(combobox_options);
        }

        document.getElementsByClassName('miniStyler_box')[0].appendChild(combobox);
    }

    drag(e){
        var elmnt = document.getElementsByClassName('miniStyler')[0];
        e = e || window.event;
        e.preventDefault();

        // calculate the new cursor position:
        Globals.pageHandler.styler_pos1 = Globals.pageHandler.styler_pos3 - e.clientX;
        Globals.pageHandler.styler_pos2 = Globals.pageHandler.styler_pos4 - e.clientY;
        Globals.pageHandler.styler_pos3 = e.clientX;
        Globals.pageHandler.styler_pos4 = e.clientY;

        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - Globals.pageHandler.styler_pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - Globals.pageHandler.styler_pos1) + "px";
        elmnt.style.cursor = 'grabbing';
    }

    mousedown(e){
        var elmnt = document.getElementsByClassName('miniStyler')[0];
        if(e.target == elmnt){
            e = e || window.event;
            e.preventDefault();

            elmnt.style.cursor = 'grab';

            // get the mouse cursor position at startup:
            Globals.pageHandler.styler_pos3 = e.clientX;
            Globals.pageHandler.styler_pos4 = e.clientY;
            document.onmouseup = this.closeDrag;

            // call a function whenever the cursor moves:
            document.onmousemove = this.drag;
        }
    }

    closeDrag(){
        var elmnt = document.getElementsByClassName('miniStyler')[0];
        document.onmouseup = null;
        document.onmousemove = null;
        elmnt.style.cursor = 'default';
    }

}
