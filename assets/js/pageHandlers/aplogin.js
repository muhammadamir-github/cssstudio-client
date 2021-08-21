const Globals = window.globals;

class AdminPanelLoginHandler{
	constructor(){}

	setup(){
		document.getElementById('loginform').getElementsByTagName('button')[0].addEventListener('click',function(){
			lf();
		});

		document.getElementById('loginform').style.display = 'block';
	}

	lf(response){
		const self = this;
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
			success: self.lr,
			error: function(){
				Globals.notificationHandler.new('Error , Invalid Credentials');
				document.getElementById('loginform').style.opacity = '1';
				document.getElementById('loginform').style.pointerEvents = 'unset';
			},
		});
	}

	lr(response){
		if(response.message == 'Unauthorized'){
			Globals.notificationHandler.new('Error , Incorrect Credentials Entered.');
		}

		if(response.message == 'Google Code Unauthorized'){
			Globals.notificationHandler.new('Error , Invalid Google Authenticator Code.');
		}

		if(response.message == 'Logged in successfully!'){

			localStorage.setItem("aauth", response.accessToken);
			setTimeout(function(){ window.location.href = '../home/'; },2500);

		}
		document.getElementById('loginform').style.opacity = '1';
		document.getElementById('loginform').style.pointerEvents = 'unset';
	}
}


$(document).ready(function(){
	Globals.pageHandler = new AdminPanelLoginHandler;

	if(localStorage.getItem('aauth') != null){
		window.location.href = '../home/';
	}else{
		Globals.pageHandler.setup();
	}
});
