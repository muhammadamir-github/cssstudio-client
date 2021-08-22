class PreviewSiteDraggable{
    constructor(){
        this.element_centerY = 0;
        this.element_centerX = 0;
        this.page_centerY = 0;
        this.page_centerX = 0;
        this.HoldTimer = null;
    }

    drag(e){
        var elementPosition = document.getElementsByClassName('elPos')[0];
        elementPosition.style.display = 'inline-block';
        elementPosition.style.opacity = '1';

        var container = document.getElementsByClassName('previewsite')[0];
        var element = document.getElementsByClassName('selected')[0];
        e = e || window.event;
        e.preventDefault();

        // calculate the new cursor position:
        //pos1 = pos3 - e.clientX;
        //pos2 = pos4 - e.clientY;

        var top = (e.clientY - element.getBoundingClientRect().height + window.scrollY);
        var left = (e.clientX - element.getBoundingClientRect().width);

        element.style.top = top + "px";
        element.style.left = left + "px";
        Globals.window.body.style.cursor = 'grabbing';
        element.style.cursor = 'grabbing';

        elementPosition.style.display = 'block';
        elementPosition.innerText = 'X: '+left+' Y: '+top;

        relocateSpecialOptions();
        relocateElementResizer();

        draggable.calculateCenterPosition();

        //pos3 = e.clientX;
        //pos4 = e.clientY;
    }

    mousedown(e){
        const self = this;
        self.HoldTimer = setTimeout(function() {
            var container = document.getElementsByClassName('previewsite')[0];
            var element = document.getElementsByClassName('selected')[0];
            if(e.target == element){

                element.style.transform = 'unset';
                element.removeEventListener('click',Globals.pageHandler.site.elementClicked);
                element.removeEventListener('contextmenu',Globals.pageHandler.site.elementClicked);
                e = e || window.event;
                e.preventDefault();

                Globals.window.body.style.cursor = 'grab';
                element.style.cursor = 'grab';

                // get the mouse cursor position at startup:
                //pos3 = e.clientX;
                //pos4 = e.clientY;
                document.onmouseup = draggable.closeDrag;

                // call a function whenever the cursor moves:
                document.onmousemove = draggable.drag;

                document.onclick = function(){
                    if(self.HoldTimer){
                        clearTimeout(self.HoldTimer);
                    }
                };

            }

            console.log('1000');
        }, 400);
    }

    closeDrag(){
        const self = this;
        if(self.HoldTimer){
            clearTimeout(self.HoldTimer);
        }

        //$('.selectedSpecialOptions, .eResizer').remove();

        var element = document.getElementsByClassName('selected')[0];
        var verticalCenterLineIndicator = document.getElementsByClassName('vcenterline')[0];
        var horizontalCenterLineIndicator = document.getElementsByClassName('hcenterline')[0];

        document.onmouseup = null;
        document.onmousemove = null;
        document.onclick = null;

        Globals.window.body.style.cursor = 'default';
        element.style.cursor = 'default';
        element.addEventListener('click',Globals.pageHandler.site.elementClicked);
        element.addEventListener('contextmenu',Globals.pageHandler.site.elementClicked);

        Globals.pageHandler.userInterface.hideCenterLines('horizontal');
        Globals.pageHandler.userInterface.hideCenterLines('vertical');
    }

    calculateCenterPosition(){
        const self = this;
        var pageCenterPosition = document.getElementsByClassName('pcPos')[0];
        pageCenterPosition.style.display = 'inline-block';
        pageCenterPosition.style.opacity = '1';

        var element = document.getElementsByClassName('selected')[0];

        self.element_centerX = element.offsetLeft + element.offsetWidth / 2;
        self.element_centerY = element.offsetTop + element.offsetHeight / 2;

        var verticalCenterLineIndicator = document.getElementsByClassName('vcenterline')[0];
        var horizontalCenterLineIndicator = document.getElementsByClassName('hcenterline')[0];

        self.page_centerX = horizontalCenterLineIndicator.offsetLeft + horizontalCenterLineIndicator.offsetWidth / 2;
        self.page_centerY = verticalCenterLineIndicator.offsetTop + verticalCenterLineIndicator.offsetHeight / 2;

        if(detectOverlap(element, verticalCenterLineIndicator)) {
            Globals.pageHandler.userInterface.showCenterLines('vertical');
        }else{
            Globals.pageHandler.userInterface.hideCenterLines('vertical');
        }

        if(detectOverlap(element, horizontalCenterLineIndicator)) {
            Globals.pageHandler.userInterface.showCenterLines('horizontal');
        }else{
            Globals.pageHandler.userInterface.hideCenterLines('horizontal');
        }

        detectBorderTouch(element);

        pageCenterPosition.innerText = 'PageCenterX: '+(self.page_centerX-self.element_centerX)+' PageCenterY: '+(self.page_centerY-self.element_centerY);
    }
}

