export default class NotificationHandler{
    constructor(){}

    new(text){
        let condition = text.includes('saved') || text.includes('Saved') ? 1 : text.includes('successfully') || ('Successfully') ? 2 : text.includes('error') || text.includes('Error') ? 3 : 0;
        var notification = Globals.elements.new({
            type: "notification",
            parent: Globals.window.body,
            style: {
                border: "1px solid #d7d7d7",
            },
            listeners: {
                click: function(){
                    notification.remove();
                }
            },
            children: [
                {
                    type: "p",
                    classes: [ "heading" ],
                    text: condition === 1 ? "Saved" : condition === 2 ? "Success" : condition === 3 ? "Error" : null,
                    style: {
                        color: condition === 1 ? "Green" : condition === 2 ? "Green" : condition === 3 ? "DarkRed" : null,
                    }
                },
                {
                    type: "p",
                    classes: [ "message" ],
                    text,
                }
            ]
        });
    }
}
