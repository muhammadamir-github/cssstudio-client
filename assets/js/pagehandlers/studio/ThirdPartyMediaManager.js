// Responsible for fetching and loading third party media.

class ThirdPartyMediaManager{
	constructor(){}

	async searchGIFS(q,element,mode){
		const self = this;

		const response = await Globals.api.request({ route: `giphy/${q}`, method: "get" });
        if(response.success === true){
			self.loadGIFS(JSON.parse(response.data).data,element,mode);
        }
	}

	async searchUnsplashPictures(q,element,mode){
		const self = this;

		const response = await Globals.api.request({ route: `unsplash/${q}`, method: "get" });
        if(response.success === true){
			self.loadUnsplashPictures(JSON.parse(response.data).results,element,mode);
        }
	}

	async searchPixelBayPictures(q,element,mode){
		const self = this;

		const response = await Globals.api.request({ route: `pixabay/${q}`, method: "get" });
        if(response.success === true){
			self.loadPixelBayPictures(JSON.parse(response.data).hits,element,mode);
        }
	}

	async searchYoutubeVideos(q){
		const self = this;

		const response = await Globals.api.request({ route: `youtube/videos/${q}`, method: "get" });
        if(response.success === true){
			self.loadYoutubeVideos(JSON.parse(response.data));
        }
	}

	async loadMetaDataForYoutubeVideo(videoId,element){
		var token = localStorage.getItem('auth');

		const response = await Globals.api.request({ route: `youtube/video/${videoId}`, method: "get" });
        if(response.success === true){
			element.setAttribute("data-likes",JSON.parse(response.data).items[0].statistics.likeCount);
			element.setAttribute("data-views",JSON.parse(response.data).items[0].statistics.viewCount);
        }
	}

	loadGIFS(data,element,mode){
		let div = null;
		for(var i = 0; i < data.length; i++){
			let listeners = {};

			if(mode == 'webpageBuilder'){
				if(document.getElementsByClassName('selected')[0].tagName == 'img' || document.getElementsByClassName('selected')[0].tagName == 'IMG' || document.getElementsByClassName('selElForImgPik')[0]){
					if(document.getElementsByClassName('selElForImgPik')[0]){
						listeners = {
							click: function(){
								document.getElementsByClassName('selElForImgPik')[0].src = this.getElementsByTagName("img")[0].src;
								if(document.getElementsByClassName('selElForImgPik_invoker')[0]){
									document.getElementsByClassName('selElForImgPik_invoker')[0].setAttribute('src',this.getElementsByTagName("img")[0].src);
								}
							}
						};
					}else{
						listeners = {
							click: function(){
								document.getElementsByClassName('selected')[0].src = this.getElementsByTagName("img")[0].src;
							}
						};
					}
				}else{
					if(document.getElementsByClassName('selected')[0].tagName == 'DIV' && $(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video-overlay'){
						listeners = {
							click: function(){
								document.getElementById(document.getElementsByClassName("selected")[0].id+'videoPlayer').setAttribute('poster',this.getElementsByTagName("img")[0].src);
							}
						};
					}else{
						if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video'){
							listeners = {
								click: function(){
									document.getElementsByClassName("selected")[0].setAttribute('poster',this.getElementsByTagName("img")[0].src);
								}
							};
						}else{
							listeners = {
								click: function(){
									document.getElementsByClassName("selected")[0].style.background = "url("+this.getElementsByTagName("img")[0].src+")"
									document.getElementsByClassName("selected")[0].style.backgroundRepeat = "no-repeat";
									document.getElementsByClassName("selected")[0].style.backgroundPosition = "center";
									document.getElementsByClassName("selected")[0].style.backgroundSize = "cover";
								}
							};
						}
					}
				}

				div = Globals.elements.new({
					type: "div",
					parent: document.getElementById("bg-image-manager-images-box"),
					listeners,
					children: [
						{
							type: "span",
							text: "Giphy.com"
						}
					]
				});
			}

			var gif = Globals.elements.new({
				type: "img",
				parent: mode == "elementCreator" ? document.getElementsByTagName("giphy")[0] : div,
				attributes: {
					src: data[i].images.original.url,
					alt: "",
					"data-title": data[i].title
				},
				listeners: {
					click: mode == "elementCreator" ? function(){
						document.getElementById("preview"+element).style.background = "url("+this.src+")"
						document.getElementById("preview"+element).style.backgroundRepeat = "no-repeat";
						document.getElementById("preview"+element).style.backgroundPosition = "center";
						document.getElementById("preview"+element).style.backgroundSize = "cover";
					} : null,
				},
				prepend: mode == "elementCreator" ? false : true, // Before span to make span visible (css issue)
			});
		}

		if(mode == 'elementCreator'){
			var newimgs = document.getElementsByTagName("giphy")[0].getElementsByTagName("img");
			for(var i2=0; i2 < newimgs.length; i2++){
				if(i2 == 0 || i2 == 1){
					newimgs[i2].style.marginTop = "100px";
				}
			};
		}
	}

