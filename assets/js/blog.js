$(document).ready(function(){

$.ajax({
        url:'https://api.cssstudio.co/api/blogs',
        type:'GET',
        success: function(response){
          blogs.load(response.success);
        },
        error: function(response){
         //location.reload();
        }
});

document.getElementsByClassName('close')[0].addEventListener('click',function(){
	document.getElementsByTagName('fullview')[0].style.right = '100%';
});

});


var blogs = (new function(){

this.load = (function(response){
  var oldblogs = document.getElementsByTagName('blog');
  for(var i=0; i < oldblogs.length; i++){
  	oldblogs[i].remove();
  }
  for(var i=0; i < response.length; i++){
  	(function(i)
  	  {
  	    var blog = document.createElement('blog');

		var heading = document.createElement('p');
		heading.setAttribute('class','heading');
		heading.innerText = response[i].heading;

		var image = document.createElement('img');
		image.setAttribute('class','image');
		image.src = response[i].image_link;

		var author = document.createElement('p');
		author.setAttribute('class','author');
		author.innerText = moment.utc(response[i].created_at).local().format("MMMM Do YYYY h:mm a") + ', By ' + response[i].author + '.';

		var content = document.createElement('p');
		content.setAttribute('class','content');
		content.innerText = response[i].content.slice(0, 500)+'...';

		blog.appendChild(heading);
		blog.appendChild(image);
		blog.appendChild(content);
		blog.appendChild(author);

		blog.addEventListener("click",function(){
			var fullview = document.getElementsByTagName('fullview')[0];
			fullview.style.right = '0%';
			fullview.getElementsByClassName('fw_heading')[0].innerText = response[i].heading;
			fullview.getElementsByClassName('fw_image')[0].src = response[i].image_link;
			fullview.getElementsByClassName('fw_content')[0].innerText = response[i].content;
			fullview.getElementsByClassName('fw_author')[0].innerText = moment.utc(response[i].created_at).local().format("MMMM Do YYYY h:mm a") + ', By ' + response[i].author + '.';;
		});
		document.getElementsByTagName('body')[0].appendChild(blog);
	}).call(this,i);
	}

	var whitespace = document.createElement('div');
	whitespace.setAttribute('class','whitespace');
	document.getElementsByTagName('body')[0].appendChild(whitespace);
});

});

function p(e){
	if(e.tagName == 'LI'){
		window.location.href = $(e).attr('href');
	}

	if(e.tagName == 'I'){
		if(e.classList.contains('facebook')){
			window.location.href = '';
		}
		if(e.classList.contains('instagram')){
			window.location.href = '';
		}
		if(e.classList.contains('twitter')){
			window.location.href = '';
		}
		if(e.classList.contains('youtube')){
			window.location.href = '';
		}
	}
}