// Responsible for handling Background Video Changer/Selector/Manager which allows user to change video of an video element.

class VideosManager{
    constructor(){}

    load(){
    }

    empty(){

    }

    open(e,forElement){
        const self = Globals.pageHandler.VideoManager;

        let condition1 = $(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video' || $(document.getElementsByClassName('selected')[0]).attr('data-e-type').includes('video-player') || $(document.getElementsByClassName('selected')[0]).attr('data-e-type').includes('video-playlist');
        let condition2 = $(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video-overlay';

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

        var videoManager = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "videoManager" ],
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
                                keydown: condition1 ? function(e){
                                    if(e.keyCode == 13){
                                        Globals.pageHandler.mediaManager.searchUserMedia("videos", this.value);
                                    }
                                } : condition2 ? function(e){
                                    if(e.keyCode == 13){
                                        Globals.pageHandler.thirdPartyMediaManager.searchYoutubeVideos(this.value);
                                    }
                                } : null,
                            }
                        },
                        {
                            type: "p",
                            text: "Video Manager",
                        }
                    ]
                },
                {
                    type: "div",
                    classes: [ "mediaManager_box" ],
                    id: "videoManager-videos-box"
                },
                {
                    type: "div",
                    classes: [ "videoManager_panelbar" ],
                    children: [
                        ...(() => {
                            return ["../assets/images/youtubelogo.png"].map((x,i) => {
                                return {
                                    type: "img",
                                    attributes: { src: x }
                                }
                            });
                        })(),
                        {
                            type: "button",
                            text: "Upload Video (50MB Max Size)",
                            listeners: {
                                click: function(){
                                    let fileinput = this.parentElement.getElementsByTagName("input")[0];
                                    fileinput.click();
                                }
                            }
                        },
                        {
                            type: "input",
                            attributes: { type: "file", accept: "video/mp4,video/x-m4v,video/*" },
                            style: {
                                display: "none",
                                opacity: "0",
                                width: "0px",
                                height: "0px"
                            },
                            listeners: {
                                change: function(){
                                    Globals.pageHandler.mediaManager.uploadMedia('Video', this.files[0]);
                                }
                            }
                        }
                    ]
                },
            ]
        });

        if(condition1){
            Globals.pageHandler.mediaManager.showUserVideos(forElement);
        }
    }

    close(){
        document.getElementsByClassName('videoManager')[0].remove();
        $('.storageSpace').remove();
    }

    drag(e){
        var elmnt = document.getElementsByClassName('videoManager')[0];
        e = e || window.event;
        e.preventDefault();

        // calculate the new cursor position:
        Globals.pageHandler.videoManager_pos1 = Globals.pageHandler.videoManager_pos3 - e.clientX;
        Globals.pageHandler.videoManager_pos2 = Globals.pageHandler.videoManager_pos4 - e.clientY;
        Globals.pageHandler.videoManager_pos3 = e.clientX;
        Globals.pageHandler.videoManager_pos4 = e.clientY;

        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - Globals.pageHandler.videoManager_pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - Globals.pageHandler.videoManager_pos1) + "px";
        elmnt.style.cursor = 'grabbing';
    }

    mousedown(e){
        const self = Globals.pageHandler.VideoManager;
        var elmnt = document.getElementsByClassName('videoManager')[0];
        if(e.target == elmnt){
            e = e || window.event;
            e.preventDefault();

            elmnt.style.cursor = 'grab';

            // get the mouse cursor position at startup:
            Globals.pageHandler.videoManager_pos3 = e.clientX;
            Globals.pageHandler.videoManager_pos4 = e.clientY;
            document.onmouseup = self.closeDrag;

            // call a function whenever the cursor moves:
            document.onmousemove = self.drag;
        }
    }

    closeDrag(){
        var elmnt = document.getElementsByClassName('videoManager')[0];
        document.onmouseup = null;
        document.onmousemove = null;
        elmnt.style.cursor = 'default';
    }

    showVideoInfo(e,target){
        var mousePositions = publicEvents.detectHoverSideOfElement(target,e);

        var title = $(target).attr('data-title');
        if(title == "null" || title == null){ title = ""; }

        let children = [];
        if(target.src.includes('localhost')){
            var size = $(target).attr('data-size');
            var description = $(target).attr('data-video-des');
            var videoTitle = $(target).attr('data-video-title');

            if(description == "null" || description == null){ description = ""; }
            if(videoTitle == "null" || videoTitle == null){ videoTitle = ""; }

            children.push({ type: "p", text: `Title: ${videoTitle}` });
            children.push({ type: "p", text: description.length > 150 ? `Description: ${description.substring(0,150)}...` : `Description: ${description}` });
            children.push({ type: "p", text: `File Name: ${title}` });
            children.push({ type: "p", text: `Size: ${calculator.formatBytes(size)}` });
        }else{
            var views = $(target).attr('data-views');
            var likes = $(target).attr('data-likes');

            children.push({ type: "p", text: `File Name: ${title}` });
            children.push({
                type: "span",
                text: likes,
                children: [
                    {
                        type: "i",
                        classes: [ "fas", "fa-thumbs-up" ],
                        prepend: true
                    }
                ]
            });

            children.push({
                type: "span",
                text: views,
                children: [
                    {
                        type: "i",
                        classes: [ "fas", "fa-eye" ],
                        prepend: true
                    }
                ]
            });
        }

        var div = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "mediaInfo" ],
            id: `${target.id}-meta`,
            style: {
                left: `${e.clientX}px`,
                top: `${(e.clientY + window.scrollY)}px`
            },
            listeners: {
                mouseover: function(){
                    this.remove();
                }
            },
            children
        });
    }

    hideVideoInfo(target){
        var div = document.getElementById(target.id+'-meta').remove();
    }

    changeVideo(e,videoId,el){
        if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video-overlay'){
            var element = document.getElementById(document.getElementsByClassName('selected')[0].id+'videoPlayer');
            var videoId = $(e.target).attr('data-video-id');
            var thumbnail = $(e.target).attr('data-video-thumbnail');
            element.src = 'https://www.youtube.com/embed/'+videoId+'?enablejsapi=1&widgetid=1&controls=0&disablekb=1&fs=0';
            element.setAttribute('data-thumbnail',thumbnail);
        }else{
            if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video'){
                document.getElementsByClassName('selected')[0].src = '';
            }
        }

    }
}
