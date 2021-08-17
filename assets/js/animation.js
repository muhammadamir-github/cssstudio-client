function dataAttributeBalancer(property,value){
  var sSlide = document.getElementsByClassName('slideSelected')[0];
  var attributesAvailable = $(sSlide).attr('data-attr-avail');
  var propertySplited = property.split('slide')[1];

  if(value == '' || property == ''){

  }else{

    if(value == '0' || value == '0px' || value == '0%' || value != ' %' || value != ' px' || value != ''){
      
      //checks for first action availability.
      if($(sSlide).attr('data-action-one') == propertySplited){
        sSlide.setAttribute('data-action-one-value',value);
      }else{

        //checks for second action availability.
        if($(sSlide).attr('data-action-two') == propertySplited){
          sSlide.setAttribute('data-action-two-value',value);
        }else{

          //checks for third action availability.
          if($(sSlide).attr('data-action-three') == propertySplited){
           sSlide.setAttribute('data-action-three-value',value);
          }else{ 

               //checks for fourth action availability.
               if($(sSlide).attr('data-action-four') == propertySplited){
                  sSlide.setAttribute('data-action-four-value',value);
               }else{
                  //if no action's property is matched with the property , create a new action.

                  if(attributesAvailable == '1'){
                   sSlide.setAttribute('data-action-four',propertySplited);
                   sSlide.setAttribute('data-action-four-value',value);
                   sSlide.setAttribute('data-attr-avail','0');
                  }

                  if(attributesAvailable == '2'){
                   sSlide.setAttribute('data-action-three',propertySplited);
                   sSlide.setAttribute('data-action-three-value',value);
                   sSlide.setAttribute('data-attr-avail','1');
                  }

                  if(attributesAvailable == '3'){
                   sSlide.setAttribute('data-action-two',propertySplited);
                   sSlide.setAttribute('data-action-two-value',value);
                   sSlide.setAttribute('data-attr-avail','2');
                  }

                  if(attributesAvailable == '4'){
                   sSlide.setAttribute('data-action-one',propertySplited);
                   sSlide.setAttribute('data-action-one-value',value);
                   sSlide.setAttribute('data-attr-avail','3');
                  }

                  if(attributesAvailable == '0'){
                    notification('Error , No more actions can be assigned to this slide.');
                  }
               }
          }

        }

      }


    }

  }

}

function setupanimator(element){
    var animatorTimeline = document.createElement('div');
    animatorTimeline.setAttribute('id','aT');

    var createanimationbutton = document.createElement('button');
    createanimationbutton.setAttribute('class','newanimationbtn');
    createanimationbutton.innerText = 'Create New Animation';
    createanimationbutton.addEventListener('click',function(){
      animationActions('switch-custom','',element);
      this.style.display = 'none';
    });

    var addslide = document.createElement('span');
    var addslide_i = document.createElement('i');
    var addslide_tooltip = document.createElement('span');
    addslide_i.setAttribute('class','fas fa-plus');
    addslide.setAttribute('class','aTbutton');
    addslide_tooltip.setAttribute('class','tooltip');
    addslide_tooltip.innerText = 'Add Slide';
    addslide.style.backgroundColor = 'darkred';
    addslide.appendChild(addslide_i);
    addslide.appendChild(addslide_tooltip);
    addslide.addEventListener('click',function(){
      var n = $("animationSlide").length + 1;
      animationActions('addslide',n,'');
    });

    var resetanimation = document.createElement('span');
    var resetanimation_i = document.createElement('i');
    var resetanimation_tooltip = document.createElement('span');
    resetanimation_i.setAttribute('class','fas fa-sync-alt');
    resetanimation.setAttribute('class','aTbutton');
    resetanimation_tooltip.setAttribute('class','tooltip');
    resetanimation_tooltip.innerText = 'Reset';
    resetanimation.style.backgroundColor = '#3399ff';
    resetanimation.style.left = '30px';
    resetanimation.appendChild(resetanimation_i);
    resetanimation.appendChild(resetanimation_tooltip);
    resetanimation.addEventListener('click',function(){
      animationActions('reset','','');
    });

    var playanimation = document.createElement('span');
    var playplayanimation_i = document.createElement('i');
    var playplayanimation_tooltip = document.createElement('span');
    playplayanimation_i.setAttribute('class','fas fa-play');
    playanimation.setAttribute('class','aTbutton');
    playplayanimation_tooltip.setAttribute('class','tooltip');
    playplayanimation_tooltip.innerText = 'Play';
    playanimation.style.backgroundColor = '#88cc00';
    playanimation.style.left = '55px';
    playanimation.appendChild(playplayanimation_i);
    playanimation.appendChild(playplayanimation_tooltip);
    playanimation.addEventListener('click',function(){
      animationActions('play','',element);
    });

    var switchtoreadymadeanimation = document.createElement('span');
    var switchtoreadymadeanimation_i = document.createElement('i');
    var switchtoreadymadeanimation_tooltip = document.createElement('span');
    switchtoreadymadeanimation_i.setAttribute('class','fas fa-toggle-on');
    switchtoreadymadeanimation.setAttribute('class','aTbutton');
    switchtoreadymadeanimation_tooltip.setAttribute('class','tooltip');
    switchtoreadymadeanimation_tooltip.style.width = '200px';
    switchtoreadymadeanimation_tooltip.innerText = 'Switch to ready made animations.';
    switchtoreadymadeanimation.style.backgroundColor = '#463496';
    switchtoreadymadeanimation.style.left = '80px';
    switchtoreadymadeanimation.appendChild(switchtoreadymadeanimation_i);
    switchtoreadymadeanimation.appendChild(switchtoreadymadeanimation_tooltip);
    switchtoreadymadeanimation.addEventListener('click',function(){
      animationActions('switch-readymade','',element);
      document.getElementsByClassName('newanimationbtn')[0].style.display = 'block';
    });

    animatorTimeline.appendChild(addslide);
    animatorTimeline.appendChild(resetanimation);
    animatorTimeline.appendChild(playanimation);
    
    if(plan !== 'Free'){
     if(plan == 'Gold' || plan == 'Diamond'){
        animatorTimeline.appendChild(switchtoreadymadeanimation);
     }
    }

    for(var i = 1; i < 4; i++){

    var Slide = document.createElement('animationSlide');
    Slide.setAttribute('data-percentage','%');
    Slide.setAttribute('data-attr-avail','4');
    Slide.addEventListener('click',function(){
      $('.slideSelected').removeClass('slideSelected');
      this.classList.add('slideSelected');
      animationActions('options-enable','',element);
      updateSlideOptions(element);
    });
    
    var slidenumber = document.createElement('span');
    slidenumber.style.backgroundColor = 'black';
    slidenumber.innerText = i;

    var deleteslide = document.createElement('span');
    var deleteslide_i = document.createElement('i');
    var deleteslide_tooltip = document.createElement('span');
    deleteslide_tooltip.setAttribute('class','tooltip');
    deleteslide_tooltip.innerText = 'Delete Slide';
    deleteslide_i.setAttribute('class','far fa-trash-alt');
    deleteslide.style.backgroundColor = 'darkred';
    deleteslide.style.left = '25px';
    deleteslide.style.width = '13px';
    deleteslide.appendChild(deleteslide_tooltip);
    deleteslide.appendChild(deleteslide_i);
    deleteslide.addEventListener('click',function(){
      this.parentNode.remove();
      animationActions('renumber','','');
    });

    var resetslide = document.createElement('span');
    var resetslide_i = document.createElement('i');
    var resetslide_tooltip = document.createElement('span');
    resetslide_tooltip.setAttribute('class','tooltip');
    resetslide_tooltip.innerText = 'Reset Slide';
    resetslide_i.setAttribute('class','fas fa-sync-alt');
    resetslide.style.backgroundColor = '#a8d65e';
    resetslide.style.left = '47px';
    resetslide.style.width = '13px';
    resetslide.appendChild(resetslide_tooltip);
    resetslide.appendChild(resetslide_i);

    Slide.appendChild(slidenumber);
    Slide.appendChild(deleteslide);
    Slide.appendChild(resetslide);
    animatorTimeline.appendChild(Slide);
    animatorTimeline.appendChild(createanimationbutton);

    }

    $('#animate').append(animatorTimeline);
    $('#aT').find('*').not('.newanimationbtn').not('.aTbutton').css({'opacity':'0.5','pointerEvents':'none'});
    $('.aTbutton').css({'pointer-events':'none'});

    setupSlideOptions();
}


