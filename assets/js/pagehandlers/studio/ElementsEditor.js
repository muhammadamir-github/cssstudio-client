// This entire module needs to be rewritten along with SitePreview.js.

class ElementsEditor{
    constructor(){
        this.ImgGallery1And2_ImgRowEndNumbers = [3,6,9,12,15,18,21,24,27,30,33,36,39,42,45,48,51,54,57,60,63,66,69,72,75,78,81,84,87,90];
        this.ImgGallery3_ImgRowEndNumbers = [2,4,6,8,10,12,14,16,18,20,22,24,26,28,30,32,34,36,38,40,42,44,46,48,50,52,54,56,58,60,62,64,66,68,70,72,74,76,78,80,82,84,86,88,90];
        this.ImgSlider1_ImgSlideDivisions = [4,8,12,16,20,24,28,32,36,40,44,48,52,56,60,64,68,72,76,80,84,88,92,96,100,104,108,112,116,120];
    }

    show(){
        const self = this;
        var editor = document.createElement('div');
        editor.className = 'elementEditor';
        editor.addEventListener('mousedown',self.mousedown);

        var heading = document.createElement('p');
        heading.innerText = 'Element Editor';
        heading.className = 'heading';

        close = document.createElement('i');
        close.setAttribute('class','fas fa-times close');
        close.addEventListener('click',function(){
            self.close();
        });

        editor.appendChild(heading);
        editor.appendChild(close);
        Globals.window.body.appendChild(editor);

        var element = document.getElementsByClassName('selected')[0];
        var elementType = $(element).attr('data-e-type');

        if(elementType == 'image'){
            var isrc = element.src;

            if(isrc.includes('http://localhost:8000/api/assets/')){
                isrc = isrc.split('http://localhost:8000/api/assets/')[1];
            }

            self.addTextBox('Image URL','Enter your image url here...',isrc,'The Image URL is the address that points to a image on the internet.');
        }

        if(elementType == 'video-overlay' || elementType == 'video'){
            //self.addTextBox('Video URL','Enter your video url here...',element.src,'The Video URL is the address that points to a video on the internet.');
            //var videoPlayer = document.getElementById(document.getElementsByClassName('selected')[0].id+'videoPlayer');
            //self.addTextBox('Thumbnail URL','Enter your custom thumbnail image url here...',$(videoPlayer).attr('data-thumbnail'),'A thumbnail image is the first thing that most people see when they interact with a video.They give viewers a preview of the video content.');
        }

        if(elementType == 'heading' || elementType == 'paragraph' || elementType == 'div' || elementType == 'button'){
            self.addTextBox('Text','Enter your text here...',element.innerText,'Enter the text you want to display in the element.');
        }

        if(elementType == 'textinput' || elementType == 'textarea'){
            self.addTextBox('Text','Enter your text here...',element.value,'Enter the text you want to display in the element, placeholder text is shown if the input field is empty.');
            self.addTextBox('Placeholder','Enter placeholder text here...','','Placeholder specifies a short hint that describes the expected value of an input field.The short hint is displayed in the input field before the user enters a value.');
        }

        if(elementType.includes("video-player")){
            //self.addDataAttrTextBox('Title','Enter the title you want to display in the video..',element.getAttribute("data-title"),'Enter the title you want to display in the video.','data-title',0);
            //self.addDataAttrTextBox('Description','Enter the description you want to display in the video..',element.getAttribute("data-description"),'Enter the description you want to display in the video.','data-description',0);
        }

        if(elementType == "checkbox-multi-one" || elementType == "checkbox-multi-two"){
            self.addTextBox('Text','Enter your text here...',element.getElementsByTagName("p")[0].innerText,'Enter the text you want to display in the box.');

            var t1_id = Globals.pageHandler.randomize.elementId(10);
            self.addTable('Manage Checkboxes',t1_id,'checkbox-multi');

            var checkboxes = element.getElementsByClassName('checkbox');

            for(var i=0; i < checkboxes.length; i++){
                var values = [checkboxes[i].getElementsByTagName("p")[0].innerText+'/'];
                self.addTableRow(t1_id,values,checkboxes[i].getElementsByTagName("p")[0],25,'innerText','checkbox-multi');
            }

        }else{
            if(elementType.includes("checkbox")){
                self.addTextBox('Text','Enter your text here...',element.getElementsByTagName("p")[0].innerText,'Enter the text you want to display beside the checkbox.');
            }
        }

        if(elementType.includes("toggle-switch")){
            self.addTextBox('Text','Enter your text here...',element.getElementsByTagName("p")[0].innerText,'Enter the text you want to display beside the toggle switch.');
        }

        if(elementType.includes("ratings")){
            self.addIconPicker(element.getElementsByTagName("i"),"ratings");

            if(elementType.includes("two")){
                self.addTextBox('Text','Enter your text here...',element.getElementsByTagName("p")[0].innerText,'Enter the text you want to display.');
            }
        }

        if(elementType.includes("textbox")){

            if(element.getAttribute("data-i-state") == 1){
                self.addIconPicker(element.getElementsByClassName("icon-wrapper")[0].getElementsByTagName("i")[0],"textbox");
            }

            if(elementType.includes("textbox-two") || elementType.includes("textbox-one")){
                self.addTextBox('Text','Enter your text here...',element.getElementsByTagName("label")[0].innerText,'Enter the text you want to display above the textbox.');
            }

            self.addTextBox('Placeholder','Enter placeholder text here...',element.getElementsByTagName("input")[0].getAttribute("placeholder"),'Placeholder specifies a short hint that describes the expected value of an input field.The short hint is displayed in the input field before the user enters a value.');
            self.addDataAttrTextBox('Maximum Characters','Enter the maximum number of characters can be entered in the textbox.',element.getAttribute("data-max-length"),'Limit the number of characters can be entered in the textbox.','data-max-length',1);
        }

        if(elementType.includes("dropdown-list")){
            self.addTextBox("Text","Enter your text here...",element.getElementsByClassName("selected_option")[0].getElementsByTagName("span")[0].innerText.split(":")[0],"Enter the text you want to display on the drop down list.");

            var t1_id = Globals.pageHandler.randomize.elementId(10);
            self.addTable('Manage Options',t1_id,'dropdown-list');

            var options = element.getElementsByClassName('options')[0].getElementsByTagName("ul")[0].getElementsByTagName("li");

            for(var i=0; i < options.length; i++){
                var values = [options[i].getElementsByTagName("a")[0].innerText+'/'];
                self.addTableRow(t1_id,values,options[i].getElementsByTagName("a")[0],15,'innerText','dropdown-list');
            }
        }

        if(elementType == 'navbar'){
            var t1_id = Globals.pageHandler.randomize.elementId(10);
            self.addTable('Manage Links',t1_id,'navbar');

            var lis = element.getElementsByTagName('a');

            for(var i=0; i < lis.length; i++){
                var values = [$(lis[i]).attr('data-page-name'), lis[i].innerText+'/'];
                self.addTableRow(t1_id,values,lis[i],15,'innerText','navbar');
            }

        }

        if(elementType.includes('gallery')){
            var t1_id = Globals.pageHandler.randomize.elementId(10);
            self.addTable('Manage Images',t1_id,'gallery');

            var imgs = element.getElementsByTagName('img');

            for(var i=0; i < imgs.length; i++){
                var values = [$(imgs[i]).attr('data-description')+'/'];
                self.addTableRow(t1_id,values,imgs[i],50,'data-description','gallery',element);
            }

            //self.addTableIncrementRow(t1_id,'gallery','-');
        }

        if(elementType.includes('slider')){
            var t1_id = Globals.pageHandler.randomize.elementId(10);
            self.addTable('Manage Images',t1_id,'slider');

            var imgs = element.getElementsByTagName('img');

            for(var i=0; i < imgs.length; i++){
                var values = [$(imgs[i]).attr('data-description')+'/'];
                self.addTableRow(t1_id,values,imgs[i],50,'data-description','slider',element);
            }

            //self.addTableIncrementRow(t1_id,'slider','-');
        }

        if(elementType.includes('viewer')){
            var t1_id = Globals.pageHandler.randomize.elementId(10);
            self.addTable('Manage Images',t1_id,'viewer');

            var imgs = element.getElementsByClassName('image-viewer-thumbnails')[0].getElementsByTagName('img');

            for(var i=0; i < imgs.length; i++){
                var values = [$(imgs[i]).attr('data-description')+'/'];
                self.addTableRow(t1_id,values,imgs[i],50,'data-description','viewer');
            }

            //self.addTableIncrementRow(t1_id,'viewer','Title');
        }

        if(elementType.includes("video-playlist")){
            if(elementType == "video-playlist-one"){
                self.addTextBox('Title','Enter your playlist title here...',element.getElementsByClassName("video-playlist-info")[0].getElementsByClassName("heading")[0].innerText,'Enter the title you want to display on the playlist.');
                self.addTextBox('Description','Enter your playlist description here...',element.getElementsByClassName("video-playlist-info")[0].getElementsByClassName("description")[0].innerText,'Enter the description you want to display on the playlist.');

                var t1_id = Globals.pageHandler.randomize.elementId(10);
                self.addTable('Manage Videos',t1_id,'video-playlist');

                var listitems = element.getElementsByClassName('playlist-list')[0].getElementsByClassName("playlist-list-item");

                for(var i=0; i < listitems.length; i++){
                    var values = [listitems[i].getElementsByTagName("p")[0].innerText];
                    self.addTableRow(t1_id,values,listitems[i].getElementsByTagName("p")[0],25,'innerText','video-playlist');
                }

            }
        }

    }