var draggable = new PreviewSiteDraggable;

var detectOverlap = (function () {
    function getPositions(elem) {
        var pos = elem.getBoundingClientRect();
        return [[pos.left, pos.right], [pos.top, pos.bottom]];
    }

    function comparePositions(p1, p2) {
        var r1, r2;
        if (p1[0] < p2[0]) {
            r1 = p1;
            r2 = p2;
        } else {
            r1 = p2;
            r2 = p1;
        }
        return r1[1] > r2[0] || r1[0] === r2[0];
    }

    return function (a, b) {
        var pos1 = getPositions(a),
        pos2 = getPositions(b);
        return comparePositions(pos1[0], pos2[0]) && comparePositions(pos1[1], pos2[1]);
    };
})();

class PreviewSiteResizeable{
    constructor(){
        this.selectedElementResize_startY = 0;
        this.selectedElementResize_startHeight = 0;
        this.selectedElementResize_startX = 0;
        this.selectedElementResize_startWidth = 0;
    }

    enable(e){
        const self = this;
        var element = document.getElementsByClassName('selected')[0];
        var previewsite = document.getElementsByClassName('previewsite')[0];

        if(element.style.left == '50%' || element.style.left.includes('%') || element.style.transform.includes('%')){
            element.style.left = '0px';
            element.style.transform = 'unset';
            relocateSpecialOptions();
        }

        self.selectedElementResize_startY = (e.clientY/* - previewsite.offsetTop*/);
        self.selectedElementResize_startX = (e.clientX/* - previewsite.offsetLeft*/);
        self.selectedElementResize_startHeight = parseInt(document.defaultView.getComputedStyle(element).height, 10) - previewsite.offsetTop;
        self.selectedElementResize_startWidth = parseInt(document.defaultView.getComputedStyle(element).width, 10) - element.offsetLeft/* - element.offsetLeft + element.getBoundingClientRect().width*/;

        var elementResizer = document.createElement('div');
        elementResizer.className = 'eResizer';

        if(element.style.width == '100%' || element.getBoundingClientRect().width >= previewsite.getBoundingClientRect().width){
            elementResizer.style.left = (element.offsetLeft + element.getBoundingClientRect().width - 25) + 'px';
        }else{
            elementResizer.style.left = (element.offsetLeft + element.getBoundingClientRect().width) + 'px';
        }

        elementResizer.style.top = (element.offsetTop + element.getBoundingClientRect().height) + 'px';
        elementResizer.style.margin = '0';

        elementResizer.addEventListener('mousedown',function(e){
            document.documentElement.addEventListener('mousemove', resizeable.resizeDrag, false);
            document.documentElement.addEventListener('mouseup', resizeable.stopResizeDrag, false);
        });


        previewsite.appendChild(elementResizer);
    }

    disable(){
        $('.eResizer').remove();
        document.documentElement.removeEventListener('mousemove', resizeable.resizeDrag, false);
        document.documentElement.removeEventListener('mouseup', resizeable.stopResizeDrag, false);
    }

    resizeDrag(e){
        const self = this;
        var element = document.getElementsByClassName('selected')[0];
        var previewsite = document.getElementsByClassName('previewsite')[0];
        var elementResizer = document.getElementsByClassName('eResizer')[0];

        //var bottomResizer_div = document.getElementById('bottomResizer');
        //var rightResizer_div = document.getElementById('rightResizer');

        //if(e.target.className.includes('bottom-elementResizer')){
        element.style.height = (/*(self.selectedElementResize_startHeight - previewsite.offsetTop)*/ + ((e.clientY + previewsite.offsetTop) - self.selectedElementResize_startY)) + 'px';
        //element.style.height = (self.selectedElementResize_startHeight + e.clientY - self.selectedElementResize_startY) + 'px';
        //}else{
        //if(e.target.className.includes('right-elementResizer')){
        element.style.width = (/*self.selectedElementResize_startWidth*/ /*- element.offsetLeft*/ + ((e.clientX/* - previewsite.offsetLeft*/) - self.selectedElementResize_startX)) + 'px';
        //element.style.width = (self.selectedElementResize_startWidth + e.clientX - self.selectedElementResize_startX) + 'px';
        //}
        //}

        if(element.style.width == '100%' || element.getBoundingClientRect().width >= previewsite.getBoundingClientRect().width){
            elementResizer.style.left = (element.offsetLeft + element.getBoundingClientRect().width - 25) + 'px';
        }else{
            elementResizer.style.left = (element.offsetLeft + element.getBoundingClientRect().width) + 'px';
        }

        elementResizer.style.top = (element.offsetTop + element.getBoundingClientRect().height) + 'px';
        elementResizer.style.margin = '0';

        if($(element).attr('data-e-type') == 'icon'){
            element.style.lineHeight = element.style.height;
        }

        detectBorderTouch(element);

        /*bottomResizer_div.style.width = element.style.width;
        bottomResizer_div.style.height = '10px';
        bottomResizer_div.style.left = element.offsetLeft + 'px';
        bottomResizer_div.style.top = (element.offsetTop + element.getBoundingClientRect().height) + 'px';
        bottomResizer_div.style.paddingLeft = $(element).css('padding-left');
        bottomResizer_div.style.paddingRight = $(element).css('padding-right');

        rightResizer_div.style.height = element.getBoundingClientRect().height + 'px';
        rightResizer_div.style.width = '10px';
        rightResizer_div.style.left = (element.offsetLeft + element.getBoundingClientRect().width) + 'px';
        rightResizer_div.style.top = element.offsetTop + 'px';*/
        //rightResizer_div.style.paddingTop = $(element).css('padding-top');
        //rightResizer_div.style.paddingBottom = $(element).css('padding-bottom');

        //element.style.width = (this.selectedElementResize_startWidth + e.clientX - this.electedElementResize_startX) + 'px';
    }

