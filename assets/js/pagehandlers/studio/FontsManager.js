// Responsible for handling Font Changer/Selector which allows user to change font of an element.

class FontsManager{
    constructor(){}

    load(){
    }

    empty(){
        var comboboxes = document.getElementsByClassName('fontManager')[0].getElementsByTagName('combobox');

        for(var i = comboboxes.length -1; i >= 0 ; i--){
            comboboxes[i].remove();
        }
    }

    open(){
        var fontManager = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "fontManager" ],
            listeners: {
                mousedown: function(e){
                    Globals.pageHandler.fontmanager.mousedown(e);
                }
            },
            children: [
                {
                    type: "div",
                    classes: [ "banner" ],
                    children: [
                        {
                            type: "p",
                            text: "Font Manager"
                        }
                    ]
                }
            ]
        });

        this.addFontComboBox();
        getGoogleFonts(document.getElementsByClassName('selected')[0],'webpageBuilder');
    }

    close(){
        document.getElementsByClassName('fontManager')[0].remove();
    }

    drag(e){
        var elmnt = document.getElementsByClassName('fontManager')[0];
        e = e || window.event;
        e.preventDefault();

        // calculate the new cursor position:
        Globals.pageHandler.styler_pos1 = Globals.pageHandler.styler_pos3 - e.clientX;
        Globals.pageHandler.styler_pos2 = Globals.pageHandler.styler_pos4 - e.clientY;
        Globals.pageHandler.styler_pos3 = e.clientX;
        Globals.pageHandler.styler_pos4 = e.clientY;

        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - Globals.pageHandler.styler_pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - Globals.pageHandler.styler_pos1) + "px";
        elmnt.style.cursor = 'grabbing';
    }

    mousedown(e){
        var elmnt = document.getElementsByClassName('fontManager')[0];
        if(e.target == elmnt){
            e = e || window.event;
            e.preventDefault();

            elmnt.style.cursor = 'grab';

            // get the mouse cursor position at startup:
            Globals.pageHandler.styler_pos3 = e.clientX;
            Globals.pageHandler.styler_pos4 = e.clientY;
            document.onmouseup = this.closeDrag;

            // call a function whenever the cursor moves:
            document.onmousemove = this.drag;
        }
    }

    closeDrag(){
        var elmnt = document.getElementsByClassName('fontManager')[0];
        document.onmouseup = null;
        document.onmousemove = null;
        elmnt.style.cursor = 'default';
    }

    async addFontComboBox(){
        let combobox = await Globals.components.new({
            name: "internal-combobox",
            parent: document.getElementsByClassName('fontManager')[0],
            elementType: "selected",
            data: {
                id: "wpb_fontFamily",
                style: {
                    marginTop: "50px",
                },
                text: "Font Family",
                options: ["Sans", "Sans-Serif", "Helvectia", "Monospace", "Cursive", "Fantasy"]
            }
        });
    }
}
