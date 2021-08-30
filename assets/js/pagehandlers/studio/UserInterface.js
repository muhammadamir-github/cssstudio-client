class UserInterface{
    constructor(){
        this.total_elements_selected_to_add = 0;
    }

    greetUser(){
        let question = Globals.elements.new({
            type: "p",
            parent: Globals.window.body,
            classes: [ "wtcquestion" ],
            text: "What do you want to create today?",
        });

        let button1 = Globals.elements.new({
            type: "button",
            parent: Globals.window.body,
            classes: [ "cneelementbtn" ],
            text: "New Element",
            listeners: {
                click: function(){
                    let button2 = document.getElementsByClassName("cnpagebtn")[0];
                    question.remove();
                    button2.remove();
                    this.remove();

                    Globals.pageHandler.progressLoader.show();
                    setTimeout(function(){
                        Globals.pageHandler.progressLoader.hide();
                        Globals.pageHandler.elementPanel.start();
                    }, 1);
                }
            }
        });

        let button2 = Globals.elements.new({
            type: "button",
            parent: Globals.window.body,
            classes: [ "cnpagebtn" ],
            text: "New Page",
            listeners: {
                click: function(){
                    question.remove();
                    button1.remove();
                    this.remove();

                    document.getElementsByTagName('billy')[0].remove();
                    document.getElementsByTagName('callbilly')[0].remove();

                    let elementPosition = Globals.elements.new({
                        type: "span",
                        parent: Globals.window.body,
                        classes: [ "elPos" ],
                        text: "0%"
                    });

                    let pageCenterPosition = Globals.elements.new({
                        type: "span",
                        parent: Globals.window.body,
                        classes: [ "pcPos" ],
                        text: ""
                    });

                    Globals.pageHandler.progressLoader.show();
                    setTimeout(function(){
                        Globals.pageHandler.progressLoader.hide();
                        Globals.pageHandler.pagebuilder.start();
                    }, 1);
                }
            }
        });
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
        let heading = Globals.elements.new({
            type: "span",
            parent: document.getElementById('wpb_ae_readymadeelements'),
            classes: [ "elementTypeHeading" ],
            text: text,
        });
    }

    Add_ReadyMadeElement_Preview(type){
        const self = this;
        let boxtype, elementinnertext, labelinnertext, element, elementclass;
        let box;

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

        box = Globals.elements.new({
            type: "div",
            parent: document.getElementById('wpb_ae_readymadeelements'),
            classes: boxtype == 'horizontal-long' ? [ "horizontal-long-box" ] : boxtype == 'half-width-cube' ? [ "half-width-cube-box" ] : boxtype == 'full-width-cube' ? [ "full-width-cube-box" ] : null,
            listeners: {
                click: function(){
                    self.selectNewReadyMadeElement(this);
                }
            },
            children: [
                {
                    type: "span",
                    text: labelinnertext,
                }
            ]
        });
    }

    Add_CreateNewElement_Preview(type){
        const self = this;

        let elements = {
            "image": {
                type: "img",
            },
            "youtubevideo": {
                type: "video",
                attributes: {
                    controls: false,
                },
            },
            "video": {
                type: "video",
                attributes: {
                    controls: false,
                },
            },
            "paragraph": {
                type: "p",
                text: " Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean iaculis lacinia ex at porta. Duis in metus ac lectus cursus scelerisque. Nam interdum velit ut felis condimentum malesuada.",
            },
            "heading": {
                type: "h3",
                text: " Heading",
            },
            "button": {
                type: "button",
                text: " Button",
            },
            "textinput": {
                type: "input",
                text: " Text Input",
                attributes: {
                    value: " Text Input",
                },
            },
            "div": {
                type: "div",
                text: " Div",
            },
            "textarea": {
                type: "textarea",
                text: " TextArea",
                attributes: {
                    value: " TextArea",
                },
            },
            "icon": {
                type: "i",
                classes: [ "fab", "fa-font-awesome" ],
                style: {
                    padding: "10px",
                    color: "black",
                    fontSize: "35px",
                    left: "50%",
                    top: "60%",
                    position: "absolute",
                    transform: "translate(-50%,-60%)"
                }
            },
            "checkbox": {
                type: "input",
                attributes: {
                    type: "checkbox",
                    checked: "checked",
                },
                style: {
                    left: "50%",
                    top: "60%",
                    position: "absolute",
                    transform: "translate(-50%,-60%)%",
                }
            },
        };

        let labels = {
            "image": "Image",
            "youtubevideo": "Video",
            "video": "Video",
            "paragraph": "Paragraph",
            "heading": "Heading",
            "button": "Button",
            "textinput": "Text Input",
            "div": "Div",
            "textarea": "TextArea",
            "icon": "Icon",
            "checkbox": "Checkbox"
        };

        let box = Globals.elements.new({
            type: "div",
            parent: document.getElementById('wpb_ae_createnewelement'),
            classes: [ "wpb_ae_element_preview" ],
            listeners: {
                click: function(){
                    self.selectNewElementToCreate(this);
                }
            },
            children: [
                {
                    type: "span",
                    text: labels[type],
                    children: [
                        ...(() => {
                            return type == 'youtubevideo' ? [{
                                type: "img",
                                classes: [ "ytLogo" ],
                                attributes: {
                                    src: "../assets/images/yt_logo_rgb_dark.png"
                                },
                                prepend: true,
                            }] : [];
                        })(),
                    ]
                },
                elements[type],
            ]
        });
    }

    displayKeyGuide(){
        let hint_arrows = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "hint_element_move" ],
            children: [
                ...(() => {
                    return [
                        { class: "fas fa-arrow-right" },
                        { class: "fas fa-arrow-left" },
                        { class: "fas fa-arrow-up" },
                        { class: "fas fa-arrow-down" }
                    ].map(x => {
                        return {
                            type: "i",
                            classes: x.class.split(" "),
                        }
                    });
                })(),
                {
                    type: "p",
                    text: "Press Arrow Keys Or Drag Element To Move It"
                }
            ]
        });

        let hint_escapekey = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "hint_element_exit" ],
            children: [
                {
                    type: "span",
                    text: "ESC",
                },
                {
                    type: "p",
                    text: "Press Escape Key To Disselect The Element"
                }
            ]
        });
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

        let specialOptions_div = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "selectedSpecialOptions" ],
        });

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

        let listeners = {
            "editElement": function(){
                if(document.getElementsByClassName('elementEditor')[0]){
                    Globals.pageHandler.elementEditor.close();
                }else{
                    Globals.pageHandler.elementEditor.show();
                }
            },
            "showControls": Globals.pageHandler.elementSpecialOptionsHandler.showControls,
            "resizeElement": Globals.pageHandler.elementSpecialOptionsHandler.optionClicked,
            "fullWidth": Globals.pageHandler.elementSpecialOptionsHandler.optionClicked,
            "fullHeight": Globals.pageHandler.elementSpecialOptionsHandler.optionClicked,
            "changeIcon": Globals.pageHandler.fontAwesomeSelector.show,
            "switchImageShape": Globals.pageHandler.elementSpecialOptionsHandler.switchImageShape,
            "switchThumbnailsPosition": Globals.pageHandler.elementSpecialOptionsHandler.switchThumbnailsPosition,
            "toggleFullScreeOption": Globals.pageHandler.elementSpecialOptionsHandler.toggleFullScreeOption,
            "switchImgViewer2Location": Globals.pageHandler.elementSpecialOptionsHandler.switchImgViewer2Location,
            "switchImgViewer2BtnLocation": Globals.pageHandler.elementSpecialOptionsHandler.switchImgViewer2BtnLocation,
            "switchCheckboxShape": Globals.pageHandler.elementSpecialOptionsHandler.switchCheckboxShape,
            "switchMultiCheckboxShape": Globals.pageHandler.elementSpecialOptionsHandler.switchMultiCheckboxShape,
            "switchMultiCheckboxCheckMarkShape": Globals.pageHandler.elementSpecialOptionsHandler.switchMultiCheckboxCheckMarkShape,
            "toggleCheckboxAndToggleSwitchText": Globals.pageHandler.elementSpecialOptionsHandler.toggleCheckboxAndToggleSwitchText,
            "toggleMultiCheckboxText": Globals.pageHandler.elementSpecialOptionsHandler.toggleMultiCheckboxText,
            "switchTextbox2TextLocation": Globals.pageHandler.elementSpecialOptionsHandler.switchTextbox2TextLocation,
            "toggleTextboxBorder": Globals.pageHandler.elementSpecialOptionsHandler.toggleTextboxBorder,
            "toggleTextboxIcon": Globals.pageHandler.elementSpecialOptionsHandler.toggleTextboxIcon,
            "toggleTextboxCharacterLimitText": Globals.pageHandler.elementSpecialOptionsHandler.toggleTextboxCharacterLimitText,
            "toggleVideoPlayer2FrwdBwdOption": Globals.pageHandler.elementSpecialOptionsHandler.toggleVideoPlayer2FrwdBwdOption,
            "toggleVideoPlayer2FullScreenOption": Globals.pageHandler.elementSpecialOptionsHandler.toggleVideoPlayer2FullScreenOption,
            "toggleVideoPlayer1FullScreenOption": Globals.pageHandler.elementSpecialOptionsHandler.toggleVideoPlayer1FullScreenOption,
            "toggleVideoPlayer2NightModeOption": Globals.pageHandler.elementSpecialOptionsHandler.toggleVideoPlayer2NightModeOption,
            "toggleVideoPlayerInfo": Globals.pageHandler.elementSpecialOptionsHandler.toggleVideoPlayerInfo,
            "switchImgViewer1InfoStyle": Globals.pageHandler.elementSpecialOptionsHandler.switchImgViewer1InfoStyle,
            "switchVideoPlaylistListLocation": Globals.pageHandler.elementSpecialOptionsHandler.switchVideoPlaylistListLocation,
            "showStyles": function(){
                if(document.getElementsByTagName('styles')[0]){
                    Globals.pageHandler.elementStyles.close();
                }else{
                    Globals.pageHandler.elementStyles.show();
                }
            },
        };

        let optionDiv = Globals.elements.new({
            type: "div",
            parent: specialOptions_div,
            classes: [ "wpb_e_special_option" ],
            children: [
                {
                    type: "i",
                    classes: [ ...icon.split(" ") ],
                    listeners: {
                        click: listeners[type],
                    },
                },
                {
                    type: "span",
                    classes: [ "wpb_e_special_option_tooltip" ],
                    text,

                }
            ],
        });
    }
}