    close(){
        document.getElementsByClassName('elementEditor')[0].remove();
    }

    drag(e){
        var elmnt = document.getElementsByClassName('elementEditor')[0];
        e = e || window.event;
        e.preventDefault();

        // calculate the new cursor position:
        Globals.pageHandler.elementEditor_pos1 = Globals.pageHandler.elementEditor_pos3 - e.clientX;
        Globals.pageHandler.elementEditor_pos2 = Globals.pageHandler.elementEditor_pos4 - e.clientY;
        Globals.pageHandler.elementEditor_pos3 = e.clientX;
        Globals.pageHandler.elementEditor_pos4 = e.clientY;

        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - Globals.pageHandler.elementEditor_pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - Globals.pageHandler.elementEditor_pos1) + "px";
        elmnt.style.cursor = 'grabbing';
    }

    mousedown(e){
        const self = Globals.pageHandler.elementEditor;
        var elmnt = document.getElementsByClassName('elementEditor')[0];
        if(e.target == elmnt){
            e = e || window.event;
            e.preventDefault();

            elmnt.style.cursor = 'grab';

            // get the mouse cursor position at startup:
            Globals.pageHandler.elementEditor_pos3 = e.clientX;
            Globals.pageHandler.elementEditor_pos4 = e.clientY;
            document.onmouseup = self.closeDrag;

            // call a function whenever the cursor moves:
            document.onmousemove = self.drag;
        }
    }

    closeDrag(){
        var elmnt = document.getElementsByClassName('elementEditor')[0];
        document.onmouseup = null;
        document.onmousemove = null;
        elmnt.style.cursor = 'default';
    }

    addIconPicker(icon_element,forElement){
        const self = this;
        var elementEditor = document.getElementsByClassName("elementEditor")[0];

        var button = document.createElement("button");
        var i = document.createElement("i");

        var inputHolder = document.createElement("div");
        inputHolder.className = "inputHolder";

        if(forElement == "ratings"){
            button.innerText = "Change Shape";
            i.className = icon_element[0].className;
        }else{
            button.innerHTML = "Change Icon";
            i.className = icon_element.className;
        }

        button.addEventListener("click",function(e){
            Globals.pageHandler.fontAwesomeSelector.show(e,icon_element,forElement,i);
        });

        button.className = "change_icon_btn";
        $(button).prepend(i);

        inputHolder.appendChild(button);
        elementEditor.appendChild(inputHolder);
    }

    addTableRow(tableId,values,elementToAffect,maxLength,propertyToAffect,forElement,forElementObject){
        const self = this;
        var table = document.getElementById(tableId);

        if(table){
            if(table.tagName == 'TABLE'){

                var row = document.createElement('tr');

                var icolumn = document.createElement('td');

                var actions_column = document.createElement("td");

                if(forElement == 'navbar'){
                    var i = document.createElement('i');
                    i.className = 'fab fa-font-awesome';
                    i.style.color = '#228be6';

                    i.addEventListener('click',function(e){
                        Globals.pageHandler.fontAwesomeSelector.show(e,elementToAffect,"navbar",this);
                    });

                    if(elementToAffect.getElementsByTagName("i")[0]){
                        if(elementToAffect.getElementsByTagName("i")[0].className !== "fab fa-font-awesome"){
                            i.className = elementToAffect.getElementsByTagName("i")[0].className;
                        }
                    }

                }else{
                    if(forElement == 'gallery' || forElement == 'slider'){
                        var i = document.createElement('img');
                        if(elementToAffect.src == null || elementToAffect.src == ''){
                            i.src = '../assets/images/icons/noimage.png';
                        }else{
                            i.src = elementToAffect.src;
                        }

                        i.addEventListener('click',function(e){
                            if(document.getElementById('bg-image-manager')){
                                Globals.pageHandler.tools.exitTool('background-image');
                                $('.selElForImgPik').removeClass('selElForImgPik');
                                $('.selElForImgPik_invoker').removeClass('selElForImgPik_invoker');
                            }else{
                                $('.selElForImgPik').removeClass('selElForImgPik');
                                $('.selElForImgPik_invoker').removeClass('selElForImgPik_invoker');
                                elementToAffect.classList.add('selElForImgPik');
                                this.classList.add('selElForImgPik_invoker');
                                backgroundImageManager.open(e,elementToAffect);
                                Globals.pageHandler.tools.updateToolButton('background-image');
                            }
                        });

                        var actions_delete_span = document.createElement('span');
                        actions_delete_span.style.position = "relative";

                        var actions_delete_i = document.createElement('i');
                        var actions_delete_tooltip = document.createElement('span');
                        actions_delete_i.className = "fas fa-trash";
                        actions_delete_i.style.color = "indianred";
                        actions_delete_i.style.background = "transparent";

                        actions_delete_tooltip.className = "tooltip";
                        actions_delete_tooltip.innerText = "Delete Image";
                        actions_delete_tooltip.style.left = "-105px";
                        actions_delete_tooltip.style.top = "-2.5px";
                        actions_delete_tooltip.style.width = "100px";
                        actions_delete_tooltip.style.fontFamily = "ProximaNovaBold";

                        actions_delete_i.addEventListener("mouseover",function(){
                            actions_delete_tooltip.style.visibility = "visible";
                            actions_delete_tooltip.style.opacity = 1;
                        });

                        actions_delete_i.addEventListener("mouseout",function(){
                            actions_delete_tooltip.style.visibility = "hidden";
                            actions_delete_tooltip.style.opacity = 0;
                        });

                        actions_delete_i.addEventListener("click",function(){
                            row.remove();
                            elementToAffect.remove();
                            self.adjust_ImgSlider1_images_in_slides(forElementObject);
                        });

                        actions_delete_span.appendChild(actions_delete_i);
                        actions_delete_span.appendChild(actions_delete_tooltip);
                        actions_column.appendChild(actions_delete_span)
                    }else{
                        if(forElement == 'viewer'){

                            var i = document.createElement('img');
                            if(elementToAffect.src == null || elementToAffect.src == ''){
                                i.src = '../assets/images/icons/noimage.png';
                            }else{
                                i.src = elementToAffect.src;
                            }

                            i.addEventListener('click',function(e){
                                if(document.getElementById('bg-image-manager')){
                                    Globals.pageHandler.tools.exitTool('background-image');
                                    $('.selElForImgPik').removeClass('selElForImgPik');
                                    $('.selElForImgPik_invoker').removeClass('selElForImgPik_invoker');
                                }else{
                                    $('.selElForImgPik').removeClass('selElForImgPik');
                                    $('.selElForImgPik_invoker').removeClass('selElForImgPik_invoker');
                                    elementToAffect.classList.add('selElForImgPik');
                                    this.classList.add('selElForImgPik_invoker');
                                    backgroundImageManager.open(e,elementToAffect);
                                    Globals.pageHandler.tools.updateToolButton('background-image');
                                }
                            });

                            var actions_delete_span = document.createElement('span');
                            actions_delete_span.style.position = "relative";

                            var actions_delete_i = document.createElement('i');
                            var actions_delete_tooltip = document.createElement('span');
                            actions_delete_i.className = "fas fa-trash";
                            actions_delete_i.style.color = "indianred";
                            actions_delete_i.style.background = "transparent";

                            actions_delete_tooltip.className = "tooltip";
                            actions_delete_tooltip.innerText = "Delete Image";
                            actions_delete_tooltip.style.left = "-105px";
                            actions_delete_tooltip.style.top = "-2.5px";
                            actions_delete_tooltip.style.width = "100px";
                            actions_delete_tooltip.style.fontFamily = "ProximaNovaBold";

                            actions_delete_i.addEventListener("mouseover",function(){
                                actions_delete_tooltip.style.visibility = "visible";
                                actions_delete_tooltip.style.opacity = 1;
                            });

                            actions_delete_i.addEventListener("mouseout",function(){
                                actions_delete_tooltip.style.visibility = "hidden";
                                actions_delete_tooltip.style.opacity = 0;
                            });

                            actions_delete_i.addEventListener("click",function(){
                                row.remove();
                                elementToAffect.remove();
                            });

                            actions_delete_span.appendChild(actions_delete_i);
                            actions_delete_span.appendChild(actions_delete_tooltip);
                            actions_column.appendChild(actions_delete_span)
                        }else{
                            if(forElement == 'dropdown-list'){
                                var i = document.createElement('i');
                                i.className = 'fab fa-font-awesome';
                                i.style.color = '#228be6';

                                i.addEventListener('click',function(e){
                                    Globals.pageHandler.fontAwesomeSelector.show(e,elementToAffect.parentElement.getElementsByTagName("span")[0],"dropdown-list",this);
                                });

                                if(elementToAffect.parentElement.getElementsByTagName("span")[0]){
                                    if(elementToAffect.parentElement.getElementsByTagName("span")[0].getElementsByTagName("i")[0]){
                                        if(elementToAffect.parentElement.getElementsByTagName("span")[0].getElementsByTagName("i")[0].className !== "fab fa-font-awesome"){
                                            i.className = elementToAffect.parentElement.getElementsByTagName("span")[0].getElementsByTagName("i")[0].className;
                                        }
                                    }
                                }

                                var actions_delete_span = document.createElement('span');
                                actions_delete_span.style.position = "relative";

                                var actions_delete_i = document.createElement('i');
                                var actions_delete_tooltip = document.createElement('span');
                                actions_delete_i.className = "fas fa-trash";
                                actions_delete_i.style.color = "indianred";
                                actions_delete_i.style.background = "transparent";

                                actions_delete_tooltip.className = "tooltip";
                                actions_delete_tooltip.innerText = "Delete Option";
                                actions_delete_tooltip.style.left = "-105px";
                                actions_delete_tooltip.style.top = "-2.5px";
                                actions_delete_tooltip.style.width = "100px";
                                actions_delete_tooltip.style.fontFamily = "ProximaNovaBold";

                                actions_delete_i.addEventListener("mouseover",function(){
                                    actions_delete_tooltip.style.visibility = "visible";
                                    actions_delete_tooltip.style.opacity = 1;
                                });

                                actions_delete_i.addEventListener("mouseout",function(){
                                    actions_delete_tooltip.style.visibility = "hidden";
                                    actions_delete_tooltip.style.opacity = 0;
                                });

                                actions_delete_i.addEventListener("click",function(){
                                    row.remove();
                                    elementToAffect.parentElement.remove();
                                });

                                actions_delete_span.appendChild(actions_delete_i);
                                actions_delete_span.appendChild(actions_delete_tooltip);
                                actions_column.appendChild(actions_delete_span);

                            }else{
                                if(forElement == "checkbox-multi"){
                                    var actions_delete_span = document.createElement('span');
                                    actions_delete_span.style.position = "relative";

                                    var actions_delete_i = document.createElement('i');
                                    var actions_delete_tooltip = document.createElement('span');
                                    actions_delete_i.className = "fas fa-trash";
                                    actions_delete_i.style.color = "indianred";
                                    actions_delete_i.style.background = "transparent";

                                    actions_delete_tooltip.className = "tooltip";
                                    actions_delete_tooltip.innerText = "Delete Checkbox";
                                    actions_delete_tooltip.style.left = "-105px";
                                    actions_delete_tooltip.style.top = "-2.5px";
                                    actions_delete_tooltip.style.width = "100px";
                                    actions_delete_tooltip.style.fontFamily = "ProximaNovaBold";

                                    actions_delete_i.addEventListener("mouseover",function(){
                                        actions_delete_tooltip.style.visibility = "visible";
                                        actions_delete_tooltip.style.opacity = 1;
                                    });

                                    actions_delete_i.addEventListener("mouseout",function(){
                                        actions_delete_tooltip.style.visibility = "hidden";
                                        actions_delete_tooltip.style.opacity = 0;
                                    });

                                    actions_delete_i.addEventListener("click",function(){
                                        row.remove();
                                        elementToAffect.parentElement.remove();
                                    });

                                    actions_delete_span.appendChild(actions_delete_i);
                                    actions_delete_span.appendChild(actions_delete_tooltip);
                                    actions_column.appendChild(actions_delete_span);
                                }else{
                                    if(forElement == "video-playlist"){
                                        var i = document.createElement('img');
                                        if(elementToAffect.parentElement.getElementsByTagName("img")[0].src == null || elementToAffect.parentElement.getElementsByTagName("img")[0].src == ''){
                                            i.src = '../assets/images/icons/noimage.png';
                                        }else{
                                            i.src = elementToAffect.parentElement.getElementsByTagName("img")[0].src;
                                        }

                                        i.addEventListener('click',function(e){
                                            if(document.getElementById('bg-image-manager')){
                                                Globals.pageHandler.tools.exitTool('background-image');
                                                $('.selElForVidPik').removeClass('selElForVidPik');
                                                $('.selElForVidPik_invoker').removeClass('selElForVidPik_invoker');
                                            }else{
                                                $('.selElForVidPik').removeClass('selElForVidPik');
                                                $('.selElForVidPik_invoker').removeClass('selElForVidPik_invoker');
                                                elementToAffect.parentElement.classList.add('selElForVidPik');
                                                this.classList.add('selElForVidPik_invoker');
                                                Globals.pageHandler.VideoManager.open(e,elementToAffect);
                                                Globals.pageHandler.tools.updateToolButton('video-manager');
                                            }
                                        });

                                        var actions_delete_span = document.createElement('span');
                                        actions_delete_span.style.position = "relative";

                                        var actions_delete_i = document.createElement('i');
                                        var actions_delete_tooltip = document.createElement('span');
                                        actions_delete_i.className = "fas fa-trash";
                                        actions_delete_i.style.color = "indianred";
                                        actions_delete_i.style.background = "transparent";

                                        actions_delete_tooltip.className = "tooltip";
                                        actions_delete_tooltip.innerText = "Delete Video";
                                        actions_delete_tooltip.style.left = "-105px";
                                        actions_delete_tooltip.style.top = "-2.5px";
                                        actions_delete_tooltip.style.width = "100px";
                                        actions_delete_tooltip.style.fontFamily = "ProximaNovaBold";

                                        actions_delete_i.addEventListener("mouseover",function(){
                                            actions_delete_tooltip.style.visibility = "visible";
                                            actions_delete_tooltip.style.opacity = 1;
                                        });

                                        actions_delete_i.addEventListener("mouseout",function(){
                                            actions_delete_tooltip.style.visibility = "hidden";
                                            actions_delete_tooltip.style.opacity = 0;
                                        });

                                        actions_delete_i.addEventListener("click",function(){
                                            row.remove();
                                            elementToAffect.parentElement.remove();
                                        });

                                        actions_delete_span.appendChild(actions_delete_i);
                                        actions_delete_span.appendChild(actions_delete_tooltip);
                                        actions_column.appendChild(actions_delete_span)
                                    }else{

                                    }
                                }
                            }
                        }
                    }
                }

                if(forElement !== "checkbox-multi"){
                    icolumn.appendChild(i);
                    row.appendChild(icolumn);
                }

                for(var i=0; i < values.length; i++){
                    var column = document.createElement('td');

                    if(values[i].charAt(values[i].length - 1) == '/'){
                        column.innerText = values[i].split('/')[0];
                        column.setAttribute("contenteditable","true");

                        column.addEventListener('keydown',function(e){
                            if(e.which != 8 && this.innerText.length > maxLength){
                                e.preventDefault();
                            }else{
                                if(propertyToAffect == 'innerText'){
                                    elementToAffect.innerText = this.innerText;
                                }else{
                                    if(propertyToAffect == 'data-description'){
                                        elementToAffect.setAttribute('data-description',this.innerText);
                                    }
                                }
                            }
                        });

                        column.addEventListener('keyup',function(e){
                            if(e.which != 8 && this.innerText.length > maxLength){
                                e.preventDefault();
                            }else{
                                if(propertyToAffect == 'innerText'){
                                    elementToAffect.innerText = this.innerText;
                                }else{
                                    if(propertyToAffect == 'data-description'){
                                        elementToAffect.setAttribute('data-description',this.innerText);
                                    }
                                }
                            }
                        });

                    }else{
                        column.innerText = values[i];
                    }

                    row.appendChild(column);
                }

                row.appendChild(actions_column);

                table.getElementsByTagName('tbody')[0].appendChild(row);
            }
        }

        //}

    }

    addTableIncrementRow(tableId,forElement,editableValue){
        const self = this;
        var table = document.getElementById(tableId);
        var element = document.getElementsByClassName('selected')[0];

        var newRow_row = document.createElement('tr');
        var newRow_c1 = document.createElement('td');
        var newRow_c2 = document.createElement('td');
        newRow_c2.innerText = editableValue;
        newRow_c2.setAttribute('contenteditable','');

        if(table){
            if(table.tagName == 'TABLE'){
                if(forElement == 'viewer' || forElement == 'gallery' || forElement == 'slider'){

                    var i = document.createElement('img');
                    i.src = '../assets/images/icons/noimage.png';

                    i.addEventListener('click',function(e){

                        if(document.getElementById('bg-image-manager')){
                            Globals.pageHandler.tools.exitTool('background-image');
                            $('.selElForImgPik').removeClass('selElForImgPik');
                            $('.selElForImgPik_invoker').removeClass('selElForImgPik_invoker');
                        }else{
                            var elementToAffect = document.createElement('img');
                            elementToAffect.src = '../assets/images/icons/noimage.png';

                            if(forElement == 'viewer'){
                                var title = element.getElementsByClassName('image-view')[0].getElementsByTagName('span')[0];
                                var viewer_image = element.getElementsByClassName('image-view')[0].getElementsByTagName('img')[0];
                                elementToAffect.setAttribute('data-description','Title');
                                elementToAffect.addEventListener('click',function(e){
                                    publicEvents.changeImageViewerImage(e,viewer_image,title);
                                });
                            }else{
                                if(forElement == 'gallery' || forElement == 'slider'){
                                    elementToAffect.setAttribute('data-description','-');
                                    elementToAffect.addEventListener('mouseover',publicEvents.galleryImgDescription_show);
                                    elementToAffect.addEventListener('mouseout',publicEvents.galleryImgDescription_hide);
                                }
                            }

                            newRow_c2.addEventListener('keyup',function(ev){
                                if(ev.which != 8 && this.innerText.length > 50){
                                    ev.preventDefault();
                                }else{
                                    elementToAffect.setAttribute('data-description',this.innerText);
                                }
                            });

                            if(forElement == 'viewer'){
                                if(element.getElementsByClassName('image-viewer-thumbnails')[0]){
                                    element.getElementsByClassName('image-viewer-thumbnails')[0].appendChild(elementToAffect);
                                    self.addTableIncrementRow(tableId,forElement,editableValue);
                                }
                            }else{
                                if($(element).attr('data-e-type').includes('slider')){
                                    if($(element).attr('data-e-type') == "image-slider-one"){
                                        if(self.ImgSlider1_ImgSlideDivisions.includes(publicEvents.count_ImgSlider1Images(element))){
                                            var allImages = element.getElementsByTagName("img");

                                            var newImgSlide = document.createElement("div");
                                            newImgSlide.className = "imgSlide";

                                            elementToAffect.id = "image-"+Globals.pageHandler.randomize.elementId(25);
                                            elementToAffect.setAttribute("data-no",Number(allImages[allImages.length-1].getAttribute("data-no"))+1);
                                            elementToAffect.style.left = (Number(elementToAffect.style.left.replace("px","")) + 30) + "px";

                                            newImgSlide.appendChild(elementToAffect);

                                            newImgSlide.setAttribute("data-restrictions","selection");

                                            newImgSlide.addEventListener("click",function(){
                                                site.selectElement(element);
                                            });

                                            element.appendChild(newImgSlide);

                                            element.setAttribute("data-total",Number(element.getAttribute("data-total"))+1);
                                            self.addTableIncrementRow(tableId,forElement,editableValue);
                                        }else{
                                            var allSlides = element.getElementsByClassName("imgSlide");
                                            var lastSlide = allSlides[allSlides.length-1];

                                            if(allSlides.length !== 0 && lastSlide){
                                                var allImagesOfLastSlide = lastSlide.getElementsByTagName("img");
                                                var lastImage = allImagesOfLastSlide[allImagesOfLastSlide.length-1];

                                                elementToAffect.id = "image-"+Globals.pageHandler.randomize.elementId(25);
                                                elementToAffect.setAttribute("data-no",Number(lastImage.getAttribute("data-no"))+1);
                                                elementToAffect.style.left = (Number(lastImage.style.left.replace("px","")) + 15) + "px";

                                                lastSlide.appendChild(elementToAffect);
                                                self.addTableIncrementRow(tableId,forElement,editableValue);
                                            }else{
                                                var allImages = element.getElementsByTagName("img");

                                                var newImgSlide = document.createElement("div");
                                                newImgSlide.className = "imgSlide active";

                                                elementToAffect.id = "image-"+Globals.pageHandler.randomize.elementId(25);

                                                if(allImages.length == 0){
                                                    elementToAffect.setAttribute("data-no",1);
                                                }else{
                                                    elementToAffect.setAttribute("data-no",Number(allImages[allImages.length-1].getAttribute("data-no"))+1);
                                                }

                                                elementToAffect.style.left = (Number(elementToAffect.style.left.replace("px","")) + 30) + "px";

                                                newImgSlide.appendChild(elementToAffect);

                                                newImgSlide.setAttribute("data-restrictions","selection");

                                                newImgSlide.addEventListener("click",function(){
                                                    site.selectElement(element);
                                                });

                                                element.appendChild(newImgSlide);
                                                element.setAttribute("data-total",Number(element.getAttribute("data-total"))+1)

                                                self.addTableIncrementRow(tableId,forElement,editableValue);
                                            }
                                        }
                                    }
                                }else{
                                    if($(element).attr('data-e-type').includes('gallery')){
                                        if($(element).attr('data-e-type') == "image-gallery-one" || $(element).attr('data-e-type') == "image-gallery-two"){
                                            var totalImages = element.getElementsByTagName("img").length;
                                            var newImageNumber = totalImages+1;

                                            if(self.ImgGallery1And2_ImgRowEndNumbers.includes(newImageNumber)){
                                                // Row End
                                                // Don't add Margin Right
                                            }else{
                                                elementToAffect.style.marginRight = "15px";
                                            }

                                            elementToAffect.id = "image-"+Globals.pageHandler.randomize.elementId(25);
                                            elementToAffect.setAttribute("data-no",newImageNumber);

                                            element.appendChild(elementToAffect);
                                            self.addTableIncrementRow(tableId,forElement,editableValue);
                                        }else{
                                            if($(element).attr('data-e-type') == "image-gallery-three"){
                                                var totalImages = element.getElementsByTagName("img").length;
                                                var newImageNumber = totalImages+1;

                                                if(self.ImgGallery3_ImgRowEndNumbers.includes(newImageNumber)){
                                                    // Row End
                                                    // Don't add Margin Right
                                                }else{
                                                    elementToAffect.style.marginRight = "15px";
                                                }

                                                elementToAffect.id = "image-"+Globals.pageHandler.randomize.elementId(25);
                                                elementToAffect.setAttribute("data-no",newImageNumber);

                                                element.appendChild(elementToAffect);
                                                self.addTableIncrementRow(tableId,forElement,editableValue);
                                            }else{
                                                element.appendChild(elementToAffect);
                                                self.addTableIncrementRow(tableId,forElement,editableValue);
                                            }
                                        }
                                    }
                                }
                            }

                            $('.selElForImgPik').removeClass('selElForImgPik');
                            $('.selElForImgPik_invoker').removeClass('selElForImgPik_invoker');
                            elementToAffect.classList.add('selElForImgPik');
                            this.classList.add('selElForImgPik_invoker');
                            backgroundImageManager.open(e,elementToAffect);
                            Globals.pageHandler.tools.updateToolButton('background-image');
                        }
                    }); // end icon event click
                } // End for gallery , slider and viewer here.

                newRow_c1.appendChild(i);

                newRow_row.appendChild(newRow_c1);
                newRow_row.appendChild(newRow_c2);

                table.getElementsByTagName('tbody')[0].appendChild(newRow_row);
            }
        }
    }

    addTable(heading,tableId,forElement){
        const self = this;
        var addNote = 0;
        var addRowButton = 0;
        var note;

        var p = document.createElement('p');
        p.innerText = heading;
        p.className = 'optionHeading';

        var table = document.createElement('table');
        var thead = document.createElement('thead');
        var tbody = document.createElement('tbody');

        var thead_row = document.createElement('tr');

        if(forElement == 'navbar'){
            var thead_row_c_1 = document.createElement('th');
            var thead_row_c_2 = document.createElement('th');
            var thead_row_c_3 = document.createElement('th');

            thead_row_c_1.innerText = 'Page';
            thead_row_c_2.innerText = 'Text';
            thead_row_c_3.innerText = 'Icon';

            thead_row_c_3.style.width = '15%';

            thead_row.appendChild(thead_row_c_3);
            thead_row.appendChild(thead_row_c_1);
            thead_row.appendChild(thead_row_c_2);

            table.className = 'navbarManagerTable';
        }else{
            if(forElement == 'gallery' || forElement == 'viewer' || forElement == 'slider'){
                var thead_row_c_1 = document.createElement('th');
                var thead_row_c_2 = document.createElement('th');
                var thead_row_c_3 = document.createElement('th');

                thead_row_c_1.innerText = 'Image';
                thead_row_c_2.innerText = 'Description';
                thead_row_c_3.innerText = 'Actions';

                thead_row_c_1.style.width = '25%';
                thead_row_c_2.style.width = '50%';
                thead_row_c_3.style.width = '25%';

                thead_row.appendChild(thead_row_c_1);
                thead_row.appendChild(thead_row_c_2);
                thead_row.appendChild(thead_row_c_3);

                table.className = 'navbarManagerTable';
            }else{
                if(forElement == "dropdown-list"){
                    note = document.createElement("span");
                    note.innerText = "Adding icon will make option text align to left side."
                    note.className = "note";

                    addNote = 1;
                    addRowButton = 1;

                    var thead_row_c_1 = document.createElement('th');
                    var thead_row_c_2 = document.createElement('th');
                    var thead_row_c_3 = document.createElement('th');

                    thead_row_c_1.innerText = 'Icon';
                    thead_row_c_2.innerText = 'Name';
                    thead_row_c_3.innerText = 'Actions';

                    thead_row_c_1.style.width = '25%';
                    thead_row_c_2.style.width = '50%';
                    thead_row_c_3.style.width = '25%';

                    thead_row.appendChild(thead_row_c_1);
                    thead_row.appendChild(thead_row_c_2);
                    thead_row.appendChild(thead_row_c_3);

                    table.className = 'navbarManagerTable';
                }else{
                    if(forElement == "checkbox-multi"){

                        addRowButton = 1;

                        var thead_row_c_1 = document.createElement('th');
                        var thead_row_c_2 = document.createElement('th');

                        thead_row_c_1.innerText = 'Text';
                        thead_row_c_2.innerText = 'Actions';

                        thead_row_c_1.style.width = '50%';
                        thead_row_c_2.style.width = '50%';

                        thead_row.appendChild(thead_row_c_1);
                        thead_row.appendChild(thead_row_c_2);

                        table.className = 'navbarManagerTable';
                    }else{
                        if(forElement == "video-playlist"){
                            addRowButton = 1;

                            var thead_row_c_1 = document.createElement('th');
                            var thead_row_c_2 = document.createElement('th');
                            var thead_row_c_3 = document.createElement('th');

                            thead_row_c_1.innerText = 'Video';
                            thead_row_c_2.innerText = 'Text';
                            thead_row_c_3.innerText = 'Actions';

                            thead_row_c_1.style.width = '25%';
                            thead_row_c_2.style.width = '50%';
                            thead_row_c_3.style.width = '25%';

                            thead_row.appendChild(thead_row_c_1);
                            thead_row.appendChild(thead_row_c_2);
                            thead_row.appendChild(thead_row_c_3);

                            table.className = 'navbarManagerTable';
                        }
                    }
                }
            }
        }

        thead.appendChild(thead_row);
        table.id = tableId;

        table.appendChild(thead);
        table.appendChild(tbody);

        document.getElementsByClassName('elementEditor')[0].appendChild(p);

        if(addNote == 1){
            document.getElementsByClassName('elementEditor')[0].appendChild(note);
        }

        if(addRowButton == 1){
            var newRowButton = document.createElement("span");
            var newRowButton_i = document.createElement("i");
            newRowButton_i.className = "fas fa-plus";
            newRowButton.className = "addRow";

            newRowButton.addEventListener("click",function(){
                self.addNewRow();
            });

            newRowButton.appendChild(newRowButton_i);
            table.appendChild(newRowButton);
        }

        document.getElementsByClassName('elementEditor')[0].appendChild(table);

    }

    addNewRow(){
        var table = document.getElementsByClassName("elementEditor")[0].getElementsByTagName("table")[0];

        var element = document.getElementsByClassName("selected")[0];
        var elementType = element.getAttribute("data-e-type");

        if(elementType.includes("dropdown-list")){
            var totalOptions = element.getElementsByClassName("options")[0].getElementsByTagName("ul")[0].getElementsByTagName("li").length;

            var option = document.createElement("li");
            var option_a = document.createElement("a");

            var option_span = document.createElement("span");

            option_a.innerText = "Option "+(totalOptions);

            (function(option,option_a,element){

                if(element.getAttribute("data-e-type") === "dropdown-list-one"){
                    option_a.addEventListener("click",function(e){
                        publicEvents.dropdownlist_option_click(element,e);
                    });
                }else{
                    if(element.getAttribute("data-e-type") === "dropdown-list-two"){
                        option_a.addEventListener("click",function(e){
                            publicEvents.dropdownlist_multiselect_option_click(element,e);
                        });
                    }
                }

                option_a.addEventListener("mouseover",function(){
                    publicEvents.dropdownlist_option_hover(option,option_a,element.getAttribute("data-option-bg-hv"),element.getAttribute("data-option-bg-hv-clr"));
                });

                option_a.addEventListener("mouseout",function(){
                    publicEvents.dropdownlist_option_hoverOut(option,option_a,element.getAttribute("data-option-bg"),element.getAttribute("data-option-bg-clr"));
                });
            })(option,option_a,element);

            option.setAttribute("data-restrictions","selection");
            option_a.setAttribute("data-restrictions","selection");

            option.appendChild(option_a);
            option.appendChild(option_span);

            element.getElementsByClassName("options")[0].getElementsByTagName("ul")[0].appendChild(option);

            // New element added.

            // Adding new row:

            var newRow = document.createElement("tr");

            var i_column = document.createElement("td");
            var middle_column = document.createElement("td");
            var last_column = document.createElement("td");

            var i = document.createElement('i');
            i.className = 'fab fa-font-awesome';
            i.style.color = '#228be6';

            i.addEventListener('click',function(e){
                Globals.pageHandler.fontAwesomeSelector.show(e,option_span,"dropdown-list",this);
            });

            var actions_delete_span = document.createElement('span');
            actions_delete_span.style.position = "relative";

            var actions_delete_i = document.createElement('i');
            var actions_delete_tooltip = document.createElement('span');
            actions_delete_i.className = "fas fa-trash";
            actions_delete_i.style.color = "indianred";
            actions_delete_i.style.background = "transparent";

            actions_delete_tooltip.className = "tooltip";
            actions_delete_tooltip.innerText = "Delete Option";
            actions_delete_tooltip.style.left = "-105px";
            actions_delete_tooltip.style.top = "-2.5px";
            actions_delete_tooltip.style.width = "100px";
            actions_delete_tooltip.style.fontFamily = "ProximaNovaBold";

            actions_delete_i.addEventListener("mouseover",function(){
                actions_delete_tooltip.style.visibility = "visible";
                actions_delete_tooltip.style.opacity = 1;
            });

            actions_delete_i.addEventListener("mouseout",function(){
                actions_delete_tooltip.style.visibility = "hidden";
                actions_delete_tooltip.style.opacity = 0;
            });

            actions_delete_i.addEventListener("click",function(){
                newRow.remove();
                option.remove();
            });

            actions_delete_span.appendChild(actions_delete_i);
            actions_delete_span.appendChild(actions_delete_tooltip);

            middle_column.innerText = "Option "+totalOptions;
            middle_column.setAttribute("contenteditable","true");

            middle_column.addEventListener('keydown',function(e){
                if(e.which != 8 && this.innerText.length > maxLength){
                    e.preventDefault();
                }else{
                    option_a.innerText = this.innerText;
                }
            });

            middle_column.addEventListener('keyup',function(e){
                if(e.which != 8 && this.innerText.length > maxLength){
                    e.preventDefault();
                }else{
                    option_a.innerText = this.innerText;
                }
            });

            i_column.appendChild(i);
            last_column.appendChild(actions_delete_span);

            newRow.appendChild(i_column);
            newRow.appendChild(middle_column);
            newRow.appendChild(last_column);

            table.getElementsByTagName("tbody")[0].appendChild(newRow);
        }else{
            if(elementType.includes("checkbox-multi")){

                var checkbox = document.createElement("div");

                var span = document.createElement("span");
                var p = document.createElement("p");
                var checkmark = document.createElement("span");

                span.setAttribute("data-bg","black");
                span.setAttribute("data-bg-hv","grey");

                span.style.backgroundColor = "black";

                checkbox.setAttribute("data-checked","0");

                var checkmarkShape = element.getAttribute("data-checkmark-shape");
                if(checkmarkShape == "tick"){
                    checkmark.className = "checkmark tick-checkmark-disabled";
                }else{
                    if(checkmarkShape == "circle"){
                        checkmark.className = "checkmark circle-checkmark circle-checkmark-disabled";
                    }else{
                        if(checkmarkShape == "square"){
                            checkmark.className = "checkmark square-checkmark square-checkmark-disabled";
                        }
                    }
                }

                checkbox.className = 'checkbox';
                checkbox.setAttribute("data-restrictions","selection");

                if(elementType.includes("checkbox-multi-one")){
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
                                publicEvents.multi_checkbox_click(checkbox,element);
                            });
                        })(checkmark,checkbox);

                    })(span,checkbox,checkmark);
                }else{
                    if(elementType.includes("checkbox-multi-two")){
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
                                    publicEvents.multi_checkbox_two_click(checkbox,element);
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

                element.appendChild(checkbox);

                // Adding new row:

                var newRow = document.createElement("tr");

                var first_column = document.createElement("td");
                var last_column = document.createElement("td");

                var actions_delete_span = document.createElement('span');
                actions_delete_span.style.position = "relative";

                var actions_delete_i = document.createElement('i');
                var actions_delete_tooltip = document.createElement('span');
                actions_delete_i.className = "fas fa-trash";
                actions_delete_i.style.color = "indianred";
                actions_delete_i.style.background = "transparent";

                actions_delete_tooltip.className = "tooltip";
                actions_delete_tooltip.innerText = "Delete Checkbox";
                actions_delete_tooltip.style.left = "-105px";
                actions_delete_tooltip.style.top = "-2.5px";
                actions_delete_tooltip.style.width = "100px";
                actions_delete_tooltip.style.fontFamily = "ProximaNovaBold";

                actions_delete_i.addEventListener("mouseover",function(){
                    actions_delete_tooltip.style.visibility = "visible";
                    actions_delete_tooltip.style.opacity = 1;
                });

                actions_delete_i.addEventListener("mouseout",function(){
                    actions_delete_tooltip.style.visibility = "hidden";
                    actions_delete_tooltip.style.opacity = 0;
                });

                actions_delete_i.addEventListener("click",function(){
                    newRow.remove();
                    checkbox.remove();
                });

                actions_delete_span.appendChild(actions_delete_i);
                actions_delete_span.appendChild(actions_delete_tooltip);

                first_column.innerText = "Checkbox";
                first_column.setAttribute("contenteditable","true");

                first_column.addEventListener('keydown',function(e){
                    if(e.which != 8 && this.innerText.length > 25){
                        e.preventDefault();
                    }else{
                        p.innerText = this.innerText;
                    }
                });

                first_column.addEventListener('keyup',function(e){
                    if(e.which != 8 && this.innerText.length > 25){
                        e.preventDefault();
                    }else{
                        p.innerText = this.innerText;
                    }
                });

                last_column.appendChild(actions_delete_span);

                newRow.appendChild(first_column);
                newRow.appendChild(last_column);

                table.getElementsByTagName("tbody")[0].appendChild(newRow);
            }else{
                if(elementType.includes("video-playlist")){
                    var totalItems = (Number(element.getElementsByClassName("playlist-list")[0].getElementsByClassName("playlist-list-item").length)-1);

                    var item = document.createElement("div");
                    var img = document.createElement("img");
                    var p = document.createElement("p");

                    item.className = "playlist-list-item";
                    p.innerText = "Video Number #"+(Number(totalItems)+1);
                    img.src = "http://pngimg.com/uploads/google/google_PNG19635.png";

                    item.setAttribute("data-restrictions","selection");
                    img.setAttribute("data-restrictions","selection");
                    p.setAttribute("data-restrictions","selection");

                    item.appendChild(img);
                    item.appendChild(p);

                    var video = element.getElementsByClassName("playlist-player")[0].getElementsByTagName("video")[0];

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

                    element.getElementsByClassName("playlist-list")[0].appendChild(item);

                    // Adding new row:

                    var newRow = document.createElement("tr");

                    var i_column = document.createElement("td");
                    var middle_column = document.createElement("td");
                    var last_column = document.createElement("td");

                    var i = document.createElement('img');
                    i.src = "http://pngimg.com/uploads/google/google_PNG19635.png";

                    i.addEventListener('click',function(e){
                        if(document.getElementById('bg-image-manager')){
                            Globals.pageHandler.tools.exitTool('background-image');
                            $('.selElForVidPik').removeClass('selElForVidPik');
                            $('.selElForVidPik_invoker').removeClass('selElForVidPik_invoker');
                        }else{
                            $('.selElForVidPik').removeClass('selElForVidPik');
                            $('.selElForVidPik_invoker').removeClass('selElForVidPik_invoker');
                            item.classList.add('selElForVidPik');
                            this.classList.add('selElForVidPik_invoker');
                            Globals.pageHandler.VideoManager.open(e,p);
                            Globals.pageHandler.tools.updateToolButton('video-manager');
                        }
                    });

                    var actions_delete_span = document.createElement('span');
                    actions_delete_span.style.position = "relative";

                    var actions_delete_i = document.createElement('i');
                    var actions_delete_tooltip = document.createElement('span');
                    actions_delete_i.className = "fas fa-trash";
                    actions_delete_i.style.color = "indianred";
                    actions_delete_i.style.background = "transparent";

                    actions_delete_tooltip.className = "tooltip";
                    actions_delete_tooltip.innerText = "Delete Video";
                    actions_delete_tooltip.style.left = "-105px";
                    actions_delete_tooltip.style.top = "-2.5px";
                    actions_delete_tooltip.style.width = "100px";
                    actions_delete_tooltip.style.fontFamily = "ProximaNovaBold";

                    actions_delete_i.addEventListener("mouseover",function(){
                        actions_delete_tooltip.style.visibility = "visible";
                        actions_delete_tooltip.style.opacity = 1;
                    });

                    actions_delete_i.addEventListener("mouseout",function(){
                        actions_delete_tooltip.style.visibility = "hidden";
                        actions_delete_tooltip.style.opacity = 0;
                    });

                    actions_delete_i.addEventListener("click",function(){
                        newRow.remove();
                        item.remove();
                    });

                    actions_delete_span.appendChild(actions_delete_i);
                    actions_delete_span.appendChild(actions_delete_tooltip);

                    middle_column.innerText = "Video Number #"+(Number(totalItems)+1);
                    //middle_column.setAttribute("contenteditable","true");

                    /*middle_column.addEventListener('keydown',function(e){
                    if(e.which != 8 && this.innerText.length > maxLength){
                    e.preventDefault();
                }else{
                p.innerText = this.innerText;
            }
        });

        middle_column.addEventListener('keyup',function(e){
        if(e.which != 8 && this.innerText.length > maxLength){
        e.preventDefault();
    }else{
    p.innerText = this.innerText;
}
});*/

i_column.appendChild(i);
last_column.appendChild(actions_delete_span);

newRow.appendChild(i_column);
newRow.appendChild(middle_column);
newRow.appendChild(last_column);

table.getElementsByTagName("tbody")[0].appendChild(newRow);
}else{

}
}
}
}

