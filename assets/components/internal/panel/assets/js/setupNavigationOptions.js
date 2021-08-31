async function setupNavigationOptions(elementType){
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
                        click: async function(){
                            if($('#advance').length > 0){
                                await setupAdvancedStyler(elementType, false);
                            }else{
                                await setupAdvancedStyler(elementType, true);
                            }
                        }
                    }
                },
                {
                    name: "Animate",
                    forAll: false,
                    disallowedMemberships: [ "Free" ],
                    listeners: {
                        click: async function(){
                            if($('#animate').length > 0){
                                await setupAnimator(elementType, false);
                            }else{
                                await setupAnimator(elementType, true);
                            }
                        }
                    }
                },
                {
                    name: "Finish",
                    forAll: true,
                    disallowedMemberships: null,
                    listeners: {
                        click: async function(){
                            await finishWork(elementType);
                        }
                    }
                },
            ].map((x, i) => {
                //if(x.forAll === true || (Array.isArray(x.disallowedMemberships) && !x.disallowedMemberships.includes(Globals.pageHandler.data.plan))){
                    return {
                        type: "button",
                        text: x.name,
                        listeners: x.listeners
                    }
                //}
            })
        })(),
    });
}
