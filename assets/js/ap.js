var token = '';

$(document).ready(function (){

    if(localStorage.getItem('aauth') == null){
        window.location.href = '../';
    }else{

        token = localStorage.getItem("aauth");

        servers.status();
        setInterval(function(){servers.status();},60000);

        clock.update();
        setInterval(function(){clock.update();},1000);

        live.update();
        setInterval(function(){live.update();},60000);

        //--------------------------------------

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
            fetchSearchedUsers(su_input.value);
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
                getUsers();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 81){
                getStatistics();
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 70){ //f
                filterUsers('Free');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 65){ //a
                filterUsers('All');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 66){ //b
                filterUsers('Bronze');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 83){ //s
                filterUsers('Silver');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 71){ //g
                filterUsers('Gold');
            }
        });

        document.addEventListener('keydown', function(e) {
            if (e.keyCode == 68){ //d
                filterUsers('Diamond');
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

});

function getUsers(){

    if($('#searchu').length){
        if(document.getElementById('searchu').style.display !== 'block'){
            alert("Fetching users..");

            document.getElementById('userstab').style.opacity = '0.5';
            document.getElementById('userstab').style.pointerEvents = 'none';

            $.ajax({
                url:'https://api.cssstudio.co/api/admin/users',
                type:'GET',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization','Bearer '+token);
                    request.setRequestHeader('Accept','application/javascript');
                },
                success: function(response){
                    loadUsers(response.success,'1');
                },
                error: function(response){
                    // window.location.href = '../login/index.html';
                }
            });
        }
    }else{

        alert("Fetching users..");

        document.getElementById('userstab').style.opacity = '0.5';
        document.getElementById('userstab').style.pointerEvents = 'none';

        $.ajax({
            url:'https://api.cssstudio.co/api/admin/users',
            type:'GET',
            beforeSend: function(request){
                request.setRequestHeader('Authorization','Bearer '+token);
                request.setRequestHeader('Accept','application/javascript');
            },
            success: function(response){
                loadUsers(response.success,'1');
            },
            error: function(response){
                // window.location.href = '../login/index.html';
            }
        });

    }

}

function getStatistics(){

    if($('#searchu').length){
        if(document.getElementById('searchu').style.display !== 'block'){
            alert("Fetching stats..");

            document.getElementById('statstab').style.opacity = '0.5';
            document.getElementById('statstab').style.pointerEvents = 'none';

            $.ajax({
                url:'https://api.cssstudio.co/api/admin/stats',
                type:'GET',
                beforeSend: function(request){
                    request.setRequestHeader('Authorization','Bearer '+token);
                    request.setRequestHeader('Accept','application/javascript');
                },
                success: loadStats,
                error: function(response){
                    // window.location.href = '../login/index.html';
                }
            });
        }
    }else{

        alert("Fetching stats..");

        document.getElementById('statstab').style.opacity = '0.5';
        document.getElementById('statstab').style.pointerEvents = 'none';

        $.ajax({
            url:'https://api.cssstudio.co/api/admin/stats',
            type:'GET',
            beforeSend: function(request){
                request.setRequestHeader('Authorization','Bearer '+token);
                request.setRequestHeader('Accept','application/javascript');
            },
            success: loadStats,
            error: function(response){
                // window.location.href = '../login/index.html';
            }
        });

    }

}

function searchUsers(value){

    var su_option1_input = document.getElementsByClassName('searchu_checkbox')[0];
    var su_option2_input = document.getElementsByClassName('searchu_checkbox')[1];
    var su_option3_input = document.getElementsByClassName('searchu_checkbox')[2];
    document.getElementById('searchu').getElementsByTagName('button')[0].style.opacity = '0.5';
    document.getElementById('searchu').getElementsByTagName('button')[0].style.pointerEvents = 'none';

    var url = 'https://api.cssstudio.co/api/admin/search/users/count/'+value+'/u';

    if($(su_option1_input).is(':checked')){
        url = 'https://api.cssstudio.co/api/admin/search/users/count/'+value+'/u';
    }else {
        if($(su_option2_input).is(':checked')){
            url = 'https://api.cssstudio.co/api/admin/search/users/count/'+value+'/e';
        }else{
            if($(su_option3_input).is(':checked')){
                url = 'https://api.cssstudio.co/api/admin/search/users/count/'+value+'/i';
            }
        }
    }

    if($(su_option1_input).is(':checked') && $(su_option2_input).is(':checked')){
        url = 'https://api.cssstudio.co/api/admin/search/users/count/'+value+'/ue';
    }

    if($(su_option1_input).is(':checked') && $(su_option3_input).is(':checked')){
        url = '';
    }

    if($(su_option2_input).is(':checked') && $(su_option3_input).is(':checked')){
        url = '';
    }

    $.ajax({
        url:url,
        type:'GET',
        beforeSend: function(request){
            request.setRequestHeader('Authorization','Bearer '+token);
            request.setRequestHeader('Accept','application/javascript');
        },
        success: function(response){
            var msg = response.success.count + ' users found for keyword "'+response.success.keyword+'" .';
            document.getElementById('searchu').getElementsByTagName('p')[0].innerText = msg;
            document.getElementById('searchu').getElementsByTagName('button')[0].style.opacity = '1';
            document.getElementById('searchu').getElementsByTagName('button')[0].style.pointerEvents = 'unset';
        },
        error: function(response){
            var msg = 'Error occured while searching.';
            document.getElementById('searchu').getElementsByTagName('p')[0].innerText = msg;
        }
    });

}

