class PublicEventHandler{
	constructer(){}

	detectHoverSideOfElement(element,e){
		var posX = e.clientX;
		var posY = e.clientY;

		var elementXSpace = element.getBoundingClientRect().left;
		var elementYSpace = element.getBoundingClientRect().top;

		var xDifference = posX-elementXSpace;
		var yDifference = posY-elementYSpace;

		var xElement = (element.getBoundingClientRect().left + element.getBoundingClientRect().width) - element.getBoundingClientRect().left;
		var yElement = (element.getBoundingClientRect().top + element.getBoundingClientRect().height) - element.getBoundingClientRect().top;

		var xDiffPercentage = Math.floor(((xDifference/xElement) * 100));
		var yDiffPercentage = Math.floor(((yDifference/yElement) * 100));

		//console.log("X:"+xDiffPercentage+"% , Y:"+yDiffPercentage+"%");

		var xAxis;
		var yAxis;

		if(xDiffPercentage < 25){
			xAxis = "left";
		}else{
			if(xDiffPercentage > 75){
				xAxis = "right";
			}
		}

		if(yDiffPercentage < 25){
			yAxis = "top";
		}else{
			if(yDiffPercentage > 75){
				yAxis = "bottom";
			}
		}

		return [xAxis,yAxis];
	}

	galleryImgDescription_show(e){
		$('.galleryImgDescription').remove();
		if($(e.target).attr('data-description') !== '-'){
			var description = Globals.elements.new({
				type: "span",
				parent: Globals.window.body,
				text: $(e.target).attr('data-description'),
				classes: [ "galleryImgDescription" ],
				style: {
					left: `${e.clientX}px`,
					top: `${e.clientY}px`,
				}
			});
		}
	}

	galleryImgDescription_hide(e){
		$('.galleryImgDescription').remove();
		console.log("hidded");
	}

	changeImageViewerImage(e,viewer_image,title,isImgViewer_Number_Two){

		if(isImgViewer_Number_Two == true){
			var viewerElement = viewer_image.parentElement.parentElement;

			var state = Number(viewerElement.getAttribute("data-state"));
			var location = Number(viewerElement.getAttribute("data-loc"));

			if(state !== 3){
				if(location == 1){
					viewerElement.classList.add("img-viewer-two-view-open_RIGHT");
					setTimeout(function(){
						viewerElement.classList.remove("img-viewer-two-view-open_RIGHT");
					},600);

					viewerElement.style.left = "25%";
					viewerElement.style.right = "unset";
				}else{
					if(location == 2){
						viewerElement.classList.add("img-viewer-two-view-open_LEFT");
						setTimeout(function(){
							viewerElement.classList.remove("img-viewer-two-view-open_LEFT");
						},600);

						viewerElement.style.left = "0%";
						viewerElement.style.left = "unset";
					}
				}

				viewerElement.style.width = "75%";
				viewer_image.parentElement.style.width = "75%";
				viewerElement.getElementsByClassName("image-viewer-thumbnails")[0].style.width = "25%";
				viewerElement.setAttribute("data-state","3");
			}

		}

		$('.imageViewerSelectedImage').removeClass('imageViewerSelectedImage');
		viewer_image.src = e.target.src;
		title.innerText = $(e.target).attr('data-description');
		e.target.classList.add('imageViewerSelectedImage');
	}

	enlargeImage(e,src){
		$('.fullScreenImageViewer').remove();

		var viewer = Globals.elements.new({
			type: "div",
			parent: document.getElementsByClassName('previewsite')[0],
			classes: [ "fullScreenImageViewer" ],
			style: {
				zIndex: `10`,
				margin: `0`,
			},
			children: [
				{
					type: "img",
					attributes: { src }
				},
				{
					type: "i",
					classes: [ "fas", "fa-times" ],
					listeners: {
						click: publicEvents.closeFullScreenImageViewer
					}
				}
			]
		});
	}

	closeFullScreenImageViewer(e){
		$(".selectedSpecialOptions").css({'display':'block'});
		$('.fullScreenImageViewer').remove();
	}

	count_ImgSlider1Images(sliderElement){
		if(sliderElement){
			var totalImages = 0;

			var imgs = sliderElement.getElementsByTagName("img");
			for(var i=0; i<imgs.length; i++){
				totalImages += 1;
			}

			return totalImages;
		}
	}

