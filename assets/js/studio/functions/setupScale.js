function setupScale(element){
    var scalebox = document.createElement('div');
    scalebox.setAttribute('id','scalebox');
    scalebox.style.display = 'block';

    var scaleboxdiv_x = document.createElement('div');
    var scaleboxdiv_x_p = document.createElement('p');
    scaleboxdiv_x_p.innerText = 'x-axis';
    scaleboxdiv_x.appendChild(scaleboxdiv_x_p);
    scaleboxdiv_x.style.marginTop = '15px';

    var scaleboxdiv_y = document.createElement('div');
    var scaleboxdiv_y_p = document.createElement('p');
    scaleboxdiv_y_p.innerText = 'y-axis';
    scaleboxdiv_y.appendChild(scaleboxdiv_y_p);

    var scaleboxbanner = document.createElement('banner');
    scaleboxbannertext = document.createElement('h5');
    scaleboxbannertext.innerText = 'Scale';
    scaleboxbanner.appendChild(scaleboxbannertext);
    scalebox.appendChild(scaleboxbanner);

    scalebox_slider_x = document.createElement('input');
    scalebox_slider_x.setAttribute('type','range');
    scalebox_slider_x.setAttribute('class','slider');
    scalebox_slider_x.setAttribute('min','1');
    scalebox_slider_x.setAttribute('max','10');
    scalebox_slider_x.setAttribute('step','0.1');
    scalebox_slider_x.setAttribute('value','1');
    scaleboxdiv_x.appendChild(scalebox_slider_x);

    scalebox_slider_y = document.createElement('input');
    scalebox_slider_y.setAttribute('type','range');
    scalebox_slider_y.setAttribute('class','slider');
    scalebox_slider_y.setAttribute('min','1');
    scalebox_slider_y.setAttribute('max','10');
    scalebox_slider_y.setAttribute('step','0.1');
    scalebox_slider_y.setAttribute('value','1');
    scaleboxdiv_y.appendChild(scalebox_slider_y);

    scalebox_slider_x.addEventListener('input',function(){

        updateElement(element,'scaleX',this.value);

    });

    scalebox_slider_y.addEventListener('input',function(){

        updateElement(element,'scaleY',this.value);

    });

    scalebox.appendChild(scaleboxdiv_x);
    scalebox.appendChild(scaleboxdiv_y);
    $('#panel').append(scalebox);
}
