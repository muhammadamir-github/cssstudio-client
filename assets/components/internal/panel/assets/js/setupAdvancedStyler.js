async function setupAdvancedStyler(elementType, fromScratch = false){
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

    if(fromScratch === true){
        getGoogleFonts(elementType, 'elementCreator');

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
                                    applyBackgroundGradient('preview'+elementType);
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
            }
        ];

        for (let end of ends){
            let el = await Globals.components.new({
                name: "internal-combobox",
                parent: advancediv2,
                elementType,
                data: {
                    id: end.id,
                    style: end.style,
                    text: end.text,
                    options: end.options,
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
                name: "internal-combobox",
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
                            let giphyPanel = document.getElementsByTagName("giphy")[0];
                            let giphyPanelOpacity = giphyPanel.style.opacity;
                            if(giphyPanelOpacity == 0){
                                giphyPanel.style.opacity = 1;
                                setTimeout(function(){giphyPanel.style.display = "block";},750);
                                document.getElementById('panel').style.opacity = 0.5;
                                document.getElementById('panel').style.pointerEvents = "none";
                            }

                            if(giphyPanelOpacity == 1){
                                giphyPanel.style.opacity = 0;
                                setTimeout(function(){giphyPanel.style.display = "none";},750);
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
                                $('#preview'+elementType).css({"background-image":"url(" + reader.result + ")","background-size":"cover"});
                            }
                            reader.readAsDataURL(file);
                        }
                    }
                },
            ]
        });

        var giphyPanel = Globals.components.new({
            name: "internal-giphy-panel",
            parent: Globals.window.body,
            elementType,
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
                name: "internal-combobox",
                parent: x.parent,
                elementType,
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
                name: "internal-combobox",
                parent: marginDiv,
                elementType,
                data: {
                    id: margin.id,
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
                name: "internal-combobox",
                parent: paddingDiv,
                elementType,
                data: {
                    id: padding.id,
                    width: padding.width,
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
            name: "internal-combobox",
            parent: divs[0],
            elementType,
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
            name: "internal-combobox",
            parent: divs[2],
            elementType,
            data: {
                id: "outlinestyle",
                style: {
                    left: "50%",
                    zIndex: "3",
                    transform: "translate(-50%)"
                },
                text: "Outline Style",
                options: ["Solid", "Dotted", "Double", "Dashed", "Groove", "Ridge", "None", "Hidden", "Outset", "Inset"]
            }
        });

        let outlinewidth = await Globals.components.new({
            name: "internal-combobox",
            parent: divs[2],
            elementType,
            data: {
                id: "outlinewidth",
                style: {
                    left: "50%",
                    zIndex: "2",
                    transform: "translate(-50%)"
                },
                text: "Outline Width",
                customValue: {
                    call: "updateElement",
                }
            }
        });

        let outlinecolor = await Globals.components.new({
            name: "internal-combobox",
            parent: divs[2],
            elementType,
            data: {
                id: "outlinecolor",
                style: {
                    left: "50%",
                    zIndex: "1",
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

function applyBackgroundGradient(elementId){
    let endX = document.getElementById("endx").getElementsByClassName("combobox-selected")[0].innerText;
    let endY = document.getElementById("endy").getElementsByClassName("combobox-selected")[0].innerText;

    let direction = 'to ' + endX + ' ' + endY;
    let color1 = document.getElementById('bggc1cd').style.backgroundColor;
    let color2 = document.getElementById('bggc2cd').style.backgroundColor;

    document.getElementById(elementId).style.background = `linear-gradient(${direction},${color1},${color2}`;
}