	slideImgSlider1Images(direction,sliderElement){
		var allSlides = sliderElement.getElementsByClassName("imgSlide");

		var totalSlides = sliderElement.getAttribute("data-total");
		var activeSlideIndex = sliderElement.getAttribute("data-active");

		if(totalSlides > 0){
			if(direction == "right"){

				var newslideindex = 0;

				if(activeSlideIndex == totalSlides){
					newslideindex = 0;
				}else{
					newslideindex = Number(activeSlideIndex) + 1;
				}

				allSlides[activeSlideIndex].classList.add("slideOutLeft");

				setTimeout(function(){
					for(var i=0; i<allSlides.length; i++){
						allSlides[i].classList.remove("active");
					}

					allSlides[activeSlideIndex].classList.remove("slideOutLeft");

					allSlides[newslideindex].classList.add("slideInLeft");
					allSlides[newslideindex].classList.add("active");

					sliderElement.setAttribute("data-active",newslideindex);

					setTimeout(function(){
						allSlides[newslideindex].classList.remove("slideInLeft");
					},1200);
				},500);

			}else{
				if(direction == "left"){
					var newslideindex = 0;

					if(activeSlideIndex == 0){
						newslideindex = totalSlides;
					}else{
						if(totalSlides == 0){
							newslideindex = 0;
						}else{
							if(totalSlides >= 1 && activeSlideIndex !== 0){
								newslideindex = Number(activeSlideIndex) - 1;
							}
						}
					}

					allSlides[activeSlideIndex].classList.add("slideOutRight");

					setTimeout(function(){
						for(var i=0; i<allSlides.length; i++){
							allSlides[i].classList.remove("active");
						}

						allSlides[activeSlideIndex].classList.remove("slideOutRight");

						allSlides[newslideindex].classList.add("slideInRight");
						allSlides[newslideindex].classList.add("active");

						sliderElement.setAttribute("data-active",newslideindex);

						setTimeout(function(){
							allSlides[newslideindex].classList.remove("slideInRight");
						},1200);
					},500);
				}
			}
		}else{

		}
	}

	toggle_ImgViewer2(viewerElement){
		var state = viewerElement.getAttribute("data-state");
		var location = Number(viewerElement.getAttribute("data-loc"));

		if(state == 1){

			if(location == 1){
				viewerElement.classList.add("img-viewer-two-thumbnails-open_RIGHT");

				setTimeout(function(){
					viewerElement.classList.remove("img-viewer-two-thumbnails-open_RIGHT");
				},600);

				viewerElement.style.left = "75%";
			}else{
				if(location == 2){
					viewerElement.classList.add("img-viewer-two-thumbnails-open_LEFT");

					setTimeout(function(){
						viewerElement.classList.remove("img-viewer-two-thumbnails-open_LEFT");
					},600);

					viewerElement.style.left = "0%";
				}
			}

			viewerElement.setAttribute("data-state","2");
		}else{
			if(state == 2){

				if(location == 1){
					viewerElement.classList.add("img-viewer-two-thumbnails-close_RIGHT");

					setTimeout(function(){
						viewerElement.classList.remove("img-viewer-two-thumbnails-close_RIGHT");
					},600);

					viewerElement.style.left = "100%";
				}else{
					if(location == 2){
						viewerElement.classList.add("img-viewer-two-thumbnails-close_LEFT");

						setTimeout(function(){
							viewerElement.classList.remove("img-viewer-two-thumbnails-close_LEFT");
						},600);

						viewerElement.style.left = "-25.2%";
					}
				}

				viewerElement.setAttribute("data-state","1");
			}else{
				if(state == 3){

					if(location == 1){
						viewerElement.classList.add("img-viewer-two-view-close_RIGHT");

						setTimeout(function(){
							viewerElement.classList.remove("img-viewer-two-view-close_RIGHT");
						},600);

						viewerElement.style.left = "75%";
					}else{
						if(location == 2){
							viewerElement.classList.add("img-viewer-two-view-close_LEFT");

							setTimeout(function(){
								viewerElement.classList.remove("img-viewer-two-view-close_LEFT");
							},600);

							viewerElement.style.left = "0%";
						}
					}

					viewerElement.style.width = "25%";
					viewerElement.getElementsByClassName("image-view")[0].style.width = "0%";
					viewerElement.getElementsByClassName("image-viewer-thumbnails")[0].style.width = "100%";

					viewerElement.setAttribute("data-state","2");
				}
			}
		}
	}

