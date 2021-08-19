const Globals = window.globals;

class BillingHandler{
    constructor(data){
        this.data = data;
    }

    setup(){
        const self = this;
        var heading = document.createElement('div');
        heading.setAttribute('class','ph');
        var heading_p = document.createElement('p');
        heading_p.innerText = 'Billing';
        heading.appendChild(heading_p);

        var p_totalspending_div = document.createElement('div');
        p_totalspending_div.setAttribute('class','ts');

        var p_totalspending = document.createElement('p');
        p_totalspending.innerText = 'You have spent '+self.data.total_spending+'$ till now.';
        p_totalspending_div.appendChild(p_totalspending);

        var billinghistory = document.createElement('profilebox');
        billinghistory.style.height = '1000px;';
        billinghistory.style.minHeight = 'min-content';
        //billinghistory.style.marginTop = '125px';

        var billinghistoryHeading = document.createElement('h6');
        billinghistoryHeading.innerText = 'Billing History';
        billinghistoryHeading.style.top = '0px';

        var table = document.createElement('table');
        table.setAttribute('cellpadding','0');
        table.setAttribute('cellspacing','0');
        var tablehead = document.createElement('thead');
        var tablehead_tr = document.createElement('tr');

        var tablehead_th1 = document.createElement('th');
        var tablehead_th2 = document.createElement('th');
        tablehead_th2.style.borderRight = '1px solid rgb(241, 241, 241)';
        var tablehead_th3 = document.createElement('th');
        tablehead_th3.style.borderRight = '1px solid rgb(241, 241, 241)';
        var tablehead_th4 = document.createElement('th');

        tablehead_th1.innerText = 'Description';
        tablehead_th1.style.width  = '50%';
        tablehead_th2.innerText = 'Amount';
        tablehead_th2.style.width  = '10%';
        tablehead_th3.innerText = 'Method';
        tablehead_th3.style.width  = '10%';
        tablehead_th4.innerText = 'Date & Time';
        tablehead_th4.style.width  = '30%';

        tablehead_tr.appendChild(tablehead_th1);
        tablehead_tr.appendChild(tablehead_th2);
        tablehead_tr.appendChild(tablehead_th3);
        tablehead_tr.appendChild(tablehead_th4);
        tablehead.appendChild(tablehead_tr);
        table.appendChild(tablehead);

        var tablebody = document.createElement('tbody');

        for(var i=0; i < self.data.payments.length; i++){
          var tr = document.createElement('tr');
          var th1 = document.createElement('td');
          var th2 = document.createElement('td');
          var th3 = document.createElement('td');
          var th4 = document.createElement('td');
          var th3icon = document.createElement('i');
          th3icon.style.fontSize = '30px';
          th1.innerText = 'Purchased ' + self.data.payments[i].product;
          th2.innerText = self.data.payments[i].amount + '$';

          if(self.data.payments[i].method == 'paypal'){
            th3icon.setAttribute('class','fab fa-paypal');
          }

          if(self.data.payments[i].method == 'card'){
            th3icon.setAttribute('class','fab fa-cc-visa');

            var th3icon2 = document.createElement('i');
            th3icon2.setAttribute('class','fab fa-cc-mastercard');
            th3icon2.style.fontSize = '30px';
            th3icon.style.marginLeft = '5px';
            th3.appendChild(th3icon2);
          }
          var datetimetext = moment.utc(self.data.payments[i].created_at).local().format("dddd, MMMM Do YYYY, h:mm:ss a");
          var datetimeobjmoment = moment.utc(self.data.payments[i].created_at);
          var now = moment.utc();
          th4.innerText =  moment(datetimeobjmoment).fromNow();
          tr.appendChild(th1);
          tr.appendChild(th2);
          tr.appendChild(th3);
          th3.appendChild(th3icon);
          tr.appendChild(th4);
          tablebody.appendChild(tr);
        }

        table.appendChild(tablebody);
        billinghistory.appendChild(billinghistoryHeading);
        billinghistory.appendChild(table);

        $('body').append(heading);
        $('body').append(p_totalspending_div);
        $('body').append(billinghistory);
    }

    planExpired(response){
        const self = this;
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
