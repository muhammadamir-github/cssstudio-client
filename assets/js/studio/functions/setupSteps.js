function function_setupSteps(element){
    var stepsdiv = document.createElement('div');
    stepsdiv.setAttribute('id','stepsdiv');
    stepsdiv.style.display = 'block';

    stepsdiv_button_advance = document.createElement('button');
    stepsdiv_button_advance.innerText = 'Advance';
    stepsdiv_button_advance.addEventListener('click',function(){
      if($('#advance').length > 0){
            advance(element,'false');
        }else{
            advance(element,'true');
        }
    });

    if(plan !== 'Free'){

    if(plan == 'Gold' || plan == 'Diamond' || plan == 'Silver'){

      stepsdiv_button_animate = document.createElement('button');
      stepsdiv_button_animate.innerText = 'Animate';
      stepsdiv_button_animate.addEventListener('click',function(){
          if($('#animate').length > 0){
              exF_animate(element,'false');
          }else{
              exF_animate(element,'true');
          }
      });

    }

    }

    stepsdiv_button_finish = document.createElement('button');
    stepsdiv_button_finish.innerText = 'Finish';
    stepsdiv_button_finish.addEventListener('click',function(){
        finishWork(element);
    });

    stepsdiv.appendChild(stepsdiv_button_advance);

    if(plan !== 'Free'){
      if(plan == 'Gold' || plan == 'Diamond' || plan == 'Silver'){
        stepsdiv.appendChild(stepsdiv_button_animate);
      }
    }

    stepsdiv.appendChild(stepsdiv_button_finish);
    $('#panel').append(stepsdiv);
}