function animationActions(action,n,element){

  var animatorTimeline = document.getElementById('aT');

  if(action == 'play'){
      $('style').remove();
      var myReuseableStylesheet = document.createElement('style');
      myReuseableStylesheet.appendChild(document.createTextNode(""));
      document.head.appendChild(myReuseableStylesheet);

      var name = 'preview';
      var frames = '';

      var slides = document.getElementsByTagName('animationSlide');

      for(var i = 0; i < slides.length; i++){

        var percentage = $(slides[i]).attr('data-percentage');
        var tempframes = '';
        var transform = 'transform: translate(-50%,-50%) ';

        if($(slides[i]).attr('data-action-one')){
          var a = $(slides[i]).attr('data-action-one').toLowerCase();
          var b = $(slides[i]).attr('data-action-one-value');
          var c = a + ':' + b + ';';

          if(a.includes('scale') || a.includes('skew') || a.includes('rotate')){
            if(a.includes('rotate') || a.includes('skew')){
              transform = transform + a + '(' + b + 'deg)' + ';';
            }else{
              transform = transform + a + '(' + b + ')' + ';';
            }
            tempframes = tempframes + transform;
          }else{
            if(a == 'fontsize'){
              c = 'font-size' + ':' + b + 'px;';
            }
            if(a == 'fontweight'){
              c = 'font-weight' + ':' + b + ';';
            }
            if(a == 'borderradius'){
              c = 'border-radius' + ':' + b + 'px;';
            }
            if(a == 'bordersize'){
              c = 'border-width' + ':' + b + 'px;';
            }
            if(a == 'animatefcd'){
              c = 'color' + ':' + b + ';';
            }
            if(a == 'animatebcd'){
              c = 'border-color' + ':' + b + ';';
            }
            if(a == 'animatebgcd'){
              c = 'background-color' + ':' + b + ';';
            }
            tempframes = tempframes + c;
          }

          //console.log(tempframes + c);
        }

        if($(slides[i]).attr('data-action-two')){
          var a = $(slides[i]).attr('data-action-two').toLowerCase();
          var b = $(slides[i]).attr('data-action-two-value');
          var c = a + ':' + b + ';';

          if(a.includes('scale') || a.includes('skew') || a.includes('rotate')){
            if(a.includes('rotate') || a.includes('skew')){
              transform = transform + a + '(' + b + 'deg)' + ';';
            }else{
              transform = transform + a + '(' + b + ')' + ';';
            }
            tempframes = tempframes + transform;
          }else{
            if(a == 'fontsize'){
              c = 'font-size' + ':' + b + 'px;';
            }
            if(a == 'fontweight'){
              c = 'font-weight' + ':' + b + ';';
            }
            if(a == 'borderradius'){
              c = 'border-radius' + ':' + b + 'px;';
            }
            if(a == 'bordersize'){
              c = 'border-width' + ':' + b + 'px;';
            }
            if(a == 'animatefcd'){
              c = 'color' + ':' + b + ';';
            }
            if(a == 'animatebcd'){
              c = 'border-color' + ':' + b + ';';
            }
            if(a == 'animatebgcd'){
              c = 'background-color' + ':' + b + ';';
            }
            tempframes = tempframes + c;
          }

          //console.log(tempframes + c);
        }

        if($(slides[i]).attr('data-action-three')){
          var a = $(slides[i]).attr('data-action-three').toLowerCase();
          var b = $(slides[i]).attr('data-action-three-value');
          var c = a + ':' + b + ';';

          if(a.includes('scale') || a.includes('skew') || a.includes('rotate')){
            if(a.includes('rotate') || a.includes('skew')){
              transform = transform + a + '(' + b + 'deg)' + ';';
            }else{
              transform = transform + a + '(' + b + ')' + ';';
            }
            tempframes = tempframes + transform;
          }else{
            if(a == 'fontsize'){
              c = 'font-size' + ':' + b + 'px;';
            }
           if(a == 'fontweight'){
              c = 'font-weight' + ':' + b + ';';
            }
            if(a == 'borderradius'){
              c = 'border-radius' + ':' + b + 'px;';
            }
            if(a == 'bordersize'){
              c = 'border-width' + ':' + b + 'px;';
            }
            if(a == 'animatefcd'){
              c = 'color' + ':' + b + ';';
            }
            if(a == 'animatebcd'){
              c = 'border-color' + ':' + b + ';';
            }
            if(a == 'animatebgcd'){
              c = 'background-color' + ':' + b + ';';
            }
            tempframes = tempframes + c;
          }

        }

        if($(slides[i]).attr('data-action-four')){
          var a = $(slides[i]).attr('data-action-four').toLowerCase();
          var b = $(slides[i]).attr('data-action-four-value');
          var c = a + ':' + b + ';';

          if(a.includes('scale') || a.includes('skew') || a.includes('rotate')){
            if(a.includes('rotate') || a.includes('skew')){
              transform = transform + a + '(' + b + 'deg)' + ';';
            }else{
              transform = transform + a + '(' + b + ')' + ';';
            }
            tempframes = tempframes + transform;
          }else{
            if(a == 'fontsize'){
              c = 'font-size' + ':' + b + 'px;';
            }
           if(a == 'fontweight'){
              c = 'font-weight' + ':' + b + ';';
            }
            if(a == 'borderradius'){
              c = 'border-radius' + ':' + b + 'px;';
            }
            if(a == 'bordersize'){
              c = 'border-width' + ':' + b + 'px;';
            }
            if(a == 'animatefcd'){
              c = 'color' + ':' + b + ';';
            }
            if(a == 'animatebcd'){
              c = 'border-color' + ':' + b + ';';
            }
            if(a == 'animatebgcd'){
              c = 'background-color' + ':' + b + ';';
            }
            tempframes = tempframes + c;
          }

        }

        frames = frames + percentage + '{' + tempframes + '}';
        //console.log(frames);
        //console.log(tempframes);
        //console.log(transform);
      }

      var str = name + "{" + frames + "}";
      var pos = myReuseableStylesheet.length;
      //myReuseableStylesheet.innerText = myReuseableStylesheet.innerText + "@-webkit-keyframes " + str;
      myReuseableStylesheet.innerText = myReuseableStylesheet.innerText + "@keyframes " + str;
      document.getElementById('preview'+element).style.animation = 'preview 1s ease-in-out infinite';
      //console.log(str);

  }

  if(action == 'options-enable'){
    document.getElementById('slidePercentage').style.opacity = '1';
    document.getElementById('slidePercentage').style.pointerEvents = 'unset';

    document.getElementById('slideOpacity').style.opacity = '1';
    document.getElementById('slideOpacity').style.pointerEvents = 'unset';

    document.getElementById('animationSliderBox').style.opacity = '1';
    document.getElementById('animationSliderBox').style.pointerEvents = 'unset';
  }

  if(action == 'options-disable'){
    document.getElementById('slidePercentage').style.opacity = '0.5';
    document.getElementById('slidePercentage').style.pointerEvents = 'none';

    document.getElementById('slideOpacity').style.opacity = '0.5';
    document.getElementById('slideOpacity').style.pointerEvents = 'none';

    document.getElementById('animationSliderBox').style.opacity = '0.5';
    document.getElementById('animationSliderBox').style.pointerEvents = 'none';
  }

  if(action == 'addslide'){
    var Slide = document.createElement('animationSlide');
    Slide.setAttribute('data-percentage','%');
    Slide.setAttribute('data-attr-avail','4');
    Slide.addEventListener('click',function(){
      $('.slideSelected').removeClass('slideSelected');
      this.classList.add('slideSelected');
      animationActions('options-enable','',element);
      updateSlideOptions(element);
    });
    
    var slidenumber = document.createElement('span');
    slidenumber.style.backgroundColor = 'black';
    slidenumber.innerText = n;

    var deleteslide = document.createElement('span');
    var deleteslide_i = document.createElement('i');
    var deleteslide_tooltip = document.createElement('span');
    deleteslide_tooltip.setAttribute('class','tooltip');
    deleteslide_tooltip.innerText = 'Delete Slide';
    deleteslide_i.setAttribute('class','far fa-trash-alt');
    deleteslide.style.backgroundColor = 'darkred';
    deleteslide.style.left = '25px';
    deleteslide.style.width = '13px';
    deleteslide.appendChild(deleteslide_tooltip);
    deleteslide.appendChild(deleteslide_i);
    deleteslide.addEventListener('click',function(){
      this.parentNode.remove();
      animationActions('renumber','');
    });

    var resetslide = document.createElement('span');
    var resetslide_i = document.createElement('i');
    var resetslide_tooltip = document.createElement('span');
    resetslide_tooltip.setAttribute('class','tooltip');
    resetslide_tooltip.innerText = 'Reset Slide';
    resetslide_i.setAttribute('class','fas fa-sync-alt');
    resetslide.style.backgroundColor = '#a8d65e';
    resetslide.style.left = '47px';
    resetslide.style.width = '13px';
    resetslide.appendChild(resetslide_tooltip);
    resetslide.appendChild(resetslide_i);

    Slide.appendChild(slidenumber);
    Slide.appendChild(deleteslide);
    Slide.appendChild(resetslide);

    if(n > 9){
      slidenumber.style.width = '15px';
      deleteslide.style.left = '29px';
    }

    animatorTimeline.appendChild(Slide);
  }

  if(action == 'reset'){
    $('animationSlide').remove();

    for(var i = 1; i < 4; i++){

    var Slide = document.createElement('animationSlide');
    Slide.setAttribute('data-percentage','%');
    Slide.setAttribute('data-attr-avail','4');
    Slide.addEventListener('click',function(){
      $('.slideSelected').removeClass('slideSelected');
      this.classList.add('slideSelected');
      animationActions('options-enable','',element);
      updateSlideOptions(element);
    });
    
    var slidenumber = document.createElement('span');
    slidenumber.style.backgroundColor = 'black';
    slidenumber.innerText = i;

    var deleteslide = document.createElement('span');
    var deleteslide_i = document.createElement('i');
    var deleteslide_tooltip = document.createElement('span');
    deleteslide_tooltip.setAttribute('class','tooltip');
    deleteslide_tooltip.innerText = 'Delete Slide';
    deleteslide_i.setAttribute('class','far fa-trash-alt');
    deleteslide.style.backgroundColor = 'darkred';
    deleteslide.style.left = '25px';
    deleteslide.style.width = '13px';
    deleteslide.appendChild(deleteslide_tooltip);
    deleteslide.appendChild(deleteslide_i);
    deleteslide.addEventListener('click',function(){
      this.parentNode.remove();
      animationActions('renumber','');
    });

    var resetslide = document.createElement('span');
    var resetslide_i = document.createElement('i');
    var resetslide_tooltip = document.createElement('span');
    resetslide_tooltip.setAttribute('class','tooltip');
    resetslide_tooltip.innerText = 'Reset Slide';
    resetslide_i.setAttribute('class','fas fa-sync-alt');
    resetslide.style.backgroundColor = '#a8d65e';
    resetslide.style.left = '47px';
    resetslide.style.width = '13px';
    resetslide.appendChild(resetslide_tooltip);
    resetslide.appendChild(resetslide_i);

    Slide.appendChild(slidenumber);
    Slide.appendChild(deleteslide);
    Slide.appendChild(resetslide);
    animatorTimeline.appendChild(Slide);

    }
  }

  if(action == 'renumber'){
      var slides = document.getElementsByTagName('animationslide');
  
      $.each(slides,function(key,value){
          value.getElementsByTagName('span')[0].innerText = key+1;
      });
  }

  if(action == 'switch-custom'){
      var el = document.getElementById('preview'+element);
      var rmadiv = document.getElementById('rmadiv');

      $('#aT').find('*').not('.newanimationbtn').not('.aTbutton').css({'opacity':'1','pointerEvents':'unset'});
      $('.aTbutton').css({'pointer-events':''});
      rmadiv.style.opacity = '0.3';
      rmadiv.style.pointerEvents = 'none';

      el.style.animationName = '';
      el.style.animationDuration = Math.floor((Math.random() * 3) + 1);
      el.style.animationDelay = '0s';
      el.style.animationTimingFunction = 'linear';
      el.style.animationIterationCount = 'Infinite';

      $('animationPreview').css('border','');
      document.getElementById('noa').style.border = '1px solid green';
  }

  if(action == 'switch-readymade'){
      var el = document.getElementById('preview'+element);
      var rmadiv = document.getElementById('rmadiv');

      $('#aT').find('*').not('.newanimationbtn').not('.aTbutton').css({'opacity':'0.5','pointerEvents':'none'});
      $('.aTbutton').css({'pointer-events':'none'});
      rmadiv.style.opacity = '1';
      rmadiv.style.pointerEvents = 'unset';

      el.style.animationName = '';
      el.style.animationDuration = Math.floor((Math.random() * 3) + 1);
      el.style.animationDelay = Math.floor((Math.random() * 8) + 3) + 's';
      el.style.animationTimingFunction = 'linear';
      el.style.animationIterationCount = 'Infinite';

      $('animationPreview').css('border','');
      document.getElementById('noa').style.border = '1px solid green';
      animationActions('options-disable','',element);
  }

}