addDataAttrTextBox(labelText,placeholder,text,tooltipText,attrToUpdate,onlyNumericals){
    const self = this;
    var div = document.createElement('div');
    div.className = 'inputHolder';

    var label = document.createElement('span');
    label.innerText = labelText;
    label.className = 'label';

    var tooltip = document.createElement('span');
    tooltip.innerText = tooltipText;
    tooltip.className = 'tooltip';

    var icon = document.createElement('i');
    icon.className = 'fas fa-info';
    /*icon.addEventListener('mouseover',function(){
    tooltip.style.visibility = 'visible';
    tooltip.style.opacity = '1';
});

icon.addEventListener('mouseout',function(){
tooltip.style.visibility = 'hidden';
tooltip.style.opacity = '0';
});*/

var input = document.createElement('input');
input.type = 'text';

input.setAttribute('placeholder',placeholder);
input.value = text;

if(attrToUpdate == "data-max-length"){
    input.setAttribute("maxLength","5");
}else{
    if(attrToUpdate == "data-title"){
        input.setAttribute("maxLength","25");
    }else{
        if(attrToUpdate == "data-description"){
            input.setAttribute("maxLength","5000");
        }
    }
}

if(onlyNumericals == 1){
    input.addEventListener('keypress',function(e){
        if(e.keyCode == 13){
            self.updateAttribute(attrToUpdate,e);
        }else{
            if(isNumber(e) == false){
                e.preventDefault();
                return false;
            }else{
                if(isNumber(e) == true){
                    return true;
                }
            }
        }
    });
}else{
    input.addEventListener('input',function(e){
        self.updateAttribute(attrToUpdate,e);
    });
}

div.appendChild(label);
div.appendChild(icon);
div.appendChild(tooltip);
div.appendChild(input);

document.getElementsByClassName('elementEditor')[0].appendChild(div);
}

