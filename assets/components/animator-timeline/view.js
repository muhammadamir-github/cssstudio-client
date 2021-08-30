class AnimatorTimelineView{
    constructor(controller){
        this.controller = controller;
        this._element = null;
    }

    create(options = {}){
        const self = this;
        const { data, parent, prepend, before, elementType } = options;

        let children = [];

        [
            {
                name: "Add Slide",
                callback: function(){
                    var n = $("animationSlide").length + 1;
                    self.animationActions('addslide', n, '');
                },
                style: { backgroundColor: "darkred" },
                icon: "fas fa-plus",
            },
            {
                name: "Reset",
                callback: function(){ self.animationActions("reset", '', ''); },
                style: { backgroundColor: "#3399ff", left: "30px" },
                icon: "fas fa-sync-alt",
            },
            {
                name: "Play",
                callback: function(){ self.animationActions("play", '', elementType); },
                style: { backgroundColor: "#88cc00", left: "55px" },
                icon: "fas fa-play",
            }
        ].forEach(x => {
            children.push({
                type: "span",
                classes: [ "aTbutton" ],
                style: x.style,
                listeners: {
                    click: x.callback
                },
                children: [
                    {
                        type: "i",
                        classes: x.icon.split(" ")
                    },
                    {
                        type: "span",
                        classes: [ "tooltip" ],
                        text: x.name,
                    },
                ]
            });
        });

        if(Globals.pageHandler.data.plan !== 'Free'){
            if(Globals.pageHandler.data.plan == 'Gold' || Globals.pageHandler.data.plan == 'Diamond'){
                children.push({
                    type: "span",
                    classes: [ "aTbutton" ],
                    style: {
                        backgroundColor: "#463496",
                        left: "80px"
                    },
                    listeners: {
                        click: function(){
                            self.animationActions('switch-readymade', '', elementType);
                            document.getElementsByClassName('newanimationbtn')[0].style.display = 'block';
                        }
                    },
                    children: [
                        {
                            type: "i",
                            classes: [ "fas", "fa-toggle-on" ]
                        },
                        {
                            type: "span",
                            classes: [ "tooltip" ],
                            style: {
                                width: "200px"
                            },
                            text: "Switch to ready made animations.",
                        },
                    ]
                });
            }
        }

        for(var i=1; i<4; i++){
            children.push({
                type: "animationSlide",
                attributes: {
                    "data-percentage": "%",
                    "data-attr-avail": "4",
                },
                listeners: {
                    click: function(){
                        $('.slideSelected').removeClass('slideSelected');
                        this.classList.add('slideSelected');
                        self.animationActions('options-enable','', elementType);
                        self.updateSlideOptions(elementType);
                    }
                },
                children: [
                    {
                        type: "span",
                        style: { backgroundColor: "black" },
                        text: i,
                    },
                    {
                        type: "span",
                        classes: [ "aTbutton" ],
                        style: {
                            backgroundColor: "darkred",
                            left: "25px",
                            width: "13px"
                        },
                        listeners: {
                            click: function(){
                                this.parentNode.remove();
                                self.animationActions('renumber', '', '');
                            }
                        },
                        children: [
                            {
                                type: "i",
                                classes: [ "far", "fa-trash-alt" ]
                            },
                            {
                                type: "span",
                                classes: [ "tooltip" ],
                                text: "Delete Slide",
                            },
                        ]
                    },
                    {
                        type: "span",
                        classes: [ "aTbutton" ],
                        style: {
                            backgroundColor: "#a8d65e",
                            left: "47px",
                            width: "13px"
                        },
                        children: [
                            {
                                type: "i",
                                classes: [ "fas", "fa-sync-alt" ]
                            },
                            {
                                type: "span",
                                classes: [ "tooltip" ],
                                text: "Reset Slide",
                            },
                        ]
                    },
                ]
            });
        }

        children.push({
            type: "button",
            classes: [ "newanimationbtn" ],
            text: "Create New Animation",
            listeners: {
                click: function(){
                    self.animationActions('switch-custom', '', elementType);
                    this.style.display = 'none';
                }
            }
        });

        self._element = Globals.elements.new({
            type: "div",
            parent,
            id: "aT",
            children,
            before: before,
            prepend: prepend
        });
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
            document.getElementById('preview'+element).style.animation = 'preview 1s ease-in-out infinite';
        }

        if(action == 'options-enable'){
            document.getElementById('slidePercentage').style.opacity = '1';
            document.getElementById('slidePercentage').style.pointerEvents = 'unset';

            document.getElementById('slideOpacity').style.opacity = '1';
            document.getElementById('slideOpacity').style.pointerEvents = 'unset';

            document.getElementById('animationSliderBox').style.opacity = '1';
            document.getElementById('animationSliderBox').style.pointerEvents = 'unset';
        }

        if(action == 'options-disable'){
            document.getElementById('slidePercentage').style.opacity = '0.5';
            document.getElementById('slidePercentage').style.pointerEvents = 'none';

            document.getElementById('slideOpacity').style.opacity = '0.5';
            document.getElementById('slideOpacity').style.pointerEvents = 'none';

            document.getElementById('animationSliderBox').style.opacity = '0.5';
            document.getElementById('animationSliderBox').style.pointerEvents = 'none';
        }

        if(action == 'addslide'){
            var Slide = document.createElement('animationSlide');
            Slide.setAttribute('data-percentage','%');
            Slide.setAttribute('data-attr-avail','4');
            Slide.addEventListener('click',function(){
                $('.slideSelected').removeClass('slideSelected');
                this.classList.add('slideSelected');
                self.animationActions('options-enable','',element);
                self.updateSlideOptions(element);
            });

            var slidenumber = document.createElement('span');
            slidenumber.style.backgroundColor = 'black';
            slidenumber.innerText = n;

            var deleteslide = document.createElement('span');
            var deleteslide_i = document.createElement('i');
            var deleteslide_tooltip = document.createElement('span');
            deleteslide_tooltip.setAttribute('class','tooltip');
            deleteslide_tooltip.innerText = 'Delete Slide';
            deleteslide_i.setAttribute('class','far fa-trash-alt');
            deleteslide.style.backgroundColor = 'darkred';
            deleteslide.style.left = '25px';
            deleteslide.style.width = '13px';
            deleteslide.appendChild(deleteslide_tooltip);
            deleteslide.appendChild(deleteslide_i);
            deleteslide.addEventListener('click',function(){
                this.parentNode.remove();
                self.animationActions('renumber','');
            });

            var resetslide = document.createElement('span');
            var resetslide_i = document.createElement('i');
            var resetslide_tooltip = document.createElement('span');
            resetslide_tooltip.setAttribute('class','tooltip');
            resetslide_tooltip.innerText = 'Reset Slide';
            resetslide_i.setAttribute('class','fas fa-sync-alt');
            resetslide.style.backgroundColor = '#a8d65e';
            resetslide.style.left = '47px';
            resetslide.style.width = '13px';
            resetslide.appendChild(resetslide_tooltip);
            resetslide.appendChild(resetslide_i);

            Slide.appendChild(slidenumber);
            Slide.appendChild(deleteslide);
            Slide.appendChild(resetslide);

            if(n > 9){
                slidenumber.style.width = '15px';
                deleteslide.style.left = '29px';
            }

            animatorTimeline.appendChild(Slide);
        }

        if(action == 'reset'){
            $('animationSlide').remove();

            for(var i = 1; i < 4; i++){

                var Slide = document.createElement('animationSlide');
                Slide.setAttribute('data-percentage','%');
                Slide.setAttribute('data-attr-avail','4');
                Slide.addEventListener('click',function(){
                    $('.slideSelected').removeClass('slideSelected');
                    this.classList.add('slideSelected');
                    self.animationActions('options-enable','',element);
                    self.updateSlideOptions(element);
                });

                var slidenumber = document.createElement('span');
                slidenumber.style.backgroundColor = 'black';
                slidenumber.innerText = i;

                var deleteslide = document.createElement('span');
                var deleteslide_i = document.createElement('i');
                var deleteslide_tooltip = document.createElement('span');
                deleteslide_tooltip.setAttribute('class','tooltip');
                deleteslide_tooltip.innerText = 'Delete Slide';
                deleteslide_i.setAttribute('class','far fa-trash-alt');
                deleteslide.style.backgroundColor = 'darkred';
                deleteslide.style.left = '25px';
                deleteslide.style.width = '13px';
                deleteslide.appendChild(deleteslide_tooltip);
                deleteslide.appendChild(deleteslide_i);
                deleteslide.addEventListener('click',function(){
                    this.parentNode.remove();
                    self.animationActions('renumber','');
                });

                var resetslide = document.createElement('span');
                var resetslide_i = document.createElement('i');
                var resetslide_tooltip = document.createElement('span');
                resetslide_tooltip.setAttribute('class','tooltip');
                resetslide_tooltip.innerText = 'Reset Slide';
                resetslide_i.setAttribute('class','fas fa-sync-alt');
                resetslide.style.backgroundColor = '#a8d65e';
                resetslide.style.left = '47px';
                resetslide.style.width = '13px';
                resetslide.appendChild(resetslide_tooltip);
                resetslide.appendChild(resetslide_i);

                Slide.appendChild(slidenumber);
                Slide.appendChild(deleteslide);
                Slide.appendChild(resetslide);
                animatorTimeline.appendChild(Slide);

            }
        }

        if(action == 'renumber'){
            var slides = animatorTimeline.getElementsByTagName('animationslide');

            $.each(slides,function(key,value){
                value.getElementsByTagName('span')[0].innerText = key+1;
            });
        }

        if(action == 'switch-custom'){
            var el = document.getElementById('preview'+element);
            var rmadiv = document.getElementById('rmadiv');

            $('#aT').find('*').not('.newanimationbtn').not('.aTbutton').css({'opacity':'1','pointerEvents':'unset'});
            $('.aTbutton').css({'pointer-events':''});
            rmadiv.style.opacity = '0.3';
            rmadiv.style.pointerEvents = 'none';

            el.style.animationName = '';
            el.style.animationDuration = Math.floor((Math.random() * 3) + 1);
            el.style.animationDelay = '0s';
            el.style.animationTimingFunction = 'linear';
            el.style.animationIterationCount = 'Infinite';

            $('animationPreview').css('border','');
            document.getElementById('noa').style.border = '1px solid green';
        }

        if(action == 'switch-readymade'){
            var el = document.getElementById('preview'+element);
            var rmadiv = document.getElementById('rmadiv');

            $('#aT').find('*').not('.newanimationbtn').not('.aTbutton').css({'opacity':'0.5','pointerEvents':'none'});
            $('.aTbutton').css({'pointer-events':'none'});
            rmadiv.style.opacity = '1';
            rmadiv.style.pointerEvents = 'unset';

            el.style.animationName = '';
            el.style.animationDuration = Math.floor((Math.random() * 3) + 1);
            el.style.animationDelay = Math.floor((Math.random() * 8) + 3) + 's';
            el.style.animationTimingFunction = 'linear';
            el.style.animationIterationCount = 'Infinite';

            $('animationPreview').css('border','');
            document.getElementById('noa').style.border = '1px solid green';
            self.animationActions('options-disable','',element);
        }
    }

    updateSlideOptions(el){
        var sSlide = document.getElementsByClassName('slideSelected')[0];
        var element = document.getElementById('preview'+el);

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
    }
}
