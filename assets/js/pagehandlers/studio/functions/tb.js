// tb works as a middleware between function calls for doing something else if needed. this has to be removed.

function tb(element,property,value){
    if(property == 'bggex'){

        var endx = document.getElementById('endx');
        endx.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'End X: ' + value;

        var endxcombobox_options = document.getElementById('endx').getElementsByTagName( 'options' )[0];
        endxcombobox_options.style.display = 'none';
        endxcombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';

        document.getElementById('bggexvalue').innerText = value;

    }

    if(property == 'bggey'){

        var endy = document.getElementById('endy');
        endy.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'End Y: ' + value;

        var endycombobox_options = document.getElementById('endy').getElementsByTagName( 'options' )[0];
        endycombobox_options.style.display = 'none';
        endycombobox_options.getElementsByTagName( 'ul' )[0].style.display = 'none';

        document.getElementById('bggeyvalue').innerText = value;

    }

    if(property == 'animatet'){

        var timing = document.getElementById('timing');

        timing.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Timing: ' + value;
        timing.getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].style.textAlign = '';
        updateElement(element,'atiming',value);

    }
}
