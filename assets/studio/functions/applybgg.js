function applybgg(e){
    var p = 'to ' + document.getElementById('bggeyvalue').innerText + ' ' +document.getElementById('bggexvalue').innerText;
    var c1 = document.getElementById('bggc1cd').style.backgroundColor;
    var c2 = document.getElementById('bggc2cd').style.backgroundColor;
    document.getElementById(e).style.background = 'linear-gradient('+p+','+c1+','+c2+')';
}
