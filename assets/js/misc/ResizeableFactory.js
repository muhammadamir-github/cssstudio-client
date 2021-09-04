export default class ResizeableFactory{
    constructor(){}

    new(options){
        const self = this;
        if(options.element && options.detailsHolder && (options.detailsHolder.mouse.isDown !== undefined && options.detailsHolder.mouse.isDown !== null)){
            var elementResizer = Globals.elements.new({
                type: "div",
                parent: options.element,
                classes: [ "eResizer" ],
                style: {
                    top: `${(options.element.offsetTop + options.element.getBoundingClientRect().height)}px`,
                    margin: "0",
                    left: options.element.style.width == '100%' ? `${(options.element.offsetLeft + options.element.getBoundingClientRect().width - 25)}px` : `${(options.element.offsetLeft + options.element.getBoundingClientRect().width)}px`
                },
                listeners: {
                    mousedown: function(e){
                        self.resizeStart(e, options, self, this);
                    }
                }
            });

            window.addEventListener("resize", function(e){
                self.repositionResizer(options, self, elementResizer);
            });

            setInterval(() => {
                self.repositionResizer(options, self, elementResizer);
            }, 1000);
        }
    }

    resizeStart(e, options, self, resizer){
        options.detailsHolder.mouse.isDown !== undefined && options.detailsHolder.mouse.isDown !== null ? options.detailsHolder.mouse.isDown = true : false;

        options.detailsHolder.mouse.x = e.clientX;
        options.detailsHolder.mouse.y = e.clientY;

        document.addEventListener('mousemove', function(ev){
            self.doDrag(ev, options, self, resizer);
        }, true);

        document.addEventListener('mouseup', function(ev){
            self.resizeStop(ev, options, self, resizer);
        }, true);
    }

    doDrag(e, options, self, resizer){
        let element = options.element;

        if(options.detailsHolder.mouse.isDown === true){
            let oldY = options.detailsHolder.mouse.y;
            let oldX = options.detailsHolder.mouse.x;
            let newY = e.clientY;
            let newX = e.clientX;
            let elementDimensions = element.getBoundingClientRect();

            let oldHeight = elementDimensions.height;
            let oldWidth = elementDimensions.width;
            let heightDifference = (newY > oldY ? (newY - oldY) : (oldY - newY));
            let widthDifference = (newX > oldX ? (newX - oldX) : (oldX - newX));
            let isHeightIncreased = (newY >= oldY ? true : false);
            let isWidthIncreased = (newX >= oldX ? true : false);

            if(isHeightIncreased){
                element.style.height = (oldHeight+heightDifference)+'px';
                options.detailsHolder.height = oldHeight+heightDifference;
                options.detailsHolder.mouse.y = newY;
            }else{
                if(!isHeightIncreased){
                    element.style.height = (oldHeight-heightDifference)+'px';
                    options.detailsHolder.height = oldHeight-heightDifference;
                    options.detailsHolder.mouse.y = newY;
                }
            }

            if(isWidthIncreased){
                element.style.width = (oldWidth+widthDifference)+'px';
                options.detailsHolder.width = oldWidth+widthDifference;
                options.detailsHolder.mouse.x = newX;
            }else{
                if(!isWidthIncreased){
                    element.style.width = (oldWidth-widthDifference)+'px';
                    options.detailsHolder.width = oldWidth-widthDifference;
                    options.detailsHolder.mouse.x = newX;
                }
            }

            self.repositionResizer(options, self, resizer);
        }
    }

    repositionResizer(options, self, resizer){
        let element = options.element;
        let elementDimensions = element.getBoundingClientRect();

        let position = window.getComputedStyle(element).position;
        let absolute = position === "absolute";

        if(element.style.width === '100%' || elementDimensions.width >= window.innerWidth){
            if(!absolute){
                resizer.style.left = (elementDimensions.left + elementDimensions.width - 25)+'px';
                resizer.style.right = "unset";
            }else{
                resizer.style.right = '25px';
                resizer.style.left = "unset";
            }
        }else{
            if(!absolute){
                resizer.style.left = (elementDimensions.left + elementDimensions.width)+'px';
                resizer.style.right = "unset";
            }else{
                resizer.style.right = '-5px';
                resizer.style.left = "unset";
            }
        }

        if(!absolute){
            resizer.style.top = (elementDimensions.top + elementDimensions.height)+'px';
            resizer.style.bottom = 'unset';
        }else{
            resizer.style.bottom = '-5px';
            resizer.style.top = 'unset';
        }

        resizer.style.margin = '0';
    }

    resizeStop(e, options, self, resizer){
        options.detailsHolder.mouse.isDown !== undefined && options.detailsHolder.mouse.isDown !== null ? options.detailsHolder.mouse.isDown = false : false;

        document.removeEventListener('mousemove', function(ev){
            self.doDrag(ev, options, self, resizer);
        }, true);

        document.removeEventListener('mouseup', function(ev){
            self.resizeStop(ev, options, self, resizer);
        }, true);
    }
}
