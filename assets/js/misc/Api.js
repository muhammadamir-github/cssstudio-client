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
        if(!tokenToUse && options.route !== "login" && options.route !== "admin/login"){ return toReturn; }

        await $.ajax({
            url: self.hostname+":"+self.port+"/api/"+options.route,
            type: options.method,
            dataType: options.method === "post" ? "json" : null,
            data: options.data ? options.data : null,
            processData: typeof options.data === "FORMDATA" ? false : true,
            contentType: typeof options.data === "FORMDATA" ? false : 'application/x-www-form-urlencoded; charset=UTF-8', // ajax default = 'application/x-www-form-urlencoded; charset=UTF-8'
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
