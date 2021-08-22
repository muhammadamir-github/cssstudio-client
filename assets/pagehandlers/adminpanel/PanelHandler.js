class PanelHandler{
    constructor(){
        this.infoBoxHandler = new InfoBoxHandler;
    }

    loadInfo(data, dataCategory){
        const self = this;
        if(dataCategory == 'general'){

            self.infoBoxHandler.newBox('crud_g_ib_1','crud_general','id','default');
            setTimeout(function(){ self.infoBoxHandler.populateBox('crud_g_ib_1',data,'general'); },2500);

            self.infoBoxHandler.newBox('crud_g_ib_2','crud_general','id','default');
            setTimeout(function(){ self.infoBoxHandler.populateBox('crud_g_ib_2',data,'location'); },2500);

            self.infoBoxHandler.newBox('crud_g_ib_3','crud_general','id','default');
            setTimeout(function(){ self.infoBoxHandler.populateBox('crud_g_ib_3',data,'money&tickets'); },2500);

        }

        if(dataCategory == 'histories'){

            self.infoBoxHandler.newBox('crud_a_ib_1','crud_activity','id','85%');
            setTimeout(function(){ self.infoBoxHandler.populateBox('crud_a_ib_1',data,'activity'); },2500);

            self.infoBoxHandler.newBox('crud_b_ib_1','crud_billing','id','85%');
            setTimeout(function(){ self.infoBoxHandler.populateBox('crud_b_ib_1',data,'billing'); },2500);

            self.infoBoxHandler.newBox('crud_l_ib_1','crud_logins','id','85%');
            setTimeout(function(){ self.infoBoxHandler.populateBox('crud_l_ib_1',data,'logins'); },2500);

        }
    }
}
