// Responsible for fetching and loading third party media.

class ThirdPartyMediaManager{
	constructor(){}

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
						id:  Globals.pageHandler.Globals.randomizer.id(5),
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
}