addTextBox(labelText,placeholder,text,tooltipText){
    const self = this;
    var div = document.createElement('div');
    div.className = 'inputHolder';

    var label = document.createElement('span');
    label.innerText = labelText;
    label.className = 'label';

    var tooltip = document.createElement('span');
    tooltip.innerText = tooltipText;
    tooltip.className = 'tooltip';

    var icon = document.createElement('i');
    icon.className = 'fas fa-info';
    icon.addEventListener('mouseover',function(){
        tooltip.style.visibility = 'visible';
        tooltip.style.opacity = '1';
    });

    icon.addEventListener('mouseout',function(){
        tooltip.style.visibility = 'hidden';
        tooltip.style.opacity = '0';
    });

    var input = document.createElement('input');
    input.type = 'text';

    input.setAttribute('placeholder',placeholder);
    input.value = text;

    if(labelText == 'Text'){
        input.addEventListener('input',self.updateText);
    }

    if(labelText == 'Title'){
        input.addEventListener('input',self.updateTitle);
    }

    if(labelText == 'Description'){
        input.addEventListener('input',self.updateDescription);
    }

    if(labelText == 'Placeholder'){
        input.addEventListener('input',self.updatePlaceholder);
    }

    if(labelText == 'Image URL'){
        input.addEventListener('input',self.updateImageURL);
    }

    if(labelText == 'Video URL'){
        input.addEventListener('input',self.updateVideoURL);
    }

    if(labelText == 'Thumbnail Image'){
        input.addEventListener('input',self.updateThumbnail);
    }

    div.appendChild(label);
    div.appendChild(icon);
    div.appendChild(tooltip);
    div.appendChild(input);

    document.getElementsByClassName('elementEditor')[0].appendChild(div);
}

