class PaypalHandler{
    constructor(data){
        this.data = data;
    }

    setup(){
        const self = this;

        var referralcode = document.createElement('input');
        referralcode.setAttribute('type','text');
        referralcode.setAttribute('placeholder','Referral/Discount Code');
        referralcode.setAttribute('class','refcode');
        referralcode.setAttribute('maxlength','8');
        referralcode.addEventListener('input',function(){
          if(this.value.length == '8'){
            self.checkReferralCode(this.value);
          }
        });

        var bronzeplan = document.createElement('membershipplan');
        var silverplan = document.createElement('membershipplan');
        var goldplan = document.createElement('membershipplan');
        var diamondplan = document.createElement('membershipplan');

        var bronzeplan_price = document.createElement('span');
        var silverplan_price = document.createElement('span');
        var goldplan_price = document.createElement('span');
        var diamondplan_price = document.createElement('span');

        bronzeplan_price.innerText = '4.99 $';
        silverplan_price.innerText = '9.99 $';
        goldplan_price.innerText = '19.99 $';
        diamondplan_price.innerText = '44.99 $';

        bronzeplan.setAttribute('data-plan','Bronze');
        silverplan.setAttribute('data-plan','Silver');
        goldplan.setAttribute('data-plan','Gold');
        diamondplan.setAttribute('data-plan','Diamond');

        bronzeplan.appendChild(bronzeplan_price);
        silverplan.appendChild(silverplan_price);
        goldplan.appendChild(goldplan_price);
        diamondplan.appendChild(diamondplan_price);

        bronzeplan.addEventListener('click',function(){
          silverplan.classList.remove('selectedplan');
          goldplan.classList.remove('selectedplan');
          diamondplan.classList.remove('selectedplan');
          this.classList.add('selectedplan');
        });
        silverplan.addEventListener('click',function(){
          bronzeplan.classList.remove('selectedplan');
          goldplan.classList.remove('selectedplan');
          diamondplan.classList.remove('selectedplan');
          this.classList.add('selectedplan');
        });
        goldplan.addEventListener('click',function(){
          bronzeplan.classList.remove('selectedplan');
          silverplan.classList.remove('selectedplan');
          diamondplan.classList.remove('selectedplan');
          this.classList.add('selectedplan');
        });
        diamondplan.addEventListener('click',function(){
          bronzeplan.classList.remove('selectedplan');
          silverplan.classList.remove('selectedplan');
          goldplan.classList.remove('selectedplan');
          this.classList.add('selectedplan');
        });


        var bronzeplan_p_heading = document.createElement('p');
        bronzeplan_p_heading.setAttribute('class','heading');
        bronzeplan_p_heading.innerText = 'Bronze Plan';

        var bronzeplan_ul = document.createElement('ul');
        var bronzeplan_ul_li_1 = document.createElement('li');
        var bronzeplan_ul_li_2 = document.createElement('li');
        var bronzeplan_ul_li_3 = document.createElement('li');
        var bronzeplan_ul_li_4 = document.createElement('li');
        var bronzeplan_ul_li_5 = document.createElement('li');
        var bronzeplan_ul_li_6 = document.createElement('li');

        var bronzeplan_ul_li_1_icon = document.createElement('i');
        var bronzeplan_ul_li_2_icon = document.createElement('i');
        var bronzeplan_ul_li_3_icon = document.createElement('i');
        var bronzeplan_ul_li_4_icon = document.createElement('i');
        var bronzeplan_ul_li_5_icon = document.createElement('i');
        var bronzeplan_ul_li_6_icon = document.createElement('i');

        bronzeplan_ul_li_1.innerText = 'Access to element creator. (1 Month) ';
        bronzeplan_ul_li_2.innerText = 'Save upto 10 items in storage. ';
        bronzeplan_ul_li_3.innerText = 'Ability to open support tickets. ';
        bronzeplan_ul_li_4.innerText = 'Access to element animator. (1 Month) ';
        bronzeplan_ul_li_5.innerText = 'Ability to use premium ready made animations. ';
        bronzeplan_ul_li_6.innerText = 'Save maxium 0 animations a day. ';

        bronzeplan_ul_li_1_icon.setAttribute('class','fas fa-check');
        bronzeplan_ul_li_2_icon.setAttribute('class','fas fa-check');
        bronzeplan_ul_li_3_icon.setAttribute('class','fas fa-check');
        bronzeplan_ul_li_4_icon.setAttribute('class','fas fa-times');
        bronzeplan_ul_li_5_icon.setAttribute('class','fas fa-times');
        bronzeplan_ul_li_6_icon.setAttribute('class','fas fa-times');

        bronzeplan_ul_li_1.appendChild(bronzeplan_ul_li_1_icon);
        bronzeplan_ul_li_2.appendChild(bronzeplan_ul_li_2_icon);
        bronzeplan_ul_li_3.appendChild(bronzeplan_ul_li_3_icon);
        bronzeplan_ul_li_4.appendChild(bronzeplan_ul_li_4_icon);
        bronzeplan_ul_li_5.appendChild(bronzeplan_ul_li_5_icon);
        bronzeplan_ul_li_6.appendChild(bronzeplan_ul_li_6_icon);

        bronzeplan_ul.appendChild(bronzeplan_ul_li_1);
        bronzeplan_ul.appendChild(bronzeplan_ul_li_2);
        bronzeplan_ul.appendChild(bronzeplan_ul_li_3);
        bronzeplan_ul.appendChild(bronzeplan_ul_li_4);
        bronzeplan_ul.appendChild(bronzeplan_ul_li_6);
        bronzeplan_ul.appendChild(bronzeplan_ul_li_5);

        bronzeplan.appendChild(bronzeplan_p_heading);
        bronzeplan.appendChild(bronzeplan_ul);

        var silverplan_p_heading = document.createElement('p');
        silverplan_p_heading.setAttribute('class','heading');
        silverplan_p_heading.innerText = 'Silver Plan';

        var silverplan_ul = document.createElement('ul');
        var silverplan_ul_li_1 = document.createElement('li');
        var silverplan_ul_li_2 = document.createElement('li');
        var silverplan_ul_li_3 = document.createElement('li');
        var silverplan_ul_li_4 = document.createElement('li');
        var silverplan_ul_li_5 = document.createElement('li');
        var silverplan_ul_li_6 = document.createElement('li');

        var silverplan_ul_li_1_icon = document.createElement('i');
        var silverplan_ul_li_2_icon = document.createElement('i');
        var silverplan_ul_li_3_icon = document.createElement('i');
        var silverplan_ul_li_4_icon = document.createElement('i');
        var silverplan_ul_li_5_icon = document.createElement('i');
        var silverplan_ul_li_6_icon = document.createElement('i');

        silverplan_ul_li_1.innerText = 'Access to element creator. (1 Month) ';
        silverplan_ul_li_2.innerText = 'Save upto 75 items in storage. ';
        silverplan_ul_li_3.innerText = 'Ability to open support tickets. ';
        silverplan_ul_li_4.innerText = 'Access to element animator. (1 Month) ';
        silverplan_ul_li_5.innerText = 'Ability to use premium ready made animations. ';
        silverplan_ul_li_6.innerText = 'Save maxium 15 animations a day. ';

        silverplan_ul_li_1_icon.setAttribute('class','fas fa-check');
        silverplan_ul_li_2_icon.setAttribute('class','fas fa-check');
        silverplan_ul_li_3_icon.setAttribute('class','fas fa-check');
        silverplan_ul_li_4_icon.setAttribute('class','fas fa-check');
        silverplan_ul_li_5_icon.setAttribute('class','fas fa-times');
        silverplan_ul_li_6_icon.setAttribute('class','fas fa-check');

        silverplan_ul_li_1.appendChild(silverplan_ul_li_1_icon);
        silverplan_ul_li_2.appendChild(silverplan_ul_li_2_icon);
        silverplan_ul_li_3.appendChild(silverplan_ul_li_3_icon);
        silverplan_ul_li_4.appendChild(silverplan_ul_li_4_icon);
        silverplan_ul_li_5.appendChild(silverplan_ul_li_5_icon);
        silverplan_ul_li_6.appendChild(silverplan_ul_li_6_icon);

        silverplan_ul.appendChild(silverplan_ul_li_1);
        silverplan_ul.appendChild(silverplan_ul_li_2);
        silverplan_ul.appendChild(silverplan_ul_li_3);
        silverplan_ul.appendChild(silverplan_ul_li_4);
        silverplan_ul.appendChild(silverplan_ul_li_6);
        silverplan_ul.appendChild(silverplan_ul_li_5);

        silverplan.appendChild(silverplan_p_heading);
        silverplan.appendChild(silverplan_ul);

        var goldplan_p_heading = document.createElement('p');
        goldplan_p_heading.setAttribute('class','heading');
        goldplan_p_heading.innerText = 'Gold Plan';

        var goldplan_ul = document.createElement('ul');
        var goldplan_ul_li_1 = document.createElement('li');
        var goldplan_ul_li_2 = document.createElement('li');
        var goldplan_ul_li_3 = document.createElement('li');
        var goldplan_ul_li_4 = document.createElement('li');
        var goldplan_ul_li_5 = document.createElement('li');
        var goldplan_ul_li_6 = document.createElement('li');

        var goldplan_ul_li_1_icon = document.createElement('i');
        var goldplan_ul_li_2_icon = document.createElement('i');
        var goldplan_ul_li_3_icon = document.createElement('i');
        var goldplan_ul_li_4_icon = document.createElement('i');
        var goldplan_ul_li_5_icon = document.createElement('i');
        var goldplan_ul_li_6_icon = document.createElement('i');

        goldplan_ul_li_1.innerText = 'Access to element creator. (1 Month) ';
        goldplan_ul_li_2.innerText = 'Save upto 150 items in storage. ';
        goldplan_ul_li_3.innerText = 'Ability to open support tickets. ';
        goldplan_ul_li_4.innerText = 'Access to element animator. (1 Month) ';
        goldplan_ul_li_5.innerText = 'Ability to use premium ready made animations. ';
        goldplan_ul_li_6.innerText = 'Save 50 animations a day. ';

        goldplan_ul_li_1_icon.setAttribute('class','fas fa-check');
        goldplan_ul_li_2_icon.setAttribute('class','fas fa-check');
        goldplan_ul_li_3_icon.setAttribute('class','fas fa-check');
        goldplan_ul_li_4_icon.setAttribute('class','fas fa-check');
        goldplan_ul_li_5_icon.setAttribute('class','fas fa-check');
        goldplan_ul_li_6_icon.setAttribute('class','fas fa-check');

        goldplan_ul_li_1.appendChild(goldplan_ul_li_1_icon);
        goldplan_ul_li_2.appendChild(goldplan_ul_li_2_icon);
        goldplan_ul_li_3.appendChild(goldplan_ul_li_3_icon);
        goldplan_ul_li_4.appendChild(goldplan_ul_li_4_icon);
        goldplan_ul_li_5.appendChild(goldplan_ul_li_5_icon);
        goldplan_ul_li_6.appendChild(goldplan_ul_li_6_icon);

        goldplan_ul.appendChild(goldplan_ul_li_1);
        goldplan_ul.appendChild(goldplan_ul_li_2);
        goldplan_ul.appendChild(goldplan_ul_li_3);
        goldplan_ul.appendChild(goldplan_ul_li_4);
        goldplan_ul.appendChild(goldplan_ul_li_6);
        goldplan_ul.appendChild(goldplan_ul_li_5);

        goldplan.appendChild(goldplan_p_heading);
        goldplan.appendChild(goldplan_ul);

        var diamondplan_p_heading = document.createElement('p');
        diamondplan_p_heading.setAttribute('class','heading');
        diamondplan_p_heading.innerText = 'Diamond Plan';

        var diamondplan_ul = document.createElement('ul');
        var diamondplan_ul_li_1 = document.createElement('li');
        var diamondplan_ul_li_2 = document.createElement('li');
        var diamondplan_ul_li_3 = document.createElement('li');
        var diamondplan_ul_li_4 = document.createElement('li');
        var diamondplan_ul_li_5 = document.createElement('li');
        var diamondplan_ul_li_6 = document.createElement('li');

        var diamondplan_ul_li_1_icon = document.createElement('i');
        var diamondplan_ul_li_2_icon = document.createElement('i');
        var diamondplan_ul_li_3_icon = document.createElement('i');
        var diamondplan_ul_li_4_icon = document.createElement('i');
        var diamondplan_ul_li_5_icon = document.createElement('i');
        var diamondplan_ul_li_6_icon = document.createElement('i');

        diamondplan_ul_li_1.innerText = 'Access to element creator. (3 Months) ';
        diamondplan_ul_li_2.innerText = 'Save upto 1000 items in storage. ';
        diamondplan_ul_li_3.innerText = 'Ability to open support tickets. ';
        diamondplan_ul_li_4.innerText = 'Access to element animator. (3 Months) ';
        diamondplan_ul_li_5.innerText = 'Ability to use premium ready made animations. ';
        diamondplan_ul_li_6.innerText = 'Save maxium 100 animations a day. ';

        diamondplan_ul_li_1_icon.setAttribute('class','fas fa-check');
        diamondplan_ul_li_2_icon.setAttribute('class','fas fa-check');
        diamondplan_ul_li_3_icon.setAttribute('class','fas fa-check');
        diamondplan_ul_li_4_icon.setAttribute('class','fas fa-check');
        diamondplan_ul_li_5_icon.setAttribute('class','fas fa-check');
        diamondplan_ul_li_6_icon.setAttribute('class','fas fa-check');

        diamondplan_ul_li_1.appendChild(diamondplan_ul_li_1_icon);
        diamondplan_ul_li_2.appendChild(diamondplan_ul_li_2_icon);
        diamondplan_ul_li_3.appendChild(diamondplan_ul_li_3_icon);
        diamondplan_ul_li_4.appendChild(diamondplan_ul_li_4_icon);
        diamondplan_ul_li_5.appendChild(diamondplan_ul_li_5_icon);
        diamondplan_ul_li_6.appendChild(diamondplan_ul_li_6_icon);

        diamondplan_ul.appendChild(diamondplan_ul_li_1);
        diamondplan_ul.appendChild(diamondplan_ul_li_2);
        diamondplan_ul.appendChild(diamondplan_ul_li_3);
        diamondplan_ul.appendChild(diamondplan_ul_li_4);
        diamondplan_ul.appendChild(diamondplan_ul_li_6);
        diamondplan_ul.appendChild(diamondplan_ul_li_5);

        diamondplan.appendChild(diamondplan_p_heading);
        diamondplan.appendChild(diamondplan_ul);

        var ads_p = document.createElement('p');
        ads_p.innerText = 'Upgrading to any plan will make your account ad free.';
        ads_p.setAttribute('class','adfree');

        var custombtn = document.createElement('button');
        custombtn.innerText = 'Purchase Plan';
        custombtn.addEventListener('click',function(){
          self.paypal_link($(document.getElementsByClassName('selectedplan')[0]).attr('data-plan'));
        });

        document.getElementById('upgp').appendChild(referralcode);

        if(self.data.plan == 'Bronze'){
          silverplan.setAttribute('class','selectedplan');
          document.getElementById('upgp').appendChild(silverplan);
          document.getElementById('upgp').appendChild(goldplan);
          document.getElementById('upgp').appendChild(diamondplan);
        }

        if(self.data.plan == 'Silver'){
          goldplan.setAttribute('class','selectedplan');
          document.getElementById('upgp').appendChild(goldplan);
          document.getElementById('upgp').appendChild(diamondplan);
        }

        if(self.data.plan == 'Gold'){
          diamondplan.setAttribute('class','selectedplan');
          document.getElementById('upgp').appendChild(diamondplan);
        }

        if(self.data.plan == 'Diamond'){
          ads_p.innerText = 'You have upgraded your account to diamond plan already.';
          ads_p.style.fontSize = '20px';

          custombtn.addEventListener('click',function(){
            //console.log('upgraded to max already');
          });

          custombtn.style.display = 'none';
          custombtn.style.pointerEvents = 'none';
          referralcode.remove();
        }

        if(self.data.plan == 'Free'){
          bronzeplan.setAttribute('class','selectedplan');
          document.getElementById('upgp').appendChild(bronzeplan);
          document.getElementById('upgp').appendChild(silverplan);
          document.getElementById('upgp').appendChild(goldplan);
          document.getElementById('upgp').appendChild(diamondplan);
        }

        document.getElementById('upgp').appendChild(custombtn);
        document.getElementById('upgp').appendChild(ads_p);
    }

