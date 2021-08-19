class Duplicator{
  constructor(){}

  duplicate(){
    var element = document.getElementsByClassName('selected')[0];
    var etype = $(element).attr('data-e-type');
    var copy = element.cloneNode(true);

    var hcenterline = document.getElementsByClassName('hcenterline')[0];
    var vcenterline = document.getElementsByClassName('vcenterline')[0];

    copy.style.left = ((hcenterline.getBoundingClientRect().width / 2) - hcenterline.getBoundingClientRect().left) + 'px';
    copy.style.top = ((vcenterline.getBoundingClientRect().height / 2) - vcenterline.getBoundingClientRect().top) + 'px';
    copy.addEventListener('click',site.elementClicked);
    copy.addEventListener('contextmenu',site.elementClicked);

    if(etype == 'video-overlay'){
    	var random = randomize.elementId(25);

        copy.id = random;
        copy.getElementsByTagName('iframe')[0].id = random+'videoPlayer';
    }

    document.getElementsByClassName('previewsite')[0].appendChild(copy);

    site.selectElement(copy);
  }
}
