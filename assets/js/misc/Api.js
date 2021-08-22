export default class Api{
    constructor(hostname, port){
        this.hostname = hostname;
        this.port = port;
        this.token = this.getToken(false);
        this.adminToken = this.getToken(true);
    }

    getToken(admins){
        return localStorage.getItem(`${admins === true ? 'a' : ''}auth`);
    }

    refreshToken(){
        this.token = this.getToken(false);
        this.adminToken = this.getToken(true);
    }

    async request(options){
        const self = this;
        self.refreshToken();

        const tokenToUse = options.route.startsWith("admin") ? self.adminToken : self.token;

        let toReturn = { success: false, data: null };
        if(!tokenToUse){ return toReturn; }

        await $.ajax({
            url: self.hostname+":"+self.port+"/api/"+options.route,
            type: options.method,
            dataType: options.method === "post" ? "json" : null,
            data: options.data ? options.data : null,
            processData: false,
            contentType: false,
            beforeSend: function(request) {
                request.setRequestHeader('Authorization', 'Bearer '+tokenToUse);
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