function fetchSearchedUsers(value){

    var su_option1_input = document.getElementsByClassName('searchu_checkbox')[0];
    var su_option2_input = document.getElementsByClassName('searchu_checkbox')[1];
    var su_option3_input = document.getElementsByClassName('searchu_checkbox')[2];

    var msg = 'Fetching information for each user...';
    document.getElementById('searchu').getElementsByTagName('p')[0].innerText = msg;

    var url = 'https://api.cssstudio.co/api/admin/search/users/'+value+'/u';

    if($(su_option1_input).is(':checked')){
        url = 'https://api.cssstudio.co/api/admin/search/users/'+value+'/u';
    }else {
        if($(su_option2_input).is(':checked')){
            url = 'https://api.cssstudio.co/api/admin/search/users/'+value+'/e';
        }else{
            if($(su_option3_input).is(':checked')){
                url = 'https://api.cssstudio.co/api/admin/search/users/'+value+'/i';
            }
        }
    }

    if($(su_option1_input).is(':checked') && $(su_option2_input).is(':checked')){
        url = 'https://api.cssstudio.co/api/admin/search/users/'+value+'/ue';
    }

    if($(su_option1_input).is(':checked') && $(su_option3_input).is(':checked')){
        url = '';
    }

    if($(su_option2_input).is(':checked') && $(su_option3_input).is(':checked')){
        url = '';
    }

    $.ajax({
        url:url,
        type:'GET',
        beforeSend: function(request){
            request.setRequestHeader('Authorization','Bearer '+token);
            request.setRequestHeader('Accept','application/javascript');
        },
        success: function(response){
            loadUsers(response.success.users,'0');
        },
        error: function(response){
            msg = 'Error occured while fetching...';
            document.getElementById('searchu').getElementsByTagName('p')[0].innerText = msg;
        }
    });

}

