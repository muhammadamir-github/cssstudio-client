function storageSpace_showDetails(storageSpace, e){
	var fs = Number(Globals.pageHandler.FreeSpace.replace("MB","").replace("KB","").replace("GB","").replace("TB","").replace("Bytes","").replace("PB",""));
	var is = Number(Globals.pageHandler.spaceUsedByImages.replace("MB","").replace("KB","").replace("GB","").replace("TB","").replace("Bytes","").replace("PB",""));
	var vs = Number(Globals.pageHandler.spaceUsedByVideos.replace("MB","").replace("KB","").replace("GB","").replace("TB","").replace("Bytes","").replace("PB",""));

	var totalSpace = fs+is+vs;

	var imgPercentage = Number(((is/totalSpace) * 100));
	var vidPercentage = Number(((vs/totalSpace) * 100));

	var bars = [
		{ name: "Free Space", color: "grey", zIndex: fs > (is+vs) || totalSpace === 0 ? "3" : "0", value: 100, data: Globals.pageHandler.FreeSpace, },
		{ name: "Images", color: "darkred", zIndex: vidPercentage > imgPercentage ? "2" : "1", value: imgPercentage, data: Globals.pageHandler.spaceUsedByImages, },
		{ name: "Videos", color: "orange", zIndex: vidPercentage > imgPercentage ? "1" : "2", value: vidPercentage, data: Globals.pageHandler.spaceUsedByVideos, }
	];

	var details = Globals.elements.new({
		type: "div",
		parent: Globals.window.body,
		classes: [ "storageSpace_details" ],
		style: {
			width: storageSpace.getBoundingClientRect().width + "px",
		},
		children: [
			...(() => {
				return bars.map((x, i) => {
					let width = x.value;

					if(x.zIndex == 1){
						if(x.name == "Images"){
							width = x.value + vidPercentage;
						}else{
							if(x.name == "Videos"){
								width = x.value + imgPercentage;
							}
						}
					}

					return {
						type: "span",
						classes: [ "storageSpace_bar" ],
						style: {
							width: width+"%",
							backgroundColor: x.color,
							zIndex: x.zIndex,
						}
					}
				})
			})(),
			{
				type: "div",
				classes: [ "storageSpace_classes" ],
				children: (() => {
					return bars.map((x, i) => {
						return {
							type: "span",
							classes: [ "storageSpace_class" ],
							text: x.name + " - " + x.data,
							children: [
								{
									type: "span",
									classes: [ "storageSpace_class_cube" ],
									style: {
										backgroundColor: x.color
									},
									prepend: true,
								}
							]
						}
					})
				})(),
			}
		]
	});
}
