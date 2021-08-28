class UserMediaManager{
    constructor(){
        this.user_images = [];
        this.user_videos = [];
    }

    async refreshMedia(){
        const self = this;

        //if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video' || $(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'image'){

        const response = await Globals.api.request({ route: `me/media`, method: "get" });
        if(response.success === true){
            var media = response.data.Media;
            console.log(media);

            self.user_images = [];
            self.user_videos = [];

            for(var i=0; i < media.length; i++){
                if(media[i].type == 'Image'){
                    self.user_images.push(media[i]);
                }else{
                    if(media[i].type == 'Video'){
                        self.user_videos.push(media[i]);
                    }
                }
            }

            self.updateStorageSpace(response.data.Storage);
            self.updateSpaceDetails(self.user_images,self.user_videos,response.data.Storage.split('/')[0]);
        }

        //}

    }

    searchUserMedia(type,query){
        var searchBox;

        if(type == "videos"){
            searchBox = document.getElementById("videoManager-videos-box");
        }else{
            if(type == "images"){
                searchBox = document.getElementById("bg-image-manager-images-box");
            }
        }

        var items = searchBox.getElementsByTagName("div");

        for(var i=0; i<items.length; i++){
            var strToSearch;

            if(type == "videos"){
                var img = items[i].getElementsByTagName("img")[0];
                strToSearch = img.getAttribute("data-title") + " " + img.getAttribute("data-video-title");
                console.log(strToSearch);
            }else{
                if(type == "images"){
                    var img = items[i].getElementsByTagName("img")[0];
                    strToSearch = img.getAttribute("data-title") + " " + img.getAttribute("data-image-title");
                    console.log(strToSearch);
                }
            }

            if(strToSearch.includes(query)){
                items[i].style.display = "inline-block";
            }else{
                items[i].style.display = "none";
                console.log("does not contains "+query);
            }
        }
    }

    showImageInfo(e, target){
        var filename = $(target).attr('data-title');
        var size = $(target).attr('data-size');
        var title = $(target).attr('data-image-title');
        var des = $(target).attr('data-description');

        if(title == "null" || title == null){ title = ""; }
        if(des == "null" || des == null){ des = ""; }

        let div = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            style: {
                left: e.clientX + 'px',
                top: (e.clientY + window.scrollY) + 'px'
            },
            classes: [ "mediaInfo" ],
            id: target.id+'-meta',
            listeners: {
                mouseover: function(){
                    this.remove();
                }
            },
            children: (() => {
                return [
                    "Title: "+title,
                    des.length > 150 ? 'Description: '+des.substring(0,150)+"..." : 'Description: '+des,
                    "File Name: "+filename,
                    'Size: '+Globals.pageHandler.calculator.formatBytes(size),
                ].map(x => {
                    return {
                        type: "p",
                        text: x,
                    }
                })
            })(),
        });
    }

    hideImageInfo(target){
        var div = document.getElementById(target.id+'-meta').remove();
    }

    async deleteMedia(id,type){
        const self = this;

        const response = await Globals.api.request({ route: `media/delete`, method: "post", data: {'media_id':id} });
        if(response.success === true){
            console.log(response);
            self.refreshMedia();

            if(response.data.Message == 'Media deleted successfully'){
                Globals.notificationHandler.new('Success, '+response.data.Message);
            }

            if(response.data.Message == "You don't have permissions to delete this media." || response.data.Message == "Invalid Input"){
                Globals.notificationHandler.new('Error, '+response.data.Message);
            }

            if(type == 'Image'){
                setTimeout(function(){self.showUserImages(null)},1000);
            }else{
                if(type == 'Video'){
                    setTimeout(function(){self.showUserVideos()},1000);
                }
            }

            Globals.pageHandler.storageLimit = Globals.pageHandler.calculator.formatBytes(response.data.Storage.split('/')[0]);
            Globals.pageHandler.storageLeft = Globals.pageHandler.calculator.formatBytes(response.data.Storage.split('/')[1]);
            Globals.pageHandler.storageUsed = Globals.pageHandler.calculator.formatBytes(response.data.Storage.split('/')[0]-response.data.Storage.split('/')[1]);

            $('.storageSpace').text('Media Storage Usage: '+Globals.pageHandler.storageUsed+' / '+Globals.pageHandler.storageLimit);
        }
    }

    changeThumbnailPreview(file,txtbox){
        var reader  = new FileReader();
        var preview = txtbox.getElementsByTagName("img");

        if(preview[0]){
            reader.onload = function () {
                preview[0].src = reader.result;
            }

            reader.readAsDataURL(file);
        }
    }

    async updateMedia(id,textboxContainer,type){
        const self = this;
        var token = localStorage.getItem('auth');

        var title;
        var description;
        var image;
        var txtboxes = textboxContainer.getElementsByClassName("txtbox");

        for(var i=0; i<txtboxes.length; i++){
            var name = txtboxes[i].getAttribute("data-name");
            if(name == "Title"){
                title = txtboxes[i].getElementsByTagName("input")[0].value;
            }else{
                if(name == "Description"){
                    description = txtboxes[i].getElementsByTagName("textarea")[0].value;
                }else{
                    if(name == "Thumbnail"){
                        if(type == "video"){
                            if(txtboxes[i].getElementsByTagName("input")[0]){
                                if(txtboxes[i].getElementsByTagName("input")[0].files){
                                    if(txtboxes[i].getElementsByTagName("input")[0].files[0]){
                                        image = txtboxes[i].getElementsByTagName("input")[0].files[0];
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        var formData = new FormData();
        formData.append('media_id', id);

        if(title !== "" && title !== null && title !== "null"){
            formData.append('title', title);
        }

        if(description !== "" && description !== null && description !== "null"){
            formData.append('description', description);
        }

        if(image !== "" && image !== null && image !== "null"){
            formData.append('thumbnail', image);
        }

        const response = await Globals.api.request({ route: `media/update`, method: "post", data: formData });
        if(response.success === true){
            self.refreshMedia();

            var message = response.data.Message;
            console.log(message);

            if(message == 'Media updated successfully'){
                Globals.notificationHandler.new('Success, '+message);
            }

            if(message == "You don't have permissions to delete this media." || message == "Invalid Input"){
                Globals.notificationHandler.new('Error, '+message);
            }

            if(type == 'image'){
                setTimeout(function(){self.showUserImages(null)},1000);
            }else{
                if(type == 'video'){
                    setTimeout(function(){self.showUserVideos()},1000);
                }
            }

            mediaEditor.close(type);
        }
    }

    updateSpaceDetails(userImgs,userVids,totalSpace){
        var totalImgSpace = 0;
        var totalVidSpace = 0;

        for(var i=0; i<userImgs.length; i++){
            totalImgSpace = totalImgSpace + userImgs[i].size;
            console.log(totalImgSpace);
        }

        for(var i=0; i<userVids.length; i++){
            totalVidSpace = totalVidSpace + userVids[i].size;
            console.log(totalVidSpace);
        }

        Globals.pageHandler.spaceUsedByImages = Globals.pageHandler.calculator.formatBytes(totalImgSpace);
        Globals.pageHandler.spaceUsedByVideos = Globals.pageHandler.calculator.formatBytes(totalVidSpace);
        Globals.pageHandler.FreeSpace = Globals.pageHandler.calculator.formatBytes(totalSpace - (totalImgSpace + totalVidSpace));
    }

    updateStorageSpace(storage){
        Globals.pageHandler.storageLimit = Globals.pageHandler.calculator.formatBytes(storage.split('/')[0]);
        Globals.pageHandler.storageLeft = Globals.pageHandler.calculator.formatBytes(storage.split('/')[1]);
        Globals.pageHandler.storageUsed = Globals.pageHandler.calculator.formatBytes(storage.split('/')[0]-storage.split('/')[1]);

        $('.storageSpace').text('Media Storage Usage: '+Globals.pageHandler.storageUsed+' / '+Globals.pageHandler.storageLimit);
    }

    updateUploadButtonText(type,state){
        var text;
        var button;

        if(type == "Video"){
            button = document.getElementsByClassName('videoManager_panelbar')[0].getElementsByTagName('button')[0];
        }else{
            if(type == "Image"){
                button = document.getElementsByClassName('bg-image-manager_panelbar')[0].getElementsByTagName('button')[0];
            }
        }

        if(state == null){
            if(type == "Image"){
                text = "Upload Image";
            }else{
                if(type == "Video"){
                    text  = "Upload Video (50MB Max Size)";
                }
            }

            button.style.opacity = '1';
            button.style.pointerEvents = 'unset';
        }else{
            if(state !== null){
                if(state == "finishing"){
                    text = "Finishing...";
                }else{
                    text = "Uploading... ("+state+"%)";
                }
            }
        }

        button.innerText = text;
    }

    async uploadMedia(type,file){
        const self = this;
        var token = localStorage.getItem('auth');

        var file_size = file.size;
        var file_extension = file.type.split("/").pop();
        var file_name = file.name.split(".")[0];

        var upload = 0;

        if(type == 'Image'){
            if(file_extension !== 'png' && file_extension !== 'jpeg' && file_extension !== 'jpg'){
                Globals.notificationHandler.new('Error, you can only upload png/jpeg/jpg type image.');
                upload = 0;
                return false;
            }else{
                upload = 1;
            }
        }else{
            if(type == 'Video'){
                if(file_extension !== 'mp4'){
                    Globals.notificationHandler.new('Error, you can only upload mp4 type video.');
                    upload = 0;
                    return false;
                }else{
                    upload = 1;
                }
            }
        }

        var formData = new FormData();
        formData.append('file_name', file_name);
        formData.append('file_type', type);
        formData.append('file', file);

        if(upload == 1){

            if(type == 'Image'){
                document.getElementsByClassName('bg-image-manager_panelbar')[0].getElementsByTagName('button')[0].innerText = 'Uploading...';
                document.getElementsByClassName('bg-image-manager_panelbar')[0].getElementsByTagName('button')[0].style.opacity = '0.5';
                document.getElementsByClassName('bg-image-manager_panelbar')[0].getElementsByTagName('button')[0].style.pointerEvents = 'none';
            }else{
                if(type == 'Video'){
                    document.getElementsByClassName('videoManager_panelbar')[0].getElementsByTagName('button')[0].innerText = 'Uploading...';
                    document.getElementsByClassName('videoManager_panelbar')[0].getElementsByTagName('button')[0].style.opacity = '0.5';
                    document.getElementsByClassName('videoManager_panelbar')[0].getElementsByTagName('button')[0].style.pointerEvents = 'none';
                }
            }

            const response = await Globals.api.request({ route: `me/upload`, method: "post", data: formData });
            if(response.success === true){
                console.log(response.data);
                self.refreshMedia();
                self.updateUploadButtonText(type,null);

                var message;

                if(response.data.Message){
                    if(response.data.Message.original){
                        message = response.data.Message.original;
                    }else{
                        message = response.data.Message;
                    }
                }else{
                    if(response.data[0].original.message){
                        message = response.data[0].original.message;
                    }
                }

                if(message.includes('Not Enough Space')){
                    Globals.notificationHandler.new('Error, '+message);
                }else{
                    if(type == 'Image'){
                        setTimeout(function(){self.showUserImages(null)},1000);
                        if(message.includes('Invalid')){

                        }else{
                            Globals.notificationHandler.new('Success, '+message);
                        }
                    }else{
                        if(type == 'Video'){
                            setTimeout(function(){self.showUserVideos()},1000);
                            if(message.includes('Invalid')){

                            }else{
                                Globals.notificationHandler.new('Success, '+message);
                            }
                        }
                    }
                }

                self.updateStorageSpace(response.data.Storage);
            }
        }

    }

    showUserImages(forElement){
        const self = this;
        const user_images = self.user_images;

        $("#bg-image-manager-images-box").empty();
        for(var i=0; i<user_images.length; i++){
            let div = Globals.elements.new({
                type: "div",
                parent: document.getElementById("bg-image-manager-images-box"),
                listeners: {
                    click: document.getElementsByClassName('selElForImgPik')[0] ? function(){
                        let image = this.getElementsByTagName("img")[0];

                        if(document.getElementsByClassName('selElForImgPik')[0]){
                            document.getElementsByClassName('selElForImgPik')[0].setAttribute('src', 'http://localhost:8000/api/assets/'+image.src);
                            if(document.getElementsByClassName('selElForImgPik_invoker')[0]){
                                document.getElementsByClassName('selElForImgPik_invoker')[0].setAttribute('src', 'http://localhost:8000/api/assets/'+image.src);
                            }
                        }
                    } : $(document.getElementsByClassName("selected")[0]).attr("data-e-type") == 'video' ? function(e){
                        let image = this.getElementsByTagName("img")[0];
                        document.getElementsByClassName('selected')[0].setAttribute('poster', 'http://localhost:8000/api/assets/'+image.src);
                    } : function(){
                        let image = this.getElementsByTagName("img")[0];
                        document.getElementsByClassName('selected')[0].src = 'http://localhost:8000/api/assets/'+image.src;
                    }
                },
                children: [
                    {
                        type: "img",
                        id: randomize.elementId(5),
                        attributes: {
                            src: 'http://localhost:8000/api/assets/'+user_images[i].path,
                            "data-title": user_images[i].name,
                            "data-size": user_images[i].size,
                            "data-image-title": user_images[i].title,
                            "data-description": user_images[i].description,
                            "data-m-id": user_images[i].id,
                        }
                    },
                    {
                        type: "span",
                        text: user_images[i].title ? (user_images[i].title.length > 15 ? user_images[i].title.substring(0,15)+"..." : user_images[i].title) : user_images[i].name ? (user_images[i].name.length > 15 ? user_images[i].name.substring(0,15)+"..." : user_images[i].name) : "",
                        listeners: {
                            mouseover: function(e){
                                let image = this.parentElement.getElementsByTagName("img")[0];
                                self.showImageInfo(e, image);
                            },
                            mouseout: function(){
                                let image = this.parentElement.getElementsByTagName("img")[0];
                                self.hideImageInfo(image);
                            }
                        }
                    },
                    {
                        type: "i",
                        classes: [ "fas", "fa-trash" ],
                        listeners: {
                            click: function(){
                                self.deleteMedia(user_images[i].id, 'Image');
                            }
                        }
                    },
                    {
                        type: "i",
                        classes: [ "fas", "fa-pen" ],
                        listeners: {
                            click: function(){
                                let image = this.parentElement.getElementsByTagName("img")[0];
                                mediaEditor.open("image", image);
                            }
                        }
                    },
                ]
            });
        }
    }

    showUserVideos(forElement){
        const self = this;
        const user_videos = self.user_videos;

        $("#videoManager-videos-box").empty();
        if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video' || $(document.getElementsByClassName('selected')[0]).attr('data-e-type').includes('video-player') || $(document.getElementsByClassName('selected')[0]).attr('data-e-type').includes('video-playlist')){
            for(var i=0; i<user_videos.length; i++){
                var title = user_videos[i].title;
                var description = user_videos[i].description;

                if(title == null){ title == ""; }
                if(description == null){ description == ""; }

                let div = Globals.elements.new({
                    type: "div",
                    parent: document.getElementById("videoManager-videos-box"),
                    listeners: {
                        click: document.getElementsByClassName('selElForVidPik')[0] ? function(){
                            let image = this.getElementsByTagName("img")[0];

                            if(document.getElementsByClassName('selElForVidPik')[0]){
                                document.getElementsByClassName('selElForVidPik')[0].setAttribute("data-vid-url",'http://localhost:8000/api/assets/'+$(image).attr('data-video-url'));
                                document.getElementsByClassName('selElForVidPik')[0].getElementsByTagName("img")[0].src = image.src;
                                document.getElementsByClassName('selElForVidPik')[0].setAttribute("data-title",image.getAttribute("data-video-title"));
                                document.getElementsByClassName('selElForVidPik')[0].setAttribute("data-description",image.getAttribute("data-video-des"));
                                forElement.innerText = image.getAttribute("data-video-title");
                                if(document.getElementsByClassName('selElForVidPik_invoker')[0]){
                                    document.getElementsByClassName('selElForVidPik_invoker')[0].setAttribute('src',image.src);
                                    document.getElementsByClassName('selElForVidPik_invoker')[0].parentElement.parentElement.getElementsByTagName("td")[1].innerText = image.getAttribute("data-video-title");
                                }
                            }
                        } : $(document.getElementsByClassName("selected")[0]).attr("data-e-type").includes('video-player') ? function(e){
                            let image = this.getElementsByTagName("img")[0];

                            document.getElementsByClassName('selected')[0].getElementsByTagName("video")[0].src = 'http://localhost:8000/api/assets/'+$(image).attr('data-video-url');
                            document.getElementsByClassName('selected')[0].getElementsByClassName("video-player-thumb")[0].setAttribute("src",image.src);

                            document.getElementsByClassName('selected')[0].getElementsByClassName("video-info")[0].getElementsByClassName("heading")[0].innerText = image.getAttribute("data-video-title");
                            document.getElementsByClassName('selected')[0].getElementsByClassName("video-info")[0].getElementsByClassName("description")[0].innerText = image.getAttribute("data-video-des");

                            document.getElementsByClassName('selected')[0].setAttribute("data-title",image.getAttribute("data-video-title"));
                            document.getElementsByClassName('selected')[0].setAttribute("data-description",image.getAttribute("data-video-des"));

                            document.getElementsByClassName('selected')[0].getElementsByTagName("video")[0].setAttribute("data-len",image.getAttribute("data-video-len"));

                            if(document.getElementsByClassName('selected')[0].getElementsByClassName("video-cover")[0]){
                                document.getElementsByClassName('selected')[0].getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0].innerText = image.getAttribute("data-video-title");

                                if(image.getAttribute("data-video-title").length >= 10){
                                    document.getElementsByClassName('selected')[0].getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0].style.fontSize = "35px";
                                }else{
                                    if(image.getAttribute("data-video-title").length < 10){
                                        document.getElementsByClassName('selected')[0].getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0].style.fontSize = "50px";
                                    }
                                }
                            }
                        } : function(){
                            let image = this.getElementsByTagName("img")[0];

                            document.getElementsByClassName('selected')[0].src = 'http://localhost:8000/api/assets/'+$(image).attr('data-video-url');
                            document.getElementsByClassName('selected')[0].setAttribute("poster",image.src);
                        }
                    },
                    children: [
                        {
                            type: "img",
                            id: randomize.elementId(5),
                            listeners: {
                                click: VideoManager.changeVideo,
                            },
                            attributes: {
                                src: 'http://localhost:8000/api/assets/'+user_videos[i].thumbnail,
                                "data-title": user_videos[i].name,
                                "data-size": user_videos[i].size,
                                "data-video-url": user_videos[i].path,
                                "data-video-title": title,
                                "data-video-des": description,
                                "data-video-len": user_videos[i].length,
                                "data-m-id": user_videos[i].id,
                            }
                        },
                        {
                            type: "span",
                            text: title ? (title.length > 15 ? title.substring(0,15)+"..." : title) : user_videos[i].name ? (user_videos[i].name.length > 15 ? user_videos[i].name.substring(0,15)+"..." : user_videos[i].name) : "",
                            listeners: {
                                mouseover: function(e){
                                    let image = this.parentElement.getElementsByTagName("img")[0];
                                    VideoManager.showVideoInfo(e, image);
                                },
                                mouseout: function(){
                                    let image = this.parentElement.getElementsByTagName("img")[0];
                                    VideoManager.hideVideoInfo(image);
                                }
                            }
                        },
                        {
                            type: "i",
                            classes: [ "fas", "fa-trash" ],
                            listeners: {
                                click: function(){
                                    self.deleteMedia(user_videos[i].id, 'Video');
                                }
                            }
                        },
                        {
                            type: "i",
                            classes: [ "fas", "fa-pen" ],
                            listeners: {
                                click: function(){
                                    let image = this.parentElement.getElementsByTagName("img")[0];
                                    mediaEditor.open("video", image);
                                }
                            }
                        },
                    ]
                });
            }
        }
    }
}
