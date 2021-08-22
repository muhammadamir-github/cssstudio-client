function finishWork(element){
    var panel = document.getElementById('panel');

    var finishdiv = document.createElement('div')
    finishdiv.setAttribute('id','finish');

    var finishdiv_textarea_element = document.createElement('textarea');
    var finishdiv_textarea_animation = document.createElement('textarea');
    finishdiv_textarea_element.setAttribute('id','textareaE');
    finishdiv_textarea_animation.setAttribute('id','textareaA');

    finishdiv_textarea_element.setAttribute('readonly','');
    finishdiv_textarea_animation.setAttribute('readonly','');

    var textarea_element_p = document.createElement('p');
    textarea_element_p.innerText = 'Style CSS:';
    textarea_element_p.setAttribute('id','eH');

    var textarea_animation_p = document.createElement('p');
    textarea_animation_p.innerText = 'Animation CSS:';
    textarea_animation_p.setAttribute('id','aH')

    var savebutton = document.createElement('button');
    var downloadtextfilebutton = document.createElement('button');
    var cancelbutton = document.createElement('button');
    savebutton.innerText = 'Save to storage';
    downloadtextfilebutton.innerText = 'Download Stylesheet (.txt)';
    cancelbutton.innerText = 'Cancel';
    savebutton.setAttribute('id','savebutton');
    downloadtextfilebutton.setAttribute('id','dltextbutton');
    cancelbutton.setAttribute('id','cancelbutton');

    var eName = document.createElement('input');
    var aName = document.createElement('input');
    eName.setAttribute('id','elementName');
    eName.setAttribute('placeholder','Element Name');
    aName.setAttribute('id','animationName');
    aName.setAttribute('placeholder','Animation Name');

    downloadtextfilebutton.addEventListener('click',function(){
        saveTextAsFile();
    });

    cancelbutton.addEventListener('click',function(){
        $("#finish").remove();
        $("#panel").find("*").not('#finish, #textareaE, #textareaA, #eH, #aH, #savebutton, #dltextbutton, #cancelbutton').css({'opacity':'1','pointer-events':'unset'});
    });

    savebutton.addEventListener('click',function(){

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

    });

    finishdiv.appendChild(savebutton);
    finishdiv.appendChild(downloadtextfilebutton);
    finishdiv.appendChild(cancelbutton);

    finishdiv.appendChild(eName);
    finishdiv.appendChild(aName);

    finishdiv.appendChild(textarea_element_p);
    finishdiv.appendChild(finishdiv_textarea_element);
    finishdiv.appendChild(textarea_animation_p);
    finishdiv.appendChild(finishdiv_textarea_animation);

    panel.appendChild(finishdiv);
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
        var token = localStorage.getItem('auth');
        $.ajax({
            type: "GET",
            url: "http://localhost:8000/api/me/animations/"+e.style.animationName,
            beforeSend: function(request){
                request.setRequestHeader('Authorization','Bearer '+token);
                request.setRequestHeader('Accept','application/json');
            },
            success: setAnimationTextArea,
        });
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

        //console.log('started finding font.');
        for(var i=0; i < Globals.pageHandler.WebFonts.length; i++){

            var newfontfamiliy = Globals.pageHandler.WebFonts[i].family.replace(/ /g,"_");
            if(ff.length > newfontfamiliy.length){
                if(ff.includes(newfontfamiliy)){
                    //console.log('found font');
                    ffinfo =  Globals.pageHandler.WebFonts[i].family + ' : ' + JSON.stringify(Globals.pageHandler.WebFonts[i].files);
                    break;
                }else{
                    //console.log(newfontfamiliy + ' didnt include ff = ' + ff);
                }
            }

            if(ff.length < newfontfamiliy.length){
                if(newfontfamiliy.includes(ff)){
                    //console.log('found font');
                    ffinfo =  Globals.pageHandler.WebFonts[i].family + ' : ' + JSON.stringify(Globals.pageHandler.WebFonts[i].files);
                    break;
                }else{
                    //console.log(newfontfamiliy + ' didnt include ff = ' + ff);
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

    //console.log(combined_array);

}
