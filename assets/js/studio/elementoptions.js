class ElementOptions{
    constructor(){}

    editElement(e){
        var input = document.createElement('textarea');
        input.className = 'editField';
        input.style.resize = 'none';

        var element = document.getElementsByClassName('selected')[0];
        input.style.position = 'absolute';
        input.style.left = '50%';
        input.style.top = '50%';
        input.style.transform = 'translate(-50%,-50%)';
        input.style.fontSize = element.style.fontSize;
        input.style.fontFamily = element.style.fontFamily;
        input.value = element.value || element.innerText;

        //input.style.left = element.style.left;
        //input.style.top = element.style.top;
        input.style.width = '100%';
        input.style.maxHeight = 'unset';
        input.style.maxWidth = 'unset';
        input.style.minHeight = element.style.minHeight;
        //input.style.minWidth = element.style.minWidth;
        //input.style.transform = element.style.transform;
        input.style.height = '100%';
        input.style.paddingTop = element.style.paddingTop;
        input.style.paddingRight = element.style.paddingRight;
        input.style.paddingLeft = element.style.paddingLeft;
        input.style.paddingBottom = element.style.paddingBottom;

        element.appendChild(input);
        //element.innerText = '';

        input.addEventListener('contextmenu',function(e){
            newelement.innerText = this.value;
            this.remove();
        });
    }

    showControls(e){
        //var element = document.getElementById(document.getElementsByClassName('selected')[0].id+'videoPlayer');
        var element = document.getElementsByClassName('selected')[0];

        if($(element).attr('data-e-type') == 'video'){
            if($(element).attr('controls')){
                element.removeAttribute('controls');
                e.target.className = 'fas fa-toggle-off';
            }else{
                element.setAttribute('controls','');
                e.target.className = 'fas fa-toggle-on';
            }
        }

    }

    switchImageShape(e){

        var element = document.getElementsByClassName('selected')[0];
        var imgs = element.getElementsByTagName('img');
        var changeTo = '';

        if(e.target.classList.contains('fa-circle')){
            changeTo = 'circle';
        }else{
            if(e.target.classList.contains('fa-square')){
                changeTo = 'square';
            }
        }

        for(var i=0; i<imgs.length; i++){
            if(changeTo == 'circle'){
                imgs[i].style.borderRadius = '50%';
            }else{
                if(changeTo == 'square'){
                    imgs[i].style.borderRadius = '0%';
                }
            }
        }

        if(changeTo == 'circle'){
            e.target.className = 'fas fa-square';
        }else{
            if(changeTo == 'square'){
                e.target.className = 'fas fa-circle';
            }
        }

    }

    switchThumbnailsPosition(e){

        var element = document.getElementsByClassName('selected')[0];
        var image_view = element.getElementsByClassName('image-view')[0];
        var thumbnailContainer = element.getElementsByClassName('image-viewer-thumbnails')[0];
        var thumbnails = thumbnailContainer.getElementsByTagName('img');
        var changeTo = '';

        if(e.target.classList.contains('fa-arrow-left')){
            changeTo = 'left';
        }else{
            if(e.target.classList.contains('fa-arrow-right')){
                changeTo = 'right';
            }
        }

        if(changeTo == 'left'){
            thumbnailContainer.style.right = 'unset';
            thumbnailContainer.style.left = '0';
            image_view.style.left = 'unset';
            image_view.style.right = '0';
        }else{
            if(changeTo == 'right'){
                thumbnailContainer.style.right = '0';
                thumbnailContainer.style.left = 'unset';
                image_view.style.left = '0';
                image_view.style.right = 'unset';
            }
        }

        if(changeTo == 'left'){
            e.target.className = 'fas fa-arrow-right';
        }else{
            if(changeTo == 'right'){
                e.target.className = 'fas fa-arrow-left';
            }
        }

    }

    toggleFullScreeOption(event){

        var element = document.getElementsByClassName('selected')[0];
        var image_view = element.getElementsByClassName('image-view')[0];
        var viewer_image = image_view.getElementsByTagName('img')[0];

        if(event.target.classList.contains('fa-toggle-on')){
            var fullscreenbutton = image_view.getElementsByClassName('fa-expand')[0];
            if(fullscreenbutton){
                fullscreenbutton.remove();
            }

            event.target.className = 'fas fa-toggle-off';
            event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Full Screen Option';
        }else{
            if(event.target.classList.contains('fa-toggle-off')){
                var fullscreenbutton = document.createElement('i');
                fullscreenbutton.className = 'fas fa-expand';
                fullscreenbutton.addEventListener("click",function(e){
                    $(".selectedSpecialOptions").css({'display':'none'});
                    publicEvents.enlargeImage(e,viewer_image.src);
                });

                image_view.appendChild(fullscreenbutton);
                event.target.className = 'fas fa-toggle-on';
                event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Full Screen Option';
            }
        }

    }

    toggleCheckboxAndToggleSwitchText(event){
        var element = document.getElementsByClassName('selected')[0];
        var text = element.getElementsByTagName('p')[0];
        var elementType = element.getAttribute("data-e-type");
        var span = null;

        if(elementType.includes("checkbox")){
            //var input = element.getElementsByTagName('input')[0];
            span = element.getElementsByTagName('span')[0];
        }else{
            if(elementType.includes("toggle-switch")){
                var label = element.getElementsByTagName('label')[0];
            }
        }

        if(event.target.classList.contains('fa-toggle-on')){

            if(text){
                text.remove();

                if(elementType.includes("checkbox")){
                    span.style.marginRight = "5px";
                    //input.style.marginRight = "5px";
                }else{
                    if(elementType.includes("toggle-switch")){
                        label.style.marginRight = "10px";
                    }
                }
            }

            event.target.className = 'fas fa-toggle-off';
            event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Text';
        }else{
            if(event.target.classList.contains('fa-toggle-off')){
                var p = document.createElement("p");
                p.setAttribute("data-restrictions","selection");

                if(elementType.includes("checkbox")){
                    p.innerText = "Checkbox";

                    span.style.marginRight = "10px";
                    //input.style.marginRight = "10px";
                }else{
                    if(elementType.includes("toggle-switch")){
                        p.innerText = "Toggle Switch";

                        label.style.marginRight = "0px";
                    }
                }

                element.appendChild(p);

                event.target.className = 'fas fa-toggle-on';
                event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Text';
            }
        }

    }



    toggleVideoPlayer2FullScreenOption(event){
        var element = document.getElementsByClassName('selected')[0];
        var elementType = element.getAttribute("data-e-type");

        var expandOption = element.getElementsByClassName("video-controls")[0].getElementsByTagName("i")[2];

        if(elementType.includes("video-player-two")){
            if(event.target.classList.contains('fa-toggle-on')){
                expandOption.style.display = "none";
            }else{
                if(event.target.classList.contains('fa-toggle-off')){
                    expandOption.style.display = "inline-block";
                }
            }
        }

        if(event.target.classList.contains("fa-toggle-on")){
            event.target.className = 'fas fa-toggle-off';
            event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Full Screen Option';
        }else{
            if(event.target.classList.contains("fa-toggle-off")){
                event.target.className = 'fas fa-toggle-on';
                event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Full Screen Option';
            }
        }
    }

    toggleVideoPlayerInfo(event){
        var element = document.getElementsByClassName('selected')[0];
        var elementType = element.getAttribute("data-e-type");

        var videoinfo = element.getElementsByClassName("video-info")[0];
        var videoinfoIcon = element.getElementsByClassName("video-controls")[0].getElementsByClassName("fas fa-info-circle")[0];

        if(elementType.includes("video-player-one") || elementType.includes("video-player-two")){
            if(event.target.classList.contains('fa-toggle-on')){
                videoinfo.style.display = "none";
                videoinfoIcon.style.display = "none";

                if(elementType.includes("video-player-one")){
                    element.getElementsByClassName("video-controls")[0].getElementsByTagName("span")[0].style.paddingRight = "20px";
                }
            }else{
                if(event.target.classList.contains('fa-toggle-off')){
                    videoinfo.style.display = "inline-block";
                    videoinfoIcon.style.display = "inline-block";

                    if(elementType.includes("video-player-one")){
                        element.getElementsByClassName("video-controls")[0].getElementsByTagName("span")[0].style.paddingRight = "0px";
                    }
                }
            }
        }

        if(event.target.classList.contains("fa-toggle-on")){
            event.target.className = 'fas fa-toggle-off';
            event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Video Information';
        }else{
            if(event.target.classList.contains("fa-toggle-off")){
                event.target.className = 'fas fa-toggle-on';
                event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Video Information';
            }
        }
    }

    switchVideoPlaylistListLocation(event){
        var element = document.getElementsByClassName('selected')[0];
        var elementType = element.getAttribute("data-e-type");

        var player = element.getElementsByClassName("playlist-player")[0];
        var list = element.getElementsByClassName("playlist-list")[0];

        if(elementType.includes("video-playlist-one")){
            if(element.getAttribute("data-list-loc") == 0){ // right
                player.style.left = "unset";
                player.style.right = 0;
                list.style.left = 0;
                list.style.right = "unset";

                element.setAttribute("data-list-loc",1);
            }else{
                if(element.getAttribute("data-list-loc") == 1){ // left
                    player.style.left = 0;
                    player.style.right = "unset";
                    list.style.left = "unset";
                    list.style.right = 0;

                    element.setAttribute("data-list-loc",0);
                }
            }
        }
    }

    switchImgViewer1InfoStyle(event){
        var element = document.getElementsByClassName('selected')[0];
        var elementType = element.getAttribute("data-e-type");

        var video = element.getElementsByTagName("video")[0];
        var infoDiv = element.getElementsByClassName("video-info")[0];
        var infoIcon = element.getElementsByClassName("fas fa-info-circle")[0];
        var time = element.getElementsByClassName("video-controls")[0].getElementsByTagName("span")[0];
        var buffer = element.getElementsByClassName("buffer-icon")[0];
        var thumb = element.getElementsByClassName("video-player-thumb")[0];

        if(elementType.includes("video-player-one")){
            if(element.getAttribute("data-info-style") == 0){
                video.classList.add("half-height");
                buffer.classList.add("half-height");
                thumb.classList.add("half-height");

                infoDiv.classList.add("bottom-info");
                infoIcon.style.display = "none";
                time.style.paddingRight = "20px";
                element.style.height = "600px";

                element.setAttribute("data-info-style",1);
            }else{
                if(element.getAttribute("data-info-style") == 1){
                    video.classList.remove("half-height");
                    buffer.classList.remove("half-height");
                    thumb.classList.remove("half-height");

                    infoDiv.classList.remove("bottom-info");
                    infoIcon.style.display = "inline-block";
                    time.style.paddingRight = "0px";
                    element.style.height = "300px";

                    element.setAttribute("data-info-style",0);
                }
            }
        }
    }

    toggleVideoPlayer1FullScreenOption(event){
        var element = document.getElementsByClassName('selected')[0];
        var elementType = element.getAttribute("data-e-type");

        var expand = element.getElementsByClassName("expand")[0];

        if(elementType.includes("video-player-one")){
            if(event.target.classList.contains('fa-toggle-on')){
                expand.style.display = "none";
            }else{
                if(event.target.classList.contains('fa-toggle-off')){
                    expand.style.display = "flex";
                }
            }
        }

        if(event.target.classList.contains("fa-toggle-on")){
            event.target.className = 'fas fa-toggle-off';
            event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Full Screen Option';
        }else{
            if(event.target.classList.contains("fa-toggle-off")){
                event.target.className = 'fas fa-toggle-on';
                event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Full Screen Option';
            }
        }
    }

    toggleVideoPlayer2NightModeOption(event){
        var element = document.getElementsByClassName('selected')[0];
        var elementType = element.getAttribute("data-e-type");

        var nightmodeoption = element.getElementsByClassName("video-controls")[0].getElementsByClassName("fa-moon")[0];

        if(elementType.includes("video-player-two")){
            if(event.target.classList.contains('fa-toggle-on')){
                nightmodeoption.style.display = "none";
            }else{
                if(event.target.classList.contains('fa-toggle-off')){
                    nightmodeoption.style.display = "inline-block";
                }
            }
        }

        if(event.target.classList.contains("fa-toggle-on")){
            event.target.className = 'fas fa-toggle-off';
            event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Night Mode Option';
        }else{
            if(event.target.classList.contains("fa-toggle-off")){
                event.target.className = 'fas fa-toggle-on';
                event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Night Mode Option';
            }
        }
    }

    toggleVideoPlayer2FrwdBwdOption(event){
        var element = document.getElementsByClassName('selected')[0];
        var elementType = element.getAttribute("data-e-type");

        var forward = element.getElementsByClassName("video-controls")[0].getElementsByClassName("fas fa-step-forward")[0];
        var backward = element.getElementsByClassName("video-controls")[0].getElementsByClassName("fas fa-step-backward")[0];

        if(elementType.includes("video-player-two")){
            if(event.target.classList.contains('fa-toggle-on')){
                forward.style.display = "none";
                backward.style.display = "none";
            }else{
                if(event.target.classList.contains('fa-toggle-off')){
                    forward.style.display = "inline-block";
                    backward.style.display = "inline-block";
                }
            }
        }

        if(event.target.classList.contains("fa-toggle-on")){
            event.target.className = 'fas fa-toggle-off';
            event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Forward-Backward Option';
        }else{
            if(event.target.classList.contains("fa-toggle-off")){
                event.target.className = 'fas fa-toggle-on';
                event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Forward-Backward Option';
            }
        }
    }

    toggleMultiCheckboxText(event){
        var element = document.getElementsByClassName('selected')[0];
        var elementType = element.getAttribute("data-e-type");

        if(elementType.includes("checkbox-multi")){
            var allCheckboxes = element.getElementsByClassName("checkbox");
            console.log(allCheckboxes);

            for(var i=0; i<allCheckboxes.length; i++){
                var currentCheckbox = allCheckboxes[i];
                console.log(currentCheckbox);

                var span = currentCheckbox.getElementsByTagName('span')[0];
                var text = currentCheckbox.getElementsByTagName('p')[0];

                if(event.target.classList.contains('fa-toggle-on')){
                    text.style.display = "none";
                    span.style.marginRight = "5px";
                }else{
                    if(event.target.classList.contains('fa-toggle-off')){
                        text.style.display = "inline-block";
                        span.style.marginRight = "10px";
                    }
                }

            }

            if(event.target.classList.contains("fa-toggle-on")){
                event.target.className = 'fas fa-toggle-off';
                event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Checkbox Text';
            }else{
                if(event.target.classList.contains("fa-toggle-off")){
                    event.target.className = 'fas fa-toggle-on';
                    event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Checkbox Text';
                }
            }

        }

    }

    toggleTextboxBorder(event){
        var element = document.getElementsByClassName('selected')[0];

        if(element.getAttribute("data-e-type").includes("textbox")){
            if(event.target.classList.contains('fa-toggle-on')){
                element.style.border = "none";

                event.target.className = 'fas fa-toggle-off';
                event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Border';
            }else{
                if(event.target.classList.contains('fa-toggle-off')){
                    element.style.border = "1px solid black";

                    event.target.className = 'fas fa-toggle-on';
                    event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Border';
                }
            }
        }

    }

    toggleTextboxIcon(event){
        var element = document.getElementsByClassName('selected')[0];

        if(element.getAttribute("data-e-type").includes("textbox")){
            if(event.target.classList.contains('fa-toggle-on')){

                var iconwrapper = element.getElementsByClassName("icon-wrapper");
                if(iconwrapper[0]){
                    iconwrapper[0].getElementsByTagName("i")[0].style.display = "none";
                }

                var input = element.getElementsByTagName("input");
                if(input[0]){
                    var lengthTextState = element.getAttribute("data-length-text-state");

                    if(lengthTextState == 0){
                        input[0].style.paddingLeft = "10px";
                        input[0].style.width = "92%";
                    }else{
                        if(lengthTextState == 1){
                            input[0].style.paddingLeft = "10px";
                            input[0].style.width = "75%";
                        }
                    }
                }

                element.setAttribute("data-i-state","0"); // disabled

                event.target.className = 'fas fa-toggle-off';
                event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Icon';
            }else{
                if(event.target.classList.contains('fa-toggle-off')){

                    var iconwrapper = element.getElementsByClassName("icon-wrapper");
                    if(iconwrapper[0]){
                        iconwrapper[0].getElementsByTagName("i")[0].style.display = "block";
                    }

                    var input = element.getElementsByTagName("input");
                    if(input[0]){
                        var lengthTextState = element.getAttribute("data-length-text-state");

                        if(lengthTextState == 0){
                            input[0].style.paddingLeft = "unset";
                            input[0].style.width = "85%";
                        }else{
                            if(lengthTextState == 1){
                                input[0].style.paddingLeft = "unset";
                                input[0].style.width = "70%";
                            }
                        }

                    }

                    element.setAttribute("data-i-state","1"); // enabled

                    event.target.className = 'fas fa-toggle-on';
                    event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Icon';
                }
            }
        }
    }

    toggleTextboxCharacterLimitText(event){
        var element = document.getElementsByClassName('selected')[0];

        if(element.getAttribute("data-e-type").includes("textbox")){
            if(event.target.classList.contains('fa-toggle-on')){

                element.getElementsByClassName("inputLength")[0].style.display = "none";
                element.setAttribute("data-length-text-state",0);

                var input = element.getElementsByTagName("input");
                if(input[0]){
                    var iconState = element.getAttribute("data-i-state");

                    if(iconState == 0){
                        //input[0].style.paddingLeft = "10px";
                        input[0].style.width = "92%";
                    }else{
                        if(iconState == 1){
                            //input[0].style.paddingLeft = "unset";
                            input[0].style.width = "85%";
                        }
                    }

                }

                event.target.className = 'fas fa-toggle-off';
                event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Enable Character Limit Text';
            }else{
                if(event.target.classList.contains('fa-toggle-off')){

                    element.getElementsByClassName("inputLength")[0].style.display = "inline-block";
                    element.setAttribute("data-length-text-state",1);

                    var input = element.getElementsByTagName("input");
                    if(input[0]){
                        var iconState = element.getAttribute("data-i-state");

                        if(iconState == 0){
                            //input[0].style.paddingLeft = "10px";
                            input[0].style.width = "80%";
                        }else{
                            if(iconState == 1){
                                //input[0].style.paddingLeft = "unset";
                                input[0].style.width = "70%";
                            }
                        }

                    }

                    event.target.className = 'fas fa-toggle-on';
                    event.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0].innerText = 'Disable Character Limit Text';
                }
            }
        }

    }

    optionClicked(e){
        var target = e.target;
        var tooltip = e.target.parentElement.getElementsByClassName('wpb_e_special_option_tooltip')[0];
        var tooltipText = tooltip.innerText;
        var targetDiv = e.target.parentElement;

        var showTick = 0;
        var newClass = '';
        var newTooltipText = '';

        if(tooltipText == 'Resize'){
            showTick = 1;
            newTooltipText = 'Finish Resizing';
        }else{
            if(tooltipText == 'Finish Resizing'){
                showTick = 0;
                newTooltipText = 'Resize';
                newClass = 'fas fa-arrows-alt';
            }else{
                if(tooltipText == 'Full Width'){
                    showTick = 0;
                    newTooltipText = 'Full Width';
                    newClass = 'fas fa-arrows-alt-h';
                }else{
                    if(tooltipText == 'Full Height'){
                        showTick = 0;
                        newTooltipText = 'Full Height';
                        newClass = 'fas fa-arrows-alt-v';
                    }
                }
            }
        }

        if(tooltipText == 'Resize'){
            resizeable.enable(e);
        }else{
            if(tooltipText == 'Finish Resizing'){
                resizeable.disable();
            }else{
                if(tooltipText == 'Full Width'){
                    $('.selected').css({'width':'100%','left':'0px','right':'unset'});
                    relocateSpecialOptions();
                    relocateElementResizer();
                }else{
                    if(tooltipText == 'Full Height'){
                        $('.selected').css({'height':'100%','top':'0px','bottom':'unset'});
                        relocateSpecialOptions();
                        relocateElementResizer();
                    }
                }
            }
        }

        if(showTick == 1){
            target.className = 'fas fa-check';
            targetDiv.style.background = '#3d3d3d';
            target.style.color = 'rgb(0, 183, 0)';
            $('.wpb_e_special_option').not(targetDiv).css({'opacity':'0.4', 'pointer-events':'none'});
        }else{
            target.className = newClass;
            targetDiv.style.background = '#e67300';
            target.style.color = 'white';
            $('.wpb_e_special_option').not(targetDiv).css({'opacity':'1', 'pointer-events':'unset'});
        }

        tooltip.innerText = newTooltipText;

    }

    switchImgViewer2Location(){
        var element = document.getElementsByClassName("selected")[0];

        var thumbnails = element.getElementsByClassName("image-viewer-thumbnails")[0];
        var viewer = element.getElementsByClassName("image-view")[0];
        var toggleButton = element.getElementsByClassName("image-viewer-visibility-toggle")[0];

        if(element.getAttribute('data-e-type') == "image-viewer-two"){
            var location = Number(element.getAttribute("data-loc"));

            if(location == 1){
                element.style.left = "0";
                element.style.right = "unset";

                thumbnails.style.right = '0';
                thumbnails.style.left = 'unset';

                viewer.style.left = '0';
                viewer.style.right = 'unset';

                toggleButton.style.left = "unset";
                toggleButton.style.right = "-50px";

                toggleButton.style.borderTopLeftRadius = "0px";
                toggleButton.style.borderBottomLeftRadius = "0px";
                toggleButton.style.borderTopRightRadius = "5px";
                toggleButton.style.borderBottomRightRadius = "5px";

                element.setAttribute("data-loc",2);
            }else{
                if(location == 2){
                    element.style.left = "unset";
                    element.style.right = "0";

                    thumbnails.style.right = 'unset';
                    thumbnails.style.left = '0';

                    viewer.style.left = 'unset';
                    viewer.style.right = '0';

                    toggleButton.style.left = "-50px";
                    toggleButton.style.right = "unset";

                    toggleButton.style.borderTopLeftRadius = "5px";
                    toggleButton.style.borderBottomLeftRadius = "5px";
                    toggleButton.style.borderTopRightRadius = "0px";
                    toggleButton.style.borderBottomRightRadius = "0px";

                    element.setAttribute("data-loc",1);
                }
            }
        }
    }

    switchImgViewer2BtnLocation(){
        var element = document.getElementsByClassName("selected")[0];
        var toggleButton = element.getElementsByClassName("image-viewer-visibility-toggle")[0];

        if(element.getAttribute('data-e-type') == "image-viewer-two"){
            var location = Number(toggleButton.getAttribute("data-loc"));

            if(location == 1){
                // shift to bottom
                toggleButton.style.top = "unset";
                toggleButton.style.bottom = "70px";

                toggleButton.setAttribute("data-loc",2);
            }else{
                if(location == 2){
                    // shift to top
                    toggleButton.style.top = "70px";
                    toggleButton.style.bottom = "unset";

                    toggleButton.setAttribute("data-loc",1);
                }
            }
        }
    }

    switchCheckboxShape(){
        var element = document.getElementsByClassName("selected")[0];

        if(element.getAttribute("data-e-type").includes("checkbox")){
            var span = element.getElementsByTagName("span")[0];

            var radius = span.style.borderRadius;
            var newRadius = "";

            if(radius == "0px" || radius == null || radius == ""){
                newRadius = "3px";
            }else{
                if(radius == "3px"){
                    newRadius = "50%";
                }else{
                    if(radius == "50%"){
                        newRadius = "0px";
                    }
                }
            }

            span.style.borderRadius = newRadius;
        }
    }

    switchMultiCheckboxShape(){
        var element = document.getElementsByClassName("selected")[0];

        if(element.getAttribute("data-e-type").includes("checkbox-multi")){

            var allCheckboxes = element.getElementsByClassName("checkbox");

            for(var i=0; i<allCheckboxes.length; i++){
                var span = allCheckboxes[i].getElementsByTagName("span")[0];

                var radius = span.style.borderRadius;
                var newRadius = "";

                if(radius == "0px" || radius == null || radius == ""){
                    newRadius = "3px";
                }else{
                    if(radius == "3px"){
                        newRadius = "50%";
                    }else{
                        if(radius == "50%"){
                            newRadius = "0px";
                        }
                    }
                }

                span.style.borderRadius = newRadius;
            }

        }
    }

    switchMultiCheckboxCheckMarkShape(){
        var element = document.getElementsByClassName("selected")[0];
        if(element.getAttribute("data-e-type").includes("checkbox-multi")){
            var allCheckboxes = element.getElementsByClassName("checkbox");

            for(var i=0; i<allCheckboxes.length; i++){
                var checkmark = allCheckboxes[i].getElementsByClassName("checkmark")[0];

                var currentShape = element.getAttribute("data-checkmark-shape");
                var newShape = "";

                if(currentShape == "square"){
                    newShape = "tick";
                }else{
                    if(currentShape == "tick"){
                        newShape = "circle";
                    }else{
                        if(currentShape == "circle"){
                            newShape = "square";
                        }
                    }
                }

                if(i == 0){ // enabled top option on shape change
                    if(newShape == "tick"){
                        checkmark.className = "checkmark tick-checkmark-enabled";
                    }else{
                        if(newShape == "circle"){
                            checkmark.className = "checkmark circle-checkmark circle-checkmark-enabled";
                        }else{
                            if(newShape == "square"){
                                checkmark.className = "checkmark square-checkmark square-checkmark-enabled";
                            }
                        }
                    }
                }else{
                    if(newShape == "tick"){
                        checkmark.className = "checkmark tick-checkmark-disabled";
                    }else{
                        if(newShape == "circle"){
                            checkmark.className = "checkmark circle-checkmark circle-checkmark-disabled";
                        }else{
                            if(newShape == "square"){
                                checkmark.className = "checkmark square-checkmark square-checkmark-disabled";
                            }
                        }
                    }
                }

            }

            var Shape = element.getAttribute("data-checkmark-shape");

            if(Shape == "square"){
                element.setAttribute("data-checkmark-shape","tick");
            }else{
                if(Shape == "tick"){
                    element.setAttribute("data-checkmark-shape","circle");
                }else{
                    if(Shape == "circle"){
                        element.setAttribute("data-checkmark-shape","square");
                    }
                }
            }

            element.setAttribute("data-checkmark-shape",newShape);
        }
    }

    switchTextbox2TextLocation(){
        var element = document.getElementsByClassName("selected")[0];

        if(element.getAttribute("data-e-type") == "textbox-two"){
            var label = element.getElementsByTagName("label")[0];

            if(label){
                if(element.getAttribute("data-label-pos") == "0"){
                    label.style.left = "unset";
                    label.style.right = "5%";

                    element.setAttribute("data-label-pos","1");
                }else{
                    if(element.getAttribute("data-label-pos") == "1"){
                        label.style.left = "5%";
                        label.style.right = "unset";

                        element.setAttribute("data-label-pos","0");
                    }
                }
            }
        }
    }

}
