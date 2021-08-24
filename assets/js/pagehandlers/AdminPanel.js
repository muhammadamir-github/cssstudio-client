const Globals = window.globals;

class AdminPanelHandler{
    constructor(){
        this.token = localStorage.getItem("aauth");
        this.servers = null;
        this.live = null;
        this.clock = null;
        this.chartsHandler = null;
        this.crudHandler = null;
    }

    setup(){
        const self = this;
        if(localStorage.getItem('aauth') == null){
            window.location.href = '../adminpanel/';
        }

        self.token = localStorage.getItem("aauth");
        self.servers = new Servers;
        self.live = new Live;
        self.clock = new Clock;
        self.chartsHandler = new ChartsHandler;
        self.crudHandler = new CRUDHandler;

        self.servers.status();
        setInterval(function(){ self.servers.status(); }, 60000);

        self.clock.update();
        setInterval(function(){ self.clock.update(); }, 1000);

        self.live.update();
        setInterval(function(){ self.live.update(); }, 60000);

        self.setupUI();
    }

    setupUI(){
        const self = this;

        var searchusers = Globals.elements.new({
            type: "div",
            parent: document.getElementById("userstab"),
            id: "searchu",
            style: {
                display: "none",
                pointerEvents: "none"
            },
            children: [
                {
                    type: "p",
                    text: "Waiting for your action...."
                },
                {
                    // su_input
                    type: "input",
                    attributes: {
                        type: "text",
                        placeholder: "Search Users..."
                    },
                    listeners: {
                        keyup: function(e){
                            if(e.keyCode == 13){
                                let su_p = this.parentElement.getElementsByTagName('p')[0];
                                self.searchUsers(this.value);
                                su_p.innerText = 'Searching...';
                            }
                        }
                    }
                },
                ...(() => {
                    return ["Username", "Email", "User Id"].map((x,i) => {
                        return {
                            type: "label",
                            text: x,
                            children: [
                                {
                                    type: "input",
                                    classes: [ "searchu_checkbox" ],
                                    attributes: { type: "checkbox" }
                                }
                            ]
                        }
                    });
                })(),
                {
                    type: "button",
                    text: "View Users",
                    style: {
                        opacity: "0.5",
                        pointerEvents: "none"
                    },
                    listeners: {
                        click: function(){
                            let su_input = this.parentElement.getElementsByTagName('input')[0];
                            self.fetchSearchedUsers(su_input.value);
                        }
                    }
                }
            ]
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 85){ // u
                self.getUsers();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 81){ // q
                self.getStatistics();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 70){ //f
                self.filterUsers('Free');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 65){ //a
                self.filterUsers('All');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 66){ //b
                self.filterUsers('Bronze');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 83){ //s
                self.filterUsers('Silver');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 71){ //g
                self.filterUsers('Gold');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 68){ //d
                self.filterUsers('Diamond');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 17){ //left ctrl
                if(document.getElementById('searchu').style.display == 'block'){
                    document.getElementById('searchu').style.display = 'none';
                    document.getElementById('searchu').style.pointerEvents = 'none';
                    $('#userstab').find('*').not('#searchu , input, label, button').css({'opacity':'1','pointer-events':'unset'});
                }else{
                    if(document.getElementById('searchu').style.display == 'none'){
                        document.getElementById('searchu').style.display = 'block';
                        document.getElementById('searchu').style.pointerEvents = 'unset';
                        $('#userstab').find('*').not('#searchu , input, label, button').css({'opacity':'0.5','pointer-events':'none'});
                    }
                }
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 27){ //esc
                if(document.getElementsByTagName('crud')[0].style.display == 'block'){
                    $('#controltab').find('*').not('crud').css({'opacity':'1','pointer-events':'unset'});
                    $('#navbar').css({'pointer-events':'unset'});
                    document.getElementsByTagName('crud')[0].style.display = 'none';
                    document.getElementsByTagName('crud')[0].style.pointerEvents = 'none';
                }
            }
        });
    }

    async getUsers(){
        const self = this;
        if($('#searchu').length){
            if(document.getElementById('searchu').style.display !== 'block'){
                alert("Fetching users..");

                document.getElementById('userstab').style.opacity = '0.5';
                document.getElementById('userstab').style.pointerEvents = 'none';

                const response = await Globals.api.request({ route: `admin/users`, method: "get" });
                if(response.success === true){
                    self.loadUsers(response.data.success, '1');
                }
            }
        }else{
            alert("Fetching users..");

            document.getElementById('userstab').style.opacity = '0.5';
            document.getElementById('userstab').style.pointerEvents = 'none';

            const response = await Globals.api.request({ route: `admin/users`, method: "get" });
            if(response.success === true){
                self.loadUsers(response.data.success, '1');
            }
        }
    }

    async getStatistics(){
        const self = this;
        if($('#searchu').length){
            if(document.getElementById('searchu').style.display !== 'block'){
                alert("Fetching stats..");

                document.getElementById('statstab').style.opacity = '0.5';
                document.getElementById('statstab').style.pointerEvents = 'none';

                const response = await Globals.api.request({ route: `admin/stats`, method: "get" });
                if(response.success === true){
                    self.loadStats(response.data.success);
                }
            }
        }else{

            alert("Fetching stats..");

            document.getElementById('statstab').style.opacity = '0.5';
            document.getElementById('statstab').style.pointerEvents = 'none';

            const response = await Globals.api.request({ route: `admin/stats`, method: "get" });
            if(response.success === true){
                self.loadStats(response.data.success);
            }
        }
    }

    async searchUsers(value){
        var su_option1_input = document.getElementsByClassName('searchu_checkbox')[0];
        var su_option2_input = document.getElementsByClassName('searchu_checkbox')[1];
        var su_option3_input = document.getElementsByClassName('searchu_checkbox')[2];
        document.getElementById('searchu').getElementsByTagName('button')[0].style.opacity = '0.5';
        document.getElementById('searchu').getElementsByTagName('button')[0].style.pointerEvents = 'none';

        var url = 'admin/search/users/count/'+value+'/u';

        if($(su_option1_input).is(':checked')){
            url = 'admin/search/users/count/'+value+'/u';
        }else {
            if($(su_option2_input).is(':checked')){
                url = 'admin/search/users/count/'+value+'/e';
            }else{
                if($(su_option3_input).is(':checked')){
                    url = 'admin/search/users/count/'+value+'/i';
                }
            }
        }

        if($(su_option1_input).is(':checked') && $(su_option2_input).is(':checked')){
            url = 'admin/search/users/count/'+value+'/ue';
        }

        if($(su_option1_input).is(':checked') && $(su_option3_input).is(':checked')){
            url = '';
        }

        if($(su_option2_input).is(':checked') && $(su_option3_input).is(':checked')){
            url = '';
        }

        if(url){
            const response = await Globals.api.request({ route: url, method: "get" });
            if(response.success === true){
                var msg = response.data.success.count + ' users found for keyword "'+response.data.success.keyword+'" .';
                document.getElementById('searchu').getElementsByTagName('p')[0].innerText = msg;
                document.getElementById('searchu').getElementsByTagName('button')[0].style.opacity = '1';
                document.getElementById('searchu').getElementsByTagName('button')[0].style.pointerEvents = 'unset';
            }else{
                var msg = 'Error occured while searching.';
                document.getElementById('searchu').getElementsByTagName('p')[0].innerText = msg;
            }
        }
    }

    async fetchSearchedUsers(value){
        const self = this;
        var su_option1_input = document.getElementsByClassName('searchu_checkbox')[0];
        var su_option2_input = document.getElementsByClassName('searchu_checkbox')[1];
        var su_option3_input = document.getElementsByClassName('searchu_checkbox')[2];

        var msg = 'Fetching information for each user...';
        document.getElementById('searchu').getElementsByTagName('p')[0].innerText = msg;

        var url = 'admin/search/users/'+value+'/u';

        if($(su_option1_input).is(':checked')){
            url = 'admin/search/users/'+value+'/u';
        }else {
            if($(su_option2_input).is(':checked')){
                url = 'admin/search/users/'+value+'/e';
            }else{
                if($(su_option3_input).is(':checked')){
                    url = 'admin/search/users/'+value+'/i';
                }
            }
        }

        if($(su_option1_input).is(':checked') && $(su_option2_input).is(':checked')){
            url = 'admin/search/users/'+value+'/ue';
        }

        if($(su_option1_input).is(':checked') && $(su_option3_input).is(':checked')){
            url = '';
        }

        if($(su_option2_input).is(':checked') && $(su_option3_input).is(':checked')){
            url = '';
        }

        if(url){
            const response = await Globals.api.request({ route: url, method: "get" });
            if(response.success === true){
                self.loadUsers(response.data.success.users, '0');
            }else{
                msg = 'Error occured while fetching...';
                document.getElementById('searchu').getElementsByTagName('p')[0].innerText = msg;
            }
        }
    }

    loadUsers(response,firsttime){
        const self = this;
        document.getElementById('userstab').style.opacity = '1';
        document.getElementById('userstab').style.pointerEvents = 'unset';

        $('.user').remove();

        if(firsttime == '0'){

            document.getElementById('searchu').style.display = 'none';
            document.getElementById('searchu').style.pointerEvents = 'none';
            $('#userstab').find('*').not('#searchu , input, label, button').css({'opacity':'1','pointer-events':'unset'});

        }

        if(firsttime == '1'){
            $('#searchu').remove();

            var searchusers = Globals.elements.new({
                type: "div",
                parent: document.getElementById("userstab"),
                id: "searchu",
                style: {
                    display: "none",
                    pointerEvents: "none"
                },
                children: [
                    {
                        type: "p",
                        text: "Waiting for your action...."
                    },
                    {
                        // su_input
                        type: "input",
                        attributes: {
                            type: "text",
                            placeholder: "Search Users..."
                        },
                        listeners: {
                            keyup: function(e){
                                if(e.keyCode == 13){
                                    let su_p = this.parentElement.getElementsByTagName('p')[0];
                                    self.searchUsers(this.value);
                                    su_p.innerText = 'Searching...';
                                }
                            }
                        }
                    },
                    ...(() => {
                        return ["Username", "Email", "User Id"].map((x,i) => {
                            return {
                                type: "label",
                                text: x,
                                children: [
                                    {
                                        type: "input",
                                        classes: [ "searchu_checkbox" ],
                                        attributes: { type: "checkbox" }
                                    }
                                ]
                            }
                        });
                    })(),
                    {
                        type: "button",
                        text: "View Users",
                        style: {
                            opacity: "0.5",
                            pointerEvents: "none"
                        },
                        listeners: {
                            click: function(){
                                let su_input = this.parentElement.getElementsByTagName('input')[0];
                                self.fetchSearchedUsers(su_input.value);
                            }
                        }
                    }
                ]
            });
        }

        for(var i=0; i < response.length; i++){
            var userdiv = Globals.elements.new({
                type: "div",
                parent: document.getElementById("userstab"),
                classes: [ "user" ],
                attributes: { "data-id": response[i].id },
                listeners: {
                    click: function(){
                        self.crudHandler.setup('user',$(this).attr('data-id'));
                    }
                },
                children: [
                    {
                        type: "name",
                        text: capitalizeFirstLetter(response[i].name)
                    },
                    {
                        type: "span",
                        classes: [ "plan" ],
                        text: capitalizeFirstLetter(response[i].plan) + ' User',
                        style: {
                            backgroundColor: response[i].plan == 'Bronze' ? "saddlebrown" : response[i].plan == 'Silver' ? "silver" : response[i].plan == 'Gold' ? "goldenrod" : response[i].plan == 'Diamond' ? "dimgray" : null
                        }
                    },
                    ...(() => {
                        let expiresinmessage = moment(moment.utc(response[i].expiringin)).fromNow();
                        return [
                            { text: "Member Since: " + moment.utc(response[i].membersince).local().format("DD MMMM YY"), class: "membersince" },
                            { text: "Storage: " + response[i].storage, class: "storage" },
                            { text: "Country: " + response[i].country, class: "country" },
                            { text: "Total Amount Spent: " + response[i].totalspending, class: "totalspending" },
                            { text: "Last Visit: " + moment(moment.utc(response[i].lastvisit)).fromNow(), class: "lastvisit" },
                            { text: expiresinmessage.includes('ago') ? "Membership expired " + expiresinmessage : "Membership expires " + expiresinmessage, class: "expiringin" }
                        ].map((x, i) => {
                            return {
                                type: "p",
                                text: x.text,
                                classes: [ x.class ]
                            }
                        });
                    })(),
                ]
            });
        }
    }

    loadStats(response){
        const self = this;
        $('#statstab').empty();
        document.getElementById('statstab').style.opacity = '1';
        document.getElementById('statstab').style.pointerEvents = 'unset';

        Chart.defaults.global.defaultFontColor = 'black';

        self.chartsHandler.chart_planUpgrades(response.planupgrades);
        self.chartsHandler.chart_users(response.users);
        self.chartsHandler.chart_storage(response.storage);
        self.chartsHandler.chart_elementsDetailed(response.elements_detail);
        self.chartsHandler.chart_tickets(response.tickets);
        self.chartsHandler.chart_sales(response.sales);
        self.chartsHandler.chart_signups(response.users.new_users);
    }

    filterUsers(filterPlan){
        if(document.getElementById('searchu').style.display !== 'block'){

            alert("Filtering users..");

            var users = document.getElementsByClassName('user');

            for(var i=0; i < users.length; i++){
                users[i].style.display = 'none';
            }

            if(filterPlan == 'All'){
                for(var i=0; i < users.length; i++){
                    users[i].style.display = 'inline-block';
                }
            }else{
                for(var i=0; i < users.length; i++){
                    var user_span = users[i].getElementsByTagName('span')[0];
                    if(user_span.innerText == filterPlan+' User'){
                        users[i].style.display = 'inline-block';
                    }
                }
            }

        }
    }
}

