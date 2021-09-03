async function saveToStorage(){
    var token = localStorage.getItem('auth');
    var animationCSS = document.getElementById('textareaA').value;
    var elementCSS = document.getElementById('textareaE').value;
    var elementName = document.getElementById('elementName').value;
    var animationName = document.getElementById('animationName').value;

    if(animationCSS != ''){

        if(animationCSS.includes('preview')){
            animationCSS = animationCSS.replace('preview', animationName);
        }else{
            animationCSS = animationCSS.split("\n").slice(1).join("\n");
            animationCSS = '@keyframes '+ animationName + ' { \n' + animationCSS;
        }
        document.getElementById('textareaA').value = animationCSS;

        if(elementCSS.includes('animation-name')){
            elementCSS = elementCSS.replace(/^.*animation-name:.*$/mg, "animation-name: "+animationName+";");
        }else{
            elementCSS = elementCSS.replace('preview', animationName);
        }
        document.getElementById('textareaE').value = elementCSS;

        const response = await Globals.api.request({ route: `me/animation/add`, method: "post", data:{'name':animationName,'css':animationCSS} });
        if(response.success === true){
            if(response.data.message == 'animation saved to your account.'){
                Globals.notificationHandler.new(response.data.message);
            }

            if(response.data.message == 'an error occured.'){
                Globals.notificationHandler.new('an error occured, please try again.');
            }

            if(response.data.message == 'Error, You have reached your daily quota for saving animations.'){
                Globals.notificationHandler.new('Error, you have reached your daily animation creation quota, wait until it resets in 24 hours.');
            }

            if(response.data.message == 'User md doesn\'t exist, please contact support.'){
                Globals.notificationHandler.new('There is a problem with your account, please contact support.');
            }

            if(response.data.message == 'Storage is full.'){
                Globals.notificationHandler.new('Error, there is no space left in your storage, please make some space and retry.');
            }

            $("#finish").remove();
            $("#panel").find("*").not('#finish, #textareaE, #textareaA, #eH, #aH, #savebutton, #dltextbutton, #cancelbutton').css({'opacity':'1','pointer-events':'unset'});
        }
    }

    if(elementCSS != ''){
        elementCSS = elementCSS.split("\n").slice(1).join("\n");
        elementCSS = '.'+ elementName + ' { \n' + elementCSS;
        document.getElementById('textareaE').value = elementCSS;

        const response = await Globals.api.request({ route: `me/element/add`, method: "post", data:{'name':elementName,'css':elementCSS,'type':document.getElementsByClassName("selected-element")[0].tagName} });
        if(response.success === true){
            if(response.data.message == 'element saved to your account.'){
                Globals.notificationHandler.new(response.data.message);
            }

            if(response.data.message == 'an error occured.'){
                Globals.notificationHandler.new('an error occured, please try again.');
            }

            if(response.data.message == 'User md doesn\'t exist, please contact support.'){
                Globals.notificationHandler.new('There is a problem with your account, please contact support.');
            }

            if(response.data.message == 'Storage is full.'){
                Globals.notificationHandler.new('Error, there is no space left in your storage, please make some space and retry.');
            }

            $("#finish").remove();
            $("#panel").find("*").not('#finish, #textareaE, #textareaA, #eH, #aH, #savebutton, #dltextbutton, #cancelbutton, #animationName, #elementName').css({'opacity':'1','pointer-events':'unset'});
        }
    }
}
