class ElementPresenceChecker{
	constructor(){}

	ByElementType(DataEType){
		var elements = document.getElementsByClassName(DataEType); // DataEType == className

		for(var i=0; i<elements.length; i++){
			if(elements[i].getAttribute("data-e-type") == DataEType){
				return true;
			}
		}

		return false;
	}
}
