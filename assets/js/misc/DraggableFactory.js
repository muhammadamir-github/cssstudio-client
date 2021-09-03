export default class DraggableFactory{
    constructor(){}

    new(options){
        const self = this;
        if(options.element && Array.isArray(options.triggers) && options.triggers.length > 0 && options.detailsHolder && (options.detailsHolder.mouse.isDown !== undefined && options.detailsHolder.mouse.isDown !== null)){
            for(let trigger of options.triggers){
                trigger.addEventListener("mousedown", function(e){
                    self.dragStart(e, options, self);
                }, true);
            }
        }
    }

    dragStart(e, options, self){
        e = e || window.event;
        e.preventDefault();

        for(let trigger of options.triggers){
            trigger.style.cursor = 'grabbing';

            trigger.addEventListener("mouseup", function(ev){
                self.dragStop(ev, options, self);
            }, true);

            trigger.addEventListener("mousemove", function(ev){
                self.doDrag(ev, options, self);
            }, true);
        }

        options.detailsHolder.mouse.isDown !== undefined && options.detailsHolder.mouse.isDown !== null ? options.detailsHolder.mouse.isDown = true : false;

        options.detailsHolder.mouse.x = e.clientX;
        options.detailsHolder.mouse.y = e.clientY;
    }

    dragStop(e, options, self){
        options.detailsHolder.mouse.isDown !== undefined && options.detailsHolder.mouse.isDown !== null ? options.detailsHolder.mouse.isDown = false : false;

        for(let trigger of options.triggers){
            trigger.removeEventListener("mouseup", function(ev){
                self.dragStop(ev, options, self);
            }, true);

            trigger.removeEventListener("mousemove", function(ev){
                self.doDrag(ev, options, self);
            }, true);

            trigger.style.cursor = 'default';
        }
    }

    doDrag(e, options, self){
        e = e || window.event;
        e.preventDefault();

        if(options.detailsHolder.mouse.isDown === true){
            for(let trigger of options.triggers){
                trigger.style.cursor = 'grabbing';
            }

            let elementDimensions = options.element.getBoundingClientRect();
            let oldMouseX = options.detailsHolder.mouse.x;
            let oldMouseY = options.detailsHolder.mouse.y;
            let newMouseX = e.clientX;
            let newMouseY = e.clientY;
            let currentElementTop = elementDimensions.top;
            let currentElementLeft = elementDimensions.left;
            let newElementTop = (currentElementTop - (oldMouseY - newMouseY));
            let newElementLeft = (currentElementLeft - (oldMouseX - newMouseX));
            let elementHeight = elementDimensions.height;
            let elementWidth = elementDimensions.width;

            if(newElementTop >= 0 && ((newElementTop+elementHeight) <= window.innerHeight)){
                options.element.style.top = newElementTop + "px";
                options.detailsHolder.y = newElementTop;
                options.detailsHolder.mouse.x = newMouseX;
            }

            if(newElementLeft >= 0 && ((newElementLeft+elementWidth) <= window.innerWidth)){
                options.element.style.left = newElementLeft + "px";
                options.detailsHolder.x = newElementLeft;
                options.detailsHolder.mouse.y = newMouseY;
            }
        }else{
            for(let trigger of options.triggers){
                trigger.style.cursor = 'default';
            }
        }
    }

    positionElementRelatively(element, relatedTo){
        let relatedToDimensions = relatedTo.getBoundingClientRect();
        let elementDimensions = element.getBoundingClientRect();

        let preTop = relatedToDimensions.top;
        let preLeft = relatedToDimensions.left;
        let preRight = relatedToDimensions.right;
        let preBottom = relatedToDimensions.bottom;

        // MARGINS FOR CALCULATIONS
        let marginBetweenElementAndWindow = 10;
        let marginBetweenRelatedToAndElement = 10;

        // VALUES WHICH WILL BE SET
        let right = (preRight + marginBetweenRelatedToAndElement); // element will fall on the right side of relatedTo
        let left = (preLeft - elementDimensions.width - marginBetweenRelatedToAndElement); // element will fall on the left side of relatedTo
        let top = preBottom - elementDimensions.height; // element will go upwards of relatedTo starting from relatedTo's bottom
        let bottom = preTop; // element will go downwards of relatedTo starting from relatedTo's top

        // CHECKS FOR OVERFLOWS
        let doesOverFlowWindowToRight = right+elementDimensions.width > (window.innerWidth-marginBetweenElementAndWindow);
        let doesOverFlowWindowToLeft = left < (0+marginBetweenElementAndWindow);
        let doesOverFlowWindowToTop = top < (0+marginBetweenElementAndWindow);
        let doesOverFlowWindowToBottom = bottom+elementDimensions.height > (window.innerHeight-marginBetweenElementAndWindow);

        //console.log("doesOverFlowWindowToRight", doesOverFlowWindowToRight, right, (window.innerWidth-marginBetweenElementAndWindow));
        //console.log("doesOverFlowWindowToLeft", doesOverFlowWindowToLeft, left, (0+marginBetweenElementAndWindow));
        //console.log("doesOverFlowWindowToTop", doesOverFlowWindowToTop, top, (0+marginBetweenElementAndWindow));
        //console.log("doesOverFlowWindowToBottom", doesOverFlowWindowToBottom, bottom, (window.innerHeight-marginBetweenElementAndWindow));

        if(!doesOverFlowWindowToRight){
            element.style.left = right+"px";
        }else{
            if(!doesOverFlowWindowToLeft){
                element.style.left = left+"px";
            }
        }

        if(!doesOverFlowWindowToTop){
            element.style.top = top+"px";
        }else{
            if(!doesOverFlowWindowToBottom){
                element.style.top = bottom+"px";
            }
        }
    }
}
