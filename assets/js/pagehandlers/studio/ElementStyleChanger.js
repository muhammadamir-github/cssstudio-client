// Responsible for handling Element Style Changer which allows user to apply ready made styles of some elements.
// This feature is under development.

class ElementStyleChanger{
	constructor(){}

	show(){
		const self = this;
		var element = document.getElementsByClassName("selected")[0];
		var elementType = element.getAttribute("data-e-type");

		var stylesDiv = Globals.elements.new({
			type: "styles",
			parent: Globals.window.body,
			listeners: {
				mousedown: self.mousedown,
			},
			children: [
				{
					type: "curvedborder"
				},
				{
					type: "p",
					classes: [ "heading" ],
					text: "Element Styles"
				},
				{
					type: "i",
					classes: [ "fas", "fa-times", "close" ],
					listeners: {
						click: function(){
							self.close();
						}
					}
				},
				{
					type: "div",
					classes: [ "styles-categories" ],
					children: (() => {
						return [
							{ name: "Colors", icon: "fas fa-palette" },
							{ name: "Designs", icon: "fas fa-pencil-ruler" }
						].map((x,i) => {
							return {
								type: "div",
								classes: [ "styles-category" ],
								attributes: { "data-category": x.name },
								listeners: {
									click: function(){
										self.switchTab(this);
									}
								},
								children: [
									{
										type: "i",
										classes: x.icon.split(" ")
									},
									{
										type: "p",
										text: x.name
									}
								]
							}
						});
					})(),
				},
				...(() => {
					return [
						{ name: "Colors", icon: "fas fa-palette" },
						{ name: "Designs", icon: "fas fa-pencil-ruler" }
					].map((x,i) => {
						return {
							type: "previews",
							attributes: { "data-category": x.name },
						}
					});
				})(),
			]
		});

		self.getStyles(elementType);
	}

	switchTab(category){
		$('.styles-category-selected').removeClass("styles-category-selected");
		category.classList.add("styles-category-selected");

		var tabToSwitch = category.getAttribute("data-category");
		var allTabs = document.getElementsByTagName("styles")[0].getElementsByTagName("previews");

		for(var i=0; i<allTabs.length; i++){
			if(allTabs[i].getAttribute("data-category") == tabToSwitch){
				allTabs[i].style.display = "block";
			}else{
				allTabs[i].style.display = "none";
			}
		}
	}

	async getStyles(elementType){
		const self = this;
		var token = localStorage.getItem('auth');

		var createPreviewElement = 0;
		var isColor = 0;

		if(elementType.includes("checkbox")){
			elementType = "checkbox";
		}else{
			if(elementType.includes("toggle-switch")){
				elementType = "toggle-switch";
			}else{
				if(elementType.includes("dropdown-list")){
					elementType = "dropdown-list";
				}
			}
		}

		const response = await Globals.api.request({ route: `elementStyles/${elementType}`, method: "get" });
        if(response.success === true){
			var styles = response.data;
			var allPreviews = document.getElementsByTagName("styles")[0].getElementsByTagName("previews");

			var previews;

			self.switchTab(document.getElementsByTagName("styles")[0].getElementsByClassName("styles-categories")[0].getElementsByClassName("styles-category")[0]);

			for(var i=0; i<styles.length; i++){
				if(styles[i].category == "colors"){
					isColor = 1;
				}

				// Picking suitable previews tab according to style category

				var categoryToMatch;
				if(isColor == 1){
					categoryToMatch = "Colors";
				}else{
					categoryToMatch = "Designs";
				}

				for(var o=0; o<allPreviews.length; o++){
					if(allPreviews[o].getAttribute("data-category") == categoryToMatch){
						previews = allPreviews[o];
					}
				}

				// --------------------------------------------

				let style = {};
				if(createPreviewElement == 1){

				}else{
					if(isColor == 1){
						if(elementType.includes("checkbox")){
							style = { backgroundColor: styles[i].attr[0].attributes.split(":")[1].replace(";","") };
						}else{
							if(elementType.includes("toggle-switch")){
								style = { backgroundColor: styles[i].attr[0].attributes.split(":")[1].replace(";","") };
							}else{
								if(elementType.includes("dropdown-list")){
									var color1 = styles[i].attr[0].attributes.split("data-option-bg-hv")[0].split(":")[1].replace(" ","").replace(";","");
									var color2 = styles[i].attr[0].attributes.split("data-option-bg-clr")[0].split("data-option-bg-hv")[1].split(":")[1].replace(" ","").replace(";","");

									var backgroundGradientString = "-webkit-gradient(linear, left bottom, right top, color-stop(0%,"+color1+"), color-stop(49%, "+color1+"), color-stop(50%, "+color2+"), color-stop(100%, "+color2+"))";
									style = { background: backgroundGradientString };
								}
							}
						}
					}
				}

				var stylePreview = Globals.elements.new({
					type: "stylePreview",
					parent: previews,
					id: `style-${randomize.elementId(50)}`,
					style,
					listeners: {
						click: function(e){
							self.switchStyle(styles[i], e);
						}
					}
				});
			}
        }
	}