updateAttribute(attrToUpdate,e){
    var element = document.getElementsByClassName('selected')[0];
    var elementType = $(element).attr('data-e-type');
    var valueToSet = e.target.value;

    if(attrToUpdate == "data-max-length"){
        if(elementType.includes("textbox")){
            var input = element.getElementsByTagName("input")[0];
            var lengthText = element.getElementsByClassName("inputLength")[0];

            element.setAttribute("data-max-length",valueToSet);
            input.setAttribute("maxlength",valueToSet);

            if(input.value.length > valueToSet){
                input.value = input.value.substring(0,valueToSet);
                lengthText.innerText = valueToSet + "/" + valueToSet;
            }else{
                lengthText.innerText = input.value.length + "/" + valueToSet;
            }

        }
    }else{
        if(attrToUpdate == "data-title"){
            if(elementType.includes("video-player-two")){
                element.setAttribute("data-title",valueToSet);

                if(element.getElementsByClassName("video-cover")[0]){
                    if(element.getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0]){
                        element.getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0].innerText = valueToSet;
                        element.getElementsByClassName("video-info")[0].getElementsByClassName("heading")[0].innerText = valueToSet;

                        if(element.getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0].innerText.length >= 10){
                            element.getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0].style.fontSize = "35px";
                        }else{
                            if(element.getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0].innerText.length < 10){
                                element.getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0].style.fontSize = "50px";
                            }
                        }
                    }
                }
            }else{
                if(elementType.includes("video-player-one")){
                    element.setAttribute("data-title",valueToSet);
                    element.getElementsByClassName("video-info")[0].getElementsByClassName("heading")[0].innerText = valueToSet;
                }
            }
        }else{
            if(attrToUpdate == "data-description"){
                if(elementType.includes("video-player-two") || elementType.includes("video-player-one")){
                    element.setAttribute("data-description",valueToSet);
                    element.getElementsByClassName("video-info")[0].getElementsByClassName("description")[0].innerText = valueToSet;
                }
            }
        }
    }

}

