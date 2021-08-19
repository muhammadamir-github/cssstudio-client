const Globals = window.globals;

class StudioHandler{
    constructor(data){
        this.data = data;
        this.userInterface = new UserInterface;
        this.progressLoader = new ProgressLoader;
        this.elementPanel = new JadgetPanel;
    }

    setup(){
        const self = this;
        var callbilly = document.createElement('callbilly');
        var billyDiv = document.createElement('billy');

        var notesdiv = document.createElement('div');
        notesdiv.setAttribute('id','notes');

        billyDiv.innerHTML = '<tongue>Hey , how can i help you today?</tongue><orders><type data-panel-trigger="suggestion"><p>I would like to have a suggestion.</p><div class="billyspinner"></div></type><order class="suggestion"><p>Background Color</p></order><order class="suggestion"><p>Font Color</p></order></orders>';
        notesdiv.innerHTML = '<h6>We are sorry if you are facing any ux/ui problems.The software does not supports all small screen sizes.</h6><button id="ntsbtn">Okay</button>';

        document.getElementsByTagName('body')[0].appendChild(notesdiv);
        document.getElementsByTagName('body')[0].appendChild(callbilly);
        document.getElementsByTagName('body')[0].appendChild(billyDiv);

        let plan = self.data.plan;

        if(plan !== 'Free'){
          if(plan == 'Gold' || plan == 'Diamond' || plan == 'Silver'){
            var script1 = document.createElement('script');
            script1.setAttribute('src','../assets/js/animation.js');

            $('script')[0].after(script1);
          }
        }

        $("body").on("contextmenu",function(e){
            return false;
        });

        self.userInterface.greetUser();

        var notesbtn = document.getElementById('ntsbtn');

        notesbtn.addEventListener('click',function(){
          document.getElementById('notes').remove();
        });

        if(plan !== 'Free'){
          if(plan == 'Gold' || plan == 'Diamond'){
              self.getAnimations();
          }
        }
    }

    getAnimations(){
        var token = localStorage.getItem("auth");
        $.ajax({
                url:'http://localhost:8000/api/me/fetch/readymateanimations',
                type:'GET',
                beforeSend: function(request) {
                    request.setRequestHeader('Authorization', 'Bearer '+token);
                    request.setRequestHeader('Accept', 'application/json');
                },
                success: function(response){
                  animations = response.success;
                },
                error: function(response){
                  Globals.notificationHandler.new('Error, could not load animations. Please retry after some time.');
                }
        });
    }
}
