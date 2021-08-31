// Responsible for setting up page building environment.

class WebPageBuilder{
    constructor(){}

    start(){
        Globals.pageHandler.mediaManager.refreshMedia();

        var previewsite = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "previewsite" ],
            children: [
                {
                    type: "div",
                    classes: [ "lguide" ]
                },
                {
                    type: "div",
                    classes: [ "cguide" ]
                },
                {
                    type: "div",
                    classes: [ "rguide" ]
                },
                {
                    type: "div",
                    classes: [ "vcenterline" ]
                },
                {
                    type: "div",
                    classes: [ "hcenterline" ]
                }
            ]
        });

        Globals.pageHandler.tools.load();
    }
}