    async paypal_link(p){
        const self = this;
        var payment = document.createElement('payment');

        var payment_pp_i = document.createElement('i');
        payment_pp_i.setAttribute('class','fab fa-paypal');

        var payment_p = document.createElement('p');
        payment_p.innerText = 'Creating your payment...';

        payment.appendChild(payment_pp_i);
        payment.appendChild(payment_p);
        document.getElementsByTagName('body')[0].appendChild(payment);

        setInterval(function(){self.updatePaymentStatus('Creating');},1000);

        var referralcode = document.getElementsByClassName('refcode')[0];
        var code = '';

        if(referralcode.value.length == '8'){
          if(referralcode.style.pointerEvents == 'none'){
            code = referralcode.value;
          }
        }

        const response = await Globals.api.request({ route: "me/payment/create", method: "post", data: { 'p': p, 'code': code }, });
        if(response.success === true){
            if(response.data.message == 'You have already used a referral code.'){
                Globals.notificationHandler.new('Error, '+response.data.message+' A user can only use one referral code.');
                payment.remove();
            }else{
                if(response.data.message.includes('https')){
                    window.location.href = response.data.message;
                }
            }
        }
    }

    async paypal_execute(payID,payerID,t,plan,ct,c){
        const self = this;
        var payment = document.createElement('payment');

        var payment_pp_i = document.createElement('i');
        payment_pp_i.setAttribute('class','fab fa-paypal');

        var payment_p = document.createElement('p');
        payment_p.innerText = 'Processing your payment...';

        payment.appendChild(payment_pp_i);
        payment.appendChild(payment_p);
        document.getElementsByTagName('body')[0].appendChild(payment);

        setInterval(function(){self.updatePaymentStatus('Processing');},1000);

        if(ct == '' || ct == null || ct == ' ' || c == '' || c == null || c == ' '){
          ct = 'none';
          c = 'none';
        }

          var route = 'me/payment/'+plan+'/'+ct+'/'+c+'/execute';
          const response = await Globals.api.request({ route: route, method: "post", data: { 'token': t, 'payId': payID, 'payerID': payerID }, });
          if(response.success === true){
              if(response.data.message == 'success'){
                  window.location.href = 'https://www.cssstudio.co/profile/?p=t&pi='+response.data.data.si+'&pi2='+response.data.data.pi;
              }

              if(response.data.message == 'already executed.'){
                  payment_p.innerText = 'Error occured while executing your payment. Please open a support ticket.';
                  setTimeout(function(){
                      window.location.href = 'https://www.cssstudio.co/profile/'
                  },5000);
              }
          }
    }