updateText(e){
    var element = document.getElementsByClassName('selected')[0];
    var elementType = $(element).attr('data-e-type');

    if(elementType == 'heading' || elementType == 'paragraph' || elementType == 'div' || elementType == 'button'){
        element.innerText = e.target.value;
    }

    if(elementType == 'textinput' || elementType == 'textarea'){
        element.value = e.target.value;
    }

    if(elementType.includes("textbox")){
        element.getElementsByTagName("label")[0].innerText = e.target.value;
    }

    if(elementType.includes("ratings")){
        element.getElementsByTagName("p")[0].innerText = e.target.value;
    }

    if(elementType.includes("dropdown-list")){
        var selected = element.getAttribute("data-selected");
        var seperator = ": ";
        if(selected == null || selected == " "){
            selected = "";
            seperator = "";
        }
        element.getElementsByClassName("selected_option")[0].getElementsByTagName("span")[0].innerText = e.target.value+seperator+selected;
        //publicEvents.dropdownlist_position_icons(element.getElementsByClassName("options")[0].getElementsByTagName("ul")[0],"left");
    }

    if(elementType.includes("checkbox-multi")){
        element.getElementsByTagName("p")[0].innerText = e.target.value;
    }else{
        if(elementType.includes('checkbox') || elementType.includes('toggle-switch')){
            element.getElementsByTagName("p")[0].innerText = e.target.value;
        }
    }

}