	checkbox_click(element){
		var checked = Number(element.getAttribute("data-checked"));

		if(checked == 0){
			element.setAttribute("data-checked","1");
			element.parentElement.getElementsByClassName("checkmark")[0].setAttribute("style","display:block; border-width: 0 3px 3px 0 !important;");
		}else{
			if(checked == 1){
				element.setAttribute("data-checked","0");
				element.parentElement.getElementsByClassName("checkmark")[0].setAttribute("style","display:none; border-width: 0 0 0 0 !important;");
			}
		}
	}

	multi_checkbox_click(checkbox,element){
		var allCheckboxes = element.getElementsByClassName("checkbox");
		var markShape = element.getAttribute("data-checkmark-shape");

		for(var i=0; i<allCheckboxes.length; i++){
			if(allCheckboxes[i] == checkbox){
				var checked = Number(checkbox.getAttribute("data-checked"));
				if(checked == 0){
					checkbox.setAttribute("data-checked",1);

					if(markShape == "tick"){
						checkbox.getElementsByClassName("checkmark")[0].classList.remove("tick-checkmark-disabled");
						checkbox.getElementsByClassName("checkmark")[0].classList.add("tick-checkmark-enabled");
					}else{
						if(markShape == "circle"){
							checkbox.getElementsByClassName("checkmark")[0].classList.remove("circle-checkmark-disabled");
							checkbox.getElementsByClassName("checkmark")[0].classList.add("circle-checkmark-enabled");
						}else{
							if(markShape == "square"){
								checkbox.getElementsByClassName("checkmark")[0].classList.remove("square-checkmark-disabled");
								checkbox.getElementsByClassName("checkmark")[0].classList.add("square-checkmark-enabled");
							}
						}
					}

				}else{
					if(checked == 1){
						checkbox.setAttribute("data-checked",0);

						if(markShape == "tick"){
							checkbox.getElementsByClassName("checkmark")[0].classList.remove("tick-checkmark-enabled");
							checkbox.getElementsByClassName("checkmark")[0].classList.add("tick-checkmark-disabled");
						}else{
							if(markShape == "circle"){
								checkbox.getElementsByClassName("checkmark")[0].classList.remove("circle-checkmark-enabled");
								checkbox.getElementsByClassName("checkmark")[0].classList.add("circle-checkmark-disabled");
							}else{
								if(markShape == "square"){
									checkbox.getElementsByClassName("checkmark")[0].classList.remove("square-checkmark-enabled");
									checkbox.getElementsByClassName("checkmark")[0].classList.add("square-checkmark-disabled");
								}
							}
						}

					}
				}
			}else{
				if(allCheckboxes[i] !== checkbox){
					allCheckboxes[i].setAttribute("data-checked",0);

					if(markShape == "tick"){
						allCheckboxes[i].getElementsByClassName("checkmark")[0].classList.remove("tick-checkmark-enabled");
						allCheckboxes[i].getElementsByClassName("checkmark")[0].classList.add("tick-checkmark-disabled");
					}else{
						if(markShape == "circle"){
							allCheckboxes[i].getElementsByClassName("checkmark")[0].classList.remove("circle-checkmark-enabled");
							allCheckboxes[i].getElementsByClassName("checkmark")[0].classList.add("circle-checkmark-disabled");
						}else{
							if(markShape == "square"){
								allCheckboxes[i].getElementsByClassName("checkmark")[0].classList.remove("square-checkmark-enabled");
								allCheckboxes[i].getElementsByClassName("checkmark")[0].classList.add("square-checkmark-disabled");
							}
						}
					}

				}
			}
		}

	}

	multi_checkbox_two_click(checkbox,element){
		var checked = Number(checkbox.getAttribute("data-checked"));
		var markShape = element.getAttribute("data-checkmark-shape");

		if(checked == 0){
			checkbox.setAttribute("data-checked",1);

			if(markShape == "tick"){
				checkbox.getElementsByClassName("checkmark")[0].classList.remove("tick-checkmark-disabled");
				checkbox.getElementsByClassName("checkmark")[0].classList.add("tick-checkmark-enabled");
			}else{
				if(markShape == "circle"){
					checkbox.getElementsByClassName("checkmark")[0].classList.remove("circle-checkmark-disabled");
					checkbox.getElementsByClassName("checkmark")[0].classList.add("circle-checkmark-enabled");
				}else{
					if(markShape == "square"){
						checkbox.getElementsByClassName("checkmark")[0].classList.remove("square-checkmark-disabled");
						checkbox.getElementsByClassName("checkmark")[0].classList.add("square-checkmark-enabled");
					}
				}
			}

		}else{
			if(checked == 1){
				checkbox.setAttribute("data-checked",0);

				if(markShape == "tick"){
					checkbox.getElementsByClassName("checkmark")[0].classList.remove("tick-checkmark-enabled");
					checkbox.getElementsByClassName("checkmark")[0].classList.add("tick-checkmark-disabled");
				}else{
					if(markShape == "circle"){
						checkbox.getElementsByClassName("checkmark")[0].classList.remove("circle-checkmark-enabled");
						checkbox.getElementsByClassName("checkmark")[0].classList.add("circle-checkmark-disabled");
					}else{
						if(markShape == "square"){
							checkbox.getElementsByClassName("checkmark")[0].classList.remove("square-checkmark-enabled");
							checkbox.getElementsByClassName("checkmark")[0].classList.add("square-checkmark-disabled");
						}
					}
				}

			}
		}
	}