function updateSlideOptions(el){
  var sSlide = document.getElementsByClassName('slideSelected')[0];
  var element = document.getElementById('preview'+el);

  var percentage = $(sSlide).attr('data-percentage');

  var slidePercentage = document.getElementById('slidePercentage');
  slidePercentage.getElementsByTagName('selected')[0].
      getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Percentage: '+percentage;

  var slideOpacity = document.getElementById('slideOpacity');
  slideOpacity.getElementsByTagName('selected')[0].
      getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Opacity: 0';

  $('#slideScaleX').val('0');
  $('#slideScaleY').val('0');
  $('#slideRotate').val('0');
  $('#slideSkewX').val('0');
  $('#slideSkewY').val('0');
  $('#slideFontSize').val('0');
  $('#slideFontWeight').val('0');
  $('#slideBorderSize').val('0');
  $('#slideBorderRadius').val('0');

  $('#animatefcd').css('background-color','white');
  $('#animatebcd').css('background-color','white');
  $('#animatebgcd').css('background-color','white');

  var displays = 
  {
    Opacity:{displayElement:"combobox"},
    ScaleX:{displayElement:"slider"},
    ScaleY:{displayElement:"slider"},
    Rotate:{displayElement:"slider"},
    SkewX:{displayElement:"slider"},
    SkewY:{displayElement:"slider"},
    FontSize:{displayElement:"slider"},
    FontWeight:{displayElement:"slider"},
    BorderSize:{displayElement:"slider"},
    BorderRadius:{displayElement:"slider"},
    animatefcd:{displayElement:"colordisplay"},
    animatebcd:{displayElement:"colordisplay"},
    animatebgcd:{displayElement:"colordisplay"},
  };

  if($(sSlide).attr('data-action-one')){
    var dataOne = $(sSlide).attr('data-action-one');
    var dataOneValue = $(sSlide).attr('data-action-one-value');

    var dataOneDisplay = document.getElementById('slide'+dataOne);

    if(displays[dataOne].displayElement == 'combobox'){
      dataOneDisplay.getElementsByTagName('selected')[0].
        getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = dataOne + ' ' +dataOneValue;
    }

    if(displays[dataOne].displayElement == 'slider'){
      if(dataOne.includes('FontWeight')){
        if(dataOneValue == 'normal'){
          $(dataOneDisplay).val('0');
        }
        if(dataOneValue == 'bold'){
          $(dataOneDisplay).val('1');
        }
      }else{
        $(dataOneDisplay).val(dataOneValue);
      }
    }

    if(displays[dataOne].displayElement == 'colordisplay'){
      var colordisplay = document.getElementById(dataOne).style.backgroundColor = dataOneValue;
    }

  }

  if($(sSlide).attr('data-action-two')){
    var dataTwo = $(sSlide).attr('data-action-two');
    var dataTwoValue = $(sSlide).attr('data-action-two-value');

    var dataTwoDisplay = document.getElementById('slide'+dataTwo);

    if(displays[dataTwo].displayElement == 'combobox'){
      dataTwoDisplay.getElementsByTagName('selected')[0].
        getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = dataTwo + ' ' +dataTwoValue;
    }    

    if(displays[dataTwo].displayElement == 'slider'){
      if(dataTwo.includes('FontWeight')){
        if(dataTwoValue == 'normal'){
          $(dataTwoDisplay).val('0');
        }
        if(dataTwoValue == 'bold'){
          $(dataTwoDisplay).val('1');
        }
      }else{
        $(dataTwoDisplay).val(dataTwoValue);
      }
    }

    if(displays[dataTwo].displayElement == 'colordisplay'){
      var colordisplay = document.getElementById(dataTwo).style.backgroundColor = dataTwoValue;
    }

  }

  if($(sSlide).attr('data-action-three')){
    var dataThree = $(sSlide).attr('data-action-three');
    var dataThreeValue = $(sSlide).attr('data-action-three-value');

    var dataThreeDisplay = document.getElementById('slide'+dataThree);

    if(displays[dataThree].displayElement == 'combobox'){
      dataThreeDisplay.getElementsByTagName('selected')[0].
        getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = dataThree + ' ' +dataThreeValue;
    }    

    if(displays[dataThree].displayElement == 'slider'){
      if(dataThree.includes('FontWeight')){
        if(dataThreeValue == 'normal'){
          $(dataThreeDisplay).val('0');
        }
        if(dataThreeValue == 'bold'){
          $(dataThreeDisplay).val('1');
        }
      }else{
        $(dataThreeDisplay).val(dataThreeValue);
      }
    }

    if(displays[dataThree].displayElement == 'colordisplay'){
      var colordisplay = document.getElementById(dataThree).style.backgroundColor = dataThreeValue;
    }


  }

  if($(sSlide).attr('data-action-four')){
    var dataFour = $(sSlide).attr('data-action-four');
    var dataFourValue = $(sSlide).attr('data-action-four-value');

    var dataFourDisplay = document.getElementById('slide'+dataFour);

    if(displays[dataFour].displayElement == 'combobox'){
      dataFourDisplay.getElementsByTagName('selected')[0].
        getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = dataFour + ' ' +dataFourValue;
    }    

    if(displays[dataFour].displayElement == 'slider'){
      if(dataFour.includes('FontWeight')){
        if(dataFourValue == 'normal'){
          $(dataFourDisplay).val('0');
        }
        if(dataFourValue == 'bold'){
          $(dataFourDisplay).val('1');
        }
      }else{
        $(dataFourDisplay).val(dataFourValue);
      }
    }

    if(displays[dataFour].displayElement == 'colordisplay'){
      var colordisplay = document.getElementById(dataFour).style.backgroundColor = dataFourValue;
    }


  }

}

