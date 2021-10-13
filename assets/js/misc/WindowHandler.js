let Globals = null;

export default class WindowHandler{
    constructor(){
        Globals = window.globals;
        Globals.window.body.addEventListener("contextmenu", function(event){ event.preventDefault(); return false; });
        window.addEventListener("keydown", this.keyDown);
    }

    async keyDown(event){
        if(event.key === "Delete"){
            let panelController = await Globals.components.controller(document.getElementById("panel"));
            if(panelController){
                panelController.deleteSelectedElement();
            }
        }
    }
}
