const Globals = window.globals;

class SupportHandler{
    constructor(data){
        this.data = data;
    }

    setup(){
        const self = this;

        var heading = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "ph" ],
            children: [
                {
                    type: "p",
                    text: "Support"
                }
            ]
        });

        var tickets = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "tkts" ],
            children: [
                {
                    type: "h6",
                    text: "Your Tickets",
                    style: { top: "0px" }
                },
                {
                    type: "table",
                    attributes: {
                        cellpadding: 0,
                        cellspacing: 0
                    },
                    children: [
                        {
                            type: "thead",
                            children: [
                                {
                                    type: "tr",
                                    children: (() => {
                                        return ["Id", "Topic", "Status", "Time"].map((x, i) => {
                                            return { type: "th", text: x, style: { width: i === 3 ? "40%" : "10%" , borderRight: i === 1 || i === 2 ? "1px solid rgb(241, 241, 241)" : null } }
                                        });
                                    })(),
                                }
                            ]
                        },
                        {
                            type: "tbody",
                            children: (() => {
                                return self.data.tickets.map(ticket => {
                                    return {
                                        type: "tr",
                                        attributes: {
                                            "data-tid": ticket.id
                                        },
                                        style: ticket.status === "Open" ? null : { opacity: "0.3", pointerEvents: "none" },
                                        listeners: ticket.status === "Open" ? {
                                            click: function(e){
                                                document.getElementsByTagName('replyticket')[0].style.opacity = 1;
                                                document.getElementsByTagName('replyticket')[0].style.zIndex = 3;
                                                document.getElementsByTagName('replyticket')[0].style.display = "block";
                                                document.getElementsByTagName('replyticket')[0].setAttribute('data-tid',$(this).attr('data-tid'));
                                                document.getElementsByClassName('tkts')[0].style.opacity = 0.5;
                                                document.getElementsByClassName('tkts')[0].style.pointerEvents = "none";
                                                document.getElementsByClassName('ntkt')[0].style.opacity = 0.5;
                                                document.getElementsByClassName('ntkt')[0].style.pointerEvents = "none";
                                                self.getreplies($(this).attr('data-tid'));
                                            }
                                        } : null,
                                        children: (() => {
                                            return [ticket.id, `${ticket.topic} (${ticket.category})`, ticket.status, moment(moment.utc(ticket.created_at)).fromNow()].map(x => {
                                                return {
                                                    type: "td",
                                                    text: x
                                                }
                                            });
                                        })(),
                                    }
                                });
                            })(),
                        }
                    ]
                }
            ]
        });

        var newticket = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "ntkt" ],
            children: [
                {
                    type: "combobox",
                    id: "categories",
                    style: {
                        left: "0px",
                        top: "-50px"
                    },
                    children: [
                        {
                            type: "selected",
                            children: [
                                {
                                    type: "a",
                                    children: [
                                        {
                                            type: "span",
                                            text: "Category",

                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: "options",
                            children: [
                                {
                                    type: "ul",
                                    children: (() => {
                                        return ["Account", "Billing", "Application/Software", "Performance Issue", "Suggestion", "Bug Report"].map(option => {
                                            return {
                                                type: "li",
                                                children: [
                                                    {
                                                        type: "a",
                                                        text: option,
                                                        listeners: {
                                                            click: function(){
                                                                self.changeCategory(this.innerText);
                                                            }
                                                        },
                                                        children: [
                                                            {
                                                                type: "span",
                                                                text: option,
                                                                classes: [ "value" ],
                                                            }
                                                        ]
                                                    }
                                                ]
                                            }
                                        });
                                    })(),
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        var categories_selected = newticket.getElementsByTagName('selected')[0];
        var categories_selected_a = categories_selected.getElementsByTagName('a')[0];
        var categories_selected_a_span = categories_selected_a.getElementsByTagName('span')[0];

        var categories_options = newticket.getElementsByTagName('options')[0];
        var categories_options_ul = categories_options.getElementsByTagName('ul')[0];

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
            }
        });

        var messageinput = Globals.elements.new({
            type: "textinput",
            parent: newticket,
            style: {
                display: "inline-block",
                height: "150px",
                width: "100%",
                left: "0px",
                marginTop: "75px",
                outline: "none",
                border: "0px",
            },
            children: [
                {
                    type: "label",
                    text: "Message",
                    style: { top: "4px" }
                },
                {
                    type: "textarea",
                    text: "Describe your issue in less than 100 words here...",
                    style: {
                        height: "150px",
                        resize: "none",
                        border: "1px solid white",
                        width: "97.5%",
                        paddingLeft: "10px",
                        paddingRight: "10px",
                        marginTop: "0px",
                        overflowX: "hidden",
                        overflowY: "scroll",
                    },
                    attributes: {
                        value: "Describe your issue in less than 100 words here..."
                    },
                    listeners: {
                        input: function(){
                            //console.log(countWords(this.value));
                        }
                    }
                },
            ]
        });

        var newticketbutton = Globals.elements.new({
            type: "button",
            parent: newticket,
            text: "Create New Ticket",
            listeners: {
                click: function(){ self.addticket(); }
            },
            children: [
                {
                    type: "i",
                    classes: [ "fab", "fa-telegram-plane" ]
                }
            ]
        });

        var divlabel_createnewticket = Globals.elements.new({
            type: "divlabel",
            parent: newticket,
            text: "New Ticket"
        });

        var replyticket = Globals.elements.new({
            type: "replyticket",
            parent: Globals.window.body,
            children: [
                {
                    type: "input",
                    attributes: {
                        type: "text",
                        placeholder: "Enter your message here..."
                    }
                },
                {
                    type: "button",
                    text: "Send",
                    listeners: {
                        click: function(){ self.reply($(replyticket).attr('data-tid')); }
                    }
                },
                {
                    type: "i",
                    classes: [ "fas", "fa-times", "close" ],
                    listeners: {
                        click: function(){
                            let replyticketinput = this.parentElement.getElementsByTagName("input")[0];
                            replyticket.style.opacity = 0;
                            replyticket.style.zIndex = 0;
                            replyticket.style.display = "none";
                            replyticket.setAttribute('data-tid','');
                            replyticketinput.value = '';
                            document.getElementsByClassName('tkts')[0].style.opacity = 1;
                            document.getElementsByClassName('tkts')[0].style.pointerEvents = "unset";
                            document.getElementsByClassName('ntkt')[0].style.opacity = 1;
                            document.getElementsByClassName('ntkt')[0].style.pointerEvents = "unset";
                        }
                    }
                }
            ]
        });
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
                var message = Globals.elements.new({
                    type: "p",
                    parent: document.getElementsByTagName('replyticket')[0],
                    text: response.data.success[i].text,
                    classes: response.data.requester_id == response.data.success[i].user_id ? [ "pr" ] : [ "pl" ],
                    style: {
                        marginTop: i === 0 ? "35px" : null,
                        backgroundColor: response.data.requester_id == response.data.success[i].user_id ? "rgb(230, 115, 0, 0.5)" : null,
                    },
                    children: [
                        {
                            type: "span",
                            text: moment.utc(response.data.success[i].created_at).local().fromNow(),
                        }
                    ]
                });
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
        var message = Globals.elements.new({
            type: "p",
            parent: document.getElementsByTagName('replyticket')[0],
            text,
            classes: [ "pr" ],
            style: {
                backgroundColor: "rgb(230, 115, 0, 0.5)",
            }
        })
    }
}
