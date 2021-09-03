function updateElement(attr, value){
    let element = document.getElementsByClassName("selected-element")[0];
    let updated = false;

    if(attr == 'slidePercentage'){ document.getElementsByClassName('slideSelected')[0].setAttribute('data-percentage', value); }

    if(attr == 'slideAction1'){ document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-one', value); }
    if(attr == 'slideAction1Value'){ document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-one-value', value); }
    if(attr == 'slideAction2'){ document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-two', value); }
    if(attr == 'slideAction2Value'){ document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-two-value', value); }
    if(attr == 'slideAction3'){ document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-three', value); }
    if(attr == 'slideAction3Value'){ document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-three-value', value);}

    if(attr == 'slideAction4'){ document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-four', value);}
    if(attr == 'slideAction4Value'){ document.getElementsByClassName('slideSelected')[0].setAttribute('data-action-four-value', value);}

    if(attr == 'animatedr'){
        element.style.animationDuration = value;
        $('.apelement').css('animation-duration',value)

        if(document.getElementById('rmadiv').style.opacity == '0.3'){}
        else{
            $('#rmadiv').css({'pointer-events':'none','opacity':'0.5'});
        }

        $('.spinner').css('display','block');
        setTimeout(function(){
            if(document.getElementById('rmadiv').style.opacity == '0.3'){

            }else{
                $('#rmadiv').css({'pointer-events':'unset','opacity':'1'});
            }

            $('.spinner').css('display','none');
        }, 1500);

        updated = true;
    }

    if(attr == 'animated'){
        element.style.animationDelay = value;
        $('.apelement').css('animation-delay',value)

        if(document.getElementById('rmadiv').style.opacity == '0.3'){}
        else{
            $('#rmadiv').css({'pointer-events':'none','opacity':'0.5'});
        }

        $('.spinner').css('display','block');
        setTimeout(function(){ if(document.getElementById('rmadiv').style.opacity == '0.3'){}else{$('#rmadiv').css({'pointer-events':'unset','opacity':'1'});} $('.spinner').css('display','none');},1500);

        updated = true;
    }

    if(attr == 'animatei'){
        element.style.animationIterationCount = value;
        $('.apelement').css('animation-iteration-count',value)

        if(document.getElementById('rmadiv').style.opacity == '0.3'){}
        else{
            $('#rmadiv').css({'pointer-events':'none','opacity':'0.5'});
        }

        $('.spinner').css('display','block');
        setTimeout(function(){ if(document.getElementById('rmadiv').style.opacity == '0.3'){}else{$('#rmadiv').css({'pointer-events':'unset','opacity':'1'});} $('.spinner').css('display','none');},1500);

        updated = true;
    }

    if(attr == 'atiming'){
        element.style.animationTimingFunction = value;
        $('.apelement').css('animation-timing-function',value)

        if(document.getElementById('rmadiv').style.opacity == '0.3'){}
        else{
            $('#rmadiv').css({'pointer-events':'none','opacity':'0.5'});
        }

        $('.spinner').css('display','block');
        setTimeout(function(){ if(document.getElementById('rmadiv').style.opacity == '0.3'){}else{$('#rmadiv').css({'pointer-events':'unset','opacity':'1'});} $('.spinner').css('display','none');},1500);

        updated = true;
    }

    if(attr == 'rotateX'){
        var rotateY = '';
        var rotateX = '';
        var skewY = '';
        var skewX = '';
        var scaleX = '';
        var scaleY = '';
        var parts = element.style.transform.split(' ');

        if(element.style.transform.includes('rotateX')){

            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('rotateX')){
                    rotateX = parts[i];
                }
            };

        }

        if(element.style.transform.includes('rotateY')){

            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('rotateY')){
                    rotateY = parts[i];
                }
            };

        }

        if(element.style.transform.includes('skewX')){

            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('skewX')){
                    skewX = parts[i];
                }
            };

        }

        if(element.style.transform.includes('skewY')){

            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('skewY')){
                    skewY = parts[i];
                }
            };

        }

        if(element.style.transform.includes('scaleX')){

            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('scaleX')){
                    scaleX = parts[i];
                }
            };

        }

        if(element.style.transform.includes('scaleY')){

            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('scaleY')){
                    scaleY = parts[i];
                }
            };

        }

        element.style.transform = 'translate(-50%,-50%) ' + 'rotateX('+value+'deg)' + rotateY + skewX + skewY  + scaleX + scaleY;

        updated = true;
    }

    if(attr == 'rotateY'){
        var rotateY = '';
        var rotateX = '';
        var skewY = '';
        var skewX = '';
        var scaleX = '';
        var scaleY = '';
        var parts = element.style.transform.split(' ');

        if(element.style.transform.includes('rotateX')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('rotateX')){
                    rotateX = parts[i];
                }
            };
        }

        if(element.style.transform.includes('rotateY')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('rotateY')){
                    rotateY = parts[i];
                }
            };
        }

        if(element.style.transform.includes('skewX')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('skewX')){
                    skewX = parts[i];
                }
            };
        }

        if(element.style.transform.includes('skewY')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('skewY')){
                    skewY = parts[i];
                }
            };
        }

        if(element.style.transform.includes('scaleX')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('scaleX')){
                    scaleX = parts[i];
                }
            };
        }

        if(element.style.transform.includes('scaleY')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('scaleY')){
                    scaleY = parts[i];
                }
            };
        }

        element.style.transform = 'translate(-50%,-50%) ' + rotateX + 'rotateY('+value+'deg)' + skewX + skewY  + scaleX + scaleY;

        updated = true;
    }

    if(attr == 'skewX'){
        var skewY = '';
        var skewX = '';
        var rotateY = '';
        var rotateX = '';
        var scaleX = '';
        var scaleY = '';
        var parts = element.style.transform.split(' ');

        if(element.style.transform.includes('skewX')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('skewX')){
                    skewX = parts[i];
                }
            };
        }

        if(element.style.transform.includes('skewY')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('skewY')){
                    skewY = parts[i];
                }
            };
        }

        if(element.style.transform.includes('rotateX')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('rotateX')){
                    rotateX = parts[i];
                }
            };
        }

        if(element.style.transform.includes('rotateY')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('rotateY')){
                    rotateY = parts[i];
                }
            };
        }

        if(element.style.transform.includes('scaleX')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('scaleX')){
                    scaleX = parts[i];
                }
            };
        }

        if(element.style.transform.includes('scaleY')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('scaleY')){
                    scaleY = parts[i];
                }
            };
        }

        element.style.transform = 'translate(-50%,-50%) ' + rotateX + rotateY + 'skewX('+value+'deg)' + skewY  + scaleX + scaleY;

        updated = true;
    }

    if(attr == 'skewY'){
        var skewY = '';
        var skewX = '';
        var rotateY = '';
        var rotateX = '';
        var scaleX = '';
        var scaleY = '';
        var parts = element.style.transform.split(' ');

        if(element.style.transform.includes('skewX')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('skewX')){
                    skewX = parts[i];
                }
            };
        }

        if(element.style.transform.includes('skewY')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('skewY')){
                    skewY = parts[i];
                }
            };
        }

        if(element.style.transform.includes('rotateX')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('rotateX')){
                    rotateX = parts[i];
                }
            };
        }

        if(element.style.transform.includes('rotateY')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('rotateY')){
                    rotateY = parts[i];
                }
            };
        }

        if(element.style.transform.includes('scaleX')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('scaleX')){
                    scaleX = parts[i];
                }
            };
        }

        if(element.style.transform.includes('scaleY')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('scaleY')){
                    scaleY = parts[i];
                }
            };
        }

        element.style.transform = 'translate(-50%,-50%) ' + rotateX + rotateY + skewX + 'skewY('+value+'deg)' + scaleX + scaleY;

        updated = true;
    }

    if(attr == 'scaleX'){
        var skewY = '';
        var skewX = '';
        var rotateY = '';
        var rotateX = '';
        var scaleY = '';
        var scaleX = '';
        var parts = element.style.transform.split(' ');

        if(element.style.transform.includes('scaleX')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('scaleX')){
                    scaleX = parts[i];
                }
            };
        }

        if(element.style.transform.includes('scaleY')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('scaleY')){
                    scaleY = parts[i];
                }
            };
        }

        if(element.style.transform.includes('rotateX')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('rotateX')){
                    rotateX = parts[i];
                }
            };
        }

        if(element.style.transform.includes('rotateY')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('rotateY')){
                    rotateY = parts[i];
                }
            };
        }

        if(element.style.transform.includes('skewX')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('skewX')){
                    skewX = parts[i];
                }
            };
        }

        if(element.style.transform.includes('skewY')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('skewY')){
                    skewY = parts[i];
                }
            };
        }

        element.style.transform = 'translate(-50%,-50%) ' + rotateX + rotateY + skewX + skewY + 'scaleX('+value+')' + scaleY;

        updated = true;
    }

    if(attr == 'scaleY'){
        var skewY = '';
        var skewX = '';
        var rotateY = '';
        var rotateX = '';
        var scaleY = '';
        var scaleX = '';
        var parts = element.style.transform.split(' ');

        if(element.style.transform.includes('scaleX')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('scaleX')){
                    scaleX = parts[i];
                }
            };
        }

        if(element.style.transform.includes('scaleY')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('scaleY')){
                    scaleY = parts[i];
                }
            };
        }

        if(element.style.transform.includes('rotateX')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('rotateX')){
                    rotateX = parts[i];
                }
            };
        }

        if(element.style.transform.includes('rotateY')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('rotateY')){
                    rotateY = parts[i];
                }
            };
        }

        if(element.style.transform.includes('skewX')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('skewX')){
                    skewX = parts[i];
                }
            };
        }

        if(element.style.transform.includes('skewY')){
            for(var i = 0; i < parts.length; ++i) {
                if(parts[i].includes('skewY')){
                    skewY = parts[i];
                }
            };
        }

        element.style.transform = 'translate(-50%,-50%) ' + rotateX + rotateY + skewX + skewY + scaleX+ 'scaleY('+value+')';

        updated = true;
    }

    if(updated === false){
        element.style[attr] = value;
    }
}
