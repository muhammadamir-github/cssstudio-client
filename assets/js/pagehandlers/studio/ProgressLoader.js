// Loader which is shown upon loading fonts while building a page.

class ProgressLoader{
    constructor(){}

    show(){
        var loaderbg = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "loader_bg" ],
        });

        var loader = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "loader" ],
        });

        $('body').css({'pointer-events':'none'});
    }

    hide(){
        var loader = document.getElementsByClassName('loader')[0];
        var loaderbg = document.getElementsByClassName('loader_bg')[0];
        loaderbg.remove();
        loader.remove();

        $('body').css({'pointer-events':'unset'});
    }
}