	checkbox_hoverOut(spanElement){
		spanElement.style.backgroundColor = spanElement.parentElement.getAttribute("data-bg");
	}

	checkbox_hover(spanElement){
		spanElement.style.backgroundColor = spanElement.parentElement.getAttribute("data-bg-hv");
	}

	toggleSwitch_click(element){
		var state = Number(element.getAttribute("data-state")); // 1 : on , 0 : off

		if(state == 0){
			element.setAttribute("data-state","1");
			element.getElementsByTagName("label")[0].getElementsByTagName("span")[0].style.backgroundColor = element.getAttribute("data-bg-o");
		}else{
			if(state == 1){
				element.setAttribute("data-state","0");
				element.getElementsByTagName("label")[0].getElementsByTagName("span")[0].style.backgroundColor = element.getAttribute("data-bg-c");
			}
		}
	}

	dropdownlist_option_click(element,e){
		var options = element.getElementsByClassName("options")[0];
		var options_ul = options.getElementsByTagName("ul")[0];
		var selected_span = element.getElementsByClassName("selected_option")[0].getElementsByTagName("span")[0];

		var option_text = e.target.innerText;

		options.style.display = 'none';
		options_ul.style.display = 'none';

		var value_name = selected_span.innerText.split(":")[0];

		selected_span.innerText = value_name+": "+option_text;

		element.setAttribute("data-selected",option_text);
	}

	dropdownlist_toggle(element){
		var options = element.getElementsByClassName("options")[0];
		var options_ul = options.getElementsByTagName("ul")[0];

		var state = element.getAttribute("data-state");

		if(state == 0){
			options.style.display = 'block';
			options_ul.style.display = 'block';

			element.setAttribute("data-state",1);
		}else{
			if(state == 1){
				options.style.display = 'none';
				options_ul.style.display = 'none';

				element.setAttribute("data-state",0);
			}
		}

	}

	dropdownlist_option_hoverOut(li,a,bgcolor,fontcolor){
		li.style.backgroundColor = bgcolor;
		a.style.color = fontcolor;

		var span = li.getElementsByTagName("span")[0];

		if(span){
			if(span.getElementsByTagName("i")[0]){
				span.getElementsByTagName("i")[0].style.color = fontcolor;
			}
		}

	}

	dropdownlist_option_hover(li,a,bgcolor,fontcolor){
		li.style.backgroundColor = bgcolor;
		a.style.color = fontcolor;

		var span = li.getElementsByTagName("span")[0];

		if(span){
			if(span.getElementsByTagName("i")[0]){
				span.getElementsByTagName("i")[0].style.color = fontcolor;
			}
		}

	}

	dropdownlist_position_icons(options_ul,position){
		var lis = options_ul.getElementsByTagName("li");

		for(var i=0; i<lis.length; i++){
			var span = lis[i].getElementsByTagName("span")[0];
			var a = lis[i].getElementsByTagName("a")[0];

			if(position == "left"){
				//span.style.left = (a.getBoundingClientRect().width - lis[i].getBoundingClientRect().width / 2) + "px";

				if(span){
					span.style.left = "7px";
				}

				if(a){
					a.style.textAlign = "left";
					a.style.left = "15px";
					a.style.transform = "unset";
				}

			}
		}
	}