function loadUsers(response,firsttime){

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
            fetchSearchedUsers(su_input.value);
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
            setupCrud('user',$(this).attr('data-id'));
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
                    }else{

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

function loadStats(response){

    $('#statstab').empty();
    document.getElementById('statstab').style.opacity = '1';
    document.getElementById('statstab').style.pointerEvents = 'unset';

    Chart.defaults.global.defaultFontColor = 'black';

    chart_planUpgrades(response.success.planupgrades);
    chart_users(response.success.users);
    chart_storage(response.success.storage);
    chart_elementsDetailed(response.success.elements_detail);
    chart_tickets(response.success.tickets);
    chart_sales(response.success.sales);
    chart_signups(response.success.users.new_users);

}

//--------Charts--------

function chart_signups(apiData){

    var monthsyears = [];
    var values = [];

    Object.keys(apiData).forEach(function(key) {
        monthsyears.push(key.split('_')[0].substring(0,3)+key.split('_')[1].substring(2,4));
        values.push(apiData[key]);
    });

    var sorted_monthsyears_values = sortData.chart.mmmyy_withvalues(monthsyears, values);
    var sorted_monthsyears = sorted_monthsyears_values[0];
    var sorted_values = sorted_monthsyears_values[1];

    var signups_box = document.createElement('box');
    signups_box.setAttribute('class','signups_box');
    signups_box.style.width = '40%';
    signups_box.style.height = '350px';
    signups_box.style.marginTop = '50px';

    var signups_canvas = document.createElement("canvas");
    var signups_ctx = signups_canvas.getContext('2d');

    console.log(monthsyears);
    console.log(values);

    var signups_data = {
        labels: [
            sorted_monthsyears[0],
            sorted_monthsyears[1],
            sorted_monthsyears[2],
            sorted_monthsyears[3],
            sorted_monthsyears[4],
            sorted_monthsyears[5],
            sorted_monthsyears[6],
            sorted_monthsyears[7],
            sorted_monthsyears[8],
            sorted_monthsyears[9],
            sorted_monthsyears[10],
            sorted_monthsyears[11],
            sorted_monthsyears[12],
        ],
        datasets: [
            {
                backgroundColor: 'rgba(249, 199, 47, 0.6)',
                hoverBackgroundColor: 'rgba(249, 199, 47, 0.6)',

                data: [
                    roundOff(sorted_values[0]),
                    roundOff(sorted_values[1]),
                    roundOff(sorted_values[2]),
                    roundOff(sorted_values[3]),
                    roundOff(sorted_values[4]),
                    roundOff(sorted_values[5]),
                    roundOff(sorted_values[6]),
                    roundOff(sorted_values[7]),
                    roundOff(sorted_values[8]),
                    roundOff(sorted_values[9]),
                    roundOff(sorted_values[10]),
                    roundOff(sorted_values[11]),
                    roundOff(sorted_values[12]),
                ],

                borderColor: 'white',
                borderWidth: 1,
            }
        ],
    };

    var signups_options = {
        responsive: true,
        maintainAspectRatio: true,
        barThickness: 0.1,

        title: {
            display: true,
            position: "top",
            text: "New Accounts (Signups)",
            fontSize: 20,
        },

        legend: { display: false },
    };

    var signups_chart = new Chart(signups_ctx,{
        type: 'bar',
        data: signups_data,
        options: signups_options
    });

    signups_box.appendChild(signups_canvas);
    $('#statstab').append(signups_box);

}

function chart_planUpgrades(apiData){

    var planUpgrades_box = document.createElement('box');
    planUpgrades_box.setAttribute('class','planUpgrades_box');
    planUpgrades_box.style.width = '40%';
    planUpgrades_box.style.height = '350px';
    planUpgrades_box.style.marginTop = '50px';

    var planUpgrades_canvas = document.createElement("canvas");
    var planUpgrades_ctx = planUpgrades_canvas.getContext('2d');

    var planUpgrades_data = {
        labels: [
            'Bronze Plan',
            'Silver Plan',
            'Gold Plan',
            'Diamond Plan',
        ],
        datasets: [
            {
                backgroundColor: [
                    'rgba(140, 61, 5, 0.3)',
                    'rgba(91, 89, 88, 0.3)',
                    'rgba(249, 199, 47, 0.3)',
                    'rgba(181, 178, 177, 0.3)'],

                    hoverBackgroundColor: [
                        'rgba(140, 61, 5, 0.6)',
                        'rgba(91, 89, 88, 0.6)',
                        'rgba(249, 199, 47, 0.6)',
                        'rgba(181, 178, 177, 0.6)'],

                        data: [
                            apiData.bronze,
                            apiData.silver,
                            apiData.gold,
                            apiData.diamond,
                        ],

                        borderColor: 'white',
                        borderWidth: 1,
                    }
                ],
            };

            var planUpgrades_options = {
                responsive: true,
                maintainAspectRatio: true,
                barThickness: 1,

                title: {
                    display: true,
                    position: "top",
                    text: "Plan Upgrades",
                    fontSize: 20,
                },

                legend: { display: false },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            stepSize: 2,
                        },
                    }],
                },
            };

            var planUpgrades_chart = new Chart(planUpgrades_ctx,{
                type: 'bar',
                data: planUpgrades_data,
                options: planUpgrades_options
            });

            planUpgrades_box.appendChild(planUpgrades_canvas);
            $('#statstab').append(planUpgrades_box);

        }

        function chart_users(apiData){

            var users_box = document.createElement('box');
            users_box.setAttribute('class','users_box');
            users_box.style.width = '40%';
            users_box.style.height = '350px';
            users_box.style.marginTop = '50px';

            var users_canvas = document.createElement("canvas");
            var users_ctx = users_canvas.getContext('2d');

            var users_data = {
                labels: [
                    'Free Users',
                    'Premium Users',
                ],
                datasets: [
                    {
                        backgroundColor: [
                            'rgba(79, 130, 3, 0.3)',
                            'rgba(2, 102, 209, 0.3)',
                        ],

                        hoverBackgroundColor: [
                            'rgba(79, 130, 3, 0.6)',
                            'rgba(2, 102, 209, 0.6)',
                        ],

                        data: [
                            apiData.free,
                            apiData.premium,
                        ],

                        borderColor: 'white',
                        borderWidth: 1,
                    }
                ],
            };

            var users_options = {
                responsive: true,
                maintainAspectRatio: true,
                barThickness: 1,

                title: {
                    display: true,
                    position: "top",
                    text: "Users",
                    fontSize: 20,
                },

                legend: { display: false },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            stepSize: 2,
                        },
                    }],
                },
            };

            var users_chart = new Chart(users_ctx,{
                type: 'bar',
                data: users_data,
                options: users_options
            });

            users_box.appendChild(users_canvas);
            $('#statstab').append(users_box);

        }

        function chart_storage(apiData){

            var storage_box = document.createElement('box');
            storage_box.setAttribute('class','storage_box');
            storage_box.style.width = '40%';
            storage_box.style.height = '350px';
            storage_box.style.marginTop = '50px';

            var storage_canvas = document.createElement("canvas");
            var storage_ctx = storage_canvas.getContext('2d');

            var storage_data = {
                labels: [
                    'Total Animations',
                    'Total Elements',
                ],
                datasets: [
                    {
                        backgroundColor: [
                            'rgba(68, 39, 198, 0.3)',
                            'rgba(239, 103, 216, 0.3)',
                        ],

                        hoverBackgroundColor: [
                            'rgba(68, 39, 198, 0.6)',
                            'rgba(239, 103, 216, 0.6)',
                        ],

                        data: [
                            apiData.animations,
                            apiData.elements,
                        ],

                        borderColor: 'white',
                        borderWidth: 1,
                    }
                ],
            };

            var storage_options = {
                responsive: true,
                maintainAspectRatio: true,
                barThickness: 1,

                title: {
                    display: true,
                    position: "top",
                    text: "Storage (Saved Items)",
                    fontSize: 20,
                },

                legend: { display: false },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            stepSize: 2,
                        },
                    }],
                },
            };

            var storage_chart = new Chart(storage_ctx,{
                type: 'bar',
                data: storage_data,
                options: storage_options
            });

            storage_box.appendChild(storage_canvas);
            $('#statstab').append(storage_box);

        }

        function chart_elementsDetailed(apiData){

            var elements_detailed_box = document.createElement('box');
            elements_detailed_box.setAttribute('class','elements_detailed_box');
            elements_detailed_box.style.width = '40%';
            elements_detailed_box.style.height = '350px';
            elements_detailed_box.style.marginTop = '50px';

            var elements_detailed_canvas = document.createElement("canvas");
            var elements_detailed_ctx = elements_detailed_canvas.getContext('2d');

            var elements_detailed_data = {
                labels: [
                    'Divs',
                    'Buttons',
                    'Textinputs',
                    'Textareas',
                    'Images',
                    'Videos',
                    'Headings',
                    'Paragraphs',
                ],
                datasets: [
                    {
                        backgroundColor: [
                            'rgba(244, 232, 66,0.3)',
                            'rgba(189, 234, 42,0.3)',
                            'rgba(59, 190, 247,0.3)',
                            'rgba(58, 50, 211,0.3)',
                            'rgba(210, 49, 60,0.3)',
                            'rgba(229, 105, 192,0.3)',
                            'rgba(237, 124, 37,0.3)',
                            'rgba(11, 196, 60,0.3)',
                        ],

                        hoverBackgroundColor: [
                            'rgba(244, 232, 66,0.6)',
                            'rgba(189, 234, 42,0.6)',
                            'rgba(59, 190, 247,0.6)',
                            'rgba(58, 50, 211,0.6)',
                            'rgba(210, 49, 60,0.6)',
                            'rgba(229, 105, 192,0.6)',
                            'rgba(237, 124, 37,0.6)',
                            'rgba(11, 196, 60,0.6)',
                        ],

                        data: [
                            apiData.divs,
                            apiData.buttons,
                            apiData.textinputs,
                            apiData.textareas,
                            apiData.images,
                            apiData.videos,
                            apiData.headings,
                            apiData.paragraphs,
                        ],

                        borderColor: 'white',
                        borderWidth: 1,
                    }
                ],
            };

            var elements_detailed_options = {
                responsive: true,
                maintainAspectRatio: true,
                barThickness: 0.1,

                title: {
                    display: true,
                    position: "top",
                    text: "Saved Elements (In Detail)",
                    fontSize: 20,
                },

                legend: { display: false },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            stepSize: 1,
                        },
                    }],
                },
            };

            var elements_detailed_chart = new Chart(elements_detailed_ctx,{
                type: 'bar',
                data: elements_detailed_data,
                options: elements_detailed_options
            });

            elements_detailed_box.appendChild(elements_detailed_canvas);
            $('#statstab').append(elements_detailed_box);

        }

        function chart_tickets(apiData){

            var tickets_box = document.createElement('box');
            tickets_box.setAttribute('class','tickets_box');
            tickets_box.style.width = '40%';
            tickets_box.style.height = '350px';
            tickets_box.style.marginTop = '50px';

            var tickets_canvas = document.createElement("canvas");
            var tickets_ctx = tickets_canvas.getContext('2d');

            var tickets_data = {
                labels: [
                    'Account',
                    'Billing',
                    'App/Software',
                    'Performance',
                    'Suggestion',
                    'Bug Report',
                ],
                datasets: [
                    {
                        backgroundColor: [
                            'rgba(229, 105, 192,0.3)',
                            'rgba(244, 232, 66,0.3)',
                            'rgba(189, 234, 42,0.3)',
                            'rgba(58, 50, 211,0.3)',
                            'rgba(59, 190, 247,0.3)',
                            'rgba(210, 49, 60,0.3)',
                        ],

                        hoverBackgroundColor: [
                            'rgba(229, 105, 192,0.6)',
                            'rgba(244, 232, 66,0.6)',
                            'rgba(189, 234, 42,0.6)',
                            'rgba(58, 50, 211,0.6)',
                            'rgba(59, 190, 247,0.6)',
                            'rgba(210, 49, 60,0.6)',
                        ],

                        data: [
                            apiData.account,
                            apiData.billing,
                            apiData.application_software,
                            apiData.performance_issue,
                            apiData.suggestion,
                            apiData.bug_report,
                        ],

                        borderColor: 'white',
                        borderWidth: 1,
                    }
                ],
            };

            var tickets_options = {
                responsive: true,
                maintainAspectRatio: true,
                barThickness: 0.1,

                title: {
                    display: true,
                    position: "top",
                    text: "Support Tickets",
                    fontSize: 20,
                },

                legend: { display: false },
                scales: {
                    yAxes: [{
                        ticks: {
                            min: 0,
                            stepSize: 1,
                        },
                    }],
                },
            };

            var tickets_chart = new Chart(tickets_ctx,{
                type: 'bar',
                data: tickets_data,
                options: tickets_options
            });

            tickets_box.appendChild(tickets_canvas);
            $('#statstab').append(tickets_box);

        }

        function chart_sales(apiData){

            var monthsyears = [];
            var values = [];

            Object.keys(apiData).forEach(function(key) {
                monthsyears.push(key.split('_')[0].substring(0,3)+key.split('_')[1].substring(2,4));
                values.push(apiData[key]);
            });

            var sorted_monthsyears_values = sortData.chart.mmmyy_withvalues(monthsyears, values);
            var sorted_monthsyears = sorted_monthsyears_values[0];
            var sorted_values = sorted_monthsyears_values[1];

            /*var sorted_monthsyears = monthsyears.sort((a,b)=>{
            a = a.replace(/(\d+)/g,' 1 $1');
            b = b.replace(/(\d+)/g,' 1 $1');
            return new Date(a) - new Date(b)
        })

        var sorted_values = monthsyears.reduce(function(a,b,c){
        var ind = sorted_monthsyears.indexOf(b);
        a[ind] = values[c]
        return a
    },[]);*/

    var sales_box = document.createElement('box');
    sales_box.setAttribute('class','sales_box');
    sales_box.style.width = '40%';
    sales_box.style.height = '350px';
    sales_box.style.marginTop = '50px';

    var sales_canvas = document.createElement("canvas");
    var sales_ctx = sales_canvas.getContext('2d');

    var sales_data = {
        labels: [
            sorted_monthsyears[0],
            sorted_monthsyears[1],
            sorted_monthsyears[2],
            sorted_monthsyears[3],
            sorted_monthsyears[4],
            sorted_monthsyears[5],
            sorted_monthsyears[6],
            sorted_monthsyears[7],
            sorted_monthsyears[8],
            sorted_monthsyears[9],
            sorted_monthsyears[10],
            sorted_monthsyears[11],
            sorted_monthsyears[12],
        ],
        datasets: [
            {
                backgroundColor: 'rgba(229, 105, 192,0.3)',
                hoverBackgroundColor: 'rgba(229, 105, 192,0.3)',

                data: [
                    roundOff(sorted_values[0]),
                    roundOff(sorted_values[1]),
                    roundOff(sorted_values[2]),
                    roundOff(sorted_values[3]),
                    roundOff(sorted_values[4]),
                    roundOff(sorted_values[5]),
                    roundOff(sorted_values[6]),
                    roundOff(sorted_values[7]),
                    roundOff(sorted_values[8]),
                    roundOff(sorted_values[9]),
                    roundOff(sorted_values[10]),
                    roundOff(sorted_values[11]),
                    roundOff(sorted_values[12]),
                ],

                borderColor: 'white',
                borderWidth: 1,
            }
        ],
    };

    var sales_options = {
        responsive: true,
        maintainAspectRatio: true,
        barThickness: 0.1,

        title: {
            display: true,
            position: "top",
            text: "Sales",
            fontSize: 20,
        },

        legend: { display: false },
        scales: {
            yAxes: [{
                barPercentage: 0.4,
                ticks: {
                    beginAtZero: true,
                    callback: function(value, index, values) {
                        if (parseInt(value) >= 1000) {
                            return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        } else {
                            return '$' + value;
                        }
                    }
                }
            }]
        },
        tooltips: {
            callbacks: {
                label: function(t, d) {
                    var yLabel = t.yLabel >= 1000 ?
                    '$' + t.yLabel.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") :
                    '$' + t.yLabel;
                    return yLabel + ' $';
                }
            }
        },
    };

    var sales_chart = new Chart(sales_ctx,{
        type: 'bar',
        data: sales_data,
        options: sales_options
    });

    sales_box.appendChild(sales_canvas);
    $('#statstab').append(sales_box);

}

