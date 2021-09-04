async function setupBasicStyler(){
    var previewbox = document.getElementById('previewbox');
    previewbox.style.display = 'block';

    if(document.getElementsByClassName("selected-element")[0].tagName == 'video' || document.getElementsByClassName("selected-element")[0].tagName == 'image'){
        let changesourcediv = Globals.elements.new({
            type: "div",
            parent: previewbox,
            classes: [ "sourcechangediv" ],
            children: [
                {
                    type: "input",
                    classes: [ "input" ],
                    attributes: {
                        placeholder: "Enter "+document.getElementsByClassName("selected-element")[0].tagName+" source here"
                    },
                    listeners: {
                        keyup: function(){
                            var ele = document.getElementById('preview'+document.getElementsByClassName("selected-element")[0].tagName);
                            ele.setAttribute('src',this.value);
                        }
                    }
                },
                {
                    type: "ul",
                    children: [
                        {
                            type: "li",
                            listeners: {
                                click: function(){
                                    changesourcediv.style.display = 'none';
                                }
                            }
                        }
                    ]
                }
            ]
        });
    }else{
        let changetextdiv = Globals.elements.new({
            type: "div",
            parent: previewbox,
            classes: [ "textchangediv" ],
            children: [
                {
                    type: "input",
                    classes: [ "input" ],
                    attributes: {
                        placeholder: "Enter text here"
                    },
                    listeners: {
                        keyup: function(){
                            var ele = document.getElementById('preview'+document.getElementsByClassName("selected-element")[0].tagName);
                            if(this.value == ''){
                                if(document.getElementsByClassName("selected-element")[0].tagName == 'input'){
                                    ele.value = 'Preview '+document.getElementsByClassName("selected-element")[0].tagName;
                                }else{
                                    ele.innerText = 'Preview '+document.getElementsByClassName("selected-element")[0].tagName;
                                }
                            }else{
                                if(document.getElementsByClassName("selected-element")[0].tagName == 'input'){
                                    ele.value = this.value;
                                }else{
                                    ele.innerText = this.value;
                                }
                            }
                        }
                    }
                },
                {
                    type: "ul",
                    children: [
                        {
                            type: "li",
                            listeners: {
                                click: function(){
                                    changetextdiv.style.display = 'none';
                                }
                            }
                        }
                    ]
                }
            ]
        });
    }

    let changeshapediv = Globals.elements.new({
        type: "div",
        parent: previewbox,
        classes: [ "shapechangediv" ],
        children: [
            {
                type: "ul",
                children: [
                    ...(() => {
                        return [
                            { name: "Square", key: "square" },
                            { name: "Rectangle", key: "rectangle" },
                            { name: "Circle", key: "circle" },
                            { name: "Oval", key: "oval" },
                            { name: "Parallelogram", key: "parallelogram" },
                            ...(() => {
                                return document.getElementsByClassName("selected-element")[0].tagName == 'button' ? [{ name: "Triangle", key: "Triangle" }] : document.getElementsByClassName("selected-element")[0].tagName == 'div' ? [{ name: "Triangle", key: "Triangle" }, { name: "Trapezoid", key: "trapezoid" }] : [];
                            })(),
                        ].map((x, i) => {
                            return {
                                type: "li",
                                text: x.name,
                                listeners: {
                                    click: function(){
                                        changeElementShape(x.key);
                                    },
                                }
                            }
                        })
                    })(),
                    {
                        type: "li",
                        text: "Some styling properties might get reversed after changing the shape."
                    }
                ]
            }
        ]
    });

    let previewboxbanner = Globals.elements.new({
        type: "banner",
        parent: previewbox,
        children: [
            {
                type: "h5",
                text: "Preview",
            }
        ]
    });

    let basicdiv = Globals.elements.new({
        type: "div",
        parent: document.getElementById("panel"),
        id: "basicdiv",
        children: [
            {
                type: "banner",
                children: [
                    {
                        type: "h5",
                        text: "Basic",
                    }
                ]
            }
        ]
    });

    //-------FontSize--------

    await setupBasicSliders();

    let editbuttons = Globals.elements.new({
        type: "div",
        parent: previewbox,
        classes: [ "eb" ],
        children: [
            ...(() => {
                return document.getElementsByClassName("selected-element")[0].tagName == 'video' || document.getElementsByClassName("selected-element")[0].tagName == 'image' ? [
                    {
                        type: "label",
                        text: "Src",
                        listeners: {
                            click: function(){
                                document.getElementsByClassName('sourcechangediv')[0].style.display = 'block';
                            }
                        }
                    }
                ] : [
                    {
                        type: "label",
                        text: "Text",
                        listeners: {
                            click: function(){
                                document.getElementsByClassName('textchangediv')[0].style.display = 'block';
                            }
                        }
                    }
                ];
            })(),
            {
                type: "label",
                text: "Shape",
                listeners: {
                    click: function(){
                        document.getElementsByClassName('shapechangediv')[0].style.display = 'block';
                        document.getElementsByClassName('spinner')[0].style.display = 'block';

                        setTimeout(function(){
                            document.getElementsByClassName('shapechangediv')[0].style.opacity = '1';
                            document.getElementsByClassName('spinner')[0].style.display = 'none';
                        },500);
                    }
                }
            }
        ]
    });
}

