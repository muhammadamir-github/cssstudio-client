class ProgressLoader{
  constructor(){}

  show(){

    var loaderbg = document.createElement('div');
    loaderbg.className = 'loader_bg';

    var loader = document.createElement('div');
    loader.setAttribute('class','loader');

    Globals.window.body.appendChild(loaderbg);
    Globals.window.body.appendChild(loader);

    $('body').css({'pointer-events':'none'});
  }

  hide(){
    var loader = document.getElementsByClassName('loader')[0];
    var loaderbg = document.getElementsByClassName('loader_bg')[0];
    loaderbg.remove();
    loader.remove();

    $('body').css({'pointer-events':'unset'});
  }
}
