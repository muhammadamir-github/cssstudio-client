function advance(element,createnew){

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

        //------------------Background Image------------------//

        var backgroundimage_div = document.createElement('div');
        backgroundimage_div.setAttribute('id','bgimgbox');

        var backgroundimage_div_banner = document.createElement('banner');
        backgroundimage_div_banner_text = document.createElement('h5');
        backgroundimage_div_banner_text.innerText = 'Background Image';
        backgroundimage_div_banner.appendChild(backgroundimage_div_banner_text);
        backgroundimage_div.appendChild(backgroundimage_div_banner);

        var backgroundimage_file_input = document.createElement('input');
        backgroundimage_file_input.setAttribute('type','file');
        backgroundimage_file_input.setAttribute('hidden','');
        backgroundimage_file_input.addEventListener('change',function(){
            var file  = backgroundimage_file_input.files[0];
            var reader  = new FileReader();
            reader.onload = function () {
                $('#preview'+element).css({"background-image":"url(" + reader.result + ")","background-size":"cover"});
            }
            reader.readAsDataURL(file);
        })

        var backgroundimage_file_input_button = document.createElement('button');
        backgroundimage_file_input_button.setAttribute('class','filebtn');
        backgroundimage_file_input_button.innerText = 'Select image';
        backgroundimage_file_input_button.addEventListener('click',function(){
            backgroundimage_file_input.click();
        });

        var giphydiv = document.createElement('giphy');

        var giphyheading = document.createElement('p');
        giphyheading.innerText = "Search gifs from giphy.com";
        giphyheading.setAttribute('class','heading');

        var giphysearchinput = document.createElement('input');
        giphysearchinput.setAttribute('placeholder','Enter keyword here. Ex: Smile');
        giphysearchinput.setAttribute('class','searchbar');

        var giphysearchbtn = document.createElement('button');
        var giphysearchbtnIcon = document.createElement('i');
        giphysearchbtnIcon.setAttribute('class','fas fa-search');
        giphysearchbtn.setAttribute('class','searchbutton');
        giphysearchbtn.addEventListener('click',function(){
            Globals.pageHandler.thirdPartyMediaManager.resetImages('elementCreator');
            Globals.pageHandler.thirdPartyMediaManager.searchGIFS(giphysearchinput.value,element,'elementCreator');
        });
        giphysearchbtn.appendChild(giphysearchbtnIcon);

        giphyclose = document.createElement('i');
        giphyclose.setAttribute('class','fas fa-times close');
        giphyclose.addEventListener('click',function(){
            giphydiv.style.opacity = 0;
            setTimeout(function(){giphydiv.style.display = "none";},750);
            document.getElementById('panel').style.opacity = 1;
            document.getElementById('panel').style.pointerEvents = "unset";
            Globals.pageHandler.thirdPartyMediaManager.resetGiphy();
        });

        giphydiv.appendChild(giphyclose);
        giphydiv.appendChild(giphyheading);
        giphydiv.appendChild(giphysearchinput);
        giphydiv.appendChild(giphysearchbtn);

        var giphybutton = document.createElement('giphybutton');
        giphybutton.addEventListener('click',function(){

            var giphydivopacity = giphydiv.style.opacity;
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

        });

        backgroundimage_div.appendChild(backgroundimage_file_input_button);
        backgroundimage_div.appendChild(giphybutton);
        document.getElementsByTagName('body')[0].appendChild(giphydiv);
        backgroundimage_div.appendChild(backgroundimage_file_input);

        ////----------------End Background Image----------------//

        //-------TextShadow--------

        var textshadow = document.createElement('combobox');
        textshadow.setAttribute('id','textshadow');
        textshadow.style.transform = 'translate(-50%)';
        textshadow.style.left = '50%';

        var textshadow_customedit = document.createElement('input');
        textshadow_customedit.classList.add('customlarge');
        textshadow_customedit.setAttribute('placeholder','0px 0px 0px');

        var textshadow_selected = document.createElement('selected');
        var textshadow_selected_a = document.createElement('a');
        var textshadow_selected_a_span = document.createElement('span');
        textshadow_selected_a_span.innerText = 'Text Shadow';
        textshadow_selected_a.style.width = '250px';

        var textshadow_colordisplay = document.createElement('colordisplay');
        textshadow_colordisplay.setAttribute('id','textscd');
        textshadow_colordisplay.style.top = '17.5px';
        textshadow_colordisplay.style.display = 'none';
        textshadow_colordisplay.addEventListener('click',function(){

            var colorpicker = document.getElementById('textscp');

            if(colorpicker.style.display == 'block'){

                colorpicker.style.display = 'none';

            }else{

                colorpicker.style.display = 'block';

            }

        });

        var textshadow_colorpicker = document.createElement('div');
        textshadow_colorpicker.setAttribute('class','colorpicker');
        textshadow_colorpicker.setAttribute('id','textscp');
        textshadow_colorpicker.style.top = '-10px';
        textshadow_colorpicker.style.left = '-170px';

        var textshadow_colorpicker_box = document.createElement('canvas');
        textshadow_colorpicker_box.setAttribute('class','colorpickerbox');
        textshadow_colorpicker_box.setAttribute('id','textscpb');

        var textshadow_colorpicker_strip = document.createElement('canvas');
        textshadow_colorpicker_strip.setAttribute('class','colorpickerstrip');
        textshadow_colorpicker_strip.setAttribute('id','textscps');

        var textshadow_colorpicker_input_rgba = document.createElement('input');
        textshadow_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
        textshadow_colorpicker_input_rgba.setAttribute('id','textscprgba');
        textshadow_colorpicker_input_rgba.addEventListener('input',function(){
            textToColorPickerColor(this,'textShadowColor',element);
        });

        var textshadow_colorpicker_input_hex = document.createElement('input');
        textshadow_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
        textshadow_colorpicker_input_hex.setAttribute('id','textscphex');
        textshadow_colorpicker_input_hex.addEventListener('input',function(){
            textToColorPickerColor(this,'textShadowColor',element);
        });

        textshadow_colorpicker.appendChild(textshadow_colorpicker_box);
        textshadow_colorpicker.appendChild(textshadow_colorpicker_strip);
        textshadow_colorpicker.appendChild(textshadow_colorpicker_input_rgba);
        textshadow_colorpicker.appendChild(textshadow_colorpicker_input_hex);


        //---------------TextShadow Options End---------------------

        textshadow_selected_a.appendChild(textshadow_selected_a_span);
        textshadow_selected.appendChild(textshadow_selected_a);
        textshadow_selected.appendChild(textshadow_customedit);
        textshadow_selected.appendChild(textshadow_colorpicker);
        textshadow_selected.appendChild(textshadow_colordisplay);

        textshadow.appendChild(textshadow_selected);

        var textshadowdiv = document.createElement('div');
        textshadowdiv.setAttribute('class','box');
        textshadowdiv.style.zIndex = '2';

        var textshadowdivbanner = document.createElement('banner');
        var textshadowdivbannerh5 = document.createElement('h5');
        textshadowdivbannerh5.innerText = 'Text Shadow';
        textshadowdivbanner.appendChild(textshadowdivbannerh5);

        textshadowdiv.appendChild(textshadowdivbanner);
        textshadowdiv.appendChild(textshadow);

        //-----------------Event Handlers--------------------

        textshadow_selected_a_span.addEventListener('click',function(e){

            if(e.target == this){

                if(textshadow_customedit.style.display == 'block'){

                    textshadow_customedit.style.display = 'none';
                    textshadow_selected_a_span.style.opacity = '1';
                    textshadow_colordisplay.style.display = 'none';

                }else{

                    textshadow_customedit.style.display = 'block';
                    textshadow_selected_a_span.style.opacity = '0';
                    textshadow_colordisplay.style.display = 'block';

                }

            }else{

            }

        });

        textshadow_customedit.addEventListener('keyup',function(){
            textshadow_selected_a_span.innerText = 'Text Shadow: ' + this.value;
            updateElement(element,'textshadow',this.value);

        });

        //-------End TextShadow--------

        //-------MarginLeft--------

        var marginleft = document.createElement('combobox');
        marginleft.setAttribute('id','marginleft');
        marginleft.style.transform = 'translate(-50%,-50%)';
        marginleft.style.top = '50%';
        marginleft.style.left = '50%';
        marginleft.style.marginTop = '-50px';

        var marginleft_customedit = document.createElement('input');
        marginleft_customedit.classList.add('custom');

        var marginleft_selected = document.createElement('selected');
        var marginleft_selected_a = document.createElement('a');
        var marginleft_selected_a_span = document.createElement('span');
        marginleft_selected_a_span.innerText = 'Left';

        marginleft_selected_a.appendChild(marginleft_selected_a_span);
        marginleft_selected.appendChild(marginleft_selected_a);
        marginleft_selected.appendChild(marginleft_customedit);

        marginleft.appendChild(marginleft_selected);

        //-----------------Event Handlers--------------------

        marginleft_selected_a_span.addEventListener('click',function(e){

            if(e.target == this){

                if(marginleft_customedit.style.display == 'block'){

                    marginleft_customedit.style.display = 'none';
                    marginleft_selected_a_span.style.textAlign = '';

                }else{

                    marginleft_customedit.style.display = 'block';
                    marginleft_selected_a_span.style.textAlign = 'left';

                }

            }else{

            }

        });

        marginleft_customedit.addEventListener('keyup',function(){
            marginleft_selected_a_span.innerText = 'Left: ' + this.value+'px';
            updateElement(element,'marginleft',this.value+'px');

        });

        //-------End MarginLeft--------

        //-------MarginRight--------

        var marginright = document.createElement('combobox');
        marginright.setAttribute('id','marginright');
        marginright.style.left = '10px';
        marginright.style.transform = 'translate(-50%,-50%)';
        marginright.style.top = '50%';
        marginright.style.left = '50%';
        marginright.style.marginTop = '50px';

        var marginright_customedit = document.createElement('input');
        marginright_customedit.classList.add('custom');

        var marginright_selected = document.createElement('selected');
        var marginright_selected_a = document.createElement('a');
        var marginright_selected_a_span = document.createElement('span');
        marginright_selected_a_span.innerText = 'Right';

        marginright_selected_a.appendChild(marginright_selected_a_span);
        marginright_selected.appendChild(marginright_selected_a);
        marginright_selected.appendChild(marginright_customedit);

        marginright.appendChild(marginright_selected);

        //-----------------Event Handlers--------------------

        marginright_selected_a_span.addEventListener('click',function(e){

            if(e.target == this){

                if(marginright_customedit.style.display == 'block'){

                    marginright_customedit.style.display = 'none';
                    marginright_selected_a_span.style.textAlign = '';

                }else{

                    marginright_customedit.style.display = 'block';
                    marginright_selected_a_span.style.textAlign = 'left';

                }

            }else{

            }

        });

        marginright_customedit.addEventListener('keyup',function(){
            marginright_selected_a_span.innerText = 'Right: ' + this.value+'px';
            updateElement(element,'marginright',this.value+'px');

        });

        //-------End MarginRight--------

        //-------MarginTop--------

        var margintop = document.createElement('combobox');
        margintop.setAttribute('id','margintop');
        margintop.style.transform = 'translate(-50%,-50%)';
        margintop.style.top = '50%';
        margintop.style.left = '50%';
        margintop.style.marginTop = '100px';

        var margintop_customedit = document.createElement('input');
        margintop_customedit.classList.add('custom');

        var margintop_selected = document.createElement('selected');
        var margintop_selected_a = document.createElement('a');
        var margintop_selected_a_span = document.createElement('span');
        margintop_selected_a_span.innerText = 'Top';

        margintop_selected_a.appendChild(margintop_selected_a_span);
        margintop_selected.appendChild(margintop_selected_a);
        margintop_selected.appendChild(margintop_customedit);

        margintop.appendChild(margintop_selected);

        //-----------------Event Handlers--------------------

        margintop_selected_a_span.addEventListener('click',function(e){

            if(e.target == this){

                if(margintop_customedit.style.display == 'block'){

                    margintop_customedit.style.display = 'none';
                    margintop_selected_a_span.style.textAlign = '';

                }else{

                    margintop_customedit.style.display = 'block';
                    margintop_selected_a_span.style.textAlign = 'left';

                }

            }else{

            }

        });

        margintop_customedit.addEventListener('keyup',function(){
            margintop_selected_a_span.innerText = 'Top: ' + this.value+'px';
            updateElement(element,'margintop',this.value+'px');

        });

        //-------End MarginTop--------

        //-------MarginBottom--------

        var marginbottom = document.createElement('combobox');
        marginbottom.setAttribute('id','marginbottom');
        marginbottom.style.transform = 'translate(-50%,-50%)';
        marginbottom.style.top = '50%';
        marginbottom.style.left = '50%';
        marginbottom.style.marginTop = '0px';

        var marginbottom_customedit = document.createElement('input');
        marginbottom_customedit.classList.add('custom');

        var marginbottom_selected = document.createElement('selected');
        var marginbottom_selected_a = document.createElement('a');
        var marginbottom_selected_a_span = document.createElement('span');
        marginbottom_selected_a_span.innerText = 'Bottom';

        marginbottom_selected_a.appendChild(marginbottom_selected_a_span);
        marginbottom_selected.appendChild(marginbottom_selected_a);
        marginbottom_selected.appendChild(marginbottom_customedit);

        marginbottom.appendChild(marginbottom_selected);

        //-----------------Event Handlers--------------------

        marginbottom_selected_a_span.addEventListener('click',function(e){

            if(e.target == this){

                if(marginbottom_customedit.style.display == 'block'){

                    marginbottom_customedit.style.display = 'none';
                    marginbottom_selected_a_span.style.textAlign = '';

                }else{

                    marginbottom_customedit.style.display = 'block';
                    marginbottom_selected_a_span.style.textAlign = 'left';

                }

            }else{

            }

        });

        marginbottom_customedit.addEventListener('keyup',function(){
            marginbottom_selected_a_span.innerText = 'Bottom: ' + this.value+'px';
            updateElement(element,'marginbottom',this.value+'px');

        });

        //-------End MarginBottom--------

        //-------PaddingLeft--------

        var paddingleft = document.createElement('combobox');
        paddingleft.setAttribute('id','paddingleft');
        paddingleft.style.left = '5px';
        paddingleft.style.top = '5px';

        var paddingleft_customedit = document.createElement('input');
        paddingleft_customedit.classList.add('custom');

        var paddingleft_selected = document.createElement('selected');
        var paddingleft_selected_a = document.createElement('a');
        paddingleft_selected_a.style.width = '120px';
        var paddingleft_selected_a_span = document.createElement('span');
        paddingleft_selected_a_span.innerText = 'Left';

        paddingleft_selected_a.appendChild(paddingleft_selected_a_span);
        paddingleft_selected.appendChild(paddingleft_selected_a);
        paddingleft_selected.appendChild(paddingleft_customedit);

        paddingleft.appendChild(paddingleft_selected);

        //-----------------Event Handlers--------------------

        paddingleft_selected_a_span.addEventListener('click',function(e){

            if(e.target == this){

                if(paddingleft_customedit.style.display == 'block'){

                    paddingleft_customedit.style.display = 'none';
                    paddingleft_selected_a_span.style.textAlign = '';

                }else{

                    paddingleft_customedit.style.display = 'block';
                    paddingleft_selected_a_span.style.textAlign = 'left';

                }

            }else{

            }

        });

        paddingleft_customedit.addEventListener('keyup',function(){
            paddingleft_selected_a_span.innerText = 'Left: ' + this.value+'px';
            updateElement(element,'paddingleft',this.value+'px');

        });

        //-------End PaddingLeft--------

        //-------PaddingRight--------

        var paddingright = document.createElement('combobox');
        paddingright.setAttribute('id','paddingright');
        paddingright.style.left = '305px';
        paddingright.style.top = '5px';

        var paddingright_customedit = document.createElement('input');
        paddingright_customedit.classList.add('custom');

        var paddingright_selected = document.createElement('selected');
        var paddingright_selected_a = document.createElement('a');
        paddingright_selected_a.style.width = '120px';
        var paddingright_selected_a_span = document.createElement('span');
        paddingright_selected_a_span.innerText = 'Right';

        paddingright_selected_a.appendChild(paddingright_selected_a_span);
        paddingright_selected.appendChild(paddingright_selected_a);
        paddingright_selected.appendChild(paddingright_customedit);

        paddingright.appendChild(paddingright_selected);

        //-----------------Event Handlers--------------------

        paddingright_selected_a_span.addEventListener('click',function(e){

            if(e.target == this){

                if(paddingright_customedit.style.display == 'block'){

                    paddingright_customedit.style.display = 'none';
                    paddingright_selected_a_span.style.textAlign = '';

                }else{

                    paddingright_customedit.style.display = 'block';
                    paddingright_selected_a_span.style.textAlign = 'left';

                }

            }else{

            }

        });

        paddingright_customedit.addEventListener('keyup',function(){
            paddingright_selected_a_span.innerText = 'Right: ' + this.value+'px';
            updateElement(element,'paddingright',this.value+'px');

        });

        //-------End PaddingRight--------

        //-------PaddingTop--------

        var paddingtop = document.createElement('combobox');
        paddingtop.setAttribute('id','paddingtop');
        paddingtop.style.left = '455px';
        paddingtop.style.top = '5px';

        var paddingtop_customedit = document.createElement('input');
        paddingtop_customedit.classList.add('custom');

        var paddingtop_selected = document.createElement('selected');
        var paddingtop_selected_a = document.createElement('a');
        paddingtop_selected_a.style.width = '120px';
        var paddingtop_selected_a_span = document.createElement('span');
        paddingtop_selected_a_span.innerText = 'Top';

        paddingtop_selected_a.appendChild(paddingtop_selected_a_span);
        paddingtop_selected.appendChild(paddingtop_selected_a);
        paddingtop_selected.appendChild(paddingtop_customedit);

        paddingtop.appendChild(paddingtop_selected);

        //-----------------Event Handlers--------------------

        paddingtop_selected_a_span.addEventListener('click',function(e){

            if(e.target == this){

                if(paddingtop_customedit.style.display == 'block'){

                    paddingtop_customedit.style.display = 'none';
                    paddingtop_selected_a_span.style.textAlign = '';

                }else{

                    paddingtop_customedit.style.display = 'block';
                    paddingtop_selected_a_span.style.textAlign = 'left';

                }

            }else{

            }

        });

        paddingtop_customedit.addEventListener('keyup',function(){
            paddingtop_selected_a_span.innerText = 'Top: ' + this.value+'px';
            updateElement(element,'paddingtop',this.value+'px');

        });

        //-------End PaddingTop--------

        //-------PaddingBottom--------

        var paddingbottom = document.createElement('combobox');
        paddingbottom.setAttribute('id','paddingbottom');
        paddingbottom.style.left = '155px';
        paddingbottom.style.top = '5px';

        var paddingbottom_customedit = document.createElement('input');
        paddingbottom_customedit.classList.add('custom');

        var paddingbottom_selected = document.createElement('selected');
        var paddingbottom_selected_a = document.createElement('a');
        paddingbottom_selected_a.style.width = '120px';
        var paddingbottom_selected_a_span = document.createElement('span');
        paddingbottom_selected_a_span.innerText = 'Bottom';

        paddingbottom_selected_a.appendChild(paddingbottom_selected_a_span);
        paddingbottom_selected.appendChild(paddingbottom_selected_a);
        paddingbottom_selected.appendChild(paddingbottom_customedit);

        paddingbottom.appendChild(paddingbottom_selected);

        //-----------------Event Handlers--------------------

        paddingbottom_selected_a_span.addEventListener('click',function(e){

            if(e.target == this){

                if(paddingbottom_customedit.style.display == 'block'){

                    paddingbottom_customedit.style.display = 'none';
                    paddingbottom_selected_a_span.style.textAlign = '';

                }else{

                    paddingbottom_customedit.style.display = 'block';
                    paddingbottom_selected_a_span.style.textAlign = 'left';

                }

            }else{

            }

        });

        paddingbottom_customedit.addEventListener('keyup',function(){
            paddingbottom_selected_a_span.innerText = 'Bottom: ' + this.value+'px';
            updateElement(element,'paddingbottom',this.value+'px');

        });

        //-------End PaddingBottom--------

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

        /*
        //-------FontCombinations--------

        var fontcombinations = document.createElement('combobox');
        fontcombinations.setAttribute('id','fontcombination');
        fontcombinations.style.left = '50%';
        fontcombinations.style.top = '50%';
        fontcombinations.style.marginTop = '25px';
        fontcombinations.style.marginLeft = '0px';
        fontcombinations.style.transform = 'translate(-50%,-50%)';

        //------------------FontCombinations Options--------------------
        //-------------------------1----------------------------

        var fontcombinations_options_1 = document.createElement('li');

        var fontcombinations_options_1_a = document.createElement('a');
        fontcombinations_options_1_a.innerText = 'Georgia, serif';
        fontcombinations_options_1_a.style.fontFamily = 'Georgia, serif';

        var fontcombinations_options_1_a_span = document.createElement('span');
        fontcombinations_options_1_a_span.innerText = 'Georgia, serif';
        fontcombinations_options_1_a_span.setAttribute('class','value');

        fontcombinations_options_1_a.appendChild(fontcombinations_options_1_a_span);
        fontcombinations_options_1.appendChild(fontcombinations_options_1_a);

        fontcombinations_options_1.addEventListener('click',function(){
        tb(element,'fc',fontcombinations_options_1_a.innerText);
    });

    //-------------------------2----------------------------

    var fontcombinations_options_2 = document.createElement('li');
    var fontcombinations_options_2_a = document.createElement('a');
    fontcombinations_options_2_a.innerText = '"Times New Roman", Times, serif';
    fontcombinations_options_2_a.style.fontFamily = '"Times New Roman", Times, serif';

    var fontcombinations_options_2_a_span = document.createElement('span');
    fontcombinations_options_2_a_span.innerText = '"Times New Roman", Times, serif';
    fontcombinations_options_2_a_span.setAttribute('class','value');

    fontcombinations_options_2_a.appendChild(fontcombinations_options_2_a_span);
    fontcombinations_options_2.appendChild(fontcombinations_options_2_a);

    fontcombinations_options_2.addEventListener('click',function(){
    tb(element,'fc',fontcombinations_options_2_a.innerText);
});

//-------------------------3----------------------------

var fontcombinations_options_3 = document.createElement('li');
var fontcombinations_options_3_a = document.createElement('a');
fontcombinations_options_3_a.innerText = '"Palatino Linotype", "Book Antiqua", Palatino, serif';
fontcombinations_options_3_a.style.fontFamily = '"Palatino Linotype", "Book Antiqua", Palatino, serif';

var fontcombinations_options_3_a_span = document.createElement('span');
fontcombinations_options_3_a_span.innerText = '"Palatino Linotype", "Book Antiqua", Palatino, serif';
fontcombinations_options_3_a_span.setAttribute('class','value');

fontcombinations_options_3_a.appendChild(fontcombinations_options_3_a_span);
fontcombinations_options_3.appendChild(fontcombinations_options_3_a);

fontcombinations_options_3.addEventListener('click',function(){
tb(element,'fc',fontcombinations_options_3_a.innerText);
});

//-------------------------4----------------------------

var fontcombinations_options_4 = document.createElement('li');
var fontcombinations_options_4_a = document.createElement('a');
fontcombinations_options_4_a.innerText = 'Arial, Helvetica, sans-serif';
fontcombinations_options_4_a.style.fontFamily = 'Arial, Helvetica, sans-serif';

var fontcombinations_options_4_a_span = document.createElement('span');
fontcombinations_options_4_a_span.innerText = 'Arial, Helvetica, sans-serif';
fontcombinations_options_4_a_span.setAttribute('class','value');

fontcombinations_options_4_a.appendChild(fontcombinations_options_4_a_span);
fontcombinations_options_4.appendChild(fontcombinations_options_4_a);

fontcombinations_options_4.addEventListener('click',function(){
tb(element,'fc',fontcombinations_options_4_a.innerText);
});

//-------------------------5----------------------------

var fontcombinations_options_5 = document.createElement('li');
var fontcombinations_options_5_a = document.createElement('a');
fontcombinations_options_5_a.innerText = '"Arial Black", Gadget, sans-serif';
fontcombinations_options_5_a.style.fontFamily = '"Arial Black", Gadget, sans-serif';

var fontcombinations_options_5_a_span = document.createElement('span');
fontcombinations_options_5_a_span.innerText = '"Arial Black", Gadget, sans-serif';
fontcombinations_options_5_a_span.setAttribute('class','value');

fontcombinations_options_5_a.appendChild(fontcombinations_options_5_a_span);
fontcombinations_options_5.appendChild(fontcombinations_options_5_a);

fontcombinations_options_5.addEventListener('click',function(){
tb(element,'fc',fontcombinations_options_5_a.innerText);
});

//-------------------------6----------------------------

var fontcombinations_options_6 = document.createElement('li');
var fontcombinations_options_6_a = document.createElement('a');
fontcombinations_options_6_a.innerText = 'Impact, Charcoal, sans-serif';
fontcombinations_options_6_a.style.fontFamily = 'Impact, Charcoal, sans-serif';

var fontcombinations_options_6_a_span = document.createElement('span');
fontcombinations_options_6_a_span.innerText = 'Impact, Charcoal, sans-serif';
fontcombinations_options_6_a_span.setAttribute('class','value');

fontcombinations_options_6_a.appendChild(fontcombinations_options_6_a_span);
fontcombinations_options_6.appendChild(fontcombinations_options_6_a);

fontcombinations_options_6.addEventListener('click',function(){
tb(element,'fc',fontcombinations_options_6_a.innerText);
});

//-------------------------7----------------------------

var fontcombinations_options_7 = document.createElement('li');
var fontcombinations_options_7_a = document.createElement('a');
fontcombinations_options_7_a.innerText = '"Lucida Sans Unicode", "Lucida Grande", sans-serif';
fontcombinations_options_7_a.style.fontFamily = '"Lucida Sans Unicode", "Lucida Grande", sans-serif';

var fontcombinations_options_7_a_span = document.createElement('span');
fontcombinations_options_7_a_span.innerText = '"Lucida Sans Unicode", "Lucida Grande", sans-serif';
fontcombinations_options_7_a_span.setAttribute('class','value');

fontcombinations_options_7_a.appendChild(fontcombinations_options_7_a_span);
fontcombinations_options_7.appendChild(fontcombinations_options_7_a);

fontcombinations_options_7.addEventListener('click',function(){
tb(element,'fc',fontcombinations_options_7_a.innerText);
});

//-------------------------8----------------------------

var fontcombinations_options_8 = document.createElement('li');
var fontcombinations_options_8_a = document.createElement('a');
fontcombinations_options_8_a.innerText = 'Tahoma, Geneva, sans-serif';
fontcombinations_options_8_a.style.fontFamily = 'Tahoma, Geneva, sans-serif';

var fontcombinations_options_8_a_span = document.createElement('span');
fontcombinations_options_8_a_span.innerText = 'Tahoma, Geneva, sans-serif';
fontcombinations_options_8_a_span.setAttribute('class','value');

fontcombinations_options_8_a.appendChild(fontcombinations_options_8_a_span);
fontcombinations_options_8.appendChild(fontcombinations_options_8_a);

fontcombinations_options_8.addEventListener('click',function(){
tb(element,'fc',fontcombinations_options_8_a.innerText);
});

//-------------------------9----------------------------

var fontcombinations_options_9 = document.createElement('li');
var fontcombinations_options_9_a = document.createElement('a');
fontcombinations_options_9_a.innerText = '"Trebuchet MS", Helvetica, sans-serif';
fontcombinations_options_9_a.style.fontFamily = '"Trebuchet MS", Helvetica, sans-serif';

var fontcombinations_options_9_a_span = document.createElement('span');
fontcombinations_options_9_a_span.innerText = '"Trebuchet MS", Helvetica, sans-serif';
fontcombinations_options_9_a_span.setAttribute('class','value');

fontcombinations_options_9_a.appendChild(fontcombinations_options_9_a_span);
fontcombinations_options_9.appendChild(fontcombinations_options_9_a);

fontcombinations_options_9.addEventListener('click',function(){
tb(element,'fc',fontcombinations_options_9_a.innerText);
});

//-------------------------10----------------------------

var fontcombinations_options_10 = document.createElement('li');
var fontcombinations_options_10_a = document.createElement('a');
fontcombinations_options_10_a.innerText = 'Verdana, Geneva, sans-serif';
fontcombinations_options_10_a.style.fontFamily = 'Verdana, Geneva, sans-serif';

var fontcombinations_options_10_a_span = document.createElement('span');
fontcombinations_options_10_a_span.innerText = 'Verdana, Geneva, sans-serif';
fontcombinations_options_10_a_span.setAttribute('class','value');

fontcombinations_options_10_a.appendChild(fontcombinations_options_10_a_span);
fontcombinations_options_10.appendChild(fontcombinations_options_10_a);

fontcombinations_options_10.addEventListener('click',function(){
tb(element,'fc',fontcombinations_options_10_a.innerText);
});

//-------------------------11----------------------------

var fontcombinations_options_11 = document.createElement('li');
var fontcombinations_options_11_a = document.createElement('a');
fontcombinations_options_11_a.innerText = '"Lucida Console", Monaco, monospace';
fontcombinations_options_11_a.style.fontFamily = '"Lucida Console", Monaco, monospace';

var fontcombinations_options_11_a_span = document.createElement('span');
fontcombinations_options_11_a_span.innerText = '"Lucida Console", Monaco, monospace';
fontcombinations_options_11_a_span.setAttribute('class','value');

fontcombinations_options_11_a.appendChild(fontcombinations_options_11_a_span);
fontcombinations_options_11.appendChild(fontcombinations_options_11_a);

fontcombinations_options_11.addEventListener('click',function(){
tb(element,'fc',fontcombinations_options_11_a.innerText);
});

//-------------------------12----------------------------

var fontcombinations_options_12 = document.createElement('li');
var fontcombinations_options_12_a = document.createElement('a');
fontcombinations_options_12_a.classList.add('lastoption');
fontcombinations_options_12_a.innerText = '"Courier New", Courier, monospace';
fontcombinations_options_12_a.style.fontFamily = '"Courier New", Courier, monospace';

var fontcombinations_options_12_a_span = document.createElement('span');
fontcombinations_options_12_a_span.innerText = '"Courier New", Courier, monospace';
fontcombinations_options_12_a_span.setAttribute('class','value');

fontcombinations_options_12_a.appendChild(fontcombinations_options_12_a_span);
fontcombinations_options_12.appendChild(fontcombinations_options_12_a);

fontcombinations_options_12.addEventListener('click',function(){
tb(element,'fc',fontcombinations_options_12_a.innerText);
});

//---------------FontCombinations Options End---------------------

fontcombinations_selected_a.appendChild(fontcombinations_selected_a_span);
fontcombinations_selected.appendChild(fontcombinations_selected_a);

fontcombinations_options_ul.appendChild(fontcombinations_options_1);
fontcombinations_options_ul.appendChild(fontcombinations_options_2);
fontcombinations_options_ul.appendChild(fontcombinations_options_3);
fontcombinations_options_ul.appendChild(fontcombinations_options_4);
fontcombinations_options_ul.appendChild(fontcombinations_options_5);
fontcombinations_options_ul.appendChild(fontcombinations_options_6);
fontcombinations_options_ul.appendChild(fontcombinations_options_7);
fontcombinations_options_ul.appendChild(fontcombinations_options_8);
fontcombinations_options_ul.appendChild(fontcombinations_options_9);
fontcombinations_options_ul.appendChild(fontcombinations_options_10);
fontcombinations_options_ul.appendChild(fontcombinations_options_11);
fontcombinations_options_ul.appendChild(fontcombinations_options_12);

fontcombinations_options_ul.style.height = '80px';
fontcombinations_options_ul.style.overflowY = 'scroll';
fontcombinations_options.appendChild(fontcombinations_options_ul);

fontcombinations.appendChild(fontcombinations_selected);
fontcombinations.appendChild(fontcombinations_options);

//-----------------Event Handlers--------------------

fontcombinations_selected_a_span.addEventListener('click',function(e){

if(e.target == this){

if(fontcombinations_options.style.display == 'block'){

fontcombinations_options.style.display = 'none';
fontcombinations_options_ul.style.display = 'none';

}else{

fontcombinations_options.style.display = 'block';
fontcombinations_options_ul.style.display = 'block';

}

}else{

}

});

//-------End FontCombinations--------
*/

//-------Background Gradient--------

//-------EndX--------

var endx = document.createElement('combobox');
endx.setAttribute('id','endx');
endx.style.left = '15px';
endx.style.top = '5px';

var endxvalue = document.createElement('span');
endxvalue.setAttribute('id','bggexvalue');
endxvalue.setAttribute('hidden','');

var endx_customedit = document.createElement('input');
endx_customedit.classList.add('custom');

var endx_selected = document.createElement('selected');
var endx_selected_a = document.createElement('a');
var endx_selected_a_span = document.createElement('span');
endx_selected_a_span.innerText = 'End X';

endx_selected_a.appendChild(endx_selected_a_span);
endx_selected.appendChild(endx_selected_a);
endx_selected.appendChild(endx_customedit);

var endx_options = document.createElement('options');
var endx_options_ul = document.createElement('ul');
endx_options_ul.style.maxHeight = '60px';
endx_options_ul.style.overflowX = 'scroll';

//------------------EndX Options--------------------
//-------------------------1----------------------------

var endx_options_1 = document.createElement('li');

var endx_options_1_a = document.createElement('a');
endx_options_1_a.innerText = 'Left';

var endx_options_1_a_span = document.createElement('span');
endx_options_1_a_span.innerText = 'Left';
endx_options_1_a_span.setAttribute('class','value');

endx_options_1_a.appendChild(endx_options_1_a_span);
endx_options_1.appendChild(endx_options_1_a);

endx_options_1.addEventListener('click',function(){
    tb(element,'bggex',endx_options_1_a.innerText);
});

//-------------------------2----------------------------

var endx_options_2 = document.createElement('li');

var endx_options_2_a = document.createElement('a');
endx_options_2_a.innerText = 'Right';

var endx_options_2_a_span = document.createElement('span');
endx_options_2_a_span.innerText = 'Right';
endx_options_2_a_span.setAttribute('class','value');

endx_options_2_a.appendChild(endx_options_2_a_span);
endx_options_2.appendChild(endx_options_2_a);

endx_options_2.addEventListener('click',function(){
    tb(element,'bggex',endx_options_2_a.innerText);
});

//----------------End EndX Options------------------

endx_options_ul.appendChild(endx_options_1);
endx_options_ul.appendChild(endx_options_2);

endx_options.appendChild(endx_options_ul);

endx.appendChild(endx_selected);
endx.appendChild(endx_options);
endx.appendChild(endxvalue);

//-----------------Event Handlers--------------------

endx_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

        if(endx_options.style.display == 'block'){

            endx_options.style.display = 'none';
            endx_options_ul.style.display = 'none';

        }else{

            endx_options.style.display = 'block';
            endx_options_ul.style.display = 'block';

        }

    }else{

    }

});

