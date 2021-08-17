class Element{
	constructor(element_id,style_name,apikey){

		this.styleName = style_name;

		if(element_id == ''){
			ThrowError("NoElementIdentifier","Please provide the element identifier.");
		}

	    //this.css = api.getStyle(style_name,apikey,element_id);
	}
}

ThrowError = function(name,message){
	throw {name : name, message : message};
}

var api = (new function(){
	this.getStyle = (function(styleName,apiKey,element_id){
		$.ajax({
          url: 'https://api.cssstudio.co/api/v2/style/'+styleName+'/'+apiKey,
          type: 'GET',
          success: function(response){
              Modify.Element.Style(response,element_id);
              return response.success.css;
          }
        });
	});
});

var Modify = (new function(){
	this.Element = (new function(){
		this.Style = (function(response,element_id){
			if(element_id == ''){
			    ThrowError("NoElementIdentifier","Please provide the element identifier.");
		    }

		    var element = document.getElementById(element_id);

		    if(element){
	            var stylesheet = document.createElement('style');
	            stylesheet.innerText = response.success.css;
	            stylesheet.setAttribute('id',response.success.name+'-stylesheet');
	            document.getElementsByTagName('body')[0].appendChild(stylesheet);

	            element.setAttribute('class',response.success.name);
	        }else{
	    	    ThrowError('NoElementFound','No element could be found matching with the provided element identifier.');
	        }

		});
	});
});