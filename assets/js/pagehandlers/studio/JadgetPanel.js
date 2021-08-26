class JadgetPanel{
    constructor(){
        this.elementType = null;
    }

    start(){
        const self = this;

        var panel = document.createElement('div');
        panel.setAttribute('id','panel');

        panel.addEventListener('click',function(event){
            if(event.target.id == this.id || event.target.id == 'advance' || event.target.id == 'animate'){
                document.getElementsByClassName('shapechangediv')[0].style.opacity = '0';
                setTimeout(function(){document.getElementsByClassName('shapechangediv')[0].style.display = 'none';},1000);
            }else{

            }
        });

        var menuBar = document.createElement('div');
        menuBar.setAttribute('id','menuBar');

        var menuIcon_right = document.createElement('div');
        menuIcon_right.setAttribute('id','menuIcon-right');

        var menuIcon_left = document.createElement('div');
        menuIcon_left.setAttribute('id','menuIcon-left');

        menuIcon_right.addEventListener('click', function(){
            openMenubar();
        });

        menuIcon_left.addEventListener('click', function(){
            closeMenubar();
        });

        var searchbar = document.createElement('input');
        searchbar.setAttribute('placeholder','Search jadgets...');
        searchbar.setAttribute('id','searchjadgets');
        /*searchbar.addEventListener('keyup', function(){
        showjadgets();
    });*/

    var createjadget = document.createElement('div');
    createjadget.setAttribute('id','createJadget');
    createjadget.addEventListener('click', function(){
        closeMenubar();
    });

    var createJadgettext = document.createElement('div');
    createJadgettext.setAttribute('id','createJadgettext');
    $(createJadgettext).text('create custom jadget');

    createjadget.append(createJadgettext);

    var line = document.createElement('div');
    line.setAttribute('class','line');

    var buttons = document.createElement('div');
    buttons.setAttribute('id','buttons');

    var newbutton = document.createElement('button');
    newbutton.setAttribute('class','barbutton');
    newbutton.innerText = 'Create new element';
    newbutton.addEventListener('click',function(){

        var spinner = document.getElementsByClassName('spinner')[0];
        var select = document.getElementById('selecttype');
        spinner.style.display = 'block';

        setTimeout(function(){

            spinner.style.display = 'none';
            select.style.width = '150px';
            setTimeout(function(){self.populateselection();},1000);

            setTimeout(function(){
                select.style.width = '0px';
                self.populateselection('true');
            },5000);

        },1);

    });

    var selectnew = document.createElement('div');
    selectnew.setAttribute('id','selecttype');

    var spinner = document.createElement('div');
    spinner.setAttribute('class','spinner');

    buttons.appendChild(spinner);
    buttons.appendChild(newbutton);

    menuBar.append(searchbar);
    menuBar.append(createjadget);

    var previewbox = document.createElement('div');
    previewbox.setAttribute('id','previewbox');

    panel.appendChild(line);
    panel.appendChild(selectnew);
    panel.appendChild(buttons);
    //panel.appendChild(menuBar);
    //panel.appendChild(menuIcon_left);
    //panel.appendChild(menuIcon_right);

    panel.appendChild(previewbox);

    $('body').append(panel);
    $('#background').css({'display':'block'});

}

populateselection(dispopulate){
    const self = this;
    if(dispopulate == 'true'){
        setTimeout(function(){$('#selecttype').empty()},500);
    }
    else{

        var new_button = document.createElement('button');
        new_button.style.marginTop = '20px';
        new_button.innerText = 'Button';
        new_button.addEventListener('click',function(){
            self.newelement('button');
        });

        var new_div = document.createElement('button');
        new_div.style.marginTop = '10px';
        new_div.innerText = 'Div';
        new_div.addEventListener('click',function(){
            self.newelement('div');
        });

        var new_paragraph = document.createElement('button');
        new_paragraph.style.marginTop = '10px';
        new_paragraph.innerText = 'Paragraph';
        new_paragraph.addEventListener('click',function(){
            self.newelement('paragraph');
        });

        var new_heading = document.createElement('button');
        new_heading.style.marginTop = '10px';
        new_heading.innerText = 'Heading';
        new_heading.addEventListener('click',function(){
            self.newelement('heading');
        });

        var new_input = document.createElement('button');
        new_input.style.marginTop = '10px';
        new_input.innerText = 'Text Input';
        new_input.addEventListener('click',function(){
            self.newelement('input');
        });

        var new_textarea = document.createElement('button');
        new_textarea.style.marginTop = '10px';
        new_textarea.innerText = 'Textarea';
        new_textarea.addEventListener('click',function(){
            self.newelement('textarea');
        });

        var new_image = document.createElement('button');
        new_image.style.marginTop = '10px';
        new_image.innerText = 'Image';
        new_image.addEventListener('click',function(){
            self.newelement('image');
        });

        var new_video = document.createElement('button');
        new_video.style.marginTop = '10px';
        new_video.innerText = 'Video';
        new_video.addEventListener('click',function(){
            self.newelement('video');
        });

        /*var new_audio = document.createElement('button');
        new_audio.style.marginTop = '10px';
        new_audio.innerText = 'Audio';
        new_audio.addEventListener('click',function(){
        self.newelement('audio');
    });*/

    $('#selecttype').append(new_button);
    $('#selecttype').append(new_div);
    $('#selecttype').append(new_paragraph);
    $('#selecttype').append(new_heading);
    $('#selecttype').append(new_input);
    $('#selecttype').append(new_textarea);
    $('#selecttype').append(new_image);
    $('#selecttype').append(new_video);
    //$('#selecttype').append(new_audio);
}
}

newelement(type){
    const self = this;
    var select = document.getElementById('selecttype');
    select.style.width = '0px';

    self.populateselection('true');
    if(type == 'button'){
        var preview = document.createElement('button');
        preview.setAttribute('id','previewbutton');
        preview.innerText = 'Preview button';
        self.setEnv('button');
        self.elementtype = 'button';
    }

    if(type == 'div'){
        var preview = document.createElement('div');
        preview.setAttribute('id','previewdiv');
        preview.innerText = 'Preview Div';
        self.setEnv('div');
        self.elementtype = 'div';
    }

    if(type == 'input'){
        var preview = document.createElement('input');
        preview.setAttribute('id','previewinput');
        preview.setAttribute('value','Preview input');
        self.setEnv('input');
        self.elementtype = 'input';
    }

    if(type == 'paragraph'){
        var preview = document.createElement('p');
        preview.setAttribute('id','previewparagraph');
        preview.innerText = 'Preview paragraph...';
        self.setEnv('paragraph');
        self.elementtype = 'paragraph';
    }

    if(type == 'heading'){
        var preview = document.createElement('h3');
        preview.setAttribute('id','previewheading');
        preview.innerText = 'Preview heading';
        self.setEnv('heading');
        self.elementtype = 'heading';
    }

    if(type == 'textarea'){
        var preview = document.createElement('textarea');
        preview.setAttribute('id','previewtextarea');
        preview.innerText = 'Preview textarea...';
        self.setEnv('textarea');
        self.elementtype = 'textarea';
    }

    if(type == 'image'){
        var preview = document.createElement('img');
        preview.setAttribute('id','previewimage');
        self.setEnv('image');
        self.elementtype = 'image';
    }

    if(type == 'video'){
        var preview = document.createElement('video');
        preview.setAttribute('id','previewvideo');
        preview.setAttribute('controls','');
        self.setEnv('video');
        self.elementtype = 'video';
    }

    $('#previewbox').empty();
    $('#previewbox').append(preview);
}

setEnv(element){
    const self = this;
    $('#previewbox').empty();
    $('#basicdiv').remove();
    $('#rotatebox').remove();
    $('#skewbox').remove();
    $('#scalebox').remove();
    $('#stepsdiv').remove();
    $('#advance').remove();
    $('#animate').remove();
    $('giphy').remove();
    $('.backbutton').remove();

    $('.spinner').css('display','block');
    $('#panel').css({'opacity':'0.3','pointer-events':'none'});
    setTimeout(function(){
        basicSetup(element);
        $('.spinner').css('display','none');
        $('#panel').css({'opacity':'1','pointer-events':'unset'});
    },1);
}
}