//-------End EndX--------

//-------EndY--------

var endy = document.createElement('combobox');
endy.setAttribute('id','endy');
endy.style.left = '15px';
endy.style.top = '60px';
endy.style.zIndex = '4';

var endyvalue = document.createElement('span');
endyvalue.setAttribute('id','bggeyvalue');
endyvalue.setAttribute('hidden','');

var endy_customedit = document.createElement('input');
endy_customedit.classList.add('custom');

var endy_selected = document.createElement('selected');
var endy_selected_a = document.createElement('a');
var endy_selected_a_span = document.createElement('span');
endy_selected_a_span.innerText = 'End Y';

endy_selected_a.appendChild(endy_selected_a_span);
endy_selected.appendChild(endy_selected_a);
endy_selected.appendChild(endy_customedit);

var endy_options = document.createElement('options');
var endy_options_ul = document.createElement('ul');
endy_options_ul.style.maxHeight = '60px';
endy_options_ul.style.overflowX = 'scroll';

//------------------EndY Options--------------------
//-------------------------1----------------------------

var endy_options_1 = document.createElement('li');

var endy_options_1_a = document.createElement('a');
endy_options_1_a.innerText = 'Top';

var endy_options_1_a_span = document.createElement('span');
endy_options_1_a_span.innerText = 'Top';
endy_options_1_a_span.setAttribute('class','value');

