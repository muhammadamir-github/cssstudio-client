async function setupAnimator(elementType, fromSratch = false){
    let panel = document.getElementById('panel');
    let backButton = await Globals.elements.new({
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

                var animatediv = document.getElementById('animate');
                setTimeout(function(){
                    spinner.style.display = 'none';
                    panel.style.opacity = '1';
                    panel.style.pointerEvents = 'unset';
                    animatediv.style.display = 'none';
                    backButton.remove();
                    $('.info').remove();
                },1);
            }
        }
    });

    if(fromSratch === true){
        var animatediv = await Globals.elements.new({
            type: "div",
            parent: panel,
            id: "animate",
        });

        var settings_div = await Globals.elements.new({
            type: "div",
            parent: animatediv,
            id: "settingsdiv",
            style: {
                zIndex: "3",
            },
            children: [
                {
                    type: "banner",
                    children: [
                        {
                            type: "h5",
                            text: "Settings"
                        }
                    ]
                }
            ]
        });

        let comboboxes = [
            {
                id: "duration",
                elementType: elementType,
                text: "Duration",
                style: {
                    left: "50%",
                    marginTop: "70px",
                    transform: "translate(-50%)"
                },
                customValue: {
                    call: "updateElement",
                    style: { width: "40%" }
                },
                options: [],
            },
            {
                id: "delay",
                elementType: elementType,
                text: "Delay",
                style: {
                    left: "50%",
                    marginTop: "130px",
                    transform: "translate(-50%)"
                },
                customValue: {
                    call: "updateElement",
                    style: { width: "40%" }
                },
                options: [],
            },
            {
                id: "iteration",
                elementType: elementType,
                text: "Iteration",
                style: {
                    left: "50%",
                    marginTop: "190px",
                    transform: "translate(-50%)"
                },
                customValue: {
                    placeholder: "9999 for infinite",
                    call: "updateElement",
                    style: { width: "40%" }
                },
                options: [],
            },
            {
                id: "timing",
                text: "Timing",
                elementType: elementType,
                style: {
                    left: "50%",
                    marginTop: "250px",
                    transform: "translate(-50%)"
                },
                options: ["Linear", "Ease", "Ease-In", "Ease-Out", "Ease-In-Out"],
            }
        ];

        for (let x of comboboxes){
            await Globals.components.new({
                name: "internal-combobox",
                parent: settings_div,
                elementType: x.elementType,
                data: {
                    id:x.id,
                    width: "200px",
                    style: x.style,
                    text: x.text,
                    options: x.options,
                    customValue: x.customValue
                }
            });
        }
    }

    document.getElementsByClassName('spinner')[0].style.display = 'block';
    panel.style.opacity = '0.3';
    panel.style.pointerEvents = 'none';

    setTimeout(async function(){
        let info = Globals.elements.new({
            type: "p",
            parent: document.getElementById("previewbox"),
            classes: [ "info" ],
            text: "Animations might appear irresponsive in the preview box due to different positioning."
        });

        document.getElementsByClassName('spinner')[0].style.display = 'none';
        document.getElementById('animate').style.display = 'block';
        panel.style.opacity = '1';
        panel.style.pointerEvents = 'unset';

        if(fromSratch === true){
            loadReadyMadeAnimations();

            let animatorTimeline = await Globals.components.new({
                name: "internal-animator-timeline",
                parent: document.getElementById("animate"),
                elementType,
            });
        }
    }, 1);
}
