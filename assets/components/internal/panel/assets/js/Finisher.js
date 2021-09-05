class InternalPanelFinisher{
    constructor(config){
        this.config = config;
        this.hidden = true;
        this._element = null;

        this._build();
    }

    _build(){
        const self = this;

        let children = [
            {
                type: "div",
                id: "finish-container",
                children: [
                    {
                        type: "div",
                        id: "finish-buttons",
                        children: [
                            ...(() => {
                                return [
                                    /*{
                                        text: "Save to storage",
                                        id: "savebutton",
                                        click: function(){
                                            let finishdiv_textarea_element = document.getElementById("textareaE");
                                            let finishdiv_textarea_animation = document.getElementById("textareaA");
                                            let eName = document.getElementById("elementName");
                                            let aName = document.getElementById("animationName");

                                            if(finishdiv_textarea_element.value !== '' && finishdiv_textarea_animation.value !== ''){
                                                if(aName.value == '' && eName.value == null){
                                                    Globals.notificationHandler.new('Error, please enter animation and element names.');
                                                    return;
                                                }

                                                if(eName.value == '' || eName.value == null){
                                                    Globals.notificationHandler.new('Error, please enter element name.');
                                                    return;
                                                }

                                                if(aName.value == '' || aName.value == null){
                                                    Globals.notificationHandler.new('Error, please enter animation name.');
                                                    return;
                                                }

                                                if(aName.value !== '' || eName.value == ''){
                                                    saveToStorage();
                                                }
                                            }

                                            if(finishdiv_textarea_element.value !== '' && finishdiv_textarea_animation.value == ''){
                                                if(eName.value !== ''){
                                                    saveToStorage();
                                                }else{
                                                    Globals.notificationHandler.new('Error, please enter element name.');
                                                }
                                            }

                                            if(finishdiv_textarea_animation.value !== '' && finishdiv_textarea_element.value == ''){
                                                if(aName.value !== ''){
                                                    saveToStorage();
                                                }else{
                                                    Globals.notificationHandler.new('Error, please enter animation name.');
                                                }
                                            }
                                        }
                                    },*/
                                    {
                                        text: "Download Stylesheet (.css)",
                                        id: "dltextbutton",
                                        click: function(){
                                            self.saveAsFile();
                                        },
                                    },
                                    {
                                        text: "Cancel",
                                        id: "cancelbutton",
                                        click: function(){
                                            self.hide();
                                        },
                                    },
                                ].map((x, i) => {
                                    return {
                                        type: "button",
                                        text: x.text,
                                        id: x.id,
                                        listeners: {
                                            click: x.click,
                                        },
                                    }
                                });
                            })(),
                        ],
                    },
                    {
                        type: "div",
                        id: "finish-textareas",
                        children: [
                            ...(() => {
                                return [
                                    { id: "textareaE", readonly: true, text: "Style", textId: "eH" },
                                    { id: "textareaA", readonly: true, text: "Animation", textId: "aH" }
                                ].map((x, i) => {
                                    return [
                                        {
                                            type: "div",
                                            id: "finish-textarea-div",
                                            children: [
                                                {
                                                    type: "p",
                                                    text: x.text,
                                                    id: x.textId,
                                                },
                                                {
                                                    type: "textarea",
                                                    id: x.id,
                                                    attributes: {
                                                        readonly: x.readonly,
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                }).flat();
                            })(),
                        ]
                    }
                    /*...(() => {
                        return [
                            { id: "elementName", placeholder: "Element Name" },
                            { id: "animationName", placeholder: "Animation Name" }
                        ].map((x, i) => {
                            return {
                                type: "input",
                                id: x.id,
                                attributes: {
                                    placeholder: x.placeholder,
                                }
                            }
                        });
                    })(),*/
                ]
            }
        ];

        self._element = Globals.elements.new({
            type: "div",
            parent: document.getElementById("panel"),
            id: "finish",
            children,
        });
    }

    async show(){
        await this.refresh();
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

    getStyle(domElement){
        let style = "";
        let computedStyle = window.getComputedStyle(domElement);
        let propertiesToInclude = [
            "fontSize",
            "height",
            "width",
            "borderSize",
            "borderRadius",
            "borderStyle",
            "textAlign",
            "marginTop",
            "marginLeft",
            "marginRight",
            "marginBottom",
            "paddingTop",
            "paddingLeft",
            "paddingRight",
            "paddingBottom",
            "letterSpacing",
            "wordSpacing",
            "outlineWidth",
            "boxShadow",
            "textShadow",
            "textDecoration",
            "textDecorationStyle",
            "fontStyle",
            "fontStretch",
            "fontVariant",
            "fontStretch",
            "fontWeight",
            "display",
            "whiteSpace",
            "outlineStyle",
            "color",
            "outlineColor",
            "backgroundColor",
            "borderColor",
            "textDecorationColor",
            "background",
            "transform",
            "opacity",
            "fontFamily",
            "position",
            "pointerEvents",
            "top",
            "left",
            "overflow",
            "textOverflow"
        ];

        for(var i=0; i<propertiesToInclude.length; i++){
            let propertyName = propertiesToInclude[i].replace(/[A-Z][a-z]*/g, str => '-' + str.toLowerCase() + '-').replace('--', '-').replace(/(^-)|(-$)/g, ''); // replaces uppercase letters to lowercase letters with prefixed hyphen & removes hyphens at the beginning and the end
            let value = computedStyle.getPropertyValue(propertyName);

            if(value){
                style += propertyName + ':' + computedStyle.getPropertyValue(propertyName)+';'+(i === propertiesToInclude.length-1 ? "" : "\n");
            }
        }

        if(computedStyle.getPropertyValue("animation-name") && computedStyle.getPropertyValue("animation-name") !== "none" && computedStyle.getPropertyValue("animation-name") !== "preview"){
            style += "\n animation-name" + ':' + computedStyle.getPropertyValue("animation-name")+';';
            style += "\n animation-duration" + ':' + computedStyle.getPropertyValue("animation-duration")+';';
            style += "\n animation-delay" + ':' + computedStyle.getPropertyValue("animation-delay")+';';
            style += "\n animation-iteration-count" + ':' + computedStyle.getPropertyValue("animation-iteration-count")+';';
            style += "\n animation-timing-function" + ':' + computedStyle.getPropertyValue("animation-timing-function")+';';
        }else{
            if(computedStyle.getPropertyValue("animation")){
                style += "\n animation" + ':' + computedStyle.getPropertyValue("animation")+';';
            }else{
                style += "\n";
            }
        }

        return css_beautify(`{\n ${style} \n}`);
    }

    async refresh(){
        let element = document.getElementsByClassName("selected-element")[0];
        let styleCss = this.getStyle(element);
        let animationCSS = '';

        if(styleCss.includes('animation-name')){
            const response = await Globals.api.request({ route: `animation/${e.style.animationName}`, method: "get" });
            if(response.success === true){
                document.getElementById('textareaA').value = response.data.css;
            }
        }else{
            if(styleCss.includes('animation:')){
                let animationProperty = element.style.animation;

                if(animationProperty.includes('preview')){
                    let animation = document.getElementsByTagName('style')[0].innerText;
                    animationCSS =  animation;
                    animationCSS = animationCSS.split('{').join('{\n');
                    animationCSS = animationCSS.split('}').join('}\n');
                    animationCSS = animationCSS.split(';').join(';\n');
                    animationCSS = animationCSS.split('@keyframes preview{').join('\n \n@keyframes preview{\n \n');
                }
            }
        }

        let fontFamily = element.style.fontFamily;
        let generalFontFamilies = ["sans", "sans-serif", "helvectia", "monospace", "cursive", "fantasy", "arial"];
        let googleFontInfo = "none";

        if(!generalFontFamilies.includes(fontFamily)){
            for(let i=0; i<Globals.pageHandler.WebFonts.length; i++){
                let newFontFamily = Globals.pageHandler.WebFonts[i].family.replace(/ /g,"_");
                let isCorrectFontFamily = (fontFamily.length < newFontFamily.length && newFontFamily.includes(fontFamily)) || (fontFamily.length > newFontFamily.length && fontFamily.includes(newFontFamily));
                if(isCorrectFontFamily){
                    googleFontInfo = Globals.pageHandler.WebFonts[i].family + ' : ' + JSON.stringify(Globals.pageHandler.WebFonts[i].files);
                    break;
                }
            }
        }

        if(animationCSS){
            document.getElementById('textareaE').value = css_beautify('.element' + styleCss + "\n \nGoogle Fonts: \n \n"+googleFontInfo);
            document.getElementById('textareaA').value = css_beautify(animationCSS);
        }else{
            document.getElementById('textareaE').value = css_beautify('.element' + styleCss + "\n \nGoogle Fonts: \n \n"+googleFontInfo);
        }
    }

    saveAsFile(){
        let text = document.getElementById("textareaE").value + '\n' + '\n' + document.getElementById("textareaA").value;
        let textFileAsBlob = new Blob([text], {type: 'text/css; charset=utf-8'});
        let fileName = 'CSSStudio Element';

        let downloadLink = Globals.elements.new({
            type: "a",
            parent: Globals.window.body,
            attributes: {
                download: fileName,
                href: window.webkitURL != null ? window.webkitURL.createObjectURL(textFileAsBlob) : window.URL.createObjectURL(textFileAsBlob),
            },
            html: "Download File",
            style: {
                display: "none"
            },
            listeners: window.webkitURL == null ? {
                click: function(){
                    this.remove();
                }
            } : null,
        })

        downloadLink.click();
    }
}
