function loadReadyMadeAnimations(elementType){
    let animationsStyle = Globals.elements.new({
        type: 'style',
        parent: Globals.window.body,
        text: (() => {
            return Globals.pageHandler.animations.map(x => {
                return '\n' + x.css + '\n';
            }).flat().join("");
        })(),
    });

    let readyMadeAnimationsDiv = Globals.elements.new({
        type: 'div',
        parent: document.getElementById("animate"),
        id: "rmadiv",
        style: {
            opacity: "1",
            pointerEvents: "unset",
        },
        children: [
            {
                type: "banner",
                children: [
                    {
                        type: "h5",
                        text: `${Globals.pageHandler.animations.length} Ready Made Animations`
                    }
                ]
            },
            {
                type: "div",
                id: "rmadiv_acontainer",
                children: [
                    {
                        type: "animationPreview",
                        id: "noa",
                        style: {
                            backgroundSize: "contain",
                            backgroundImage: "url(none.png)",
                            backgroundRepeat: "no-repeat",
                            border: "0px",
                        },
                        listeners: {
                            click: function(){
                                var previewelement = document.getElementById('preview'+elementType);

                                previewelement.style.animationDelay = '';
                                previewelement.style.animationTimingFunction = '';
                                previewelement.style.animationIterationCount = '';
                                previewelement.style.animationName = '';
                                previewelement.style.animationDuration = '';

                                $('animationPreview').css('border','');
                                this.style.border = '1px solid green';
                            }
                        }
                    },
                    ...(() => {
                        return Globals.pageHandler.animations.map((x, i) => {
                            let text = "Button";

                            let duration = Math.floor((Math.random() * 3) + 1);
                            if(x.name.includes('FADE')){ duration = '3s'; }
                            if(x.name.includes('BOUNCE')){ duration = '1s'; }
                            if(x.name.includes('FLIP')){ duration = '2s'; }
                            if(x.name.includes('ROTATE')){ duration = '3s'; }
                            if(x.name.includes('SLIDE')){ duration = '3s'; }
                            if(x.name.includes('ZOOM')){ duration = '2s'; }
                            if(x.name.includes('ROLL')){ duration = '2s'; }

                            if(elementType == 'input'){
                                text = document.getElementById('previewbox').getElementsByTagName(elementType)[0].value;
                            }else{
                                if(elementType == 'paragraph'){
                                    text = document.getElementById('previewbox').getElementsByTagName('p')[0].innerText;
                                }

                                if(elementType == 'image' || elementType == 'video'){ text = elementType; }
                                if(elementType == 'heading'){
                                    text = document.getElementById('previewbox').getElementsByTagName('h3')[0].innerText;
                                }
                            }

                            return {
                                type: "animationPreview",
                                id: `a${x.name}`,
                                children: [
                                    {
                                        type: "button",
                                        id: "previewbutton",
                                        classes: [ "apelement" ],
                                        text: text,
                                        style: {
                                            fontSize: "8px",
                                            width: "50px",
                                            height: "20px",
                                            position: "relative",
                                            transform: "translate(0)",
                                            left: "25px",
                                            top: "40px",
                                            marginTop: "0px",
                                            animationName: x.name,
                                            animationDuration: duration,
                                            animationDelay: Math.floor((Math.random() * 8) + 3) + 's',
                                            animationTimingFunction: "linear",
                                            animationIterationCount: "Infinite",
                                        }
                                    }
                                ]
                            }
                        });
                    })(),
                ]
            },
        ]
    });

    let animationPreviews = readyMadeAnimationsDiv.getElementsByClassName("apelement");
    for(var i=0; i<animationPreviews.length; i++){
        if(i === 0){ continue; }
        self.applyAnimation(animationPreviews[i].style.animationName, animationPreviews[i].parentElement, elementType);
    }
}

function applyAnimation(animationName, animationPreview, elementType){
    animationPreview.addEventListener('click', function(){
        $('#preview'+elementType).css('animation-name', animationName);
        $('animationPreview').css('border','');
        $('#noa').css('border','0px');
        this.style.border = '1px solid green';
    });
}