//-----------------------

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

function filterUsers(filterPlan){

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

function setupCrud(model,uid){
    var crud = document.getElementsByTagName('crud')[0];
    var crud_ul = crud.getElementsByTagName('ul')[0];

    $(crud_ul).empty();
    $('.crud_panel').empty();

    crud.style.display = 'block';
    crud.style.pointerEvents = 'unset';

    $('#controltab').find('*').not('crud').css({'opacity':'0.5','pointer-events':'none'});
    $('#navbar').css({'pointer-events':'none'});

    if(model == 'user'){
        crudHandler.addPanel('crud_general');
        crudHandler.addPanel('crud_activity');
        crudHandler.addPanel('crud_billing');
        crudHandler.addPanel('crud_logins');
        crudHandler.addPanel('crud_user_actions');

        crudHandler.addLi('General','crud_general');
        crudHandler.addLi('Activity','crud_activity');
        crudHandler.addLi('Billing','crud_billing');
        crudHandler.addLi('Logins','crud_logins');
        crudHandler.addLi('Actions','crud_user_actions');

        user.info(uid,'general');
        user.info(uid,'histories');
        user.setUpactions(uid);
    }
}

//.............Handlers..............
//-----------------------------------

var crudHandler = (new function () {

    var crud = document.getElementsByTagName('crud')[0];
    var crud_ul = crud.getElementsByTagName('ul')[0];

    this.addLi = (function (text,panelId) {

        var li = document.createElement('li');
        li.addEventListener('click',function(){
            crudHandler.showPanel(panelId);

            var lis = crud_ul.getElementsByTagName('li');

            for(var i =0; i < lis.length; i++){
                lis[i].style.paddingLeft = '0px';
            }

            li.style.paddingLeft = '20px';

        });
        li.innerText = text;

        crud_ul.appendChild(li);
    });

    this.addPanel = (function(id) {
        var panel = document.createElement("div");
        panel.setAttribute('class','crud_panel');
        panel.setAttribute('id',id);

        crud.appendChild(panel);
        this.setupPanel(id);
    });

    this.showPanel = (function(panelId){
        $('.crud_panel').css({'display':'none','pointer-events':'none'});
        document.getElementById(panelId).style.display = 'block';
        document.getElementById(panelId).style.pointerEvents = 'unset';
    });

    this.setupPanel = (function(panelId){

        var panel = document.getElementById(panelId);
        panelIdSplit = panelId.split('_')[1];

        var panel_notice = document.createElement('span');
        panel_notice.setAttribute('class','crud_panel_notice');
        panel_notice.innerText = "You are viewing user's "+capitalizeFirstLetter(panelIdSplit);
        panel_notice.addEventListener('click',function(){
            this.remove();
        });

        if(panelIdSplit == 'general'){

        }

        panel.appendChild(panel_notice);

    })

});

//-----------------------------------

var panelHandler = (new function () {

    this.loadInfo = (function(data,dataCategory){

        if(dataCategory == 'general'){

            infoBoxHandler.newBox('crud_g_ib_1','crud_general','id','default');
            setTimeout(function(){ infoBoxHandler.populateBox('crud_g_ib_1',data,'general'); },2500);

            infoBoxHandler.newBox('crud_g_ib_2','crud_general','id','default');
            setTimeout(function(){ infoBoxHandler.populateBox('crud_g_ib_2',data,'location'); },2500);

            infoBoxHandler.newBox('crud_g_ib_3','crud_general','id','default');
            setTimeout(function(){ infoBoxHandler.populateBox('crud_g_ib_3',data,'money&tickets'); },2500);

        }

        if(dataCategory == 'histories'){

            infoBoxHandler.newBox('crud_a_ib_1','crud_activity','id','85%');
            setTimeout(function(){ infoBoxHandler.populateBox('crud_a_ib_1',data,'activity'); },2500);

            infoBoxHandler.newBox('crud_b_ib_1','crud_billing','id','85%');
            setTimeout(function(){ infoBoxHandler.populateBox('crud_b_ib_1',data,'billing'); },2500);

            infoBoxHandler.newBox('crud_l_ib_1','crud_logins','id','85%');
            setTimeout(function(){ infoBoxHandler.populateBox('crud_l_ib_1',data,'logins'); },2500);

        }

    });

});

//-----------------------------------

var tableHandler = (new function(){

    this.newTable = (function(tid,tclass,theading,appendTo,appendToType,columns){
        var table = document.createElement('table');
        table.setAttribute('class',tclass);
        table.setAttribute('id',tid);

        var table_heading = document.createElement('p');
        table_heading.setAttribute('id',tid+'_heading');
        table_heading.setAttribute('class','table_heading');
        table_heading.innerText = theading;

        var table_thead = document.createElement('thead');
        table_thead.setAttribute('id',tid+'_thead');

        var table_tbody = document.createElement('tbody');
        table_tbody.setAttribute('id',tid+'_tbody');

        table_head_tr = document.createElement('tr');

        var column_names = columns.split('/');
        table.appendChild(table_heading);

        for(var i=0; i < column_names.length; i++){
            var table_head_tr_th = document.createElement('th');
            table_head_tr_th.setAttribute('id',tid+'_th');
            table_head_tr_th.innerText = capitalizeFirstLetter(column_names[i]);
            table_head_tr.appendChild(table_head_tr_th);
        }
        table_thead.appendChild(table_head_tr);
        table.appendChild(table_thead);
        table.appendChild(table_tbody);

        if(appendToType == 'id'){
            document.getElementById(appendTo).appendChild(table);
        }else{
            if(appendToType == 'class'){
                document.getElementsByClassName(appendTo)[0].appendChild(table);
            }
        }

    });

    this.populateTable = (function(tid,data,columnsOrderWise){

        var tablebody = document.getElementById(tid).getElementsByTagName('tbody')[0];

        var splitted_columns = columnsOrderWise.split('/');

        for(var i=0; i < data.length; i++){
            var tr = document.createElement('tr');
            for(var x=0; x < splitted_columns.length; x++){
                var td = document.createElement('td');

                var valuetopick = splitted_columns[x];

                if(valuetopick == 'created_at'){
                    td.innerText = moment(moment.utc(data[i][valuetopick])).fromNow();
                }else{
                    td.innerText = data[i][valuetopick];
                }

                tr.appendChild(td);
            }
            tablebody.appendChild(tr);
        }

    });

});

//-----------------------------------

var user = (new function(info,uid){

    this.info = (function(uid,info){

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
                panelHandler.loadInfo(response.success,info);
            }
        });

    });

    this.setUpactions = (function(uid){

    });

});

