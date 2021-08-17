function searchGIFS(q,element,mode){
var token = localStorage.getItem('auth');

$.ajax({
	url:"http://localhost:8000/api/giphy/"+q,
	type:"GET",
	beforeSend: function(request){
      request.setRequestHeader('Authorization','Bearer '+token);
    },
	success: function(response){
		loadGIFS(JSON.parse(response).data,element,mode);
	}
});

}

function searchUnsplashPictures(q,element,mode){
var token = localStorage.getItem('auth');

$.ajax({
	url:"http://localhost:8000/api/unsplash/"+q,
	type:"GET",
	beforeSend: function(request){
      request.setRequestHeader('Authorization','Bearer '+token);
    },
	success: function(response){
		loadUnsplashPictures(JSON.parse(response).results,element,mode);
	}
});

}

function searchPixelBayPictures(q,element,mode){
var token = localStorage.getItem('auth');

$.ajax({
	url:"http://localhost:8000/api/pixabay/"+q,
	type:"GET",
	beforeSend: function(request){
      request.setRequestHeader('Authorization','Bearer '+token);
    },
	success: function(response){
		loadPixelBayPictures(JSON.parse(response).hits,element,mode);
	}
});

}

function searchYoutubeVideos(q){
var token = localStorage.getItem('auth');

$.ajax({
	url:"http://localhost:8000/api/youtube/videos/"+q,
	type:"GET",
	beforeSend: function(request){
      request.setRequestHeader('Authorization','Bearer '+token);
    },
	success: function(response){
		loadYoutubeVideos(JSON.parse(response));
	}
})

}

function loadMetaDataForYoutubeVideo(videoId,element){
var token = localStorage.getItem('auth');

$.ajax({
	url:"http://localhost:8000/api/youtube/video/"+videoId,
	type:"GET",
	beforeSend: function(request){
      request.setRequestHeader('Authorization','Bearer '+token);
    },
	success: function(response){
		element.setAttribute("data-likes",JSON.parse(response).items[0].statistics.likeCount);
        element.setAttribute("data-views",JSON.parse(response).items[0].statistics.viewCount);
	}
});

}


function loadGIFS(data,element,mode){

for(var i = 0; i < data.length; i++){

var gif = document.createElement('img');
gif.src = data[i].images.original.url;
gif.setAttribute("data-title",data[i].title);
gif.setAttribute("alt","");

if(mode == 'elementCreator'){
	gif.addEventListener('click',function(){
	  document.getElementById("preview"+element).style.background = "url("+this.src+")"
	  document.getElementById("preview"+element).style.backgroundRepeat = "no-repeat";
	  document.getElementById("preview"+element).style.backgroundPosition = "center";
	  document.getElementById("preview"+element).style.backgroundSize = "cover";
    });

    document.getElementsByTagName("giphy")[0].appendChild(gif);
}

if(mode == 'webpageBuilder'){

	var div = document.createElement('div');

	var span = document.createElement('span');
    span.innerText = 'Giphy.com';

    div.appendChild(gif);
    div.appendChild(span);

	if(document.getElementsByClassName('selected')[0].tagName == 'img' || document.getElementsByClassName('selected')[0].tagName == 'IMG' || document.getElementsByClassName('selElForImgPik')[0]){

		if(document.getElementsByClassName('selElForImgPik')[0]){
			(function(div,gif){
			  div.addEventListener('click',function(){
		        document.getElementsByClassName('selElForImgPik')[0].src = gif.src;
		        if(document.getElementsByClassName('selElForImgPik_invoker')[0]){
          			document.getElementsByClassName('selElForImgPik_invoker')[0].setAttribute('src',gif.src);
          		}
		      });
		    })(div,gif);
		}else{
		    (function(div,gif){
			  div.addEventListener('click',function(){
		        document.getElementsByClassName('selected')[0].src = gif.src;
		      });
		    })(div,gif);
		}

	}else{

		if(document.getElementsByClassName('selected')[0].tagName == 'DIV' && $(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video-overlay'){
			(function(div,gif){
			    div.addEventListener('click',function(){
	              document.getElementById(document.getElementsByClassName("selected")[0].id+'videoPlayer').setAttribute('poster',gif.src);
                });
		    })(div,gif);
		}else{

			if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video'){
				(function(div,gif){
			    div.addEventListener('click',function(){
	                  document.getElementsByClassName("selected")[0].setAttribute('poster',gif.src);
                    });
		        })(div,gif);
			}else{
				(function(div,gif){
			    div.addEventListener('click',function(){
	                  document.getElementsByClassName("selected")[0].style.background = "url("+gif.src+")"
	                  document.getElementsByClassName("selected")[0].style.backgroundRepeat = "no-repeat";
	                  document.getElementsByClassName("selected")[0].style.backgroundPosition = "center";
	                  document.getElementsByClassName("selected")[0].style.backgroundSize = "cover";
                    });
		        })(div,gif);
			}

		}

	}

    document.getElementById("bg-image-manager-images-box").appendChild(div);
}

}

if(mode == 'elementCreator'){

var newimgs = document.getElementsByTagName("giphy")[0].getElementsByTagName("img"); 
for(var i2=0; i2 < newimgs.length; i2++){ 
		if(i2 == 0 || i2 == 1)
		{ 
			newimgs[i2].style.marginTop = "100px"; 
        } 
};

}

}