function applyanimation(a,element){
    var animation = document.getElementById('a'+a);
    animation.addEventListener('click',function(){
        $('#preview'+element).css('animation-name',a);
        $('animationPreview').css('border','');
        $('#noa').css('border','0px');
        this.style.border = '1px solid green';
    });
}

function readymadeanimations(element){

var animationsstyle = document.createElement('style');

var readymadeanimations_div = document.createElement('div');
readymadeanimations_div.setAttribute('id','rmadiv');
readymadeanimations_div.style.opacity = '0.3';
readymadeanimations_div.style.pointerEvents = 'none';

var readymadeanimations_div_banner = document.createElement('banner');
readymadeanimations_div_banner_text = document.createElement('h5');
readymadeanimations_div_banner_text.innerText = 'Ready Made Animations';
readymadeanimations_div_banner.appendChild(readymadeanimations_div_banner_text);
readymadeanimations_div.appendChild(readymadeanimations_div_banner);

var animationcontainer = document.createElement('div');
animationcontainer.setAttribute('id','rmadiv_acontainer');

readymadeanimations_div.appendChild(animationcontainer);

$('#animate').append(readymadeanimations_div);

var noanimation = document.createElement('animationPreview');
noanimation.setAttribute('id','noa');
noanimation.style.backgroundSize = 'contain';
noanimation.style.backgroundImage = 'url(none.png)';
noanimation.style.backgroundRepeat = 'no-repeat';
noanimation.style.border = '0px';
noanimation.addEventListener('click',function(){

    var previewelement = document.getElementById('preview'+element);
        
        previewelement.style.animationDelay = '';
        previewelement.style.animationTimingFunction = '';
        previewelement.style.animationIterationCount = '';
        previewelement.style.animationName = '';
        previewelement.style.animationDuration = '';

        $('animationPreview').css('border','');
        noanimation.style.border = '1px solid green';
});
animationcontainer.append(noanimation);

if(plan !== 'Free'){
 if(plan == 'Gold' || plan == 'Diamond'){

  for(var i = 1; i < animations.length; i++){
        animationsstyle.innerText += '\n' + animations[i].css + '\n';
        var animation = document.createElement('animationPreview');
        animation.setAttribute('id','a'+animations[i].name);

        var previewbutton = document.createElement('button');
        previewbutton.setAttribute('id','previewbutton');
        previewbutton.setAttribute('class','apelement');
        
        if(element == 'input'){
            previewbutton.innerText = document.getElementById('previewbox').getElementsByTagName(element)[0].value;
        }else{

            if(element == 'paragraph'){
                previewbutton.innerText = document.getElementById('previewbox').getElementsByTagName('p')[0].innerText;
            }

            if(element == 'image' || element == 'video'){
                previewbutton.innerText = element;
            }

            if(element == 'heading'){
                previewbutton.innerText = document.getElementById('previewbox').getElementsByTagName('h3')[0].innerText;
            }

        }


        previewbutton.style.fontSize = '8px';
        previewbutton.style.width = '50px';
        previewbutton.style.height = '20px';
        previewbutton.style.position = 'relative';
        previewbutton.style.transform = 'translate(0)';
        previewbutton.style.left = '25px';
        previewbutton.style.top = '40px';
        previewbutton.style.marginTop = '0px';

        previewbutton.style.animationName = animations[i].name;
        previewbutton.style.animationDuration = Math.floor((Math.random() * 3) + 1);
        
        if(animations[i].name.includes('FADE')){
            previewbutton.style.animationDuration = '3s';
        }

        if(animations[i].name.includes('BOUNCE')){
            previewbutton.style.animationDuration = '1s';
        }

        if(animations[i].name.includes('FLIP')){
            previewbutton.style.animationDuration = '2s';
        }

        if(animations[i].name.includes('ROTATE')){
            previewbutton.style.animationDuration = '3s';
        }

        if(animations[i].name.includes('SLIDE')){
            previewbutton.style.animationDuration = '3s';
        }

        if(animations[i].name.includes('ZOOM')){
            previewbutton.style.animationDuration = '2s';
        }

        if(animations[i].name.includes('ROLL')){
            previewbutton.style.animationDuration = '2s';
        }

        previewbutton.style.animationDelay = Math.floor((Math.random() * 8) + 3) + 's';
        previewbutton.style.animationTimingFunction = 'linear';
        previewbutton.style.animationIterationCount = 'Infinite';

        animation.appendChild(previewbutton);

        /*if(i == 8 || i == 12 || i == 18 || i == 28 || i == 31){
            //animation.style.border = '1px solid #0066ff';

            var newlabel = document.createElement('span');
            newlabel.setAttribute('class','alabel_new');
            newlabel.innerText = 'New';
            animation.append(newlabel);

            animation.classList.add('newanimation');
        }*/

        animationcontainer.append(animation);
        applyanimation(animations[i].name,element);
  }
  readymadeanimations_div_banner_text.innerText = animations.length + ' Ready Made Animations';
  readymadeanimations_div.style.opacity = '1';
  readymadeanimations_div.style.pointerEvents = 'unset';
 }
}

document.getElementsByTagName('body')[0].appendChild(animationsstyle);

}

