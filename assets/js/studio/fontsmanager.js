class FontsManager{
  constructor(){}

  load(){
  }

  empty(){
    var comboboxes = document.getElementsByClassName('fontManager')[0].getElementsByTagName('combobox');

    for(var i = comboboxes.length -1; i >= 0 ; i--){
      comboboxes[i].remove();
    }
  }

  open(){
    var fontManager = document.createElement('div');
    fontManager.className = 'fontManager';
    fontManager.addEventListener('mousedown',function(e){
      fontmanager.mousedown(e);
    });

    var banner = document.createElement('div');
    banner.className = 'banner';

    var banner_p = document.createElement('p');
    banner_p.innerText = 'Font Manager';

    banner.appendChild(banner_p);

    fontManager.appendChild(banner);
    body.appendChild(fontManager);

    progress.show();

    this.addFontComboBox();
    getGoogleFonts(document.getElementsByClassName('selected')[0],'webpageBuilder');

  }

  close(){
    document.getElementsByClassName('fontManager')[0].remove();
  }

  drag(e){
    var elmnt = document.getElementsByClassName('fontManager')[0];
    e = e || window.event;
    e.preventDefault();

    // calculate the new cursor position:
    styler_pos1 = styler_pos3 - e.clientX;
    styler_pos2 = styler_pos4 - e.clientY;
    styler_pos3 = e.clientX;
    styler_pos4 = e.clientY;

    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - styler_pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - styler_pos1) + "px";
    elmnt.style.cursor = 'grabbing';
  }

  mousedown(e){
    var elmnt = document.getElementsByClassName('fontManager')[0];
    if(e.target == elmnt){
      e = e || window.event;
      e.preventDefault();

      elmnt.style.cursor = 'grab';

      // get the mouse cursor position at startup:
      styler_pos3 = e.clientX;
      styler_pos4 = e.clientY;
      document.onmouseup = this.closeDrag;

      // call a function whenever the cursor moves:
      document.onmousemove = this.drag;
    }
  }

  closeDrag(){
    var elmnt = document.getElementsByClassName('fontManager')[0];
    document.onmouseup = null;
    document.onmousemove = null;
    elmnt.style.cursor = 'default';
  }

  addFontComboBox(){
    var comboboxOptions = [{value:'Sans'},{value:'Sans-Serif'},{value:'Helvectia'},{value:'Monospace'},{value:'Cursive'},{value:'Fantasy'}]
    var combobox = document.createElement('combobox');
    combobox.setAttribute('id','wpb_fontFamily');
    combobox.style.marginTop = '50px';

    var combobox_selected = document.createElement('selected');
    var combobox_selected_a = document.createElement('a');
    var combobox_selected_a_span = document.createElement('span');
    combobox_selected_a_span.innerText = 'Font Family';

    combobox_selected.appendChild(combobox_selected_a);
    combobox_selected_a.appendChild(combobox_selected_a_span);

    var combobox_options = document.createElement('options');
    var combobox_options_ul = document.createElement('ul');

    for(var x=0; x<comboboxOptions.length; x++){
      var combobox_option = document.createElement('li');

      var combobox_option_a = document.createElement('a');
      combobox_option_a.innerText = comboboxOptions[x].value;
      combobox_option_a.style.fontFamily = comboboxOptions[x].value;

      if(x == comboboxOptions.length-1){
        combobox_option_a.className = 'lastoption';
      }

      var combobox_option_a_span = document.createElement('span');
      combobox_option_a_span.innerText = comboboxOptions[x].value;
      combobox_option_a_span.setAttribute('class','value');

      combobox_option_a.appendChild(combobox_option_a_span);
      combobox_option.appendChild(combobox_option_a);

      combobox_option.addEventListener('click',function(){
        document.getElementsByClassName('selected')[0].style.fontFamily = this.getElementsByTagName('a')[0].innerText;
        combobox_selected_a_span.innerText = 'Font Family' + ': ' + this.getElementsByTagName('a')[0].innerText;
        combobox_options.style.display = 'none';
      });

      combobox_options_ul.appendChild(combobox_option);

    }

    combobox_selected_a_span.addEventListener('click',function(e){

        if(e.target == combobox_selected_a_span){

          if(combobox_options.style.display == 'block'){

            combobox_options.style.display = 'none';
            combobox_options_ul.style.display = 'none';
            //combobox_customedit.style.display = 'none';
            combobox_selected_a_span.style.textAlign = '';
            combobox.classList.remove('selectedCombobox');

          }else{

            combobox_options.style.display = 'block';
            combobox_options_ul.style.display = 'block';
            //combobox_customedit.style.display = 'block';
            combobox_selected_a_span.style.textAlign = 'left';
            combobox.classList.add('selectedCombobox');

          }

        }else{

        }

        });

    combobox_options.appendChild(combobox_options_ul);
    combobox.appendChild(combobox_selected);
    combobox.appendChild(combobox_options);
    document.getElementsByClassName('fontManager')[0].appendChild(combobox);

  }

}
