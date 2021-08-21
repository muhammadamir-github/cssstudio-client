const Globals = window.globals;

class SupportHandler{
    constructor(data){
        this.data = data;
    }

    setup(){
        const self = this;
        var heading = document.createElement('div');
        heading.setAttribute('class','ph');
        var heading_p = document.createElement('p');
        heading_p.innerText = 'Support';
        heading.appendChild(heading_p);

        var tickets = document.createElement('div');
        tickets.setAttribute('class','tkts');
        
        var ticketsHeading = document.createElement('h6');
        ticketsHeading.innerText = 'Your Tickets';
        ticketsHeading.style.top = '0px';

        var ticketstable = document.createElement('table');
        ticketstable.setAttribute('cellpadding','0');
        ticketstable.setAttribute('cellspacing','0');
        var tablehead = document.createElement('thead');
        var tablehead_tr = document.createElement('tr');

        var tablehead_th1 = document.createElement('th');
        var tablehead_th2 = document.createElement('th');
        tablehead_th2.style.borderRight = '1px solid rgb(241, 241, 241)';
        var tablehead_th3 = document.createElement('th');
        tablehead_th3.style.borderRight = '1px solid rgb(241, 241, 241)';
        var tablehead_th4 = document.createElement('th');

        tablehead_th1.innerText = 'Id';
        tablehead_th1.style.width  = '10%';
        tablehead_th2.innerText = 'Topic';
        tablehead_th2.style.width  = '40%';
        tablehead_th3.innerText = 'Status';
        tablehead_th3.style.width  = '10%';
        tablehead_th4.innerText = 'Time';
        tablehead_th4.style.width  = '40%';

        tablehead_tr.appendChild(tablehead_th1);
        tablehead_tr.appendChild(tablehead_th2);
        tablehead_tr.appendChild(tablehead_th3);
        tablehead_tr.appendChild(tablehead_th4);
        tablehead.appendChild(tablehead_tr);
        ticketstable.appendChild(tablehead);

        var tablebody = document.createElement('tbody');

        for(var i=0; i < self.data.tickets.length; i++){
            var tr = document.createElement('tr');
            tr.setAttribute('data-tid',self.data.tickets[i].id);

            if(self.data.tickets[i].status == 'Open'){

                tr.addEventListener('click',function(){
                    document.getElementsByTagName('replyticket')[0].style.opacity = 1;
                    document.getElementsByTagName('replyticket')[0].style.zIndex = 3;
                    document.getElementsByTagName('replyticket')[0].style.display = "block";
                    document.getElementsByTagName('replyticket')[0].setAttribute('data-tid',$(this).attr('data-tid'));
                    document.getElementsByClassName('tkts')[0].style.opacity = 0.5;
                    document.getElementsByClassName('tkts')[0].style.pointerEvents = "none";
                    document.getElementsByClassName('ntkt')[0].style.opacity = 0.5;
                    document.getElementsByClassName('ntkt')[0].style.pointerEvents = "none";
                    self.getreplies($(this).attr('data-tid'));
                });

            }else{

                tr.style.opacity = '0.3';
                tr.style.pointerEvents = 'none';

            }

            var th1 = document.createElement('td');
            var th2 = document.createElement('td');
            var th3 = document.createElement('td');
            var th4 = document.createElement('td');

            th1.innerText = self.data.tickets[i].id;
            th2.innerText = self.data.tickets[i].topic + " ("+self.data.tickets[i].category+")";
            th3.innerText = self.data.tickets[i].status;

            var datetimetext = moment.utc(self.data.tickets[i].created_at).local().format("dddd, MMMM Do YYYY, h:mm:ss a");
            var datetimeobjmoment = moment.utc(self.data.tickets[i].created_at);

            th4.innerText =  moment(datetimeobjmoment).fromNow();

            tr.appendChild(th1);
            tr.appendChild(th2);
            tr.appendChild(th3);
            tr.appendChild(th4);
            tablebody.appendChild(tr);
        }

        ticketstable.appendChild(tablebody);
        tickets.appendChild(ticketsHeading);
        tickets.appendChild(ticketstable);

        var newticket = document.createElement('div');
        newticket.setAttribute('class','ntkt');

        //-------Category--------

        var categories = document.createElement('combobox');
        categories.setAttribute('id','categories');
        categories.style.left = '0px';
        categories.style.top = '-50px';

        var categories_selected = document.createElement('selected');
        var categories_selected_a = document.createElement('a');
        var categories_selected_a_span = document.createElement('span');
        categories_selected_a_span.innerText = 'Category';

        var categories_options = document.createElement('options');
        var categories_options_ul = document.createElement('ul');

        //------------------Category Options--------------------
        //-------------------------1----------------------------

        var categories_options_1 = document.createElement('li');

        var categories_options_1_a = document.createElement('a');
        categories_options_1_a.innerText = 'Account';

        var categories_options_1_a_span = document.createElement('span');
        categories_options_1_a_span.innerText = 'Account';
        categories_options_1_a_span.setAttribute('class','value');

        categories_options_1_a.appendChild(categories_options_1_a_span);
        categories_options_1.appendChild(categories_options_1_a);

        categories_options_1_a.addEventListener('click',function(){
            self.changeCategory(categories_options_1_a.innerText);
        });

        //-------------------------2----------------------------

        var categories_options_2 = document.createElement('li');

        var categories_options_2_a = document.createElement('a');
        categories_options_2_a.innerText = 'Billing';

        var categories_options_2_a_span = document.createElement('span');
        categories_options_2_a_span.innerText = 'Billing';
        categories_options_2_a_span.setAttribute('class','value');

        categories_options_2_a.appendChild(categories_options_2_a_span);
        categories_options_2.appendChild(categories_options_2_a);

        categories_options_2_a.addEventListener('click',function(){
            self.changeCategory(categories_options_2_a.innerText);
        });

        //-------------------------3----------------------------

        var categories_options_3 = document.createElement('li');

        var categories_options_3_a = document.createElement('a');
        categories_options_3_a.innerText = 'Application/Software';

        var categories_options_3_a_span = document.createElement('span');
        categories_options_3_a_span.innerText = 'Application/Software';
        categories_options_3_a_span.setAttribute('class','value');

        categories_options_3_a.appendChild(categories_options_3_a_span);
        categories_options_3.appendChild(categories_options_3_a);

        categories_options_3_a.addEventListener('click',function(){
            self.changeCategory(categories_options_3_a.innerText);
        });

        //-------------------------4----------------------------

        var categories_options_4 = document.createElement('li');

        var categories_options_4_a = document.createElement('a');
        categories_options_4_a.innerText = 'Performance Issue';

        var categories_options_4_a_span = document.createElement('span');
        categories_options_4_a_span.innerText = 'Performance Issue';
        categories_options_4_a_span.setAttribute('class','value');

        categories_options_4_a.appendChild(categories_options_4_a_span);
        categories_options_4.appendChild(categories_options_4_a);

        categories_options_4_a.addEventListener('click',function(){
            self.changeCategory(categories_options_4_a.innerText);
        });

        //-------------------------5----------------------------

        var categories_options_5 = document.createElement('li');

        var categories_options_5_a = document.createElement('a');
        categories_options_5_a.innerText = 'Suggestion';

        var categories_options_5_a_span = document.createElement('span');
        categories_options_5_a_span.innerText = 'Suggestion';
        categories_options_5_a_span.setAttribute('class','value');

        categories_options_5_a.appendChild(categories_options_5_a_span);
        categories_options_5.appendChild(categories_options_5_a);

        categories_options_5_a.addEventListener('click',function(){
            self.changeCategory(categories_options_5_a.innerText);
        });

        //-------------------------6----------------------------

        var categories_options_6 = document.createElement('li');

        var categories_options_6_a = document.createElement('a');
        categories_options_6_a.innerText = 'Bug Report';
        categories_options_6_a.setAttribute('class','lastoption');

        var categories_options_6_a_span = document.createElement('span');
        categories_options_6_a_span.innerText = 'Bug Report';
        categories_options_6_a_span.setAttribute('class','value');

        categories_options_6_a.appendChild(categories_options_6_a_span);
        categories_options_6.appendChild(categories_options_6_a);

        categories_options_6_a.addEventListener('click',function(){
            self.changeCategory(categories_options_6_a.innerText);
        });

        //---------------Category Options End---------------------

        categories_selected_a.appendChild(categories_selected_a_span);
        categories_selected.appendChild(categories_selected_a);

        categories_options_ul.appendChild(categories_options_1);
        categories_options_ul.appendChild(categories_options_2);
        categories_options_ul.appendChild(categories_options_3);
        categories_options_ul.appendChild(categories_options_4);
        categories_options_ul.appendChild(categories_options_5);
        categories_options_ul.appendChild(categories_options_6);


        categories_options.appendChild(categories_options_ul);

        categories.appendChild(categories_selected);
        categories.appendChild(categories_options);

        //-----------------Event Handlers--------------------

        categories_selected_a_span.addEventListener('click',function(e){

            if(e.target == this){

                if(categories_options.style.display == 'block'){

                    categories_options.style.display = 'none';
                    categories_options_ul.style.display = 'none';
                    categories_selected_a_span.style.textAlign = '';

                }else{

                    categories_options.style.display = 'block';
                    categories_options_ul.style.display = 'block';
                    categories_selected_a_span.style.textAlign = 'left';

                }

            }else{

            }

        });

        //-------End Category--------


        var messageinput = document.createElement("textinput");
        messageinput.style.display = 'inline-block';
        messageinput.style.height = '150px';
        messageinput.style.width = '100%';
        messageinput.style.left = '0px';
        messageinput.style.marginTop = '75px';
        messageinput.style.outline = 'none';
        messageinput.style.border = '0px';

        var messageinput_label = document.createElement('label');
        messageinput_label.innerText = 'Message';
        messageinput_label.style.top = '4px';

        var messageinput_input = document.createElement('textarea');
        messageinput_input.style.height = '150px';
        messageinput_input.style.resize = 'none';
        messageinput_input.style.border = '1px solid white';
        messageinput_input.style.width = '97.5%';
        messageinput_input.style.paddingLeft = '10px';
        messageinput_input.style.paddingRight = '10px';
        messageinput_input.style.marginTop = '0px';
        messageinput_input.style.overflowX = 'hidden';
        messageinput_input.style.overflowY = 'scroll';
        messageinput_input.value = "Describe your issue in less than 100 words here...";
        messageinput_input.addEventListener('input',function(){
            //console.log(countWords(this.value));
        });

        var newticketbutton = document.createElement('button');
        var newticketbutton_i = document.createElement('i');
        newticketbutton_i.setAttribute('class','fab fa-telegram-plane');
        newticketbutton.innerText = 'Create New Ticket';
        newticketbutton.addEventListener('click',function(){
            self.addticket();
        });
        newticketbutton.appendChild(newticketbutton_i);

        messageinput.appendChild(messageinput_label);
        messageinput.appendChild(messageinput_input);

        newticket.appendChild(categories);
        newticket.appendChild(messageinput);
        newticket.appendChild(newticketbutton);

        var divlabel_createnewticket = document.createElement('divlabel');
        divlabel_createnewticket.innerText = "New Ticket";

        newticket.appendChild(divlabel_createnewticket);

        var replyticket = document.createElement('replyticket');

        var replyticketinput = document.createElement('input');
        replyticketinput.setAttribute('placeholder','Enter your message here...');
        replyticketinput.setAttribute('type','text');

        var replyticketbutton = document.createElement('button');
        replyticketbutton.innerText = 'Send';
        replyticketbutton.addEventListener('click',function(){
            self.reply($(replyticket).attr('data-tid'));
        });

        var replyticketclose = document.createElement('i');
        replyticketclose.setAttribute('class','fas fa-times close');
        replyticketclose.addEventListener('click',function(){
            replyticket.style.opacity = 0;
            replyticket.style.zIndex = 0;
            replyticket.style.display = "none";
            replyticket.setAttribute('data-tid','');
            replyticketinput.value = '';
            document.getElementsByClassName('tkts')[0].style.opacity = 1;
            document.getElementsByClassName('tkts')[0].style.pointerEvents = "unset";
            document.getElementsByClassName('ntkt')[0].style.opacity = 1;
            document.getElementsByClassName('ntkt')[0].style.pointerEvents = "unset";
        });

        replyticket.appendChild(replyticketclose);

        replyticket.appendChild(replyticketinput);
        replyticket.appendChild(replyticketbutton);

        document.getElementsByTagName('body')[0].appendChild(heading);
        document.getElementsByTagName('body')[0].appendChild(tickets);
        document.getElementsByTagName('body')[0].appendChild(newticket);
        document.getElementsByTagName('body')[0].appendChild(replyticket);
    }

