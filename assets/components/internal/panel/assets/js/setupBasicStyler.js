async function setupBasicStyler(elementType){
    var previewbox = document.getElementById('previewbox');
    previewbox.style.display = 'block';

    if(elementType == 'video' || elementType == 'image'){
        let changesourcediv = Globals.elements.new({
            type: "div",
            parent: previewbox,
            classes: [ "sourcechangediv" ],
            children: [
                {
                    type: "input",
                    classes: [ "input" ],
                    attributes: {
                        placeholder: "Enter "+elementType+" source here"
                    },
                    listeners: {
                        keyup: function(){
                            var ele = document.getElementById('preview'+elementType);
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
                            var ele = document.getElementById('preview'+elementType);
                            if(this.value == ''){
                                if(elementType == 'input'){
                                    ele.value = 'Preview '+elementType;
                                }else{
                                    ele.innerText = 'Preview '+elementType;
                                }
                            }else{
                                if(elementType == 'input'){
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
                                return elementType == 'button' ? [{ name: "Triangle", key: "Triangle" }] : elementType == 'div' ? [{ name: "Triangle", key: "Triangle" }, { name: "Trapezoid", key: "trapezoid" }] : [];
                            })(),
                        ].map((x, i) => {
                            return {
                                type: "li",
                                text: x.name,
                                listeners: {
                                    click: function(){
                                        changeElementShape(elementType, x.key);
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

    let fontsize = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "fontsize",
            style: {
                left: "10px",
            },
            text: "Font Size",
            customValue: {
                call: "updateElement",
            },
            options: ["8px", "12px", "16px"],
        }
    });

    let fontfamily = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "fontfamily",
            style: {
                left: "200px",
            },
            text: "Font Family",
            options: ["Sans", "Sans-Serif", "Helvectia", "Monospace", "Cursive", "Fantasy"],
        }
    });

    let fontweight = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "fontweight",
            style: {
                left: "390px",
            },
            text: "Font Weight",
            options: ["Normal", "Bold"],
        }
    });

    let fontstyle = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "fontstyle",
            style: {
                left: "580px",
            },
            text: "Font Style",
            options: ["Normal", "Italic"],
        }
    });

    let fontvariant = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "fontvariant",
            style: {
                left: "770px",
            },
            text: "Font Variant",
            options: ["Normal", "Small-Caps"],
        }
    });

    let fontstretch = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "fontstretch",
            style: {
                left: "10px",
                top: "70px",
                zIndex: "4",
            },
            text: "Font Stretch",
            options: ["Normal", "Condensed", "Expanded"],
        }
    });

    let fontcolor = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "fontcolor",
            style: {
                left: "10px",
                top: "140px",
                zIndex: "3",
            },
            text: "Font Color",
            colorPicker: {
                idPrefix: "fc",
            },
        }
    });

    let backgroundcolor = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "backgroundcolor",
            style: {
                left: "200px",
                top: "140px",
                zIndex: "3",
            },
            text: "Background Color",
            colorPicker: {
                idPrefix: "bgc",
            },
        }
    });

    let bordercolor = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "bordercolor",
            style: {
                left: "390px",
                top: "140px",
                zIndex: "3",
            },
            text: "Border Color",
            colorPicker: {
                idPrefix: "bc",
            },
        }
    });

    let textalign = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "textalign",
            style: {
                left: "200px",
                top: "70px",
                zIndex: "4",
            },
            text: "Text Align",
            options: ["Center", "Left", "Right"],
        }
    });

    let textdecoration = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "textdecoration",
            style: {
                left: "390px",
                top: "70px",
                zIndex: "4",
            },
            text: "Text Decoration",
            colorPicker: {
                idPrefix: "td"
            },
            options: [ "Overline", "Line-Through", "Underline", "Underline Overline", "None" ],
        }
    });

    let textdecorationstyle = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "textdecorationstyle",
            style: {
                left: "580px",
                top: "70px",
                zIndex: "4",
            },
            text: "Text Decoration Style",
            options: [ "Solid", "Double", "Dotted", "Dashed", "Wavy" ],
        }
    });

    let borderradius = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "borderradius",
            style: {
                left: "770px",
                top: "70px",
                zIndex: "4",
            },
            text: "Border Radius",
            customValue: {
                call: "updateElement",
            },
            options: [ "5px", "10px", "20px" ],
        }
    });

    let bordersize = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "bordersize",
            style: {
                left: "580px",
                top: "140px",
                zIndex: "3",
            },
            text: "Border Size",
            customValue: {
                call: "updateElement",
            },
            options: [ "2px", "4px", "8px" ],
        }
    });

    let borderstyle = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "borderstyle",
            style: {
                left: "770px",
                top: "140px",
                zIndex: "3",
            },
            text: "Border Style",
            options: [ "Solid", "Dotted", "Double", "Dashed", "Groove", "Ridge", "Dotted Solid", "Dotted Solid Double Dashed", "Outset", "Inset" ],
        }
    });

    let boxshadow = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "boxshadow",
            width: "250px",
            style: {
                left: "10px",
                top: "210px",
                zIndex: "2",
            },
            text: "Box Shadow",
            customValue: {
                placeholder: "0px 0px 0px 0px",
                classes: [ "customlarge" ],
                call: "updateElement"
            },
            colorPicker: {
                idPrefix: "boxs",
            },
        }
    });

    let display = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "display",
            style: {
                left: "300px",
                top: "210px",
                zIndex: "2",
            },
            text: "Display",
            options: ["Block", "Inline", "Contents", "Flex", "Grid", "Inline-Block", "Inline-Flex", "Inline-Grid", "Inline-Table", "List-Item", "Run-In", "Table", "Table-Caption", "Table-Column-Group", "Table-Header-Group", "Table-Footer-Group", "Table-Row-Group", "Table-Cell", "Table-Column", "Table-Row", "None"]
        }
    });

    let opacity = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "opacity",
            style: {
                left: "490px",
                top: "210px",
                zIndex: "2",
            },
            text: "Opacity",
            customValue: {
                call: "updateElement",
            }
        }
    });

    let whitespace = await Globals.components.new({
        name: "internal-combobox",
        parent: basicdiv,
        elementType,
        data: {
            id: "whitespace",
            width: "240px",
            style: {
                left: "680px",
                top: "210px",
                zIndex: "2",
            },
            text: "White Space",
            options: ["Normal", "NoWrap", "Pre", "Pre-Line", "Pre-Wrap"]
        }
    });

    await setupBasicSliders(elementType);

    let editbuttons = Globals.elements.new({
        type: "div",
        parent: previewbox,
        classes: [ "eb" ],
        children: [
            ...(() => {
                return elementType == 'video' || elementType == 'image' ? [
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

function changeElementShape(elementType, shapeName){
    var element = document.getElementById('preview'+elementType);

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
