class InternalAnimatorView{
    constructor(controller){
        const self = this;

        self.controller = controller;
        self._element = null;
        self._timeline = null;
        self._styler = null;
        self.hidden = true;
    }

    async create(options = {}){
        const self = this;
        const { data, parent, prepend, before, component_id } = options;

        self._element = await Globals.elements.new({
            type: "div",
            parent,
            id: "animator",
            style: data.style ? data.style : null,
            attributes: {
                "data-component-id": component_id,
            },
            children: [
                {
                    type: "i",
                    classes: [ "fas", "fa-times" ],
                    listeners: {
                        click: function(event){
                            self.hide();
                        },
                        mouseover: function(){
                            Globals.tooltip.show(this, "Cancel", "centerBottom");
                        },
                        mouseout: function(){
                            Globals.tooltip.hide();
                        }
                    }
                },
                {
                    type: "i",
                    classes: [ "fas", "fa-check" ],
                    listeners: {
                        click: function(event){
                            let selectedElement = document.getElementsByClassName("selected-element");
                            let element = document.getElementById("animator-preview-element");

                            if(selectedElement[0] && element){
                                let animationName = element.style.animationName || "unset";

                                if(animationName === "previewAnimation"){
                                    let css = "";
                                    let animationStyle = document.getElementById("previewAnimation");
                                    if(animationStyle){
                                        css = animationStyle.innerText.replace("@keyframes previewAnimation", "@keyframes customAnimation");

                                        animationStyle.remove();
                                    }else{
                                        css = self._timeline.createPreviewAnimation() || "";
                                        css = css.replace("@keyframes previewAnimation", "@keyframes customAnimation");
                                        css = css_beautify(css);
                                    }

                                    document.getElementById("customAnimation") ? document.getElementById("customAnimation").remove() : false;
                                    let styleElement = Globals.elements.new({
                                        type: "style",
                                        parent: Globals.window.head,
                                        attributes: {
                                            id: "customAnimation",
                                        },
                                        html: css,
                                    });

                                    animationName = "customAnimation";
                                }

                                selectedElement[0].style.animationName = animationName;
                                selectedElement[0].style.animationDuration = element.style.animationDuration || "1s";
                                selectedElement[0].style.animationDelay = element.style.animationDelay || '0s';
                                selectedElement[0].style.animationTimingFunction = element.style.animationTimingFunction || 'linear';
                                selectedElement[0].style.animationIterationCount = element.style.animationIterationCount || 'infinite';
                                self.hide();
                            }
                        },
                        mouseover: function(){
                            Globals.tooltip.show(this, "Confirm", "centerBottom");
                        },
                        mouseout: function(){
                            Globals.tooltip.hide();
                        }
                    }
                },
                {
                    type: "div",
                    id: "animator-container",
                    children: [
                        {
                            type: "div",
                            id: "animator-preview",
                        },
                        {
                            type: "div",
                            id: "animator-ready-made-animations",
                            children: [
                                {
                                    type: "animationPreview",
                                    id: "noAnimationPreview",
                                    style: {
                                        backgroundSize: "contain",
                                        backgroundImage: "url(none.png)",
                                        backgroundRepeat: "no-repeat",
                                    },
                                    listeners: {
                                        click: function(e){
                                            self.selectReadyMadeAnimation(null);
                                            self.resetElement();
                                        }
                                    }
                                },
                                ...await (async () => {
                                    return await data.readyMadeAnimations.map(async (x, i) => {
                                        return {
                                            type: "animationPreview",
                                            id: `a${x.name}`,
                                            attributes: {
                                                "data-name": x.name,
                                            },
                                            listeners: {
                                                click: function(){
                                                    self.selectReadyMadeAnimation(this);
                                                }
                                            },
                                            children: [
                                                {
                                                    type: "button",
                                                    classes: [ "apelement", "animation-preview-button" ],
                                                    text: "Preview",
                                                    style: {
                                                        animationName: x.name,
                                                    }
                                                }
                                            ]
                                        }
                                    });
                                })(),
                            ]
                        },
                    ]
                },
            ],
            before: before,
            prepend: prepend
        });

        self._styler = await Globals.components.new({
            name: "internal-styler",
            parent: Globals.window.body,
            data: {
                unit: "px",
                forAnimator: true,
                callbacks: {
                    onApplyForAnimator: function(key,value){
                        self.updateSlideStyle(key, value);
                    },
                },
            },
        });

        self._styler = await Globals.components.controller(self._styler);

        self._timeline = await Globals.components.new({
            name: "internal-animator-timeline",
            parent: self._element,
            data: {
                callbacks: {
                    onEnable: function(){
                        self._styler.show();
                        self.resetElement();
                        document.getElementById("animator-preview-element") ? document.getElementById("animator-preview-element").style.animationName = "previewAnimation" : false;
                    },
                    onDisable: function(){
                        self._styler.hide();
                        self.resetElement();
                    },
                    onStylerToggle: function(){
                        self._styler.toggle();
                    },
                }
            }
        });

        self._timeline = await Globals.components.controller(self._timeline);
    }

