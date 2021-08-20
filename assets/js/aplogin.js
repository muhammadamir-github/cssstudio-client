document.getElementById('loginform').getElementsByTagName('button')[0].addEventListener('click',function(){
	lf();
});


$(document).ready(function(){


	if(localStorage.getItem('aauth') != null){
		window.location.href = '../home/';
	}else{
		document.getElementById('loginform').style.display = 'block';
	}

});

function lf(response){

	var e = document.getElementById('lemail').value;
	var p = document.getElementById('lpassword').value;
	var gc = document.getElementById('lgotp').value;

	$.ajax({

		url:'https://api.cssstudio.co/api/admin/login',
		type:'POST',
		data:
		{
			'email':e,
			'password':p,
			'googleauthcode':gc,
		},
		dataType:'JSON',
		success: lr,
		error: function(){
			notification('Error , Invalid Credentials');
			document.getElementById('loginform').style.opacity = '1';
			document.getElementById('loginform').style.pointerEvents = 'unset';
		},
	});

}

function lr(response){

	if(response.message == 'Unauthorized'){
		notification('Error , Incorrect Credentials Entered.');
	}

	if(response.message == 'Google Code Unauthorized'){
		notification('Error , Invalid Google Authenticator Code.');
	}

	if(response.message == 'Logged in successfully!'){

		localStorage.setItem("aauth",response.accessToken);
		setTimeout(function(){ window.location.href = '../home/'; },2500);

	}

	document.getElementById('loginform').style.opacity = '1';
	document.getElementById('loginform').style.pointerEvents = 'unset';

}

function notification(text){

	var notification = document.createElement('notification');
	var notification_heading = document.createElement('p');
	notification_heading.setAttribute('class','heading');
	var notification_message = document.createElement('p');
	notification_message.setAttribute('class','message');
	notification_message.innerText = text;

	if(text.includes('saved') || text.includes('Saved')){
		notification_heading.innerText = 'Saved';
		notification_heading.style.color = 'Green';
		notification.style.border = '2px solid Green';
	}

	if(text.includes('successfully') || ('Successfully')){
		notification_heading.innerText = 'Success';
		notification_heading.style.color = 'Green';
		notification.style.border = '2px solid Green';
	}

	if(text.includes('error') || text.includes('Error')){
		notification_heading.innerText = 'Error';
		notification_heading.style.color = 'DarkRed';
		notification.style.border = '2px solid DarkRed';
	}

	notification.appendChild(notification_heading);
	notification.appendChild(notification_message);

	notification.addEventListener('click',function(){
		this.remove();
	});

	$('body').append(notification);

}
