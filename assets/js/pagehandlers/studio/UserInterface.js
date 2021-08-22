class UserInterface{
    constructor(){
        this.total_elements_selected_to_add = 0;
    }

    greetUser(){
        var question = document.createElement('p');
        var button1 = document.createElement('button');
        var button2 = document.createElement('button');

        button1.setAttribute('class','cneelementbtn');
        button2.setAttribute('class','cnpagebtn');
        question.setAttribute('class','wtcquestion');

        button1.innerText = 'New Element';
        button2.innerText = 'New Page';
        question.innerText = 'What do you want to create today?';

        button1.addEventListener('click',function(){
            question.remove();
            button2.remove();
            this.remove();

            Globals.pageHandler.progressLoader.show();
            
            setTimeout(function(){
                Globals.pageHandler.progressLoader.hide();

                Globals.pageHandler.elementPanel.start();

            },1);

        });

        button2.addEventListener('click',function(){
            question.remove();
            button1.remove();
            this.remove();

            document.getElementsByTagName('billy')[0].remove();
            document.getElementsByTagName('callbilly')[0].remove();

            var elementPosition = document.createElement('span');
            elementPosition.className = 'elPos';
            elementPosition.innerText = '0%';

            var pageCenterPosition = document.createElement('span');
            pageCenterPosition.className = 'pcPos';
            pageCenterPosition.innerText = '';

            Globals.window.body.appendChild(elementPosition);
            Globals.window.body.appendChild(pageCenterPosition);

            Globals.pageHandler.progressLoader.show();

            setTimeout(function(){
                Globals.pageHandler.progressLoader.hide();

                Globals.pageHandler.pagebuilder.start();

            },1);

        });

        Globals.window.body.appendChild(question);
        Globals.window.body.appendChild(button1);
        Globals.window.body.appendChild(button2);
    }

    selectNewElementToCreate(e){
        const self = this;
        if(e.className !== 'selected_element'){
            e.className = 'selected_element';
            self.total_elements_selected_to_add = self.total_elements_selected_to_add + 1;
        }else{
            e.className = 'wpb_ae_element_preview';
            self.total_elements_selected_to_add = self.total_elements_selected_to_add - 1;
        }

        if(self.total_elements_selected_to_add !== 0 && self.total_elements_selected_to_add > 0){
            document.getElementById('em-sidebar').getElementsByTagName('button')[0].style.display = 'block';
            document.getElementById('em-sidebar').getElementsByTagName('button')[0].innerText = 'Add Selected Elements ('+self.total_elements_selected_to_add+')';
        }else{
            document.getElementById('em-sidebar').getElementsByTagName('button')[0].style.display = 'none';
            document.getElementById('em-sidebar').getElementsByTagName('button')[0].innerText = 'Add Selected Elements ('+self.total_elements_selected_to_add+')';
        }

    }

    selectNewReadyMadeElement(e){
        const self = this;
        if(e.classList.contains('selected_element_readymade') == false){
            e.classList.add('selected_element_readymade');
            self.total_elements_selected_to_add = self.total_elements_selected_to_add + 1;
        }else{
            e.classList.remove('selected_element_readymade');
            self.total_elements_selected_to_add = self.total_elements_selected_to_add - 1;
        }

        if(self.total_elements_selected_to_add !== 0 && self.total_elements_selected_to_add > 0){
            document.getElementById('em-sidebar').getElementsByTagName('button')[0].style.display = 'block';
            document.getElementById('em-sidebar').getElementsByTagName('button')[0].innerText = 'Add Selected Elements ('+self.total_elements_selected_to_add+')';
        }else{
            document.getElementById('em-sidebar').getElementsByTagName('button')[0].style.display = 'none';
            document.getElementById('em-sidebar').getElementsByTagName('button')[0].innerText = 'Add Selected Elements ('+self.total_elements_selected_to_add+')';
        }
    }

    Add_ReadyMadeElement_Preview_Type_Heading(text){
        var heading = document.createElement('span');
        heading.className = 'elementTypeHeading';
        heading.innerText = text;
        document.getElementById('wpb_ae_readymadeelements').appendChild(heading);
    }

    Add_ReadyMadeElement_Preview(type){
        const self = this;
        var boxtype, elementinnertext, labelinnertext, element, elementclass;
        var box;

        if(type == 'topnavbar'){
            boxtype = 'horizontal-long';
            labelinnertext = 'Top NavBar';
        }

        if(type.includes('imageGallary')){
            boxtype = 'half-width-cube';

            if(type.includes('1')){
                labelinnertext = 'Image Gallery 1';
            }else{
                if(type.includes('2')){
                    labelinnertext = 'Image Gallery 2';
                }else{
                    if(type.includes('3')){
                        labelinnertext = 'Image Gallery 3';
                    }
                }
            }
        }

        if(type.includes('imageViewer')){
            boxtype = 'full-width-cube';

            if(type.includes('1')){
                labelinnertext = 'Image Viewer 1';
            }else{
                if(type.includes('2')){
                    labelinnertext = 'Image Viewer 2';
                }
            }
        }

        if(type.includes("imageSlider")){
            boxtype = 'half-width-cube';

            if(type.includes('1')){
                labelinnertext = 'Image Slider 1';
            }
        }

        if(type.includes("checkbox")){
            boxtype = "half-width-cube";

            if(type.includes("1")){
                labelinnertext = "Checkbox 1";
            }else{
                if(type.includes("2")){
                    labelinnertext = "Checkbox 2";
                }else{
                    if(type.includes("3")){
                        labelinnertext = "Checkbox 3";
                    }else{
                        if(type.includes("4")){
                            labelinnertext = "Checkbox 4";
                        }else{
                            if(type.includes("5")){
                                labelinnertext = "Checkbox 5";
                            }
                        }
                    }
                }
            }
        }

        if(type.includes("toggleSwitch")){
            boxtype = "half-width-cube";

            if(type.includes("1")){
                labelinnertext = "Toggle Switch 1";
            }else{
                if(type.includes("2")){
                    labelinnertext = "Toggle Switch 2";
                }
            }
        }

        if(type.includes("dropdownList")){
            boxtype = "half-width-cube";

            if(type.includes("1")){
                labelinnertext = "Dropdown List 1";
            }else{
                if(type.includes("2")){
                    labelinnertext = "Dropdown List 2";
                }
            }
        }

        if(type.includes("textBox")){
            boxtype = "half-width-cube";

            if(type.includes("1")){
                labelinnertext = "Textbox 1";
            }else{
                if(type.includes("2")){
                    labelinnertext = "Textbox 2";
                }else{
                    if(type.includes("3")){
                        labelinnertext = "Textbox 3";
                    }
                }
            }
        }

        if(type.includes("ratings")){
            boxtype = "half-width-cube";

            if(type.includes("1")){
                labelinnertext = "Ratings 1";
            }else{
                if(type.includes("2")){
                    labelinnertext = "Ratings 2";
                }
            }
        }

        if(type.includes("videoPlayer")){
            boxtype = "half-width-cube";

            if(type.includes("1")){
                labelinnertext = "Video Player 1";
            }else{
                if(type.includes("2")){
                    labelinnertext = "Video Player 2";
                }else{
                    if(type.includes("3")){
                        labelinnertext = "Video Player 3";
                    }
                }
            }
        }

        if(type.includes("videoPlaylist")){
            boxtype = "half-width-cube";

            if(type.includes("1")){
                labelinnertext = "Video Playlist 1";
            }else{
                if(type.includes("2")){
                    labelinnertext = "Video Playlist 2";
                }else{
                    if(type.includes("3")){
                        labelinnertext = "Video Playlist 3";
                    }
                }
            }
        }


        //--------------------

        box = document.createElement('div');
        if(boxtype == 'horizontal-long'){
            box.className = 'horizontal-long-box';
        }else{
            if(boxtype == 'half-width-cube'){
                box.className = 'half-width-cube-box';
            }else{
                if(boxtype == 'full-width-cube'){
                    box.className = 'full-width-cube-box';
                }
            }
        }

        box.addEventListener('click',function(){
            self.selectNewReadyMadeElement(this);
        });

        var label = document.createElement('span');
        label.innerText = labelinnertext;
        box.appendChild(label);

        //box.appendChild(element);

        document.getElementById('wpb_ae_readymadeelements').appendChild(box);
    }

    Add_CreateNewElement_Preview(type){
        const self = this;
        var elementinnertext, labelinnertext, element;

        if(type == 'image'){
            element = document.createElement('img');
            labelinnertext = 'Image';
        }else{
            if(type == 'youtubevideo' || type == 'video'){
                element = document.createElement('video');
                element.setAttribute('controls','');
                if(type == 'youtubevideo'){labelinnertext = 'Video';}else{if(type == 'video'){labelinnertext = 'Video';}};
            }else{
                if(type == 'paragraph'){
                    labelinnertext = 'Paragraph';
                    element = document.createElement('p');
                    elementinnertext = ' Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean iaculis lacinia ex at porta. Duis in metus ac lectus cursus scelerisque. Nam interdum velit ut felis condimentum malesuada.';
                }else{
                    if(type == 'heading'){
                        element = document.createElement('h3');
                        elementinnertext = ' Heading';
                        labelinnertext = 'Heading';
                    }else{
                        if(type == 'button'){
                            element = document.createElement('button');
                            elementinnertext = ' Button';
                            labelinnertext = 'Button';
                        }else{
                            if(type == 'textinput'){
                                element = document.createElement('input');
                                elementinnertext = ' Text Input';
                                labelinnertext = 'Text Input';
                            }else{
                                if(type == 'div'){
                                    element = document.createElement('div');
                                    elementinnertext = ' Div';
                                    labelinnertext = 'Div';
                                }else{
                                    if(type == 'textarea'){
                                        element = document.createElement('textarea');
                                        elementinnertext = ' TextArea';
                                        labelinnertext = 'TextArea';
                                    }else{
                                        if(type == 'icon'){
                                            element = document.createElement('i');
                                            element.className = 'fab fa-font-awesome';
                                            element.style.padding = '10px';
                                            element.style.color = 'black';
                                            element.style.fontSize = '35px';
                                            element.style.left = '50%';
                                            element.style.top = '60%';
                                            element.style.position = 'absolute';
                                            element.style.transform = 'translate(-50%,-60%)';
                                            labelinnertext = 'Icon';
                                        }else{
                                            if(type == "checkbox"){
                                                element = document.createElement('input');
                                                element.type = "checkbox";
                                                element.setAttribute("checked","checked");
                                                element.style.left = '50%';
                                                element.style.top = '60%';
                                                element.style.position = 'absolute';
                                                element.style.transform = 'translate(-50%,-60%)';
                                                labelinnertext = 'Checkbox';
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

        if(elementinnertext !== null){
            if(type == 'textinput' || type == 'textarea'){
                element.value = elementinnertext;
            }else{
                if(type == 'video' || type == 'image' || type == 'icon'){

                }else{
                    element.innerText = elementinnertext;
                }
            }
        }

        var box = document.createElement('div');
        box.className = 'wpb_ae_element_preview';

        box.addEventListener('click',function(){
            self.selectNewElementToCreate(this);
        });

        var label = document.createElement('span');
        label.innerText = labelinnertext;

        if(type == 'youtubevideo'){
            var ytLogo = document.createElement("img");
            ytLogo.src = "../assets/images/yt_logo_rgb_dark.png";
            ytLogo.className = "ytLogo";

            $(label).prepend(ytLogo);
        }

        box.appendChild(label);

        box.appendChild(element);
        document.getElementById('wpb_ae_createnewelement').appendChild(box);
    }

    displayKeyGuide(){
        var hint_arrows = document.createElement('div');
        hint_arrows.className = 'hint_element_move';

        var hint_leftarrow_i = document.createElement('i');
        var hint_rightarrow_i = document.createElement('i');
        hint_rightarrow_i.className = 'fas fa-arrow-right';
        hint_leftarrow_i.className = 'fas fa-arrow-left';

        var hint_toparrow_i = document.createElement('i');
        var hint_bottomarrow_i = document.createElement('i');
        hint_toparrow_i.className = 'fas fa-arrow-up';
        hint_bottomarrow_i.className = 'fas fa-arrow-down';

        var hint_arrows_p = document.createElement('p');
        hint_arrows_p.innerText = 'Press Arrow Keys Or Drag Element To Move It';

        hint_arrows.appendChild(hint_leftarrow_i);
        hint_arrows.appendChild(hint_rightarrow_i);
        hint_arrows.appendChild(hint_toparrow_i);
        hint_arrows.appendChild(hint_bottomarrow_i);
        hint_arrows.appendChild(hint_arrows_p);

        var hint_escapekey = document.createElement('div');
        hint_escapekey.className = 'hint_element_exit';

        var hint_esc_spanIcon = document.createElement('span');
        hint_esc_spanIcon.innerText = 'ESC';

        var hint_esc_p = document.createElement('p');
        hint_esc_p.innerText = 'Press Escape Key To Disselect Element';

        hint_escapekey.appendChild(hint_esc_spanIcon);
        hint_escapekey.appendChild(hint_esc_p);

        Globals.window.body.appendChild(hint_arrows);
        Globals.window.body.appendChild(hint_escapekey);
    }

    hideCenterLines(axis){
        var verticalCenterLineIndicator = document.getElementsByClassName('vcenterline')[0];
        var horizontalCenterLineIndicator = document.getElementsByClassName('hcenterline')[0];

        if(axis == 'vertical'){
            verticalCenterLineIndicator.style.backgroundColor = 'transparent';
        }

        if(axis == 'horizontal'){
            horizontalCenterLineIndicator.style.backgroundColor = 'transparent';
        }
    }

    showCenterLines(axis){
        var verticalCenterLineIndicator = document.getElementsByClassName('vcenterline')[0];
        var horizontalCenterLineIndicator = document.getElementsByClassName('hcenterline')[0];

        if(axis == 'vertical'){
            verticalCenterLineIndicator.style.backgroundColor = '#e80dc7';
        }

        if(axis == 'horizontal'){
            horizontalCenterLineIndicator.style.backgroundColor = '#e80dc7';
        }
    }

    displayElementSpecialOptions(elementType){
        var element = document.getElementsByClassName('selected')[0];

        var specialOptions_div = document.createElement('div');
        specialOptions_div.className = 'selectedSpecialOptions';
        Globals.window.body.appendChild(specialOptions_div);

        //specialOptions_div.style.minHeight = element.style.height || element.style.minHeight;

        if(elementType == 'video-overlay' || elementType == 'video'){
            //var videoPlayerId = document.getElementsByClassName('selected')[0].id;

            specialOptions_div.style.top = (element.getBoundingClientRect().top + window.scrollY) + 'px';
            specialOptions_div.style.left = (element.getBoundingClientRect().left - 50) + 'px';
            specialOptions_div.style.transform = 'unset';

            this.createDisplayElementSpecialOptionsOption('fas fa-arrows-alt-h','fullWidth','Full Width');
            this.createDisplayElementSpecialOptionsOption('fas fa-arrows-alt-v','fullHeight','Full Height');

            if(elementType == 'video'){
                this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','showControls','Show Controls');
            }

        }else{
            specialOptions_div.style.top = (element.getBoundingClientRect().top + window.scrollY) + 'px';
            specialOptions_div.style.left = (element.getBoundingClientRect().left - 50) + 'px';
            specialOptions_div.style.transform = 'unset';

            if(elementType !== 'image' && elementType !== 'icon' && elementType !== "checkbox" && !elementType.includes("video-player")){
                this.createDisplayElementSpecialOptionsOption('fas fa-pen-alt','editElement','Edit Element');
            }

        }

        if(elementType == 'image'){
            this.createDisplayElementSpecialOptionsOption('fas fa-arrows-alt-h','fullWidth','Full Width');
            this.createDisplayElementSpecialOptionsOption('fas fa-arrows-alt-v','fullHeight','Full Height');
        }

        if(elementType == 'heading' || elementType == 'paragraph'){
            this.createDisplayElementSpecialOptionsOption('fas fa-arrows-alt-h','fullWidth','Full Width');
        }

        if(elementType == 'icon'){
            this.createDisplayElementSpecialOptionsOption("fab fa-font-awesome",'changeIcon','Change Icon');
        }

        //if(elementType == 'video' || elementType == 'video-overlay'){
        //this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','showControls','Show Controls');
        //}

        if(elementType.includes('gallery') || elementType.includes("slider")){
            this.createDisplayElementSpecialOptionsOption("fas fa-circle",'switchImageShape','Switch Image Shape');
        }

        if(elementType.includes('viewer')){
            this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleFullScreeOption','Disable Full Screen Option');

            if(elementType.includes("one")){
                this.createDisplayElementSpecialOptionsOption("fas fa-arrow-left",'switchThumbnailsPosition','Switch Thumbnails Position');
                this.createDisplayElementSpecialOptionsOption('fas fa-arrows-alt-h','fullWidth','Full Width');
                this.createDisplayElementSpecialOptionsOption('fas fa-arrows-alt-v','fullHeight','Full Height');
            }

            if(elementType.includes("two")){
                this.createDisplayElementSpecialOptionsOption('fas fa-exchange-alt','switchImgViewer2Location','Switch Viewer Location');
                this.createDisplayElementSpecialOptionsOption('fas fa-sort','switchImgViewer2BtnLocation','Switch Button Location');
            }

        }

        if(elementType.includes("video-playlist")){
            if(elementType == "video-playlist-one"){
                this.createDisplayElementSpecialOptionsOption('fas fa-exchange-alt','switchVideoPlaylistListLocation','Switch List Location');
            }
        }

        if(elementType.includes("video-player")){
            if(elementType == "video-player-two"){
                this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleVideoPlayer2FullScreenOption','Disable Full Screen Option');
                this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleVideoPlayer2FrwdBwdOption','Disable Forward-Backward Option');
                this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleVideoPlayer2NightModeOption','Disable Night Mode Option');
            }else{
                if(elementType == "video-player-one"){
                    this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleVideoPlayer1FullScreenOption','Disable Full Screen Option');
                    this.createDisplayElementSpecialOptionsOption('fas fa-exchange-alt','switchImgViewer1InfoStyle','Switch Video Information Style');
                }
            }

            this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleVideoPlayerInfo','Disable Video Information');
        }

        if(elementType == "checkbox-multi-one" || elementType == "checkbox-multi-two"){
            this.createDisplayElementSpecialOptionsOption('fas fa-circle','switchMultiCheckboxShape','Switch Checkbox Shape');
            this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleMultiCheckboxText','Disable Checkbox Text');
            this.createDisplayElementSpecialOptionsOption('fas fa-circle','switchMultiCheckboxCheckMarkShape','Switch Checkmark Shape');

            this.createDisplayElementSpecialOptionsOption('fas fa-paint-brush','showStyles','Styles');
        }else{
            if(elementType.includes("checkbox")){
                this.createDisplayElementSpecialOptionsOption('fas fa-circle','switchCheckboxShape','Switch Shape');
                this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleCheckboxAndToggleSwitchText','Disable Text');

                this.createDisplayElementSpecialOptionsOption('fas fa-paint-brush','showStyles','Styles');
            }
        }

        if(elementType.includes("toggle-switch")){
            this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleCheckboxAndToggleSwitchText','Disable Text');
            this.createDisplayElementSpecialOptionsOption('fas fa-paint-brush','showStyles','Styles');
        }

        if(elementType.includes("dropdown-list")){
            this.createDisplayElementSpecialOptionsOption('fas fa-paint-brush','showStyles','Styles');
        }

        if(elementType.includes("textbox")){
            if(elementType.includes("two")){
                this.createDisplayElementSpecialOptionsOption('fas fa-exchange-alt','switchTextbox2TextLocation','Switch Text Location');
            }

            if(elementType.includes("one") || elementType.includes("three")){
                this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleTextboxBorder','Disable Border');
            }

            this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleTextboxCharacterLimitText','Disable Character Limit Text');
            this.createDisplayElementSpecialOptionsOption('fas fa-toggle-on','toggleTextboxIcon','Disable Icon');
        }

        if(!elementType.includes('gallery') && !elementType.includes('navbar') && !elementType.includes('slider') && elementType !== "image-viewer-two" && !elementType.includes("checkbox") && !elementType.includes("toggle-switch") && !elementType.includes('dropdown-list')){
            this.createDisplayElementSpecialOptionsOption('fas fa-arrows-alt','resizeElement','Resize');
        }

    }

    createDisplayElementSpecialOptionsOption(icon,type,text){
        var specialOptions_div = document.getElementsByClassName('selectedSpecialOptions')[0];

        var optionDiv = document.createElement('div');
        optionDiv.setAttribute('class','wpb_e_special_option');

        var option = document.createElement('i');
        option.className = icon;

        var option_tooltip = document.createElement('span');
        option_tooltip.setAttribute('class','wpb_e_special_option_tooltip');
        option_tooltip.innerText = text;

        if(type == 'editElement'){
            option.addEventListener('click',function(){
                if(document.getElementsByClassName('elementEditor')[0]){
                    Globals.pageHandler.elementEditor.close();
                }else{
                    Globals.pageHandler.elementEditor.show();
                }
            });
        }

        if(type == 'showControls'){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.showControls);
        }

        if(type == 'resizeElement'){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.optionClicked);
        }

        if(type == 'fullWidth' || type == 'fullHeight'){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.optionClicked);
        }

        if(type == 'changeIcon'){
            option.addEventListener('click',fontAwesomeSelector.show);
        }

        if(type == 'switchImageShape'){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.switchImageShape);
        }

        if(type == 'switchThumbnailsPosition'){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.switchThumbnailsPosition);
        }

        if(type == 'toggleFullScreeOption'){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.toggleFullScreeOption);
        }

        if(type == "switchImgViewer2Location"){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.switchImgViewer2Location);
        }

        if(type == "switchImgViewer2BtnLocation"){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.switchImgViewer2BtnLocation);
        }

        if(type == "switchCheckboxShape"){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.switchCheckboxShape);
        }

        if(type == "switchMultiCheckboxShape"){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.switchMultiCheckboxShape);
        }

        if(type == "switchMultiCheckboxCheckMarkShape"){
            option.addEventListener("click",Globals.pageHandler.elementSpecialOptionsHandler.switchMultiCheckboxCheckMarkShape);
        }

        if(type == "toggleCheckboxAndToggleSwitchText"){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.toggleCheckboxAndToggleSwitchText);
        }

        if(type == "toggleMultiCheckboxText"){
            option.addEventListener("click",Globals.pageHandler.elementSpecialOptionsHandler.toggleMultiCheckboxText);
        }

        if(type == "switchTextbox2TextLocation"){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.switchTextbox2TextLocation);
        }

        if(type == "toggleTextboxBorder"){
            option.addEventListener("click",Globals.pageHandler.elementSpecialOptionsHandler.toggleTextboxBorder);
        }

        if(type == "toggleTextboxIcon"){
            option.addEventListener("click",Globals.pageHandler.elementSpecialOptionsHandler.toggleTextboxIcon);
        }

        if(type == "toggleTextboxCharacterLimitText"){
            option.addEventListener("click",Globals.pageHandler.elementSpecialOptionsHandler.toggleTextboxCharacterLimitText);
        }

        if(type == "toggleVideoPlayer2FrwdBwdOption"){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.toggleVideoPlayer2FrwdBwdOption);
        }

        if(type == "toggleVideoPlayer2FullScreenOption"){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.toggleVideoPlayer2FullScreenOption);
        }

        if(type == "toggleVideoPlayer1FullScreenOption"){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.toggleVideoPlayer1FullScreenOption);
        }

        if(type == "toggleVideoPlayer2NightModeOption"){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.toggleVideoPlayer2NightModeOption);
        }

        if(type == "toggleVideoPlayerInfo"){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.toggleVideoPlayerInfo);
        }

        if(type == "switchImgViewer1InfoStyle"){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.switchImgViewer1InfoStyle);
        }

        if(type == "switchVideoPlaylistListLocation"){
            option.addEventListener('click',Globals.pageHandler.elementSpecialOptionsHandler.switchVideoPlaylistListLocation);
        }

        if(type == "showStyles"){
            option.addEventListener('click',function(){
                if(document.getElementsByTagName('styles')[0]){
                    Globals.pageHandler.elementStyles.close();
                }else{
                    Globals.pageHandler.elementStyles.show();
                }
            });
        }

        optionDiv.appendChild(option);
        optionDiv.appendChild(option_tooltip);
        specialOptions_div.appendChild(optionDiv);
    }
}