    async show(){
        const data = await this.controller._getModelState();
        !data.readyMadeAnimations || (Array.isArray(data.readyMadeAnimations) && data.readyMadeAnimations.length <= 0) ? await this.getReadyMadeAnimations() : false;

        document.getElementById("animator-preview-element") ? document.getElementById("animator-preview-element").remove() : false;

        let selectedElement = document.getElementsByClassName("selected-element");
        if(selectedElement[0]){
            let cloneOfSelectedElement = selectedElement[0].cloneNode(true);
            cloneOfSelectedElement.className = "";
            cloneOfSelectedElement.id = "animator-preview-element";
            cloneOfSelectedElement.getElementsByClassName("eResizer")[0] ? cloneOfSelectedElement.getElementsByClassName("eResizer")[0].remove() : false;
            document.getElementById("animator-preview").appendChild(cloneOfSelectedElement);
        }

        this._element.style.display = "flex";
        this.hidden = false;
    }

    hide(){
        document.getElementById("animator-preview-element") ? document.getElementById("animator-preview-element").remove() : false;
        this._element.style.display = "none";
        this.hidden = true;
    }

    toggle(){
        this.hidden ? this.show() : this.hide();
    }

    async refresh(){
        const self = this;
        const data = await self.controller._getModelState();
        const parent = document.getElementById("animator-ready-made-animations");

        if(Array.isArray(data.readyMadeAnimations) && (parent !== undefined && parent !== null)){
            let children = await [...parent.children];
            for await (let child of children){ child.remove(); }

            await Globals.elements.new({
                type: "animationPreview",
                id: "noAnimationPreview",
                parent,
                style: {
                    backgroundSize: "contain",
                    backgroundImage: "url(none.png)",
                    backgroundRepeat: "no-repeat",
                },
                listeners: {
                    click: function(e){
                        self.selectReadyMadeAnimation(null);
                        self.resetElement();
                    }
                }
            });

            for await (let x of data.readyMadeAnimations){
                let animationPreview = await Globals.elements.new({
                    type: "animationPreview",
                    parent,
                    id: `a${x.name}`,
                    attributes: {
                        "data-name": x.name,
                    },
                    listeners: {
                        click: function(){
                            self.selectReadyMadeAnimation(this);
                        }
                    },
                    children: [
                        {
                            type: "button",
                            classes: [ "apelement", "animation-preview-button" ],
                            text: "Preview",
                            style: {
                                animationName: x.name,
                            }
                        }
                    ]
                });
            }
        }
    }

    async getReadyMadeAnimations(){
        const response = await Globals.api.request({ route: "readyMadeAnimations", method: "get" });
        if(response.success === true && response.data.success && Array.isArray(response.data.success)){
            await Globals.elements.new({
                type: "style",
                parent: Globals.window.head,
                html: await (async () => {
                    return await response.data.success.map(x => (x.css)).join('');
                })(),
            });

            await this.controller._updateModelState({ readyMadeAnimations: response.data.success, });
        }else{
            //Globals.notificationHandler.new('Error, could not load ready made animations. Please retry after some time.');
        }
    }

    selectReadyMadeAnimation(animationPreview){
        let element = document.getElementById("animator-preview-element");
        let animationPreviews = document.getElementsByTagName("animationPreview");
        if(element){
            for (let preview of animationPreviews){ preview.style.border = "1px solid #d7d7d7"; }

            if(!animationPreview){
                element.style.animationName = null;
                document.getElementById("noAnimationPreview") ? document.getElementById("noAnimationPreview").style.border = "1px solid green" : false;
            }else{
                let animationName = animationPreview.getAttribute("data-name");

                element.style.animationName = animationName;
                animationPreview.style.border = "1px solid green";
            }
        }
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

    updateSlideStyle(key, value){
        const self = this;
        const data = self.controller._getModelState();
        const slide = self._element.getElementsByClassName('selected-slide')[0] || null;

        if(value && key && slide){
            let style = slide.getAttribute("data-style");
            style = !style ? "" : style;

            if(style.includes(key)){
                let props = style.split("|").map(x => (x.includes(`${key}:`) ? x = `${key}:${value}` : x)).join("|");
                style = props;
            }else{
                style = `${style}${style ? "|" : ""}${key}:${value}`;
            }

            slide.setAttribute("data-style", style);
        }
    }
}