    planExpired(){
        const self = this;
        document.getElementsByTagName('loader')[0].remove();
        var exatExpiry = moment(self.data.expires_at.substring(0,10)).format("dddd, MMMM Do YYYY");
        Globals.membershipHandler.notice('plan-expired',exatExpiry);

        setTimeout(function(){
            window.location.href = '../profile/';
        },7500);

        document.getElementsByTagName('head')[0].innerHTML += '<link rel="stylesheet" type="text/css" href="../assets/css/notice.css">';

        //var upgradeplan = document.createElement('div');
        //upgradeplan.setAttribute('id','upgp');

        //document.getElementsByTagName('body')[0].appendChild(upgradeplan);

        //setUpPaypal(response);
        //document.getElementById('upgp').style.display = 'block';
        //document.getElementById('upgp').style.opacity = '1';
    }

    changeCategory(text){
        document.getElementById('categories').getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText = 'Category: '+text;
        document.getElementById('categories').getElementsByTagName('options')[0]/*.getElementsByTagName('ul')[0]*/.style.display = 'none';
    }

    countWords(string) {
        var length = string.split(/[^\s]+/).length - 1;
        return length;
    };

    async getreplies(ticketid){
        var oldmessages = document.getElementsByTagName('replyticket')[0].getElementsByTagName('p');
        for(var i = oldmessages.length - 1; i >= 0; i--){
            oldmessages[i].remove();
        }

        const response = await Globals.api.request({ route: 'me/ticket/'+ticketid+'/replies', method: "get" });
        if(response.success === true){
            for(var i=0; i < response.data.success.length; i++){
                var p = document.createElement('p');
                p.innerText = response.data.success[i].text;

                var span = document.createElement('span');
                span.innerText = moment.utc(response.data.success[i].created_at).local().fromNow();

                if(i == 0){
                    p.style.marginTop = '35px';
                }

                if(response.data.requester_id == response.data.success[i].user_id){
                    p.setAttribute('class','pr');
                    p.style.backgroundColor = 'rgb(230, 115, 0, 0.5)';
                }else{
                    p.setAttribute('class','pl');
                }

                p.appendChild(span);
                document.getElementsByTagName('replyticket')[0].appendChild(p);
            }
        }else{
            Globals.notificationHandler.new('An error occured, please try reloading the conversation again.');
        }
    }