endy_options_1_a.appendChild(endy_options_1_a_span);
endy_options_1.appendChild(endy_options_1_a);

endy_options_1.addEventListener('click',function(){
    tb(element,'bggey',endy_options_1_a.innerText);
});

//-------------------------2----------------------------

var endy_options_2 = document.createElement('li');

var endy_options_2_a = document.createElement('a');
endy_options_2_a.innerText = 'Bottom';

var endy_options_2_a_span = document.createElement('span');
endy_options_2_a_span.innerText = 'Bottom';
endy_options_2_a_span.setAttribute('class','value');

endy_options_2_a.appendChild(endy_options_2_a_span);
endy_options_2.appendChild(endy_options_2_a);

endy_options_2.addEventListener('click',function(){
    tb(element,'bggey',endy_options_2_a.innerText);
});

//----------------End EndY Options------------------

endy_options_ul.appendChild(endy_options_1);
endy_options_ul.appendChild(endy_options_2);

endy_options.appendChild(endy_options_ul);

endy.appendChild(endy_selected);
endy.appendChild(endy_options);
endy.appendChild(endyvalue);

//-----------------Event Handlers--------------------

endy_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

        if(endy_options.style.display == 'block'){

            endy_options.style.display = 'none';
            endy_options_ul.style.display = 'none';

        }else{

            endy_options.style.display = 'block';
            endy_options_ul.style.display = 'block';

        }

    }else{

    }

});

