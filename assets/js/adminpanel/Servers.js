class Servers{
    constructor(){}

    status(){
        const self = this;
        var serverlist = [
            {
                ip:'127.0.0.1',
                name:'Application Programming Interface',
            },
            {
                ip:'127.0.0.1',
                name:'MySQL Database',
            },
        ];

        for(var i=0; i < serverlist.length; i++){
            $('.server_status_box').remove();
            var ip = serverlist[i].ip;
            var name = serverlist[i].name;

            var test_image = document.createElement('img');
            test_image.setAttribute('hidden','');
            test_image.src = "https://"+ip+"/favicon.png";

            test_image.onload = function() {
                self.showResult(ip,'online',name);
                this.remove();
            }

            test_image.onerror = function() {
                self.showResult(ip,'offline',name);
                this.remove();
            }
        }
    }

    showResult(ip, serverstatus, severname){
        var statusdiv = document.createElement('div');
        statusdiv.setAttribute('class','server_status_box');

        var img = document.createElement('img');
        img.src = '../assets/images/digitalocean.png';

        var name = document.createElement('p');
        name.setAttribute('class','server_name');
        name.innerText = capitalizeFirstLetter(severname);

        var status = document.createElement('p');
        status.setAttribute('class','server_status');
        if(serverstatus == 'offline'){
            status.style.backgroundColor = 'darkred';
            status.style.textDecoration = 'underline darkred';
        }else{
            if(serverstatus == 'online'){
                status.style.backgroundColor = 'darkgreen';
                status.style.textDecoration = 'underline darkgreen';
            }
        }
        status.innerText = capitalizeFirstLetter(serverstatus);

        statusdiv.appendChild(img);
        statusdiv.appendChild(name);
        statusdiv.appendChild(status);
        document.getElementById('statustab').appendChild(statusdiv);
    }
}
