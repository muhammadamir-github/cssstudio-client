 async function finishWork(element){
    var panel = document.getElementById('panel');

    let children = [
        ...(() => {
            return [
                {
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
                                saveToStorage(element);
                            }
                        }

                        if(finishdiv_textarea_element.value !== '' && finishdiv_textarea_animation.value == ''){
                            if(eName.value !== ''){
                                saveToStorage(element);
                            }else{
                                Globals.notificationHandler.new('Error, please enter element name.');
                            }
                        }

                        if(finishdiv_textarea_animation.value !== '' && finishdiv_textarea_element.value == ''){
                            if(aName.value !== ''){
                                saveToStorage(element);
                            }else{
                                Globals.notificationHandler.new('Error, please enter animation name.');
                            }
                        }
                    }
                },
                {
                    text: "Download Stylesheet (.txt)",
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
        ...(() => {
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
        })(),
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

    //--------------------------------

    var liner_reg = new RegExp("\\" + ';', "g");

    var styles = {
        button:{default:'padding-right: 10px; padding-left: 10px; width: 150px; height: 40px; border: 0.5px solid black; outline: none; background-color: white; display: block; position: absolute; transform: translate(-50%,-50%); left: 50%; top: 50%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-top: 25px;'},
        div:{default:'padding: 10px;width: 200px;height: 200px;border: 0.5px solid black;outline: none;background-color: white;display: block;position: absolute;transform: translate(-50%,-50%);left: 50%;top: 50%;margin-top: 25px;overflow: hidden;'},
        input:{default:'padding: 10px;width: 200px;height: 40px;border: 0.5px solid black;outline: none;background-color: white;display: block;position: absolute;transform: translate(-50%,-50%);left: 50%;top: 50%;padding-left: 10px;padding-right: 10px;margin-top: 25px;overflow: hidden;'},
        paragraph:{default:'padding: 10px;width: 200px;height: 40px;outline: none;background-color: white;display: block; position: absolute;transform: translate(-50%,-50%);left: 50%;top: 50%;padding-left: 10px;padding-right: 10px;padding-bottom: 10px;font-family: sans-serif;margin-top: 25px;overflow: hidden;word-break: break-all;'},
        heading:{default:'padding: 10px;width: 200px;height: 40px;outline: none;background-color: white;display: block;position: absolute;transform: translate(-50%,-50%);left: 50%;top: 50%;padding-left: 10px;padding-right: 10px;font-family: sans-serif;font-weight: bold;margin-top: 25px;overflow: hidden;word-break: break-all;'},
        textarea:{default:'padding: 10px;width: 200px;height: 40px;outline: none;background-color: white;display: block;position: absolute;transform: translate(-50%,-50%);left: 50%;top: 50%;padding: 15px;font-family: sans-serif;font-weight: bold;border: 0.5px solid black;max-width: 150px;max-height: 80px;margin-top: 25px;overflow: hidden;'},
        image:{default:'padding: 10px;width: 200px;height: 200px;min-width: 200px;min-height: 200px;outline: none;background-color: white;display: block;position: absolute;transform: translate(-50%,-50%); left: 50%;top: 50%;border: 0.5px solid black;margin-top: 25px;overflow: hidden;'},
        video:{default:'padding: 10px;width: 250px;height: 200px;min-width: 250px;min-height: 200px;outline: none;background-color: white;display: block;position: absolute;transform: translate(-50%,-50%);left: 50%;top: 50%;border: 0.5px solid black;margin-top: 25px;overflow: hidden;'},
    }

    var e = document.getElementById('preview'+element);
    var css = dumpCSSText(e);
    var defaultcss = styles[element].default;
    var animationcss = '';

    if(css.includes('background-color')){
        defaultcss = defaultcss.replace('background-color: white;','');
    }

    if(css.includes('padding-right')){
        defaultcss = defaultcss.replace('padding-right: 10px;','');
    }

    if(css.includes('padding-left')){
        defaultcss = defaultcss.replace('padding-left: 10px;','');
    }

    if(css.includes('padding-bottom')){
        defaultcss = defaultcss.replace('padding-bottom: 10px;','');
    }

    if(css.includes('padding:')){
        defaultcss = defaultcss.replace('padding: 10px;','');
    }

    if(css.includes('border')){
        defaultcss = defaultcss.replace('border: 0.5px solid black;','');
    }

    if(css.includes('outline')){
        defaultcss = defaultcss.replace('outline: none;','');
    }

    if(css.includes('display')){
        defaultcss = defaultcss.replace('display: block;','');
    }

    if(css.includes('transform')){
        defaultcss = defaultcss.replace('transform: translate(-50%,-50%);','');
    }

    if(css.includes('transform')){
        defaultcss = defaultcss.replace('transform: translate(-50%,-50%);','');
    }

    if(css.includes('whitespace')){
        defaultcss = defaultcss.replace('whitespace: nowrap;','');
    }

    if(css.includes('margin-top')){
        defaultcss = defaultcss.replace('margin-top: 25px;','');
    }

    if(css.includes('font-family')){
        defaultcss = defaultcss.replace('font-family: sans-serif;','');
    }

    if(css.includes('font-weight')){
        defaultcss = defaultcss.replace('font-weight: bold;','');
    }

    if(css.includes('animation-name')){
        const response = await Globals.api.request({ route: `me/animations/${e.style.animationName}`, method: "get" });
        if(response.success === true){
            setAnimationTextArea(response.success);
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
                //animationcss = animationcss.split('@-webkit-keyframes preview{').join('\n \n@-webkit-keyframes preview{\n \n');
                animationcss = animationcss.split('@keyframes preview{').join('\n \n@keyframes preview{\n \n');
            }
        }
    }

    var css_array = stringToArray(css,';');
    var default_array = stringToArray(defaultcss,';');

    var combined_array = combineArrays(css_array,default_array);

    var ff = e.style.fontFamily;
    var ffinfo = [''];

    if(ff !== 'sans' && ff !== 'sans-serif' && ff !== 'helvectia' && ff !== 'monospace' && ff !== 'cursive' && ff !== 'fantasy'){
        for(var i=0; i < Globals.pageHandler.WebFonts.length; i++){
            var newfontfamiliy = Globals.pageHandler.WebFonts[i].family.replace(/ /g,"_");
            if(ff.length > newfontfamiliy.length){
                if(ff.includes(newfontfamiliy)){
                    ffinfo =  Globals.pageHandler.WebFonts[i].family + ' : ' + JSON.stringify(Globals.pageHandler.WebFonts[i].files);
                    break;
                }
            }

            if(ff.length < newfontfamiliy.length){
                if(newfontfamiliy.includes(ff)){
                    ffinfo =  Globals.pageHandler.WebFonts[i].family + ' : ' + JSON.stringify(Globals.pageHandler.WebFonts[i].files);
                    break;
                }
            }
        }
    }

    combined_array = combined_array.filter(function(str) {
        return /\S/.test(str);
    });

    combined_array = combined_array.map(function (el) {
        return el.trim();
    });

    if(animationcss !== ''){
        document.getElementById('textareaE').value = '.' + element + ' { ' + '\n' + '\n' + combined_array.join(';\n') + '\n' + '}' + "\n \n \n \n Google fonts used: \n \n" + ffinfo;
        document.getElementById('textareaA').value = animationcss;
    }else{
        document.getElementById('textareaE').value = '.' + element + ' { ' + '\n' + '\n' + combined_array.join(';\n') + '\n' + '}' + "\n \n \n \n Google fonts used: \n \n" + ffinfo;
    }
}
