class MiniStyler{
    drag(e){
        var elmnt = document.getElementsByClassName('miniStyler')[0];
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
        var elmnt = document.getElementsByClassName('miniStyler')[0];
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
        var elmnt = document.getElementsByClassName('miniStyler')[0];
        document.onmouseup = null;
        document.onmousemove = null;
        elmnt.style.cursor = 'default';
    }

}
