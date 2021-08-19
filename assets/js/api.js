export default class Api{
    constructor(hostname, port){
        this.hostname = hostname;
        this.port = port;
        this.token = this.getToken();
    }

    getToken(){
        return localStorage.getItem("auth");
    }

    refreshToken(){
        this.token = this.getToken();
    }

    async request(options){
        const self = this;
        self.refreshToken();

        let toReturn = { success: false, data: null };
        if(!self.token){ return toReturn; }

        await $.ajax({
            url: self.hostname+":"+self.port+"/api/"+options.route,
            type: options.method,
            dataType: options.method === "post" ? "json" : null,
            data: options.data ? options.data : null,
            beforeSend: function(request) {
                request.setRequestHeader('Authorization', 'Bearer '+self.token);
                request.setRequestHeader('Accept', 'application/json');
            },
            success: function(response){
                toReturn = { success: true, data: response };
            },
            error: function(response){
                toReturn = { success: false, data: null };
            }
        });

        return toReturn;
    }
}