function setupSlideOptions(element){

  //-------Percentage--------

     var percentage = document.createElement('combobox');
     percentage.setAttribute('id','slidePercentage');
     percentage.style.left = '30px';
     percentage.style.top = '350px';
     percentage.style.opacity = '0.5';
     percentage.style.pointerEvents = 'none';

     var percentage_tooltip = document.createElement('span');
     percentage_tooltip.setAttribute('class','tooltip');
     percentage_tooltip.innerText = 'Percentage is when the slide is executed during the animation. Percentage can be from 0% to 100%. The animation starts from 0% and ends at 100%.';

     var percentage_customedit = document.createElement('input');
     percentage_customedit.classList.add('custom');

     var percentage_selected = document.createElement('selected');
     var percentage_selected_a = document.createElement('a');
     percentage_selected_a.style.width = '200px';
     var percentage_selected_a_span = document.createElement('span');
     percentage_selected_a_span.innerText = 'Percentage';

     percentage_selected_a.appendChild(percentage_selected_a_span);
     percentage_selected.appendChild(percentage_selected_a);
     percentage_selected.appendChild(percentage_customedit);
     percentage_selected.appendChild(percentage_tooltip);
     
     percentage.appendChild(percentage_selected);

     //-----------------Event Handlers--------------------

     percentage_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(percentage_customedit.style.display == 'block'){
        
        percentage_customedit.style.display = 'none';
        percentage_selected_a_span.style.textAlign = '';

    }else{
        
        percentage_customedit.style.display = 'block';
        percentage_selected_a_span.style.textAlign = 'left';

    }

    }else{

    }

    });

    percentage_customedit.addEventListener('keyup',function(){
    percentage_selected_a_span.innerText = 'Percentage: ' + this.value+'%';
    updateelement(element,'slidePercentage',this.value+'%');
     
    });

    //-------End Percentage--------

    //-------Opacity--------

     var opacity = document.createElement('combobox');
     opacity.setAttribute('id','slideOpacity');
     opacity.style.left = '30px';
     opacity.style.top = '420px';
     opacity.style.opacity = '0.5';
     opacity.style.zIndex = '1';
     opacity.style.pointerEvents = 'none';

     var opacity_customedit = document.createElement('input');
     opacity_customedit.classList.add('custom');

     var opacity_selected = document.createElement('selected');
     var opacity_selected_a = document.createElement('a');
     opacity_selected_a.style.width = '200px';
     var opacity_selected_a_span = document.createElement('span');
     opacity_selected_a_span.innerText = 'Opacity';

     opacity_selected_a.appendChild(opacity_selected_a_span);
     opacity_selected.appendChild(opacity_selected_a);
     opacity_selected.appendChild(opacity_customedit);
     
     opacity.appendChild(opacity_selected);

     //-----------------Event Handlers--------------------

     opacity_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(opacity_customedit.style.display == 'block'){
        
        opacity_customedit.style.display = 'none';
        opacity_selected_a_span.style.textAlign = '';

    }else{
        
        opacity_customedit.style.display = 'block';
        opacity_selected_a_span.style.textAlign = 'left';

    }

    }else{

    }

    });

    opacity_customedit.addEventListener('keyup',function(){
    opacity_selected_a_span.innerText = 'Opacity: ' + this.value;
    dataAttributeBalancer('slideOpacity',this.value);
     
    });

    //-------End Opacity--------

    //----------Scale-----------

    var scaleboxdiv_x = document.createElement('div');
    var scaleboxdiv_x_p = document.createElement('p');
    scaleboxdiv_x_p.innerText = 'Scale X-axis';
    scaleboxdiv_x.appendChild(scaleboxdiv_x_p);
    scaleboxdiv_x.setAttribute('class','animationSliderDiv');

    var scaleboxdiv_y = document.createElement('div');
    var scaleboxdiv_y_p = document.createElement('p');
    scaleboxdiv_y_p.innerText = 'Scale Y-axis';
    scaleboxdiv_y.appendChild(scaleboxdiv_y_p);
    scaleboxdiv_y.setAttribute('class','animationSliderDiv');

    scale_slider_y = document.createElement('input');
    scale_slider_y.setAttribute('type','range');
    scale_slider_y.setAttribute('class','slider');
    scale_slider_y.setAttribute('min','1');
    scale_slider_y.setAttribute('max','10');
    scale_slider_y.setAttribute('step','0.1');
    scale_slider_y.setAttribute('value','1');
    scale_slider_y.setAttribute('id','slideScaleY');
    scaleboxdiv_y.appendChild(scale_slider_y);

    scale_slider_x = document.createElement('input');
    scale_slider_x.setAttribute('type','range');
    scale_slider_x.setAttribute('class','slider');
    scale_slider_x.setAttribute('min','1');
    scale_slider_x.setAttribute('max','10');
    scale_slider_x.setAttribute('step','0.1');
    scale_slider_x.setAttribute('value','1');
    scale_slider_x.setAttribute('id','slideScaleX');
    scaleboxdiv_x.appendChild(scale_slider_x);

    scale_slider_x.addEventListener('input',function(){
      dataAttributeBalancer('slideScaleX',this.value);
    });

    scale_slider_y.addEventListener('input',function(){
      dataAttributeBalancer('slideScaleY',this.value);
    });

    //--------End Scale---------

    //----------Rotate-----------

    var rotateboxdiv_x = document.createElement('div');
    var rotateboxdiv_x_p = document.createElement('p');
    rotateboxdiv_x_p.innerText = 'Rotate';
    rotateboxdiv_x.appendChild(rotateboxdiv_x_p);
    rotateboxdiv_x.setAttribute('class','animationSliderDiv');

    rotate_slider_x = document.createElement('input');
    rotate_slider_x.setAttribute('type','range');
    rotate_slider_x.setAttribute('class','slider');
    rotate_slider_x.setAttribute('min','1');
    rotate_slider_x.setAttribute('max','360');
    rotate_slider_x.setAttribute('step','1');
    rotate_slider_x.setAttribute('value','1');
    rotate_slider_x.setAttribute('id','slideRotate');
    rotateboxdiv_x.appendChild(rotate_slider_x);

    rotate_slider_x.addEventListener('input',function(){
      dataAttributeBalancer('slideRotate',this.value);
    });

    //--------End Rotate---------

    //----------Skew-----------

    var skewboxdiv_x = document.createElement('div');
    var skewboxdiv_x_p = document.createElement('p');
    skewboxdiv_x_p.innerText = 'Skew X-axis';
    skewboxdiv_x.appendChild(skewboxdiv_x_p);
    skewboxdiv_x.setAttribute('class','animationSliderDiv');

    var skewboxdiv_y = document.createElement('div');
    var skewboxdiv_y_p = document.createElement('p');
    skewboxdiv_y_p.innerText = 'Skew Y-axis';
    skewboxdiv_y.appendChild(skewboxdiv_y_p);
    skewboxdiv_y.setAttribute('class','animationSliderDiv');

    skew_slider_y = document.createElement('input');
    skew_slider_y.setAttribute('type','range');
    skew_slider_y.setAttribute('class','slider');
    skew_slider_y.setAttribute('min','1');
    skew_slider_y.setAttribute('max','10');
    skew_slider_y.setAttribute('step','0.1');
    skew_slider_y.setAttribute('value','1');
    skew_slider_y.setAttribute('id','slideSkewY');
    skewboxdiv_y.appendChild(skew_slider_y);

    skew_slider_x = document.createElement('input');
    skew_slider_x.setAttribute('type','range');
    skew_slider_x.setAttribute('class','slider');
    skew_slider_x.setAttribute('min','1');
    skew_slider_x.setAttribute('max','10');
    skew_slider_x.setAttribute('step','0.1');
    skew_slider_x.setAttribute('value','1');
    skew_slider_x.setAttribute('id','slideSkewX');
    skewboxdiv_x.appendChild(skew_slider_x);

    skew_slider_x.addEventListener('input',function(){
      dataAttributeBalancer('slideSkewX',this.value);
    });

    skew_slider_y.addEventListener('input',function(){
      dataAttributeBalancer('slideSkewY',this.value);
    });

    //--------End Skew---------

    //----------Font-----------

    var fontsizeboxdiv = document.createElement('div');
    var fontsizeboxdiv_p = document.createElement('p');
    fontsizeboxdiv_p.innerText = 'Font Size';
    fontsizeboxdiv.appendChild(fontsizeboxdiv_p);
    fontsizeboxdiv.setAttribute('class','animationSliderDiv');

    fontsize_slider = document.createElement('input');
    fontsize_slider.setAttribute('type','range');
    fontsize_slider.setAttribute('class','slider');
    fontsize_slider.setAttribute('min','1');
    fontsize_slider.setAttribute('max','100');
    fontsize_slider.setAttribute('step','1');
    fontsize_slider.setAttribute('value','1');
    fontsize_slider.setAttribute('id','slideFontSize');
    fontsizeboxdiv.appendChild(fontsize_slider);

    var fontweightboxdiv = document.createElement('div');
    var fontweightboxdiv_p = document.createElement('p');
    fontweightboxdiv_p.innerText = 'Font Weight';
    fontweightboxdiv.appendChild(fontweightboxdiv_p);
    fontweightboxdiv.setAttribute('class','animationSliderDiv');

    fontweight_slider = document.createElement('input');
    fontweight_slider.setAttribute('type','range');
    fontweight_slider.setAttribute('class','slider');
    fontweight_slider.setAttribute('min','0');
    fontweight_slider.setAttribute('max','1');
    fontweight_slider.setAttribute('step','1');
    fontweight_slider.setAttribute('value','0');
    fontweight_slider.setAttribute('id','slideFontWeight');
    fontweightboxdiv.appendChild(fontweight_slider);

    fontsize_slider.addEventListener('input',function(){
      dataAttributeBalancer('slideFontSize',this.value);
    });

    fontweight_slider.addEventListener('input',function(){
      var v = '';
      if(this.value == '0'){
        v = 'normal';
      }
      if(this.value == '1'){
        v = 'bold';
      }
      dataAttributeBalancer('slideFontWeight',v);
    });

    //---------End Font----------

    //----------Border-----------

    var bordersizeboxdiv = document.createElement('div');
    var bordersizeboxdiv_p = document.createElement('p');
    bordersizeboxdiv_p.innerText = 'Border Size';
    bordersizeboxdiv.appendChild(bordersizeboxdiv_p);
    bordersizeboxdiv.setAttribute('class','animationSliderDiv');

    bordersize_slider = document.createElement('input');
    bordersize_slider.setAttribute('type','range');
    bordersize_slider.setAttribute('class','slider');
    bordersize_slider.setAttribute('min','1');
    bordersize_slider.setAttribute('max','100');
    bordersize_slider.setAttribute('step','1');
    bordersize_slider.setAttribute('value','1');
    bordersize_slider.setAttribute('id','slideBorderSize');
    bordersizeboxdiv.appendChild(bordersize_slider);

    var borderradiusboxdiv = document.createElement('div');
    var borderradiusboxdiv_p = document.createElement('p');
    borderradiusboxdiv_p.innerText = 'Border Radius';
    borderradiusboxdiv.appendChild(borderradiusboxdiv_p);
    borderradiusboxdiv.setAttribute('class','animationSliderDiv');

    borderradius_slider = document.createElement('input');
    borderradius_slider.setAttribute('type','range');
    borderradius_slider.setAttribute('class','slider');
    borderradius_slider.setAttribute('min','1');
    borderradius_slider.setAttribute('max','100');
    borderradius_slider.setAttribute('step','1');
    borderradius_slider.setAttribute('value','1');
    borderradius_slider.setAttribute('id','slideBorderRadius');
    borderradiusboxdiv.appendChild(borderradius_slider);

    bordersize_slider.addEventListener('input',function(){
      dataAttributeBalancer('slideBorderSize',this.value);
    });

    borderradius_slider.addEventListener('input',function(){
      dataAttributeBalancer('slideBorderRadius',this.value);
    });

    //---------End Border----------