function changeElementShape(shapeName){
    var element = document.getElementsByClassName("selected-element")[0];

    if(shapeName == 'square'){
        element.style.width = '125px';
        element.style.height = '125px';
        element.style.transform = 'translate(-50%,-50%)';
        element.style.borderRadius = '0px';
        element.style.border = '1px solid black';
        toggleHints('hide','triangle');
    }

    if(shapeName == 'rectangle'){
        element.style.width = '175px';
        element.style.height = '100px';
        element.style.transform = 'translate(-50%,-50%)';
        element.style.borderRadius = '0px';
        element.style.border = '1px solid black';
        toggleHints('hide','triangle');
    }

    if(shapeName == 'circle'){
        element.style.width = '150px';
        element.style.height = '150px';
        element.style.borderRadius = '50%';
        element.style.transform = 'translate(-50%,-50%)';
        element.style.border = '1px solid black';
        toggleHints('hide','triangle');
    }

    if(shapeName == 'oval'){
        element.style.width = '225px';
        element.style.height = '125px';
        element.style.borderRadius = '50%';
        element.style.transform = 'translate(-50%,-50%)';
        element.style.border = '1px solid black';
        toggleHints('hide','triangle');
    }

    if(shapeName == 'trapezoid'){
        element.style.width = '100px';
        element.style.height = '0px';
        element.style.borderBottom = '100px solid black';
        element.style.borderLeft = '50px solid transparent';
        element.style.borderRight = '50px solid transparent';
        element.style.transform = 'translate(-50%,-50%)';
        element.style.borderRadius = '0px';
        element.style.borderTop = '0px';
        element.style.padding = '0px';
        element.style.borderRadius = '0px';
        toggleHints('hide','triangle');
        toggleHints('show','trapezoid');
    }

    if(shapeName == 'parallelogram'){
        element.style.width = '175px';
        element.style.height = '125px';
        element.style.transform = 'translate(-50%,-50%) skewX(20deg)';
        element.style.borderRadius = '0px';
        element.style.border = '1px solid black';
        document.getElementById('skewbox').getElementsByTagName('div')[0].getElementsByTagName('input')[0].value = '20';
        toggleHints('hide','triangle');
    }

    if(shapeName == 'triangle'){
        element.style.content = ' ';
        element.style.width = '0px';
        element.style.height = '0px';
        element.style.borderBottom = '140px solid '+element.style.borderColor;
        element.style.borderLeft = '70px solid transparent';
        element.style.borderRight = '70px solid transparent';
        element.style.transform = 'translate(-50%,-50%)';
        element.style.borderTop = '0px';
        element.style.padding = '0px';
        element.style.borderRadius = '0px';

        $('#bordercolor').find('hintlabel').remove();
        toggleHints('show','triangle');

    }

    document.getElementsByClassName('shapechangediv')[0].style.opacity = '0';
    setTimeout(function(){document.getElementsByClassName('shapechangediv')[0].style.display = 'none';},500);
}
