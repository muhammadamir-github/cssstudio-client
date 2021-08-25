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

        Globals.pageHandler.progressLoader.show();

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

    addFontComboBox(){
        var comboboxOptions = ["Sans", "Sans-Serif", "Helvectia", "Monospace", "Cursive", "Fantasy"];

        var combobox = Globals.elements.new({
            type: "combobox",
            parent: document.getElementsByClassName('fontManager')[0],
            id: "wpb_fontFamily",
            style: { marginTop: "50px" },
            listeners: {
                mousedown: function(e){
                    Globals.pageHandler.fontmanager.mousedown(e);
                }
            },
            children: [
                {
                    type: "selected",
                    children: [
                        {
                            type: "a",
                            children: [
                                {
                                    type: "span",
                                    text: "Font Family",
                                    listeners: {
                                        click: function(e){
                                            if(e.target == this){
                                                let combobox_options = this.parentElement.parentElement.parentElement.getElementsByTagName("options")[0];
                                                let combobox_options_ul = combobox_options.getElementsByTagName("ul")[0];

                                                if(combobox_options.style.display == 'block'){
                                                    combobox_options.style.display = 'none';
                                                    combobox_options_ul.style.display = 'none';

                                                    this.style.textAlign = '';
                                                    combobox.classList.remove('selectedCombobox');
                                                }else{
                                                    combobox_options.style.display = 'block';
                                                    combobox_options_ul.style.display = 'block';

                                                    this.style.textAlign = 'left';
                                                    combobox.classList.add('selectedCombobox');
                                                }
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                {
                    type: "options",
                    children: [
                        {
                            type: "ul",
                            children: (() => {
                                return comboboxOptions.map((x,i) => {
                                    return {
                                        type: "li",
                                        listeners: {
                                            click: function(){
                                                let combobox_selected_a_span = this.parentElement.parentElement.parentElement.getElementsByTagName("selected")[0].getElementsByTagName("span")[0];
                                                let combobox_options = this.parentElement.parentElement;

                                                document.getElementsByClassName('selected')[0].style.fontFamily = this.getElementsByTagName('a')[0].innerText;
                                                combobox_selected_a_span.innerText = 'Font Family' + ': ' + this.getElementsByTagName('a')[0].innerText;
                                                combobox_options.style.display = 'none';
                                            }
                                        },
                                        children: [
                                            {
                                                type: "a",
                                                text: x,
                                                style: { fontFamily: x },
                                                classes: i == comboboxOptions.length-1 ? [ "lastoption" ] : null,
                                                children: [
                                                    {
                                                        type: "span",
                                                        text: x,
                                                        classes: [ "value" ]
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                })
                            })(),
                        }
                    ]
                },
            ]
        });
    }
}