//------FontColor-------

var fontcolor = document.createElement('combobox');
fontcolor.setAttribute('id','fontcolor');
fontcolor.style.left = '10px';

var fontcolor_selected = document.createElement('selected');
var fontcolor_selected_a = document.createElement('a');
var fontcolor_selected_a_span = document.createElement('span');
fontcolor_selected_a_span.innerText = 'Font Color';

var fontcolor_colordisplay = document.createElement('colordisplay');
fontcolor_colordisplay.setAttribute('id','animatefcd');
fontcolor_colordisplay.style.display = 'none';
fontcolor_colordisplay.addEventListener('click',function(){
  
  var colorpicker = document.getElementById('animatefcp');

  if(colorpicker.style.display == 'block'){

    colorpicker.style.display = 'none';

  }else{

    colorpicker.style.display = 'block';

  }
  
});

var fontcolor_colorpicker = document.createElement('div');
fontcolor_colorpicker.setAttribute('class','colorpicker');
fontcolor_colorpicker.setAttribute('id','animatefcp');

var fontcolor_colorpicker_box = document.createElement('canvas');
fontcolor_colorpicker_box.setAttribute('class','colorpickerbox');
fontcolor_colorpicker_box.setAttribute('id','animatefcpb');

var fontcolor_colorpicker_strip = document.createElement('canvas');
fontcolor_colorpicker_strip.setAttribute('class','colorpickerstrip');
fontcolor_colorpicker_strip.setAttribute('id','animatefcps');

var fontcolor_colorpicker_input_rgba = document.createElement('input');
fontcolor_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
fontcolor_colorpicker_input_rgba.setAttribute('id','animatefcprgba');
fontcolor_colorpicker_input_rgba.addEventListener('input',function(){
    textToColorPickerColor(this,'animation-color',element);
});

var fontcolor_colorpicker_input_hex = document.createElement('input');
fontcolor_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
fontcolor_colorpicker_input_hex.setAttribute('id','animatefcphex');
fontcolor_colorpicker_input_hex.addEventListener('input',function(){
    textToColorPickerColor(this,'animation-color',element);
});

fontcolor_colorpicker.appendChild(fontcolor_colorpicker_box);
fontcolor_colorpicker.appendChild(fontcolor_colorpicker_strip);
fontcolor_colorpicker.appendChild(fontcolor_colorpicker_input_rgba);
fontcolor_colorpicker.appendChild(fontcolor_colorpicker_input_hex);

fontcolor_selected_a.appendChild(fontcolor_selected_a_span);
fontcolor_selected.appendChild(fontcolor_selected_a);
fontcolor_selected.appendChild(fontcolor_colordisplay);
fontcolor_selected.appendChild(fontcolor_colorpicker);

fontcolor.appendChild(fontcolor_selected);

//-----------------Event Handlers--------------------

fontcolor_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(fontcolor_colordisplay.style.display == 'block'){
        
        fontcolor_colordisplay.style.display = 'none';
        fontcolor.style.textAlign = '';

    }else{
        
        fontcolor_colordisplay.style.display = 'block';
        fontcolor.style.textAlign = 'left';

    }

    }else{

    }

});

//-----End FontColor------

//------BorderColor-------

var bordercolor = document.createElement('combobox');
bordercolor.setAttribute('id','bordercolor');
bordercolor.style.left = '200px';

var bordercolor_selected = document.createElement('selected');
var bordercolor_selected_a = document.createElement('a');
var bordercolor_selected_a_span = document.createElement('span');
bordercolor_selected_a_span.innerText = 'Border Color';
bordercolor_selected_a_span.style.fontSize = '12px';

var bordercolor_colordisplay = document.createElement('colordisplay');
bordercolor_colordisplay.setAttribute('id','animatebcd');
bordercolor_colordisplay.style.display = 'none';
bordercolor_colordisplay.addEventListener('click',function(){
  
  var colorpicker = document.getElementById('animatebcp');

  if(colorpicker.style.display == 'block'){

    colorpicker.style.display = 'none';

  }else{

    colorpicker.style.display = 'block';

  }
  
});

var bordercolor_colorpicker = document.createElement('div');
bordercolor_colorpicker.setAttribute('class','colorpicker');
bordercolor_colorpicker.setAttribute('id','animatebcp');

var bordercolor_colorpicker_box = document.createElement('canvas');
bordercolor_colorpicker_box.setAttribute('class','colorpickerbox');
bordercolor_colorpicker_box.setAttribute('id','animatebcpb');

var bordercolor_colorpicker_strip = document.createElement('canvas');
bordercolor_colorpicker_strip.setAttribute('class','colorpickerstrip');
bordercolor_colorpicker_strip.setAttribute('id','animatebcps');

var bordercolor_colorpicker_input_rgba = document.createElement('input');
bordercolor_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
bordercolor_colorpicker_input_rgba.setAttribute('id','animatebcprgba');
bordercolor_colorpicker_input_rgba.addEventListener('input',function(){
    textToColorPickerColor(this,'animation-borderColor',element);
});

var bordercolor_colorpicker_input_hex = document.createElement('input');
bordercolor_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
bordercolor_colorpicker_input_hex.setAttribute('id','animatebcphex');
bordercolor_colorpicker_input_hex.addEventListener('input',function(){
    textToColorPickerColor(this,'animation-borderColor',element);
});

bordercolor_colorpicker.appendChild(bordercolor_colorpicker_box);
bordercolor_colorpicker.appendChild(bordercolor_colorpicker_strip);
bordercolor_colorpicker.appendChild(bordercolor_colorpicker_input_rgba);
bordercolor_colorpicker.appendChild(bordercolor_colorpicker_input_hex);

bordercolor_selected_a.appendChild(bordercolor_selected_a_span);
bordercolor_selected.appendChild(bordercolor_selected_a);
bordercolor_selected.appendChild(bordercolor_colordisplay);
bordercolor_selected.appendChild(bordercolor_colorpicker);

bordercolor.appendChild(bordercolor_selected);

//-----------------Event Handlers--------------------

bordercolor_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(bordercolor_colordisplay.style.display == 'block'){
        
        bordercolor_colordisplay.style.display = 'none';
        bordercolor.style.textAlign = '';

    }else{
        
        bordercolor_colordisplay.style.display = 'block';
        bordercolor.style.textAlign = 'left';

    }

    }else{

    }

});

//-----End BorderColor------

//------BackgroundColor-------

var backgroundcolor = document.createElement('combobox');
backgroundcolor.setAttribute('id','backgroundcolor');
backgroundcolor.style.left = '390px';

var backgroundcolor_selected = document.createElement('selected');
var backgroundcolor_selected_a = document.createElement('a');
var backgroundcolor_selected_a_span = document.createElement('span');
backgroundcolor_selected_a_span.innerText = 'Background Color';
backgroundcolor_selected_a_span.style.fontSize = '12px';