//-------End EndY--------

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

var margindiv = document.createElement('div');
margindiv.setAttribute('class','box');
margindiv.appendChild(marginleft);
margindiv.appendChild(marginbottom);
margindiv.appendChild(marginright);
margindiv.appendChild(margintop);
margindiv.style.height = '300px';

var margindivbanner = document.createElement('banner');
var margindivbannerh5 = document.createElement('h5');
margindivbannerh5.innerText = 'Margin';
margindivbanner.appendChild(margindivbannerh5);
margindiv.appendChild(margindivbanner);

var paddingdiv = document.createElement('div');
paddingdiv.setAttribute('class','box');
paddingdiv.appendChild(paddingleft);
paddingdiv.appendChild(paddingbottom);
paddingdiv.appendChild(paddingright);
paddingdiv.appendChild(paddingtop);
paddingdiv.style.height = '150px';
paddingdiv.style.width = '625px';

var paddingdivbanner = document.createElement('banner');
var paddingdivbannerh5 = document.createElement('h5');
paddingdivbannerh5.innerText = 'Padding';
paddingdivbanner.appendChild(paddingdivbannerh5);
paddingdiv.appendChild(paddingdivbanner);

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

var advancediv1 = document.createElement('div');
advancediv1.setAttribute('id','advance_div1');

