const Globals = window.globals;

class NotificationsHandler{
    constructor(data){
        this.data = data;
    }

    setup(){
        const self = this;
        var heading = document.createElement('div');
        heading.setAttribute('class','ph');
        var heading_p = document.createElement('p');
        heading_p.innerText = 'Notifications';
        heading.appendChild(heading_p);

        var notifications = document.createElement('div');
        notifications.setAttribute('class','ntfs');

        var notificationsHeading = document.createElement('h6');
        notificationsHeading.innerText = 'Your Notifications';
        notificationsHeading.style.top = '0px';

        var notificationstable = document.createElement('table');
        notificationstable.setAttribute('cellpadding','0');
        notificationstable.setAttribute('cellspacing','0');
        var tablehead = document.createElement('thead');
        var tablehead_tr = document.createElement('tr');

        var tablehead_th1 = document.createElement('th');
        var tablehead_th2 = document.createElement('th');
        tablehead_th2.style.borderRight = '1px solid rgb(241, 241, 241)';
        var tablehead_th3 = document.createElement('th');
        tablehead_th3.style.borderRight = '1px solid rgb(241, 241, 241)';
        var tablehead_th4 = document.createElement('th');

        tablehead_th1.innerText = 'Subject';
        tablehead_th1.style.width  = '70%';
        tablehead_th2.innerText = 'Time';
        tablehead_th2.style.width  = '30%';

        tablehead_tr.appendChild(tablehead_th1);
        tablehead_tr.appendChild(tablehead_th2);
        tablehead.appendChild(tablehead_tr);
        notificationstable.appendChild(tablehead);

        var tablebody = document.createElement('tbody');

        for(var i=0; i < self.data.notifications.length; i++){
            var tr = document.createElement('tr');
            tr.setAttribute('data-tid', self.data.notifications[i].id);

            var th1 = document.createElement('td');
            th1.style.textAlign = "left";
            th1.style.paddingLeft = '10px';
            var th2 = document.createElement('td');
            th2.style.textAlign = "left";
            th2.style.paddingLeft = '10px';
            th2.style.verticalAlign = 'top'

            th1.innerText = self.data.notifications[i].notification;

            var datetimetext = moment.utc(self.data.notifications[i].created_at).local().format("dddd, MMMM Do YYYY, h:mm:ss a");
            var datetimeobjmoment = moment.utc(self.data.notifications[i].created_at);

            th2.innerText =  moment(datetimeobjmoment).fromNow();

            tr.appendChild(th1);
            tr.appendChild(th2);

            tablebody.appendChild(tr);
        }

        notificationstable.appendChild(tablebody);
        notifications.appendChild(notificationsHeading);
        notifications.appendChild(notificationstable);

        document.getElementsByTagName('body')[0].appendChild(heading);
        document.getElementsByTagName('body')[0].appendChild(notifications);
    }

    planExpired(response){
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

        //setUpPaypal(self.data);
        //document.getElementById('upgp').style.display = 'block';
        //document.getElementById('upgp').style.opacity = '1';
    }
}