var backgroundcolor_colordisplay = document.createElement('colordisplay');
backgroundcolor_colordisplay.setAttribute('id','animatebgcd');
backgroundcolor_colordisplay.style.display = 'none';
backgroundcolor_colordisplay.addEventListener('click',function(){
  
  var colorpicker = document.getElementById('animatebgcp');

  if(colorpicker.style.display == 'block'){

    colorpicker.style.display = 'none';

  }else{

    colorpicker.style.display = 'block';

  }
  
});

var backgroundcolor_colorpicker = document.createElement('div');
backgroundcolor_colorpicker.setAttribute('class','colorpicker');
backgroundcolor_colorpicker.setAttribute('id','animatebgcp');

var backgroundcolor_colorpicker_box = document.createElement('canvas');
backgroundcolor_colorpicker_box.setAttribute('class','colorpickerbox');
backgroundcolor_colorpicker_box.setAttribute('id','animatebgcpb');

var backgroundcolor_colorpicker_strip = document.createElement('canvas');
backgroundcolor_colorpicker_strip.setAttribute('class','colorpickerstrip');
backgroundcolor_colorpicker_strip.setAttribute('id','animatebgcps');

var backgroundcolor_colorpicker_input_rgba = document.createElement('input');
backgroundcolor_colorpicker_input_rgba.setAttribute('placeholder','Color Rgba: ');
backgroundcolor_colorpicker_input_rgba.setAttribute('id','animatebgcprgba');
backgroundcolor_colorpicker_input_rgba.addEventListener('input',function(){
    textToColorPickerColor(this,'animation-backgroundColor',element);
});

var backgroundcolor_colorpicker_input_hex = document.createElement('input');
backgroundcolor_colorpicker_input_hex.setAttribute('placeholder','Color Hex: ');
backgroundcolor_colorpicker_input_hex.setAttribute('id','animatebgcphex');
backgroundcolor_colorpicker_input_hex.addEventListener('input',function(){
    textToColorPickerColor(this,'animation-backgroundColor',element);
});

backgroundcolor_colorpicker.appendChild(backgroundcolor_colorpicker_box);
backgroundcolor_colorpicker.appendChild(backgroundcolor_colorpicker_strip);
backgroundcolor_colorpicker.appendChild(backgroundcolor_colorpicker_input_rgba);
backgroundcolor_colorpicker.appendChild(backgroundcolor_colorpicker_input_hex);

backgroundcolor_selected_a.appendChild(backgroundcolor_selected_a_span);
backgroundcolor_selected.appendChild(backgroundcolor_selected_a);
backgroundcolor_selected.appendChild(backgroundcolor_colordisplay);
backgroundcolor_selected.appendChild(backgroundcolor_colorpicker);

backgroundcolor.appendChild(backgroundcolor_selected);

//-----------------Event Handlers--------------------

backgroundcolor_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(backgroundcolor_colordisplay.style.display == 'block'){
        
        backgroundcolor_colordisplay.style.display = 'none';
        backgroundcolor.style.textAlign = '';

    }else{
        
        backgroundcolor_colordisplay.style.display = 'block';
        backgroundcolor.style.textAlign = 'left';

    }

    }else{

    }

});

//-----End BackgroundColor------

    var animationSliders = document.createElement('div');
    animationSliders.setAttribute('id','animationSliderBox');
    animationSliders.style.opacity = '0.5';
    animationSliders.style.pointerEvents = 'none';

    animationSliders.appendChild(scaleboxdiv_x);
    animationSliders.appendChild(scaleboxdiv_y);
    animationSliders.appendChild(rotateboxdiv_x);
    animationSliders.appendChild(skewboxdiv_x);
    animationSliders.appendChild(skewboxdiv_y);
    animationSliders.appendChild(fontsizeboxdiv);
    animationSliders.appendChild(fontweightboxdiv);
    animationSliders.appendChild(bordersizeboxdiv);
    animationSliders.appendChild(borderradiusboxdiv);
    animationSliders.appendChild(fontcolor);
    animationSliders.appendChild(backgroundcolor);
    animationSliders.appendChild(bordercolor);

    $(percentage).insertBefore("#aT");
    $(opacity).insertBefore("#aT");
    $(animationSliders).insertBefore("#aT");

    setupColorPicker('animatefcpb','animatefcps','preview'+element,'font','animatefcd','animatefcprgba','animatefcphex');
    setupColorPicker('animatebgcpb','animatebgcps','preview'+element,'background','animatebgcd','animatebgcprgba','animatebgcphex');
    setupColorPicker('animatebcpb','animatebcps','preview'+element,'border','animatebcd','animatebcprgba','animatebcphex');
}