	dropdownlist_multiselect_option_click(element,e){
		var options = element.getElementsByClassName("options")[0];
		var options_ul = options.getElementsByTagName("ul")[0];
		var selected_multi_selects = element.getElementsByClassName("selected_option")[0].getElementsByClassName("multi-selects")[0];

		var option_text = e.target.innerText;
		var alreadySelected = 0;

		if(alreadySelected === 0){
			options.style.display = 'none';
			options_ul.style.display = 'none';

			var span = Globals.elements.new({
				type: "span",
				parent: selected_multi_selects,
				text: option_text,
				classes: [ "fullScreenImageViewer" ],
				attributes: {
					"data-restrictions": "selection",
				},
				style: {
					backgroundColor: element.getAttribute("data-selected-bg"),
					color: element.getAttribute("data-selected-bg-clr"),
				},
				listeners: {
					mouseover: () => { publicEvents.dropdownlist_multiselect_selected_hover(span,i,element); },
					mouseout: () => { publicEvents.dropdownlist_multiselect_selected_hoverOut(span,i,element); }
				},
				children: [
					{
						type: "i",
						classes: [ "fas", "fa-times" ],
						attributes: {
							"data-restrictions": "selection",
						},
						listeners: {
							click: () => { publicEvents.dropdownlist_multiselect_unselect(span,selected_multi_selects); }
						},
						prepend: true
					}
				]
			});

			selected_multi_selects.style.display = "block";

			var oldSelections = element.getAttribute("data-selected");
			if(oldSelections == "" || oldSelections == " " || oldSelections == null){
				element.setAttribute("data-selected",option_text);
			}else{
				element.setAttribute("data-selected",oldSelections+","+option_text);
			}

			e.target.parentElement.style.display = "none";
		}

	}

	dropdownlist_multiselect_unselect(span,selected_multi_selects){
		var totalSelection;

		if(span){

			var element = selected_multi_selects.parentElement.parentElement;

			var oldSelections = element.getAttribute("data-selected").split(",");
			var newSelections = [];

			for(var i=0; i<oldSelections.length; i++){
				if(oldSelections[i] == span.innerText){

				}else{
					newSelections.push(oldSelections[i]);
				}
			}

			element.setAttribute("data-selected",newSelections.join(","));

			span.remove();
			totalSelection = selected_multi_selects.getElementsByTagName("span").length;

			if(totalSelection == 0){
				selected_multi_selects.style.display = "none";
			}

			var options = element.getElementsByClassName("options")[0].getElementsByTagName("ul")[0].getElementsByTagName("li");

			for(var o=0; o<options.length; o++){
				var text = options[o].getElementsByTagName("a")[0].innerText;
				if(text === span.innerText){
					options[o].style.display = "block";
				}
			}

		}
	}

	dropdownlist_multiselect_selected_hover(span,i,element){
		span.style.backgroundColor = element.getAttribute("data-selected-bg-hv");
		span.style.color = element.getAttribute("data-selected-bg-hv-clr");
		i.style.color = element.getAttribute("data-selected-bg-hv-clr");
	}

	dropdownlist_multiselect_selected_hoverOut(span,i,element){
		span.style.backgroundColor = element.getAttribute("data-selected-bg");
		span.style.color = element.getAttribute("data-selected-bg-clr");
		i.style.color = element.getAttribute("data-selected-bg-clr");
	}

	textbox_input(element){
		var length = element.getElementsByClassName("inputLength")[0];
		var maxlength = element.getAttribute("data-max-length");
		if(length){
			if(maxlength == element.getElementsByTagName("input")[0].getAttribute("maxlength")){
				length.innerText = element.getElementsByTagName("input")[0].value.length + "/" + maxlength;
			}
		}
	}

	ratings_mouseover(rating,ratings_element){
		ratings_element.setAttribute("data-selection",rating.id);
		publicEvents.ratings_update(ratings_element);
	}

	ratings_click(rating,ratings_element){
		var selectionToSet = rating.id;

		if(ratings_element.getAttribute("data-selected") == selectionToSet){
			publicEvents.ratings_setSelection(0,ratings_element);
		}else{
			publicEvents.ratings_setSelection(selectionToSet,ratings_element);
		}
	}

	ratings_setSelection(selection,ratings_element){
		var allRatings = ratings_element.getElementsByTagName("i");

		for(var i=0; i<allRatings.length; i++){
			if(i <= selection-1){
				allRatings[i].style.color = ratings_element.getAttribute("data-i-bg-selected");
			}else{
				allRatings[i].style.color =  ratings_element.getAttribute("data-i-bg");
			}
		}

		ratings_element.setAttribute("data-selected",selection);
	}

	ratings_update(ratings_element){
		var currentSelection = Number(ratings_element.getAttribute("data-selection"));
		var allRatings = ratings_element.getElementsByTagName("i");

		for(var i=0; i<allRatings.length; i++){
			if(i <= currentSelection-1){
				allRatings[i].style.color = ratings_element.getAttribute("data-i-bg-selected");
			}else{
				allRatings[i].style.color =  ratings_element.getAttribute("data-i-bg");
			}
		}
	}

