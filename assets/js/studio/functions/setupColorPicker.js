function function_setupColorPicker(boxid,stripid,forid,property,displayinvoker,rgbainput,hexinput){
    var applyto;

    if(forid == '.selected'){
      applyto = document.getElementsByClassName('selected')[0];
    }else{
      applyto = document.getElementById(forid);
    }
    var display = document.getElementById(displayinvoker);

    var box = document.getElementById(boxid);
    var box2d = box.getContext('2d');
    var boxwidth = box.width;
    var boxheight = box.height;

    var strip = document.getElementById(stripid);
    var strip2d = strip.getContext('2d');
    var stripwidth = strip.width;
    var stripheight = strip.height;

    var xaxis = 0;
    var yaxis = 0;
    var isdragging = false;
    var rgba = 'rgba(255,0,0,1)';

    box.addEventListener("mousedown", down, false);
    box.addEventListener("mouseup", up, false);
    strip.addEventListener("click", click, false);
    box.addEventListener("mousemove", move, false);

    box2d.rect(0, 0, boxwidth, boxheight);
    fillGradient();

    strip2d.rect(0, 0, stripwidth, stripheight);
    var gradientone = strip2d.createLinearGradient(0, 0, stripwidth, 0);
    gradientone.addColorStop(0, 'rgba(255, 0, 0, 1)');
    gradientone.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
    gradientone.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
    gradientone.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
    gradientone.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
    gradientone.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
    gradientone.addColorStop(1, 'rgba(255, 0, 0, 1)');
    strip2d.fillStyle = gradientone;
    strip2d.fill();

    function click(e) {
      xaxis = e.offsetX;
      yaxis = e.offsetY;
      var imagedata = strip2d.getImageData(xaxis, yaxis, 1, 1).data;
      rgba = 'rgba(' + imagedata[0] + ',' + imagedata[1] + ',' + imagedata[2] + ',1)';
      fillGradient();
    }

    function fillGradient() {
      box2d.fillStyle = rgba;
      box2d.fillRect(0, 0, boxwidth, boxheight);

      var gradientwhite = strip2d.createLinearGradient(0, 0, boxheight, 0);
      gradientwhite.addColorStop(0, 'rgba(255,255,255,1)');
      gradientwhite.addColorStop(1, 'rgba(255,255,255,0)');
      box2d.fillStyle = gradientwhite;
      box2d.fillRect(0, 0, boxwidth, boxheight);

      var gradientblack = strip2d.createLinearGradient(0, 0, 0, boxheight);
      gradientblack.addColorStop(0, 'rgba(0,0,0,0)');
      gradientblack.addColorStop(1, 'rgba(0,0,0,1)');
      box2d.fillStyle = gradientblack;
      box2d.fillRect(0, 0, boxwidth, boxheight);
    }

    function down(e) {
      isdragging = true;
      color(e);
    }

    function move(e) {
      if (isdragging) {
        color(e);
      }
    }

    function up(e) {
      isdragging = false;
    }

    function color(e) {
      xaxis = e.offsetX;
      yaxis = e.offsetY;
      var imagedata = box2d.getImageData(xaxis, yaxis, 1, 1).data;
      rgba = 'rgba(' + imagedata[0] + ',' + imagedata[1] + ',' + imagedata[2] + ',1)';
      var hexfromrgba = rgb2hex(rgba);
      //console.log(rgba+' => '+hexfromrgba);

      if(boxid.includes('animate') || stripid.includes('animate')){
        dataAttributeBalancer('slide'+displayinvoker,rgba);
      }else{

      if(property == 'background'){
        applyto.style.backgroundColor = rgba;
      }

      if(property == 'font'){
        applyto.style.color = rgba;
      }

      if(property == 'border'){
        if(applyto.style.borderColor != ''){
          applyto.style.bordercolor = '';
          applyto.style.borderColor = rgba;
        }else{
          if(applyto.style.borderBottomColor != ''){
             applyto.style.borderBottomColor = rgba;
            }else{
             applyto.style.bordercolor = '';
             applyto.style.borderColor = rgba;
            }
        }
      }

      if(property == 'textdecorationcolor'){
        applyto.style.textDecorationColor = rgba;
      }

      if(property == 'boxshadowcolor'){
        var currentboxshadow = applyto.style.boxShadow;

        if(currentboxshadow.includes('rgb')){
          var newboxshadow = applyto.style.boxShadow.split(')')[1];
            applyto.style.boxShadow = rgba + newboxshadow;
        }else{
          var newboxshadow = applyto.style.boxShadow;
            applyto.style.boxShadow = rgba + newboxshadow;
        }

      }

      if(property == 'textshadowcolor'){
        var currenttextshadow = applyto.style.textShadow;

        if(currenttextshadow.includes('rgb')){
          var newtextshadow = applyto.style.textShadow.split(')')[1];
            applyto.style.textShadow = rgba + newtextshadow;
        }else{
          var newtextshadow = applyto.style.textShadow;
            applyto.style.textShadow = rgba + newtextshadow;
        }
       }

      if(property == 'outlinecolor'){
         applyto.style.outlineColor = rgba;
       }

      }

       display.style.backgroundColor = rgba;
       document.getElementById(rgbainput).value = 'Color Rgba: ' + rgba;
       document.getElementById(hexinput).value = 'Color Hex: ' + rgb2hex(rgba);

    }

}
