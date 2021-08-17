function makePayment(token){
	$.ajax({
		url:'https://sandbox.2checkout.com/checkout/api/1/901403133/rs/authService',
		type:'POST',
		data:{'sellerId':'901403133','privateKey':'2057CD49-D034-4DAE-A9A0-70B99ED504A1','merchantOrderId':'1','token':token,'currency':'USD','total':'55.00'},
		dataType:'json',
		beforeSend: function(request){
			request.setRequestHeader('Content-Type','application/json');
			request.setRequestHeader('Accept','application/json');
		},
		success: function(response){
			console.log(response);
		},
		error:function(response){
			console.log(response);
		},
	});

/*var tco = new Twocheckout({
    sellerId: "901403133",
    privateKey: "2057CD49-D034-4DAE-A9A0-70B99ED504A1",
    sandbox: true,
});

var params = {
    "merchantOrderId": "1",
    "token": token,
    "currency": "USD",
    "total": "50.00",
};

tco.checkout.authorize(params, function (error, data) {
    if (error) {
        console.log(error.message);
    } else {
        console.log(JSON.stringify(data));
    }
});*/

}

var tokenRequest = function() {

    var args = {
      sellerId: "901403133",
      publishableKey: "65ED8F65-A82D-4DE2-A544-CF9C1F776856",
      ccNo: '4000000000000002',
      cvv: '123',
      expMonth: '5',
      expYear: '2022',
    };

    TCO.requestToken(successCallback, errorCallback, args);
};


function setUp2Checkout(){
  /*var form1 = document.createElement('form');
  form1.setAttribute('action','https://sandbox.2checkout.com/checkout/purchase');
  form1.setAttribute('method','post');

  var input1 = document.createElement('input');
  input1.setAttribute('type','hidden');
  input1.setAttribute('name','sid');
  input1.setAttribute('value','901403133');

  var input2 = document.createElement('input');
  input2.setAttribute('type','hidden');
  input2.setAttribute('name','mode');
  input2.setAttribute('value','2CO');

  var input3 = document.createElement('input');
  input3.setAttribute('type','hidden');
  input3.setAttribute('name','li_0_type');
  input3.setAttribute('value','product');

  var input4 = document.createElement('input');
  input4.setAttribute('type','hidden');
  input4.setAttribute('name','li_0_name');
  input4.setAttribute('value','Bronze Plan');

  var input5 = document.createElement('input');
  input5.setAttribute('type','hidden');
  input5.setAttribute('name','li_0_price');
  input5.setAttribute('value','24.99');

  var input6 = document.createElement('input');
  input6.setAttribute('type','text');
  input6.setAttribute('name','card_holder_name');
  input6.setAttribute('value','Amir');

  var input7 = document.createElement('input');
  input7.setAttribute('type','text');
  input7.setAttribute('name','email');
  input7.setAttribute('value','example@2co.com');

  var input8 = document.createElement('input');
  input8.setAttribute('type','text');
  input8.setAttribute('name','phone');
  input8.setAttribute('value','614-921-2450');

  var input9 = document.createElement('input');
  input9.setAttribute('type','hidden');
  input9.setAttribute('name','purchase_step');
  input9.setAttribute('value','payment-method');

  var input10 = document.createElement('input');
  input10.setAttribute('type','text');
  input10.setAttribute('name','street_address');
  input10.setAttribute('value','123 Test St');

  var input11 = document.createElement('input');
  input11.setAttribute('type','text');
  input11.setAttribute('name','street_address2');
  input11.setAttribute('value','Suite 200');

  var input12 = document.createElement('input');
  input12.setAttribute('type','text');
  input12.setAttribute('name','phone_extension');
  input12.setAttribute('value','91');

  var input13 = document.createElement('input');
  input13.setAttribute('type','text');
  input13.setAttribute('name','city');
  input13.setAttribute('value','Columbus');

  var input14 = document.createElement('input');
  input14.setAttribute('type','text');
  input14.setAttribute('name','state');
  input14.setAttribute('value','OH');

  var input15 = document.createElement('input');
  input15.setAttribute('type','text');
  input15.setAttribute('name','zip');
  input15.setAttribute('value','43228');

  var input16 = document.createElement('input');
  input16.setAttribute('type','text');
  input16.setAttribute('name','country');
  input16.setAttribute('value','USA');

  var input20 = document.createElement('input');
  input20.setAttribute('type','submit');
  input20.setAttribute('name','submit');
  input20.setAttribute('value','Checkout');

  form1.appendChild(input1);
  form1.appendChild(input2);
  form1.appendChild(input3);
  form1.appendChild(input4);
  form1.appendChild(input5);
  form1.appendChild(input6);
  form1.appendChild(input7);
  form1.appendChild(input8);
  form1.appendChild(input12);
  form1.appendChild(input9);
  form1.appendChild(input10);
  form1.appendChild(input11);
  form1.appendChild(input13);
  form1.appendChild(input14);
  form1.appendChild(input15);
  form1.appendChild(input16);
  form1.appendChild(input20);

  document.getElementById('upgp').appendChild(form1);*/

  TCO.loadPubKey('sandbox');

}

var errorCallback = function(data) {
    // Retry the token request if ajax call fails
    if (data.errorCode === 200) {
       // This error code indicates that the ajax call failed. We recommend that you retry the token request.
    } else {
      console.log(data.errorMsg);
    }
};

var successCallback = function(data) {
    var myForm = document.getElementById('myCCForm');

    // Set the token as the value for the token input
    console.log(data.response.token.token);
    makePayment(data.response.token.token);

};