function loadUnsplashPictures(data,element,mode){

for(var i = 0; i < data.length; i++){

var image = document.createElement('img');
image.src = data[i].urls.full;
image.setAttribute("data-title",data[i].description);
image.setAttribute("alt","");

if(mode == 'elementCreator'){
	image.addEventListener('click',function(){
	  document.getElementById("preview"+element).style.background = "url("+this.src+")"
	  document.getElementById("preview"+element).style.backgroundRepeat = "no-repeat";
	  document.getElementById("preview"+element).style.backgroundPosition = "center";
	  document.getElementById("preview"+element).style.backgroundSize = "cover";
    });

    document.getElementsByTagName("giphy")[0].appendChild(image);
}

if(mode == 'webpageBuilder'){

	var div = document.createElement('div');

	var span = document.createElement('span');
    span.innerText = 'Unsplash.com';

    div.appendChild(image);
    div.appendChild(span);

	if(document.getElementsByClassName('selected')[0].tagName == 'img' || document.getElementsByClassName('selected')[0].tagName == 'IMG' || document.getElementsByClassName('selElForImgPik')[0]){

		if(document.getElementsByClassName('selElForImgPik')[0]){
			(function(div,image){
			  div.addEventListener('click',function(){
		        document.getElementsByClassName('selElForImgPik')[0].src = image.src;
		        if(document.getElementsByClassName('selElForImgPik_invoker')[0]){
          			document.getElementsByClassName('selElForImgPik_invoker')[0].setAttribute('src',image.src);
          		}
		      });
		    })(div,image);
		}else{
		    (function(div,image){
			  div.addEventListener('click',function(){
		        document.getElementsByClassName('selected')[0].src = image.src;
		      });
		    })(div,image);
		}

	}else{

		if(document.getElementsByClassName('selected')[0].tagName == 'DIV' && $(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video-overlay'){
			(function(div,image){
			    div.addEventListener('click',function(){
	              document.getElementById(document.getElementsByClassName("selected")[0].id+'videoPlayer').setAttribute('poster',image.src);
                });
		    })(div,image);
		}else{

			if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video'){
				(function(div,image){
			    div.addEventListener('click',function(){
	                  document.getElementsByClassName("selected")[0].setAttribute('poster',image.src);
                    });
		        })(div,image);
			}else{
				(function(div,image){
			    div.addEventListener('click',function(){
	                  document.getElementsByClassName("selected")[0].style.background = "url("+image.src+")"
	                  document.getElementsByClassName("selected")[0].style.backgroundRepeat = "no-repeat";
	                  document.getElementsByClassName("selected")[0].style.backgroundPosition = "center";
	                  document.getElementsByClassName("selected")[0].style.backgroundSize = "cover";
                    });
		        })(div,image);
			}

		}

	}

    document.getElementById("bg-image-manager-images-box").appendChild(div);
}

}

}

function loadPixelBayPictures(data,element,mode){

for(var i = 0; i < data.length; i++){

var image = document.createElement('img');
image.src = data[i].largeImageURL;
image.setAttribute("data-title",data[i].tags);
image.setAttribute("alt","");

if(mode == 'elementCreator'){
	image.addEventListener('click',function(){
	  document.getElementById("preview"+element).style.background = "url("+this.src+")"
	  document.getElementById("preview"+element).style.backgroundRepeat = "no-repeat";
	  document.getElementById("preview"+element).style.backgroundPosition = "center";
	  document.getElementById("preview"+element).style.backgroundSize = "cover";
    });

    document.getElementsByTagName("giphy")[0].appendChild(image);
}

if(mode == 'webpageBuilder'){

	var div = document.createElement('div');

	var span = document.createElement('span');
    span.innerText = 'Pixabay.com';

    div.appendChild(image);
    div.appendChild(span);

	if(document.getElementsByClassName('selected')[0].tagName == 'img' || document.getElementsByClassName('selected')[0].tagName == 'IMG' || document.getElementsByClassName('selElForImgPik')[0]){

		if(document.getElementsByClassName('selElForImgPik')[0]){
			(function(div,image){
			  div.addEventListener('click',function(){
		        document.getElementsByClassName('selElForImgPik')[0].src = image.src;
		        if(document.getElementsByClassName('selElForImgPik_invoker')[0]){
          			document.getElementsByClassName('selElForImgPik_invoker')[0].setAttribute('src',image.src);
          		}
		      });
		    })(div,image);
		}else{
		    (function(div,image){
			  div.addEventListener('click',function(){
		        document.getElementsByClassName('selected')[0].src = image.src;
		      });
		    })(div,image);
		}

	}else{

		if(document.getElementsByClassName('selected')[0].tagName == 'DIV' && $(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video-overlay'){
			(function(div,image){
			    div.addEventListener('click',function(){
	              document.getElementById(document.getElementsByClassName("selected")[0].id+'videoPlayer').setAttribute('poster',image.src);
                });
		    })(div,image);
		}else{

			if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video'){
				(function(div,image){
			    div.addEventListener('click',function(){
	                  document.getElementsByClassName("selected")[0].setAttribute('poster',image.src);
                    });
		        })(div,image);
			}else{
				(function(div,image){
			    div.addEventListener('click',function(){
	                  document.getElementsByClassName("selected")[0].style.background = "url("+image.src+")"
	                  document.getElementsByClassName("selected")[0].style.backgroundRepeat = "no-repeat";
	                  document.getElementsByClassName("selected")[0].style.backgroundPosition = "center";
	                  document.getElementsByClassName("selected")[0].style.backgroundSize = "cover";
                    });
		        })(div,image);
			}

		}

	}

    document.getElementById("bg-image-manager-images-box").appendChild(div);
}

}

}

