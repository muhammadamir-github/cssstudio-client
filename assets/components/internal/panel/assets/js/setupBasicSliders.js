async function setupBasicSliders(elementType){
    await setupRotate(elementType);
    await setupSkew(elementType);
    await setupScale(elementType);
    await setupNavigationOptions(elementType);
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
        name: "internal-slider",
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
        name: "internal-slider",
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
        name: "internal-slider",
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
            value: 0
        }
    });

    let sliderY = await Globals.components.new({
        name: "internal-slider",
        elementType: element,
        parent: scaleBox,
        data: {
            text: "Scale y-axis",
            min: 1,
            max: 10,
            step: 0.1,
            value: 0
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
        name: "internal-slider",
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
        name: "internal-slider",
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
