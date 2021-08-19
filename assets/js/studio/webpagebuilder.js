class WebPageBuilder{
  constructor(){}

  start(){

    mediaManager.refreshMedia();

    sidebarElement.close();
    var previewsite = document.createElement('div');
    previewsite.setAttribute('class','previewsite');

    var leftguide = document.createElement('div');
    var centerguide = document.createElement('div');
    var rightguide = document.createElement('div');

    var vcenterline = document.createElement('div');
    var hcenterline = document.createElement('div');

    leftguide.className = 'lguide';
    centerguide.className = 'cguide';
    rightguide.className = 'rguide';

    vcenterline.className = 'vcenterline';
    hcenterline.className = 'hcenterline';

    previewsite.appendChild(leftguide);
    previewsite.appendChild(centerguide);
    previewsite.appendChild(rightguide);

    previewsite.appendChild(vcenterline);
    previewsite.appendChild(hcenterline);

    body.appendChild(previewsite);

    tools.load();

  }

}
