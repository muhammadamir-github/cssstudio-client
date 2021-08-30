class Animator{
    constructor(){
        this.elements = {}
    }

    async setup(elementType){
        const self = this;

        self.elements.animatorTimeline = await Globals.components.new({
            name: "animator-timeline",
            parent: document.getElementById("animate"),
            elementType,
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

        let animationSliders = Globals.elements.new({
            type: "div",
            parent: document.getElementById("aT"),
            id: "animationSliderBox",
            style: {
                opacity: "0.5",
                pointerEvents: "none"
            },
            before: true,
        });

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

        let sliders = [
            { id: "slideScaleX", text: "Scale x-axis", min: 1, max: 10, step: 0.1, value: 1 },
            { id: "slideScaleY", text: "Scale y-axis", min: 1, max: 10, step: 0.1, value: 1 },
            { id: "slideRotate", text: "Rotate", min: 1, max: 360, step: 1, value: 1 },
            { id: "slideSkewX", text: "Skew x-axis", min: 1, max: 10, step: 0.1, value: 1 },
            { id: "slideSkewY", text: "Skew y-axis", min: 1, max: 10, step: 0.1, value: 1 },
            { id: "slideFontSize", text: "Font Size", min: 1, max: 100, step: 1, value: 1 },
            { id: "slideFontWeight", text: "Font Weight", min: 0, max: 1, step: 1, value: 0 },
            { id: "slideBorderSize", text: "Border Size", min: 1, max: 100, step: 1, value: 1 },
            { id: "slideBorderRadius", text: "Border Radius", min: 1, max: 100, step: 1, value: 1 },
        ];

        for (let slider of sliders){
            let box = await Globals.elements.new({
                type: "div",
                parent: animationSliders,
                classes: [ "animationSliderDiv" ],
            });

            await Globals.components.new({
                name: "slider",
                elementType: element,
                parent: box,
                data: {
                    id: slider.id,
                    text: slider.text,
                    min: slider.min,
                    max: slider.max,
                    step: slider.step,
                    value: slider.value
                }
            });
        }

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