	ratings_cancel(ratings_element){
		var allRatings = ratings_element.getElementsByTagName("i");
		var selected = ratings_element.getAttribute("data-selected");

		ratings_element.setAttribute("data-selection",0);
		publicEvents.ratings_setSelection(selected,ratings_element);
	}

	videoPlayPause(video,e){
		var element = video.parentElement;
		var type = element.getAttribute("data-e-type");

		if(video.paused == true) {

			if(type == "video-player-two"){
				if(element.getElementsByClassName("video-cover")[0]){
					element.getElementsByClassName("video-cover")[0].getElementsByTagName("div")[0].style.opacity = 0;
					element.getElementsByClassName("video-cover")[0].getElementsByTagName("p")[0].style.opacity = 0;
					setTimeout(function(){
						element.getElementsByClassName("video-cover")[0].remove();
						video.play();
						e.target.classList.remove('fa-play');
						e.target.classList.add('fa-pause');
					},1350);
				}else{
					video.play();
					e.target.classList.remove('fa-play');
					e.target.classList.add('fa-pause');
				}
			}else{
				video.play();
				e.target.classList.remove('fa-play');
				e.target.classList.add('fa-pause');
			}
		}else{
			video.pause();
			e.target.classList.remove('fa-pause');
			e.target.classList.add('fa-play');
		}
	}

	videoDurationToReadable(duration){
		var hours, mins, seconds, time;
		hours = Math.floor(duration / 3600);
		mins = Math.floor(duration / 60);
		seconds = Math.floor(duration - mins * 60)
		return time = publicEvents.formatVideoReadableDuration(hours, mins, seconds);
	}

	formatVideoReadableDuration(hours, mins, seconds){
		var time;
		if (hours < 1) {
			hours = '';
		};
		if (hours < 10 && hours != '') {
			hours = '0' + hours + ':';
		};
		if (mins < 10) {
			mins = '0' + mins;
		}
		if (seconds < 10) {
			seconds = '0' + seconds;
		}
		return time = `${hours}${mins}:${seconds}`;
	}

	videoEnded(video){
		var elementType = video.parentElement.getAttribute("data-e-type");
		var playpause;

		if(elementType == "video-player-one"){
			playpause = video.parentElement.getElementsByClassName("video-controls")[0].getElementsByTagName("i")[0];
		}else{
			if(elementType == "video-player-two"){
				playpause = video.parentElement.getElementsByClassName("video-controls")[0].getElementsByTagName("i")[0];
			}
		}

		playpause.classList.remove('fa-pause');
		playpause.classList.add('fa-play');
	}

	videoChangeDuration(video,e){
		var progressbar = e.target;
		video.currentTime = progressbar.value;
	}

	moveVideoProgressBar(video){
		var elementType = video.parentElement.getAttribute("data-e-type");

		if(video.readyState == 4){
			video.parentElement.getElementsByClassName("buffer-icon")[0].style.opacity = 0;
			video.style.opacity = 1;

			if(video.parentElement.getElementsByClassName("video-player-thumb")[0].style.opacity == 1){
				video.parentElement.getElementsByClassName("video-player-thumb")[0].style.opacity = 0;
			}
			// hide loading circle here
		}else{
			video.parentElement.getElementsByClassName("buffer-icon")[0].style.opacity = 1;
			video.style.opacity = 0.4;
		}

		if(elementType == "video-player-one"){
			var progressbar = video.parentElement.getElementsByClassName("video-controls")[0].getElementsByTagName("input")[0];
			var percentageProgress = ((progressbar.value - progressbar.min) * 100) / (progressbar.max - progressbar.min);
			progressbar.style.backgroundSize = `${percentageProgress}% 100%`;
		}else{
			if(elementType == "video-player-two"){
				var progressbar = video.parentElement.getElementsByClassName("duration")[0].getElementsByTagName("div")[0];
				var percentageProgress = (video.currentTime / video.getAttribute("data-len")) * 100;

				var time2 = video.parentElement.getElementsByClassName("duration")[0].getElementsByClassName("time")[0];
				time2.innerText = publicEvents.videoDurationToReadable(video.getAttribute("data-len"));

				var time1 = video.parentElement.getElementsByClassName("duration")[0].getElementsByTagName("span")[0];
				time1.innerText = publicEvents.videoDurationToReadable(video.currentTime);

				if(percentageProgress == 0){
					progressbar.style.width = "1%";
				}else{
					progressbar.style.width = percentageProgress+"%";
				}

			}
		}

	}

