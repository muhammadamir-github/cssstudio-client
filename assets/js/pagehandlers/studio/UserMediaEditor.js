class UserMediaEditor{
	constructor(){}

	open(mediaType,image){
		var title;
		var des;
		var thumbnail;
		var mediaId;

		var properties;

		if(mediaType == "video"){
			title = image.getAttribute("data-video-title");
			des = image.getAttribute("data-video-des");
			thumbnail = image.src;
			mediaId = image.getAttribute("data-m-id");

			properties = ["Thumbnail", "Title", "Description"];
		}else{
			if(mediaType == "image"){
				title = image.getAttribute("data-image-title");
				des = image.getAttribute("data-description");
				mediaId = image.getAttribute("data-m-id");

				properties = ["Title", "Description"];
			}
		}

		if(title == "null" || title == null){ title = ""; }
		if(des == "null" || des == null){ des = ""; }

		let mediaEditorDiv = Globals.elements.new({
			type: "div",
			classes: [ "mediaManager_box" ],
			id: "mediaManager-edit-box",
			style: {
				display: "inline-block"
			},
			children: [
				{
					type: "div",
					classes: [ "mediaManager-txtboxes" ],
					children: [
						...(() => {
							return properties.map(x => {
								let suitableElement = {};
								if(x == "Description"){
									suitableElement = {
										type: "textarea",
										text: des,
										attributes: {
											Placeholder: "Enter the description for your media here."
										}
									};
								}else{
									if(x == "Thumbnail"){
										suitableElement = {
											type: "img",
											attributes: {
												src: thumbnail
											}
										};
									}else{
										suitableElement = {
											type: "input",
											attributes: {
												type: "text",
												value: x == "Title" ? title : null,
												Placeholder: x == "Title" ? "Enter the title for your media here." : null,
											}
										};
									}
								}

								if(x == "Thumbnail"){
									suitableElement = {
										...suitableElement,
										listeners: {
											mouseover: function(){
												let thumbnail_upload_text = this.parentElement.getElementsByClassName("thumb-text")[0];
												thumbnail_upload_text.style.opacity = 1;
											},
											mouseout: function(){
												let thumbnail_upload_text = this.parentElement.getElementsByClassName("thumb-text")[0];
												thumbnail_upload_text.style.opacity = 0;
											}
										}
									}
								}

								return {
									type: "div",
									classes: [ "txtbox" ],
									attributes: {
										"data-name": x,
									},
									style: x === "Thumbnail" ? {
										width: "50%",
										height: "50%"
									} : null,
									children: [
										...(() => {
											return x === "Thumbnail" ?
												[
													{
														type: "p",
														classes: [ "thumb-text" ],
														text: "Upload Custom Thumbnail",
													},
													{
														type: "input",
														attributes: {
															type: "file",
															accept: "image/png, image/jpeg, image/jpg"
														},
														style: {
															width: "0px",
															height: "0px",
															display: "none",
															pointerEvents: "none",
															opacity: "0"
														},
														listeners: {
															change: function(){
																let txtbox = this.parentElement;
																mediaManager.changeThumbnailPreview(this.files[0], txtbox);
															},
															click: function(){
																this.click();
															}
														}
													}
												]
											: null;
										})(),
										{
											type: "p",
											text: x,
										},
										suitableElement,
									]
								}
							});
						})(),
						...(() => {
							return properties.map(x => {
								return x == "Thumbnail" ?
									{
										type: "span",
										classes: [ "note" ],
										text: "This is just a preview of the thumbnail. Thumbnail automatically resizes according to the screen size.",
										style: { width: "50%" },
									}
								: {};
							})
						})(),
					]
				}
			]
		});

		if(mediaType == "video"){
			document.getElementsByClassName("videoManager")[0].appendChild(mediaEditorDiv);
			document.getElementsByClassName("videoManager")[0].getElementsByClassName("videoManager_panelbar")[0].getElementsByTagName("button")[0].style.display = "none";
			document.getElementById("videoManager-videos-box").style.display = "none";
			document.getElementsByClassName("videoManager")[0].getElementsByClassName("banner")[0].getElementsByTagName("input")[0].style.display = "none";
		}else{
			if(mediaType == "image"){
				document.getElementById("bg-image-manager").appendChild(mediaEditorDiv);
				document.getElementById("bg-image-manager").getElementsByClassName("bg-image-manager_panelbar")[0].getElementsByTagName("button")[0].style.display = "none";
				document.getElementById("bg-image-manager-images-box").style.display = "none";
				document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].getElementsByTagName("input")[0].style.display = "none";
				document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].getElementsByClassName("checkbox-one")[0].style.display = "none";
			}
		}

		let savebutton = Globals.elements.new({
			type: "button",
			parent: mediaType === "video" ? document.getElementsByClassName("videoManager")[0].getElementsByClassName("banner")[0] : document.getElementById("bg-image-manager").getElementsByClassName("banner")[0],
			classes: [ "save-edit-button" ],
			text: 'Save',
			listeners: {
				click: function(){
					cancelbutton.style.opacity = 0.5;
					cancelbutton.style.pointerEvents = "none";
					this.style.opacity = 0.5;
					this.style.pointerEvents = "none";
					mediaManager.updateMedia(mediaId,txtbox_container,mediaType);
				}
			}
		});

		let cancelbutton = Globals.elements.new({
			type: "button",
			parent: mediaType === "video" ? document.getElementsByClassName("videoManager")[0].getElementsByClassName("banner")[0] : document.getElementById("bg-image-manager").getElementsByClassName("banner")[0],
			classes: [ "cancel-edit-button" ],
			text: 'Cancel',
			listeners: {
				click: function(){
					mediaEditor.close(mediaType);
				}
			}
		});
	}

	close(mediaType){
		document.getElementById("mediaManager-edit-box").remove();

		if(mediaType == "video"){
			document.getElementsByClassName("videoManager")[0].getElementsByClassName("videoManager_panelbar")[0].getElementsByTagName("button")[0].style.display = "inline-block";
			document.getElementById("videoManager-videos-box").style.display = "inline-block";
			document.getElementsByClassName("videoManager")[0].getElementsByClassName("banner")[0].getElementsByClassName("save-edit-button")[0].remove();
			document.getElementsByClassName("videoManager")[0].getElementsByClassName("banner")[0].getElementsByClassName("cancel-edit-button")[0].remove();
			document.getElementsByClassName("videoManager")[0].getElementsByClassName("banner")[0].getElementsByTagName("input")[0].style.display = "inline-block";
		}else{
			if(mediaType == "image"){
				document.getElementById("bg-image-manager").getElementsByClassName("bg-image-manager_panelbar")[0].getElementsByTagName("button")[0].style.display = "inline-block";
				document.getElementById("bg-image-manager-images-box").style.display = "inline-block";
				document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].getElementsByClassName("save-edit-button")[0].remove();
				document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].getElementsByClassName("cancel-edit-button")[0].remove();
				document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].getElementsByTagName("input")[0].style.display = "inline-block";
				document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].getElementsByClassName("checkbox-one")[0].style.display = "inline-block";
			}
		}
	}
}
