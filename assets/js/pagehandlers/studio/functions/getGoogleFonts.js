function getGoogleFonts(element,mode){
    var token = localStorage.getItem('auth');
    $.ajax({
        url:'http://localhost:8000/api/google/fonts',
        type:'get',
        beforeSend: function(request){
            request.setRequestHeader('Authorization','Bearer '+token);
        },
        success: function(response){
            loadGoogleFonts(response,element,mode);
        },
    });
}