//-----------------------------------

var infoBoxHandler = (new function(){

    this.newBox = (function(id,appendTo,appendToType,width){
        var box = document.createElement('div');
        box.setAttribute('class','crud_infoBox');
        box.setAttribute('id',id);

        if(width == 'default'){

        }else{
            box.style.width = width;
        }

        if(appendToType == 'id'){
            document.getElementById(appendTo).appendChild(box);
        }else{
            if(appendToType == 'class'){
                document.getElementsByClassName(appendTo)[0].appendChild(box);
            }
        }

    });

    this.populateBox = (function(boxId,data,dataCategory){

        if(dataCategory == 'general'){
            infoBoxHandler.addEntry(boxId,data.general.username,'username','0','0','default');
            infoBoxHandler.addEntry(boxId,data.general.email,'email','0','0','default');
            infoBoxHandler.addEntry(boxId,data.general.ip_address,'ip address','0','0','default');
            infoBoxHandler.addEntry(boxId,data.general.last_visit,'last visit','1','1','default');

            infoBoxHandler.addEntry(boxId,data.membership.membership_plan,'membership plan','0','0','default');
            infoBoxHandler.addEntry(boxId,data.membership.membership_expires_at,'membership expires/expired','1','1','default');

            infoBoxHandler.addEntry(boxId,data.items.storage_space,'storage','0','0','default');
            infoBoxHandler.addEntry(boxId,data.items.total_animations,'total animations','0','0','default');
            infoBoxHandler.addEntry(boxId,data.items.total_elements,'total elements','0','0','default');
        }

        if(dataCategory == 'money&tickets'){
            infoBoxHandler.addEntry(boxId,data.money.total_payments,'total payments','0','0','default');
            infoBoxHandler.addEntry(boxId,data.money.total_completed_payments,'total completed payments','0','0','default');
            infoBoxHandler.addEntry(boxId,data.money.total_money_spent,'total money spent','0','0','default');
            infoBoxHandler.addEntry(boxId,data.tickets.total_tickets_opened,'total tickets','0','0','default');
            infoBoxHandler.addEntry(boxId,data.tickets.total_tickets_opened - data.tickets.total_tickets_closed,'total tickets open','0','0','default');
            infoBoxHandler.addEntry(boxId,data.tickets.total_tickets_closed,'total tickets closed','0','0','default');
        }

        if(dataCategory == 'location'){
            infoBoxHandler.addEntry(boxId,data.location.continent,'continent','0','0','default');
            infoBoxHandler.addEntry(boxId,data.location.country,'country','0','0','default');
            infoBoxHandler.addEntry(boxId,data.location.location_latitude,'location latitude','0','0','default');
            infoBoxHandler.addEntry(boxId,data.location.location_longitude,'location longitude','0','0','default');
            infoBoxHandler.addEntry(boxId,data.location.region,'region','0','0','default');
            infoBoxHandler.addEntry(boxId,data.location.zip,'zip','0','0','default');
        }

        if(dataCategory == 'activity'){
            for(var i = 0; i < data.activity.length; i++){
                infoBoxHandler.addEntry(boxId,data.activity[i].type+' @ '+data.activity[i].created_at,i,'1','1','4px');
            }
        }

        if(dataCategory == 'billing'){
            for(var i = 0; i < data.billing.length; i++){
                infoBoxHandler.addEntry(boxId,'Purchased ' + data.billing[i].product + ' for ' + data.billing[i].amount + '$ . (' + capitalizeFirstLetter(data.billing[i].method) + ')' +' @ '+data.billing[i].created_at,i,'1','1','4px');
            }
        }

        if(dataCategory == 'logins'){
            for(var i = 0; i < data.logins.length; i++){
                infoBoxHandler.addEntry(boxId,data.logins[i].ip_address + ' (' + data.logins[i].country +')' +' @ '+data.logins[i].created_at,i,'1','1','4px');
            }
        }

    });

    this.addEntry = (function(boxId,text,key,datetime,futurePastCheck,padding){
        var entry = document.createElement('entry');

        if(padding == 'default'){

        }else{
            entry.style.padding = padding;
        }

        if(datetime == '1'){
            if(futurePastCheck == '1'){
                if(text.includes('@')){
                    var datetimeInTextFormat = text.split('@')[1];
                    var momentResult = moment(moment.utc(datetimeInTextFormat)).fromNow();
                }else{
                    var momentResult = moment(moment.utc(text)).fromNow();
                }
            }else{
                if(futurePastCheck == '0'){
                    if(text.includes('@')){
                        var datetimeInTextFormat = text.split('@')[1];
                        var momentResult = moment.utc(datetimeInTextFormat).local().format("dddd, MMMM Do YYYY");
                    }else{
                        var momentResult = moment.utc(text).local().format("dddd, MMMM Do YYYY");
                    }
                }
            }
            if(text.length > 2){
                if(text.includes('@')){
                    entry.innerHTML = '<i class="'+fontawesomeHandler.icon(key)+'"></i> ' + capitalizeFirstLetter(key) + ': '+ capitalizeFirstLetter(text.split('@')[0]) + ' @ ' + capitalizeFirstLetter(momentResult);
                }else{
                    entry.innerHTML = '<i class="'+fontawesomeHandler.icon(key)+'"></i> ' + capitalizeFirstLetter(key) + ': '+ capitalizeFirstLetter(momentResult);
                }
            }else{
                if(text.includes('@')){
                    entry.innerHTML = '<i class="'+fontawesomeHandler.icon(key)+'"></i> ' + capitalizeFirstLetter(key) + ': '+ capitalizeFirstLetter(text.split('@')[0]) + ' @ ' + momentResult;
                }else{
                    entry.innerHTML = '<i class="'+fontawesomeHandler.icon(key)+'"></i> ' + capitalizeFirstLetter(key) + ': '+ momentResult;
                }
            }
        }else{
            if(text.length > 2){
                entry.innerHTML = '<i class="'+fontawesomeHandler.icon(key)+'"></i> ' + capitalizeFirstLetter(key) + ': '+ capitalizeFirstLetter(text);
            }else{
                entry.innerHTML = '<i class="'+fontawesomeHandler.icon(key)+'"></i> ' + capitalizeFirstLetter(key) + ': '+ text;
            }
        }

        document.getElementById(boxId).appendChild(entry);
    });

});