function animate(element,createnew){

    if(createnew == 'false'){

    document.getElementsByClassName('spinner')[0].style.display = 'block';
    var panel = document.getElementById('panel');
    panel.style.opacity = '0.3';
    panel.style.pointerEvents = 'none';

    var info = document.createElement('p');
    info.setAttribute('class','info');
    info.innerText = 'Animations might appear irresponsive in the preview box due to different positioning.'

    var backbutton = document.createElement('button');
    backbutton.setAttribute('class','barbutton');
    backbutton.innerText = 'Go Back';
    backbutton.style.marginLeft = '10px';
    backbutton.addEventListener('click',function(){

        var spinner = document.getElementsByClassName('spinner')[0];
        spinner.style.display = 'block';

        var panel = document.getElementById('panel');
        panel.style.opacity = '0.3';
        panel.style.pointerEvents = 'none';

        var animatediv = document.getElementById('animate');
        
        setTimeout(function(){
            
            spinner.style.display = 'none';
            panel.style.opacity = '1';
            panel.style.pointerEvents = 'unset';
            animatediv.style.display = 'none';
            backbutton.remove();
            $('.info').remove();

        },4000);

    });

    setTimeout(function(){

      $('#buttons').append(backbutton);
      $('#previewbox').append(info);
      document.getElementsByClassName('spinner')[0].style.display = 'none';
      document.getElementById('animate').style.display = 'block';
      panel.style.opacity = '1';
      panel.style.pointerEvents = 'unset';

    },4000);

    }

    if(createnew == 'true'){

    var info = document.createElement('p');
    info.setAttribute('class','info');
    info.innerText = 'Animations might appear irresponsive in the preview box due to different positioning.'

    var animatediv = document.createElement('div');
    animatediv.setAttribute('id','animate');

    var backbutton = document.createElement('button');
    backbutton.setAttribute('class','barbutton');
    backbutton.innerText = 'Go Back';
    backbutton.style.marginLeft = '10px';
    backbutton.addEventListener('click',function(){

        var spinner = document.getElementsByClassName('spinner')[0];
        spinner.style.display = 'block';

        var panel = document.getElementById('panel');
        panel.style.opacity = '0.3';
        panel.style.pointerEvents = 'none';

        var animatediv = document.getElementById('animate');
        
        setTimeout(function(){
            
            spinner.style.display = 'none';
            panel.style.opacity = '1';
            panel.style.pointerEvents = 'unset';
            animatediv.style.display = 'none';
            backbutton.remove();
            $('.info').remove();

        },4000);

    });

    //---------------- Settings ----------------------

    var settings_div = document.createElement('div');
    settings_div.setAttribute('id','settingsdiv');

    settings_div.style.zIndex = '3';

    var settings_div_banner = document.createElement('banner');
    settings_div_banner_text = document.createElement('h5');
    settings_div_banner_text.innerText = 'Settings';
    settings_div_banner.appendChild(settings_div_banner_text);
    settings_div.appendChild(settings_div_banner);

    //-------Duration--------

     var duration = document.createElement('combobox');
     duration.setAttribute('id','duration');
     duration.style.transform = 'translate(-50%)';
     duration.style.left = '50%';
     duration.style.marginTop = '70px';

     var duration_customedit = document.createElement('input');
     duration_customedit.classList.add('custom');

     var duration_selected = document.createElement('selected');
     var duration_selected_a = document.createElement('a');
     duration_selected_a.style.width = '200px';
     var duration_selected_a_span = document.createElement('span');
     duration_selected_a_span.innerText = 'Duration';

     duration_selected_a.appendChild(duration_selected_a_span);
     duration_selected.appendChild(duration_selected_a);
     duration_selected.appendChild(duration_customedit);
     
     duration.appendChild(duration_selected);

     //-----------------Event Handlers--------------------

     duration_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(duration_customedit.style.display == 'block'){
        
        duration_customedit.style.display = 'none';
        duration_selected_a_span.style.textAlign = '';

    }else{
        
        duration_customedit.style.display = 'block';
        duration_selected_a_span.style.textAlign = 'left';

    }

    }else{

    }

    });

    duration_customedit.addEventListener('keyup',function(){
    duration_selected_a_span.innerText = 'Duration: ' + this.value+'s';
    updateelement(element,'animatedr',this.value+'s');
     
    });

    //-------End Duration-------- 

    //-------Delay--------

     var delay = document.createElement('combobox');
     delay.setAttribute('id','delay');
     delay.style.transform = 'translate(-50%)';
     delay.style.left = '50%';
     delay.style.marginTop = '130px';

     var delay_customedit = document.createElement('input');
     delay_customedit.classList.add('custom');

     var delay_selected = document.createElement('selected');
     var delay_selected_a = document.createElement('a');
     delay_selected_a.style.width = '200px';
     var delay_selected_a_span = document.createElement('span');
     delay_selected_a_span.innerText = 'Delay';

     delay_selected_a.appendChild(delay_selected_a_span);
     delay_selected.appendChild(delay_selected_a);
     delay_selected.appendChild(delay_customedit);
     
     delay.appendChild(delay_selected);

     //-----------------Event Handlers--------------------

     delay_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(delay_customedit.style.display == 'block'){
        
        delay_customedit.style.display = 'none';
        delay_selected_a_span.style.textAlign = '';

    }else{
        
        delay_customedit.style.display = 'block';
        delay_selected_a_span.style.textAlign = 'left';

    }

    }else{

    }

    });

    delay_customedit.addEventListener('keyup',function(){
    delay_selected_a_span.innerText = 'Delay: ' + this.value+'s';
    updateelement(element,'animated',this.value+'s');
     
    });

    //-------End Delay--------

    //-------Iteration--------

     var iteration = document.createElement('combobox');
     iteration.setAttribute('id','iteration');
     iteration.style.transform = 'translate(-50%)';
     iteration.style.left = '50%';
     iteration.style.marginTop = '190px';

     var iteration_customedit = document.createElement('input');
     iteration_customedit.classList.add('custom');

     var iteration_selected = document.createElement('selected');
     var iteration_selected_a = document.createElement('a');
     iteration_selected_a.style.width = '200px';
     var iteration_selected_a_span = document.createElement('span');
     iteration_selected_a_span.innerText = 'Iteration';

     iteration_selected_a.appendChild(iteration_selected_a_span);
     iteration_selected.appendChild(iteration_selected_a);
     iteration_selected.appendChild(iteration_customedit);
     
     iteration.appendChild(iteration_selected);

     //-----------------Event Handlers--------------------

     iteration_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(iteration_customedit.style.display == 'block'){
        
        iteration_customedit.style.display = 'none';
        iteration_selected_a_span.style.textAlign = '';

    }else{
        
        iteration_customedit.style.display = 'block';
        iteration_selected_a_span.style.textAlign = 'left';

    }

    }else{

    }

    });

    iteration_customedit.setAttribute('placeholder','9999 = Infinite');
    iteration_customedit.addEventListener('keyup',function(){
    iteration_selected_a_span.innerText = 'Iteration: ' + this.value;
    updateelement(element,'animatei',this.value);
     
    });

    //-------End Iteration--------

    //-------Timing--------

     var timing = document.createElement('combobox');
     timing.setAttribute('id','timing');
     timing.style.transform = 'translate(-50%)';
     timing.style.left = '50%';
     timing.style.marginTop = '250px';

     var timing_selected = document.createElement('selected');
     var timing_selected_a = document.createElement('a');
     timing_selected_a.style.width = '200px';
     var timing_selected_a_span = document.createElement('span');
     timing_selected_a_span.innerText = 'Timing';

     timing_selected_a.appendChild(timing_selected_a_span);
     timing_selected.appendChild(timing_selected_a);
     
     timing.appendChild(timing_selected);

     var timing_options = document.createElement('options');
     var timing_options_ul = document.createElement('ul');

     //------------------Timing Options--------------------
     //-------------------------1----------------------------

     var timing_options_1 = document.createElement('li');

     var timing_options_1_a = document.createElement('a');
     timing_options_1_a.innerText = 'Linear';

     var timing_options_1_a_span = document.createElement('span');
     timing_options_1_a_span.innerText = 'Linear';
     timing_options_1_a_span.setAttribute('class','value');

     timing_options_1_a.appendChild(timing_options_1_a_span);
     timing_options_1.appendChild(timing_options_1_a);

     timing_options_1.addEventListener('click',function(){
         tb(element,'animatet',timing_options_1_a.innerText);
     });

     //-------------------------2----------------------------

     var timing_options_2 = document.createElement('li');

     var timing_options_2_a = document.createElement('a');
     timing_options_2_a.innerText = 'Ease';

     var timing_options_2_a_span = document.createElement('span');
     timing_options_2_a_span.innerText = 'Ease';
     timing_options_2_a_span.setAttribute('class','value');

     timing_options_2_a.appendChild(timing_options_2_a_span);
     timing_options_2.appendChild(timing_options_2_a);

     timing_options_2.addEventListener('click',function(){
         tb(element,'animatet',timing_options_2_a.innerText);
     });

     //-------------------------3----------------------------

     var timing_options_3 = document.createElement('li');

     var timing_options_3_a = document.createElement('a');
     timing_options_3_a.innerText = 'Ease-In';

     var timing_options_3_a_span = document.createElement('span');
     timing_options_3_a_span.innerText = 'Ease-In';
     timing_options_3_a_span.setAttribute('class','value');

     timing_options_3_a.appendChild(timing_options_3_a_span);
     timing_options_3.appendChild(timing_options_3_a);

     timing_options_3.addEventListener('click',function(){
         tb(element,'animatet',timing_options_3_a.innerText);
     });

     //-------------------------4----------------------------

     var timing_options_4 = document.createElement('li');

     var timing_options_4_a = document.createElement('a');
     timing_options_4_a.innerText = 'Ease-Out';

     var timing_options_4_a_span = document.createElement('span');
     timing_options_4_a_span.innerText = 'Ease-Out';
     timing_options_4_a_span.setAttribute('class','value');

     timing_options_4_a.appendChild(timing_options_4_a_span);
     timing_options_4.appendChild(timing_options_4_a);

     timing_options_4.addEventListener('click',function(){
         tb(element,'animatet',timing_options_4_a.innerText);
     });

     //-------------------------5----------------------------

     var timing_options_5 = document.createElement('li');

     var timing_options_5_a = document.createElement('a');
     timing_options_5_a.innerText = 'Ease-In-Out';
     timing_options_5_a.classList.add('lastoption');

     var timing_options_5_a_span = document.createElement('span');
     timing_options_5_a_span.innerText = 'Ease-In-Out';
     timing_options_5_a_span.setAttribute('class','value');

     timing_options_5_a.appendChild(timing_options_5_a_span);
     timing_options_5.appendChild(timing_options_5_a);

     timing_options_5.addEventListener('click',function(){
         tb(element,'animatet',timing_options_5_a.innerText);
     });

     //----------------End Timing Options------------------

    timing_options_ul.appendChild(timing_options_1);
    timing_options_ul.appendChild(timing_options_2);
    timing_options_ul.appendChild(timing_options_3);
    timing_options_ul.appendChild(timing_options_4);
    timing_options_ul.appendChild(timing_options_5);

    timing_options.appendChild(timing_options_ul);
    timing.appendChild(timing_options);

    //-----------------Event Handlers--------------------

    timing_selected_a_span.addEventListener('click',function(e){

    if(e.target == this){

    if(timing_options.style.display == 'block'){
        
        timing_options.style.display = 'none';
        timing_options_ul.style.display = 'none';

    }else{
        
        timing_options.style.display = 'block';
        timing_options_ul.style.display = 'block';

    }

    }else{

    }

    });

    //-------End Timing--------

    duration_customedit.style.width = '40%';
    delay_customedit.style.width = '40%';
    iteration_customedit.style.width = '40%';

    settings_div.appendChild(duration);
    settings_div.appendChild(delay);
    settings_div.appendChild(iteration);
    settings_div.appendChild(timing);

    //-------------------------------------------------

    animatediv.appendChild(settings_div);

    //----------------Fade in timming------------------

    document.getElementsByClassName('spinner')[0].style.display = 'block';
    var panel = document.getElementById('panel');
    panel.style.opacity = '0.3';
    panel.style.pointerEvents = 'none';

    setTimeout(function(){

      $('#buttons').append(backbutton);
      $('#panel').append(animatediv);
      $('#previewbox').append(info);
      document.getElementsByClassName('spinner')[0].style.display = 'none';
      panel.style.opacity = '1';
      panel.style.pointerEvents = 'unset';
      readymadeanimations(element);
      setupanimator(element);

    },4000);

  }

}