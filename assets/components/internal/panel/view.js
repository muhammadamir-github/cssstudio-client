class InternalPanelView{
    constructor(controller){
        this.controller = controller;
        this._element = null;

        this.elementType = null; // Which type of element is being created.
    }

    create(options = {}){
        const self = this;
        const { data, parent, prepend, before, elementType, component_id } = options;

        self._element = Globals.elements.new({
            type: "div",
            parent,
            id: data.id ? data.id : null,
            style: data.style ? data.style : null,
            listeners: {
                click: function(event){
                    if(event.target.id == this.id || event.target.id == 'advance' || event.target.id == 'animate'){
                        document.getElementsByClassName('shapechangediv')[0].style.opacity = '0';
                        setTimeout(function(){
                            document.getElementsByClassName('shapechangediv')[0].style.display = 'none';
                        }, 1000);
                    }
                }
            },
            children: [
                {
                    type: "div",
                    classes: [ "line" ],
                },
                {
                    type: "div",
                    id: "selecttype"
                },
                {
                    type: "div",
                    id: "buttons",
                    children: [
                        {
                            type: "div",
                            classes: [ "spinner" ],
                        },
                        {
                            type: "button",
                            classes: [ "barbutton" ],
                            text: "Create new element",
                            listeners: {
                                click: function(){
                                    var spinner = document.getElementsByClassName('spinner')[0];
                                    var select = document.getElementById('selecttype');
                                    spinner.style.display = 'block';

                                    if(select.style.width !== "150px"){
                                        self.populateOptions();
                                        spinner.style.display = 'none';
                                        select.style.width = '150px';
                                    }else{
                                        self.populateOptions(true);
                                        spinner.style.display = 'none';
                                        select.style.width = '0px';
                                    }
                                }
                            }
                        }
                    ]
                },
                {
                    type: "div",
                    id: "previewbox"
                }
            ],
            before: before,
            prepend: prepend
        });
    }

    populateOptions(depopulate = false){
        const self = this;

        let options = [
            { text: "Button", param: "button", },
            { text: "Div", param: "div", },
            { text: "Paragraph", param: "paragraph", },
            { text: "Heading", param: "heading", },
            { text: "Text Input", param: "input", },
            { text: "Textarea", param: "textarea", },
            { text: "Image", param: "image", },
            { text: "Video", param: "video", },
        ];

        if(depopulate === true){
            setTimeout(function(){
                $('#selecttype').empty();
            }, 500);
        }else{
            for (let option of options){
                let isFirst = option.text === "Button";
                Globals.elements.new({
                    type: "button",
                    parent: document.getElementById("selecttype"),
                    text: option.text,
                    style: {
                        marginTop: isFirst ? "20px" : "10px",
                    },
                    listeners: {
                        click: function(){
                            self.newPreviewElement(option.param);
                        }
                    }
                })
            }
        }
    }

    newPreviewElement(type){
        const self = this;

        var select = document.getElementById('selecttype');
        select.style.width = '0px';

        self.populateOptions(true);

        let elements = {
            "button": { type: "button", },
            "div": { type: "div", },
            "input": { type: "input", },
            "paragraph": { type: "p", },
            "heading": { type: "h3", },
            "textarea": { type: "textarea", },
            "image": { type: "img", },
            "video": { type: "video", },
        };

        $('#previewbox').empty();
        self.setEnvironment(type);
        self.elementType = type;

        let element = Globals.elements.new({
            type: elements[type].type,
            parent: document.getElementById("previewbox"),
            text: `Preview ${type}`,
            id: `preview${type}`,
            attributes: type === "video" ? { controls: false } : null,
        });
    }

    setEnvironment(element){
        const self = this;
        $('#previewbox').empty();
        $('#basicdiv').remove();
        $('#rotatebox').remove();
        $('#skewbox').remove();
        $('#scalebox').remove();
        $('#stepsdiv').remove();
        $('#advance').remove();
        $('#animate').remove();
        $('giphy').remove();
        $('.backbutton').remove();

        $('.spinner').css('display','block');
        $('#panel').css({'opacity':'0.3','pointer-events':'none'});
        setTimeout(function(){
            setupBasicStyler(element);

            $('.spinner').css('display','none');
            $('#panel').css({'opacity':'1','pointer-events':'unset'});
        },1);
    }
}