//-----------------------------------

var fontawesomeHandler = new(function(){

    this.icon = (function(keyword){
        var Class = '';

        if(keyword == 'username'){
            Class = 'fas fa-signature';
        }

        if(keyword == 'email'){
            Class = 'fas fa-at';
        }

        if(keyword == 'ip address'){
            Class = 'fas fa-eye';
        }

        if(keyword == 'last visit'){
            Class = 'fas fa-person-booth';
        }

        if(keyword == 'storage'){
            Class = 'fas fa-archive';
        }

        if(keyword == 'total animations'){
            Class = 'fas fa-walking';
        }

        if(keyword == 'total elements'){
            Class = 'fas fa-vector-square';
        }

        if(keyword == 'membership plan'){
            Class = 'fas fa-trophy';
        }

        if(keyword == 'membership expires/expired'){
            Class = 'fas fa-calendar-day';
        }

        if(keyword == 'total completed payments'){
            Class = 'fas fa-cash-register';
        }

        if(keyword == 'total money spent'){
            Class = 'fas fa-money-check-alt';
        }

        if(keyword == 'total payments'){
            Class = 'fas fa-shopping-cart';
        }

        if(keyword == 'total tickets'){
            Class = 'fas fa-plus';
        }

        if(keyword == 'total tickets open'){
            Class = 'fas fa-spinner';
        }

        if(keyword == 'total tickets closed'){
            Class = 'fas fa-check';
        }

        if(keyword == 'continent'){
            Class = 'fas fa-globe-europe';
        }

        if(keyword == 'country'){
            Class = 'fas fa-flag';
        }

        if(keyword == 'region'){
            Class = 'fas fa-map-marked-alt';
        }

        if(keyword == 'zip'){
            Class = 'fas fa-map-marker-alt';
        }

        if(keyword == 'location latitude' || keyword == 'location longitude'){
            Class = 'fas fa-search-location';
        }

        return Class;
    });

});