	switchStyle(styleObj,e){
		var element = document.getElementsByClassName("selected")[0];
		var elementType = element.getAttribute("data-e-type");

		if(elementType.includes(styleObj.type)){

			// Change css

			for(var i=0; i<styleObj.css.length; i++){
				var css = styleObj.css[i];

				if(css.for_element == "element"){
					var elementToAffect = element;
				}else{
					var elementToAffect = element.getElementsByTagName(css.for_element)[0];
				}

				if(elementToAffect){
					elementToAffect.setAttribute("style",css.css_changes);
				}
			}

			// Add Attributes

			for(var o=0; o<styleObj.attr.length; o++){
				var attributes = styleObj.attr[o].attributes.split(" ");

				if(styleObj.attr[o].for_element == "element"){
					var elementToAffect = element;
				}else{
					var elementToAffect = element.getElementsByTagName(css.for_element)[0];
				}

				if(elementToAffect){
					for(var a=0; a<attributes.length; a++){
						var attrName = attributes[a].split(":")[0];
						var attrValue = attributes[a].split(":")[1].replace(";","");

						elementToAffect.setAttribute(attrName,attrValue);
					}
				}
			}

			// Select clicked preview:

			var allStyles = document.getElementsByTagName("styles")[0].getElementsByTagName("stylepreview");

			for(var o=0; o<allStyles.length; o++){
				allStyles[o].classList.remove("selected");
			}

			e.target.classList.add("selected");
		}
	}

	close(){
		document.getElementsByTagName("styles")[0].remove();
	}

	drag(e){
		var elmnt = document.getElementsByTagName('styles')[0];
		e = e || window.event;
		e.preventDefault();

		// calculate the new cursor position:
		Globals.pageHandler.elementStyles_pos1 = Globals.pageHandler.elementStyles_pos3 - e.clientX;
		Globals.pageHandler.elementStyles_pos2 = Globals.pageHandler.elementStyles_pos4 - e.clientY;
		Globals.pageHandler.elementStyles_pos3 = e.clientX;
		Globals.pageHandler.elementStyles_pos4 = e.clientY;

		// set the element's new position:
		elmnt.style.top = (elmnt.offsetTop - Globals.pageHandler.elementStyles_pos2) + "px";
		elmnt.style.left = (elmnt.offsetLeft - Globals.pageHandler.elementStyles_pos1) + "px";
		elmnt.style.cursor = 'grabbing';
	}

	mousedown(e){
		const self = this;
		var elmnt = document.getElementsByTagName('styles')[0];
		if(e.target == elmnt){
			e = e || window.event;
			e.preventDefault();

			elmnt.style.cursor = 'grab';

			// get the mouse cursor position at startup:
			Globals.pageHandler.elementStyles_pos3 = e.clientX;
			Globals.pageHandler.elementStyles_pos4 = e.clientY;
			document.onmouseup = self.closeDrag;

			// call a function whenever the cursor moves:
			document.onmousemove = self.drag;
		}
	}

	closeDrag(){
		var elmnt = document.getElementsByTagName('styles')[0];
		document.onmouseup = null;
		document.onmousemove = null;
		elmnt.style.cursor = 'default';
	}
}