updateTitle(e){
    var element = document.getElementsByClassName('selected')[0];
    var elementType = $(element).attr('data-e-type');

    if(elementType == "video-playlist-one"){
        element.getElementsByClassName("video-playlist-info")[0].getElementsByClassName("heading")[0].innerText = e.target.value;
    }
}

updateDescription(e){
    var element = document.getElementsByClassName('selected')[0];
    var elementType = $(element).attr('data-e-type');

    if(elementType == "video-playlist-one"){
        element.getElementsByClassName("video-playlist-info")[0].getElementsByClassName("description")[0].innerText = e.target.value;
    }
}

updatePlaceholder(e){
    var element = document.getElementsByClassName('selected')[0];
    var elementType = $(element).attr('data-e-type');

    if(elementType == 'textinput' || elementType == 'textarea'){
        element.setAttribute('placeholder',e.target.value);
    }

    if(elementType.includes("textbox")){
        element.getElementsByTagName("input")[0].setAttribute("placeholder",e.target.value);
    }
}

updateImageURL(e){
    var element = document.getElementsByClassName('selected')[0];
    var elementType = $(element).attr('data-e-type');

    if(elementType == 'image'){
        element.setAttribute('src',e.target.value);
    }
}

updateVideoURL(e){
    var element = document.getElementById(document.getElementsByClassName('selected')[0].id+'videoPlayer');
    var elementType = $(element).attr('data-e-type');

    if(elementType == 'video'){
        element.setAttribute('src',e.target.value);
    }
}