    async paypal_sale(pid,pid2){
        const self = this;
        var payment = document.createElement('payment');

        var payment_pp_i = document.createElement('i');
        payment_pp_i.setAttribute('class','fab fa-paypal');

        var payment_p = document.createElement('p');
        payment_p.innerText = 'Checking your payment...';

        payment.appendChild(payment_pp_i);
        payment.appendChild(payment_p);
        document.getElementsByTagName('body')[0].appendChild(payment);

        setInterval(function(){self.updatePaymentStatus('Checking');},1000);

        const response = await Globals.api.request({ route: "me/payment/info", method: "post", data: { 'id': pid }, });
        if(response.success === true){
            if(response.data.status == 'completed'){
                self.verifyPayment(pid,pid2);
            }

            if(response.data.status == 'error'){
                payment_p.innerText = 'An error has occured while checking your payment , please open a support ticket.';
                setTimeout(function(){
                    window.location.href = 'https://www.cssstudio.co/profile/'
                },5000);
            }
        }
    }

    updatePaymentStatus(step){
        var payment = document.getElementsByTagName('payment')[0];
        var payment_p = payment.getElementsByTagName('p')[0];

        if(payment_p.innerText == step+' your payment.'){
          payment_p.innerText = step+' your payment..';
        }else{
          if(payment_p.innerText == step+' your payment..'){
             payment_p.innerText = step+' your payment...';
          }else{
            if(payment_p.innerText == step+' your payment...'){
              payment_p.innerText = step+' your payment.';
            }
          }
        }
    }

