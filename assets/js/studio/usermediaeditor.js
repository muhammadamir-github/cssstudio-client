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

		if(title == "null" || title == null){
			title = "";
		}

		if(des == "null" || des == null){
			des = "";
		}

		var mediaEditorDiv = document.createElement("div");
		mediaEditorDiv.className = "mediaManager_box";
		mediaEditorDiv.id = "mediaManager-edit-box";

		var txtbox_container = document.createElement("div");
		txtbox_container.className = "mediaManager-txtboxes";

		for(var i=0; i<properties.length; i++){
			var addNote = 0;

			var txtbox = document.createElement("div");
			txtbox.className = "txtbox";
			txtbox.setAttribute("data-name",properties[i]);

			var p = document.createElement("p");
			p.innerText = properties[i];

			var suitableElement;

			if(properties[i] == "Description"){
				suitableElement = document.createElement("textarea");
				suitableElement.innerText = des;

				suitableElement.setAttribute("Placeholder","Enter the description for your media here.");
			}else{
				if(properties[i] == "Thumbnail"){
					suitableElement = document.createElement("img");
					suitableElement.src = thumbnail;

					txtbox.style.width = "50%";
					txtbox.style.height = "50%";

					addNote = 1;

					var note = document.createElement("span");
					note.className = "note";
					note.innerText = "This is just a preview of the thumbnail. Thumbnail automatically resizes according to the screen size."

					note.style.width = "50%";
				}else{
					suitableElement = document.createElement("input");
					suitableElement.type = "text";

					if(properties[i] == "Title"){
						suitableElement.value = title;
						suitableElement.setAttribute("Placeholder","Enter the title for your media here.");
					}
				}
			}

			(function(properties,i,suitableElement,txtbox){
				if(properties[i] == "Thumbnail"){
					var thumbnail_upload_text = document.createElement("p");
					thumbnail_upload_text.className = "thumb-text";
					thumbnail_upload_text.innerText = "Upload Custom Thumbnail";

					suitableElement.addEventListener("mouseover",function(){
						thumbnail_upload_text.style.opacity = 1;
					});

					suitableElement.addEventListener("mouseout",function(){
						thumbnail_upload_text.style.opacity = 0;
					});

					var uploadInput = document.createElement("input");
					uploadInput.type = "file";
					uploadInput.style.width = "0px";
					uploadInput.style.height = "0px";
					uploadInput.style.display = "none";
					uploadInput.style.pointerEvents = "none";
					uploadInput.style.opacity = "0";
					uploadInput.accept = 'image/png, image/jpeg, image/jpg';

					uploadInput.addEventListener('change',function(){
						mediaManager.changeThumbnailPreview(uploadInput.files[0],txtbox);
					});

					suitableElement.addEventListener("click",function(){
						uploadInput.click();
					});

					txtbox.appendChild(thumbnail_upload_text);
					txtbox.appendChild(uploadInput);
				}
			})(properties,i,suitableElement,txtbox);

			txtbox_container.appendChild(txtbox);

			if(addNote == 1){
				txtbox_container.appendChild(note);
			}

			txtbox.appendChild(p);
			txtbox.appendChild(suitableElement);
		}

		var savebutton = document.createElement("button");
		savebutton.className = "save-edit-button";
		savebutton.innerText = "Save";

		var cancelbutton = document.createElement("button");
		cancelbutton.className = "cancel-edit-button";
		cancelbutton.innerText = "Cancel";

		cancelbutton.addEventListener("click",function(){
			mediaEditor.close(mediaType);
		});

		savebutton.addEventListener("click",function(){
			cancelbutton.style.opacity = 0.5;
			cancelbutton.style.pointerEvents = "none";
			this.style.opacity = 0.5;
			this.style.pointerEvents = "none";
			mediaManager.updateMedia(mediaId,txtbox_container,mediaType);
		});

		mediaEditorDiv.appendChild(txtbox_container);

		if(mediaType == "video"){
			document.getElementsByClassName("videoManager")[0].appendChild(mediaEditorDiv);
			document.getElementsByClassName("videoManager")[0].getElementsByClassName("videoManager_panelbar")[0].getElementsByTagName("button")[0].style.display = "none";
			document.getElementById("videoManager-videos-box").style.display = "none";
			document.getElementsByClassName("videoManager")[0].getElementsByClassName("banner")[0].appendChild(savebutton);
			document.getElementsByClassName("videoManager")[0].getElementsByClassName("banner")[0].appendChild(cancelbutton);
			document.getElementsByClassName("videoManager")[0].getElementsByClassName("banner")[0].getElementsByTagName("input")[0].style.display = "none";
		}else{
			if(mediaType == "image"){
				document.getElementById("bg-image-manager").appendChild(mediaEditorDiv);
				document.getElementById("bg-image-manager").getElementsByClassName("bg-image-manager_panelbar")[0].getElementsByTagName("button")[0].style.display = "none";
				document.getElementById("bg-image-manager-images-box").style.display = "none";
				document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].getElementsByTagName("input")[0].style.display = "none";
				document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].getElementsByClassName("checkbox-one")[0].style.display = "none";
				document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].appendChild(savebutton);
				document.getElementById("bg-image-manager").getElementsByClassName("banner")[0].appendChild(cancelbutton);
			}
		}

		mediaEditorDiv.style.display = "inline-block";
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
