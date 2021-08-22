const Globals = window.globals;

class AdminPanelHandler{
    constructor(){
        this.token = localStorage.getItem("aauth");
        this.servers = new Servers;
        this.live = new Live;
        this.clock = new Clock;
        this.chartsHandler = new ChartsHandler;
        this.crudHandler = new CRUDHandler;
    }

    setup(){
        const self = this;
        self.token = localStorage.getItem("aauth");

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
        var searchusers = document.createElement('div');
        searchusers.setAttribute('id','searchu');

        var su_p = document.createElement('p');
        su_p.innerText = 'Waiting for your action....';

        var su_input = document.createElement('input');
        su_input.setAttribute('type','text');
        su_input.setAttribute('placeholder','Search Users...');
        su_input.addEventListener('keyup',function(e){
            if (e.keyCode == 13) {
                searchUsers(this.value);
                su_p.innerText = 'Searching...';
            }
        });

        var su_option1_label = document.createElement('label');
        var su_option1_input = document.createElement('input');
        su_option1_input.setAttribute('type','checkbox');
        su_option1_input.setAttribute('class','searchu_checkbox');
        su_option1_label.innerText = 'Username';

        var su_option2_label = document.createElement('label');
        var su_option2_input = document.createElement('input');
        su_option2_input.setAttribute('type','checkbox');
        su_option2_input.setAttribute('class','searchu_checkbox');
        su_option2_label.innerText = 'Email';

        var su_option3_label = document.createElement('label');
        var su_option3_input = document.createElement('input');
        su_option3_input.setAttribute('type','checkbox');
        su_option3_input.setAttribute('class','searchu_checkbox');
        su_option3_label.innerText = 'User Id';

        su_option1_label.appendChild(su_option1_input);
        su_option2_label.appendChild(su_option2_input);
        su_option3_label.appendChild(su_option3_input);

        var su_view_users_button = document.createElement('button');
        su_view_users_button.innerText = 'View Users';
        su_view_users_button.addEventListener('click',function(){
            self.fetchSearchedUsers(su_input.value);
        });

        su_view_users_button.style.opacity = '0.5';
        su_view_users_button.style.pointerEvents = 'none';

        searchusers.appendChild(su_input);
        searchusers.appendChild(su_p);
        searchusers.appendChild(su_option1_label);
        searchusers.appendChild(su_option2_label);
        searchusers.appendChild(su_option3_label);
        searchusers.appendChild(su_view_users_button);

        searchusers.style.display = 'none';
        searchusers.style.pointerEvents = 'none';

        $('#userstab').append(searchusers);

        //--------------------------------------

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 85){
                self.getUsers();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 81){
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
        if($('#searchu').length){
            if(document.getElementById('searchu').style.display !== 'block'){
                alert("Fetching users..");

                document.getElementById('userstab').style.opacity = '0.5';
                document.getElementById('userstab').style.pointerEvents = 'none';

                const response = await Globals.api.request({ route: `admin/users`, method: "get" });
                if(response.success === true){
                    self.loadUsers(response.data.success, '1');
                }else{
                    // window.location.href = '../login/index.html';
                }
            }
        }else{
            alert("Fetching users..");

            document.getElementById('userstab').style.opacity = '0.5';
            document.getElementById('userstab').style.pointerEvents = 'none';

            const response = await Globals.api.request({ route: `admin/users`, method: "get" });
            if(response.success === true){
                self.loadUsers(response.data.success, '1');
            }else{
                // window.location.href = '../login/index.html';
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
                }else{
                    // window.location.href = '../login/index.html';
                }
            }
        }else{

            alert("Fetching stats..");

            document.getElementById('statstab').style.opacity = '0.5';
            document.getElementById('statstab').style.pointerEvents = 'none';

            const response = await Globals.api.request({ route: `admin/stats`, method: "get" });
            if(response.success === true){
                self.loadStats(response.data.success);
            }else{
                // window.location.href = '../login/index.html';
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

    fetchSearchedUsers(value){
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

            var searchusers = document.createElement('div');
            searchusers.setAttribute('id','searchu');

            var su_p = document.createElement('p');
            su_p.innerText = 'Waiting for your action....';

            var su_input = document.createElement('input');
            su_input.setAttribute('type','text');
            su_input.setAttribute('placeholder','Search Users...');
            su_input.addEventListener('keyup',function(e){
                if (e.keyCode == 13) {
                    self.searchUsers(this.value);
                    su_p.innerText = 'Searching...';
                }
            });

            var su_option1_label = document.createElement('label');
            var su_option1_input = document.createElement('input');
            su_option1_input.setAttribute('type','checkbox');
            su_option1_input.setAttribute('class','searchu_checkbox');
            su_option1_label.innerText = 'Username';

            var su_option2_label = document.createElement('label');
            var su_option2_input = document.createElement('input');
            su_option2_input.setAttribute('type','checkbox');
            su_option2_input.setAttribute('class','searchu_checkbox');
            su_option2_label.innerText = 'Email';

            var su_option3_label = document.createElement('label');
            var su_option3_input = document.createElement('input');
            su_option3_input.setAttribute('type','checkbox');
            su_option3_input.setAttribute('class','searchu_checkbox');
            su_option3_label.innerText = 'User Id';

            su_option1_label.appendChild(su_option1_input);
            su_option2_label.appendChild(su_option2_input);
            su_option3_label.appendChild(su_option3_input);

            var su_view_users_button = document.createElement('button');
            su_view_users_button.innerText = 'View Users';
            su_view_users_button.addEventListener('click',function(){
                self.fetchSearchedUsers(su_input.value);
            });

            su_view_users_button.style.opacity = '0.5';
            su_view_users_button.style.pointerEvents = 'none';

            searchusers.appendChild(su_input);
            searchusers.appendChild(su_p);
            searchusers.appendChild(su_option1_label);
            searchusers.appendChild(su_option2_label);
            searchusers.appendChild(su_option3_label);
            searchusers.appendChild(su_view_users_button);

            searchusers.style.display = 'none';
            searchusers.style.pointerEvents = 'none';

        }

        for(var i=0; i < response.length; i++){
            var userdiv = document.createElement('div');
            userdiv.setAttribute('class','user');
            userdiv.setAttribute('data-id',response[i].id);
            userdiv.addEventListener('click',function(){
                self.crudHandler.setup('user',$(this).attr('data-id'));
            });

            var name = document.createElement('name');
            name.innerText = capitalizeFirstLetter(response[i].name);

            var span_plan = document.createElement('span');
            span_plan.setAttribute('class','plan');
            span_plan.innerText = capitalizeFirstLetter(response[i].plan) + ' User';

            if(response[i].plan == 'Bronze'){
                span_plan.style.backgroundColor = 'saddlebrown';
            }else{
                if(response[i].plan == 'Silver'){
                    span_plan.style.backgroundColor = 'silver';
                }else{
                    if(response[i].plan == 'Gold'){
                        span_plan.style.backgroundColor = 'goldenrod';
                    }else{
                        if(response[i].plan == 'Diamond'){
                            span_plan.style.backgroundColor = 'dimgray';
                        }
                    }
                }
            }

            var p_membersince = document.createElement('p');
            p_membersince.setAttribute('class','membersince');
            p_membersince.innerText = "Member Since: " + moment.utc(response[i].membersince).local().format("DD MMMM YY");

            var p_storage = document.createElement('p');
            p_storage.setAttribute('class','storage');
            p_storage.innerText = "Storage: " + response[i].storage;

            var p_country = document.createElement('p');
            p_country.setAttribute('class','country');
            p_country.innerText = "Country: " + response[i].country;

            var p_totalspending = document.createElement('p');
            p_totalspending.setAttribute('class','totalspending');
            p_totalspending.innerText = "Total Amount Spent: " + response[i].totalspending;

            var p_lastvisit = document.createElement('p');
            p_lastvisit.setAttribute('class','lastvisit');
            p_lastvisit.innerText = "Last Visit: " + moment(moment.utc(response[i].lastvisit)).fromNow();

            var p_expiringin = document.createElement('p');
            p_expiringin.setAttribute('class','expiringin');

            var expiresinmessage = moment(moment.utc(response[i].expiringin)).fromNow();

            if(expiresinmessage.includes('ago')){
                p_expiringin.innerText = "Membership expired " + expiresinmessage;
            }else{
                if(expiresinmessage.includes('in')){
                    p_expiringin.innerText = "Membership expires " + expiresinmessage;
                }
            }

            userdiv.appendChild(name);
            userdiv.appendChild(p_membersince);
            userdiv.appendChild(p_lastvisit);
            userdiv.appendChild(p_storage);
            userdiv.appendChild(p_country);
            userdiv.appendChild(p_totalspending);
            userdiv.appendChild(p_expiringin);
            userdiv.appendChild(span_plan);

            $('#userstab').append(searchusers);
            $('#userstab').append(userdiv);

        }
    }

    loadStats(response){
        const self = this;
        $('#statstab').empty();
        document.getElementById('statstab').style.opacity = '1';
        document.getElementById('statstab').style.pointerEvents = 'unset';

        Chart.defaults.global.defaultFontColor = 'black';

        self.chartsHandler.chart_planUpgrades(response.success.planupgrades);
        self.chartsHandler.chart_users(response.success.users);
        self.chartsHandler.chart_storage(response.success.storage);
        self.chartsHandler.chart_elementsDetailed(response.success.elements_detail);
        self.chartsHandler.chart_tickets(response.success.tickets);
        self.chartsHandler.chart_sales(response.success.sales);
        self.chartsHandler.chart_signups(response.success.users.new_users);
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

$(document).ready(function (){
    Globals.pageHandler = new AdminPanelHandler;

    if(localStorage.getItem('aauth') == null){
        window.location.href = '../';
    }else{
        Globals.pageHandler.setup();
    }
});

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
