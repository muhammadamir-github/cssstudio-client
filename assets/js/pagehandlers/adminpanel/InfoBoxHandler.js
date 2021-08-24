class InfoBoxHandler{
    constructor(){
        this.fontawesomeHandler = new FontAwesomeHandler;
    }

    newBox(id, appendTo, appendToType, width){
        var box = Globals.elements.new({
            type: "div",
            parent: appendToType == 'id' ? document.getElementById(appendTo) : document.getElementsByClassName(appendTo)[0],
            classes: [ "crud_infoBox" ],
            id,
            style: {
                width: width == "default" ? null : width,
            }
        });
    }

    populateBox(boxId, data, dataCategory){
        const self = this;
        if(dataCategory == 'general'){
            self.addEntry(boxId,data.general.username,'username','0','0','default');
            self.addEntry(boxId,data.general.email,'email','0','0','default');
            self.addEntry(boxId,data.general.ip_address,'ip address','0','0','default');
            self.addEntry(boxId,data.general.last_visit,'last visit','1','1','default');

            self.addEntry(boxId,data.membership.membership_plan,'membership plan','0','0','default');
            self.addEntry(boxId,data.membership.membership_expires_at,'membership expires/expired','1','1','default');

            self.addEntry(boxId,data.items.storage_space,'storage','0','0','default');
            self.addEntry(boxId,data.items.total_animations,'total animations','0','0','default');
            self.addEntry(boxId,data.items.total_elements,'total elements','0','0','default');
        }

        if(dataCategory == 'money&tickets'){
            self.addEntry(boxId,data.money.total_payments,'total payments','0','0','default');
            self.addEntry(boxId,data.money.total_completed_payments,'total completed payments','0','0','default');
            self.addEntry(boxId,data.money.total_money_spent,'total money spent','0','0','default');
            self.addEntry(boxId,data.tickets.total_tickets_opened,'total tickets','0','0','default');
            self.addEntry(boxId,data.tickets.total_tickets_opened - data.tickets.total_tickets_closed,'total tickets open','0','0','default');
            self.addEntry(boxId,data.tickets.total_tickets_closed,'total tickets closed','0','0','default');
        }

        if(dataCategory == 'location'){
            self.addEntry(boxId,data.location.continent,'continent','0','0','default');
            self.addEntry(boxId,data.location.country,'country','0','0','default');
            self.addEntry(boxId,data.location.location_latitude,'location latitude','0','0','default');
            self.addEntry(boxId,data.location.location_longitude,'location longitude','0','0','default');
            self.addEntry(boxId,data.location.region,'region','0','0','default');
            self.addEntry(boxId,data.location.zip,'zip','0','0','default');
        }

        if(dataCategory == 'activity'){
            for(var i = 0; i < data.activity.length; i++){
                self.addEntry(boxId,data.activity[i].type+' @ '+data.activity[i].created_at,i,'1','1','4px');
            }
        }

        if(dataCategory == 'billing'){
            for(var i = 0; i < data.billing.length; i++){
                self.addEntry(boxId,'Purchased ' + data.billing[i].product + ' for ' + data.billing[i].amount + '$ . (' + capitalizeFirstLetter(data.billing[i].method) + ')' +' @ '+data.billing[i].created_at,i,'1','1','4px');
            }
        }

        if(dataCategory == 'logins'){
            for(var i = 0; i < data.logins.length; i++){
                self.addEntry(boxId,data.logins[i].ip_address + ' (' + data.logins[i].country +')' +' @ '+data.logins[i].created_at,i,'1','1','4px');
            }
        }
    }

    addEntry(boxId, text, key, datetime, futurePastCheck, padding){
        const self = this;
        let momentResult = null;

        if(datetime == '1'){
            if(futurePastCheck == '1'){
                if(text.includes('@')){
                    var datetimeInTextFormat = text.split('@')[1];
                    momentResult = moment(moment.utc(datetimeInTextFormat)).fromNow();
                }else{
                    momentResult = moment(moment.utc(text)).fromNow();
                }
            }else{
                if(futurePastCheck == '0'){
                    if(text.includes('@')){
                        var datetimeInTextFormat = text.split('@')[1];
                        momentResult = moment.utc(datetimeInTextFormat).local().format("dddd, MMMM Do YYYY");
                    }else{
                        momentResult = moment.utc(text).local().format("dddd, MMMM Do YYYY");
                    }
                }
            }

            if(text.length > 2){
                if(text.includes('@')){
                    //entry.innerHTML = '<i class="'+self.fontawesomeHandler.icon(key)+'"></i> ' + capitalizeFirstLetter(key) + ': '+ capitalizeFirstLetter(text.split('@')[0]) + ' @ ' + capitalizeFirstLetter(momentResult);
                    text = `${capitalizeFirstLetter(key)}: ${capitalizeFirstLetter(text.split('@')[0])} @ ${capitalizeFirstLetter(momentResult)}`;
                }else{
                    //entry.innerHTML = '<i class="'+self.fontawesomeHandler.icon(key)+'"></i> ' + capitalizeFirstLetter(key) + ': '+ capitalizeFirstLetter(momentResult);
                    text = `${capitalizeFirstLetter(key)}: ${capitalizeFirstLetter(momentResult)}`;
                }
            }else{
                if(text.includes('@')){
                    //entry.innerHTML = '<i class="'+self.fontawesomeHandler.icon(key)+'"></i> ' + capitalizeFirstLetter(key) + ': '+ capitalizeFirstLetter(text.split('@')[0]) + ' @ ' + momentResult;
                    text = `${capitalizeFirstLetter(key)}: ${capitalizeFirstLetter(text.split('@')[0])} @ ${momentResult}`;
                }else{
                    //entry.innerHTML = '<i class="'+self.fontawesomeHandler.icon(key)+'"></i> ' + capitalizeFirstLetter(key) + ': '+ momentResult;
                    text = `${capitalizeFirstLetter(key)}: ${momentResult}`;
                }
            }
        }else{
            if(text.length > 2){
                //entry.innerHTML = '<i class="'+self.fontawesomeHandler.icon(key)+'"></i> ' + capitalizeFirstLetter(key) + ': '+ capitalizeFirstLetter(text);
                text = `${capitalizeFirstLetter(key)}: ${capitalizeFirstLetter(text)}`;
            }else{
                //entry.innerHTML = '<i class="'+self.fontawesomeHandler.icon(key)+'"></i> ' + capitalizeFirstLetter(key) + ': '+ text;
                text = `${capitalizeFirstLetter(key)}: ${text}`;
            }
        }

        var entry = Globals.elements.new({
            type: "entry",
            parent: document.getElementById(boxId),
            text: text,
            style: {
                padding: padding == "default" ? null : padding,
            },
            children: [
                {
                    type: "i",
                    classes: [ ...self.fontawesomeHandler.icon(key).split(" ") ],
                    prepend: true // before text
                }
            ]
        });
    }
}