	videoUpdateFrame(element,timeToFrame){
		var canvas = element.getElementsByTagName("canvas")[0];
		var video = element.getElementsByTagName("video")[0];
		var progressbar = element.getElementsByClassName("video-controls")[0].getElementsByTagName("input")[0];

		var videoMax = progressbar.getAttribute("max");
		var videoMin = progressbar.getAttribute("min");

		var sparevideo = Globals.elements.new({
			type: "video",
			parent: Globals.window.body,
			style: {
				display: "block",
				opacity: 0,
				position: "absolute",
				pointerEvents: "none"
			},
			attributes: {
				src: video.src,
				max: videoMax,
				min: videoMin
			},
			listeners: {
				loadeddata: () => {
					var context = canvas.getContext('2d');
					context.drawImage(sparevideo, 0, 0, canvas.width, canvas.height);

					sparevideo.remove();
				}
			}
		})

		sparevideo.currentTime = timeToFrame;
	}

	videoHideFrame(element,e){
		var canvas = element.getElementsByTagName("canvas")[0];
		canvas.style.opacity = 0;
	}

	videoPositionFrame(element,event){
		var canvas = element.getElementsByTagName("canvas")[0];
		var progressbar = element.getElementsByClassName("video-controls")[0].getElementsByTagName("input")[0];

		var progressbarOffsetX = progressbar.getBoundingClientRect().left - document.documentElement.getBoundingClientRect().left;
		var progressbarOffsetY = progressbar.getBoundingClientRect().top - document.documentElement.getBoundingClientRect().top;

		var progressbarWidth = progressbar.offsetWidth - 1;

		var currentMouseXPos = (event.clientX + window.pageXOffset) - progressbarOffsetX;

		canvas.style.opacity = 1;
		canvas.style.left = currentMouseXPos + 'px';

		var valueOfMouseHoveredAt = (event.offsetX / progressbar.clientWidth) * parseInt(progressbar.getAttribute('max'),10);
		console.log(valueOfMouseHoveredAt);
		publicEvents.videoUpdateFrame(element,valueOfMouseHoveredAt);
	}

	videoChangeVolume(videoElement,e){
		var volume_range = e.target;
		videoElement.volume = volume_range.value;

		var icon = volume_range.parentElement.getElementsByClassName("fas")[0];

		if(volume_range.value == 0){
			icon.className = "fas fa-volume-mute";
		}else{
			if(volume_range.value >= 0.1 && volume_range.value < 0.7){
				icon.className = "fas fa-volume-down";
			}else{
				if(volume_range.value > 0.7){
					icon.className = "fas fa-volume-up";
				}
			}
		}
	}

	videoChangeVolume2(videoElement,e){
		var icon = e.target;

		if(icon.className == "fas fa-volume-up"){
			icon.className = "fas fa-volume-mute";
			videoElement.volume = 0;
		}else{
			if(icon.className == "fas fa-volume-mute"){
				icon.className = "fas fa-volume-off";
				videoElement.volume = 0.3;
			}else{
				if(icon.className == "fas fa-volume-off"){
					icon.className = "fas fa-volume-down";
					videoElement.volume = 0.6;
				}else{
					if(icon.className == "fas fa-volume-down"){
						icon.className = "fas fa-volume-up";
						videoElement.volume = 1;
					}
				}
			}
		}
	}

	videoFullScreen(videoElement,e){
		videoElement.parentElement.classList.add("video-player-fullscreen");
		e.target.className = "fas fa-compress";
	}

	videoExitFullScreen(videoElement,e){
		videoElement.parentElement.classList.remove("video-player-fullscreen");
		e.target.className = "fas fa-expand";
	}

	videoForward(videoElement,e){
		var currentTime = videoElement.currentTime;
		var newTime = videoElement.currentTime + 5;

		videoElement.currentTime = newTime;
	}

	videoBackward(videoElement,e){
		var currentTime = videoElement.currentTime;
		var newTime = videoElement.currentTime - 5;

		videoElement.currentTime = newTime;
	}

	videoNightMode(videoElement,e){
		if(e.target.className == "far fa-moon"){
			videoElement.parentElement.classList.add("video-night-mode");
			e.target.className = "fas fa-moon";
		}else{
			if(e.target.className == "fas fa-moon"){
				videoElement.parentElement.classList.remove("video-night-mode");
				e.target.className = "far fa-moon";
			}
		}
	}