var advancediv2 = document.createElement('div');
advancediv2.setAttribute('class','box');
advancediv2.setAttribute('id','bggradientdiv');
var advancediv2_banner = document.createElement('banner');
var advancediv2_bannerh5 = document.createElement('h5');
advancediv2_bannerh5.innerText = 'Background Gradient';
advancediv2_banner.appendChild(advancediv2_bannerh5);
advancediv2.appendChild(advancediv2_banner);

var advancediv2_ul_pseudotick = document.createElement('ul');
advancediv2_ul_pseudotick.setAttribute('class','pstick');
var advancediv2_li_pseudotick = document.createElement('li');
advancediv2_li_pseudotick.addEventListener('click',function(){
    applybgg('preview'+element);
});
advancediv2_ul_pseudotick.appendChild(advancediv2_li_pseudotick);

advancediv2.appendChild(advancediv2_ul_pseudotick);
advancediv2.appendChild(endx);
advancediv2.appendChild(endy);
advancediv2.appendChild(color1);
advancediv2.appendChild(color2);

advancediv1.appendChild(backgroundimage_div);
advancediv1.appendChild(textshadowdiv);
advancediv1.appendChild(margindiv);
advancediv1.appendChild(paddingdiv);

advancediv.appendChild(advancediv1);
advancediv.appendChild(advancediv2);
advancediv.appendChild(letterspacediv);
advancediv.appendChild(googlefontssdiv);
advancediv.appendChild(outlinediv);

setTimeout(function(){

    setupColorPicker('textscpb','textscps','preview'+element,'textshadowcolor','textscd','textscprgba','textscphex');
    setupColorPicker('bggc1cpb','bggc1cps','preview'+element,'backgroundgradient1','bggc1cd','bggc1cprgba','bggc1cphex');
    setupColorPicker('bggc2cpb','bggc2cps','preview'+element,'backgroundgradient2','bggc2cd','bggc2cprgba','bggc2cphex');
    setupColorPicker('ocpb','ocps','preview'+element,'outlinecolor','ocd','ocprgba','ocphex');


},5000)

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
