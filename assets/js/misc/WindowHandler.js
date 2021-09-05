let Globals = null;

export default class WindowHandler{
    constructor(){
        Globals = window.globals;
        Globals.window.body.addEventListener("contextmenu", function(){ return false; });
        window.addEventListener("keypress", this.keyPress);
    }

    keyPress(event){
        let keyCode = (event.which) ? event.which : event.keyCode;
        console.log(keyCode);
    }
}
