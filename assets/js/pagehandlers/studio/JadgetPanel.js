class JadgetPanel{
    constructor(){
        this.elementType = null;
    }

    start(){
        const self = this;

        let panel = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            id: "panel",
            listeners: {
                click: function(event){
                    if(event.target.id == this.id || event.target.id == 'advance' || event.target.id == 'animate'){
                        document.getElementsByClassName('shapechangediv')[0].style.opacity = '0';
                        setTimeout(function(){document.getElementsByClassName('shapechangediv')[0].style.display = 'none';},1000);
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
                                        self.populateselection();
                                        spinner.style.display = 'none';
                                        select.style.width = '150px';
                                    }else{
                                        self.populateselection("true");
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
            ]
        });

        $('#background').css({'display':'block'});
    }

    populateselection(depopulate){
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

        if(depopulate == 'true'){
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
                            self.newelement(option.param);
                        }
                    }
                })
            }
        }
    }

    newelement(type){
        const self = this;

        var select = document.getElementById('selecttype');
        select.style.width = '0px';

        self.populateselection('true');

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
        self.setEnv(type);
        self.elementtype = type;

        let element = Globals.elements.new({
            type: elements[type].type,
            parent: document.getElementById("previewbox"),
            text: `Preview ${type}`,
            id: `preview${type}`,
            attributes: type === "video" ? { controls: false } : null,
        });
    }

    setEnv(element){
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
            basicSetup(element);
            $('.spinner').css('display','none');
            $('#panel').css({'opacity':'1','pointer-events':'unset'});
        },1);
    }
}

