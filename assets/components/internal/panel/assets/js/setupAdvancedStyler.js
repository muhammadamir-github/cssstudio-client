async function setupAdvancedStyler(fromScratch = false){
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
                                    applyBackgroundGradient();
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

        advancediv.appendChild(advancediv1);
        advancediv.appendChild(advancediv2);
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
