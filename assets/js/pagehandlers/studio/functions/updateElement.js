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

    let transforms = ["rotateX", "rotateY", "skewX", "skewY", "scaleX", "scaleY"];
    if(transforms.includes(attr)){
        let values = {
            "skewY": "",
            "skewX": "",
            "rotateY": "",
            "rotateX": "",
            "scaleY": "",
            "scaleX": "",
        };

        let transform = "";
        let parts = element.style.transform.split(' ');

        parts.forEach(x => {
            if(!x.includes(attr)){
                values[attr] = x;
                transform += x;
            }
        });

        if(attr === "rotateX"){ transform += `rotateX(${value}deg)`; }
        if(attr === "rotateY"){ transform += `rotateY(${value}deg)`; }
        if(attr === "skewX"){ transform += `skewX(${value}deg)`; }
        if(attr === "skewY"){ transform += `skewY(${value}deg)`; }
        if(attr === "scaleX"){ transform += `scaleX(${value})`; }
        if(attr === "scaleY"){ transform += `scaleY(${value})`; }

        element.style.transform = transform;
        updated = true;
    }

    if(updated === false){
        element.style[attr] = value;
    }
}