    stopResizeDrag(e){
        document.documentElement.removeEventListener('mousemove', resizeable.resizeDrag, false);
        document.documentElement.removeEventListener('mouseup', resizeable.stopResizeDrag, false);
    }

}

var resizeable = new PreviewSiteResizeable;

function relocateSpecialOptions(){
    var specialOptions = document.getElementsByClassName('selectedSpecialOptions')[0];
    if(specialOptions){
        var element = document.getElementsByClassName('selected')[0];

        specialOptions.style.top = (element.getBoundingClientRect().top + window.scrollY) + 'px';
        specialOptions.style.left = (element.getBoundingClientRect().left - 50) + 'px';
        specialOptions.style.transform = 'unset';
    }
}

function relocateElementResizer(){
    var eResizer = document.getElementsByClassName('eResizer')[0];
    var previewsite = document.getElementsByClassName('previewsite')[0];

    if(eResizer){
        var element = document.getElementsByClassName('selected')[0];

        if(element.style.width == '100%' || element.getBoundingClientRect().width >= previewsite.getBoundingClientRect().width){
            eResizer.style.left = (element.offsetLeft + element.getBoundingClientRect().width - 25) + 'px';
        }else{
            eResizer.style.left = (element.offsetLeft + element.getBoundingClientRect().width) + 'px';
        }

        eResizer.style.top = (element.offsetTop + element.getBoundingClientRect().height) + 'px';
        eResizer.style.margin = '0';
    }
}

function detectBorderTouch(element){
    var elements = $('.previewsite').find('*');
    var eleft = element.getBoundingClientRect().left;
    var etop = element.getBoundingClientRect().top;
    var eright = element.getBoundingClientRect().left + element.getBoundingClientRect().width;
    var ebottom = element.getBoundingClientRect().top + element.getBoundingClientRect().height;
    var ewidth = element.getBoundingClientRect().width;
    var eheight = element.getBoundingClientRect().height;

    for(var i=0; i < elements.length; i++){
        if(elements[i] !== element && elements[i].className !== 'vcenterline' && elements[i].className !== 'hcenterline' && elements[i].className !== 'cguide' && elements[i].className !== 'lguide' && elements[i].className !== 'rguide'){
            var left = elements[i].getBoundingClientRect().left;
            var top = elements[i].getBoundingClientRect().top;
            var right = elements[i].getBoundingClientRect().left + elements[i].getBoundingClientRect().width;
            var bottom = elements[i].getBoundingClientRect().top + elements[i].getBoundingClientRect().height;

            if(eleft == left || eleft == (left - ewidth)){
                //elements[i].style.borderLeft = '1px solid rgb(232, 13, 199)';
                elements[i].classList.add('posMatchLeft');
            }else{
                elements[i].classList.remove('posMatchLeft');
            }

            if(eright == right || eleft == right){
                //elements[i].style.borderRight = '1px solid rgb(232, 13, 199)';
                elements[i].classList.add('posMatchRight');
            }else{
                elements[i].classList.remove('posMatchRight');
            }

            if(etop == top || etop == (top - eheight)){
                //elements[i].style.borderTop = '1px solid rgb(232, 13, 199)';
                elements[i].classList.add('posMatchTop');
            }else{
                elements[i].classList.remove('posMatchTop');
            }

            if(ebottom == bottom || bottom == etop){
                //elements[i].style.borderBottom = '1px solid rgb(232, 13, 199)';
                elements[i].classList.add('posMatchBottom');
            }else{
                elements[i].classList.remove('posMatchBottom');
            }
        }
    }
}
