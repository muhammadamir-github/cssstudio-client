 async function finishWork(){
    var panel = document.getElementById('panel');

    let children = [
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
                    click: saveTextAsFile,
                },
                {
                    text: "Cancel",
                    id: "cancelbutton",
                    click: function(){
                        $("#finish").remove();
                        $("#panel").find("*").not('#finish, #textareaE, #textareaA, #eH, #aH, #savebutton, #dltextbutton, #cancelbutton').css({'opacity':'1','pointer-events':'unset'});
                    }
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
        ...(() => {
            return [
                { id: "textareaE", readonly: true, text: "Style CSS:", textId: "eH" },
                { id: "textareaA", readonly: true, text: "Animation CSS:", textId: "aH" }
            ].map((x, i) => {
                return [
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
            }).flat();
        })(),
    ];

    let finishdiv = Globals.elements.new({
        type: "div",
        parent: panel,
        id: "finish",
        children,
    });

    $("#panel").find("*").not('#finish, #textareaE, #textareaA, #eH, #aH, #savebutton, #dltextbutton, #cancelbutton, #animationName, #elementName').css({'opacity':'0.5','pointer-events':'none'});

    var e = document.getElementsByClassName("selected-element")[0];
    var css = getStyle(e);
    var animationcss = '';

    if(css.includes('animation-name')){
        const response = await Globals.api.request({ route: `animation/${e.style.animationName}`, method: "get" });
        if(response.success === true){
            document.getElementById('textareaA').value = response.data.css;
        }
    }else{
        if(css.includes('animation:')){
            var animationAttribute = e.style.animation;

            if(animationAttribute.includes('preview')){
                var animation = document.getElementsByTagName('style')[0].innerText;
                animationcss =  animation;
                animationcss = animationcss.split('{').join('{\n');
                animationcss = animationcss.split('}').join('}\n');
                animationcss = animationcss.split(';').join(';\n');
                animationcss = animationcss.split('@keyframes preview{').join('\n \n@keyframes preview{\n \n');
            }
        }
    }

    var ff = e.style.fontFamily;
    var ffinfo = "none";

    if(ff !== 'sans' && ff !== 'sans-serif' && ff !== 'helvectia' && ff !== 'monospace' && ff !== 'cursive' && ff !== 'fantasy' && ff !== 'arial'){
        for(var i=0; i < Globals.pageHandler.WebFonts.length; i++){
            var newfontfamiliy = Globals.pageHandler.WebFonts[i].family.replace(/ /g,"_");
            if(ff.length > newfontfamiliy.length){
                if(ff.includes(newfontfamiliy)){
                    ffinfo = Globals.pageHandler.WebFonts[i].family + ' : ' + JSON.stringify(Globals.pageHandler.WebFonts[i].files);
                    break;
                }
            }

            if(ff.length < newfontfamiliy.length){
                if(newfontfamiliy.includes(ff)){
                    ffinfo = Globals.pageHandler.WebFonts[i].family + ' : ' + JSON.stringify(Globals.pageHandler.WebFonts[i].files);
                    break;
                }
            }
        }
    }

    if(animationcss !== ''){
        document.getElementById('textareaE').value = css_beautify('.element' + css + "\n \nGoogle Fonts: \n \n"+ffinfo);
        document.getElementById('textareaA').value = css_beautify(animationcss);
    }else{
        document.getElementById('textareaE').value = css_beautify('.element' + css + "\n \nGoogle Fonts: \n \n"+ffinfo);
    }
}

function getStyle(node){
    let style = "";
    let computedStyle = window.getComputedStyle(node);
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
