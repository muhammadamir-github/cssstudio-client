async function setupSlideStyler(){
    const self = this;

    let animationSliders = Globals.elements.new({
        type: "div",
        parent: document.getElementById("aT"),
        id: "animationSliderBox",
        style: {
            opacity: "0.5",
            pointerEvents: "none"
        },
        before: true,
    });

    var percentage = await Globals.components.new({
        name: "internal-combobox",
        parent: document.getElementById("aT"),
        data: {
            id: "slidePercentage",
            width: "200px",
            style: {
                left: "30px",
                top: "350px",
                opacity: "0.5",
                pointerEvents: "none"
            },
            text: "Percentage",
            options: [],
            tooltip: {
                text: "Percentage is when the slide is executed during the animation. Percentage can be from 0% to 100%. The animation starts from 0% and ends at 100%."
            },
            customValue: {
                call: "updateElement"
            }
        },
        before: true, // Before animatorTimeline
    });

    var opacity = await Globals.components.new({
        name: "internal-combobox",
        parent: document.getElementById("aT"),
        data: {
            id: "slideOpacity",
            width: "200px",
            style: {
                left: "30px",
                top: "420px",
                opacity: "0.5",
                pointerEvents: "none",
                zIndex: 1
            },
            text: "Opacity",
            options: [],
            customValue: {
                call: "dataAttributeBalancer"
            }
        },
        before: true, // Before animatorTimeline
    });

    let sliders = [
        { id: "slideScaleX", text: "Scale x-axis", min: 0, max: 10, step: 0.1, value: 0 },
        { id: "slideScaleY", text: "Scale y-axis", min: 0, max: 10, step: 0.1, value: 0 },
        { id: "slideRotate", text: "Rotate", min: 0, max: 360, step: 1, value: 0 },
        { id: "slideSkewX", text: "Skew x-axis", min: 0, max: 10, step: 0.1, value: 0 },
        { id: "slideSkewY", text: "Skew y-axis", min: 0, max: 10, step: 0.1, value: 0 },
        { id: "slideFontSize", text: "Font Size", min: 0, max: 100, step: 1, value: 0 },
        { id: "slideFontWeight", text: "Font Weight", min: 0, max: 1, step: 1, value: 0 },
        { id: "slideBorderSize", text: "Border Size", min: 0, max: 100, step: 1, value: 0},
        { id: "slideBorderRadius", text: "Border Radius", min: 0, max: 100, step: 1, value: 0 },
    ];

    for (let slider of sliders){
        let box = await Globals.elements.new({
            type: "div",
            parent: animationSliders,
            classes: [ "animationSliderDiv" ],
        });

        await Globals.components.new({
            name: "internal-slider",
            parent: box,
            data: {
                id: slider.id,
                text: slider.text,
                min: slider.min,
                max: slider.max,
                step: slider.step,
                value: slider.value
            }
        });
    }

    let comboboxes = [
        { id: "fontcolor", style: { left: "10px" }, text: "Font Color", idPrefix: "animatef", },
        { id: "bordercolor", style: { left: "250px" }, text: "Border Color", idPrefix: "animateb", },
        { id: "backgroundcolor", style: { left: "490px" }, text: "Background Color", idPrefix: "animatebg",}
    ];

    for (let x of comboboxes){
        await Globals.components.new({
            name: "internal-combobox",
            parent: animationSliders,
            data: {
                id: x.id,
                width: "200px",
                fontSize: "12px",
                style: x.style,
                text: x.text,
                options: [],
                colorPicker: {
                    idPrefix: x.idPrefix
                }
            }
        });
    }
}