//-----------------------------------

var servers = (new function(){

    this.status = (function(){

        var serverlist = [

            {
                ip:'api.cssstudio.co',
                name:'Application Programming Interface',
            },


            {
                ip:'159.65.152.65',
                name:'MySQL Database',
            },

        ];

        for(var i=0; i < serverlist.length; i++){

            $('.server_status_box').remove();

            (function(){

                var ip = serverlist[i].ip;
                var name = serverlist[i].name;

                var test_image = document.createElement('img');
                test_image.setAttribute('hidden','');
                test_image.src = "https://"+ip+"/favicon.png";

                test_image.onload = function() {
                    servers.showResult(ip,'online',name);
                    this.remove();
                }

                test_image.onerror = function() {
                    servers.showResult(ip,'offline',name);
                    this.remove();
                }
            })();
        }

    });

    this.showResult = (function(ip,serverstatus,severname){
        var statusdiv = document.createElement('div');
        statusdiv.setAttribute('class','server_status_box');

        var img = document.createElement('img');
        img.src = '../assets/images/digitalocean.png';

        var name = document.createElement('p');
        name.setAttribute('class','server_name');
        name.innerText = capitalizeFirstLetter(severname);

        var status = document.createElement('p');
        status.setAttribute('class','server_status');
        if(serverstatus == 'offline'){
            status.style.backgroundColor = 'darkred';
            status.style.textDecoration = 'underline darkred';
        }else{
            if(serverstatus == 'online'){
                status.style.backgroundColor = 'darkgreen';
                status.style.textDecoration = 'underline darkgreen';
            }
        }
        status.innerText = capitalizeFirstLetter(serverstatus);

        statusdiv.appendChild(img);
        statusdiv.appendChild(name);
        statusdiv.appendChild(status);
        document.getElementById('statustab').appendChild(statusdiv);
    });

});

