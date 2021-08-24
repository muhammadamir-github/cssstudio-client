class CRUDHandler{
    constructor(){
        this.crud = document.getElementsByTagName('crud')[0];
        this.crud_ul = this.crud.getElementsByTagName('ul')[0];
        this.panelHandler = new PanelHandler;
    }

    setup(model, uid){
        const self = this;

        $(self.crud_ul).empty();
        $('.crud_panel').empty();

        self.crud.style.display = 'block';
        self.crud.style.pointerEvents = 'unset';

        $('#controltab').find('*').not('crud').css({'opacity':'0.5','pointer-events':'none'});
        $('#navbar').css({'pointer-events':'none'});

        if(model == 'user'){
            self.addPanel('crud_general');
            self.addPanel('crud_activity');
            self.addPanel('crud_billing');
            self.addPanel('crud_logins');
            self.addPanel('crud_user_actions');

            self.addLi('General','crud_general');
            self.addLi('Activity','crud_activity');
            self.addLi('Billing','crud_billing');
            self.addLi('Logins','crud_logins');
            self.addLi('Actions','crud_user_actions');

            self.userInfo(uid,'general');
            self.userInfo(uid,'histories');
        }
    }

    addLi(text, panelId){
        const self = this;

        var li = Globals.elements.new({
            type: "li",
            parent: self.crud_ul,
            text,
            listeners: {
                click: function(){
                    self.showPanel(panelId);

                    var lis = self.crud_ul.getElementsByTagName('li');
                    for(var i =0; i < lis.length; i++){
                        lis[i].style.paddingLeft = '0px';
                    }

                    this.style.paddingLeft = '20px';
                }
            }
        });
    }

    addPanel(id){
        const self = this;
        var panel = Globals.elements.new({
            type: "div",
            parent: self.crud,
            classes: [ "crud_panel" ],
            id
        });

        self.setupPanel(id);
    }

    showPanel(panelId){
        $('.crud_panel').css({'display':'none','pointer-events':'none'});
        document.getElementById(panelId).style.display = 'block';
        document.getElementById(panelId).style.pointerEvents = 'unset';
    }

    setupPanel(panelId){
        var panel = document.getElementById(panelId);
        var panelIdSplit = panelId.split('_')[1];

        var panel_notice = Globals.elements.new({
            type: "span",
            parent: panel,
            classes: [ "crud_panel_notice" ],
            text: "You are viewing user's "+capitalizeFirstLetter(panelIdSplit),
            listeners: {
                click: function(){
                    this.remove();
                }
            }
        });
    }

    async userInfo(uid, info){
        const self = this;
        var url = '';

        if(info == 'general'){
            url = 'admin/user/general';
        }

        if(info == 'histories'){
            url = 'admin/user/histories';
        }

        if(url){
            const response = await Globals.api.request({ route: url, method: "post", data: {'user_id':uid} });
            if(response.success === true){
                self.panelHandler.loadInfo(response.data.success, info);
            }
        }
    }
}
