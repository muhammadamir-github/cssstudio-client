class StaticPageHandler{
	constructor(){}

	setup(){

	}
}

function p(e){
	if(e.tagName == 'LI'){
		window.location.href = $(e).attr('href');
	}

	if(e.tagName == 'I'){
		if(e.classList.contains('fa-facebook')){
			window.open('https://www.facebook.com/cssstudio.co/');
		}
		if(e.classList.contains('fa-instagram')){
			window.open('https://www.instagram.com/cssstudio.co/');
		}
		if(e.classList.contains('fa-twitter')){
			window.open('https://twitter.com/cssstudio_');
		}
		if(e.classList.contains('fa-youtube')){
			window.open('https://www.youtube.com/channel/UCdUalii2jgXx2oigzRQZCAA?view_as=subscriber');
		}
	}

	if(e.tagName == 'BUTTON'){
		window.location.href = '../login/?new=true';
	}
}
