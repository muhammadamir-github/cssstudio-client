function storageSpace_showDetails(storageSpace,e){
	var details = document.createElement("div");
	details.className = "storageSpace_details";

	var fs = Number(Globals.pageHandler.FreeSpace.replace("MB","").replace("KB","").replace("GB","").replace("TB","").replace("Bytes","").replace("PB",""));
	var is = Number(Globals.pageHandler.spaceUsedByImages.replace("MB","").replace("KB","").replace("GB","").replace("TB","").replace("Bytes","").replace("PB",""));
	var vs = Number(Globals.pageHandler.spaceUsedByVideos.replace("MB","").replace("KB","").replace("GB","").replace("TB","").replace("Bytes","").replace("PB",""));

	var totalSpace = fs+is+vs;

	var imgPercentage = Number(((is/totalSpace) * 100));
	var vidPercentage = Number(((vs/totalSpace) * 100));

	var barZIndex = [0,1,2]; // free , images , videos

	if(imgPercentage > vidPercentage){
		barZIndex = [0,1,2];
	}else{
		if(vidPercentage > imgPercentage){
			barZIndex = [0,2,1];
		}
	}

	var bars = ["Free Space","Images","Videos"];
	var barColors = ["grey","darkred","orange"];
	var barValues = [100,imgPercentage,vidPercentage];
	var barData = [Globals.pageHandler.FreeSpace,Globals.pageHandler.spaceUsedByImages,Globals.pageHandler.spaceUsedByVideos];

	for(var i=0; i<bars.length; i++){
		var bar = document.createElement("span");
		bar.className = "storageSpace_bar";
		bar.style.width = barValues[i]+"%";
		bar.style.backgroundColor = barColors[i];
		bar.style.zIndex = barZIndex[i];

		if(barZIndex[i] == 1){
			if(bars[i] == "Images"){
				bar.style.width = barValues[i] + barValues[2]+"%";
			}else{
				if(bars[i] == "Videos"){
					bar.style.width = barValues[i] + barValues[1]+"%";
				}
			}
		}

		details.appendChild(bar);
	}

	var info = document.createElement("div");
	info.className = "storageSpace_classes";

	for(var i=0; i<bars.length; i++){
		var text = document.createElement("span");
		text.className = "storageSpace_class";
		text.innerText = bars[i] + " - " + barData[i];

		var cube = document.createElement("span");
		cube.className = "storageSpace_class_cube";
		cube.style.backgroundColor = barColors[i];

		$(text).prepend(cube);
		info.appendChild(text);
	}

	details.style.width = storageSpace.getBoundingClientRect().width + "px";

	details.appendChild(info);
	body.appendChild(details);
}
