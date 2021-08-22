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
        var li = document.createElement('li');
        li.addEventListener('click',function(){
            self.showPanel(panelId);

            var lis = crud_ul.getElementsByTagName('li');

            for(var i =0; i < lis.length; i++){
                lis[i].style.paddingLeft = '0px';
            }

            li.style.paddingLeft = '20px';

        });

        li.innerText = text;
        self.crud_ul.appendChild(li);
    }

    addPanel(id){
        const self = this;
        var panel = document.createElement("div");
        panel.setAttribute('class','crud_panel');
        panel.setAttribute('id',id);

        self.crud.appendChild(panel);
        self.setupPanel(id);
    }

    showPanel(panelId){
        $('.crud_panel').css({'display':'none','pointer-events':'none'});
        document.getElementById(panelId).style.display = 'block';
        document.getElementById(panelId).style.pointerEvents = 'unset';
    }

    setupPanel(panelId){
        var panel = document.getElementById(panelId);
        panelIdSplit = panelId.split('_')[1];

        var panel_notice = document.createElement('span');
        panel_notice.setAttribute('class','crud_panel_notice');
        panel_notice.innerText = "You are viewing user's "+capitalizeFirstLetter(panelIdSplit);
        panel_notice.addEventListener('click',function(){
            this.remove();
        });

        panel.appendChild(panel_notice);
    }

    userInfo(uid, info){
        const self = this;
        var url = '';

        if(info == 'general'){
            url = 'https://api.cssstudio.co/api/admin/user/general';
        }

        if(info == 'histories'){
            url = 'https://api.cssstudio.co/api/admin/user/histories';
        }

        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            data: {'user_id':uid},
            beforeSend: function(request){
                request.setRequestHeader('Authorization','Bearer '+token);
                request.setRequestHeader('Accept','application/javascript');
            },
            success: function(response){
                self.panelHandler.loadInfo(response.success,info);
            }
        });
    }
}
