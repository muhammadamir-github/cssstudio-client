// Responsible for handling FontAwesome Icon Changer/Selector which allows user to change icon of an icon element.

class FontAwesomeIcons{
    constructor(){}

    show(e,elementToAffect,forElement,iconPreview){

        var appendIcon = 0;
        var isIconElement = 0;
        var target;

        if(document.getElementsByClassName('selected')[0].tagName == 'I'){
            console.log("yes!");
            target = document.getElementsByClassName('selected')[0];
            isIconElement = 1;
        }else{
            if(elementToAffect !== null){
                if(elementToAffect.tagName == 'A' && forElement == "navbar"){
                    appendIcon = 1;
                }else{
                    if(elementToAffect.tagName == 'SPAN' && forElement == "dropdown-list"){
                        appendIcon = 1;
                        publicEvents.dropdownlist_position_icons(document.getElementsByClassName("selected")[0].getElementsByClassName("options")[0].getElementsByTagName("ul")[0],"left");
                    }else{
                        if(elementToAffect.tagName == "i" && forElement == "textbox"){
                            target = elementToAffect;
                            isIconElement = 1;
                            appendIcon = 0;
                        }else{
                            if(elementToAffect[0].tagName == "i" && forElement == "ratings"){
                                target = elementToAffect;
                                isIconElement = 1;
                                appendIcon = 0;
                            }
                        }
                    }
                }

                target = elementToAffect;
            }else{
                target = e.target;
            }
        }

        if($('.fontAwesomeSelector')[0]){
            $('.fontAwesomeSelector').remove();
        }else{
            var selectorDiv = Globals.elements.new({
                type: "div",
                parent: Globals.window.body,
                classes: [ "fontAwesomeSelector" ],
                children: [
                    {
                        type: "i",
                        classes: [ "fas", "fa-times", "close" ],
                        listeners: {
                            click: function(){
                                $('.fontAwesomeSelector').remove();
                            }
                        }
                    },
                    {
                        type: "p",
                        classes: [ "heading" ],
                        text: "Pick an Icon"
                    },
                    {
                        type: "input",
                        attributes: {
                            placeholder: "Search Icons...",
                            maxlength: 20,
                            type: "text"
                        },
                        listeners: {
                            keypress: function(e){
                                if(e.keyCode == 13){
                                    Globals.pageHandler.fontAwesomeSelector.searchIcons(this.value);
                                }
                            }
                        },
                    },
                    ...(() => {
                        let icons = [...Globals.pageHandler.fontawesome_solid.map(x => ({ name: x, type: "fas" })), ...Globals.pageHandler.fontawesome_brands.map(x => ({ name: x, type: "fab" })), ...Globals.pageHandler.fontawesome_regular.map(x => ({ name: x, type: "far" }))];
                        return icons.map((x, i) => {
                            const className = `${x.type} fa-${x.name}`;
                            return {
                                type: "div",
                                listeners: {
                                    click: function(){
                                        let regexes = ["fas fa-[a-zA-Z0-9-]+", "fab fa-[a-zA-Z0-9-]+", "far fa-[a-zA-Z0-9-]+"];
                                        if(appendIcon == 1){
                                            if(target.getElementsByTagName('i')[0]){
                                                let oldIconClass = [
                                                    ...(() => {
                                                        return regexes.map(regex => {
                                                            let matches = target.getElementsByTagName("i")[0].className.match(regex);
                                                            if(matches && Array.isArray(matches)){ return matches; }else{ return []; }
                                                        });
                                                    })()
                                                ].flat();

                                                if(Array.isArray(oldIconClass)){
                                                    oldIconClass.forEach(x => { x.split(" ").forEach(y => target.getElementsByTagName('i')[0].classList.remove(y)); })
                                                }

                                                className.split(" ").forEach(x => target.getElementsByTagName('i')[0].classList.add(x));
                                            }else{
                                                let iToAppend = Globals.elements.new({
                                                    type: "i",
                                                    classes: [...className.split(" ")]
                                                });

                                                $(target).prepend(iToAppend);
                                            }
                                        }else{
                                            if(appendIcon == 0){
                                                if(target && !Array.isArray(target)){
                                                    let oldIconClass = [
                                                        ...(() => {
                                                            return regexes.map(regex => {
                                                                let matches = target.className.match(regex);
                                                                if(matches && Array.isArray(matches)){ return matches; }else{ return []; }
                                                            });
                                                        })()
                                                    ].flat();

                                                    console.log(oldIconClass);

                                                    if(Array.isArray(oldIconClass)){
                                                        oldIconClass.forEach(x => { x.split(" ").forEach(y => target.classList.remove(y)); })
                                                    }

                                                    className.split(" ").forEach(x => target.classList.add(x));
                                                }else{
                                                    if(target && Array.isArray(target) && target.length > 0){
                                                        for(var y=0; y<target.length; y++){
                                                            let oldIconClass = [
                                                                ...(() => {
                                                                    return regexes.map(regex => {
                                                                        let matches = target[y].className.match(regex);
                                                                        if(matches && Array.isArray(matches)){ return matches; }else{ return []; }
                                                                    });
                                                                })()
                                                            ].flat();

                                                            if(Array.isArray(oldIconClass)){
                                                                oldIconClass.forEach(x => { x.split(" ").forEach(y => target[y].classList.remove(y)); })
                                                            }

                                                            className.split(" ").forEach(x => target[y].classList.add(x));
                                                        }
                                                    }
                                                }
                                            }
                                        }

                                        if(isIconElement == 0){
                                            let oldIconClass = [
                                                ...(() => {
                                                    return regexes.map(regex => {
                                                        let matches = iconPreview.className.match(regex);
                                                        if(matches && Array.isArray(matches)){ return matches; }else{ return []; }
                                                    });
                                                })()
                                            ].flat();

                                            if(Array.isArray(oldIconClass)){
                                                oldIconClass.forEach(x => { x.split(" ").forEach(y => iconPreview.classList.remove(y)); })
                                            }

                                            className.split(" ").forEach(x => iconPreview.classList.add(x));
                                        }

                                        $('.fontAwesomeSelector').remove();
                                    }
                                },
                                children: [
                                    {
                                        type: "i",
                                        classes: [...className.split(" ")]
                                    }
                                ]
                            }
                        });
                    })(),
                ]
            });

            //selectorDiv.style.top = /*e.target.getBoundingClientRect().top*/ e.clientY - document.getElementsByClassName('elementEditor')[0].getBoundingClientRect().top + window.scrollY + 'px';
            //selectorDiv.style.left = /*e.target.getBoundingClientRect().left*/ e.clientX - document.getElementsByClassName('elementEditor')[0].getBoundingClientRect().left + 10 + 'px';
            //selectorDiv.style.transform = 'translate(-'+e.target.getBoundingClientRect().left + 25 + 'px)';

        }
    }

    searchIcons(value){
        var matched = [];
        var allIconsDivs = document.getElementsByClassName("fontAwesomeSelector")[0].getElementsByTagName("div");

        for(var i=0; i<allIconsDivs.length; i++){
            var iconClass = allIconsDivs[i].getElementsByTagName("i")[0].className;
            if(iconClass.includes(value)){
                allIconsDivs[i].style.display = "inline-block";
            }else{
                allIconsDivs[i].style.display = "none";
            }
        }

        /*for(var i=0; i<Globals.pageHandler.fontawesome_solid.length; i++){
        if(Globals.pageHandler.fontawesome_solid[i].includes(value)){
        matched.push(Globals.pageHandler.fontawesome_solid[i]);
    }
}

for(var i=0; i<Globals.pageHandler.fontawesome_regular.length; i++){
if(Globals.pageHandler.fontawesome_regular[i].includes(value)){
matched.push(Globals.pageHandler.fontawesome_regular[i]);
}
}*/

}

}
