// Responsible for handling Background Image Changer/Selector/Manager which allows user to change background image of an element.

class BackgroundIManager{
    constructor(){}

    load(){
    }

    empty(){

    }

    open(e,forElement){
        const self = this;

        $('.storageSpace').remove();
        var storageSpace = Globals.elements.new({
            type: "span",
            parent: Globals.window.body,
            classes: [ "storageSpace" ],
            text: `Media Storage Usage: ${Globals.pageHandler.storageUsed}/${Globals.pageHandler.storageLimit}`,
            listeners: {
                mouseover: function(e){
                    storageSpace_showDetails(storageSpace,e);
                },
                mouseout: function(e){
                    $(".storageSpace_details").remove();
                }
            }
        });

        Globals.pageHandler.mediaManager.showUserImages(forElement);
    }

    close(){
        document.getElementById('bg-image-manager').remove();
        $('.storageSpace').remove();
    }
}
