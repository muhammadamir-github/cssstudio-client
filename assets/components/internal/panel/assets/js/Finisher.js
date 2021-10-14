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
                                            saveToStorage();
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
            "textOverflow",
            "animationName",
            "animationDuration",
            "animationDelay",
            "animationIterationCount",
            "animationTimingFunction",
        ];

        for(var i=0; i<propertiesToInclude.length; i++){
            let propertyName = propertiesToInclude[i].replace(/[A-Z][a-z]*/g, str => '-' + str.toLowerCase() + '-').replace('--', '-').replace(/(^-)|(-$)/g, ''); // replaces uppercase letters to lowercase letters with prefixed hyphen & removes hyphens at the beginning and the end
            let value = computedStyle.getPropertyValue(propertyName);

            if(value){
                style += propertyName + ':' + computedStyle.getPropertyValue(propertyName)+';'+(i === propertiesToInclude.length-1 ? "" : "\n");
            }
        }

        return css_beautify(`{\n ${style} \n}`);
    }

    async refresh(){
        let element = document.getElementsByClassName("selected-element")[0];
        let styleCss = this.getStyle(element);
        let animationCss = "";

        if(element.style.animationName === "customAnimation" && document.getElementById("customAnimation")){
            let animation = document.getElementById("customAnimation").innerText;
            animationCss = css_beautify(animation);
        }else{
            if(element.style.animationName && element.style.animationName !== "none" && element.style.animationName !== "unset" && element.style.animationName !== "customAnimation"){
                const response = await Globals.api.request({ route: `animation/${element.style.animationName}`, method: "get" });
                animationCss = response.data.css || "";
            }
        }

        let fontFamily = element.style.fontFamily;
        let generalFontFamilies = ["sans", "sans-serif", "helvectia", "monospace", "cursive", "fantasy", "arial"];
        let googleFontInfo = "none";

        if(!generalFontFamilies.includes(fontFamily.toString().toLowerCase())){
            for(let i=0; i<Globals.pageHandler.WebFonts.length; i++){
                let currentFontFamily = Globals.pageHandler.WebFonts[i].family;
                let isCorrectFontFamily = Globals.pageHandler.WebFonts[i].variants.find(variant => ((`${currentFontFamily} ${variant}`).replace(/ /g,"_") === fontFamily)) || null;
                if(isCorrectFontFamily){
                    googleFontInfo = (`${currentFontFamily}: ${JSON.stringify(Globals.pageHandler.WebFonts[i].files)}`);
                    break;
                }
            }
        }

        document.getElementById('textareaE').value = css_beautify('.element' + styleCss + "\n \nGoogle Fonts: \n \n"+googleFontInfo);
        document.getElementById('textareaA').value = animationCss;
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