function switchTab(e){
    if(e.innerText == 'Users'){
        document.getElementById('userstab').style.display = 'block';
        document.getElementById('statstab').style.display = 'none';
        document.getElementById('statustab').style.display = 'none';
        document.getElementById('livetab').style.display = 'none';
    }else{
        if(e.innerText == 'Statistics'){
            document.getElementById('statstab').style.display = 'block';
            document.getElementById('userstab').style.display = 'none';
            document.getElementById('statustab').style.display = 'none';
            document.getElementById('livetab').style.display = 'none';
        }else{
            if(e.innerText == 'Servers'){
                document.getElementById('statstab').style.display = 'none';
                document.getElementById('userstab').style.display = 'none';
                document.getElementById('livetab').style.display = 'none';
                document.getElementById('statustab').style.display = 'block';
            }else{
                if(e.innerText == 'Live'){
                    document.getElementById('statstab').style.display = 'none';
                    document.getElementById('userstab').style.display = 'none';
                    document.getElementById('statustab').style.display = 'none';
                    document.getElementById('livetab').style.display = 'block';
                }
            }
        }
    }

    var lis = document.getElementById('navbar').getElementsByTagName('li');
    for(var i =0; i < lis.length; i++){
        lis[i].style.opacity = '0.8';
    }

    e.style.opacity = '1';
}

function capitalizeFirstLetter(string) {
    if(string.length > 2){
        return string.charAt(0).toUpperCase() + string.slice(1);
    }else{
        return string;
    }
}

function roundOff(n){
    return Math.round(n * 100) / 100;
}
