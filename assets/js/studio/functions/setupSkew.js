function setupSkew(element){
    var skewbox = document.createElement('div');
    skewbox.setAttribute('id','skewbox');
    skewbox.style.display = 'block';

    var skewboxdiv_x = document.createElement('div');
    var skewboxdiv_x_p = document.createElement('p');
    skewboxdiv_x_p.innerText = 'x-axis';
    skewboxdiv_x.appendChild(skewboxdiv_x_p);
    skewboxdiv_x.style.marginTop = '15px';

    var skewboxdiv_y = document.createElement('div');
    var skewboxdiv_y_p = document.createElement('p');
    skewboxdiv_y_p.innerText = 'y-axis';
    skewboxdiv_y.appendChild(skewboxdiv_y_p);

    var skewboxbanner = document.createElement('banner');
    skewboxbannertext = document.createElement('h5');
    skewboxbannertext.innerText = 'Skew';
    skewboxbanner.appendChild(skewboxbannertext);
    skewbox.appendChild(skewboxbanner);

    skewbox_slider_x = document.createElement('input');
    skewbox_slider_x.setAttribute('type','range');
    skewbox_slider_x.setAttribute('class','slider');
    skewbox_slider_x.setAttribute('min','0');
    skewbox_slider_x.setAttribute('max','180');
    skewbox_slider_x.setAttribute('step','1');
    skewbox_slider_x.setAttribute('value','0');
    skewboxdiv_x.appendChild(skewbox_slider_x);

    skewbox_slider_y = document.createElement('input');
    skewbox_slider_y.setAttribute('type','range');
    skewbox_slider_y.setAttribute('class','slider');
    skewbox_slider_y.setAttribute('min','0');
    skewbox_slider_y.setAttribute('max','180');
    skewbox_slider_y.setAttribute('step','1');
    skewbox_slider_y.setAttribute('value','0');
    skewboxdiv_y.appendChild(skewbox_slider_y);

    skewbox_slider_x.addEventListener('input',function(){

        updateElement(element,'skewX',this.value);

    });

    skewbox_slider_y.addEventListener('input',function(){

        updateElement(element,'skewY',this.value);

    });

    skewbox.appendChild(skewboxdiv_x);
    skewbox.appendChild(skewboxdiv_y);
    $('#panel').append(skewbox);
}
