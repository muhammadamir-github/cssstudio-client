function setupRotate(element){
    var rotatebox = document.createElement('div');
    rotatebox.setAttribute('id','rotatebox');
    rotatebox.style.display = 'block';

    var rotateboxdiv_x = document.createElement('div');
    var rotateboxdiv_x_p = document.createElement('p');
    rotateboxdiv_x_p.innerText = 'x-axis';
    rotateboxdiv_x.appendChild(rotateboxdiv_x_p);
    rotateboxdiv_x.style.marginTop = '15px';

    var rotateboxdiv_y = document.createElement('div');
    var rotateboxdiv_y_p = document.createElement('p');
    rotateboxdiv_y_p.innerText = 'y-axis';
    rotateboxdiv_y.appendChild(rotateboxdiv_y_p);

    var rotateboxbanner = document.createElement('banner');
    rotateboxbannertext = document.createElement('h5');
    rotateboxbannertext.innerText = 'Rotate';
    rotateboxbanner.appendChild(rotateboxbannertext);
    rotatebox.appendChild(rotateboxbanner);

    rotatebox_slider_x = document.createElement('input');
    rotatebox_slider_x.setAttribute('type','range');
    rotatebox_slider_x.setAttribute('class','slider');
    rotatebox_slider_x.setAttribute('min','0');
    rotatebox_slider_x.setAttribute('max','180');
    rotatebox_slider_x.setAttribute('step','1');
    rotatebox_slider_x.setAttribute('value','0');
    rotateboxdiv_x.appendChild(rotatebox_slider_x);

    rotatebox_slider_y = document.createElement('input');
    rotatebox_slider_y.setAttribute('type','range');
    rotatebox_slider_y.setAttribute('class','slider');
    rotatebox_slider_y.setAttribute('min','0');
    rotatebox_slider_y.setAttribute('max','180');
    rotatebox_slider_y.setAttribute('step','1');
    rotatebox_slider_y.setAttribute('value','0');
    rotateboxdiv_y.appendChild(rotatebox_slider_y);

    rotatebox_slider_x.addEventListener('input',function(){

        updateElement(element,'rotateX',this.value);

    });

    rotatebox_slider_y.addEventListener('input',function(){

        updateElement(element,'rotateY',this.value);

    });

    rotatebox.appendChild(rotateboxdiv_x);
    rotatebox.appendChild(rotateboxdiv_y);
    $('#panel').append(rotatebox);
}
