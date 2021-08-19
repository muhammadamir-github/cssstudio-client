class FontAwesomeIcons{
  constructor(){}

  show(e,elementToAffect,forElement,iconPreview){

  	var appendIcon = 0;
  	var isIconElement = 0;

    if($('.fontAwesomeSelector')[0]){
      $('.fontAwesomeSelector').remove();
    }else{
      var selectorDiv = document.createElement('div');
      selectorDiv.className = 'fontAwesomeSelector';
      //selectorDiv.style.top = /*e.target.getBoundingClientRect().top*/ e.clientY - document.getElementsByClassName('elementEditor')[0].getBoundingClientRect().top + window.scrollY + 'px';
      //selectorDiv.style.left = /*e.target.getBoundingClientRect().left*/ e.clientX - document.getElementsByClassName('elementEditor')[0].getBoundingClientRect().left + 10 + 'px';
      //selectorDiv.style.transform = 'translate(-'+e.target.getBoundingClientRect().left + 25 + 'px)';

      var heading = document.createElement('p');
      heading.innerText = 'Pick an Icon';
      heading.className = 'heading';

      var searchBox = document.createElement("input");
      searchBox.type = "text";
      searchBox.setAttribute("placeholder","Search Icons...");
      searchBox.setAttribute("maxlength",20);

      searchBox.addEventListener("keypress",function(e){
      	if(e.keyCode == 13){
    		fontAwesomeSelector.searchIcons(this.value);
    	}
      });

      var close = document.createElement('i');
      close.className = 'fas fa-times close';
      close.addEventListener('click',function(){
        $('.fontAwesomeSelector').remove();
      });

      selectorDiv.appendChild(close);
      selectorDiv.appendChild(heading);
      selectorDiv.appendChild(searchBox);
      body.appendChild(selectorDiv);

      var target;

      if(document.getElementsByClassName('selected')[0].tagName == 'I'){
        target = document.getElementsByClassName('selected')[0];
        isIconElement = 1;
      }else{
      	if(elementToAffect !== null){
      		if(elementToAffect.tagName == 'A' && forElement == "navbar"){
      			appendIcon = 1;
      		}else{
      			if(elementToAffect.tagName == 'SPAN' && forElement == "dropdown-list"){
      				appendIcon = 1;
      				publicEvents.dropdownlist_position_icons(document.getElementsByClassName("selected")[0].getElementsByClassName("options")[0].getElementsByTagName("ul")[0],"left");
      			}else{
      				if(elementToAffect.tagName == "i" && forElement == "textbox"){
      					target = elementToAffect;
                        isIconElement = 1;
                        appendIcon = 0;
      				}else{
      					if(elementToAffect[0].tagName == "i" && forElement == "ratings"){
      						target = elementToAffect;
      						isIconElement = 1;
      						appendIcon = 0;
      					}
      				}
      			}
      		}

      		target = elementToAffect;
      	}else{
      		target = e.target;
      	}
      }

      for(var i=0; i < fontawesome_solid.length; i++){
        var div = document.createElement('div');
        var icon = document.createElement('i');
        icon.className = 'fas fa-'+fontawesome_solid[i];

        (function(e,div,icon,target,appendIcon){
          div.addEventListener('click',function(){
          	if(appendIcon == 1){
          		if(target.getElementsByTagName('i')[0]){
          			target.getElementsByTagName('i')[0].className = icon.className;
          			if(isIconElement == 0){ iconPreview.className = icon.className; }
          		}else{
          		    var iToAppend = document.createElement('i');
          		    iToAppend.className = icon.className;

          		    $(target).prepend(iToAppend);
          		    if(isIconElement == 0){ iconPreview.className = icon.className; }
          		}
          	}else{
          		if(appendIcon == 0){
          			if(target.length == 0){
          				target.className = icon.className;
          			    if(isIconElement == 0){ iconPreview.className = icon.className; }
          			}else{
          				if(target.length > 0){
          					for(var y=0; y<target.length; y++){
          						target[y].className = icon.className;
          						if(isIconElement == 0){ iconPreview.className = icon.className; }
          					}
          				}
          			}
          		}
          	}
            $('.fontAwesomeSelector').remove();
          });
        })(e,div,icon,target,appendIcon);

        div.appendChild(icon);
        selectorDiv.appendChild(div);
      }

      for(var o=0; o < fontawesome_brands.length; o++){
        var div = document.createElement('div');
        var icon = document.createElement('i');
        icon.className = 'fab fa-'+fontawesome_brands[o];

        (function(e,div,icon,target,appendIcon){
          div.addEventListener('click',function(){
          	if(appendIcon == 1){
          		if(target.getElementsByTagName('i')[0]){
          			target.getElementsByTagName('i')[0].className = icon.className;
          			if(isIconElement == 0){ iconPreview.className = icon.className; }
          		}else{
          		    var iToAppend = document.createElement('i');
          		    iToAppend.className = icon.className;

          		    $(target).prepend(iToAppend);
          		    if(isIconElement == 0){ iconPreview.className = icon.className; }
          		}
          	}else{
          		if(appendIcon == 0){
          			if(target.length == 0){
          				target.className = icon.className;
          			    if(isIconElement == 0){ iconPreview.className = icon.className; }
          			}else{
          				if(target.length > 0){
          					for(var y=0; y<target.length; y++){
          						target[y].className = icon.className;
          						if(isIconElement == 0){ iconPreview.className = icon.className; }
          					}
          				}
          			}
          		}
          	}
            $('.fontAwesomeSelector').remove();
          });
        })(e,div,icon,target,appendIcon);

        div.appendChild(icon);
        selectorDiv.appendChild(div);
      }

      for(var k=0; k < fontawesome_regular.length; k++){
        var div = document.createElement('div');
        var icon = document.createElement('i');
        icon.className = 'far fa-'+fontawesome_regular[k];

        (function(e,div,icon,target,appendIcon){
          div.addEventListener('click',function(){
          	if(appendIcon == 1){
          		if(target.getElementsByTagName('i')[0]){
          			target.getElementsByTagName('i')[0].className = icon.className;
          			if(isIconElement == 0){ iconPreview.className = icon.className; }
          		}else{
          		    var iToAppend = document.createElement('i');
          		    iToAppend.className = icon.className;

          		    $(target).prepend(iToAppend);
          		    if(isIconElement == 0){ iconPreview.className = icon.className; }
          		}
          	}else{
          		if(appendIcon == 0){
          			if(target.length == 0){
          				target.className = icon.className;
          			    if(isIconElement == 0){ iconPreview.className = icon.className; }
          			}else{
          				if(target.length > 0){
          					for(var y=0; y<target.length; y++){
          						target[y].className = icon.className;
          						if(isIconElement == 0){ iconPreview.className = icon.className; }
          					}
          				}
          			}
          		}
          	}
            $('.fontAwesomeSelector').remove();
          });
        })(e,div,icon,target,appendIcon);

        div.appendChild(icon);
        selectorDiv.appendChild(div);
      }

    }

  }

  searchIcons(value){
  	var matched = [];
  	var allIconsDivs = document.getElementsByClassName("fontAwesomeSelector")[0].getElementsByTagName("div");

  	for(var i=0; i<allIconsDivs.length; i++){
  		var iconClass = allIconsDivs[i].getElementsByTagName("i")[0].className;
  		if(iconClass.includes(value)){
  			allIconsDivs[i].style.display = "inline-block";
  		}else{
  			allIconsDivs[i].style.display = "none";
  		}
  	}

  	/*for(var i=0; i<fontawesome_solid.length; i++){
  		if(fontawesome_solid[i].includes(value)){
  			matched.push(fontawesome_solid[i]);
  		}
  	}

  	for(var i=0; i<fontawesome_regular.length; i++){
  		if(fontawesome_regular[i].includes(value)){
  			matched.push(fontawesome_regular[i]);
  		}
  	}*/

  }

}