//-----------------------------------

var live = (new function(){

    this.update = (function(){
        $.ajax({
            url:'https://api.cssstudio.co/api/admin/live',
            type:'get',
            beforeSend: function(request){
                request.setRequestHeader('Authorization','Bearer '+token);
                request.setRequestHeader('Accept','application/javascript');
            },
            success: function(response){
                live.show(response.success);
            },
        });
    });

    this.show = (function(data){
        $('.live_table').remove();
        tableHandler.newTable('live_table_activity','live_table','Activity','livetab','id','user id/type/time');
        tableHandler.newTable('live_table_logins','live_table','Logins','livetab','id','user id/ip address/time');
        tableHandler.newTable('live_table_signups','live_table','Signups','livetab','id','user id/email/username/time');
        tableHandler.newTable('live_table_payments','live_table','Payments','livetab','id','user id/product/amount/time');
        tableHandler.newTable('live_table_tickets','live_table','Tickets','livetab','id','user id/topic/category/time');

        tableHandler.populateTable('live_table_activity',data.activity,'user_id/type/created_at');
        tableHandler.populateTable('live_table_logins',data.logins,'user_id/ip_address/created_at');
        tableHandler.populateTable('live_table_signups',data.signups,'id/email/username/created_at');
        tableHandler.populateTable('live_table_payments',data.billing,'user_id/product/amount/created_at');
        tableHandler.populateTable('live_table_tickets',data.tickets,'user_id/topic/category/created_at');
    });

});

//-----------------------------------

var clock = (new function(){

    this.update = (function(){
        document.getElementById('clock').innerText = moment().utc().format('hh:mm:ss A');
    });

});

//-----------------------------------

var sortData = (new function(){

    this.chart = ( new function(){
        this.mmmyy_withvalues = (function(array1,array2){
            var indices = Object
            .keys(array1)
            .sort(function (a, b) {
                function getD(i) {
                    var months = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' },
                    s = array1[i];
                    return s.replace(/^(...)(.+)$/, (_, m, y) => [y.padStart(4, '0'), months[m]].join('-'));
                }
                return getD(a).localeCompare(getD(b));
            });

            [array1, array2].forEach(a => {
                var temp = indices.map(i => a[i]);
                a.length = 0;
                a.push(...temp);
            });

            return [array1,array2];
        });
    });

});

//...........End Handlers............
