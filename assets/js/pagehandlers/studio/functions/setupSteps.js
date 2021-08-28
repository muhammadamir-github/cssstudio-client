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
                                exF_animate(element,'false');
                            }else{
                                exF_animate(element,'true');
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