function resetImages(mode){

if(mode == 'elementCreator'){
	var imgs = document.getElementsByTagName("giphy")[0].getElementsByTagName("img"); 
}

if(mode == 'webpageBuilder'){
	if(document.getElementById("bg-image-manager-images-box").getElementsByTagName('button')[0]){
		document.getElementById("bg-image-manager-images-box").getElementsByTagName('button')[0].remove();
	}
	var imgs = document.getElementById("bg-image-manager-images-box").getElementsByTagName("div"); 
}

for(var i = imgs.length - 1; i >= 0; i--){
    imgs[i].remove();
}

}

//----------------------------------------------------------------------

function loadYoutubeVideos(response){

resetVideos();

for(var i=0; i < response.items.length; i++){

var div = document.createElement('div');

var span = document.createElement('span');
span.innerText = 'Youtube.com';

var image = document.createElement('img');
image.src = response.items[i].snippet.thumbnails.high.url;
image.setAttribute("data-title",response.items[i].snippet.title);
image.setAttribute("data-video-id",response.items[i].id.videoId);
image.setAttribute("data-video-thumbnail",response.items[i].snippet.thumbnails.high.url);
image.setAttribute("alt","");


(function(image){
	image.addEventListener('mouseover',function(e){
	    VideoManager.showVideoInfo(e,image);
    });

    image.addEventListener('mouseout',function(){
	    VideoManager.hideVideoInfo(image);
    });
})(image);

image.id = randomize.elementId(5);

image.addEventListener('click',VideoManager.changeVideo);

div.appendChild(image);
//div.appendChild(span);

document.getElementById("videoManager-videos-box").appendChild(div);

loadMetaDataForYoutubeVideo(response.items[i].id.videoId,image);

}

}

function resetVideos(){

if(document.getElementById("videoManager-videos-box").getElementsByTagName('button')[0]){
		document.getElementById("videoManager-videos-box").getElementsByTagName('button')[0].remove();
}

var imgs = document.getElementById("videoManager-videos-box").getElementsByTagName("div");

for(var i = imgs.length - 1; i >= 0; i--){
    imgs[i].remove();
}

}

/*function searchDailymotionVideos(q){

$.ajax({
	url:"https://api.dailymotion.com/videos?limit=5&fields=channel.name,description,password_protected,thumbnail_1080_url,title,url,views_total,&flags=no_live,no_premium&password_protected=0&private=0&unpublished=0&search="+q,
	type:"GET",
	beforeSend: function(request){
      //request.setRequestHeader('Authorization','Bearer '+token);
    },//9ad9c4f785f5bf4274d1
	success: function(response){
		console.log(response);
		loadDailymotionVideos(response);
	}
})

}

function loadDailymotionVideos(response){

for(var i=0; i < response.list.length; i++){

var div = document.createElement('div');

var span = document.createElement('span');
span.innerText = 'Dailymotion.com';

var image = document.createElement('img');
image.src = response.list[i].thumbnail_1080_url;
image.setAttribute("data-title",response.list[i].title);
image.setAttribute("data-views",response.list[i].views_total);
image.setAttribute("alt","");

image.addEventListener('mouseover',VideoManager.showVideoInfo);
image.addEventListener('mouseout',VideoManager.hideVideoInfo);
image.id = randomize.elementId(5);

div.appendChild(image);
div.appendChild(span);

document.getElementById("videoManager-videos-box").appendChild(div);

}

}*/