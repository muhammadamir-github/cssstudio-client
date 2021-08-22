class WebPageBuilderTools{
    constructor(){
        this.total_elements_selected_to_add = 0;
    }

    load(){
        const self = this;
        var toolsdiv = document.createElement('div');
        toolsdiv.setAttribute('class','wpb_tools');

        var addelement_div = document.createElement('div');
        var addelement = document.createElement('i');
        var addelement_tooltip = document.createElement('span');
        addelement.setAttribute('class','fas fa-plus');
        addelement_div.setAttribute('class','wpb_tool_ae');
        addelement_tooltip.setAttribute('class','wpb_tools_tooltip');
        addelement_tooltip.innerText = 'Add Elements';
        addelement_div.addEventListener('click',function(){
            self.toolClicked('add-element');
        });

        var styleelement_div = document.createElement('div');
        var styleelement = document.createElement('i');
        var styleelement_tooltip = document.createElement('span');
        styleelement.setAttribute('class','fas fa-paint-brush');
        styleelement_div.setAttribute('class','wpb_tool_se');
        styleelement_tooltip.setAttribute('class','wpb_tools_tooltip');
        styleelement_tooltip.innerText = 'Style Element';
        styleelement_div.style.opacity = '0.4';
        styleelement_div.style.pointerEvents = 'none';
        styleelement_div.addEventListener('click',function(){
            self.toolClicked('style-element');
        });

        var resizesite_div = document.createElement('div');
        var resizesite = document.createElement('i');
        var resizesite_tooltip = document.createElement('span');
        resizesite.setAttribute('class','fas fa-arrows-alt-v');
        resizesite_div.setAttribute('class','wpb_tool_rp');
        resizesite_tooltip.setAttribute('class','wpb_tools_tooltip');
        resizesite_tooltip.innerText = 'Resize Page';
        resizesite_div.addEventListener('click',function(){
            self.toolClicked('resize-page');
        });

        var settings_div = document.createElement('div');
        var settings = document.createElement('i');
        var settings_tooltip = document.createElement('span');
        settings.setAttribute('class','fas fa-cog');
        settings_div.setAttribute('class','wpb_tool_s');
        settings_tooltip.setAttribute('class','wpb_tools_tooltip');
        settings_tooltip.innerText = 'Settings';

        var removeelement_div = document.createElement('div');
        var removeelement = document.createElement('i');
        var removeelement_tooltip = document.createElement('span');
        removeelement.setAttribute('class','fas fa-trash');
        removeelement_div.setAttribute('class','wpb_tool_re');
        removeelement_div.style.opacity = '0.4';
        removeelement_div.style.pointerEvents = 'none';
        removeelement_tooltip.setAttribute('class','wpb_tools_tooltip');
        removeelement_tooltip.innerText = 'Remove Element';
        removeelement_div.addEventListener('click',function(){
            self.toolClicked('remove-element');
        });

        var duplicateelement_div = document.createElement('div');
        var duplicateelement = document.createElement('i');
        var duplicateelement_tooltip = document.createElement('span');
        duplicateelement.setAttribute('class','fas fa-clone');
        duplicateelement_div.setAttribute('class','wpb_tool_de');
        duplicateelement_div.style.opacity = '0.4';
        duplicateelement_div.style.pointerEvents = 'none';
        duplicateelement_tooltip.setAttribute('class','wpb_tools_tooltip');
        duplicateelement_tooltip.innerText = 'Duplicate Element';
        duplicateelement_div.addEventListener('click',function(){
            self.toolClicked('duplicate-element');
        });

        var changefont_div = document.createElement('div');
        var changefont = document.createElement('i');
        var changefont_tooltip = document.createElement('span');
        changefont.setAttribute('class','fas fa-font');
        changefont_div.setAttribute('class','wpb_tool_cf');
        changefont_div.style.opacity = '0.4';
        changefont_div.style.pointerEvents = 'none';
        changefont_tooltip.setAttribute('class','wpb_tools_tooltip');
        changefont_tooltip.innerText = 'Change Font';
        changefont_div.addEventListener('click',function(){
            self.toolClicked('change-font');
        });

        var backgroundimage_div = document.createElement('div');
        var backgroundimage = document.createElement('i');
        var backgroundimage_tooltip = document.createElement('span');
        backgroundimage.setAttribute('class','fas fa-image');
        backgroundimage_div.setAttribute('class','wpb_tool_bgi');
        backgroundimage_div.style.opacity = '0.4';
        backgroundimage_div.style.pointerEvents = 'none';
        backgroundimage_tooltip.setAttribute('class','wpb_tools_tooltip');
        backgroundimage_tooltip.innerText = 'Image Manager';
        backgroundimage_div.addEventListener('click',function(){
            self.toolClicked('background-image');
        });

        var gridlines_div = document.createElement('div');
        var gridlines = document.createElement('i');
        var gridlines_tooltip = document.createElement('span');
        gridlines.setAttribute('class','fas fa-th-large');
        gridlines_div.setAttribute('class','wpb_tool_tgl');
        gridlines_tooltip.setAttribute('class','wpb_tools_tooltip');
        gridlines_tooltip.innerText = 'Show GridLines';
        gridlines_div.addEventListener('click',function(){
            self.toolClicked('toggle-gridlines');
        });

        var videomanager_div = document.createElement('div');
        var videomanager = document.createElement('i');
        var videomanager_tooltip = document.createElement('span');
        videomanager.setAttribute('class','fas fa-video');
        videomanager_div.setAttribute('class','wpb_tool_vmi');
        videomanager_div.style.opacity = '0.4';
        videomanager_div.style.pointerEvents = 'none';
        videomanager_tooltip.setAttribute('class','wpb_tools_tooltip');
        videomanager_tooltip.innerText = 'Video Manager';
        videomanager_div.addEventListener('click',function(){
            self.toolClicked('video-manager');
        });

        styleelement_div.appendChild(styleelement);
        styleelement_div.appendChild(styleelement_tooltip);

        addelement_div.appendChild(addelement);
        addelement_div.appendChild(addelement_tooltip);

        resizesite_div.appendChild(resizesite);
        resizesite_div.appendChild(resizesite_tooltip);

        settings_div.appendChild(settings);
        settings_div.appendChild(settings_tooltip);

        removeelement_div.appendChild(removeelement);
        removeelement_div.appendChild(removeelement_tooltip);

        duplicateelement_div.appendChild(duplicateelement);
        duplicateelement_div.appendChild(duplicateelement_tooltip);

        changefont_div.appendChild(changefont);
        changefont_div.appendChild(changefont_tooltip);

        backgroundimage_div.appendChild(backgroundimage);
        backgroundimage_div.appendChild(backgroundimage_tooltip);

        gridlines_div.appendChild(gridlines);
        gridlines_div.appendChild(gridlines_tooltip);

        videomanager_div.appendChild(videomanager);
        videomanager_div.appendChild(videomanager_tooltip);

        toolsdiv.appendChild(addelement_div);
        toolsdiv.appendChild(removeelement_div);
        toolsdiv.appendChild(duplicateelement_div);
        toolsdiv.appendChild(styleelement_div);
        toolsdiv.appendChild(changefont_div);
        toolsdiv.appendChild(backgroundimage_div);
        toolsdiv.appendChild(videomanager_div);
        toolsdiv.appendChild(resizesite_div);
        toolsdiv.appendChild(gridlines_div);
        toolsdiv.appendChild(settings_div);

        Globals.window.body.appendChild(toolsdiv);
    }

    toolClicked(toolName){
        const self = this;
        if(toolName == 'resize-page'){
            var previewsite = document.getElementsByClassName('previewsite')[0];

            var resizers = document.createElement('div');
            resizers.className = 'resizers';

            var bottomresizer = document.createElement('div');
            bottomresizer.className = 'bottom-resizer';

            bottomresizer.addEventListener('mousedown',function(e){
                Globals.pageHandler.site.resize(e);
            });

            bottomresizer.addEventListener('mouseup',function(e){
                Globals.pageHandler.site.stopResizeDrag(e);
            });

            resizers.appendChild(bottomresizer);
            previewsite.appendChild(resizers);

            this.updateToolButton(toolName);
        }else{
            if(toolName == 'add-element'){

                self.total_elements_selected_to_add = 0;

                var elementmanager = document.createElement('div');
                elementmanager.setAttribute('id','element-manager');

                var heading = document.createElement('p');
                heading.className = 'heading';
                heading.innerText = 'Add Elements';

                var em_sidebar = document.createElement('div');
                em_sidebar.setAttribute('id','em-sidebar');

                var em_sidebar_ul = document.createElement('ul');

                var em_sidebar_ul_li_createnew = document.createElement('li');
                em_sidebar_ul_li_createnew.innerText = 'Create New';
                em_sidebar_ul_li_createnew.className = 'selected_li';

                var em_sidebar_ul_li_pickfromstorage = document.createElement('li');
                em_sidebar_ul_li_pickfromstorage.innerText = 'Add From Storage';

                var em_sidebar_ul_li_readymadeelements = document.createElement('li');
                em_sidebar_ul_li_readymadeelements.innerText = 'Ready Made Elements';

                em_sidebar_ul.appendChild(em_sidebar_ul_li_createnew);
                em_sidebar_ul.appendChild(em_sidebar_ul_li_pickfromstorage);
                em_sidebar_ul.appendChild(em_sidebar_ul_li_readymadeelements);

                em_sidebar.appendChild(em_sidebar_ul);

                var sidebar_button_add_elements = document.createElement('button');
                sidebar_button_add_elements.innerText = 'Add Selected Elements';
                sidebar_button_add_elements.addEventListener('click',function(){
                    Globals.pageHandler.site.addElements();
                });

                em_sidebar.appendChild(sidebar_button_add_elements);

                elementmanager.appendChild(heading);
                elementmanager.appendChild(em_sidebar);

                var section1 = document.createElement('div');
                section1.className = 'section';
                section1.id = 'wpb_ae_createnewelement';

                var section2 = document.createElement('div');
                section2.className = 'section';
                section2.id = 'wpb_ae_addfromstorage';
                section2.style.display = 'none';

                var section3 = document.createElement('div');
                section3.className = 'section';
                section3.id = 'wpb_ae_readymadeelements';
                section3.style.display = 'none';

                em_sidebar_ul_li_createnew.addEventListener('click',function(){
                    section1.style.display = 'inline-block';
                    section2.style.display = 'none';
                    section3.style.display = 'none';
                    this.className = 'selected_li';
                    em_sidebar_ul_li_pickfromstorage.className = '';
                    em_sidebar_ul_li_readymadeelements.className = '';
                });

                em_sidebar_ul_li_pickfromstorage.addEventListener('click',function(){
                    section2.style.display = 'inline-block';
                    section1.style.display = 'none';
                    section3.style.display = 'none';
                    this.className = 'selected_li';
                    em_sidebar_ul_li_createnew.className = '';
                    em_sidebar_ul_li_readymadeelements.className = '';
                });

                em_sidebar_ul_li_readymadeelements.addEventListener('click',function(){
                    section2.style.display = 'none';
                    section1.style.display = 'none';
                    section3.style.display = 'inline-block';
                    this.className = 'selected_li';
                    em_sidebar_ul_li_createnew.className = '';
                    em_sidebar_ul_li_pickfromstorage.className = '';
                });

                elementmanager.appendChild(section1);
                elementmanager.appendChild(section2);
                elementmanager.appendChild(section3);

                Globals.window.body.appendChild(elementmanager);

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
                //$('.previewsite').find('*').not('.resizers, .bottom-resizer').css({'opacity':'0.3','pointer-events':'none'});
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