	loadUnsplashPictures(data,element,mode){
		for(var i=0; i<data.length; i++){
			let div = null;
			if(mode == 'webpageBuilder'){
				let listeners = {};

				if(document.getElementsByClassName('selected')[0].tagName == 'img' || document.getElementsByClassName('selected')[0].tagName == 'IMG' || document.getElementsByClassName('selElForImgPik')[0]){
					if(document.getElementsByClassName('selElForImgPik')[0]){
						listeners = {
							click: function(){
								document.getElementsByClassName('selElForImgPik')[0].src = this.getElementsByTagName("img")[0].src;
								if(document.getElementsByClassName('selElForImgPik_invoker')[0]){
									document.getElementsByClassName('selElForImgPik_invoker')[0].setAttribute('src',this.getElementsByTagName("img")[0].src);
								}
							}
						};
					}else{
						listeners = {
							click: function(){
								document.getElementsByClassName('selected')[0].src = this.getElementsByTagName("img")[0].src;
							}
						};
					}
				}else{
					if(document.getElementsByClassName('selected')[0].tagName == 'DIV' && $(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video-overlay'){
						listeners = {
							click: function(){
								document.getElementById(document.getElementsByClassName("selected")[0].id+'videoPlayer').setAttribute('poster',this.getElementsByTagName("img")[0].src);
							}
						};
					}else{
						if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video'){
							listeners = {
								click: function(){
									document.getElementsByClassName("selected")[0].setAttribute('poster',this.getElementsByTagName("img")[0].src);
								}
							};
						}else{
							listeners = {
								click: function(){
									document.getElementsByClassName("selected")[0].style.background = "url("+this.getElementsByTagName("img")[0].src+")"
									document.getElementsByClassName("selected")[0].style.backgroundRepeat = "no-repeat";
									document.getElementsByClassName("selected")[0].style.backgroundPosition = "center";
									document.getElementsByClassName("selected")[0].style.backgroundSize = "cover";
								}
							};
						}
					}
				}

				div = Globals.elements.new({
					type: "div",
					parent: document.getElementById("bg-image-manager-images-box"),
					listeners,
					children: [
						{
							type: "span",
							text: "Unsplash.com"
						}
					]
				});
			}

			var image = Globals.elements.new({
				type: "img",
				parent: mode == "elementCreator" ? document.getElementsByTagName("giphy")[0] : div,
				attributes: {
					src: data[i].urls.full,
					alt: "",
					"data-title": data[i].description
				},
				listeners: {
					click: mode == "elementCreator" ? function(){
						document.getElementById("preview"+element).style.background = "url("+this.src+")"
						document.getElementById("preview"+element).style.backgroundRepeat = "no-repeat";
						document.getElementById("preview"+element).style.backgroundPosition = "center";
						document.getElementById("preview"+element).style.backgroundSize = "cover";
					} : null,
				},
				prepend: mode == "elementCreator" ? false : true, // Before span to make span visible (css issue)
			});
		}
	}

