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

        self.setupSlideOptions(elementType);
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

        let animationsStyle = Globals.elements.new({
            type: 'style',
            parent: Globals.window.body,
            text: Globals.pageHandler.data.plan == 'Gold' || Globals.pageHandler.data.plan == 'Diamond' ? (() => {
                return Globals.pageHandler.animations.map(x => {
                    return '\n' + x.css + '\n';
                }).flat().join("");
            })() : null,
        });

        let readyMadeAnimationsDiv = Globals.elements.new({
            type: 'div',
            parent: document.getElementById("animate"),
            id: "rmadiv",
            style: {
                opacity: Globals.pageHandler.data.plan == 'Gold' || Globals.pageHandler.data.plan == 'Diamond' ? "1" : "0.3",
                pointerEvents: Globals.pageHandler.data.plan == 'Gold' || Globals.pageHandler.data.plan == 'Diamond' ? "unset" : "none"
            },
            children: [
                {
                    type: "banner",
                    children: [
                        {
                            type: "h5",
                            text: Globals.pageHandler.data.plan == 'Gold' || Globals.pageHandler.data.plan == 'Diamond' ? `${Globals.pageHandler.animations.length} Ready Made Animations` : "Ready Made Animations"
                        }
                    ]
                },
                {
                    type: "div",
                    id: "rmadiv_acontainer",
                    children: [
                        {
                            type: "animationPreview",
                            id: "noa",
                            style: {
                                backgroundSize: "contain",
                                backgroundImage: "url(none.png)",
                                backgroundRepeat: "no-repeat",
                                border: "0px",
                            },
                            listeners: {
                                click: function(){
                                    var previewelement = document.getElementById('preview'+element);

                                    previewelement.style.animationDelay = '';
                                    previewelement.style.animationTimingFunction = '';
                                    previewelement.style.animationIterationCount = '';
                                    previewelement.style.animationName = '';
                                    previewelement.style.animationDuration = '';

                                    $('animationPreview').css('border','');
                                    this.style.border = '1px solid green';
                                }
                            }
                        },
                        ...(() => {
                            return Globals.pageHandler.data.plan == 'Gold' || Globals.pageHandler.data.plan == 'Diamond' ? Globals.pageHandler.animations.map((x, i) => {
                                let text = "Button";

                                let duration = Math.floor((Math.random() * 3) + 1);
                                if(x.name.includes('FADE')){ duration = '3s'; }
                                if(x.name.includes('BOUNCE')){ duration = '1s'; }
                                if(x.name.includes('FLIP')){ duration = '2s'; }
                                if(x.name.includes('ROTATE')){ duration = '3s'; }
                                if(x.name.includes('SLIDE')){ duration = '3s'; }
                                if(x.name.includes('ZOOM')){ duration = '2s'; }
                                if(x.name.includes('ROLL')){ duration = '2s'; }

                                if(element == 'input'){
                                    text = document.getElementById('previewbox').getElementsByTagName(element)[0].value;
                                }else{
                                    if(element == 'paragraph'){
                                        text = document.getElementById('previewbox').getElementsByTagName('p')[0].innerText;
                                    }

                                    if(element == 'image' || element == 'video'){ text = element; }
                                    if(element == 'heading'){
                                        text = document.getElementById('previewbox').getElementsByTagName('h3')[0].innerText;
                                    }
                                }

                                return {
                                    type: "animationPreview",
                                    id: `a${x.name}`,
                                    children: [
                                        {
                                            type: "button",
                                            id: "previewbutton",
                                            classes: [ "apelement" ],
                                            text: text,
                                            style: {
                                                fontSize: "8px",
                                                width: "50px",
                                                height: "20px",
                                                position: "relative",
                                                transform: "translate(0)",
                                                left: "25px",
                                                top: "40px",
                                                marginTop: "0px",
                                                animationName: x.name,
                                                animationDuration: duration,
                                                animationDelay: Math.floor((Math.random() * 8) + 3) + 's',
                                                animationTimingFunction: "linear",
                                                animationIterationCount: "Infinite",
                                            }
                                        }
                                    ]
                                }
                            }) : [];
                        })(),
                    ]
                },
            ]
        });

        let animationPreviews = readyMadeAnimationsDiv.getElementsByTagName("animationPreview");
        for(var i=0; i<animationPreviews.length; i++){
            if(i === 0){ continue; }
            self.applyanimation(animationPreviews[i].style.animationName, animationPreviews[i]);
        }
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
                    call: "updateElement"
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
                    call: "dataAttributeBalancer"
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
            { id: "fontcolor", style: { left: "10px" }, text: "Font Color", idPrefix: "animatef", },
            { id: "bordercolor", style: { left: "200px" }, text: "Border Color", idPrefix: "animateb", },
            { id: "backgroundcolor", style: { left: "390px" }, text: "Background Color", idPrefix: "animatebg",}
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
                        idPrefix: x.idPrefix
                    }
                }
            });
        }

        $(animationSliders).insertBefore("#aT");
    }

    async animate(element,createnew){
        const self = this;

        let panel = document.getElementById('panel');
        let backButton = Globals.elements.new({
            type: "button",
            parent: document.getElementById("buttons"),
            classes: [ "barbutton", "backButton" ],
            text: "Go Back",
            style: {
                marginLeft: "10px",
            },
            listeners: {
                click: function(){
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
                        backButton.remove();
                        $('.info').remove();
                    },1);
                }
            }
        });

        if(createnew == 'true'){
            var animatediv = Globals.elements.new({
                type: "div",
                parent: panel,
                id: "animate",
            });

            var settings_div = Globals.elements.new({
                type: "div",
                parent: animatediv,
                id: "settingsdiv",
                style: {
                    zIndex: "3",
                },
                children: [
                    {
                        type: "banner",
                        children: [
                            {
                                type: "h5",
                                text: "Settings"
                            }
                        ]
                    }
                ]
            });

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
                        placeholder: "9999 for infinite",
                        call: "updateElement",
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
                    options: ["Linear", "Ease", "Ease-In", "Ease-Out", "Ease-In-Out"],
                }
            ];

            for (let x of comboboxes){
                await Globals.components.new({
                    name: "combobox",
                    parent: settings_div,
                    elementType: x.elementType,
                    data: {
                        id:x.id,
                        width: "200px",
                        style: x.style,
                        text: x.text,
                        options: x.options,
                        customValue: x.customValue
                    }
                });
            }
        }

        document.getElementsByClassName('spinner')[0].style.display = 'block';
        panel.style.opacity = '0.3';
        panel.style.pointerEvents = 'none';

        setTimeout(function(){
            let info = Globals.elements.new({
                type: "p",
                parent: document.getElementById("previewbox"),
                classes: [ "info" ],
                text: "Animations might appear irresponsive in the preview box due to different positioning."
            });

            document.getElementsByClassName('spinner')[0].style.display = 'none';
            document.getElementById('animate').style.display = 'block';
            panel.style.opacity = '1';
            panel.style.pointerEvents = 'unset';

            if(createnew == 'true'){
                self.readymadeanimations(element);
                self.setup(element);
            }
        },1);
    }
}
