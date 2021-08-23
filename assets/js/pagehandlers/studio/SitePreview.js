class SitePreview{
    constructor(){
        this.resizeSite_startY = 0;
        this.resizeSite_startHeight = 0;
    }

    resize(e){
        const self = Globals.pageHandler.site;
        var site = document.getElementsByClassName('previewsite')[0];
        self.resizeSite_startY = e.clientY;
        self.resizeSite_startHeight = parseInt(document.defaultView.getComputedStyle(site).height, 10);
        document.documentElement.addEventListener('mousemove', this.resizeDrag, false);
        document.documentElement.addEventListener('mouseup', this.stopResizeDrag, false);
    }

    resizeDrag(e){
        const self = Globals.pageHandler.site;
        var resizable = document.getElementsByClassName('previewsite')[0];
        if((self.resizeSite_startHeight + e.clientY - self.resizeSite_startY) < 800){
            return false;
        }else{
            resizable.style.height = (self.resizeSite_startHeight + e.clientY - self.resizeSite_startY) + 'px';
        }
    }

    stopResizeDrag(){
        document.documentElement.removeEventListener('mousemove', this.resizeDrag, false);
        document.documentElement.removeEventListener('mouseup', this.stopResizeDrag, false);
    }

    elementClicked(e){
        const self = Globals.pageHandler.site;
        if(document.getElementsByClassName('miniStyler')[0] || document.getElementById('element-manager') || document.getElementsByClassName('fontManager')[0] || document.getElementById('bg-image-manager') || document.getElementsByClassName('elementEditor')[0] || document.getElementsByClassName('videoManager')[0] || document.getElementsByTagName('styles')[0]){

        }else{
            if(e.target.tagName == 'IMG' && e.target.parentElement.className !== 'previewsite' &&$(e.target.parentElement).attr('data-e-type').includes('viewer')){

            }else{
                if(e.target.className == 'fas fa-expand' && e.target.tagName == 'I' && e.target.parentElement.className.includes('view')){

                }else{
                    self.selectElement(e.target);
                }
            }
        }
    }

    selectElement(element){
        const self = this;

        if(Globals.pageHandler.draggable.HoldTimer){
            clearTimeout(Globals.pageHandler.draggable.HoldTimer);
        }

        if(element.getAttribute("data-restrictions") == "selection"){
            return false;
        }

        if(element.classList.contains('selected')){
            Globals.pageHandler.draggable.closeDrag();

            $('.selected').removeClass('selected');
            document.getElementsByClassName('wpb_tool_se')[0].style.pointerEvents = 'none';
            document.getElementsByClassName('wpb_tool_se')[0].style.opacity = '0.4';
            document.getElementsByClassName('wpb_tool_re')[0].style.pointerEvents = 'none';
            document.getElementsByClassName('wpb_tool_re')[0].style.opacity = '0.4';
            document.getElementsByClassName('wpb_tool_cf')[0].style.pointerEvents = 'none';
            document.getElementsByClassName('wpb_tool_cf')[0].style.opacity = '0.4';
            document.getElementsByClassName('wpb_tool_bgi')[0].style.pointerEvents = 'none';
            document.getElementsByClassName('wpb_tool_bgi')[0].style.opacity = '0.4';
            document.getElementsByClassName('wpb_tool_vmi')[0].style.pointerEvents = 'none';
            document.getElementsByClassName('wpb_tool_vmi')[0].style.opacity = '0.4';
            document.getElementsByClassName('wpb_tool_de')[0].style.pointerEvents = 'none';
            document.getElementsByClassName('wpb_tool_de')[0].style.opacity = '0.4';

            if(typeof $(element).attr('data-restrictions') !== typeof undefined && $(element).attr('data-restrictions') !== false){
                if(!$(element).attr('data-restrictions').includes("dragging")){
                    document.removeEventListener('keydown',self.moveElement,false);
                    element.removeEventListener('mousedown',Globals.pageHandler.draggable.mousedown);
                    $('.hint_element_move, .hint_element_exit').remove();
                }
            }else{
                document.removeEventListener('keydown',self.moveElement,false);
                element.removeEventListener('mousedown',Globals.pageHandler.draggable.mousedown);
                $('.hint_element_move, .hint_element_exit').remove();
            }

            document.getElementsByClassName('elPos')[0].style.display = 'none';
            document.getElementsByClassName('pcPos')[0].style.display = 'none';

            $('.selectedSpecialOptions, .eResizer').remove();

            $(".posMatchLeft").removeClass("posMatchLeft");
            $(".posMatchRight").removeClass("posMatchRight");
            $(".posMatchTop").removeClass("posMatchTop");
            $(".posMatchBottom").removeClass("posMatchBottom");

        }else{
            $('.selected').removeClass('selected');
            $('.selectedSpecialOptions, .eResizer').remove();

            element.classList.add('selected');

            if(typeof $(element).attr('data-restrictions') !== typeof undefined && $(element).attr('data-restrictions') !== false){
                if(!$(element).attr('data-restrictions').includes("dragging")){
                    document.addEventListener('keydown',self.moveElement,false);
                    element.addEventListener('mousedown',Globals.pageHandler.draggable.mousedown);
                    $('.hint_element_move, .hint_element_exit').remove();

                    Globals.pageHandler.userInterface.displayKeyGuide();
                }
            }else{
                document.addEventListener('keydown',self.moveElement,false);
                element.addEventListener('mousedown',Globals.pageHandler.draggable.mousedown);
                $('.hint_element_move, .hint_element_exit').remove();

                Globals.pageHandler.userInterface.displayKeyGuide();
            }

            $(".posMatchLeft").removeClass("posMatchLeft");
            $(".posMatchRight").removeClass("posMatchRight");
            $(".posMatchTop").removeClass("posMatchTop");
            $(".posMatchBottom").removeClass("posMatchBottom");

            Globals.pageHandler.draggable.closeDrag();

            Globals.pageHandler.userInterface.displayElementSpecialOptions($(element).attr('data-e-type'));

            document.getElementsByClassName('wpb_tool_se')[0].style.pointerEvents = 'unset';
            document.getElementsByClassName('wpb_tool_se')[0].style.opacity = '1';
            document.getElementsByClassName('wpb_tool_re')[0].style.pointerEvents = 'unset';
            document.getElementsByClassName('wpb_tool_re')[0].style.opacity = '1';
            document.getElementsByClassName('wpb_tool_cf')[0].style.pointerEvents = 'unset';
            document.getElementsByClassName('wpb_tool_cf')[0].style.opacity = '1';
            document.getElementsByClassName('wpb_tool_bgi')[0].style.pointerEvents = 'unset';
            document.getElementsByClassName('wpb_tool_bgi')[0].style.opacity = '1';
            document.getElementsByClassName('wpb_tool_de')[0].style.pointerEvents = 'unset';
            document.getElementsByClassName('wpb_tool_de')[0].style.opacity = '1';

            if($(element).attr('data-e-type') == 'video-overlay' || $(element).attr('data-e-type') == 'video' || $(element).attr('data-e-type').includes('video-player') || $(element).attr('data-e-type').includes('video-playlist')){
                document.getElementsByClassName('wpb_tool_vmi')[0].style.pointerEvents = 'unset';
                document.getElementsByClassName('wpb_tool_vmi')[0].style.opacity = '1';
            }else{
                document.getElementsByClassName('wpb_tool_vmi')[0].style.pointerEvents = 'none';
                document.getElementsByClassName('wpb_tool_vmi')[0].style.opacity = '0.4';
            }

            /*var deleteicon = document.createElement('i');
            deleteicon.className = 'fas fa-trash';

            deleteicon.addEventListener('click',function(event){
            if(event.target == deleteicon){
            e.remove();
        }
    });

    e.appendChild(deleteicon);*/
}
}

moveElement(event){
    const self = Globals.pageHandler.site;
    if([37, 38, 39, 40, 46, 27].indexOf(event.keyCode) > -1) {
        event.preventDefault();
        document.getElementsByClassName('selected')[0].style.transform = 'unset';
    }

    var elementPosition = document.getElementsByClassName('elPos')[0];
    elementPosition.style.display = 'inline-block';
    elementPosition.style.opacity = '1';

    var element = document.getElementsByClassName('selected')[0];

    elementPosition.addEventListener('click',function(){
        this.style.display = 'none';
    });

    if(event.keyCode == 46){
        console.log("deleting");
        self.selectElement(element);
        element.remove();
        $('.selectedSpecialOptions').remove();
        $('.eResizer').remove();
        $('.hint_element_move, .hint_element_exit').remove();

        elementPosition.style.display = 'none';
        elementPosition.style.opacity = '0';

        var pageCenterPosition = document.getElementsByClassName('pcPos')[0];
        pageCenterPosition.style.display = 'none';
        pageCenterPosition.style.opacity = '0';
        console.log("deleted");
    }

    if(event.keyCode == 27){
        self.selectElement(element);
    }

    var leftvalue = document.getElementsByClassName('selected')[0].style.left;
    var topvalue = document.getElementsByClassName('selected')[0].style.top;

    if(leftvalue == null || leftvalue == '' || leftvalue == ' '){
        leftvalue = 0;
    }else{
        if(leftvalue.includes('px')){
            leftvalue = document.getElementsByClassName('selected')[0].style.left.split('px')[0];
        }else{
            leftvalue = 0;
        }
    }

    if(topvalue == null || topvalue == '' || topvalue == ' '){
        topvalue = 0;
    }else{
        if(topvalue.includes('px')){
            topvalue = document.getElementsByClassName('selected')[0].style.top.split('px')[0];
        }else{
            topvalue = 0;
        }
    }

    if(event.keyCode == 39){
        var newvalue = ++leftvalue;
        newvalue += 4;

        //if(leftvalue !== 101){
        document.getElementsByClassName('selected')[0].style.left = newvalue + 'px';
        //document.getElementsByClassName('selected')[0].style.transform = 'translate(-'+newvalue+'%,-'+topvalue+'%)';
        elementPosition.innerText = 'X: '+newvalue + 'px';
        if(document.getElementsByClassName('selectedSpecialOptions')[0]){
            //$('.selectedSpecialOptions, .eResizer').remove();
            relocateSpecialOptions();
            relocateElementResizer();
            detectBorderTouch(element);
        }
        Globals.pageHandler.draggable.calculateCenterPosition();
        Globals.pageHandler.tools.updateToolButton('toggle-gridlines');
        //}
    }

    if(event.keyCode == 37){
        var newvalue = --leftvalue;
        newvalue -= 4;

        //if(leftvalue !== -1){
        document.getElementsByClassName('selected')[0].style.left = newvalue + 'px';
        //document.getElementsByClassName('selected')[0].style.transform = 'translate(-'+newvalue+'%,-'+topvalue+'%)';
        elementPosition.innerText = 'X: '+newvalue + 'px';
        if(document.getElementsByClassName('selectedSpecialOptions')[0]){
            //$('.selectedSpecialOptions, .eResizer').remove();
            relocateSpecialOptions();
            relocateElementResizer();
            detectBorderTouch(element);
        }
        Globals.pageHandler.draggable.calculateCenterPosition();
        Globals.pageHandler.tools.updateToolButton('toggle-gridlines');
        //}
    }

    if(event.keyCode == 38){
        var newvalue = --topvalue;
        newvalue -= 4;

        //if(topvalue !== -1){
        document.getElementsByClassName('selected')[0].style.top = newvalue + 'px';
        //document.getElementsByClassName('selected')[0].style.transform = 'translate(-'+leftvalue+'%,-'+newvalue+'%)';
        elementPosition.innerText = 'Y: '+newvalue + 'px';
        if(document.getElementsByClassName('selectedSpecialOptions')[0]){
            //$('.selectedSpecialOptions, .eResizer').remove();
            relocateSpecialOptions();
            relocateElementResizer();
            detectBorderTouch(element);
        }
        Globals.pageHandler.draggable.calculateCenterPosition();
        Globals.pageHandler.tools.updateToolButton('toggle-gridlines');
        //}
    }

    if(event.keyCode == 40){
        var newvalue = ++topvalue;
        newvalue += 4;

        //if(topvalue !== 101){
        document.getElementsByClassName('selected')[0].style.top = newvalue + 'px';
        //document.getElementsByClassName('selected')[0].style.transform = 'translate(-'+leftvalue+'%,-'+newvalue+'%)';
        elementPosition.innerText = 'Y: '+newvalue + 'px';
        if(document.getElementsByClassName('selectedSpecialOptions')[0]){
            //$('.selectedSpecialOptions, .eResizer').remove();
            relocateSpecialOptions();
            relocateElementResizer();
            detectBorderTouch(element);
        }
        Globals.pageHandler.draggable.calculateCenterPosition();
        Globals.pageHandler.tools.updateToolButton('toggle-gridlines');
        //}
    }

}

updateLastElementAdded(){
    var elements = document.getElementsByClassName('previewsite')[0].children;
    var filteredelements = [];

    for(var i=0; i<elements.length; i++){
        if(elements[i].classList.contains('cguide') || elements[i].classList.contains('rguide') || elements[i].classList.contains('lguide') || elements[i].classList.contains('vcenterline') || elements[i].classList.contains('hcenterline')){

        }else{
            filteredelements.push(elements[i]);
        }
    }

    Globals.pageHandler.lastelementadded = filteredelements[filteredelements.length-1];
}


addElements(){
    const self = this;
    var newelements = document.getElementById('element-manager').getElementsByClassName('selected_element');
    var readymadeelements = document.getElementById('element-manager').getElementsByClassName('selected_element_readymade');
    var element;
    var element_readymade;

    var hcenterline = document.getElementsByClassName('hcenterline')[0];
    var vcenterline = document.getElementsByClassName('vcenterline')[0];

    for(var i=0; i<readymadeelements.length; i++){
        var elementType_readymade = readymadeelements[i].getElementsByTagName('span')[0].innerText;

        if(elementType_readymade == 'Top NavBar'){
            element_readymade = document.createElement('div');
            element_readymade.className = 'topnavbar';
            element_readymade.setAttribute('data-e-type','navbar');
            element_readymade.setAttribute("data-restrictions","dragging");

            var a_1 = document.createElement('a');
            a_1.innerText = 'Home';
            a_1.setAttribute('data-page-name','Dashboard');

            element_readymade.appendChild(a_1);
        }else{
            if(elementType_readymade == 'Image Gallery 1'){
                element_readymade = document.createElement('div');
                element_readymade.className = 'image-gallery-one';
                element_readymade.setAttribute('data-e-type','image-gallery-one');
                element_readymade.style.border = 'none';
                element_readymade.style.overflowY = 'scroll';

                for(var i=0; i<6; i++){
                    var img = document.createElement('img');
                    img.setAttribute('data-description','-');
                    img.addEventListener('mouseover',publicEvents.galleryImgDescription);
                    img.addEventListener('mouseout',publicEvents.galleryImgDescription);

                    img.setAttribute("data-restrictions","selection");
                    if(i !==3-1 && i !== 6-1){
                        img.style.marginRight = '15px';
                    }
                    element_readymade.appendChild(img);
                }
            }else{
                if(elementType_readymade == 'Image Gallery 2'){
                    element_readymade = document.createElement('div');
                    element_readymade.className = 'image-gallery-two';
                    element_readymade.setAttribute('data-e-type','image-gallery-two');
                    element_readymade.style.border = 'none';
                    element_readymade.style.overflowY = 'scroll';

                    for(var i=0; i<3; i++){
                        var img = document.createElement('img');
                        img.setAttribute('data-description','-');
                        img.addEventListener('mouseover',publicEvents.galleryImgDescription);
                        img.addEventListener('mouseout',publicEvents.galleryImgDescription);

                        img.setAttribute("data-restrictions","selection");
                        if(i !==3-1){
                            img.style.marginRight = '15px';
                        }
                        element_readymade.appendChild(img);
                    }
                }else{
                    if(elementType_readymade == 'Image Gallery 3'){
                        element_readymade = document.createElement('div');
                        element_readymade.className = 'image-gallery-three';
                        element_readymade.setAttribute('data-e-type','image-gallery-three');
                        element_readymade.style.border = 'none';
                        element_readymade.style.overflowY = 'scroll';

                        for(var i=0; i<4; i++){
                            var img = document.createElement('img');
                            img.setAttribute('data-description','-');
                            img.addEventListener('mouseover',publicEvents.galleryImgDescription);
                            img.addEventListener('mouseout',publicEvents.galleryImgDescription);

                            img.setAttribute("data-restrictions","selection");
                            if(i !==2-1 && i !== 4-1){
                                img.style.marginRight = '15px';
                            }
                            element_readymade.appendChild(img);
                        }
                    }else{
                        if(elementType_readymade == 'Image Slider 1'){
                            element_readymade = document.createElement('div');
                            element_readymade.className = 'image-slider-one';
                            element_readymade.setAttribute('data-e-type','image-slider-one');
                            element_readymade.style.border = 'none';

                            var leftbutton = document.createElement('i');
                            var rightbutton = document.createElement('i');
                            leftbutton.className = 'fas fa-arrow-left';
                            rightbutton.className = 'fas fa-arrow-right';

                            leftbutton.setAttribute("data-restrictions","selection");
                            rightbutton.setAttribute("data-restrictions","selection");

                            leftbutton.addEventListener('click',function(){
                                publicEvents.slideImgSlider1Images("left",element_readymade);
                            });

                            rightbutton.addEventListener('click',function(){
                                publicEvents.slideImgSlider1Images("right",element_readymade);
                            });

                            element_readymade.appendChild(leftbutton);

                            var lastImage;
                            var imgsrcs =
                            [

                                'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_960_720.jpg',
                                'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_960_720.jpg',
                                'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_960_720.jpg',
                                'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_960_720.jpg',
                                'https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293__340.jpg',
                                'https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293__340.jpg',
                                'https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293__340.jpg',
                                'https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293__340.jpg',
                                'https://cdn.pixabay.com/photo/2018/05/30/00/24/thunderstorm-3440450__340.jpg',
                                'https://cdn.pixabay.com/photo/2018/05/30/00/24/thunderstorm-3440450__340.jpg',
                                'https://cdn.pixabay.com/photo/2018/05/30/00/24/thunderstorm-3440450__340.jpg',
                                'https://cdn.pixabay.com/photo/2018/05/30/00/24/thunderstorm-3440450__340.jpg',

                            ];

                            var totalImgCount = 11;
                            var totalImgAdded = 0;

                            for(var z=0; z<3; z++){
                                var slide = document.createElement("div");

                                slide.setAttribute("data-restrictions","selection");

                                slide.addEventListener("click",function(){
                                    self.selectElement(element_readymade);
                                });

                                if(z == 0){
                                    slide.className = "active imgSlide";
                                }else{
                                    slide.className = "imgSlide";
                                }

                                for(var i=0; i<4; i++){
                                    var img = document.createElement('img');
                                    img.setAttribute('data-description','-');
                                    img.addEventListener('mouseover',publicEvents.galleryImgDescription);
                                    img.addEventListener('mouseout',publicEvents.galleryImgDescription);
                                    img.src = imgsrcs[totalImgAdded];

                                    if(totalImgAdded == 0 || totalImgAdded == 4 || totalImgAdded == 8 || totalImgAdded == 12){
                                        lastImage = img;
                                    }

                                    img.style.position = "absolute";
                                    img.id = "image-"+Globals.pageHandler.randomize.elementId(25);
                                    img.setAttribute("data-no",totalImgAdded);
                                    slide.appendChild(img);

                                    if(totalImgAdded == 0 || totalImgAdded == 4 || totalImgAdded == 8 || totalImgAdded == 12){
                                        img.style.left = (Number(lastImage.style.left.replace("px","")) + 30) + "px";
                                        console.log(((Number(lastImage.style.left.replace("px","")) + 30)) + "px");
                                    }else{
                                        img.style.left = (250 + Number(lastImage.style.left.replace("px","")) + 15) + "px";
                                        console.log((250 + (Number(lastImage.style.left.replace("px","")) + 15)) + "px");
                                    }

                                    lastImage = img;

                                    totalImgAdded = totalImgAdded + 1;
                                    console.log(totalImgAdded);
                                }

                                element_readymade.appendChild(slide);
                            }

                            /*for(var i=0; i<11; i++){
                            var img = document.createElement('img');
                            img.setAttribute('data-description','-');
                            img.addEventListener('mouseover',publicEvents.galleryImgDescription);
                            img.addEventListener('mouseout',publicEvents.galleryImgDescription);
                            img.src = imgsrcs[i];

                            if(i == 0 || i == 4 || i == 8 || i == 12){
                            lastImage = img;
                        }

                        img.style.position = "absolute";
                        img.id = "image-"+Globals.pageHandler.randomize.elementId(25);
                        img.setAttribute("data-no",i);
                        element_readymade.appendChild(img);

                        if(i == 0 || i == 4 || i == 8 || i == 12){
                        img.style.left = (Number(lastImage.style.left.replace("px","")) + 30) + "px";
                        console.log(((Number(lastImage.style.left.replace("px","")) + 30)) + "px");
                    }else{
                    img.style.left = (250 + Number(lastImage.style.left.replace("px","")) + 15) + "px";
                    console.log((250 + (Number(lastImage.style.left.replace("px","")) + 15)) + "px");
                }

                if(i <= 4-1){
                lastImage = img;
            }else{
            lastImage = img;
            img.style.display = "none";
        }
    }*/

    element_readymade.setAttribute("data-total","2"/*2"*/);
    element_readymade.setAttribute("data-active","0");
    //element_readymade.setAttribute("data-total-steps",Math.round(11/4));

    element_readymade.appendChild(rightbutton);

}else{
    if(elementType_readymade == 'Image Viewer 1'){
        element_readymade = document.createElement('div');
        element_readymade.className = 'image-viewer-one';
        element_readymade.setAttribute('data-e-type','image-viewer-one');

        var viewer = document.createElement('div');
        var viewer_image = document.createElement('img');
        viewer_image.src = /*'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_960_720.jpg'*/'../assets/images/icons/noimage.png';
        var thumbnails = document.createElement('div');

        var expandIcon = document.createElement('i');
        expandIcon.className = 'fas fa-expand';
        expandIcon.addEventListener("click",function(e){
            $(".selectedSpecialOptions").css({'display':'none'});
            publicEvents.enlargeImage(e,viewer_image.src);
        });

        var title = document.createElement('span');
        title.innerText = 'Title';

        viewer.appendChild(title);
        viewer.appendChild(expandIcon);

        viewer.className = 'image-view';
        thumbnails.className = 'image-viewer-thumbnails';

        thumbnails.setAttribute("data-restrictions","selection");
        viewer.setAttribute("data-restrictions","selection");
        viewer_image.setAttribute("data-restrictions","selection");
        title.setAttribute("data-restrictions","selection");
        expandIcon.setAttribute("data-restrictions","selection");

        viewer.appendChild(viewer_image);
        element_readymade.appendChild(viewer);
        element_readymade.appendChild(thumbnails);
    }else{
        if(elementType_readymade == 'Image Viewer 2'){
            element_readymade = document.createElement('div');
            element_readymade.className = 'image-viewer-two';
            element_readymade.setAttribute('data-e-type','image-viewer-two');

            element_readymade.setAttribute("data-state","1"); // 1 : Closed , 2 : Thumbnails Only , 3 : Full Opened
            element_readymade.setAttribute("data-loc","1"); // 1 : Right, 2 : Left

            element_readymade.setAttribute("data-restrictions","dragging");

            element_readymade.style.left = "100%";
            //element_readymade.style.right = "0";
            //element_readymade.style.height = "100%";
            //element_readymade.style.marginTop = "0";
            //element_readymade.style.marginRight = "0";
            //element_readymade.style.overflow = "unset";

            var viewer = document.createElement('div');
            var viewer_image = document.createElement('img');
            viewer_image.src = '../assets/images/icons/noimage.png';
            var thumbnails = document.createElement('div');

            var hide_unhide_span = document.createElement('span');
            var hide_unhide_i = document.createElement('i');

            hide_unhide_i.className = "fas fa-images";
            hide_unhide_span.className = "image-viewer-visibility-toggle";

            hide_unhide_span.setAttribute("data-loc",1);

            hide_unhide_i.setAttribute("data-restrictions","selection");
            hide_unhide_span.setAttribute("data-restrictions","selection");

            hide_unhide_i.addEventListener("click",function(){
                publicEvents.toggle_ImgViewer2(element_readymade);
            });

            var expandIcon = document.createElement('i');
            expandIcon.className = 'fas fa-expand';
            expandIcon.addEventListener("click",function(e){
                $(".selectedSpecialOptions").css({'display':'none'});
                publicEvents.enlargeImage(e,viewer_image.src);
            });

            var title = document.createElement('span');
            title.innerText = 'Title';

            viewer.appendChild(title);
            viewer.appendChild(expandIcon);

            viewer.className = 'image-view';
            thumbnails.className = 'image-viewer-thumbnails';

            var imgsrcs =
            [

                'https://cdn.pixabay.com/photo/2017/10/10/07/48/beach-2836300_960_720.jpg',
                'https://cdn.pixabay.com/photo/2015/03/26/09/47/sky-690293__340.jpg',
                'https://cdn.pixabay.com/photo/2013/10/02/23/03/dawn-190055__340.jpg',
                'https://cdn.pixabay.com/photo/2018/05/30/00/24/thunderstorm-3440450__340.jpg',
                'https://cdn.pixabay.com/photo/2018/07/09/16/59/clouds-3526558__340.jpg',
                'https://cdn.pixabay.com/photo/2016/08/14/16/40/monument-valley-1593318__340.jpg',
                'https://cdn.pixabay.com/photo/2014/08/09/15/45/sky-414198__340.jpg',
                'https://cdn.pixabay.com/photo/2016/10/20/17/41/travel-1756150__340.jpg',
                'https://cdn.pixabay.com/photo/2014/10/29/21/46/railway-508568__340.jpg',
                'https://cdn.pixabay.com/photo/2016/08/24/17/09/vibrant-1617470__340.jpg'

            ];

            for(var i=0; i<10; i++){
                var img = document.createElement('img');
                img.src = imgsrcs[i];
                img.setAttribute('data-description','Title');

                img.setAttribute("data-restrictions","selection");

                img.addEventListener('click',function(e){
                    publicEvents.changeImageViewerImage(e,viewer_image,title,true);
                });

                thumbnails.appendChild(img);
            }

            hide_unhide_span.appendChild(hide_unhide_i);
            viewer.appendChild(viewer_image);

            element_readymade.appendChild(hide_unhide_span);
            element_readymade.appendChild(viewer);
            element_readymade.appendChild(thumbnails);
        }else{
            if(elementType_readymade == 'Checkbox 1' || elementType_readymade == 'Checkbox 2' || elementType_readymade == 'Checkbox 3'){
                element_readymade = document.createElement('div');

                var span = document.createElement("span");
                var p = document.createElement("p");
                var checkmark = document.createElement("span");
                checkmark.className = "checkmark";

                element_readymade.setAttribute("data-bg-hv","grey");

                element_readymade.setAttribute("data-checked","1");

                if(elementType_readymade == 'Checkbox 1'){
                    element_readymade.className = 'checkbox-one';
                    element_readymade.setAttribute('data-e-type','checkbox-one');

                    element_readymade.setAttribute("data-bg","black");
                    span.style.backgroundColor = "black";
                }else{
                    if(elementType_readymade == 'Checkbox 2'){
                        element_readymade.className = 'checkbox-two';
                        element_readymade.setAttribute('data-e-type','checkbox-two');

                        element_readymade.setAttribute("data-bg","darkgrey");
                        span.style.backgroundColor = "darkgrey";
                    }else{
                        if(elementType_readymade == 'Checkbox 3'){
                            element_readymade.className = 'checkbox-three';
                            element_readymade.setAttribute('data-e-type','checkbox-three');

                            element_readymade.setAttribute("data-bg","lightgrey");
                            span.style.backgroundColor = "lightgrey";
                        }
                    }
                }

                checkmark.addEventListener("mouseover",function(){
                    publicEvents.checkbox_hover(span);
                });

                checkmark.addEventListener("mouseout",function(){
                    publicEvents.checkbox_hoverOut(span);
                });

                checkmark.addEventListener("click",function(){
                    publicEvents.checkbox_click(element_readymade);
                });

                span.setAttribute("data-restrictions","selection");
                p.setAttribute("data-restrictions","selection");
                checkmark.setAttribute("data-restrictions","selection");

                p.innerText = "Checkbox";

                element_readymade.appendChild(span);
                element_readymade.appendChild(p);
                element_readymade.appendChild(checkmark);
            }else{
                if(elementType_readymade == 'Toggle Switch 1' || elementType_readymade == 'Toggle Switch 2'){
                    element_readymade = document.createElement('div');

                    var label = document.createElement("label");
                    var span = document.createElement("span");
                    var p = document.createElement("p");
                    var input = document.createElement("input");

                    input.type = "checkbox";

                    element_readymade.setAttribute("data-state","0"); // 1 : on , 0 : off

                    if(elementType_readymade == 'Toggle Switch 1'){
                        element_readymade.className = 'toggle-switch-one';
                        element_readymade.setAttribute('data-e-type','toggle-switch-one');

                        element_readymade.setAttribute("data-bg-o","black");
                        element_readymade.setAttribute("data-bg-c","lightgrey");
                    }else{
                        if(elementType_readymade == 'Toggle Switch 2'){
                            element_readymade.className = 'toggle-switch-two';
                            element_readymade.setAttribute('data-e-type','toggle-switch-two');

                            element_readymade.setAttribute("data-bg-o","black");
                            element_readymade.setAttribute("data-bg-c","lightgrey");
                        }
                    }

                    span.setAttribute("data-restrictions","selection");
                    p.setAttribute("data-restrictions","selection");
                    input.setAttribute("data-restrictions","selection");
                    label.setAttribute("data-restrictions","selection");

                    p.innerText = "Toggle Switch";

                    input.addEventListener("click",function(){
                        publicEvents.toggleSwitch_click(element_readymade);
                    });

                    label.appendChild(input);
                    label.appendChild(span);

                    element_readymade.appendChild(label);
                    element_readymade.appendChild(p);

                }else{
                    if(elementType_readymade == 'Dropdown List 1'){
                        element_readymade = document.createElement("div");
                        element_readymade.className = "dropdown-list-one";

                        element_readymade.setAttribute("data-state",0);

                        element_readymade.setAttribute("data-option-bg","white");
                        element_readymade.setAttribute("data-option-bg-hv","black");

                        element_readymade.setAttribute("data-option-bg-clr","black");
                        element_readymade.setAttribute("data-option-bg-hv-clr","white");

                        element_readymade.setAttribute("data-e-type","dropdown-list-one");

                        var selected = document.createElement("div");
                        var selected_span = document.createElement("span");

                        selected_span.innerText = "Dropdown List";

                        selected_span.addEventListener("click",function(){
                            publicEvents.dropdownlist_toggle(element_readymade);
                        });

                        var options = document.createElement("div");
                        var options_ul = document.createElement("ul");

                        selected.className = "selected_option";
                        options.className = "options";

                        selected.setAttribute("data-restrictions","selection");
                        selected_span.setAttribute("data-restrictions","selection");
                        options.setAttribute("data-restrictions","selection");
                        options_ul.setAttribute("data-restrictions","selection");

                        selected.appendChild(selected_span);
                        options.appendChild(options_ul);

                        for(var i=0; i<10; i++){
                            var option = document.createElement("li");
                            var option_a = document.createElement("a");

                            var option_span = document.createElement("span");
                            //var option_span_i = document.createElement("i");
                            //option_span_i.className = "fas fa-check";

                            //option_span.appendChild(option_span_i);

                            option_a.innerText = "Option "+i;

                            (function(option,option_a,element_readymade){
                                option_a.addEventListener("click",function(e){
                                    publicEvents.dropdownlist_option_click(element_readymade,e);
                                });

                                option_a.addEventListener("mouseover",function(){
                                    publicEvents.dropdownlist_option_hover(option,option_a,element_readymade.getAttribute("data-option-bg-hv"),element_readymade.getAttribute("data-option-bg-hv-clr"));
                                });

                                option_a.addEventListener("mouseout",function(){
                                    publicEvents.dropdownlist_option_hoverOut(option,option_a,element_readymade.getAttribute("data-option-bg"),element_readymade.getAttribute("data-option-bg-clr"));
                                });
                            })(option,option_a,element_readymade);

                            option.setAttribute("data-restrictions","selection");
                            option_a.setAttribute("data-restrictions","selection");

                            option.appendChild(option_a);
                            option.appendChild(option_span);
                            options_ul.appendChild(option);
                        }

                        element_readymade.appendChild(selected);
                        element_readymade.appendChild(options);
                    }else{
                        if(elementType_readymade == 'Dropdown List 2'){
                            element_readymade = document.createElement("div");
                            element_readymade.className = "dropdown-list-two";

                            element_readymade.setAttribute("data-state",0);

                            element_readymade.setAttribute("data-option-bg","white"); // bg
                            element_readymade.setAttribute("data-option-bg-hv","black"); // bg hover

                            element_readymade.setAttribute("data-option-bg-clr","black"); // bg fontcolor
                            element_readymade.setAttribute("data-option-bg-hv-clr","white"); // bg hover fontcolor

                            element_readymade.setAttribute("data-e-type","dropdown-list-two");

                            element_readymade.setAttribute("data-selected-bg","black"); // bg
                            element_readymade.setAttribute("data-selected-bg-hv","#e3e3e3"); // bg hover

                            element_readymade.setAttribute("data-selected-bg-clr","white"); // bg fontcolor
                            element_readymade.setAttribute("data-selected-bg-hv-clr","black"); // bg hover fontcolor

                            var selected = document.createElement("div");
                            var selected_span = document.createElement("span");

                            selected_span.innerText = "Dropdown List - Multi Select";

                            selected_span.addEventListener("click",function(){
                                publicEvents.dropdownlist_toggle(element_readymade);
                            });

                            var selected_multi_selects = document.createElement("div");
                            selected_multi_selects.className = "multi-selects";
                            selected_multi_selects.setAttribute("data-restrictions","selection");

                            var options = document.createElement("div");
                            var options_ul = document.createElement("ul");

                            selected.className = "selected_option";
                            options.className = "options";

                            selected.setAttribute("data-restrictions","selection");
                            selected_span.setAttribute("data-restrictions","selection");
                            options.setAttribute("data-restrictions","selection");
                            options_ul.setAttribute("data-restrictions","selection");

                            selected.appendChild(selected_span);
                            selected.appendChild(selected_multi_selects);
                            options.appendChild(options_ul);

                            for(var i=0; i<10; i++){
                                var option = document.createElement("li");
                                var option_a = document.createElement("a");

                                var option_span = document.createElement("span");
                                //var option_span_i = document.createElement("i");
                                //option_span_i.className = "fas fa-check";

                                //option_span.appendChild(option_span_i);

                                option_a.innerText = "Option "+i;

                                (function(option,option_a,element_readymade){
                                    option_a.addEventListener("click",function(e){
                                        publicEvents.dropdownlist_multiselect_option_click(element_readymade,e);
                                    });

                                    option_a.addEventListener("mouseover",function(){
                                        publicEvents.dropdownlist_option_hover(option,option_a,element_readymade.getAttribute("data-option-bg-hv"),element_readymade.getAttribute("data-option-bg-hv-clr"));
                                    });

                                    option_a.addEventListener("mouseout",function(){
                                        publicEvents.dropdownlist_option_hoverOut(option,option_a,element_readymade.getAttribute("data-option-bg"),element_readymade.getAttribute("data-option-bg-clr"));
                                    });
                                })(option,option_a,element_readymade);

                                option.setAttribute("data-restrictions","selection");
                                option_a.setAttribute("data-restrictions","selection");

                                option.appendChild(option_a);
                                option.appendChild(option_span);
                                options_ul.appendChild(option);
                            }

                            element_readymade.appendChild(selected);
                            element_readymade.appendChild(options);
                        }else{
                            if(elementType_readymade == "Textbox 1"){
                                element_readymade = document.createElement("div");
                                element_readymade.className = "textbox-one";

                                element_readymade.setAttribute("data-e-type","textbox-one");

                                element_readymade.style.width = "300px";
                                element_readymade.style.height = "30px";

                                var label = document.createElement("label");
                                var input = document.createElement("input");
                                var length = document.createElement("span");
                                var icon_wrapper = document.createElement("div");
                                var icon = document.createElement("i");

                                //input.style.paddingLeft = "25px";
                                icon.className = "fas fa-plus";

                                icon_wrapper.className = "icon-wrapper";
                                length.className = "inputLength";

                                input.setAttribute("maxLength",50);
                                element_readymade.setAttribute("data-max-length",50);

                                element_readymade.setAttribute("data-length-text-state",1);
                                element_readymade.setAttribute("data-i-state",1);

                                length.innerText = "0/50";

                                label.setAttribute("data-restrictions","selection");
                                input.setAttribute("data-restrictions","selection");
                                length.setAttribute("data-restrictions","selection");
                                icon.setAttribute("data-restrictions","selection");
                                icon_wrapper.setAttribute("data-restrictions","selection");

                                input.addEventListener("input",function(){
                                    publicEvents.textbox_input(element_readymade);
                                });

                                label.innerText = "Textbox";
                                input.type = "text";

                                icon_wrapper.appendChild(icon);
                                icon_wrapper.appendChild(input);
                                icon_wrapper.appendChild(length);

                                element_readymade.appendChild(label);
                                element_readymade.appendChild(icon_wrapper);
                            }else{
                                if(elementType_readymade == "Textbox 2"){
                                    element_readymade = document.createElement("div");
                                    element_readymade.className = "textbox-two";

                                    element_readymade.setAttribute("data-e-type","textbox-two");

                                    element_readymade.style.width = "300px";
                                    element_readymade.style.height = "30px";

                                    var label = document.createElement("label");
                                    var input = document.createElement("input");
                                    var length = document.createElement("span");
                                    var icon_wrapper = document.createElement("div");
                                    var icon = document.createElement("i");

                                    //input.style.paddingLeft = "25px";
                                    icon.className = "fas fa-plus";

                                    icon_wrapper.className = "icon-wrapper";

                                    length.className = "inputLength";

                                    input.setAttribute("maxLength",50);
                                    element_readymade.setAttribute("data-max-length",50);

                                    element_readymade.setAttribute("data-length-text-state",1);
                                    element_readymade.setAttribute("data-i-state",1);

                                    length.innerText = "0/50";

                                    label.setAttribute("data-restrictions","selection");
                                    input.setAttribute("data-restrictions","selection");
                                    length.setAttribute("data-restrictions","selection");
                                    icon.setAttribute("data-restrictions","selection");
                                    icon_wrapper.setAttribute("data-restrictions","selection");

                                    input.addEventListener("input",function(){
                                        publicEvents.textbox_input(element_readymade);
                                    });

                                    label.innerText = "Textbox";
                                    input.type = "text";

                                    element_readymade.setAttribute("data-label-pos","0"); // 0 : left , 1 : right

                                    icon_wrapper.appendChild(icon);
                                    icon_wrapper.appendChild(input);
                                    icon_wrapper.appendChild(length);

                                    element_readymade.appendChild(label);
                                    element_readymade.appendChild(icon_wrapper);
                                }else{
                                    if(elementType_readymade == "Checkbox 4" || elementType_readymade == "Checkbox 5"){
                                        element_readymade = document.createElement("div");

                                        element_readymade.setAttribute("data-checkmark-shape","tick");

                                        var p = document.createElement("p");
                                        p.innerText = "Text";
                                        p.setAttribute("data-restrictions","selection");

                                        p.className = "question";

                                        element_readymade.appendChild(p);

                                        for(var i=0; i<4; i++){
                                            var checkbox = document.createElement("div");

                                            var span = document.createElement("span");
                                            var p = document.createElement("p");
                                            var checkmark = document.createElement("span");

                                            element_readymade.setAttribute("data-bg","black");
                                            element_readymade.setAttribute("data-bg-hv","grey");

                                            span.style.backgroundColor = "black";

                                            checkbox.setAttribute("data-checked","0");
                                            checkmark.className = "checkmark tick-checkmark-disabled";

                                            checkbox.className = 'checkbox';
                                            checkbox.setAttribute("data-restrictions","selection");

                                            if(elementType_readymade == "Checkbox 4"){
                                                element_readymade.setAttribute('data-e-type','checkbox-multi-one');
                                                element_readymade.className = 'checkbox-multi-one';

                                                (function(span,checkbox,checkmark){

                                                    (function(checkmark,span){
                                                        checkmark.addEventListener("mouseover",function(){
                                                            publicEvents.checkbox_hover(span);
                                                        });

                                                        checkmark.addEventListener("mouseout",function(){
                                                            publicEvents.checkbox_hoverOut(span);
                                                        });
                                                    })(checkmark,span);

                                                    (function(checkmark,checkbox){
                                                        checkmark.addEventListener("click",function(){
                                                            publicEvents.multi_checkbox_click(checkbox,element_readymade);
                                                        });
                                                    })(checkmark,checkbox);

                                                })(span,checkbox,checkmark);

                                            }else{
                                                if(elementType_readymade == "Checkbox 5"){
                                                    element_readymade.setAttribute('data-e-type','checkbox-multi-two');
                                                    element_readymade.className = 'checkbox-multi-two';

                                                    (function(span,checkbox,checkmark){

                                                        (function(checkmark,span){
                                                            checkmark.addEventListener("mouseover",function(){
                                                                publicEvents.checkbox_hover(span);
                                                            });

                                                            checkmark.addEventListener("mouseout",function(){
                                                                publicEvents.checkbox_hoverOut(span);
                                                            });
                                                        })(checkmark,span);

                                                        (function(checkmark,checkbox){
                                                            checkmark.addEventListener("click",function(){
                                                                publicEvents.multi_checkbox_two_click(checkbox,element_readymade);
                                                            });
                                                        })(checkmark,checkbox);

                                                    })(span,checkbox,checkmark);

                                                }
                                            }

                                            span.setAttribute("data-restrictions","selection");
                                            p.setAttribute("data-restrictions","selection");
                                            checkmark.setAttribute("data-restrictions","selection");

                                            p.innerText = "Checkbox";

                                            checkbox.appendChild(span);
                                            checkbox.appendChild(p);
                                            checkbox.appendChild(checkmark);

                                            element_readymade.appendChild(checkbox);
                                        }

                                    }else{
                                        if(elementType_readymade == "Textbox 3"){
                                            element_readymade = document.createElement("div");
                                            element_readymade.className = "textbox-three";

                                            element_readymade.setAttribute("data-e-type","textbox-three");

                                            element_readymade.style.width = "300px";
                                            element_readymade.style.height = "30px";

                                            var icon_wrapper = document.createElement("div");
                                            //icon_wrapper.style.height = "100%";
                                            var icon = document.createElement("i");
                                            var input = document.createElement("input");
                                            var length = document.createElement("span");
                                            length.className = "inputLength";

                                            //input.style.paddingLeft = "25px";
                                            icon.className = "fas fa-plus";

                                            icon_wrapper.className = "icon-wrapper";

                                            input.setAttribute("maxLength",50);
                                            input.setAttribute("placeholder","Placeholder Text");

                                            element_readymade.setAttribute("data-max-length",50);

                                            element_readymade.setAttribute("data-length-text-state",1);
                                            element_readymade.setAttribute("data-i-state",1);

                                            length.innerText = "0/50";

                                            icon_wrapper.setAttribute("data-restrictions","selection");
                                            input.setAttribute("data-restrictions","selection");
                                            length.setAttribute("data-restrictions","selection");
                                            icon.setAttribute("data-restrictions","selection");

                                            input.addEventListener("input",function(){
                                                publicEvents.textbox_input(element_readymade);
                                            });

                                            input.type = "text";

                                            //element_readymade.setAttribute("data-label-pos","0"); // 0 : left , 1 : right

                                            icon_wrapper.appendChild(icon);

                                            element_readymade.appendChild(icon_wrapper);
                                            icon_wrapper.appendChild(input);
                                            icon_wrapper.appendChild(length);
                                        }else{
                                            if(elementType_readymade == "Ratings 1"){
                                                element_readymade = document.createElement("div");
                                                element_readymade.className = "ratings-one";

                                                element_readymade.setAttribute("data-selection",0);
                                                element_readymade.setAttribute("data-e-type","ratings-one");

                                                element_readymade.style.width = "150px";
                                                element_readymade.style.height = "20px";

                                                element_readymade.setAttribute("data-i-bg","white");
                                                element_readymade.setAttribute("data-i-bg-selected","gold");

                                                for(var i=0; i<5; i++){
                                                    var rating = document.createElement("i");
                                                    rating.className = "fas fa-star";

                                                    rating.id = i+1;
                                                    rating.setAttribute("data-restrictions","selection");

                                                    rating.addEventListener("mouseover",function(e){
                                                        publicEvents.ratings_mouseover(this,element_readymade);
                                                    });

                                                    rating.addEventListener("click",function(e){
                                                        publicEvents.ratings_click(this,element_readymade);
                                                    });

                                                    element_readymade.appendChild(rating);
                                                }

                                                element_readymade.addEventListener("mouseout",function(){
                                                    publicEvents.ratings_cancel(this);
                                                });
                                            }else{
                                                if(elementType_readymade == "Ratings 2"){
                                                    element_readymade = document.createElement("div");
                                                    element_readymade.className = "ratings-two";

                                                    element_readymade.setAttribute("data-selection",0);
                                                    element_readymade.setAttribute("data-e-type","ratings-two");

                                                    element_readymade.setAttribute("data-i-bg","white");
                                                    element_readymade.setAttribute("data-i-bg-selected","gold");

                                                    var i_holder = document.createElement("span");
                                                    i_holder.className = "i_holder";

                                                    var p = document.createElement("p");
                                                    p.innerText = "Ratings";

                                                    i_holder.setAttribute("data-restrictions","selection");
                                                    p.setAttribute("data-restrictions","selection");

                                                    for(var i=0; i<5; i++){
                                                        var rating = document.createElement("i");
                                                        rating.className = "fas fa-star";

                                                        rating.id = i+1;
                                                        rating.setAttribute("data-restrictions","selection");

                                                        rating.addEventListener("mouseover",function(e){
                                                            publicEvents.ratings_mouseover(this,element_readymade);
                                                        });

                                                        rating.addEventListener("click",function(e){
                                                            publicEvents.ratings_click(this,element_readymade);
                                                        });

                                                        i_holder.appendChild(rating);
                                                    }

                                                    element_readymade.addEventListener("mouseout",function(){
                                                        publicEvents.ratings_cancel(this);
                                                    });

                                                    element_readymade.appendChild(p);
                                                    element_readymade.appendChild(i_holder);
                                                }else{
                                                    if(elementType_readymade == "Video Player 1"){
                                                        element_readymade = document.createElement("div");
                                                        element_readymade.className = "video-player-one";

                                                        element_readymade.setAttribute("data-e-type","video-player-one");
                                                        element_readymade.setAttribute("data-title","Video Title");
                                                        element_readymade.setAttribute("data-info-state",0);
                                                        element_readymade.setAttribute("data-info-style",0);
                                                        element_readymade.setAttribute("data-description","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta risus eros, a facilisis velit viverra vel. Ut vel mauris rhoncus, mollis mi ac, elementum leo. Ut pharetra erat eu elit facilisis faucibus. Donec facilisis sem ac urna condimentum, quis hendrerit odio accumsan. Integer vel congue elit. Nullam viverra commodo ipsum et blandit. Mauris diam ligula, dapibus eu finibus porta, commodo tempus ipsum.Nunc vulputate turpis vel viverra sodales. Integer gravida, nibh eget tristique gravida, nulla magna feugiat nulla, vitae vehicula diam ligula eget ex. Aenean dignissim id nibh sit amet volutpat. Suspendisse dignissim nisi non nunc feugiat, in blandit leo consequat. Praesent rhoncus leo vel diam fermentum pretium. Mauris ut arcu at ipsum tristique malesuada. Curabitur sed tempor ante. Vivamus ultricies commodo eros, eu fringilla mi auctor ut. Ut blandit, dolor sit amet interdum bibendum, nulla diam accumsan nunc, at ullamcorper est purus non lorem.Proin commodo augue justo, sed fringilla lacus pharetra a. Proin cursus luctus placerat. Quisque aliquet magna eget libero accumsan, eu euismod nunc auctor. Vestibulum ultricies dolor sed nibh aliquam fringilla. Morbi quis nulla nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam accumsan nisl sollicitudin felis egestas, non commodo neque tempus. In malesuada vestibulum dapibus. Nullam urna eros, accumsan sed velit vitae, viverra mollis lorem. Curabitur eu posuere nibh, et sodales mi. Maecenas posuere ullamcorper volutpat. Integer bibendum porta massa sed eleifend. Quisque rutrum eget urna vitae porttitor. Vivamus non eros purus. Sed rhoncus mi ut velit faucibus semper.");

                                                        var video = document.createElement("video");
                                                        video.src = "../assets/videos/videotest.mp4";

                                                        video.addEventListener("click",function(){
                                                            self.selectElement(element_readymade);
                                                        });

                                                        video.addEventListener("playing",function(){
                                                            publicEvents.videoIsPlaying(element_readymade);
                                                        });

                                                        video.addEventListener("waiting",function(){
                                                            publicEvents.videoIsWaiting(element_readymade);
                                                        });

                                                        var videoThumbnail = document.createElement("img");
                                                        videoThumbnail.className = "video-player-thumb";

                                                        videoThumbnail.addEventListener("click",function(){
                                                            self.selectElement(element_readymade);
                                                        });

                                                        var bufferDiv = document.createElement("div");
                                                        bufferDiv.className = "buffer-icon";

                                                        for(var o=0; o<4; o++){
                                                            var div = document.createElement("div");
                                                            div.setAttribute("data-restrictions","selection");
                                                            bufferDiv.appendChild(div);
                                                        }

                                                        var info = document.createElement("div");
                                                        info.className = "video-info";

                                                        var p1 = document.createElement("p");
                                                        p1.className = "heading";
                                                        p1.innerText = element_readymade.getAttribute("data-title");

                                                        var p2 = document.createElement("p");
                                                        p2.className = "description";
                                                        p2.innerText = element_readymade.getAttribute("data-description");

                                                        info.appendChild(p1);
                                                        info.appendChild(p2);

                                                        var controls = document.createElement("div");
                                                        controls.className = "video-controls";

                                                        var infoIcon = document.createElement("i");
                                                        infoIcon.className = "fas fa-info-circle";

                                                        infoIcon.addEventListener("click",function(e){
                                                            publicEvents.videoInfo(video,e);
                                                        });

                                                        var progressInput = document.createElement("input");
                                                        progressInput.className = "progressbar";
                                                        progressInput.type = "range";
                                                        progressInput.setAttribute("min",0.00);
                                                        progressInput.setAttribute("max",100.00);
                                                        progressInput.value = 0.00;

                                                        var canvas = document.createElement("canvas");

                                                        var time = document.createElement("span");
                                                        time.innerText = "00:00 / 00:00";

                                                        var startpause = document.createElement("i");
                                                        startpause.className = "fas fa-play";

                                                        var expand = document.createElement("div");
                                                        expand.className = "expand";

                                                        var expandIcon = document.createElement("i");
                                                        expandIcon.className = "fas fa-expand";

                                                        var volume = document.createElement("div");
                                                        volume.className = "volume";

                                                        var volume_range = document.createElement("input");
                                                        volume_range.type = "range";
                                                        volume_range.setAttribute("min",0);
                                                        volume_range.setAttribute("max",1);
                                                        volume_range.setAttribute("step",0.1);
                                                        volume_range.setAttribute("value",1);

                                                        var volume_i = document.createElement("i");
                                                        volume_i.className = "fas fa-volume-up";

                                                        volume.appendChild(volume_i);
                                                        volume.appendChild(volume_range);

                                                        expand.appendChild(expandIcon);

                                                        controls.appendChild(startpause);
                                                        controls.appendChild(progressInput);
                                                        controls.appendChild(time);
                                                        controls.appendChild(infoIcon);
                                                        controls.appendChild(canvas);

                                                        startpause.addEventListener("click",function(e){
                                                            publicEvents.videoPlayPause(video,e);
                                                        });

                                                        expandIcon.addEventListener("click",function(e){
                                                            if(this.className == "fas fa-compress"){
                                                                publicEvents.videoExitFullScreen(video,e);
                                                            }else{
                                                                if(this.className == "fas fa-expand"){
                                                                    publicEvents.videoFullScreen(video,e);
                                                                }
                                                            }
                                                        });

                                                        progressInput.addEventListener("mouseout",function(e){
                                                            publicEvents.videoHideFrame(element_readymade,e);
                                                        });

                                                        progressInput.addEventListener("mousemove",function(e){
                                                            publicEvents.videoPositionFrame(element_readymade,e);
                                                        });

                                                        video.addEventListener('loadeddata', function(){
                                                            time.innerText = "00:00 / "+publicEvents.videoDurationToReadable(video.getAttribute("data-len"));
                                                            progressInput.setAttribute("max",this.duration);

                                                            publicEvents.moveVideoProgressBar(this);
                                                            videoThumbnail.style.opacity = 1;
                                                            bufferDiv.style.opacity = 0;
                                                        });

                                                        video.addEventListener('timeupdate', function(){
                                                            time.innerText = publicEvents.videoDurationToReadable(this.currentTime)+" / "+publicEvents.videoDurationToReadable(video.getAttribute("data-len"));
                                                            progressInput.value = this.currentTime.toFixed(0);

                                                            publicEvents.moveVideoProgressBar(this);
                                                        });

                                                        video.addEventListener("ended",function(){
                                                            publicEvents.videoEnded(this);

                                                            progressInput.value = 0.00;
                                                            time.innerText = "00:00 / "+publicEvents.videoDurationToReadable(video.getAttribute("data-len"));
                                                            publicEvents.moveVideoProgressBar(this);
                                                            videoThumbnail.style.opacity = 1;
                                                        });

                                                        progressInput.addEventListener("change",function(e){
                                                            publicEvents.videoChangeDuration(video,e);
                                                        });

                                                        volume_range.addEventListener("change",function(e){
                                                            publicEvents.videoChangeVolume(video,e);
                                                        });

                                                        startpause.setAttribute("data-restrictions","selection");
                                                        progressInput.setAttribute("data-restrictions","selection");
                                                        time.setAttribute("data-restrictions","selection");
                                                        controls.setAttribute("data-restrictions","selection");
                                                        video.setAttribute("data-restrictions","selection");
                                                        infoIcon.setAttribute("data-restrictions","selection");

                                                        canvas.setAttribute("data-restrictions","selection");
                                                        videoThumbnail.setAttribute("data-restrictions","selection");

                                                        volume_i.setAttribute("data-restrictions","selection");
                                                        volume_range.setAttribute("data-restrictions","selection");
                                                        volume.setAttribute("data-restrictions","selection");

                                                        expand.setAttribute("data-restrictions","selection");
                                                        expandIcon.setAttribute("data-restrictions","selection");

                                                        info.setAttribute("data-restrictions","selection");
                                                        p1.setAttribute("data-restrictions","selection");
                                                        p2.setAttribute("data-restrictions","selection");

                                                        bufferDiv.setAttribute("data-restrictions","selection");

                                                        element_readymade.appendChild(video);
                                                        element_readymade.appendChild(bufferDiv);
                                                        element_readymade.appendChild(videoThumbnail);
                                                        element_readymade.appendChild(volume);
                                                        element_readymade.appendChild(expand);
                                                        element_readymade.appendChild(controls);
                                                        element_readymade.appendChild(info);

                                                    }else{
                                                        if(elementType_readymade == "Video Player 2"){
                                                            element_readymade = document.createElement("div");
                                                            element_readymade.className = "video-player-two";

                                                            element_readymade.setAttribute("data-e-type","video-player-two");
                                                            element_readymade.setAttribute("data-title","Video Title");
                                                            element_readymade.setAttribute("data-info-state",0);
                                                            element_readymade.setAttribute("data-info-style",0);
                                                            element_readymade.setAttribute("data-description","Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur porta risus eros, a facilisis velit viverra vel. Ut vel mauris rhoncus, mollis mi ac, elementum leo. Ut pharetra erat eu elit facilisis faucibus. Donec facilisis sem ac urna condimentum, quis hendrerit odio accumsan. Integer vel congue elit. Nullam viverra commodo ipsum et blandit. Mauris diam ligula, dapibus eu finibus porta, commodo tempus ipsum.Nunc vulputate turpis vel viverra sodales. Integer gravida, nibh eget tristique gravida, nulla magna feugiat nulla, vitae vehicula diam ligula eget ex. Aenean dignissim id nibh sit amet volutpat. Suspendisse dignissim nisi non nunc feugiat, in blandit leo consequat. Praesent rhoncus leo vel diam fermentum pretium. Mauris ut arcu at ipsum tristique malesuada. Curabitur sed tempor ante. Vivamus ultricies commodo eros, eu fringilla mi auctor ut. Ut blandit, dolor sit amet interdum bibendum, nulla diam accumsan nunc, at ullamcorper est purus non lorem.Proin commodo augue justo, sed fringilla lacus pharetra a. Proin cursus luctus placerat. Quisque aliquet magna eget libero accumsan, eu euismod nunc auctor. Vestibulum ultricies dolor sed nibh aliquam fringilla. Morbi quis nulla nibh. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam accumsan nisl sollicitudin felis egestas, non commodo neque tempus. In malesuada vestibulum dapibus. Nullam urna eros, accumsan sed velit vitae, viverra mollis lorem. Curabitur eu posuere nibh, et sodales mi. Maecenas posuere ullamcorper volutpat. Integer bibendum porta massa sed eleifend. Quisque rutrum eget urna vitae porttitor. Vivamus non eros purus. Sed rhoncus mi ut velit faucibus semper.");

                                                            var video = document.createElement("video");
                                                            video.src = "../assets/videos/videotest.mp4";
                                                            video.currentTime = 160;

                                                            var bufferDiv = document.createElement("div");
                                                            bufferDiv.className = "buffer-icon";

                                                            for(var o=0; o<4; o++){
                                                                var div = document.createElement("div");
                                                                div.setAttribute("data-restrictions","selection");
                                                                bufferDiv.appendChild(div);
                                                            }

                                                            var videoThumbnail = document.createElement("img");
                                                            videoThumbnail.className = "video-player-thumb";

                                                            video.addEventListener("click",function(){
                                                                self.selectElement(element_readymade);
                                                            });

                                                            videoThumbnail.addEventListener("click",function(){
                                                                self.selectElement(element_readymade);
                                                            });

                                                            video.addEventListener('timeupdate', function(){
                                                                publicEvents.moveVideoProgressBar(this);
                                                            });

                                                            video.addEventListener('loadeddata', function(){
                                                                videoThumbnail.style.opacity = 1;
                                                                bufferDiv.style.opacity = 0;
                                                            });

                                                            video.addEventListener("ended",function(){
                                                                publicEvents.videoEnded(this);
                                                                this.currentTime = 0;
                                                                publicEvents.moveVideoProgressBar(this);
                                                                videoThumbnail.style.opacity = 1;
                                                            });

                                                            var info = document.createElement("div");
                                                            info.className = "video-info";

                                                            var p1 = document.createElement("p");
                                                            p1.className = "heading";
                                                            p1.innerText = element_readymade.getAttribute("data-title");

                                                            var p2 = document.createElement("p");
                                                            p2.className = "description";
                                                            p2.innerText = element_readymade.getAttribute("data-description");

                                                            info.appendChild(p1);
                                                            info.appendChild(p2);

                                                            var controls = document.createElement("div");
                                                            controls.className = "video-controls";

                                                            var infoIcon = document.createElement("i");
                                                            infoIcon.className = "fas fa-info-circle";

                                                            infoIcon.addEventListener("click",function(e){
                                                                publicEvents.videoInfo(video,e);
                                                            });

                                                            var playpause = document.createElement("i");
                                                            playpause.className = "fas fa-play";

                                                            playpause.addEventListener("click",function(e){
                                                                publicEvents.videoPlayPause(video,e);
                                                            });

                                                            var expand = document.createElement("i");
                                                            expand.className = "fas fa-expand";

                                                            expand.addEventListener("click",function(e){
                                                                if(this.className == "fas fa-compress"){
                                                                    publicEvents.videoExitFullScreen(video,e);
                                                                }else{
                                                                    if(this.className == "fas fa-expand"){
                                                                        publicEvents.videoFullScreen(video,e);
                                                                    }
                                                                }
                                                            });

                                                            var volume = document.createElement("i");
                                                            volume.className = "fas fa-volume-up";

                                                            video.volume = 1;

                                                            volume.addEventListener("click",function(e){
                                                                publicEvents.videoChangeVolume2(video,e);
                                                            });

                                                            var forward = document.createElement("i");
                                                            forward.className = "fas fa-step-forward";

                                                            forward.addEventListener("click",function(e){
                                                                publicEvents.videoForward(video,e);
                                                            });

                                                            var backward = document.createElement("i");
                                                            backward.className = "fas fa-step-backward";

                                                            backward.addEventListener("click",function(e){
                                                                publicEvents.videoBackward(video,e);
                                                            });

                                                            var nightmode = document.createElement("i");
                                                            nightmode.className = "far fa-moon";

                                                            nightmode.addEventListener("click",function(e){
                                                                publicEvents.videoNightMode(video,e);
                                                            });

                                                            controls.appendChild(playpause);
                                                            controls.appendChild(volume);
                                                            controls.appendChild(expand);
                                                            controls.appendChild(backward);
                                                            controls.appendChild(forward);
                                                            controls.appendChild(nightmode);
                                                            controls.appendChild(infoIcon);

                                                            var cover = document.createElement("div");
                                                            var cover_p = document.createElement("p");
                                                            var cover_div = document.createElement("div");
                                                            cover_p.innerText = "Video Title";

                                                            cover.appendChild(cover_div);
                                                            cover.appendChild(cover_p);

                                                            cover.className = "video-cover";

                                                            cover.addEventListener("click",function(){
                                                                self.selectElement(element_readymade);
                                                            });

                                                            var duration = document.createElement("div");
                                                            duration.className = "duration";

                                                            var duration_div = document.createElement("div");

                                                            var time1 = document.createElement("span");
                                                            time1.innerText = "00:00";

                                                            var time2 = document.createElement("span");
                                                            time2.innerText = "05:00";
                                                            time2.className = "time";

                                                            duration.appendChild(time1);
                                                            duration.appendChild(time2);
                                                            duration.appendChild(duration_div);

                                                            video.setAttribute("data-restrictions","selection");
                                                            videoThumbnail.setAttribute("data-restrictions","selection");

                                                            cover.setAttribute("data-restrictions","selection");
                                                            cover_p.setAttribute("data-restrictions","selection");
                                                            cover_div.setAttribute("data-restrictions","selection");

                                                            controls.setAttribute("data-restrictions","selection");
                                                            playpause.setAttribute("data-restrictions","selection");
                                                            volume.setAttribute("data-restrictions","selection");
                                                            expand.setAttribute("data-restrictions","selection");
                                                            forward.setAttribute("data-restrictions","selection");
                                                            backward.setAttribute("data-restrictions","selection");
                                                            nightmode.setAttribute("data-restrictions","selection");
                                                            infoIcon.setAttribute("data-restrictions","selection");

                                                            time1.setAttribute("data-restrictions","selection");
                                                            time2.setAttribute("data-restrictions","selection");
                                                            duration.setAttribute("data-restrictions","selection");
                                                            duration_div.setAttribute("data-restrictions","selection");

                                                            info.setAttribute("data-restrictions","selection");
                                                            p1.setAttribute("data-restrictions","selection");
                                                            p2.setAttribute("data-restrictions","selection");

                                                            bufferDiv.setAttribute("data-restrictions","selection");

                                                            element_readymade.appendChild(duration);
                                                            element_readymade.appendChild(video);
                                                            element_readymade.appendChild(bufferDiv);
                                                            element_readymade.appendChild(videoThumbnail);
                                                            element_readymade.appendChild(cover);
                                                            element_readymade.appendChild(controls);
                                                            element_readymade.appendChild(info);

                                                        }else{
                                                            if(elementType_readymade == "Video Playlist 1"){
                                                                element_readymade = document.createElement("div");

                                                                element_readymade.className = "video-playlist-one";
                                                                element_readymade.setAttribute("data-e-type","video-playlist-one");
                                                                element_readymade.setAttribute("data-info-state",1);
                                                                element_readymade.setAttribute("data-list-loc",0);

                                                                element_readymade.addEventListener("mouseover",function(e){
                                                                    publicEvents.videoPlaylistInfo_hide(this,e);
                                                                });

                                                                element_readymade.addEventListener("mouseout",function(e){
                                                                    publicEvents.videoPlaylistInfo_show(this,e);
                                                                });

                                                                var infoDiv = document.createElement("div");
                                                                infoDiv.className = "video-playlist-info";

                                                                var info_heading = document.createElement("p");
                                                                info_heading.className = "heading";
                                                                info_heading.innerText = "My Favourite Songs";

                                                                var info_description = document.createElement("p");
                                                                info_description.className = "description";
                                                                info_description.innerText = "I Have added all the songs i like in this playlist, you can listen to them all.";

                                                                infoDiv.appendChild(info_heading);
                                                                infoDiv.appendChild(info_description);

                                                                var infoFade = document.createElement("div");
                                                                infoFade.className = "video-playlist-info-fade";

                                                                var player = document.createElement("div");
                                                                var list = document.createElement("div");

                                                                player.addEventListener("click",function(){
                                                                    self.selectElement(element_readymade);
                                                                });

                                                                list.addEventListener("click",function(){
                                                                    self.selectElement(element_readymade);
                                                                });

                                                                player.className = "playlist-player";
                                                                list.className = "playlist-list";

                                                                var video = document.createElement("video");
                                                                video.src = "../assets/videos/videotest.mp4";
                                                                video.currentTime = 160;

                                                                for(var i=0; i<10; i++){
                                                                    var item = document.createElement("div");
                                                                    var img = document.createElement("img");
                                                                    var p = document.createElement("p");

                                                                    item.className = "playlist-list-item";
                                                                    p.innerText = "Video Number #"+i;
                                                                    img.src = "http://pngimg.com/uploads/google/google_PNG19635.png";

                                                                    item.setAttribute("data-restrictions","selection");
                                                                    img.setAttribute("data-restrictions","selection");
                                                                    p.setAttribute("data-restrictions","selection");

                                                                    (function(item,img,p,video){
                                                                        item.addEventListener("click",function(){
                                                                            publicEvents.videoPlaylistItemClick(item,video);
                                                                        });

                                                                        img.addEventListener("click",function(){
                                                                            publicEvents.videoPlaylistItemClick(item,video);
                                                                        });

                                                                        p.addEventListener("click",function(){
                                                                            publicEvents.videoPlaylistItemClick(item,video);
                                                                        });
                                                                    })(item,img,p,video);

                                                                    item.appendChild(img);
                                                                    item.appendChild(p);
                                                                    list.appendChild(item);

                                                                    if(i==0){
                                                                        item.className = "playlist-list-item playlist-selected-item";
                                                                    }
                                                                }

                                                                var videoplayer = document.createElement("div");
                                                                videoplayer.className = "video-player-one";

                                                                videoplayer.setAttribute("data-e-type","video-player-one");
                                                                videoplayer.setAttribute("data-info-state",0);
                                                                videoplayer.setAttribute("data-info-style",0);

                                                                var info = document.createElement("div");
                                                                info.className = "video-info";

                                                                var p1 = document.createElement("p");
                                                                p1.className = "heading";
                                                                p1.innerText = videoplayer.getAttribute("data-title");

                                                                var p2 = document.createElement("p");
                                                                p2.className = "description";
                                                                p2.innerText = videoplayer.getAttribute("data-description");

                                                                info.appendChild(p1);
                                                                info.appendChild(p2);

                                                                var controls = document.createElement("div");
                                                                controls.className = "video-controls";

                                                                var infoIcon = document.createElement("i");
                                                                infoIcon.className = "fas fa-info-circle";

                                                                infoIcon.addEventListener("click",function(e){
                                                                    publicEvents.videoInfo(video,e);
                                                                });

                                                                var progressInput = document.createElement("input");
                                                                progressInput.className = "progressbar";
                                                                progressInput.type = "range";
                                                                progressInput.setAttribute("min",0.00);
                                                                progressInput.setAttribute("max",100.00);
                                                                progressInput.value = 0.00;

                                                                var canvas = document.createElement("canvas");

                                                                var time = document.createElement("span");
                                                                time.innerText = "00:00 / 00:00";

                                                                var startpause = document.createElement("i");
                                                                startpause.className = "fas fa-play";

                                                                var expand = document.createElement("div");
                                                                expand.className = "expand";

                                                                var expandIcon = document.createElement("i");
                                                                expandIcon.className = "fas fa-expand";

                                                                var volume = document.createElement("div");
                                                                volume.className = "volume";

                                                                var volume_range = document.createElement("input");
                                                                volume_range.type = "range";
                                                                volume_range.setAttribute("min",0);
                                                                volume_range.setAttribute("max",1);
                                                                volume_range.setAttribute("step",0.1);
                                                                volume_range.setAttribute("value",1);

                                                                var volume_i = document.createElement("i");
                                                                volume_i.className = "fas fa-volume-up";

                                                                volume.appendChild(volume_i);
                                                                volume.appendChild(volume_range);

                                                                expand.appendChild(expandIcon);

                                                                controls.appendChild(startpause);
                                                                controls.appendChild(progressInput);
                                                                controls.appendChild(time);
                                                                controls.appendChild(infoIcon);
                                                                controls.appendChild(canvas);

                                                                startpause.addEventListener("click",function(e){
                                                                    publicEvents.videoPlayPause(video,e);
                                                                });

                                                                expandIcon.addEventListener("click",function(e){
                                                                    if(this.className == "fas fa-compress"){
                                                                        publicEvents.videoPlaylistExitFullScreen(element_readymade,e);
                                                                    }else{
                                                                        if(this.className == "fas fa-expand"){
                                                                            publicEvents.videoPlaylistFullScreen(element_readymade,e);
                                                                        }
                                                                    }
                                                                });

                                                                progressInput.addEventListener("mouseout",function(e){
                                                                    publicEvents.videoHideFrame(videoplayer,e);
                                                                });

                                                                progressInput.addEventListener("mousemove",function(e){
                                                                    publicEvents.videoPositionFrame(videoplayer,e);
                                                                });

                                                                video.addEventListener('loadeddata', function(){
                                                                    time.innerText = "00:00 / "+publicEvents.videoDurationToReadable(video.getAttribute("data-len"));
                                                                    progressInput.setAttribute("max",this.duration);

                                                                    publicEvents.moveVideoProgressBar(this);
                                                                });

                                                                video.addEventListener('timeupdate', function(){
                                                                    time.innerText = publicEvents.videoDurationToReadable(this.currentTime)+" / "+publicEvents.videoDurationToReadable(video.getAttribute("data-len"));
                                                                    progressInput.value = this.currentTime.toFixed(0);

                                                                    publicEvents.moveVideoProgressBar(this);
                                                                });

                                                                video.addEventListener("ended",function(){
                                                                    publicEvents.videoEnded(this);

                                                                    progressInput.value = 0.00;
                                                                    time.innerText = "00:00 / "+publicEvents.videoDurationToReadable(video.getAttribute("data-len"));
                                                                    publicEvents.moveVideoProgressBar(this);
                                                                });

                                                                progressInput.addEventListener("change",function(e){
                                                                    publicEvents.videoChangeDuration(video,e);
                                                                });

                                                                volume_range.addEventListener("change",function(e){
                                                                    publicEvents.videoChangeVolume(video,e);
                                                                });

                                                                startpause.setAttribute("data-restrictions","selection");
                                                                progressInput.setAttribute("data-restrictions","selection");
                                                                time.setAttribute("data-restrictions","selection");
                                                                controls.setAttribute("data-restrictions","selection");
                                                                video.setAttribute("data-restrictions","selection");
                                                                infoIcon.setAttribute("data-restrictions","selection");

                                                                canvas.setAttribute("data-restrictions","selection");

                                                                volume_i.setAttribute("data-restrictions","selection");
                                                                volume_range.setAttribute("data-restrictions","selection");
                                                                volume.setAttribute("data-restrictions","selection");

                                                                expand.setAttribute("data-restrictions","selection");
                                                                expandIcon.setAttribute("data-restrictions","selection");

                                                                info.setAttribute("data-restrictions","selection");
                                                                p1.setAttribute("data-restrictions","selection");
                                                                p2.setAttribute("data-restrictions","selection");

                                                                infoDiv.setAttribute("data-restrictions","selection");
                                                                info_heading.setAttribute("data-restrictions","selection");
                                                                info_description.setAttribute("data-restrictions","selection");

                                                                infoFade.setAttribute("data-restrictions","selection");

                                                                videoplayer.appendChild(video);
                                                                videoplayer.appendChild(volume);
                                                                videoplayer.appendChild(expand);
                                                                videoplayer.appendChild(controls);
                                                                videoplayer.appendChild(info);

                                                                video.setAttribute("data-restrictions","selection");

                                                                player.setAttribute("data-restrictions","selection");
                                                                list.setAttribute("data-restrictions","selection");
                                                                videoplayer.setAttribute("data-restrictions","selection");

                                                                videoplayer.appendChild(video);
                                                                player.appendChild(videoplayer);

                                                                element_readymade.appendChild(infoDiv);
                                                                element_readymade.appendChild(infoFade);
                                                                element_readymade.appendChild(player);
                                                                element_readymade.appendChild(list);
                                                            }else{

                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
}
}
}
}

element_readymade.addEventListener('click',self.elementClicked);
element_readymade.addEventListener('contextmenu',self.elementClicked);

if(elementType_readymade == 'Top NavBar'){
    $('.previewsite').prepend(element_readymade);
    self.updateLastElementAdded();
}else{
    document.getElementsByClassName('previewsite')[0].appendChild(element_readymade);
    //Globals.window.body.prepend(element_readymade);
    self.updateLastElementAdded();

    element_readymade.style.left = ((hcenterline.getBoundingClientRect().width / 2) - hcenterline.getBoundingClientRect().left) + 'px';
    element_readymade.style.top = ((vcenterline.getBoundingClientRect().height / 2) - vcenterline.getBoundingClientRect().top) + 'px';

}
}

for(var i=0; i<newelements.length; i++){
    var elementType = newelements[i].getElementsByTagName('span')[0].innerText;

    if(elementType == 'Text Input'){
        element = document.createElement('input');
        element.type = 'text';
        element.value = 'Text Input';
        element.style.width = '80px';
        element.style.minHeight = '20px';
        element.setAttribute('data-e-type','textinput');
    }else{
        if(elementType == 'Button'){
            element = document.createElement(elementType);
            element.innerText = 'Button';
            element.style.width = '100px';
            element.style.minHeight = '40px';
            element.setAttribute('data-e-type','button');
        }else{
            if(elementType == 'Image'){
                element = document.createElement('img');
                element.src = '../assets/images/icons/noimage.png';
                element.style.width = '200px';
                element.style.height = '200px';
                element.style.borderRadius = '5px';
                element.setAttribute('data-e-type','image');
            }else{
                if(elementType == 'Div'){
                    element = document.createElement('div');
                    element.style.width = '100px';
                    element.style.height = '100px';
                    element.setAttribute('data-e-type','div');
                }else{
                    if(elementType == 'Video'){
                        if(newelements[i].getElementsByTagName('span')[0].getElementsByClassName("ytLogo")[0]){
                            element = document.createElement('div');
                            element.setAttribute('data-e-type','ytvideo');
                        }else{
                            element = document.createElement('video');
                            element.style.width = '500px';
                            element.style.height = '350px';
                            element.setAttribute('controls','');
                            element.setAttribute('data-e-type','video');
                            element.setAttribute('poster','../assets/images/icons/novideo.png');
                        }
                    }else{
                        if(elementType == 'Paragraph'){
                            element = document.createElement('p');
                            element.style.width = '400px';
                            element.style.minHeight = '150px';
                            element.setAttribute('data-e-type','paragraph');
                            element.innerText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean iaculis lacinia ex at porta. Duis in metus ac lectus cursus scelerisque. Nam interdum velit ut felis condimentum malesuada. Curabitur maximus tortor vitae eros tincidunt pellentesque eget vel urna. Maecenas nec velit vulputate leo placerat accumsan quis et dolor. Donec ultrices odio mattis massa euismod, eget pretium quam tempus. Fusce lacus ante, mollis id est ut, rhoncus dictum ipsum';
                        }else{
                            if(elementType == 'Heading'){
                                element = document.createElement('h3');
                                element.style.width = '200px';
                                element.style.minHeight = '50px';
                                element.innerText = 'Heading';
                                element.setAttribute('data-e-type','heading');
                            }else{
                                if(elementType == 'TextArea'){
                                    element = document.createElement('textarea');
                                    element.style.width = '200px';
                                    element.style.minHeight = '50px';
                                    element.innerText = 'Textarea';
                                    element.setAttribute('data-e-type','textarea');
                                }else{
                                    if(elementType == 'Icon'){
                                        element = document.createElement('i');
                                        element.style.padding = '10px';
                                        element.className = 'fab fa-font-awesome';
                                        element.style.fontSize = '15px';
                                        element.setAttribute('data-e-type','icon');
                                    }else{
                                        if(elementType == "Checkbox"){
                                            element = document.createElement("input");
                                            element.type = "checkbox";
                                            element.setAttribute("checked","checked");
                                            element.setAttribute('data-e-type','checkbox');
                                            element.style.width = '50px';
                                            element.style.height = '50px';
                                        }else{

                                        }
                                        //element = document.createElement(elementType);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    if(newelements[i].getElementsByTagName('span')[0].getElementsByClassName("ytLogo")[0]){

        var divOverlay = document.createElement('div');
        divOverlay.className = 'video-overlay';
        divOverlay.style.width = '500px';
        divOverlay.style.height = '350px';
        divOverlay.setAttribute('data-e-type','video-overlay');

        var random = Globals.pageHandler.randomize.elementId(25);

        divOverlay.id = random;
        element.id = random+'videoPlayer';

        divOverlay.addEventListener('click',self.elementClicked);
        divOverlay.addEventListener('contextmenu',self.elementClicked);
        //divOverlay.style.left = '50%';
        //divOverlay.style.transform = 'translate(-50%)';
        divOverlay.style.left = ((hcenterline.getBoundingClientRect().width / 2) - hcenterline.getBoundingClientRect().left) + 'px';
        divOverlay.style.top = ((vcenterline.getBoundingClientRect().height / 2) - vcenterline.getBoundingClientRect().top) + 'px';

        /*if(lastelementadded){
        divOverlay.style.top = ((lastelementadded.offsetTop + lastelementadded.getBoundingClientRect().height) + 15) + 'px';
    }*/

    divOverlay.appendChild(element);
    document.getElementsByClassName('previewsite')[0].appendChild(divOverlay);

    var player = new YT.Player(element, {
        //height: '390',
        //width: '640',
        videoId: 'xUg5Y77hbrs',
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
        //FUNCTION TO ADD DIV AS OVERLAY AND ENABLE EVENTS;
        //document.getElementById('gaga').addEventListener('click',function(){ self.selectElement(document.querySelector('[data-e-type="video"]')); });
    });

}else{
    element.addEventListener('click',self.elementClicked);
    element.addEventListener('contextmenu',self.elementClicked);

    //element.style.left = '50%';
    //element.style.transform = 'translate(-50%)';

    element.style.left = ((hcenterline.getBoundingClientRect().width / 2) - hcenterline.getBoundingClientRect().left) + 'px';
    element.style.top = ((vcenterline.getBoundingClientRect().height / 2) - vcenterline.getBoundingClientRect().top) + 'px';


    /*if(lastelementadded){
    element.style.top = ((lastelementadded.offsetTop + lastelementadded.getBoundingClientRect().height) + 15) + 'px';
}*/

document.getElementsByClassName('previewsite')[0].appendChild(element);
}

self.updateLastElementAdded();
//Globals.window.body.prepend(element);
}

Globals.pageHandler.tools.exitTool('add-element');
}
}