	loadPixelBayPictures(data,element,mode){
		for(var i=0; i< data.length; i++){
			let div = null;
			if(mode == 'webpageBuilder'){
				let listeners = {};

				if(document.getElementsByClassName('selected')[0].tagName == 'img' || document.getElementsByClassName('selected')[0].tagName == 'IMG' || document.getElementsByClassName('selElForImgPik')[0]){
					if(document.getElementsByClassName('selElForImgPik')[0]){
						listeners = {
							click: function(){
								document.getElementsByClassName('selElForImgPik')[0].src = this.getElementsByTagName("img")[0].src;
								if(document.getElementsByClassName('selElForImgPik_invoker')[0]){
									document.getElementsByClassName('selElForImgPik_invoker')[0].setAttribute('src',this.getElementsByTagName("img")[0].src);
								}
							}
						};
					}else{
						listeners = {
							click: function(){
								document.getElementsByClassName('selected')[0].src = this.getElementsByTagName("img")[0].src;
							}
						};
					}
				}else{
					if(document.getElementsByClassName('selected')[0].tagName == 'DIV' && $(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video-overlay'){
						listeners = {
							click: function(){
								document.getElementById(document.getElementsByClassName("selected")[0].id+'videoPlayer').setAttribute('poster',this.getElementsByTagName("img")[0].src);
							}
						};
					}else{
						if($(document.getElementsByClassName('selected')[0]).attr('data-e-type') == 'video'){
							listeners = {
								click: function(){
									document.getElementsByClassName("selected")[0].setAttribute('poster',this.getElementsByTagName("img")[0].src);
								}
							};
						}else{
							listeners = {
								click: function(){
									document.getElementsByClassName("selected")[0].style.background = "url("+this.getElementsByTagName("img")[0].src+")"
									document.getElementsByClassName("selected")[0].style.backgroundRepeat = "no-repeat";
									document.getElementsByClassName("selected")[0].style.backgroundPosition = "center";
									document.getElementsByClassName("selected")[0].style.backgroundSize = "cover";
								}
							};
						}
					}
				}

				div = Globals.elements.new({
					type: "div",
					parent: document.getElementById("bg-image-manager-images-box"),
					listeners,
					children: [
						{
							type: "span",
							text: "Pixabay.com"
						}
					]
				});
			}

			var image = Globals.elements.new({
				type: "img",
				parent: mode == "elementCreator" ? document.getElementsByTagName("giphy")[0] : div,
				attributes: {
					src: data[i].largeImageURL,
					alt: "",
					"data-title": data[i].tags
				},
				listeners: {
					click: mode == "elementCreator" ? function(){
						document.getElementById("preview"+element).style.background = "url("+this.src+")"
						document.getElementById("preview"+element).style.backgroundRepeat = "no-repeat";
						document.getElementById("preview"+element).style.backgroundPosition = "center";
						document.getElementById("preview"+element).style.backgroundSize = "cover";
					} : null,
				},
				prepend: mode == "elementCreator" ? false : true, // Before span to make span visible (css issue)
			});
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
			var div = Globals.elements.new({
				type: "div",
				parent: document.getElementById("videoManager-videos-box"),
				children: [
					{
						type: "img",
						id:  Globals.pageHandler.randomize.elementId(5),
						attributes: {
							src: response.items[i].snippet.thumbnails.high.url,
							alt: "",
							"data-title": response.items[i].snippet.title,
							"data-video-id": response.items[i].id.videoId,
							"data-video-thumbnail": response.items[i].snippet.thumbnails.high.url,
						},
						listeners: {
							click: Globals.pageHandler.VideoManager.changeVideo,
							mouseover: function(e){
								Globals.pageHandler.VideoManager.showVideoInfo(e, this);
							},
							mouseout: function(e){
								Globals.pageHandler.VideoManager.hideVideoInfo(this);
							}
						}
					},
					{
						type: "span",
						text: "Youtube.com"
					},
				]
			});

			var image = div.getElementsByTagName("img")[0];
			self.loadMetaDataForYoutubeVideo(response.items[i].id.videoId, image);
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

	resetGiphy(){}
}
