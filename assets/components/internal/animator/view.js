class InternalAnimatorView{
    constructor(controller){
        const self = this;

        self.controller = controller;
        self._element = null;
        self._readyMadeAnimations = [];
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
                                    id: "noa",
                                    style: {
                                        backgroundSize: "contain",
                                        backgroundImage: "url(none.png)",
                                        backgroundRepeat: "no-repeat",
                                    },
                                    listeners: {
                                        click: function(){
                                            var previewelement = document.getElementsByClassName("selected-element")[0];

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
                                ...await (async () => {
                                    return await data.readyMadeAnimations.map(async (x, i) => {
                                        let text = "Button";

                                        let duration = Math.floor((Math.random() * 3) + 1);
                                        if(x.name.includes('FADE')){ duration = '3s'; }
                                        if(x.name.includes('BOUNCE')){ duration = '1s'; }
                                        if(x.name.includes('FLIP')){ duration = '2s'; }
                                        if(x.name.includes('ROTATE')){ duration = '3s'; }
                                        if(x.name.includes('SLIDE')){ duration = '3s'; }
                                        if(x.name.includes('ZOOM')){ duration = '2s'; }
                                        if(x.name.includes('ROLL')){ duration = '2s'; }

                                        if(document.getElementsByClassName("selected-element")[0].tagName == 'input'){
                                            text = document.getElementsByClassName("selected-element")[0].value;
                                        }else{
                                            if(document.getElementsByClassName("selected-element")[0].tagName == 'paragraph'){
                                                text = document.getElementById('previewbox').getElementsByTagName('p')[0].innerText;
                                            }

                                            if(document.getElementsByClassName("selected-element")[0].tagName == 'image' || document.getElementsByClassName("selected-element")[0].tagName == 'video'){ text = document.getElementsByClassName("selected-element")[0].tagName; }
                                            if(document.getElementsByClassName("selected-element")[0].tagName == 'heading'){
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

        if(!data.readyMadeAnimations || (Array.isArray(data.readyMadeAnimations) && data.readyMadeAnimations.length <= 0)){
            await self.getReadyMadeAnimations();
        }else{
            let animationPreviews = self._element.getElementsByClassName("apelement");
            let i = 0;
            for await (let preview of animationPreviews){
                if(i === 0){ continue; }
                await self.applyAnimation(preview.style.animationName, preview.parentElement);
                i++;
            }
        }

        self._timeline = await Globals.components.new({
            name: "internal-animator-timeline",
            parent: self._element,
        });
    }

    async show(){
        const data = await this.controller._getModelState();
        !data.readyMadeAnimations || (Array.isArray(data.readyMadeAnimations) && data.readyMadeAnimations.length <= 0) ? await this.getReadyMadeAnimations() : false;

        this._element.style.display = "flex";
        this.hidden = false;
    }

    hide(){
        this._element.style.display = "none";
        this.hidden = true;
    }

    toggle(){
        this.hidden ? this.show() : this.hide();
    }

    reset(){

    }

    async refresh(){
        const self = this;
        const data = await self.controller._getModelState();
        const parent = document.getElementById("animator-ready-made-animations");
        console.log("refreshing", data.readyMadeAnimations, parent);

        if(Array.isArray(data.readyMadeAnimations) && (parent !== undefined && parent !== null)){
            console.log("refreshing 1");
            let children = await [...parent.children];
            for await (let child of children){ child.remove(); }

            await Globals.elements.new({
                type: "animationPreview",
                id: "noa",
                parent,
                style: {
                    backgroundSize: "contain",
                    backgroundImage: "url(none.png)",
                    backgroundRepeat: "no-repeat",
                },
                listeners: {
                    click: function(){
                        var previewelement = document.getElementsByClassName("selected-element")[0];

                        previewelement.style.animationDelay = '';
                        previewelement.style.animationTimingFunction = '';
                        previewelement.style.animationIterationCount = '';
                        previewelement.style.animationName = '';
                        previewelement.style.animationDuration = '';

                        $('animationPreview').css('border','');
                        this.style.border = '1px solid green';
                    }
                }
            });

            for await (let x of data.readyMadeAnimations){
                let text = "Button";

                let duration = Math.floor((Math.random() * 3) + 1);
                if(x.name.includes('FADE')){ duration = '3s'; }
                if(x.name.includes('BOUNCE')){ duration = '1s'; }
                if(x.name.includes('FLIP')){ duration = '2s'; }
                if(x.name.includes('ROTATE')){ duration = '3s'; }
                if(x.name.includes('SLIDE')){ duration = '3s'; }
                if(x.name.includes('ZOOM')){ duration = '2s'; }
                if(x.name.includes('ROLL')){ duration = '2s'; }

                if(document.getElementsByClassName("selected-element")[0].tagName == 'input'){
                    text = document.getElementsByClassName("selected-element")[0].value;
                }else{
                    if(document.getElementsByClassName("selected-element")[0].tagName == 'paragraph'){
                        text = document.getElementById('previewbox').getElementsByTagName('p')[0].innerText;
                    }

                    if(document.getElementsByClassName("selected-element")[0].tagName == 'image' || document.getElementsByClassName("selected-element")[0].tagName == 'video'){ text = document.getElementsByClassName("selected-element")[0].tagName; }
                    if(document.getElementsByClassName("selected-element")[0].tagName == 'heading'){
                        text = document.getElementById('previewbox').getElementsByTagName('h3')[0].innerText;
                    }
                }

                let animationPreview = await Globals.elements.new({
                    type: "animationPreview",
                    id: `a${x.name}`,
                    parent,
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
                });

                await self.applyAnimation(x.name, animationPreview.parentElement);
            }
        }
    }

    async getReadyMadeAnimations(){
        const response = await Globals.api.request({ route: "readyMadeAnimations", method: "get" });
        if(response.success === true && response.data.success && Array.isArray(response.data.success)){
            await this.controller._updateModelState({ readyMadeAnimations: response.data.success, });
        }else{
            Globals.notificationHandler.new('Error, could not load ready made animations. Please retry after some time.');
        }
    }

    async applyAnimation(animationName, animationPreview){
        animationPreview.addEventListener('click', function(){
            $(document.getElementsByClassName("selected-element")[0]).css('animation-name', animationName);
            $('animationPreview').css('border','');
            $('#noa').css('border', '');
            this.style.border = '1px solid green';
        });
    }
}
