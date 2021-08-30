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

        var bgiManager = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            id: "bg-image-manager",
            listeners: {
                mousedown: function(e){
                    self.mousedown(e);
                }
            },
            children: [
                {
                    type: "div",
                    classes: [ "banner" ],
                    children: [
                        {
                            type: "input",
                            attributes: { type: "text", placeholder: "Enter keyword and press enter to search..." },
                            listeners: {
                                keydown: function(e){
                                    if(e.keyCode == 13){
                                        let checkboxOption = this.parentElement.getElementsByClassName("checkbox-one")[0];
                                        if(stateOf.checkbox(checkboxOption) == 1){
                                            Globals.pageHandler.mediaManager.searchUserMedia("images",this.value);
                                        }else{
                                            Globals.pageHandler.thirdPartyMediaManager.resetImages('webpageBuilder');
                                            Globals.pageHandler.thirdPartyMediaManager.searchGIFS(this.value,'','webpageBuilder');
                                            Globals.pageHandler.thirdPartyMediaManager.searchUnsplashPictures(this.value,'','webpageBuilder');
                                            Globals.pageHandler.thirdPartyMediaManager.searchPixelBayPictures(this.value,'','webpageBuilder');
                                        }
                                    }
                                }
                            }
                        },
                        {
                            type: "div",
                            classes: [ "checkbox-one" ],
                            attributes: {
                                "data-bg-hv": "grey",
                                "data-checked": "1",
                                'data-e-type': 'checkbox-one',
                                "data-bg": "black"
                            },
                            children: [
                                {
                                    type: "span",
                                    attributes: { "data-restrictions": "selection" },
                                    style: { backgroundColor: "black" }
                                },
                                {
                                    type: "p",
                                    attributes: { "data-restrictions": "selection" },
                                    text: "Media Storage Search",
                                },
                                {
                                    type: "span",
                                    classes: [ "checkmark" ],
                                    attributes: { "data-restrictions": "selection" },
                                    listeners: {
                                        mouseover: function(){
                                            let span = this.parentElement.getElementsByTagName("span")[0];
                                            publicEvents.checkbox_hover(span);
                                        },
                                        mouseout: function(){
                                            let span = this.parentElement.getElementsByTagName("span")[0];
                                            publicEvents.checkbox_hoverOut(span);
                                        },
                                        click: function(){
                                            let checkboxOption = this.parentElement;
                                            publicEvents.checkbox_click(checkboxOption);
                                        }
                                    }
                                }
                            ]
                        },
                        {
                            type: "p",
                            text: "Image Manager",
                        }
                    ]
                },
                {
                    type: "div",
                    classes: [ "mediaManager_box" ],
                    id: "bg-image-manager-images-box"
                },
                {
                    type: "div",
                    classes: [ "bg-image-manager_panelbar" ],
                    children: [
                        ...(() => {
                            return ["../assets/images/giphylogo2.png", "../assets/images/pixelbaylogo.png", "../assets/images/unsplashlogo.jpg"].map((x,i) => {
                                return {
                                    type: "img",
                                    attributes: { src: x }
                                }
                            });
                        })(),
                        {
                            type: "button",
                            text: "Upload Image",
                            listeners: {
                                click: function(){
                                    let fileinput = this.parentElement.getElementsByTagName("input")[0];
                                    fileinput.click();
                                }
                            }
                        },
                        {
                            type: "input",
                            attributes: { type: "file", accept: "image/png, image/jpeg, image/jpg" },
                            style: {
                                display: "none",
                                opacity: "0",
                                width: "0px",
                                height: "0px"
                            },
                            listeners: {
                                change: function(){
                                    Globals.pageHandler.mediaManager.uploadMedia('Image', this.files[0]);
                                }
                            }
                        }
                    ]
                },
            ]
        });

        Globals.pageHandler.mediaManager.showUserImages(forElement);
    }

    close(){
        document.getElementById('bg-image-manager').remove();
        $('.storageSpace').remove();
    }

    drag(e){
        var elmnt = document.getElementById('bg-image-manager');
        e = e || window.event;
        e.preventDefault();

        // calculate the new cursor position:
        Globals.pageHandler.bgimageManager_pos1 = Globals.pageHandler.bgimageManager_pos3bgimageManager_pos3 - e.clientX;
        Globals.pageHandler.bgimageManager_pos2 = Globals.pageHandler.bgimageManager_pos4 - e.clientY;
        Globals.pageHandler.bgimageManager_pos3bgimageManager_pos3 = e.clientX;
        Globals.pageHandler.bgimageManager_pos4 = e.clientY;

        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - Globals.pageHandler.bgimageManager_pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - Globals.pageHandler.bgimageManager_pos1) + "px";
        elmnt.style.cursor = 'grabbing';
    }

    mousedown(e){
        const self = Globals.pageHandler.backgroundImageManager;
        var elmnt = document.getElementById('bg-image-manager');
        if(e.target == elmnt){
            e = e || window.event;
            e.preventDefault();

            elmnt.style.cursor = 'grab';

            // get the mouse cursor position at startup:
            Globals.pageHandler.bgimageManager_pos3bgimageManager_pos3 = e.clientX;
            Globals.pageHandler.bgimageManager_pos4 = e.clientY;
            document.onmouseup = self.closeDrag;

            // call a function whenever the cursor moves:
            document.onmousemove = self.drag;
        }
    }

    closeDrag(){
        var elmnt = document.getElementById('bg-image-manager');
        document.onmouseup = null;
        document.onmousemove = null;
        elmnt.style.cursor = 'default';
    }

}
