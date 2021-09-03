class InternalGiphyPanelView{
    constructor(controller){
        this.controller = controller;
        this._element = null;
    }

    create(options = {}){
        const self = this;
        const { data, parent, prepend, before, component_id } = options;

        self._element = Globals.elements.new({
            type: "giphy",
            parent: parent,
            attributes: {
                "data-component-id": component_id,
            },
            children: [
                {
                    type: "i",
                    classes: [ "fas", "fa-times", "close" ],
                    listeners: {
                        click: function(){
                            let giphyPanel = document.getElementsByTagName("giphy")[0];
                            giphyPanel.style.opacity = 0;
                            setTimeout(function(){
                                giphyPanel.style.display = "none";
                            }, 750);

                            document.getElementById('panel').style.opacity = 1;
                            document.getElementById('panel').style.pointerEvents = "unset";
                        }
                    }
                },
                {
                    type: "p",
                    classes: [ "heading" ],
                    text: "Search gifs from giphy.com",
                },
                {
                    type: "input",
                    attributes: {
                        placeholder: "Enter keyword here. Ex: Smile",
                    },
                    classes: [ "searchbar" ]
                },
                {
                    type: "button",
                    classes: [ "searchbutton" ],
                    listeners: {
                        click: function(){
                            let giphysearchinput = this.parentElement.getElementsByTagName("input")[0];
                            self.resetImages('elementCreator');
                            self.searchGIFS(giphysearchinput.value, 'elementCreator');
                        }
                    },
                    children: [
                        {
                            type: "i",
                            classes: [ "fas", "fa-search" ]
                        }
                    ]
                },
            ],
            before: before,
            prepend: prepend
        });
    }

    async searchGIFS(query, mode){
        const self = this;

		const response = await Globals.api.request({ route: `giphy/${query}`, method: "get" });
        if(response.success === true){
			self.loadGIFS(JSON.parse(response.data).data, mode);
        }
    }

    loadGIFS(data, mode){
		let div = null;
		for(var i = 0; i < data.length; i++){
			let listeners = {};

            let applyTo = document.getElementsByClassName("selected-element")[0];
			if(mode == 'webpageBuilder'){
				if(applyTo.tagName == 'IMG' || document.getElementsByClassName('selElForImgPik')[0]){
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
								applyTo.src = this.getElementsByTagName("img")[0].src;
							}
						};
					}
				}else{
					if(applyTo.tagName == 'DIV' && $(applyTo).attr('data-e-type') == 'video-overlay'){
						listeners = {
							click: function(){
								document.getElementById(applyTo.id+'videoPlayer').setAttribute('poster',this.getElementsByTagName("img")[0].src);
							}
						};
					}else{
						if($(applyTo).attr('data-e-type') == 'video'){
							listeners = {
								click: function(){
									applyTo.setAttribute('poster',this.getElementsByTagName("img")[0].src);
								}
							};
						}else{
							listeners = {
								click: function(){
									applyTo.style.background = "url("+this.getElementsByTagName("img")[0].src+")"
									applyTo.style.backgroundRepeat = "no-repeat";
									applyTo.style.backgroundPosition = "center";
									applyTo.style.backgroundSize = "cover";
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
						document.getElementById("preview"+elementType).style.background = "url("+this.src+")"
						document.getElementById("preview"+elementType).style.backgroundRepeat = "no-repeat";
						document.getElementById("preview"+elementType).style.backgroundPosition = "center";
						document.getElementById("preview"+elementType).style.backgroundSize = "cover";
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

    resetImages(){}
}
