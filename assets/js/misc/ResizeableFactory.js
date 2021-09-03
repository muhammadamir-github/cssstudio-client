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
            let height = (newY > oldY ? (newY - oldY) : (oldY - newY));
            let width = (newX > oldX ? (newX - oldX) : (oldX - newX));

            let isHeightIncreased = (height > oldHeight || height === oldHeight ? true : false);
            let isWidthIncreased = (width > oldWidth || width === oldWidth ? true : false);

            //console.log(`width ${isWidthIncreased ? "increased" : "decreased"} by ${width}px`);
            //console.log(`height ${isHeightIncreased ? "increased" : "decreased"} by ${height}px`);

            if(isHeightIncreased){
                element.style.height = (oldHeight+height)+'px';
                options.detailsHolder.height = oldHeight+height;
                options.detailsHolder.mouse.y = oldY+newY;
            }else{
                if(!isHeightIncreased){
                    element.style.height = (oldHeight-height)+'px';
                    options.detailsHolder.height = oldHeight-height;
                    options.detailsHolder.mouse.y = oldY-newY;
                }
            }

            if(isWidthIncreased){
                element.style.width = (oldHeight+height)+'px';
                options.detailsHolder.width = oldHeight+height;
                options.detailsHolder.mouse.x = oldX+newX;
            }else{
                if(!isWidthIncreased){
                    element.style.width = (oldWidth-width)+'px';
                    options.detailsHolder.width = oldWidth-width;
                    options.detailsHolder.mouse.x = oldX-newX;
                }
            }

            self.repositionResizer(options, self, resizer);
        }
    }

    repositionResizer(options, self, resizer){
        let element = options.element;
        if(element.style.width === '100%' || element.getBoundingClientRect().width >= window.innerWidth){
            resizer.style.left = (element.offsetLeft + element.getBoundingClientRect().width - 25) + 'px';
        }else{
            resizer.style.left = (element.offsetLeft + element.getBoundingClientRect().width) + 'px';
        }

        resizer.style.top = (element.offsetTop + element.getBoundingClientRect().height) + 'px';
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