	videoInfo(videoElement,e){
		var infoDiv = videoElement.parentElement.getElementsByClassName("video-info");
		if(infoDiv[0]){
			if(videoElement.parentElement.getAttribute("data-info-state") == 1){
				if(videoElement.parentElement.getAttribute("data-info-style") == 0){ // right alligned
					infoDiv[0].style.transform = "translateX(100%)";
					videoElement.parentElement.setAttribute("data-info-state",0);
				}else{
					if(videoElement.parentElement.getAttribute("data-info-style") == 1){ // bottom
						videoElement.parentElement.setAttribute("data-info-state",0);
					}
				}
			}else{
				if(videoElement.parentElement.getAttribute("data-info-state") == 0){
					if(videoElement.parentElement.getAttribute("data-info-style") == 0){ // right alligned
						infoDiv[0].style.transform = "translateX(0%)";
						videoElement.parentElement.setAttribute("data-info-state",1);
					}else{
						if(videoElement.parentElement.getAttribute("data-info-style") == 1){ // bottom
							videoElement.parentElement.setAttribute("data-info-state",1);
						}
					}
				}
			}
		}
	}

	videoPlaylistInfo_show(element,e){
		var infoDiv = element.getElementsByClassName("video-playlist-info")[0];
		var infoDivFade = element.getElementsByClassName("video-playlist-info-fade")[0];

		var infoDivState = element.getAttribute("data-info-state");
		var videoElement = element.getElementsByTagName("video")[0];

		var videoPlaying = videoElement = !!(videoElement.currentTime > 0 && !videoElement.paused && !videoElement.ended && videoElement.readyState > 2);

		var xPos = e.clientX;
		var yPos = e.clientY;

		var elementX = element.getBoundingClientRect().left;
		var elementY = element.getBoundingClientRect().top;
		var elementWidth = element.getBoundingClientRect().width;
		var elementHeight = element.getBoundingClientRect().height;

		//console.log(elementX+":"+xPos+"|"+elementY+":"+yPos);

		if(videoPlaying == true){

		}else{
			if(infoDivState == 0){
				if(xPos < elementX || yPos < elementY || xPos > elementX+elementWidth || yPos > elementY+elementHeight){
					infoDiv.style.display = "block";
					infoDivFade.style.display = "block";

					setTimeout(function(){
						infoDiv.style.opacity = "1";
						infoDivFade.style.opacity = "1";

						element.setAttribute("data-info-state",1);
					},50);
				}
			}
		}

	}

	videoPlaylistInfo_hide(element,e){
		var infoDiv = element.getElementsByClassName("video-playlist-info")[0];
		var infoDivFade = element.getElementsByClassName("video-playlist-info-fade")[0];

		var infoDivState = element.getAttribute("data-info-state");

		var mousePositions = publicEvents.detectHoverSideOfElement(element,e);

		if(mousePositions[1] == "top"){ // if mouse is on the info div of playlist then do not hide it.

		}else{
			if(infoDivState == 1){
				infoDiv.style.opacity = "0";
				infoDivFade.style.opacity = "0";

				setTimeout(function(){
					infoDiv.style.display = "none";
					infoDivFade.style.display = "none";

					element.setAttribute("data-info-state",0);
				},500);
			}
		}
	}

	videoPlaylistFullScreen(element,e){
		element.classList.add("video-playlist-fullscreen");
		e.target.className = "fas fa-compress";
	}

	videoPlaylistExitFullScreen(element,e){
		element.classList.remove("video-playlist-fullscreen");
		e.target.className = "fas fa-expand";
	}

	videoPlaylistItemClick(item,video){
		var vidTitle = video.parentElement.getElementsByClassName("video-info")[0].getElementsByClassName("heading")[0];
		var vidDescription = video.parentElement.getElementsByClassName("video-info")[0].getElementsByClassName("description")[0];

		video.src = item.getAttribute("data-vid-url");
		video.setAttribute("poster",item.getElementsByTagName("img")[0].src);
		vidTitle.innerText = item.getAttribute("data-title");
		vidDescription.innerText = item.getAttribute("data-description");

		$('.playlist-selected-item').removeClass("playlist-selected-item");
		item.classList.add("playlist-selected-item");
	}

	videoIsPlaying(element){
		element.getElementsByClassName("video-player-thumb")[0].style.opacity = 0;
	}

	videoIsWaiting(element){
		element.getElementsByClassName("video-player-thumb")[0].style.opacity = 1;
	}

}

var publicEvents = new PublicEventHandler;

class StateChecker{
	constructer(){}

	checkbox(checkbox){
		return Number(checkbox.getAttribute("data-checked"));
	}
}

var stateOf = new StateChecker;
