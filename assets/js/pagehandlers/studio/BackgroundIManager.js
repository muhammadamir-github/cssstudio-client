class BackgroundIManager{
    constructor(){}

    load(){
    }

    empty(){

    }

    open(e,forElement){
        const self = this;
        $('.storageSpace').remove();

        var storageSpace = document.createElement('span');
        storageSpace.className = 'storageSpace';
        storageSpace.innerText = 'Media Storage Usage: '+Globals.pageHandler.storageUsed+' / '+Globals.pageHandler.storageLimit;

        storageSpace.addEventListener("mouseover",function(e){
            storageSpace_showDetails(storageSpace,e);
        });

        storageSpace.addEventListener("mouseout",function(e){
            storageSpace_hideDetails(storageSpace,e);
        });

        var bgiManager = document.createElement('div');
        bgiManager.id = 'bg-image-manager';
        bgiManager.addEventListener('mousedown',function(e){
            self.mousedown(e);
        });

        var imagesbox = document.createElement('div');
        imagesbox.className = 'mediaManager_box';
        imagesbox.id = 'bg-image-manager-images-box';

        var fileinput = document.createElement('input');
        fileinput.type = 'file';
        fileinput.accept = 'image/png, image/jpeg, image/jpg';
        fileinput.style.display = 'none';
        fileinput.style.opacity = 0;
        fileinput.style.width = '0px';
        fileinput.style.height = '0px';
        fileinput.addEventListener('change',function(){
            Globals.pageHandler.mediaManager.uploadMedia('Image',this.files[0]);
        });

        var uploadBtn = document.createElement('button');
        uploadBtn.innerText = 'Upload Image';
        uploadBtn.addEventListener('click',function(){
            fileinput.click();
        });

        var panelbar = document.createElement('div');
        panelbar.className = 'bg-image-manager_panelbar'

        var giphy_panelbutton = document.createElement('img');
        var pixelbay_panelbutton = document.createElement('img');
        var unsplash_panelbutton = document.createElement('img');
        giphy_panelbutton.src = '../assets/images/giphylogo2.png';
        pixelbay_panelbutton.src = '../assets/images/pixelbaylogo.png';
        unsplash_panelbutton.src = '../assets/images/unsplashlogo.jpg';

        panelbar.appendChild(giphy_panelbutton);
        panelbar.appendChild(pixelbay_panelbutton);
        panelbar.appendChild(unsplash_panelbutton);
        panelbar.appendChild(uploadBtn);
        panelbar.appendChild(fileinput);

        var searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Enter keyword and press enter to search...';

        // checkbox -----

        var checkboxOption = document.createElement('div');

        var span = document.createElement("span");
        var p = document.createElement("p");
        var checkmark = document.createElement("span");
        checkmark.className = "checkmark";

        checkboxOption.setAttribute("data-bg-hv","grey");
        checkboxOption.setAttribute("data-checked","1");

        checkmark.addEventListener("mouseover",function(){
            publicEvents.checkbox_hover(span);
        });

        checkmark.addEventListener("mouseout",function(){
            publicEvents.checkbox_hoverOut(span);
        });

        checkmark.addEventListener("click",function(){
            publicEvents.checkbox_click(checkboxOption);
        });

        span.setAttribute("data-restrictions","selection");
        p.setAttribute("data-restrictions","selection");
        checkmark.setAttribute("data-restrictions","selection");

        checkboxOption.className = 'checkbox-one';
        checkboxOption.setAttribute('data-e-type','checkbox-one');

        checkboxOption.setAttribute("data-bg","black");
        span.style.backgroundColor = "black";

        p.innerText = "Media Storage Search";

        checkboxOption.appendChild(span);
        checkboxOption.appendChild(p);
        checkboxOption.appendChild(checkmark);

        // end checkbox -----

        searchInput.addEventListener('keydown',function(e){
            if(e.keyCode == 13){
                if(stateOf.checkbox(checkboxOption) == 1){
                    Globals.pageHandler.mediaManager.searchUserMedia("images",this.value);
                }else{
                    Globals.pageHandler.thirdPartyMediaManager.resetImages('webpageBuilder');
                    Globals.pageHandler.thirdPartyMediaManager.searchGIFS(this.value,'','webpageBuilder');
                    Globals.pageHandler.thirdPartyMediaManager.searchUnsplashPictures(this.value,'','webpageBuilder');
                    Globals.pageHandler.thirdPartyMediaManager.searchPixelBayPictures(this.value,'','webpageBuilder');
                }
            }
        });

        var banner = document.createElement('div');
        banner.className = 'banner';
        banner.appendChild(searchInput);
        banner.appendChild(checkboxOption);

        var banner_p = document.createElement('p');
        banner_p.innerText = 'Image Manager';

        banner.appendChild(banner_p);

        bgiManager.appendChild(banner);
        bgiManager.appendChild(imagesbox);
        bgiManager.appendChild(panelbar);
        Globals.window.body.appendChild(bgiManager);

        Globals.pageHandler.mediaManager.showUserImages(forElement);

        Globals.window.body.appendChild(storageSpace);
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
