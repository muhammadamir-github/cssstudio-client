class Animator{
    constructor(){
        this.elements = {}
    }

    async setup(elementType){
        const self = this;

        self.elements.animatorTimeline = await Globals.components.new({
            name: "animator-timeline",
            parent: document.getElementById("animate"),
            data: {
                elementType,
            }
        });

        $('#aT').find('*').not('.newanimationbtn').not('.aTbutton').css({'opacity':'0.5','pointerEvents':'none'});
        $('.aTbutton').css({'pointer-events':'none'});

        self.setupSlideOptions();
    }

    applyanimation(a,element){
        var animation = document.getElementById('a'+a);
        animation.addEventListener('click',function(){
            $('#preview'+element).css('animation-name',a);
            $('animationPreview').css('border','');
            $('#noa').css('border','0px');
            this.style.border = '1px solid green';
        });
    }

    readymadeanimations(element){
        const self = this;
        var animationsstyle = document.createElement('style');

        var readymadeanimations_div = document.createElement('div');
        readymadeanimations_div.setAttribute('id','rmadiv');
        readymadeanimations_div.style.opacity = '0.3';
        readymadeanimations_div.style.pointerEvents = 'none';

        var readymadeanimations_div_banner = document.createElement('banner');
        var readymadeanimations_div_banner_text = document.createElement('h5');
        readymadeanimations_div_banner_text.innerText = 'Ready Made Animations';
        readymadeanimations_div_banner.appendChild(readymadeanimations_div_banner_text);
        readymadeanimations_div.appendChild(readymadeanimations_div_banner);

        var animationcontainer = document.createElement('div');
        animationcontainer.setAttribute('id','rmadiv_acontainer');

        readymadeanimations_div.appendChild(animationcontainer);

        $('#animate').append(readymadeanimations_div);

        var noanimation = document.createElement('animationPreview');
        noanimation.setAttribute('id','noa');
        noanimation.style.backgroundSize = 'contain';
        noanimation.style.backgroundImage = 'url(none.png)';
        noanimation.style.backgroundRepeat = 'no-repeat';
        noanimation.style.border = '0px';
        noanimation.addEventListener('click',function(){
            var previewelement = document.getElementById('preview'+element);

            previewelement.style.animationDelay = '';
            previewelement.style.animationTimingFunction = '';
            previewelement.style.animationIterationCount = '';
            previewelement.style.animationName = '';
            previewelement.style.animationDuration = '';

            $('animationPreview').css('border','');
            noanimation.style.border = '1px solid green';
        });
        animationcontainer.append(noanimation);

        if(Globals.pageHandler.data.plan !== 'Free'){
            if(Globals.pageHandler.data.plan == 'Gold' || Globals.pageHandler.data.plan == 'Diamond'){

                for(var i = 1; i < Globals.pageHandler.animations.length; i++){
                    animationsstyle.innerText += '\n' + Globals.pageHandler.animations[i].css + '\n';
                    var animation = document.createElement('animationPreview');
                    animation.setAttribute('id','a'+Globals.pageHandler.animations[i].name);

                    var previewbutton = document.createElement('button');
                    previewbutton.setAttribute('id','previewbutton');
                    previewbutton.setAttribute('class','apelement');

                    if(element == 'input'){
                        previewbutton.innerText = document.getElementById('previewbox').getElementsByTagName(element)[0].value;
                    }else{

                        if(element == 'paragraph'){
                            previewbutton.innerText = document.getElementById('previewbox').getElementsByTagName('p')[0].innerText;
                        }

                        if(element == 'image' || element == 'video'){
                            previewbutton.innerText = element;
                        }

                        if(element == 'heading'){
                            previewbutton.innerText = document.getElementById('previewbox').getElementsByTagName('h3')[0].innerText;
                        }

                    }


                    previewbutton.style.fontSize = '8px';
                    previewbutton.style.width = '50px';
                    previewbutton.style.height = '20px';
                    previewbutton.style.position = 'relative';
                    previewbutton.style.transform = 'translate(0)';
                    previewbutton.style.left = '25px';
                    previewbutton.style.top = '40px';
                    previewbutton.style.marginTop = '0px';

                    previewbutton.style.animationName = Globals.pageHandler.animations[i].name;
                    previewbutton.style.animationDuration = Math.floor((Math.random() * 3) + 1);

                    if(Globals.pageHandler.animations[i].name.includes('FADE')){
                        previewbutton.style.animationDuration = '3s';
                    }

                    if(Globals.pageHandler.animations[i].name.includes('BOUNCE')){
                        previewbutton.style.animationDuration = '1s';
                    }

                    if(Globals.pageHandler.animations[i].name.includes('FLIP')){
                        previewbutton.style.animationDuration = '2s';
                    }

                    if(Globals.pageHandler.animations[i].name.includes('ROTATE')){
                        previewbutton.style.animationDuration = '3s';
                    }

                    if(Globals.pageHandler.animations[i].name.includes('SLIDE')){
                        previewbutton.style.animationDuration = '3s';
                    }

                    if(Globals.pageHandler.animations[i].name.includes('ZOOM')){
                        previewbutton.style.animationDuration = '2s';
                    }

                    if(Globals.pageHandler.animations[i].name.includes('ROLL')){
                        previewbutton.style.animationDuration = '2s';
                    }

                    previewbutton.style.animationDelay = Math.floor((Math.random() * 8) + 3) + 's';
                    previewbutton.style.animationTimingFunction = 'linear';
                    previewbutton.style.animationIterationCount = 'Infinite';

                    animation.appendChild(previewbutton);

                    /*if(i == 8 || i == 12 || i == 18 || i == 28 || i == 31){
                        //animation.style.border = '1px solid #0066ff';

                        var newlabel = document.createElement('span');
                        newlabel.setAttribute('class','alabel_new');
                        newlabel.innerText = 'New';
                        animation.append(newlabel);

                        animation.classList.add('newanimation');
                    }*/

                    animationcontainer.append(animation);
                    self.applyanimation(Globals.pageHandler.animations[i].name,element);
            }

            readymadeanimations_div_banner_text.innerText = Globals.pageHandler.animations.length + ' Ready Made Animations';
            readymadeanimations_div.style.opacity = '1';
            readymadeanimations_div.style.pointerEvents = 'unset';
        }
    }

    document.getElementsByTagName('body')[0].appendChild(animationsstyle);

    }

    async setupSlideOptions(element){
        const self = this;

        var animationSliders = document.createElement('div');
        animationSliders.setAttribute('id','animationSliderBox');
        animationSliders.style.opacity = '0.5';
        animationSliders.style.pointerEvents = 'none';

        var percentage = await Globals.components.new({
            name: "combobox",
            parent: self.elements.animatorTimeline,
            data: {
                id: "slidePercentage",
                elementType: element,
                width: "200px",
                style: {
                    left: "30px",
                    top: "350px",
                    opacity: "0.5",
                    pointerEvents: "none"
                },
                text: "Percentage",
                options: [],
                tooltip: {
                    text: "Percentage is when the slide is executed during the animation. Percentage can be from 0% to 100%. The animation starts from 0% and ends at 100%."
                },
                customValue: {
                    call: "updateElement",
                    key: "slidePercentage",
                    valueSuffix: "%"
                }
            },
            before: true, // Before animatorTimeline
        });

        var opacity = await Globals.components.new({
            name: "combobox",
            parent: self.elements.animatorTimeline,
            data: {
                id: "slideOpacity",
                width: "200px",
                style: {
                    left: "30px",
                    top: "420px",
                    opacity: "0.5",
                    pointerEvents: "none",
                    zIndex: 1
                },
                text: "Opacity",
                options: [],
                customValue: {
                    call: "dataAttributeBalancer",
                    key: "slideOpacity"
                }
            },
            before: true, // Before animatorTimeline
        });

        //-------End Opacity--------

        //----------Scale-----------

        var scaleboxdiv_x = document.createElement('div');
        var scaleboxdiv_x_p = document.createElement('p');
        scaleboxdiv_x_p.innerText = 'Scale X-axis';
        scaleboxdiv_x.appendChild(scaleboxdiv_x_p);
        scaleboxdiv_x.setAttribute('class','animationSliderDiv');

        var scaleboxdiv_y = document.createElement('div');
        var scaleboxdiv_y_p = document.createElement('p');
        scaleboxdiv_y_p.innerText = 'Scale Y-axis';
        scaleboxdiv_y.appendChild(scaleboxdiv_y_p);
        scaleboxdiv_y.setAttribute('class','animationSliderDiv');

        var scale_slider_y = document.createElement('input');
        scale_slider_y.setAttribute('type','range');
        scale_slider_y.setAttribute('class','slider');
        scale_slider_y.setAttribute('min','1');
        scale_slider_y.setAttribute('max','10');
        scale_slider_y.setAttribute('step','0.1');
        scale_slider_y.setAttribute('value','1');
        scale_slider_y.setAttribute('id','slideScaleY');
        scaleboxdiv_y.appendChild(scale_slider_y);

        var scale_slider_x = document.createElement('input');
        scale_slider_x.setAttribute('type','range');
        scale_slider_x.setAttribute('class','slider');
        scale_slider_x.setAttribute('min','1');
        scale_slider_x.setAttribute('max','10');
        scale_slider_x.setAttribute('step','0.1');
        scale_slider_x.setAttribute('value','1');
        scale_slider_x.setAttribute('id','slideScaleX');
        scaleboxdiv_x.appendChild(scale_slider_x);

        scale_slider_x.addEventListener('input',function(){
            self.dataAttributeBalancer('slideScaleX',this.value);
        });

        scale_slider_y.addEventListener('input',function(){
            self.dataAttributeBalancer('slideScaleY',this.value);
        });

        //--------End Scale---------

        //----------Rotate-----------

        var rotateboxdiv_x = document.createElement('div');
        var rotateboxdiv_x_p = document.createElement('p');
        rotateboxdiv_x_p.innerText = 'Rotate';
        rotateboxdiv_x.appendChild(rotateboxdiv_x_p);
        rotateboxdiv_x.setAttribute('class','animationSliderDiv');

        var rotate_slider_x = document.createElement('input');
        rotate_slider_x.setAttribute('type','range');
        rotate_slider_x.setAttribute('class','slider');
        rotate_slider_x.setAttribute('min','1');
        rotate_slider_x.setAttribute('max','360');
        rotate_slider_x.setAttribute('step','1');
        rotate_slider_x.setAttribute('value','1');
        rotate_slider_x.setAttribute('id','slideRotate');
        rotateboxdiv_x.appendChild(rotate_slider_x);

        rotate_slider_x.addEventListener('input',function(){
            self.dataAttributeBalancer('slideRotate',this.value);
        });

        //--------End Rotate---------

        //----------Skew-----------

        var skewboxdiv_x = document.createElement('div');
        var skewboxdiv_x_p = document.createElement('p');
        skewboxdiv_x_p.innerText = 'Skew X-axis';
        skewboxdiv_x.appendChild(skewboxdiv_x_p);
        skewboxdiv_x.setAttribute('class','animationSliderDiv');

        var skewboxdiv_y = document.createElement('div');
        var skewboxdiv_y_p = document.createElement('p');
        skewboxdiv_y_p.innerText = 'Skew Y-axis';
        skewboxdiv_y.appendChild(skewboxdiv_y_p);
        skewboxdiv_y.setAttribute('class','animationSliderDiv');

        var skew_slider_y = document.createElement('input');
        skew_slider_y.setAttribute('type','range');
        skew_slider_y.setAttribute('class','slider');
        skew_slider_y.setAttribute('min','1');
        skew_slider_y.setAttribute('max','10');
        skew_slider_y.setAttribute('step','0.1');
        skew_slider_y.setAttribute('value','1');
        skew_slider_y.setAttribute('id','slideSkewY');
        skewboxdiv_y.appendChild(skew_slider_y);

        var skew_slider_x = document.createElement('input');
        skew_slider_x.setAttribute('type','range');
        skew_slider_x.setAttribute('class','slider');
        skew_slider_x.setAttribute('min','1');
        skew_slider_x.setAttribute('max','10');
        skew_slider_x.setAttribute('step','0.1');
        skew_slider_x.setAttribute('value','1');
        skew_slider_x.setAttribute('id','slideSkewX');
        skewboxdiv_x.appendChild(skew_slider_x);

        skew_slider_x.addEventListener('input',function(){
            self.dataAttributeBalancer('slideSkewX',this.value);
        });

        skew_slider_y.addEventListener('input',function(){
            self.dataAttributeBalancer('slideSkewY',this.value);
        });

        //--------End Skew---------

        //----------Font-----------

        var fontsizeboxdiv = document.createElement('div');
        var fontsizeboxdiv_p = document.createElement('p');
        fontsizeboxdiv_p.innerText = 'Font Size';
        fontsizeboxdiv.appendChild(fontsizeboxdiv_p);
        fontsizeboxdiv.setAttribute('class','animationSliderDiv');

        var fontsize_slider = document.createElement('input');
        fontsize_slider.setAttribute('type','range');
        fontsize_slider.setAttribute('class','slider');
        fontsize_slider.setAttribute('min','1');
        fontsize_slider.setAttribute('max','100');
        fontsize_slider.setAttribute('step','1');
        fontsize_slider.setAttribute('value','1');
        fontsize_slider.setAttribute('id','slideFontSize');
        fontsizeboxdiv.appendChild(fontsize_slider);

        var fontweightboxdiv = document.createElement('div');
        var fontweightboxdiv_p = document.createElement('p');
        fontweightboxdiv_p.innerText = 'Font Weight';
        fontweightboxdiv.appendChild(fontweightboxdiv_p);
        fontweightboxdiv.setAttribute('class','animationSliderDiv');

        var fontweight_slider = document.createElement('input');
        fontweight_slider.setAttribute('type','range');
        fontweight_slider.setAttribute('class','slider');
        fontweight_slider.setAttribute('min','0');
        fontweight_slider.setAttribute('max','1');
        fontweight_slider.setAttribute('step','1');
        fontweight_slider.setAttribute('value','0');
        fontweight_slider.setAttribute('id','slideFontWeight');
        fontweightboxdiv.appendChild(fontweight_slider);

        fontsize_slider.addEventListener('input',function(){
            self.dataAttributeBalancer('slideFontSize',this.value);
        });

        fontweight_slider.addEventListener('input',function(){
            var v = '';
            if(this.value == '0'){
                v = 'normal';
            }
            if(this.value == '1'){
                v = 'bold';
            }
            self.dataAttributeBalancer('slideFontWeight',v);
        });

        //---------End Font----------

        //----------Border-----------

        var bordersizeboxdiv = document.createElement('div');
        var bordersizeboxdiv_p = document.createElement('p');
        bordersizeboxdiv_p.innerText = 'Border Size';
        bordersizeboxdiv.appendChild(bordersizeboxdiv_p);
        bordersizeboxdiv.setAttribute('class','animationSliderDiv');

        var bordersize_slider = document.createElement('input');
        bordersize_slider.setAttribute('type','range');
        bordersize_slider.setAttribute('class','slider');
        bordersize_slider.setAttribute('min','1');
        bordersize_slider.setAttribute('max','100');
        bordersize_slider.setAttribute('step','1');
        bordersize_slider.setAttribute('value','1');
        bordersize_slider.setAttribute('id','slideBorderSize');
        bordersizeboxdiv.appendChild(bordersize_slider);

        var borderradiusboxdiv = document.createElement('div');
        var borderradiusboxdiv_p = document.createElement('p');
        borderradiusboxdiv_p.innerText = 'Border Radius';
        borderradiusboxdiv.appendChild(borderradiusboxdiv_p);
        borderradiusboxdiv.setAttribute('class','animationSliderDiv');

        var borderradius_slider = document.createElement('input');
        borderradius_slider.setAttribute('type','range');
        borderradius_slider.setAttribute('class','slider');
        borderradius_slider.setAttribute('min','1');
        borderradius_slider.setAttribute('max','100');
        borderradius_slider.setAttribute('step','1');
        borderradius_slider.setAttribute('value','1');
        borderradius_slider.setAttribute('id','slideBorderRadius');
        borderradiusboxdiv.appendChild(borderradius_slider);

        bordersize_slider.addEventListener('input',function(){
            self.dataAttributeBalancer('slideBorderSize',this.value);
        });

        borderradius_slider.addEventListener('input',function(){
            self.dataAttributeBalancer('slideBorderRadius',this.value);
        });

        //---------End Border----------

        animationSliders.appendChild(scaleboxdiv_x);
        animationSliders.appendChild(scaleboxdiv_y);
        animationSliders.appendChild(rotateboxdiv_x);
        animationSliders.appendChild(skewboxdiv_x);
        animationSliders.appendChild(skewboxdiv_y);
        animationSliders.appendChild(fontsizeboxdiv);
        animationSliders.appendChild(fontweightboxdiv);
        animationSliders.appendChild(bordersizeboxdiv);
        animationSliders.appendChild(borderradiusboxdiv);

        let comboboxes = [
            { id: "fontcolor", style: { left: "10px" }, text: "Font Color", idPrefix: "animatef", key: "animation-color", property: "font" },
            { id: "bordercolor", style: { left: "200px" }, text: "Border Color", idPrefix: "animateb", key: "animation-borderColor", property: "background" },
            { id: "backgroundcolor", style: { left: "390px" }, text: "Background Color", idPrefix: "animatebg", key: "animation-backgroundColor", property: "border" }
        ];

        for (let x of comboboxes){
            await Globals.components.new({
                name: "combobox",
                parent: animationSliders,
                elementType: element,
                data: {
                    id: x.id,
                    width: "200px",
                    fontSize: "12px",
                    style: x.style,
                    text: x.text,
                    options: [],
                    colorPicker: {
                        idPrefix: x.idPrefix,
                        key: x.key,
                        property: x.property
                    }
                }
            });
        }

        $(animationSliders).insertBefore("#aT");
    }

    async animate(element,createnew){
        const self = this;
        if(createnew == 'false'){

            document.getElementsByClassName('spinner')[0].style.display = 'block';
            var panel = document.getElementById('panel');
            panel.style.opacity = '0.3';
            panel.style.pointerEvents = 'none';

            var info = document.createElement('p');
            info.setAttribute('class','info');
            info.innerText = 'Animations might appear irresponsive in the preview box due to different positioning.'

            var backbutton = document.createElement('button');
            backbutton.setAttribute('class','barbutton');
            backbutton.innerText = 'Go Back';
            backbutton.style.marginLeft = '10px';
            backbutton.addEventListener('click',function(){

                var spinner = document.getElementsByClassName('spinner')[0];
                spinner.style.display = 'block';

                var panel = document.getElementById('panel');
                panel.style.opacity = '0.3';
                panel.style.pointerEvents = 'none';

                var animatediv = document.getElementById('animate');

                setTimeout(function(){

                    spinner.style.display = 'none';
                    panel.style.opacity = '1';
                    panel.style.pointerEvents = 'unset';
                    animatediv.style.display = 'none';
                    backbutton.remove();
                    $('.info').remove();

                },1);

            });

            setTimeout(function(){

                $('#buttons').append(backbutton);
                $('#previewbox').append(info);
                document.getElementsByClassName('spinner')[0].style.display = 'none';
                document.getElementById('animate').style.display = 'block';
                panel.style.opacity = '1';
                panel.style.pointerEvents = 'unset';

            },1);

        }

        if(createnew == 'true'){

            var info = document.createElement('p');
            info.setAttribute('class','info');
            info.innerText = 'Animations might appear irresponsive in the preview box due to different positioning.'

            var animatediv = document.createElement('div');
            animatediv.setAttribute('id','animate');

            var backbutton = document.createElement('button');
            backbutton.setAttribute('class','barbutton');
            backbutton.innerText = 'Go Back';
            backbutton.style.marginLeft = '10px';
            backbutton.addEventListener('click',function(){

                var spinner = document.getElementsByClassName('spinner')[0];
                spinner.style.display = 'block';

                var panel = document.getElementById('panel');
                panel.style.opacity = '0.3';
                panel.style.pointerEvents = 'none';

                var animatediv = document.getElementById('animate');

                setTimeout(function(){

                    spinner.style.display = 'none';
                    panel.style.opacity = '1';
                    panel.style.pointerEvents = 'unset';
                    animatediv.style.display = 'none';
                    backbutton.remove();
                    $('.info').remove();

                },1);

            });

            //---------------- Settings ----------------------

            var settings_div = document.createElement('div');
            settings_div.setAttribute('id','settingsdiv');

            settings_div.style.zIndex = '3';

            var settings_div_banner = document.createElement('banner');
            var settings_div_banner_text = document.createElement('h5');
            settings_div_banner_text.innerText = 'Settings';
            settings_div_banner.appendChild(settings_div_banner_text);
            settings_div.appendChild(settings_div_banner);

            let comboboxes = [
                {
                    id: "duration",
                    elementType: element,
                    text: "Duration",
                    style: {
                        left: "50%",
                        marginTop: "70px",
                        transform: "translate(-50%)"
                    },
                    customValue: {
                        call: "updateElement",
                        key: "animatedr",
                        valueSuffix: "s",
                        style: { width: "40%" }
                    },
                    options: [],
                },
                {
                    id: "delay",
                    elementType: element,
                    text: "Delay",
                    style: {
                        left: "50%",
                        marginTop: "130px",
                        transform: "translate(-50%)"
                    },
                    customValue: {
                        call: "updateElement",
                        key: "animated",
                        valueSuffix: "s",
                        style: { width: "40%" }
                    },
                    options: [],
                },
                {
                    id: "iteration",
                    elementType: element,
                    text: "Iteration",
                    style: {
                        left: "50%",
                        marginTop: "190px",
                        transform: "translate(-50%)"
                    },
                    customValue: {
                        call: "updateElement",
                        key: "animatei",
                        valueSuffix: "",
                        style: { width: "40%" }
                    },
                    options: [],
                },
                {
                    id: "timing",
                    text: "Timing",
                    elementType: element,
                    style: {
                        left: "50%",
                        marginTop: "250px",
                        transform: "translate(-50%)"
                    },
                    options: ["Linear", "Ease", "Ease-In", "Ease-Out", "Ease-In-Out",],
                }
            ];

            for (let x of comboboxes){
                await Globals.components.new({
                    name: "combobox",
                    parent: settings_div,
                    data: {
                        id:x.id,
                        width: "200px",
                        style: x.style,
                        text:x.text,
                        options: x.options
                    }
                });
            }

            animatediv.appendChild(settings_div);

            //----------------Fade in timming------------------

            document.getElementsByClassName('spinner')[0].style.display = 'block';
            var panel = document.getElementById('panel');
            panel.style.opacity = '0.3';
            panel.style.pointerEvents = 'none';

            setTimeout(function(){

                $('#buttons').append(backbutton);
                $('#panel').append(animatediv);
                $('#previewbox').append(info);
                document.getElementsByClassName('spinner')[0].style.display = 'none';
                panel.style.opacity = '1';
                panel.style.pointerEvents = 'unset';
                self.readymadeanimations(element);
                self.setup(element);

            },1);

        }
    }
}
