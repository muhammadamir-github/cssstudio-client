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

        }
    }

    if(elementCSS != ''){
        elementCSS = elementCSS.split("\n").slice(1).join("\n");
        elementCSS = '.'+ elementName + ' { \n' + elementCSS;
        document.getElementById('textareaE').value = elementCSS;

        const response = await Globals.api.request({ route: `me/element/add`, method: "post", data:{'name':elementName,'css':elementCSS,'type':document.getElementsByClassName("selected-element")[0].tagName} });
        if(response.success === true){

        }
    }
}
