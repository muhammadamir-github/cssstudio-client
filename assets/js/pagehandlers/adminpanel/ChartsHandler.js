class ChartsHandler{
    constructor(){
        this.dataSorter = new DataSorter;
    }

    chart_signups(data){
        const self = this;
        var monthsyears = [];
        var values = [];

        Object.keys(data).forEach(function(key) {
            monthsyears.push(key.split('_')[0].substring(0,3)+key.split('_')[1].substring(2,4));
            values.push(data[key]);
        });

        var sorted_monthsyears_values = self.dataSorter.sortByMonthYear(monthsyears, values);
        var sorted_monthsyears = sorted_monthsyears_values[0];
        var sorted_values = sorted_monthsyears_values[1];

        var signups_box = Globals.elements.new({
            type: "box",
            parent: document.getElementById("statstab"),
            classes: [ "signups_box" ],
            style: {
                width: "40%",
                height: "350px",
                marginTop: "50px"
            },
            children: [
                {
                    type: "canvas",
                }
            ]
        });

        var signups_canvas = signups_box.getElementsByTagName("canvas")[0];
        var signups_ctx = signups_canvas.getContext('2d');

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

        var signups_chart = new Chart(signups_ctx, {
            type: 'bar',
            data: signups_data,
            options: signups_options
        });
    }

    chart_planUpgrades(data){
        var planUpgrades_box = Globals.elements.new({
            type: "box",
            parent: document.getElementById("statstab"),
            classes: [ "planUpgrades_box" ],
            style: {
                width: "40%",
                height: "350px",
                marginTop: "50px"
            },
            children: [
                {
                    type: "canvas",
                }
            ]
        });

        var planUpgrades_canvas = planUpgrades_box.getElementsByTagName("canvas")[0];
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
                        'rgba(181, 178, 177, 0.3)'
                    ],

                    hoverBackgroundColor: [
                        'rgba(140, 61, 5, 0.6)',
                        'rgba(91, 89, 88, 0.6)',
                        'rgba(249, 199, 47, 0.6)',
                        'rgba(181, 178, 177, 0.6)'
                    ],

                    data: [
                        data.bronze,
                        data.silver,
                        data.gold,
                        data.diamond,
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
    }

    chart_users(data){
        var users_box = Globals.elements.new({
            type: "box",
            parent: document.getElementById("statstab"),
            classes: [ "users_box" ],
            style: {
                width: "40%",
                height: "350px",
                marginTop: "50px"
            },
            children: [
                {
                    type: "canvas",
                }
            ]
        });

        var users_canvas = users_box.getElementsByTagName("canvas")[0];
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
                        data.free,
                        data.premium,
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
    }

    chart_elementsDetailed(data){
        var elements_detailed_box = Globals.elements.new({
            type: "box",
            parent: document.getElementById("statstab"),
            classes: [ "elements_detailed_box" ],
            style: {
                width: "40%",
                height: "350px",
                marginTop: "50px"
            },
            children: [
                {
                    type: "canvas",
                }
            ]
        });

        var elements_detailed_canvas = elements_detailed_box.getElementsByTagName("canvas")[0];
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
                        data.divs,
                        data.buttons,
                        data.textinputs,
                        data.textareas,
                        data.images,
                        data.videos,
                        data.headings,
                        data.paragraphs,
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

    chart_storage(data){
        var storage_box = Globals.elements.new({
            type: "box",
            parent: document.getElementById("statstab"),
            classes: [ "storage_box" ],
            style: {
                width: "40%",
                height: "350px",
                marginTop: "50px"
            },
            children: [
                {
                    type: "canvas",
                }
            ]
        });

        var storage_canvas = storage_box.getElementsByTagName("canvas")[0];
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
                        data.animations,
                        data.elements,
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
    }

    chart_tickets(data){
        var tickets_box = Globals.elements.new({
            type: "box",
            parent: document.getElementById("statstab"),
            classes: [ "tickets_box" ],
            style: {
                width: "40%",
                height: "350px",
                marginTop: "50px"
            },
            children: [
                {
                    type: "canvas",
                }
            ]
        });

        var tickets_canvas = tickets_box.getElementsByTagName("canvas")[0];
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
                        data.account,
                        data.billing,
                        data.application_software,
                        data.performance_issue,
                        data.suggestion,
                        data.bug_report,
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
    }

    chart_sales(data){
        const self = this;
        var monthsyears = [];
        var values = [];

        Object.keys(data).forEach(function(key) {
            monthsyears.push(key.split('_')[0].substring(0,3)+key.split('_')[1].substring(2,4));
            values.push(data[key]);
        });

        var sorted_monthsyears_values = self.dataSorter.sortByMonthYear(monthsyears, values);
        var sorted_monthsyears = sorted_monthsyears_values[0];
        var sorted_values = sorted_monthsyears_values[1];

        var sales_box = Globals.elements.new({
            type: "box",
            parent: document.getElementById("statstab"),
            classes: [ "sales_box" ],
            style: {
                width: "40%",
                height: "350px",
                marginTop: "50px"
            },
            children: [
                {
                    type: "canvas",
                }
            ]
        });

        var sales_canvas = sales_box.getElementsByTagName("canvas")[0];
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
    }
}
