class Live{
    constructor(){
        this.tableHandler = new TableHandler;
    }

    update(){
        const self = this;
        $.ajax({
            url:'https://api.cssstudio.co/api/admin/live',
            type:'get',
            beforeSend: function(request){
                request.setRequestHeader('Authorization','Bearer '+token);
                request.setRequestHeader('Accept','application/javascript');
            },
            success: function(response){
                self.show(response.success);
            },
        });
    }

    show(){
        const self = this;
        $('.live_table').remove();
        self.tableHandler.newTable('live_table_activity','live_table','Activity','livetab','id','user id/type/time');
        self.tableHandler.newTable('live_table_logins','live_table','Logins','livetab','id','user id/ip address/time');
        self.tableHandler.newTable('live_table_signups','live_table','Signups','livetab','id','user id/email/username/time');
        self.tableHandler.newTable('live_table_payments','live_table','Payments','livetab','id','user id/product/amount/time');
        self.tableHandler.newTable('live_table_tickets','live_table','Tickets','livetab','id','user id/topic/category/time');

        self.tableHandler.populateTable('live_table_activity',data.activity,'user_id/type/created_at');
        self.tableHandler.populateTable('live_table_logins',data.logins,'user_id/ip_address/created_at');
        self.tableHandler.populateTable('live_table_signups',data.signups,'id/email/username/created_at');
        self.tableHandler.populateTable('live_table_payments',data.billing,'user_id/product/amount/created_at');
        self.tableHandler.populateTable('live_table_tickets',data.tickets,'user_id/topic/category/created_at');
    }
}
