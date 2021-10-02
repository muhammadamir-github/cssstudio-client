function updateElement(attr, value, callback = null){
    let element = document.getElementById("animator-preview-element") || document.getElementsByClassName("selected-element")[0];
    let updated = false;

    let transforms = ["rotateX", "rotateY", "skewX", "skewY", "scaleX", "scaleY"];
    if(transforms.includes(attr)){
        let values = {
            "skewY": "",
            "skewX": "",
            "rotateY": "",
            "rotateX": "",
            "scaleY": "",
            "scaleX": "",
        };

        let transform = "";
        let parts = element.style.transform.split(' ');

        parts.forEach(x => {
            if(!x.includes(attr)){
                values[attr] = x;
                transform += x;
            }
        });

        if(attr === "rotateX"){ transform += `rotateX(${value}deg)`; callback ? callback("rotateX", `${value}deg`) : false; }
        if(attr === "rotateY"){ transform += `rotateY(${value}deg)`; callback ? callback("rotateY", `${value}deg`) : false; }
        if(attr === "skewX"){ transform += `skewX(${value}deg)`; callback ? callback("skewX", `${value}deg`) : false; }
        if(attr === "skewY"){ transform += `skewY(${value}deg)`; callback ? callback("skewY", `${value}deg`) : false; }
        if(attr === "scaleX"){ transform += `scaleX(${value})`; callback ? callback("scaleX", value) : false; }
        if(attr === "scaleY"){ transform += `scaleY(${value})`; callback ? callback("scaleY", value) : false; }

        element.style.transform = transform;
        updated = true;
    }

    if(updated === false){
        element.style[attr] = value;
        callback ? callback(attr, value) : false;
    }
}
