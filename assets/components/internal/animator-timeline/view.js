class InternalAnimatorTimelineView{
    constructor(controller){
        this.controller = controller;
        this._element = null;
    }

    create(options = {}){
        const self = this;
        const { data, parent, prepend, before, component_id } = options;

        let children = [
            {
                type: "div",
                id: "atButtons",
                children: []
            }
        ];

        [
            {
                name: "Add Slide",
                callback: function(){
                    self.addSlides(1);
                },
                style: { backgroundColor: "darkred" },
                icon: "fas fa-plus",
            },
            {
                name: "Reset",
                callback: function(){ self.resetSlides(); },
                style: { backgroundColor: "#3399ff" },
                icon: "fas fa-sync-alt",
            },
            {
                name: "Play",
                callback: function(){ self.animationActions("play", ''); },
                style: { backgroundColor: "#88cc00" },
                icon: "fas fa-play",
            }
        ].forEach(x => {
            children[0].children.push({
                type: "span",
                classes: [ "aTbutton" ],
                style: x.style,
                listeners: {
                    click: x.callback,
                    mouseover: function(){
                        Globals.tooltip.show(this, x.name, "centerTop");
                    },
                    mouseout: function(){
                        Globals.tooltip.hide();
                    }
                },
                children: [
                    {
                        type: "i",
                        classes: x.icon.split(" ")
                    },
                ]
            });
        });

        children[0].children.push({
            type: "span",
            classes: [ "aTbutton" ],
            style: { backgroundColor: "#463496" },
            listeners: {
                click: function(){
                    self.disable(self);
                },
                mouseover: function(){
                    Globals.tooltip.show(this, "Switch to ready made animations", "centerTop");
                },
                mouseout: function(){
                    Globals.tooltip.hide();
                }
            },
            children: [
                {
                    type: "i",
                    classes: [ "fas", "fa-toggle-on" ]
                },
            ]
        });

        children.push({
            type: "button",
            id: "newAnimationButton",
            text: "Create New Animation",
            listeners: {
                click: function(){
                    self.enable(self);
                }
            }
        });

        self._element = Globals.elements.new({
            type: "div",
            parent,
            id: "animationTimeline",
            children,
            before: before,
            prepend: prepend,
            attributes: {
                "data-component-id": component_id,
            },
        });

        self.disable(self);
        //setupSlideStyler();
    }

    async resetSlides(){
        const self = this;
        const data = await self.controller._getModelState();
        if(Array.isArray(data.slides)){
            for await (let slide of data.slides){
                slide.element.remove();
            }
        }

        await self.controller._updateModelState({ slides: [], });
    }

    deleteSlide(number){
        const self = this;
        const data = self.controller._getModelState();
        const slide = data.slides.find(x => (x.number === number));
        if(slide){
            slide.element.remove();
            self.controller._updateModelState({ slides: (() => { return data.slides.filter(x => (x.number !== number)); })(), });
            self.reNumberSlides();
        }
    }

    async reNumberSlides(){
        const self = this;
        const data = await self.controller._getModelState();
        if(Array.isArray(data.slides)){
            let i = 1;
            for await (let slide of data.slides){
                slide.number = i;
                slide.element.getElementsByClassName("animationSlideNumber")[0] ? slide.element.getElementsByClassName("animationSlideNumber")[0].innerText = i : false;
                i++;
            }
        }
    }

    addSlides(count = 1){
        const self = this;
        const data = self.controller._getModelState();
        let newSlides = [];

        if(self._element){
            for(let i=0; i<count; i++){
                ((self, data, i) => {
                    let slideNumber = data.slides.length+(i+1);
                    let slide = Globals.elements.new({
                        type: "animationSlide",
                        parent: self._element,
                        attributes: {
                            "data-percentage": "%",
                            "data-attr-avail": "100",
                        },
                        listeners: {
                            click: function(){
                                $('.slideSelected').removeClass('slideSelected');
                                this.classList.add('slideSelected');
                                self.animationActions('options-enable','');
                                self.updateSlideOptions();
                            }
                        },
                        children: [
                            {
                                type: "span",
                                style: { backgroundColor: "black" },
                                classes: [ "animationSlideNumber" ],
                                text: slideNumber,
                            },
                            {
                                type: "span",
                                classes: [ "animationSlideButton" ],
                                listeners: {
                                    click: function(e){
                                        e.stopPropagation();
                                        self.deleteSlide(slideNumber);
                                    },
                                    mouseover: function(){
                                        Globals.tooltip.show(this, "Delete Slide", "centerTop");
                                    },
                                    mouseout: function(){
                                        Globals.tooltip.hide();
                                    }
                                },
                                children: [
                                    {
                                        type: "i",
                                        classes: [ "far", "fa-trash-alt" ]
                                    },
                                ]
                            },
                            {
                                type: "span",
                                classes: [ "animationSlideButton" ],
                                listeners: {
                                    mouseover: function(){
                                        Globals.tooltip.show(this, "Reset Slide", "centerTop");
                                    },
                                    mouseout: function(){
                                        Globals.tooltip.hide();
                                    }
                                },
                                children: [
                                    {
                                        type: "i",
                                        classes: [ "fas", "fa-sync-alt" ]
                                    },
                                ]
                            },
                        ]
                    });

                    newSlides.push({ number: slideNumber, element: slide });
                })(self, data, i);
            }

            self.controller._updateModelState({ slides: [...data.slides, ...newSlides] });
        }
    }

    animationActions(action, n, element){
        const self = this;
        var animatorTimeline = self._element;

        if(action == 'play'){
            $('style').remove();
            var myReuseableStylesheet = document.createElement('style');
            myReuseableStylesheet.appendChild(document.createTextNode(""));
            document.head.appendChild(myReuseableStylesheet);

            var name = 'preview';
            var frames = '';

            var slides = animatorTimeline.getElementsByTagName('animationSlide');

            for(var i=0; i<slides.length; i++){
                var percentage = $(slides[i]).attr('data-percentage');
                var tempframes = '';
                var transform = 'transform: translate(-50%,-50%) ';

                if($(slides[i]).attr('data-action-one')){
                    var a = $(slides[i]).attr('data-action-one').toLowerCase();
                    var b = $(slides[i]).attr('data-action-one-value');
                    var c = a + ':' + b + ';';

                    if(a.includes('scale') || a.includes('skew') || a.includes('rotate')){
                        if(a.includes('rotate') || a.includes('skew')){
                            transform = transform + a + '(' + b + 'deg)' + ';';
                        }else{
                            transform = transform + a + '(' + b + ')' + ';';
                        }
                        tempframes = tempframes + transform;
                    }else{
                        if(a == 'fontsize'){
                            c = 'font-size' + ':' + b + 'px;';
                        }
                        if(a == 'fontweight'){
                            c = 'font-weight' + ':' + b + ';';
                        }
                        if(a == 'borderradius'){
                            c = 'border-radius' + ':' + b + 'px;';
                        }
                        if(a == 'bordersize'){
                            c = 'border-width' + ':' + b + 'px;';
                        }
                        if(a == 'animatefcd'){
                            c = 'color' + ':' + b + ';';
                        }
                        if(a == 'animatebcd'){
                            c = 'border-color' + ':' + b + ';';
                        }
                        if(a == 'animatebgcd'){
                            c = 'background-color' + ':' + b + ';';
                        }
                        tempframes = tempframes + c;
                    }
                }

                if($(slides[i]).attr('data-action-two')){
                    var a = $(slides[i]).attr('data-action-two').toLowerCase();
                    var b = $(slides[i]).attr('data-action-two-value');
                    var c = a + ':' + b + ';';

                    if(a.includes('scale') || a.includes('skew') || a.includes('rotate')){
                        if(a.includes('rotate') || a.includes('skew')){
                            transform = transform + a + '(' + b + 'deg)' + ';';
                        }else{
                            transform = transform + a + '(' + b + ')' + ';';
                        }
                        tempframes = tempframes + transform;
                    }else{
                        if(a == 'fontsize'){
                            c = 'font-size' + ':' + b + 'px;';
                        }
                        if(a == 'fontweight'){
                            c = 'font-weight' + ':' + b + ';';
                        }
                        if(a == 'borderradius'){
                            c = 'border-radius' + ':' + b + 'px;';
                        }
                        if(a == 'bordersize'){
                            c = 'border-width' + ':' + b + 'px;';
                        }
                        if(a == 'animatefcd'){
                            c = 'color' + ':' + b + ';';
                        }
                        if(a == 'animatebcd'){
                            c = 'border-color' + ':' + b + ';';
                        }
                        if(a == 'animatebgcd'){
                            c = 'background-color' + ':' + b + ';';
                        }
                        tempframes = tempframes + c;
                    }
                }

                if($(slides[i]).attr('data-action-three')){
                    var a = $(slides[i]).attr('data-action-three').toLowerCase();
                    var b = $(slides[i]).attr('data-action-three-value');
                    var c = a + ':' + b + ';';

                    if(a.includes('scale') || a.includes('skew') || a.includes('rotate')){
                        if(a.includes('rotate') || a.includes('skew')){
                            transform = transform + a + '(' + b + 'deg)' + ';';
                        }else{
                            transform = transform + a + '(' + b + ')' + ';';
                        }
                        tempframes = tempframes + transform;
                    }else{
                        if(a == 'fontsize'){
                            c = 'font-size' + ':' + b + 'px;';
                        }
                        if(a == 'fontweight'){
                            c = 'font-weight' + ':' + b + ';';
                        }
                        if(a == 'borderradius'){
                            c = 'border-radius' + ':' + b + 'px;';
                        }
                        if(a == 'bordersize'){
                            c = 'border-width' + ':' + b + 'px;';
                        }
                        if(a == 'animatefcd'){
                            c = 'color' + ':' + b + ';';
                        }
                        if(a == 'animatebcd'){
                            c = 'border-color' + ':' + b + ';';
                        }
                        if(a == 'animatebgcd'){
                            c = 'background-color' + ':' + b + ';';
                        }
                        tempframes = tempframes + c;
                    }
                }

                if($(slides[i]).attr('data-action-four')){
                    var a = $(slides[i]).attr('data-action-four').toLowerCase();
                    var b = $(slides[i]).attr('data-action-four-value');
                    var c = a + ':' + b + ';';

                    if(a.includes('scale') || a.includes('skew') || a.includes('rotate')){
                        if(a.includes('rotate') || a.includes('skew')){
                            transform = transform + a + '(' + b + 'deg)' + ';';
                        }else{
                            transform = transform + a + '(' + b + ')' + ';';
                        }
                        tempframes = tempframes + transform;
                    }else{
                        if(a == 'fontsize'){
                            c = 'font-size' + ':' + b + 'px;';
                        }
                        if(a == 'fontweight'){
                            c = 'font-weight' + ':' + b + ';';
                        }
                        if(a == 'borderradius'){
                            c = 'border-radius' + ':' + b + 'px;';
                        }
                        if(a == 'bordersize'){
                            c = 'border-width' + ':' + b + 'px;';
                        }
                        if(a == 'animatefcd'){
                            c = 'color' + ':' + b + ';';
                        }
                        if(a == 'animatebcd'){
                            c = 'border-color' + ':' + b + ';';
                        }
                        if(a == 'animatebgcd'){
                            c = 'background-color' + ':' + b + ';';
                        }
                        tempframes = tempframes + c;
                    }

                }

                frames = frames + percentage + '{' + tempframes + '}';
            }

            var str = name + "{" + frames + "}";
            var pos = myReuseableStylesheet.length;
            //myReuseableStylesheet.innerText = myReuseableStylesheet.innerText + "@-webkit-keyframes " + str;
            myReuseableStylesheet.innerText = myReuseableStylesheet.innerText + "@keyframes " + str;
            document.getElementById("animator-preview-element").style.animation = 'preview 1s ease-in-out infinite';
        }
    }

    disable(self){
        const data = self.controller._getModelState();
        const readyMadeAnimationsContainer = document.getElementById('animator-ready-made-animations');
        readyMadeAnimationsContainer.style.opacity = '1';
        readyMadeAnimationsContainer.style.pointerEvents = 'unset';

        $('#animationTimeline').find('*').not('#newAnimationButton').css({'opacity':'0.5','pointerEvents':'none'});
        document.getElementById('newAnimationButton').style.display = 'block';

        let animationPreviews = document.getElementsByTagName("animationPreview");
        for (let preview of animationPreviews){ preview.style.border = preview.id === "noAnimationPreview" ? "1px solid green" : "1px solid #d7d7d7"; }

        data.callbacks.onDisable ? data.callbacks.onDisable() : false;
    }

    enable(self){
        const data = self.controller._getModelState();
        const readyMadeAnimationsContainer = document.getElementById('animator-ready-made-animations');
        readyMadeAnimationsContainer.style.opacity = '0.3';
        readyMadeAnimationsContainer.style.pointerEvents = 'none';

        $('#animationTimeline').find('*').not('#newAnimationButton').css({'opacity':'1','pointerEvents':'unset'});
        document.getElementById('newAnimationButton').style.display = 'none';

        data.callbacks.onEnable ? data.callbacks.onEnable() : false;
    }

    /*updateSlideOptions(el){
        var sSlide = document.getElementsByClassName('slideSelected')[0];
        var element = document.getElementById("animator-preview-element");

        var percentage = $(sSlide).attr('data-percentage');

        var slidePercentage = document.getElementById('slidePercentage');
        slidePercentage.getElementsByTagName('selected')[0].
        getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Percentage: '+percentage;

        var slideOpacity = document.getElementById('slideOpacity');
        slideOpacity.getElementsByTagName('selected')[0].
        getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Opacity: 0';

        $('#slideScaleX').val('0');
        $('#slideScaleY').val('0');
        $('#slideRotate').val('0');
        $('#slideSkewX').val('0');
        $('#slideSkewY').val('0');
        $('#slideFontSize').val('0');
        $('#slideFontWeight').val('0');
        $('#slideBorderSize').val('0');
        $('#slideBorderRadius').val('0');

        $('#animatefcd').css('background-color','white');
        $('#animatebcd').css('background-color','white');
        $('#animatebgcd').css('background-color','white');

        var displays =
        {
            Opacity:{displayElement:"combobox"},
            ScaleX:{displayElement:"slider"},
            ScaleY:{displayElement:"slider"},
            Rotate:{displayElement:"slider"},
            SkewX:{displayElement:"slider"},
            SkewY:{displayElement:"slider"},
            FontSize:{displayElement:"slider"},
            FontWeight:{displayElement:"slider"},
            BorderSize:{displayElement:"slider"},
            BorderRadius:{displayElement:"slider"},
            animatefcd:{displayElement:"colordisplay"},
            animatebcd:{displayElement:"colordisplay"},
            animatebgcd:{displayElement:"colordisplay"},
        };

        if($(sSlide).attr('data-action-one')){
            var dataOne = $(sSlide).attr('data-action-one');
            var dataOneValue = $(sSlide).attr('data-action-one-value');

            var dataOneDisplay = document.getElementById('slide'+dataOne);

            if(displays[dataOne].displayElement == 'combobox'){
                dataOneDisplay.getElementsByTagName('selected')[0].
                getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = dataOne + ' ' +dataOneValue;
            }

            if(displays[dataOne].displayElement == 'slider'){
                if(dataOne.includes('FontWeight')){
                    if(dataOneValue == 'normal'){
                        $(dataOneDisplay).val('0');
                    }
                    if(dataOneValue == 'bold'){
                        $(dataOneDisplay).val('1');
                    }
                }else{
                    $(dataOneDisplay).val(dataOneValue);
                }
            }

            if(displays[dataOne].displayElement == 'colordisplay'){
                var colordisplay = document.getElementById(dataOne).style.backgroundColor = dataOneValue;
            }

        }

        if($(sSlide).attr('data-action-two')){
            var dataTwo = $(sSlide).attr('data-action-two');
            var dataTwoValue = $(sSlide).attr('data-action-two-value');

            var dataTwoDisplay = document.getElementById('slide'+dataTwo);

            if(displays[dataTwo].displayElement == 'combobox'){
                dataTwoDisplay.getElementsByTagName('selected')[0].
                getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = dataTwo + ' ' +dataTwoValue;
            }

            if(displays[dataTwo].displayElement == 'slider'){
                if(dataTwo.includes('FontWeight')){
                    if(dataTwoValue == 'normal'){
                        $(dataTwoDisplay).val('0');
                    }
                    if(dataTwoValue == 'bold'){
                        $(dataTwoDisplay).val('1');
                    }
                }else{
                    $(dataTwoDisplay).val(dataTwoValue);
                }
            }

            if(displays[dataTwo].displayElement == 'colordisplay'){
                var colordisplay = document.getElementById(dataTwo).style.backgroundColor = dataTwoValue;
            }

        }

        if($(sSlide).attr('data-action-three')){
            var dataThree = $(sSlide).attr('data-action-three');
            var dataThreeValue = $(sSlide).attr('data-action-three-value');

            var dataThreeDisplay = document.getElementById('slide'+dataThree);

            if(displays[dataThree].displayElement == 'combobox'){
                dataThreeDisplay.getElementsByTagName('selected')[0].
                getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = dataThree + ' ' +dataThreeValue;
            }

            if(displays[dataThree].displayElement == 'slider'){
                if(dataThree.includes('FontWeight')){
                    if(dataThreeValue == 'normal'){
                        $(dataThreeDisplay).val('0');
                    }
                    if(dataThreeValue == 'bold'){
                        $(dataThreeDisplay).val('1');
                    }
                }else{
                    $(dataThreeDisplay).val(dataThreeValue);
                }
            }

            if(displays[dataThree].displayElement == 'colordisplay'){
                var colordisplay = document.getElementById(dataThree).style.backgroundColor = dataThreeValue;
            }


        }

        if($(sSlide).attr('data-action-four')){
            var dataFour = $(sSlide).attr('data-action-four');
            var dataFourValue = $(sSlide).attr('data-action-four-value');

            var dataFourDisplay = document.getElementById('slide'+dataFour);

            if(displays[dataFour].displayElement == 'combobox'){
                dataFourDisplay.getElementsByTagName('selected')[0].
                getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = dataFour + ' ' +dataFourValue;
            }

            if(displays[dataFour].displayElement == 'slider'){
                if(dataFour.includes('FontWeight')){
                    if(dataFourValue == 'normal'){
                        $(dataFourDisplay).val('0');
                    }
                    if(dataFourValue == 'bold'){
                        $(dataFourDisplay).val('1');
                    }
                }else{
                    $(dataFourDisplay).val(dataFourValue);
                }
            }

            if(displays[dataFour].displayElement == 'colordisplay'){
                var colordisplay = document.getElementById(dataFour).style.backgroundColor = dataFourValue;
            }
        }
    }*/

    resetElement(){
        var element = document.getElementById("animator-preview-element");
        if(element){
            element.style.animationName = '';
            element.style.animationDuration = "1s";
            element.style.animationDelay = '0s';
            element.style.animationTimingFunction = 'linear';
            element.style.animationIterationCount = 'infinite';
        }
    }
}
