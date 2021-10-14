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
                callback: function(){ self.playAnimation(this.getElementsByTagName("i")[0] || null); },
                style: { backgroundColor: "#88cc00" },
                icon: "fas fa-play",
            },
            {
                name: "Toggle Styler",
                callback: function(){ data.callbacks.onStylerToggle ? data.callbacks.onStylerToggle() : false; },
                style: { backgroundColor: "#1a1a1a" },
                icon: "fas fa-paint-brush",
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

    resetSlide(number){
        const self = this;
        const data = self.controller._getModelState();
        const slide = data.slides.find(x => (x.number === number));
        if(slide){
            slide.element.classList.remove("selected-slide");
            slide.element.setAttribute("data-style", "");
        }
    }

    setSlidePercentage(number){
        const self = this;
        const data = self.controller._getModelState();
        const slide = data.slides.find(x => (x.number === number));
        if(slide){
            let currentPercentage = parseInt(slide.element.getAttribute("data-percentage")) || 0;
            let newPercentage = currentPercentage>=100 ? 0 : currentPercentage+1;
            slide.element.setAttribute("data-percentage", newPercentage);
            slide.element.getElementsByClassName("animationSlidePercentage")[0] ? slide.element.getElementsByClassName("animationSlidePercentage")[0].innerText = newPercentage+"%" : false;
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
                            "data-percentage": "0",
                        },
                        listeners: {
                            click: function(){
                                if(document.getElementById("animator-preview-element")){
                                    let slideStyle = this.getAttribute("data-style");
                                    if(slideStyle && typeof slideStyle === "string"){
                                        for (let style of slideStyle.split("|")){
                                            updateElement(style.split(":")[0], style.split(":")[1]);
                                        }
                                    }
                                }

                                $('.selected-slide').removeClass('selected-slide');
                                this.classList.add('selected-slide');
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
                                style: { backgroundColor: "black" },
                                classes: [ "animationSlidePercentage" ],
                                text: "0%",
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
                                    click: function(e){
                                        e.stopPropagation();
                                        self.resetSlide(slideNumber);
                                    },
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
                            {
                                type: "span",
                                classes: [ "animationSlideButton" ],
                                listeners: {
                                    click: function(e){
                                        e.stopPropagation();
                                        self.setSlidePercentage(slideNumber);
                                    },
                                    mouseover: function(){
                                        Globals.tooltip.show(this, "Change Slide Percentage", "centerTop");
                                    },
                                    mouseout: function(){
                                        Globals.tooltip.hide();
                                    }
                                },
                                children: [
                                    {
                                        type: "i",
                                        classes: [ "fas", "fa-percentage" ]
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

    createPreviewAnimation(){
        try{
            const self = this;
            const data = self.controller._getModelState();
            let transforms = ["rotateX", "rotateY", "skewX", "skewY", "scaleX", "scaleY"];
            let css = "@keyframes previewAnimation{";

            if(data.slides && Array.isArray(data.slides)){
                for (let slide of data.slides){
                    let percentage = parseInt(slide.element.getAttribute("data-percentage")) || 0;
                    let slideStyle = slide.element.getAttribute("data-style") || "";

                    if(slideStyle && typeof slideStyle === "string"){
                        css += `\n${percentage}%{`;

                        for (let style of slideStyle.split("|")){
                            let propertyName = style.split(":")[0];

                            if(!propertyName.includes("animation")){
                                if(!transforms.includes(propertyName)){
                                    propertyName = propertyName.replace(/[A-Z][a-z]*/g, string => `-${string.toLowerCase()}`).replace('--', '-');

                                    let value = style.split(":")[1];
                                    css += `\n${propertyName}: ${value};`;
                                }
                            }
                        }

                        css += "\n}";
                    }
                }

                css += "\n}";
            }else{ css += "}"; }

            return css;
        }catch(error){}

        return "";
    }

    playAnimation(button){
        const self = this;
        const data = self.controller._getModelState();

        if(button && data.slides && Array.isArray(data.slides) && document.getElementById("animator-preview-element")){
            if(button.classList.contains("fa-pause")){
                button.classList.remove("fa-pause");
                button.classList.add("fa-play");
            }else{
                let css = self.createPreviewAnimation() || "";
                css = css_beautify(css);

                document.getElementById("previewAnimation") ? document.getElementById("previewAnimation").remove() : false;
                let styleElement = Globals.elements.new({
                    type: "style",
                    parent: Globals.window.head,
                    attributes: {
                        id: "previewAnimation",
                    },
                    text: css,
                });

                document.getElementById("animator-preview-element").style.animationName = "previewAnimation";

                button.classList.remove("fa-play");
                button.classList.add("fa-pause");
            }
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
