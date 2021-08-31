class MiniStyler{

    constructor(){}

    load(){
    }

    empty(){
        var comboboxes = document.getElementsByClassName('miniStyler')[0].getElementsByTagName('combobox');

        for(var i = comboboxes.length -1; i >= 0 ; i--){
            comboboxes[i].remove();
        }
    }

    open(){
        const self = this;

        let stylerDiv = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "miniStyler" ],
            listeners: {
                mousedown: function(e){
                    self.mousedown(e);
                }
            },
            children: [
                {
                    type: "div",
                    classes: [ "spinner" ]
                },
                {
                    type: "div",
                    classes: [ "banner" ],
                    children: [
                        {
                            type: "p",
                            text: "Mini Styler"
                        }
                    ]
                },
                {
                    type: "div",
                    classes: [ "miniStyler_box" ],
                },
                {
                    type: "div",
                    classes: [ "settings" ],
                    children: [
                        {
                            type: "p",
                            text: "Unit: ",
                        },
                        {
                            type: "input",
                            attributes: {
                                type: "text",
                                placeholder: "%% or px",
                                maxLength: "2",
                            },
                            listeners: {
                                input: function(){
                                    if(this.value.length == 2){
                                        if(this.value == 'px'){
                                            self.loadComboboxes('px');
                                        }else{
                                            if(this.value == '%%'){
                                                self.loadComboboxes('%');
                                            }else{
                                                Globals.notificationHandler.new('Error, '+this.value+' unit not supported');
                                            }
                                        }
                                    }
                                }
                            }
                        },
                    ]
                }
            ]
        });

        this.loadComboboxes('default');
    }

    async loadComboboxes(unit){
        const self = this;
        $('.miniStyler').find('.spinner').css({'display':'block'});
        $('.miniStyler').find('*').not('.spinner').css({'opacity':'0.7','pointer-events':'none'});

        setTimeout(async function(){
            $('.miniStyler').find('.spinner').css({'display':'none'});
            $('.miniStyler').find('*').not('.spinner').css({'opacity':'1','pointer-events':'unset'});

            self.empty();

            var width_unit = 'px', height_unit = 'px';

            var width_values_px = [{value:'50'},{value:'70'},{value:'90'},{value:'125'},{value:'150'},{value:'175'}];
            var width_values_percentage = [{value:'25'},{value:'50'},{value:'75'},{value:'100'}];

            var height_values_px = [{value:'20'},{value:'40'},{value:'70'},{value:'90'},{value:'125'},{value:'150'}];
            var height_values_percentage = [{value:'10'},{value:'25'},{value:'45'},{value:'75'}];

            if(unit == 'default'){
                if(document.getElementsByClassName('selected')[0].classList.contains('topnavbar')){
                    width_unit = '%';
                    height_unit = 'px';
                    await self.addComboBox('Width','wpb_styler_width',1,0,width_unit,width_values_percentage);
                    await self.addComboBox('Height','wpb_styler_height',1,0,height_unit,height_values_px);
                }else{
                    await self.addComboBox('Width','wpb_styler_width',1,0,width_unit,width_values_px);
                    await self.addComboBox('Height','wpb_styler_height',1,0,height_unit,height_values_px);
                }
            }else{
                if(unit == 'px'){
                    width_unit = 'px';
                    height_unit = 'px';
                    await self.addComboBox('Width','wpb_styler_width',1,0,width_unit,width_values_px);
                    await self.addComboBox('Height','wpb_styler_height',1,0,height_unit,height_values_px);
                }else{
                    if(unit == '%'){
                        width_unit = '%';
                        height_unit = '%';
                        await self.addComboBox('Width','wpb_styler_width',1,0,width_unit,width_values_percentage);
                        await self.addComboBox('Height','wpb_styler_height',1,0,height_unit,height_values_percentage);
                    }
                }
            }

            await self.addComboBox('Display','wpb_styler_display',0,0,'',[{value:'Block'},{value:'Inline'},{value:'Contents'},{value:'Flex'},{value:'Grid'},{value:'Inline-Block'},{value:'Inline-Flex'},{value:'Inline-Grid'},{value:'Inline-Table'},{value:'List-Item'},{value:'Run-In'},{value:'Table-Caption'},{value:'Table-Column-Group'},{value:'Table-Header-Group'},{value:'Table-Footer-Group'},{value:'Table-Row-Group'},{value:'Table-Cell'},{value:'Table-Column'},{value:'Table-await Row'},{value:'None'}]);
            await self.addComboBox('Background Color','wpb_styler_backgroundColor',0,1,'',[]);
            await self.addComboBox('Font Size','wpb_styler_fontSize',1,0,'px',[{value:'10'},{value:'12'},{value:'15'},{value:'17'},{value:'19'},{value:'22'}]);
            await self.addComboBox('Font Color','wpb_styler_fontColor',0,1,'',[]);
            await self.addComboBox('Text Align','wpb_styler_textAlign',0,0,'',[{value:'Left'},{value:'Center'},{value:'Right'}]);
            await self.addComboBox('Text Decoration','wpb_styler_textDecoration',0,0,'',[{value:'OverLine'},{value:'Line-Through'},{value:'Underline'},{value:'Underline Overline'},{value:'None'}]);
            await self.addComboBox('Text Decoration Style','wpb_styler_textDecorationStyle',0,0,'',[{value:'Solid'},{value:'Double'},{value:'Dotted'},{value:'Dashed'},{value:'Wavy'}]);
            await self.addComboBox('Text Decoration Color','wpb_styler_textDecorationColor',0,1,'',[]);
            await self.addComboBox('Font Style','wpb_styler_fontStyle',0,0,'',[{value:'Normal'},{value:'Italic'}]);
            await self.addComboBox('Font Weight','wpb_styler_fontWeight',0,0,'',[{value:'Normal'},{value:'Bold'}]);
            await self.addComboBox('Font Variant','wpb_styler_fontVariant',0,0,'',[{value:'Normal'},{value:'Small-Caps'}]);
            await self.addComboBox('Font Stretch','wpb_styler_fontStretch',0,0,'',[{value:'Normal'},{value:'Condensed'},{value:'Expanded'}]);
            await self.addComboBox('Border Size','wpb_styler_borderSize',1,0,'px',[{value:'2'},{value:'4'},{value:'8'}]);
            await self.addComboBox('Border Color','wpb_styler_borderColor',0,1,'',[]);
            await self.addComboBox('Border Radius','wpb_styler_borderRadius',1,0,'px',[{value:'3'},{value:'6'},{value:'12'}]);
            await self.addComboBox('Border Style','wpb_styler_borderSize',0,0,'',[{value:'Solid'},{value:'Dotted'},{value:'Double'},{value:'Dashed'},{value:'Groove'},{value:'Ridge'},{value:'Dotted Solid'},{value:'Dotted Solid Double Dashed'},{value:'OutSet'},{value:'Inset'}]);
            await self.addComboBox('White Space','wpb_styler_whiteSpace',0,0,'',[{value:'Normal'},{value:'NoWrap'},{value:'Pre'},{value:'Pre-Line'},{value:'Pre-Wrap'}]);
            await self.addComboBox('Margin Left','wpb_styler_marginLeft',1,0,'px',[]);
            await self.addComboBox('Margin Right','wpb_styler_marginRight',1,0,'px',[]);
            await self.addComboBox('Margin Top','wpb_styler_marginTop',1,0,'px',[]);
            await self.addComboBox('Margin Bottom','wpb_styler_marginBottom',1,0,'px',[]);
            await self.addComboBox('Padding Left','wpb_styler_paddingLeft',1,0,'px',[]);
            await self.addComboBox('Padding Right','wpb_styler_paddingRight',1,0,'px',[]);
            await self.addComboBox('Padding Top','wpb_styler_paddingTop',1,0,'px',[]);
            await self.addComboBox('Padding Bottom','wpb_styler_paddingBottom',1,0,'px',[]);
            await self.addComboBox('Letter Space','wpb_styler_letterSpace',1,0,'px',[]);
            await self.addComboBox('Word Space','wpb_styler_wordSpace',1,0,'px',[]);
            await self.addComboBox('Outline Width','wpb_styler_outlineWidth',1,0,'px',[]);
            await self.addComboBox('Outline Color','wpb_styler_outlineColor',1,1,'',[]);
            await self.addComboBox('Outline Style','wpb_styler_outlineStyle',0,0,'',[{value:'Solid'},{value:'Dotted'},{value:'Double'},{value:'Dashed'},{value:'Groove'},{value:'Ridge'},{value:'Hidden'},{value:'Outset'},{value:'Inset'},{value:'None'}]);
            await self.addComboBox('Box Shadow','wpb_styler_boxShadowColor',1,1,'',[]);
            await self.addComboBox('Text Shadow','wpb_styler_textShadowColor',1,1,'',[]);

        },3000);

    }

    close(){
        document.getElementsByClassName('miniStyler')[0].remove();
    }

    async addComboBox(comboboxTitle,comboboxId,addCustomEdit,addColorPicker,unit,comboboxOptions){
        let combobox = await Globals.components.new({
            name: "internal-combobox",
            parent: document.getElementsByClassName('miniStyler_box')[0],
            elementType: "selected",
            data: {
                id: comboboxId,
                style: {
                    left: "10px",
                },
                text: comboboxTitle,
                options: comboboxOptions.map(x => (x.value)),
                customValue: addCustomEdit === 1 ? {
                    classes: comboboxTitle == 'Box Shadow' || comboboxTitle == 'Text Shadow' ? [ "customlarge" ] : null,
                    value: comboboxTitle == 'Box Shadow' || comboboxTitle == 'Text Shadow' ? "0px 0px 0px" : null,
                    call: "updatePageElement"
                } : null,
                colorPicker: addColorPicker === 1 ? {
                    idPrefix: Globals.pageHandler.Globals.randomizer.id(10),
                    style: comboboxTitle == 'Box Shadow' || comboboxTitle == 'Text Shadow' ? {
                        left: "0px",
                        right: "unset"
                    } : null,
                } : null,
            }
        });
    }

    drag(e){
        var elmnt = document.getElementsByClassName('miniStyler')[0];
        e = e || window.event;
        e.preventDefault();

        // calculate the new cursor position:
        Globals.pageHandler.styler_pos1 = Globals.pageHandler.styler_pos3 - e.clientX;
        Globals.pageHandler.styler_pos2 = Globals.pageHandler.styler_pos4 - e.clientY;
        Globals.pageHandler.styler_pos3 = e.clientX;
        Globals.pageHandler.styler_pos4 = e.clientY;

        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - Globals.pageHandler.styler_pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - Globals.pageHandler.styler_pos1) + "px";
        elmnt.style.cursor = 'grabbing';
    }

    mousedown(e){
        var elmnt = document.getElementsByClassName('miniStyler')[0];
        if(e.target == elmnt){
            e = e || window.event;
            e.preventDefault();

            elmnt.style.cursor = 'grab';

            // get the mouse cursor position at startup:
            Globals.pageHandler.styler_pos3 = e.clientX;
            Globals.pageHandler.styler_pos4 = e.clientY;
            document.onmouseup = this.closeDrag;

            // call a function whenever the cursor moves:
            document.onmousemove = this.drag;
        }
    }

    closeDrag(){
        var elmnt = document.getElementsByClassName('miniStyler')[0];
        document.onmouseup = null;
        document.onmousemove = null;
        elmnt.style.cursor = 'default';
    }

}
