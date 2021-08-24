const Globals = window.globals;

class NotificationsHandler{
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
                    text: "Notifications"
                }
            ]
        });

        var notifications = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "ntfs" ],
            children: [
                {
                    type: "h6",
                    text: "Your Notifications",
                    style: {
                        top: "0px",
                    }
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
                                        return ["Subject", "Time", "", ""].map((x, i) => {
                                            return { type: "th", text: x, style: { width: i === 1 ? "30%" : i === 0 ? "70%" : "0%", borderRight: i === 0 || i === 1 ? "1px solid rgb(241, 241, 241)" : null } }
                                        });
                                    })(),
                                }
                            ]
                        },
                        {
                            type: "tbody",
                            children: (() => {
                                return self.data.notifications.map(notification => {
                                    return {
                                        type: "tr",
                                        attributes: {
                                            "data-tid": notification.id
                                        },
                                        children: (() => {
                                            return [notification.notification, moment(moment.utc(notification.created_at)).fromNow(), "", ""].map((x, i) => {
                                                return  {
                                                    type: "td",
                                                    text: x,
                                                    style: i === 0 ? { textAlign: "left", paddingLeft: "10px" } : i === 1 ? { textAlign: "left", paddingLeft: "10px", verticalAlign: "top" } : null,
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
    }
}
