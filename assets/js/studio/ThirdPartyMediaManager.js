class ThirdPartyMediaManager{
	constructor(){}

	searchGIFS(q,element,mode){
		const self = this;
		var token = localStorage.getItem('auth');

		$.ajax({
			url:"http://localhost:8000/api/giphy/"+q,
			type:"GET",
			beforeSend: function(request){
				request.setRequestHeader('Authorization','Bearer '+token);
			},
			success: function(response){
				self.loadGIFS(JSON.parse(response).data,element,mode);
			}
		});
	}

	searchUnsplashPictures(q,element,mode){
		const self = this;
		var token = localStorage.getItem('auth');

		$.ajax({
			url:"http://localhost:8000/api/unsplash/"+q,
			type:"GET",
			beforeSend: function(request){
				request.setRequestHeader('Authorization','Bearer '+token);
			},
			success: function(response){
				self.loadUnsplashPictures(JSON.parse(response).results,element,mode);
			}
		});
	}

	searchPixelBayPictures(q,element,mode){
		const self = this;
		var token = localStorage.getItem('auth');

		$.ajax({
			url:"http://localhost:8000/api/pixabay/"+q,
			type:"GET",
			beforeSend: function(request){
				request.setRequestHeader('Authorization','Bearer '+token);
			},
			success: function(response){
				self.loadPixelBayPictures(JSON.parse(response).hits,element,mode);
			}
		});
	}

	searchYoutubeVideos(q){
		const self = this;
		var token = localStorage.getItem('auth');

		$.ajax({
			url:"http://localhost:8000/api/youtube/videos/"+q,
			type:"GET",
			beforeSend: function(request){
				request.setRequestHeader('Authorization','Bearer '+token);
			},
			success: function(response){
				self.loadYoutubeVideos(JSON.parse(response));
			}
		})
	}

	loadMetaDataForYoutubeVideo(videoId,element){
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

	loadGIFS(data,element,mode){
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

	loadUnsplashPictures(data,element,mode){
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

	loadPixelBayPictures(data,element,mode){
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

	resetImages(mode){
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

	loadYoutubeVideos(response){
		const self = this;
		self.resetVideos();
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
					Globals.pageHandler.VideoManager.showVideoInfo(e,image);
				});

				image.addEventListener('mouseout',function(){
					Globals.pageHandler.VideoManager.hideVideoInfo(image);
				});
			})(image);

			image.id = Globals.pageHandler.randomize.elementId(5);

			image.addEventListener('click',Globals.pageHandler.VideoManager.changeVideo);

			div.appendChild(image);
			//div.appendChild(span);

			document.getElementById("videoManager-videos-box").appendChild(div);

			self.loadMetaDataForYoutubeVideo(response.items[i].id.videoId,image);
		}
	}

	resetVideos(){
		if(document.getElementById("videoManager-videos-box").getElementsByTagName('button')[0]){
			document.getElementById("videoManager-videos-box").getElementsByTagName('button')[0].remove();
		}

		var imgs = document.getElementById("videoManager-videos-box").getElementsByTagName("div");

		for(var i = imgs.length - 1; i >= 0; i--){
			imgs[i].remove();
		}
	}
}