async function basicSetup(element){
    var previewbox = document.getElementById('previewbox');
    previewbox.style.display = 'block';

    if(element == 'video' || element == 'image'){
        let changesourcediv = Globals.elements.new({
            type: "div",
            parent: previewbox,
            classes: [ "sourcechangediv" ],
            children: [
                {
                    type: "input",
                    classes: [ "input" ],
                    attributes: {
                        placeholder: "Enter "+element+" source here"
                    },
                    listeners: {
                        keyup: function(){
                            var ele = document.getElementById('preview'+element);
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
                            var ele = document.getElementById('preview'+element);
                            if(this.value == ''){
                                if(element == 'input'){
                                    ele.value = 'Preview '+element;
                                }else{
                                    ele.innerText = 'Preview '+element;
                                }
                            }else{
                                if(element == 'input'){
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
                                return element == 'button' ? [{ name: "Triangle", key: "Triangle" }] : element == 'div' ? [{ name: "Triangle", key: "Triangle" }, { name: "Trapezoid", key: "trapezoid" }] : [];
                            })(),
                        ].map((x, i) => {
                            return {
                                type: "li",
                                text: x.name,
                                listeners: {
                                    click: function(){
                                        shape(element, x.key);
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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
        name: "combobox",
        parent: basicdiv,
        elementType: element,
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

    await setupRotate(element);
    await setupSkew(element);
    await setupScale(element);
    await setupSteps(element);

    let editbuttons = Globals.elements.new({
        type: "div",
        parent: previewbox,
        classes: [ "eb" ],
        children: [
            ...(() => {
                return element == 'video' || element == 'image' ? [
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

async function setupSkew(element){
    let skewBox = await Globals.elements.new({
        type: "div",
        parent: document.getElementById("panel"),
        id: "skewbox",
        style: {
            display: "block",
        },
        children: [
            {
                type: "banner",
                children: [
                    {
                        type: "h5",
                        text: "Skew"
                    }
                ]
            }
        ]
    });

    let sliderX = await Globals.components.new({
        name: "slider",
        elementType: element,
        parent: skewBox,
        data: {
            text: "Skew x-axis",
            style: {
                marginTop: "15px",
            },
            min: 0,
            max: 180,
            step: 1,
            value: 0
        }
    });

    let sliderY = await Globals.components.new({
        name: "slider",
        elementType: element,
        parent: skewBox,
        data: {
            text: "Skew y-axis",
            min: 0,
            max: 180,
            step: 1,
            value: 0
        }
    });
}

async function setupScale(element){
    let scaleBox = await Globals.elements.new({
        type: "div",
        parent: document.getElementById("panel"),
        id: "scalebox",
        style: {
            display: "block",
        },
        children: [
            {
                type: "banner",
                children: [
                    {
                        type: "h5",
                        text: "Scale"
                    }
                ]
            }
        ]
    });

    let sliderX = await Globals.components.new({
        name: "slider",
        elementType: element,
        parent: scaleBox,
        data: {
            text: "Scale x-axis",
            style: {
                marginTop: "15px",
            },
            min: 1,
            max: 10,
            step: 0.1,
            value: 1
        }
    });

    let sliderY = await Globals.components.new({
        name: "slider",
        elementType: element,
        parent: scaleBox,
        data: {
            text: "Scale y-axis",
            min: 1,
            max: 10,
            step: 0.1,
            value: 1
        }
    });
}

async function setupRotate(element){
    let rotateBox = await Globals.elements.new({
        type: "div",
        parent: document.getElementById("panel"),
        id: "rotatebox",
        style: {
            display: "block",
        },
        children: [
            {
                type: "banner",
                children: [
                    {
                        type: "h5",
                        text: "Rotate"
                    }
                ]
            }
        ]
    });

    let rotateX = await Globals.components.new({
        name: "slider",
        elementType: element,
        parent: rotateBox,
        data: {
            text: "Rotate x-axis",
            style: {
                marginTop: "15px",
            },
            min: 0,
            max: 180,
            step: 1,
            value: 0
        }
    });

    let rotateY = await Globals.components.new({
        name: "slider",
        elementType: element,
        parent: rotateBox,
        data: {
            text: "Rotate x-axis",
            style: {
                marginTop: "15px",
            },
            min: 0,
            max: 180,
            step: 1,
            value: 0
        }
    });
}

function setupSteps(element){
    var stepsDiv = Globals.elements.new({
        type: "div",
        parent: document.getElementById("panel"),
        id: "stepsdiv",
        style: {
            display: "block",
        },
        children: (() => {
            return [
                {
                    name: "Advance",
                    forAll: true,
                    disallowedMemberships: null,
                    listeners: {
                        click: function(){
                            if($('#advance').length > 0){
                                advance(element, 'false');
                            }else{
                                advance(element, 'true');
                            }
                        }
                    }
                },
                {
                    name: "Animate",
                    forAll: false,
                    disallowedMemberships: [ "Free" ],
                    listeners: {
                        click: function(){
                            if($('#animate').length > 0){
                                Globals.pageHandler.Animator.animate(element,'false');
                            }else{
                                Globals.pageHandler.Animator.animate(element,'true');
                            }
                        }
                    }
                },
                {
                    name: "Finish",
                    forAll: true,
                    disallowedMemberships: null,
                    listeners: {
                        click: function(){
                            finishWork(element);
                        }
                    }
                },
            ].map((x, i) => {
                if(x.forAll === true || (Array.isArray(x.disallowedMemberships) && !x.disallowedMemberships.includes(Globals.pageHandler.data.plan))){
                    return {
                        type: "button",
                        text: x.name,
                        listeners: x.listeners
                    }
                }
            })
        })(),
    });
}

async function advance(element,createnew){
    let panel = document.getElementById('panel');

    let backButton = Globals.elements.new({
        type: "button",
        parent: document.getElementById("buttons"),
        classes: [ "barbutton", "backButton" ],
        text: "Go Back",
        style: {
            marginLeft: "10px",
        },
        listeners: {
            click: function(){
                var spinner = document.getElementsByClassName('spinner')[0];
                spinner.style.display = 'block';

                var panel = document.getElementById('panel');
                panel.style.opacity = '0.3';
                panel.style.pointerEvents = 'none';

                var advancediv = document.getElementById('advance');
                setTimeout(function(){
                    spinner.style.display = 'none';
                    panel.style.opacity = '1';
                    panel.style.pointerEvents = 'unset';
                    advancediv.style.display = 'none';
                    backButton.remove();
                    $('.info').remove();
                },1);
            }
        }
    });

    if(createnew == 'true'){
        getGoogleFonts(element,'elementCreator');

        var advancediv = Globals.elements.new({
            type: "div",
            parent: panel,
            id: "advance"
        });

        var advancediv1 = Globals.elements.new({
            type: "div",
            parent: advancediv,
            id: "advance_div1"
        });

        var advancediv2 = Globals.elements.new({
            type: "div",
            parent: advancediv,
            id: "bggradientdiv",
            classes: [ "box" ],
            children: [
                {
                    type: "banner",
                    children: [
                        {
                            type: "h5",
                            text: "Background Gradient"
                        }
                    ]
                },
                {
                    type: "ul",
                    classes: [ "pstick" ],
                    children: [
                        {
                            type: "li",
                            listeners: {
                                click: function(){
                                    applybgg('preview'+element);
                                }
                            }
                        }
                    ]
                }
            ]
        });

        let ends = [
            {
                id: "endx",
                text: "End X",
                style: {
                    left: "15px",
                    top: "5px"
                },
                options: [ "Left", "Right" ],
                spanId: "bggexvalue",
            },
            {
                id: "endy",
                text: "End Y",
                style: {
                    left: "15px",
                    top: "60px",
                    zIndex: "4"
                },
                options: [ "Top", "Bottom" ],
                spanId: "bggeyvalue",
            }
        ];

        for (let end of ends){
            let el = await Globals.components.new({
                name: "combobox",
                parent: advancediv2,
                elementType: element,
                data: {
                    id: end.id,
                    style: end.style,
                    text: end.text,
                    options: end.options,
                }
            });

            Globals.elements.new({
                type: "span",
                parent: el,
                id: end.spanId,
                attribute: {
                    hidden: true
                }
            });
        }

        let colors = [
            {
                id: "c1",
                style: {
                    left: "205px",
                    top: "5px"
                },
                text:"Color 1",
                fontSize: "12px",
                colorPicker: {
                    idPrefix: "bggc1",
                    style: {
                        left: "200px",
                        top: "-100px"
                    }
                }
            },
            {
                id: "c2",
                style: {
                    left: "205px",
                    top: "60px",
                    zIndex: "4",
                },
                text:"Color 2",
                fontSize: "12px",
                colorPicker: {
                    idPrefix: "bggc2",
                    style: {
                        left: "200px",
                        top: "-130px"
                    }
                }
            }
        ];

        for (let color of colors){
            await Globals.components.new({
                name: "combobox",
                parent: advancediv2,
                data: color,
            })
        }

        var backgroundImageDiv = Globals.elements.new({
            type: "div",
            parent: advancediv1,
            id: "bgimgbox",
            children: [
                {
                    type: "banner",
                    children: [
                        {
                            type: "h5",
                            text: "Background Image",
                        }
                    ]
                },
                {
                    type: "button",
                    classes: [ "filebtn" ],
                    text: "Select image",
                    listeners: {
                        click: function(){
                            this.parentElement.getElementsByTagName("input")[0].click();
                        }
                    }
                },
                {
                    type: "giphybutton",
                    listeners: {
                        click: function(){
                            let giphydiv = document.getElementsByTagName("giphy")[0];
                            let giphydivopacity = giphydiv.style.opacity;
                            if(giphydivopacity == 0){
                                giphydiv.style.opacity = 1;
                                setTimeout(function(){giphydiv.style.display = "block";},750);
                                document.getElementById('panel').style.opacity = 0.5;
                                document.getElementById('panel').style.pointerEvents = "none";
                            }

                            if(giphydivopacity == 1){
                                giphydiv.style.opacity = 0;
                                setTimeout(function(){giphydiv.style.display = "none";},750);
                                document.getElementById('panel').style.opacity = 1;
                                document.getElementById('panel').style.pointerEvents = "unset";
                            }
                        }
                    }
                },
                {
                    type: "input",
                    attributes: {
                        hidden: true,
                        type: "file"
                    },
                    listeners: {
                        change: function(){
                            var file = this.files[0];
                            var reader = new FileReader();
                            reader.onload = function () {
                                $('#preview'+element).css({"background-image":"url(" + reader.result + ")","background-size":"cover"});
                            }
                            reader.readAsDataURL(file);
                        }
                    }
                },
            ]
        })

        var giphydiv = Globals.elements.new({
            type: "giphy",
            parent: document.getElementsByTagName('body')[0],
            children: [
                {
                    type: "i",
                    classes: [ "fas", "fa-times", "close" ],
                    listeners: {
                        click: function(){
                            let giphydiv = document.getElementsByTagName("giphy")[0];
                            giphydiv.style.opacity = 0;
                            setTimeout(function(){giphydiv.style.display = "none";},750);
                            document.getElementById('panel').style.opacity = 1;
                            document.getElementById('panel').style.pointerEvents = "unset";
                        }
                    }
                },
                {
                    type: "p",
                    classes: [ "heading" ],
                    text: "Search gifs from giphy.com",
                },
                {
                    type: "input",
                    attributes: {
                        placeholder: "Enter keyword here. Ex: Smile",
                    },
                    classes: [ "searchbar" ]
                },
                {
                    type: "button",
                    classes: [ "searchbutton" ],
                    listeners: {
                        click: function(){
                            let giphysearchinput = this.parentElement.getElementsByTagName("input")[0];
                            Globals.pageHandler.thirdPartyMediaManager.resetImages('elementCreator');
                            Globals.pageHandler.thirdPartyMediaManager.searchGIFS(giphysearchinput.value, element,'elementCreator');
                        }
                    },
                    children: [
                        {
                            type: "i",
                            classes: [ "fas", "fa-search" ]
                        }
                    ]
                },
            ]
        });

        var textShadowDiv = Globals.elements.new({
            type: "div",
            parent: advancediv1,
            classes: [ "box" ],
            style: { zIndex: "2" },
            children: [
                {
                    type: "banner",
                    children: [
                        {
                            type: "h5",
                            text: "Text Shadow",
                        }
                    ]
                },
            ]
        });

        let comboboxes = [
            {
                id: "textshadow",
                parent: textShadowDiv,
                width: "250px",
                style: {
                    left: "50%",
                    transform: "translate(-50%)"
                },
                text: "Text Shadow",
                customValue: {
                    placeholder: "0px 0px 0px",
                    classes: [ "customlarge" ],
                    call: "updateElement"
                },
                colorPicker: {
                    idPrefix: "texts",
                    style: {
                        top: "-10px",
                        left: "-170px"
                    }
                }
            },
        ];

        for (let x of comboboxes){
            await Globals.components.new({
                name: "combobox",
                parent: x.parent,
                elementType: element,
                data: {
                    id: x.id,
                    width: x.width,
                    style: x.style,
                    text: x.text,
                    options: x.options,
                    customValue: x.customValue,
                    colorPicker: x.colorPicker
                }
            });
        }

        var marginDiv = Globals.elements.new({
            type: "div",
            parent: advancediv1,
            classes: [ "box" ],
            style: { height: "300px" },
            children: [
                {
                    type: "banner",
                    children: [
                        {
                            type: "h5",
                            text: "Margin",
                        }
                    ]
                },
            ]
        });

        let margins = [
            {
                id: "marginleft",
                text: "Margin Left",
                style: {
                    transform: "translate(-50%,-50%)",
                    top: "50%",
                    left: "50%",
                    marginTop: "-50px",
                },
            },
            {
                id: "marginbottom",
                text: "Margin Bottom",
                style: {
                    transform: "translate(-50%,-50%)",
                    top: "50%",
                    left: "50%",
                    marginTop: "0px",
                },
            },
            {
                id: "marginright",
                text: "Margin Right",
                style: {
                    transform: "translate(-50%,-50%)",
                    top: "50%",
                    left: "50%",
                    marginTop: "50px",
                },
            },
            {
                id: "margintop",
                text: "Margin Top",
                style: {
                    transform: "translate(-50%,-50%)",
                    top: "50%",
                    left: "50%",
                    marginTop: "100px",
                },
            },
        ];

        for (let margin of margins){
            await Globals.components.new({
                name: "combobox",
                parent: marginDiv,
                elementType: element,
                data: {
                    id: margin.id,
                    elementType: element,
                    style: margin.style,
                    text: margin.text,
                    customValue: {
                        call: "updateElement"
                    }
                }
            });
        }

        var paddingDiv = Globals.elements.new({
            type: "div",
            parent: advancediv1,
            classes: [ "box" ],
            style: { height: "150px", width: "625px" },
            children: [
                {
                    type: "banner",
                    children: [
                        {
                            type: "h5",
                            text: "Padding",
                        }
                    ]
                },
            ]
        });

        let paddings = [
            {
                id: "paddingleft",
                text: "Padding Left",
                width: "120px",
                style: {
                    top: "5px",
                    left: "5px",
                },
            },
            {
                id: "paddingbottom",
                text: "Padding Bottom",
                width: "120px",
                style: {
                    top: "5px",
                    left: "155px",
                },
            },
            {
                id: "paddingright",
                text: "Padding Right",
                width: "120px",
                style: {
                    top: "5px",
                    left: "305px",
                },
            },
            {
                id: "paddingtop",
                text: "Padding Top",
                width: "120px",
                style: {
                    top: "5px",
                    left: "455px",
                },
            }
        ];

        for (let padding of paddings){
            await Globals.components.new({
                name: "combobox",
                parent: paddingDiv,
                elementType: element,
                data: {
                    id: padding.id,
                    width: padding.width,
                    elementType: element,
                    style: padding.style,
                    text: padding.text,
                    customValue: {
                        call: "updateElement"
                    }
                }
            });
        }

        advancediv.appendChild(advancediv1);
        advancediv.appendChild(advancediv2);

        let divsStructures = [
            {
                id: "letterspacediv",
                style: {

                },
                children: [
                    {
                        type: "banner",
                        children: [
                            {
                                type: "h5",
                                text: "Letter Space",
                            }
                        ]
                    },
                ]
            },
            {
                id: "googlefontssdiv",
                style: {
                    overflow: "unset",
                    zIndex: "5"
                },
                children: [
                    {
                        type: "banner",
                        children: [
                            {
                                type: "h5",
                                text: "Google Fonts",
                            }
                        ]
                    },
                ]
            },
            {
                id: "outlinediv",
                text: "",
                style: {
                    zIndex: "5"
                }
            }
        ];

        let divs = [];
        for (let div of divsStructures){
            divs.push(await Globals.elements.new({
                type: "div",
                id: div.id,
                parent: advancediv,
                classes: [ "box" ],
                style: div.style,
                children: div.children
            }));
        }

        let letterspace = await Globals.components.new({
            name: "combobox",
            parent: divs[0],
            elementType: element,
            data: {
                id: "letterspace",
                style: {
                    left: "50%",
                    top: "50%",
                    marginTop: "25px",
                    marginLeft: "0px",
                    transform: "translate(-50%, -50%)"
                },
                text: "Letter Space",
                customValue: {
                    call: "updateElement",
                }
            }
        });

        let outlinestyle = await Globals.components.new({
            name: "combobox",
            parent: divs[2],
            elementType: element,
            data: {
                id: "outlinestyle",
                style: {
                    left: "50%",
                    zIndex: "1",
                    transform: "translate(-50%)"
                },
                text: "Outline Style",
                options: ["Solid", "Dotted", "Double", "Dashed", "Groove", "Ridge", "None", "Hidden", "Outset", "Inset"]
            }
        });

        let outlinewidth = await Globals.components.new({
            name: "combobox",
            parent: divs[2],
            elementType: element,
            data: {
                id: "outlinewidth",
                style: {
                    left: "50%",
                    zIndex: "1",
                    transform: "translate(-50%)"
                },
                text: "Outline Width",
                customValue: {
                    call: "updateElement",
                }
            }
        });

        let outlinecolor = await Globals.components.new({
            name: "combobox",
            parent: divs[2],
            elementType: element,
            data: {
                id: "outlinecolor",
                style: {
                    left: "50%",
                    zIndex: "0",
                    transform: "translate(-50%)"
                },
                text: "Outline Color",
                colorPicker: {
                    idPrefix: "oc",
                    style: { top: "-155px" },
                }
            }
        });
    }

    document.getElementsByClassName('spinner')[0].style.display = 'block';
    panel.style.opacity = '0.3';
    panel.style.pointerEvents = 'none';

    setTimeout(function(){
        document.getElementsByClassName('spinner')[0].style.display = 'none';
        document.getElementById('advance') ? document.getElementById('advance').style.display = 'block' : false;
        panel.style.opacity = '1';
        panel.style.pointerEvents = 'unset';
    },1);
}

function applybgg(e){
    var p = 'to ' + document.getElementById('bggeyvalue').innerText + ' ' +document.getElementById('bggexvalue').innerText;
    var c1 = document.getElementById('bggc1cd').style.backgroundColor;
    var c2 = document.getElementById('bggc2cd').style.backgroundColor;
    document.getElementById(e).style.background = 'linear-gradient('+p+','+c1+','+c2+')';
}

function shape(el,sh){
    var element = document.getElementById('preview'+el);

    if(sh == 'square'){
        element.style.width = '125px';
        element.style.height = '125px';
        element.style.transform = 'translate(-50%,-50%)';
        element.style.borderRadius = '0px';
        element.style.border = '1px solid black';
        hints('hide','triangle');
    }

    if(sh == 'rectangle'){
        element.style.width = '175px';
        element.style.height = '100px';
        element.style.transform = 'translate(-50%,-50%)';
        element.style.borderRadius = '0px';
        element.style.border = '1px solid black';
        hints('hide','triangle');
    }

    if(sh == 'circle'){
        element.style.width = '150px';
        element.style.height = '150px';
        element.style.borderRadius = '50%';
        element.style.transform = 'translate(-50%,-50%)';
        element.style.border = '1px solid black';
        hints('hide','triangle');
    }

    if(sh == 'oval'){
        element.style.width = '225px';
        element.style.height = '125px';
        element.style.borderRadius = '50%';
        element.style.transform = 'translate(-50%,-50%)';
        element.style.border = '1px solid black';
        hints('hide','triangle');
    }

    if(sh == 'trapezoid'){
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
        hints('hide','triangle');
        hints('show','trapezoid');
    }

    if(sh == 'parallelogram'){
        element.style.width = '175px';
        element.style.height = '125px';
        element.style.transform = 'translate(-50%,-50%) skewX(20deg)';
        element.style.borderRadius = '0px';
        element.style.border = '1px solid black';
        document.getElementById('skewbox').getElementsByTagName('div')[0].getElementsByTagName('input')[0].value = '20';
        hints('hide','triangle');
    }

    if(sh == 'triangle'){
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
        hints('show','triangle');

    }

    document.getElementsByClassName('shapechangediv')[0].style.opacity = '0';
    setTimeout(function(){document.getElementsByClassName('shapechangediv')[0].style.display = 'none';},500);
}