updateThumbnail(e){
    var element = document.getElementById(document.getElementsByClassName('selected')[0].id+'videoPlayer');
    var elementType = $(element).attr('data-e-type');

    if(elementType == 'video'){
        element.setAttribute('data-thumbnail',e.target.value);
    }
}

adjust_ImgSlider1_images_in_slides(sliderElement){
    const self = this;
    var allImages = sliderElement.getElementsByTagName("img");
    var allSlides = sliderElement.getElementsByClassName("imgSlide");

    var totalImages = allImages.length;
    var totalSlides = allSlides.length;

    var slidesNeeded = Math.ceil(totalImages/4); //Total Images Divided By Total Images Per Slide.

    if(totalSlides == slidesNeeded){
        return false;
    }else{
        if(totalSlides > slidesNeeded){

            // Delete Empty Slides. -----

            for(var i=0; i<allSlides.length; i++){
                var slideImages = allSlides[i].getElementsByTagName("img");
                var totalSlideImages = 0;

                for(var o=0; o<slideImages.length; o++){
                    totalSlideImages += 1;
                }

                if(totalSlideImages == 0){
                    allSlides[i].remove();
                    sliderElement.setAttribute("data-total",Number(sliderElement.getAttribute("data-total"))-1);

                    for(var u=0; u<allSlides.length; u++){
                        allSlides[u].classList.remove("active");
                    }

                    allSlides[0].classList.add("active");
                    sliderElement.setAttribute("data-active",0);
                }
            }

            // Deleted All Empty Slides Till Here. -----

            // Complete All Half-Empty Slides And Delete Empty Slides. -----

            var slidesWithSpaceEmpty = [];
            var re_allSlides = sliderElement.getElementsByClassName("imgSlide");

            for(var s=0; s<re_allSlides.length; s++){
                var ImagesInSlide = re_allSlides[s].getElementsByTagName("img");
                var TotalImagesInSlide = 0;

                for(var si=0; si<ImagesInSlide.length; si++){
                    TotalImagesInSlide += 1;
                }

                if(TotalImagesInSlide < 4){
                    slidesWithSpaceEmpty.push(re_allSlides[s]);
                }
            }

            console.log(slidesWithSpaceEmpty);

            if(slidesWithSpaceEmpty.length > 0){
                var currentSlide = 0;

                if(currentSlide !== slidesWithSpaceEmpty.length){
                    self.shiftImgSlider1Images(slidesWithSpaceEmpty[currentSlide],slidesWithSpaceEmpty[currentSlide+1]);

                    console.log(currentSlide+"completed shifting images.");
                    currentSlide += 1;
                }
            }

        }
    }

    console.log("Images: "+totalImages+" In Slides: "+totalSlides+". "+slidesNeeded+" Slides Needed");
}

shiftImgSlider1Images(slideOne,slideTwo){
    var slideOneImages = slideOne.getElementsByTagName("img");
    var slideTwoImages = slideTwo.getElementsByTagName("img");

    var numberOfSlidesToPut = slideOneImages.length - slideTwoImages.length;

    if(numberOfSlidesToPut !== 0 && slideOneImages.length < 4 && slideTwoImages.length >= 1){
        console.log("passed criteria");
        for(var i=0; i<numberOfSlidesToPut; i++){
            slideOne.appendChild(slideTwoImages[i]);
            console.log("appened img");
        }
    }

}

}

function isNumber(evt){
    var charCode = (evt.which) ? evt.which : evt.keyCode
    if(charCode > 31 && (charCode < 48 || charCode > 57)){
        return false;
    }

    return true;
}
