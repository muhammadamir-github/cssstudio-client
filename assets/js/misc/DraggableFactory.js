export default class DraggableFactory{
    constructor(){}

    new(options){
        const self = this;
        if(options.element && Array.isArray(options.triggers) && options.triggers.length > 0 && options.detailsHolder && (options.detailsHolder.mouse.isDown !== undefined && options.detailsHolder.mouse.isDown !== null)){
            for(let trigger of options.triggers){
                trigger.addEventListener("mousedown", function(e){
                    e.stopPropagation();
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
                ev.stopPropagation();
                self.dragStop(ev, options, self);
            }, true);

            trigger.addEventListener("mousemove", function(ev){
                ev.stopPropagation();
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
                ev.stopPropagation();
                self.dragStop(ev, options, self);
            }, true);

            trigger.removeEventListener("mousemove", function(ev){
                ev.stopPropagation();
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

    positionElementRelatively(element, relatedTo, favourablePosition = null){
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
        let top = preBottom - elementDimensions.height; // element will go upwards of relatedTo starting from relatedTo's bottom falling on a side
        let bottom = preTop; // element will go downwards of relatedTo starting from relatedTo's top falling on a side
        let centerTop = preTop - elementDimensions.height - 10; // element will go upwards of relatedTo starting from relatedTo's top center
        let centerBottom = preBottom + 10; // element will go downwards of relatedTo starting from relatedTo's bottom center

        // CHECKS FOR OVERFLOWS
        let doesOverFlowWindowToRight = right+elementDimensions.width > (window.innerWidth-marginBetweenElementAndWindow);
        let doesOverFlowWindowToLeft = left < (0+marginBetweenElementAndWindow);
        let doesOverFlowWindowToTop = top < (0+marginBetweenElementAndWindow);
        let doesOverFlowWindowToBottom = bottom+elementDimensions.height > (window.innerHeight-marginBetweenElementAndWindow);

        let overflowsY = {
            "top": doesOverFlowWindowToTop,
            "centerTop": doesOverFlowWindowToBottom,
            "bottom": doesOverFlowWindowToBottom,
            "centerBottom": doesOverFlowWindowToBottom,
        };

        let overflowsX = {
            "left": doesOverFlowWindowToLeft,
            "right": doesOverFlowWindowToRight,
        };

        let values = {
            "top": top,
            "centerTop": centerTop,
            "bottom": bottom,
            "centerBottom": centerBottom,
            "left": left,
            "right": right,
        };

        let order = [ "centerTop", "centerBottom", "top", "bottom", "left", "right" ];
        if(favourablePosition && typeof favourablePosition === "string" && order.includes(favourablePosition)){
            order.forEach((item, i) => {
                if(item === favourablePosition){
                    order.splice(i, 1);
                    order.unshift(favourablePosition);
                }
            });
        }

        let setX = false;
        let setY = false;
        order.forEach((item, i) => {
            if(overflowsX[item] !== undefined && overflowsX[item] !== null){
                if(overflowsX[item] === false && setX === false){
                    element.style.left = values[item]+"px";
                    setX = true;
                }
            }else{
                if(overflowsY[item] !== undefined && overflowsY[item] !== null){
                    if(overflowsY[item] === false && setY === false){
                        element.style.top = values[item]+"px";

                        if(item === "centerBottom" || item === "centerTop"){
                            let left = (preLeft + ((relatedToDimensions.width/2) - (elementDimensions.width/2)));
                            let doesOverFlowWindowToRight_center = left+(elementDimensions.width) > (window.innerWidth-marginBetweenElementAndWindow);
                            let doesOverFlowWindowToLeft_center = left < (0+marginBetweenElementAndWindow);

                            if(!doesOverFlowWindowToLeft_center && !doesOverFlowWindowToRight_center){
                                element.style.left = left+"px";
                                setX = true;
                            }
                        }

                        setY = true;
                    }
                }
            }
        });
    }
}
