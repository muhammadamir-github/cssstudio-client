class WebPageBuilderTools{
    constructor(){
        this.total_elements_selected_to_add = 0;
    }

    load(){
        const self = this;

        let toolsdiv = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "wpb_tools" ],
            children: (() => {
                return [
                    { name: "add-element", text: "Add Elements", class: "wpb_tool_ae", icon: "fas fa-plus", isInitiallyUnavailable: false, },
                    { name: "remove-element", text: "Remove Elements", class: "wpb_tool_re", icon: "fas fa-trash", isInitiallyUnavailable: true, },
                    { name: "duplicate-element", text: "Duplicate Elements", class: "wpb_tool_de", icon: "fas fa-clone", isInitiallyUnavailable: true, },
                    { name: "style-element", text: "Style Elements", class: "wpb_tool_se", icon: "fas fa-paint-brush", isInitiallyUnavailable: true, },
                    { name: "change-font", text: "Change Font", class: "wpb_tool_cf", icon: "fas fa-font", isInitiallyUnavailable: true, },
                    { name: "background-image", text: "Image Manager", class: "wpb_tool_bgi", icon: "fas fa-image", isInitiallyUnavailable: true, },
                    { name: "video-manager", text: "Video Manager", class: "wpb_tool_vmi", icon: "fas fa-video", isInitiallyUnavailable: true, },
                    { name: "resize-page", text: "Resize Page", class: "wpb_tool_rp", icon: "fas fa-arrows-alt-v", isInitiallyUnavailable: false, },
                    { name: "toggle-gridlines", text: "Show GridLines", class: "wpb_tool_tgl", icon: "fas fa-th-large", isInitiallyUnavailable: false, },
                    { name: "settings", text: "Settings", class: "wpb_tool_s", icon: "fas fa-cog", isInitiallyUnavailable: false, },
                ].map((x,i) => {
                    return {
                        type: "div",
                        classes: [ x.class ],
                        style: x.isInitiallyUnavailable ? {
                            opacity: "0.4",
                            pointerEvents: "none"
                        } : null,
                        listeners: {
                            click: function(){
                                self.toolClicked(x.name);
                            }
                        },
                        children: [
                            {
                                type: "i",
                                classes: x.icon.split(" "),
                            },
                            {
                                type: "span",
                                classes: [ "wpb_tools_tooltip" ],
                                text: x.text,
                            }
                        ]
                    }
                });
            })(),
        });
    }

    toolClicked(toolName){
        const self = this;
        if(toolName == 'resize-page'){
            var previewsite = document.getElementsByClassName('previewsite')[0];

            let resizers = Globals.elements.new({
                type: "div",
                parent: previewsite,
                classes: [ "resizers" ],
                children: [
                    {
                        type: "div",
                        classes: [ "bottom-resizer" ],
                        listeners: {
                            mousedown: function(e){
                                Globals.pageHandler.site.resize(e);
                            },
                            mouseup: function(e){
                                Globals.pageHandler.site.stopResizeDrag(e);
                            }
                        }
                    }
                ]
            })

            this.updateToolButton(toolName);
        }else{
            if(toolName == 'add-element'){
                self.total_elements_selected_to_add = 0;

                let elementmanager = Globals.elements.new({
                    type: "div",
                    parent: Globals.window.body,
                    id: "element-manager",
                    children: [
                        {
                            type: "p",
                            classes: [ "heading" ],
                            text: "Add Elements",
                        },
                        {
                            type: "div",
                            id: "em-sidebar",
                            children: [
                                {
                                    type: "ul",
                                    children: [
                                        ...(() => {
                                            return [
                                                {
                                                    text: "Create New",
                                                    classes: [ "selected_li" ],
                                                    listeners: {
                                                        click: function(){
                                                            let section1 = document.getElementById("wpb_ae_createnewelement");
                                                            let section2 = document.getElementById("wpb_ae_addfromstorage");
                                                            let section3 = document.getElementById("wpb_ae_readymadeelements");

                                                            section1.style.display = 'inline-block';
                                                            section2.style.display = 'none';
                                                            section3.style.display = 'none';

                                                            [...this.parentElement.getElementsByTagName("li")].forEach(x => {
                                                                x.classList.remove("selected_li");
                                                            });

                                                            this.classList.add('selected_li');
                                                        }
                                                    }
                                                },
                                                {
                                                    text: "Add From Storage",
                                                    classes: [],
                                                    listeners: {
                                                        click: function(){
                                                            let section1 = document.getElementById("wpb_ae_createnewelement");
                                                            let section2 = document.getElementById("wpb_ae_addfromstorage");
                                                            let section3 = document.getElementById("wpb_ae_readymadeelements");

                                                            section2.style.display = 'inline-block';
                                                            section1.style.display = 'none';
                                                            section3.style.display = 'none';

                                                            [...this.parentElement.getElementsByTagName("li")].forEach(x => {
                                                                x.classList.remove("selected_li");
                                                            });

                                                            this.classList.add('selected_li');
                                                        }
                                                    }
                                                },
                                                {
                                                    text: "Ready Made Elements",
                                                    classes: [],
                                                    listeners: {
                                                        click: function(){
                                                            let section1 = document.getElementById("wpb_ae_createnewelement");
                                                            let section2 = document.getElementById("wpb_ae_addfromstorage");
                                                            let section3 = document.getElementById("wpb_ae_readymadeelements");

                                                            section2.style.display = 'none';
                                                            section1.style.display = 'none';
                                                            section3.style.display = 'inline-block';

                                                            [...this.parentElement.getElementsByTagName("li")].forEach(x => {
                                                                x.classList.remove("selected_li");
                                                            });

                                                            this.classList.add('selected_li');
                                                        }
                                                    }
                                                }
                                            ].map((x, i) => {
                                                return {
                                                    type: 'li',
                                                    text: x.text,
                                                    classes: x.classes,
                                                    listeners: x.listeners,
                                                }
                                            })
                                        })(),
                                        {
                                            type: "button",
                                            text: "Add Selected Elements",
                                            listeners: {
                                                click: function(){
                                                    Globals.pageHandler.site.addElements();
                                                }
                                            }
                                        },
                                        ...(() => {
                                            return [
                                                { id: "wpb_ae_createnewelement", style: {}, },
                                                { id: "wpb_ae_addfromstorage", style: { display: "none" }, },
                                                { id: "wpb_ae_readymadeelements", style: { display: "none" }, }
                                            ].map((x, i) => {
                                                return {
                                                    type: 'div',
                                                    id: x.id,
                                                    classes: [ "section" ],
                                                    style: x.style,
                                                }
                                            })
                                        })(),
                                    ]
                                }
                            ]
                        }
                    ]
                });

                Globals.pageHandler.userInterface.Add_CreateNewElement_Preview('button');
                Globals.pageHandler.userInterface.Add_CreateNewElement_Preview('div');
                Globals.pageHandler.userInterface.Add_CreateNewElement_Preview('textinput');
                Globals.pageHandler.userInterface.Add_CreateNewElement_Preview('textarea');
                Globals.pageHandler.userInterface.Add_CreateNewElement_Preview('heading');
                Globals.pageHandler.userInterface.Add_CreateNewElement_Preview('paragraph');
                Globals.pageHandler.userInterface.Add_CreateNewElement_Preview('youtubevideo');
                Globals.pageHandler.userInterface.Add_CreateNewElement_Preview('video');
                Globals.pageHandler.userInterface.Add_CreateNewElement_Preview('image');
                Globals.pageHandler.userInterface.Add_CreateNewElement_Preview('icon');
                Globals.pageHandler.userInterface.Add_CreateNewElement_Preview('checkbox');

                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview_Type_Heading('Navigation Bars');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('topnavbar');

                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview_Type_Heading('Image Galleries');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('imageGallary1');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('imageGallary2');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('imageGallary3');

                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview_Type_Heading('Image Sliders');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('imageSlider1');

                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview_Type_Heading('Image Viewers');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('imageViewer1');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('imageViewer2');

                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview_Type_Heading('Checkboxes');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('checkbox1');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('checkbox2');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('checkbox3');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('checkbox4');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('checkbox5');

                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview_Type_Heading('Toggle Switches');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('toggleSwitch1');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('toggleSwitch2');

                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview_Type_Heading('Dropdown Lists');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('dropdownList1');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('dropdownList2');

                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview_Type_Heading('Textboxes');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('textBox1');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('textBox2');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('textBox3');

                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview_Type_Heading('Ratings');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('ratings1');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('ratings2');

                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview_Type_Heading('Video Players');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('videoPlayer1');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('videoPlayer2');

                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview_Type_Heading('Video Playlists');
                Globals.pageHandler.userInterface.Add_ReadyMadeElement_Preview('videoPlaylist1');


                this.updateToolButton(toolName);
            }else{
                if(toolName == 'style-element'){
                    Globals.pageHandler.styler.open();
                    this.updateToolButton(toolName);
                }else{
                    if(toolName == 'remove-element'){
                        this.updateToolButton(toolName);
                    }else{
                        if(toolName == 'change-font'){
                            Globals.pageHandler.fontmanager.open();
                            this.updateToolButton(toolName);
                        }else{
                            if(toolName == 'background-image'){
                                $('.selElForImgPik').removeClass('selElForImgPik');
                                $('.selElForImgPik_invoker').removeClass('selElForImgPik_invoker');
                                Globals.pageHandler.backgroundImageManager.open();
                                this.updateToolButton(toolName);
                            }else{
                                if(toolName == 'toggle-gridlines'){
                                    if(document.getElementsByClassName('vcenterline')[0].style.backgroundColor == 'transparent' || document.getElementsByClassName('hcenterline')[0].style.backgroundColor == 'transparent'){
                                        Globals.pageHandler.userInterface.showCenterLines('vertical');
                                        Globals.pageHandler.userInterface.showCenterLines('horizontal');
                                    }else{
                                        Globals.pageHandler.userInterface.hideCenterLines('vertical');
                                        Globals.pageHandler.userInterface.hideCenterLines('horizontal');
                                    }
                                    this.updateToolButton(toolName);
                                }else{
                                    if(toolName == 'video-manager'){
                                        Globals.pageHandler.VideoManager.open();
                                        this.updateToolButton(toolName);
                                    }else{
                                        if(toolName == 'duplicate-element'){
                                            Globals.pageHandler.elementDuplicator.duplicate();
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

    updateToolButton(toolName){
        const self = this;
        var webpagetools = document.getElementsByClassName('wpb_tools')[0].getElementsByTagName('div');
        var classname = '';
        var showtick = 0;
        var tooltiptext = '';
        var newiconClass = '';

        if(toolName == 'resize-page'){
            classname = 'wpb_tool_rp';
            showtick = 1;
            tooltiptext = 'Done Resizing';
        }else{
            if(toolName == 'add-element'){
                classname = 'wpb_tool_ae';
                showtick = 1;
                tooltiptext = 'Done Adding Elements';
            }else{
                if(toolName == 'style-element'){
                    classname = 'wpb_tool_se';
                    showtick = 1;
                    tooltiptext = 'Done Styling Element';
                }else{
                    if(toolName == 'remove-element'){
                        classname = 'wpb_tool_re';
                        showtick = 1;
                        tooltiptext = 'Are you sure to delete the selected element?';
                    }else{
                        if(toolName == 'change-font'){
                            classname = 'wpb_tool_cf';
                            showtick = 1;
                            tooltiptext = 'Done Changing Font';
                        }else{
                            if(toolName == 'background-image'){
                                classname = 'wpb_tool_bgi';
                                showtick = 1;
                                tooltiptext = 'Done Changing Image';
                            }else{
                                if(toolName == 'toggle-gridlines'){
                                    classname = 'wpb_tool_tgl';
                                    showtick = 0;
                                    if(document.getElementsByClassName('vcenterline')[0].style.backgroundColor == 'transparent' || document.getElementsByClassName('hcenterline')[0].style.backgroundColor == 'transparent'){
                                        tooltiptext = 'Show GridLines';
                                        newiconClass = 'fas fa-th-large';
                                    }else{
                                        tooltiptext = 'Hide GridLines';
                                        newiconClass = 'fas fa-ban';
                                    }
                                }else{
                                    if(toolName == 'video-manager'){
                                        classname = 'wpb_tool_vmi';
                                        showtick = 1;
                                        tooltiptext = 'Done Changing Video';
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        for(var i=0; i<webpagetools.length; i++){
            if(webpagetools[i].className == classname){

                webpagetools[i].getElementsByTagName('span')[0].innerText = tooltiptext;

                if(showtick == 1){
                    webpagetools[i].getElementsByTagName('i')[0].className = 'fas fa-check';
                    webpagetools[i].getElementsByTagName('i')[0].style.color = '#00b700';
                }else{
                    webpagetools[i].getElementsByTagName('i')[0].className = newiconClass;
                }

                if(classname !== 'wpb_tool_tgl'){
                    var new_element = webpagetools[i].cloneNode(true);
                    webpagetools[i].parentNode.replaceChild(new_element, webpagetools[i]);

                    new_element.addEventListener('click',function(){
                        self.exitTool(toolName);
                    });
                }

            }else{
                if(classname !== 'wpb_tool_tgl'){
                    webpagetools[i].style.opacity = 0.4;
                    webpagetools[i].style.pointerEvents = 'none';
                }
            }
        }

    }

    exitTool(toolName){
        const self = this;
        var webpagetools = document.getElementsByClassName('wpb_tools')[0].getElementsByTagName('div');
        var classname = '';
        var iclass = '';
        var tooltiptext = '';

        if(toolName == 'resize-page'){
            classname = 'wpb_tool_rp';
            iclass = 'fas fa-arrows-alt-v';
            tooltiptext = 'Resize Page';
        }else{
            if(toolName == 'add-element'){
                classname = 'wpb_tool_ae';
                iclass = 'fas fa-plus';
                tooltiptext = 'Add Elements';
            }else{
                if(toolName == 'style-element'){
                    classname = 'wpb_tool_se';
                    iclass = 'fas fa-paint-brush';
                    tooltiptext = 'Style Element';
                }else{
                    if(toolName == 'remove-element'){
                        classname = 'wpb_tool_re';
                        iclass = 'fas fa-trash';
                        tooltiptext = 'Remove Element';
                    }else{
                        if(toolName == 'change-font'){
                            classname = 'wpb_tool_cf';
                            iclass = 'fas fa-font';
                            tooltiptext = 'Change Font';
                        }else{
                            if(toolName == 'background-image'){
                                classname = 'wpb_tool_bgi';
                                iclass = 'fas fa-image';
                                tooltiptext = 'Image Manager';
                            }else{
                                if(toolName == 'video-manager'){
                                    classname = 'wpb_tool_vmi';
                                    iclass = 'fas fa-video';
                                    tooltiptext = 'Video Manager';
                                }
                            }
                        }
                    }
                }
            }
        }

        for(var i=0; i<webpagetools.length; i++){
            if(webpagetools[i].className == classname){

                webpagetools[i].getElementsByTagName('i')[0].className = iclass;
                webpagetools[i].getElementsByTagName('i')[0].style.color = 'white';
                webpagetools[i].getElementsByTagName('span')[0].innerText = tooltiptext;

                if(toolName == 'resize-page'){
                    $('.resizers').remove();
                }else{
                    if(toolName == 'add-element'){
                        var em = document.getElementById('element-manager');
                        em.remove();

                    }else{
                        if(toolName == 'style-element'){
                            Globals.pageHandler.styler.close();
                        }else{
                            if(toolName == 'remove-element'){
                                document.getElementsByClassName('selected')[0].remove();
                                document.getElementsByClassName(classname)[0].style.opacity = '0.4';
                                document.getElementsByClassName(classname)[0].style.pointerEvents = 'none';
                                $('.selectedSpecialOptions, .eResizer').remove();

                                Globals.pageHandler.site.updateLastElementAdded();
                            }else{
                                if(toolName == 'change-font'){
                                    Globals.pageHandler.fontmanager.close();
                                }else{
                                    if(toolName == 'background-image'){
                                        Globals.pageHandler.backgroundImageManager.close();
                                    }else{
                                        if(toolName == 'video-manager'){
                                            Globals.pageHandler.VideoManager.close();
                                        }
                                    }
                                }
                            }
                        }
                    }
                }

                var new_element = webpagetools[i].cloneNode(true);
                webpagetools[i].parentNode.replaceChild(new_element, webpagetools[i]);

                new_element.addEventListener('click',function(){
                    self.toolClicked(toolName);
                });

            }else{
                if(webpagetools[i].classList.contains('wpb_tool_se') || webpagetools[i].classList.contains('wpb_tool_re') || webpagetools[i].classList.contains('wpb_tool_cf') || webpagetools[i].classList.contains('wpb_tool_bgi') || webpagetools[i].classList.contains('wpb_tool_vmi') || webpagetools[i].classList.contains('wpb_tool_de')){
                    if(document.getElementsByClassName('selected')[0] == null){

                    }else{
                        if(webpagetools[i].classList.contains('wpb_tool_vmi')){
                            if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video-overlay' || $(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video' || $(document.getElementsByClassName('selected')[0]).attr('data-e-type').includes('video-player') || $(document.getElementsByClassName('selected')[0]).attr('data-e-type').includes('video-playlist')){
                                webpagetools[i].style.opacity = 1;
                                webpagetools[i].style.pointerEvents = 'unset';
                            }
                        }else{
                            webpagetools[i].style.opacity = 1;
                            webpagetools[i].style.pointerEvents = 'unset';
                        }
                    }
                }else{
                    webpagetools[i].style.opacity = 1;
                    webpagetools[i].style.pointerEvents = 'unset';
                }
            }
        }

    }
}