    async reply(tid){
        const self = this;
        var text = document.getElementsByTagName('replyticket')[0].getElementsByTagName('input')[0].value;
        const response = await Globals.api.request({ route: 'me/tickets/reply', method: "post", data: { 'ticket_id': tid , 'text': text } });
        if(response.success === true){
            if(response.data.message == 'Replied ticket successfully.'){
                self.updateChat(text);
            }
        }else{
            Globals.notificationHandler.new('An error occured, please try again later.');
        }
    }

    async addticket(){
        const self = this;
        var category = document.getElementById('categories').getElementsByTagName('selected')[0].getElementsByTagName('a')[0].getElementsByTagName('span')[0].innerText;
        var message = document.getElementsByClassName('ntkt')[0].getElementsByTagName('textinput')[0].getElementsByTagName('textarea')[0].value;

        category = category.split(':')[1];
        var topic = message.substring(0,40);

        if(self.countWords(message) == 0){
            Globals.notificationHandler.new('Error, please describe your issue.');
        }else{
            if(self.countWords(message) > 100){
                Globals.notificationHandler.new('Error, you can only describe your issue in 100 words.You have exceeded this limit by '+(self.countWords(message) - 100)+' words.');
            }else{
                const response = await Globals.api.request({ route: 'me/tickets/reply', method: "post", data: { 'topic': topic+"...", 'category': category, 'message': message } });
                if(response.success === true){
                    if(response.message == 'New ticket opened successfully.'){
                        location.reload(true);
                    }
                }else{
                    Globals.notificationHandler.new('An error occured, please try again later.');
                }
            }
        }
    }

    updateChat(text){
        var p = document.createElement('p');
        p.innerText = text;
        p.setAttribute('class','pr');
        p.style.backgroundColor = 'rgb(230, 115, 0, 0.5)';
        document.getElementsByTagName('replyticket')[0].appendChild(p);
    }
}
