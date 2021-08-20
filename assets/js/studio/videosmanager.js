class VideosManager{
    constructor(){}

    load(){
    }

    empty(){

    }

    open(e,forElement){
        const self = Globals.pageHandler.VideoManager;

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

        var videoManager = document.createElement('div');
        videoManager.className = 'videoManager';
        videoManager.addEventListener('mousedown',function(e){
            self.mousedown(e);
        });

        var videosbox = document.createElement('div');
        videosbox.className = 'mediaManager_box';
        videosbox.id = 'videoManager-videos-box';

        var fileinput = document.createElement('input');
        fileinput.type = 'file';
        fileinput.accept = 'video/mp4,video/x-m4v,video/*';
        fileinput.style.display = 'none';
        fileinput.style.opacity = 0;
        fileinput.style.width = '0px';
        fileinput.style.height = '0px';
        fileinput.addEventListener('change',function(){
            Globals.pageHandler.mediaManager.uploadMedia('Video',this.files[0]);
        });

        var uploadBtn = document.createElement('button');
        uploadBtn.innerText = 'Upload Video (50MB Max Size)';
        uploadBtn.addEventListener('click',function(){
            fileinput.click();
        });

        var panelbar = document.createElement('div');
        panelbar.className = 'videoManager_panelbar';

        var youtube_panelbutton = document.createElement('img');
        var dailymotion_panelbutton = document.createElement('img');
        var vimeo_panelbutton = document.createElement('img');
        youtube_panelbutton.src = '../assets/images/youtubelogo.png';
        //dailymotion_panelbutton.src = '../assets/images/dailymotionlogo.png';
        //vimeo_panelbutton.src = '../assets/images/vimeologo.png';

        //panelbar.appendChild(dailymotion_panelbutton);
        //panelbar.appendChild(vimeo_panelbutton);

        var searchInput = document.createElement('input');
        searchInput.type = 'text';
        searchInput.placeholder = 'Enter keyword and press enter to search...';

        var banner = document.createElement('div');
        banner.className = 'banner';

        var banner_p = document.createElement('p');
        banner_p.innerText = 'Video Manager';

        banner.appendChild(banner_p);

        videoManager.appendChild(banner);
        videoManager.appendChild(videosbox);
        videoManager.appendChild(panelbar);
        Globals.window.body.appendChild(videoManager);

        if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video' || $(document.getElementsByClassName('selected')[0]).attr('data-e-type').includes('video-player') || $(document.getElementsByClassName('selected')[0]).attr('data-e-type').includes('video-playlist')){
            Globals.pageHandler.mediaManager.showUserVideos(forElement);
            Globals.window.body.appendChild(storageSpace);

            banner.appendChild(searchInput);

            panelbar.appendChild(uploadBtn);
            panelbar.appendChild(fileinput);

            searchInput.addEventListener('keydown',function(e){
                if(e.keyCode == 13){
                    Globals.pageHandler.mediaManager.searchUserMedia("videos",this.value);
                }
            });
        }else{
            if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video-overlay'){
                panelbar.appendChild(youtube_panelbutton);
                banner.appendChild(searchInput);

                searchInput.addEventListener('keydown',function(e){
                    if(e.keyCode == 13){
                        searchYoutubeVideos(this.value);
                    }
                });
            }
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

        if(title == "null" || title == null){
            title = "";
        }

        var div = document.createElement('div');
        div.className = 'mediaInfo';
        div.id = target.id+'-meta';

        div.addEventListener('mouseover',function(){
            this.remove();
        });

        var p = document.createElement('p');
        p.innerText = title;

        if(target.src.includes('localhost')){
            var size = $(target).attr('data-size');
            var description = $(target).attr('data-video-des');
            var videoTitle = $(target).attr('data-video-title');

            if(description == "null" || description == null){
                description = "";
            }

            if(videoTitle == "null" || videoTitle == null){
                videoTitle = "";
            }

            p.innerText = "File Name: "+title;

            var p2 = document.createElement('p');
            p2.innerText = 'Title: '+videoTitle;

            var p3 = document.createElement('p');

            if(description.length > 150){
                p3.innerText = 'Description: '+description.substring(0,150)+"...";
            }else{
                p3.innerText = 'Description: '+description;
            }

            var p4 = document.createElement('p');
            p4.innerText = 'Size: '+calculator.formatBytes(size);

            div.appendChild(p2);
            div.appendChild(p3);
            div.appendChild(p);
            div.appendChild(p4);
        }else{
            var views = $(target).attr('data-views');
            var likes = $(target).attr('data-likes');

            var likes_span = document.createElement('span');
            likes_span.innerHTML = '<i class="fas fa-thumbs-up"></i>'+likes;

            var views_span = document.createElement('span');
            views_span.innerHTML = '<i class="fas fa-eye"></i>'+views;

            div.appendChild(p);

            div.appendChild(likes_span);
            div.appendChild(views_span);
        }

        div.style.left = e.clientX + 'px';
        div.style.top = (e.clientY + window.scrollY) + 'px';

        //document.getElementsByClassName('mediaManager_box')[0].appendChild(div);
        Globals.window.body.appendChild(div);
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
