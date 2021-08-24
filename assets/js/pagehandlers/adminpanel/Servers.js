class Servers{
    constructor(){}

    status(){
        const self = this;
        const serverlist = [
            {
                ip: 'localhost',
                name:'Application Programming Interface',
            },
            {
                ip: 'localhost',
                name:'MySQL Database',
            },
        ];

        $('.server_status_box').remove();
        serverlist.forEach(x => {
            let test_image = Globals.elements.new({
                type: "img",
                parent: Globals.window.body,
                attributes: {
                    hidden: "",
                    src: "http://"+x.ip+"/assets/images/icon2.png"
                },
                listeners: {
                    load: function(){
                        self.showResult(x.ip, 'online', x.name);
                        this.remove();
                    },
                    error: function(){
                        self.showResult(x.ip, 'offline', x.name);
                        this.remove();
                    },
                }
            });
        });
    }

    showResult(ip, serverstatus, severname){
        var statusdiv = Globals.elements.new({
            type: "div",
            parent: document.getElementById('statustab'),
            classes: [ "server_status_box" ],
            children: [
                {
                    type: "img",
                    attributes: { src: '../assets/images/digitalocean.png' }
                },
                {
                    type: "p",
                    classes: [ "server_name" ],
                    text: capitalizeFirstLetter(severname)
                },
                {
                    type: "p",
                    classes: [ "server_status" ],
                    text: capitalizeFirstLetter(serverstatus),
                    style: {
                        backgroundColor: serverstatus == 'offline' ? "darkred" : "underline darkred",
                        textDecoration: serverstatus == 'offline' ? "darkgreen" : "underline darkgreen"
                    }
                }
            ]
        });
    }
}