    async verifyPayment(pid,pid2){
        var payment_p = document.getElementsByTagName('payment')[0].getElementsByTagName('p')[0];
        const response = await Globals.api.request({ route: "me/payment/verify", method: "post", data: { 'sid': pid, 'pid': pid2 }, });
        if(response.success === true){
            if(response.data.message == 'verified'){
                payment_p.innerText = 'Your account has been successfully upgraded. Refreshing...';
                setTimeout(function(){
                    window.location.href = 'https://www.cssstudio.co/profile/'
                },5000);
            }

            if(response.data.message == 'not verified, error'){
                payment_p.innerText = 'An error has occured while verifying your payment , please open a support ticket.';
                setTimeout(function(){
                    window.location.href = 'https://www.cssstudio.co/profile/'
                },5000);
            }
        }
    }

    async checkReferralCode(code){
        var referralcode = document.getElementsByClassName('refcode')[0];
        referralcode.style.opacity = '0.5';
        referralcode.style.pointerEvents = 'none';
        referralcode.style.animation = 'refcode 1s ease-in-out infinite';

        const response = await Globals.api.request({ route: "me/check/referralcode", method: "post", data: { 'code': code }, });
        if(response.success === true){
            if(response.data.message == 'Valid'){
                referralcode.style.opacity = '0.3';
                referralcode.style.pointerEvents = 'none';
                referralcode.style.animation = '';
                referralcode.style.border = '2px solid darkgreen';

                self.discountPrices();
            }else{
                if(response.data.message == 'Invalid'){
                    referralcode.style.opacity = '1';
                    referralcode.style.pointerEvents = 'unset';
                    referralcode.style.animation = '';
                    referralcode.style.border = '2px solid indianred';
                }else{
                    if(response.data.message == 'You have already used a referral code.'){
                        referralcode.style.opacity = '1';
                        referralcode.style.pointerEvents = 'unset';
                        referralcode.style.animation = '';
                        referralcode.style.border = '2px solid indianred';
                        Globals.notificationHandler.new('Error, '+response.data.message);
                    }
                }
            }
        }
    }

    discountPrices(){
        var membershipplans = document.getElementsByTagName('membershipplan');

        for(var i = 0; i < membershipplans.length; i++){
          var price = membershipplans[i].getElementsByTagName('span')[0];

          var discounted_price = document.createElement('span');

          if(price.innerText == '4.99 $'){
            discounted_price.innerText = '3.75 $';
          }

          if(price.innerText == '9.99 $'){
            discounted_price.innerText = '7.50 $';
          }

          if(price.innerText == '19.99 $'){
            discounted_price.innerText = '14.99 $';
          }

          if(price.innerText == '44.99 $'){
            discounted_price.innerText = '33.75 $';
          }

          discounted_price.style.top = '35px';
          discounted_price.style.background = 'darkgreen';
          discounted_price.style.textDecoration = 'none';

          price.style.background = 'darkred';
          price.style.textDecoration = 'line-through';

          membershipplans[i].appendChild(discounted_price);
        }
    }
}
