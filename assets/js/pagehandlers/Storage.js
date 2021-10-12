const Globals = window.globals;

class StorageHandler{
    constructor(data){
        this.data = data;
    }

    setup(){
        const self = this;
        var animations = self.data.animations;
        var elements = self.data.elements;

        var heading = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "ph" ],
            children: [
                {
                    type: "p",
                    text: "Storage"
                }
            ]
        });

        var elements_div = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            id: "eldiv",
            children: [
                {
                    type: "span",
                    classes: [ "alabel_new" ],
                    text: "Elements"
                },
                ...(() => {
                    return elements.map((element, i) => {
                        let width = element.type == 'button' || element.type == 'input' || element.type == 'heading' ? "70%" : element.type == 'image' || element.type == 'video' || element.type == 'div' ? "45%" : element.type == 'paragraph' || element.type == 'textarea' ? "75%" : null;
                        let height = element.type == 'button' || element.type == 'input' || element.type == 'heading' ? "20%" : element.type == 'image' || element.type == 'video' || element.type == 'div' || element.type == 'paragraph' || element.type == 'textarea' ? "45%" : null;
                        let eid = element.id;
                        let etype = element.type;

                        return {
                            type: "storagePreview",
                            children: [
                                {
                                    type: "input",
                                    attributes: { type: "text", value: element.css },
                                    style: {
                                        visible: "false",
                                        pointerEvents: "none",
                                        width: "1px",
                                        height: "1px",
                                        opacity: "0",
                                        left: "-500px",
                                        position: "relative"
                                    }
                                },
                                {
                                    type: element.type == "paragraph" ? "p" : element.type,
                                    classes: [ element.name ],
                                    attributes: element.type == 'textarea' || element.type == 'input' ? { value: `Preview ${element.type}` } : null,
                                    text: element.type == 'image' || element.type == 'video' ? null : `Preview ${element.type}`,
                                    style: {
                                        transform: "translate(-50%,-50%)",
                                        left: "50%",
                                        top: "50%",
                                        marginTop: "0px",
                                        animationDuration: "0s",
                                        width: width,
                                        height: height,
                                        minHeight: element.type == 'image' || element.type == 'video' ? "0%" : null,
                                        minWidth: element.type == 'image' || element.type == 'video' ? "0%" : null,
                                    }
                                },
                                {
                                    type: "span",
                                    classes: [ "alabel_new" ],
                                    text: element.name,
                                    style: {
                                        backgroundColor: "#1a1a1a",
                                        color: "white",
                                        fontSize: "12px",
                                        borderRadius: "0px",
                                        height: "17px",
                                        bottom: "0px",
                                        width: "100%"
                                    }
                                },
                                {
                                    type: "p",
                                    classes: [ "ctc" ],
                                    text: "Copy Css",
                                    listeners: {
                                        click: function(){
                                            this.classList.add('ctca');
                                            this.parentElement.getElementsByTagName('input')[0].select();
                                            document.execCommand("copy");
                                            window.getSelection().removeAllRanges();
                                            setTimeout(function(){$('.ctca').removeClass('ctca');},1000);
                                        }
                                    }
                                },
                                {
                                    type: "i",
                                    classes: [ "fas", "fa-trash" ],
                                    listeners: {
                                        click: function(){ self.deleteElement('element', eid, this); }
                                    }
                                },
                                {
                                    type: "i",
                                    classes: [ "fas", "fa-toggle-off" ],
                                    listeners: {
                                        click: function(){ self.stopAnimation('element', eid, etype, this); }
                                    },
                                    style: { marginLeft: "25px" }
                                }
                            ]
                        }
                    });
                })(),
            ]
        });

        for(var i=0; i < elements.length; i++){
            var stylesheet = Globals.elements.new({
                type: "style",
                parent: Globals.window.head,
                text: elements[i].css
            });
        }

        var animations_div = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            id: "andiv",
            children: [
                {
                    type: "span",
                    classes: [ "alabel_new" ],
                    text: "Animations"
                },
                ...(() => {
                    return animations.map((animation, i) => {
                        var aid = animation.id;
                        return {
                            type: "storagePreview",
                            children: [
                                {
                                    type: "textarea",
                                    text: animation.css,
                                    attributes: { readonly: "", value: animation.css },
                                    style: {
                                        resize: "none",
                                        height: "85%",
                                        width: "100%",
                                        marginTop: "10%"
                                    }
                                },
                                {
                                    type: "span",
                                    classes: [ "alabel_new" ],
                                    text: animation.name,
                                    style: {
                                        backgroundColor: "#1a1a1a",
                                        color: "white",
                                        fontSize: "12px",
                                        borderRadius: "0px",
                                        height: "17px",
                                        bottom: "0px",
                                        width: "100%"
                                    }
                                },
                                {
                                    type: "i",
                                    classes: [ "fas", "fa-trash" ],
                                    listeners: {
                                        click: function(){ self.deleteElement('animation', aid, this); }
                                    }
                                },
                                {
                                    type: "p",
                                    classes: [ "ctc" ],
                                    text: "Copy Css",
                                    listeners: {
                                        click: function(){
                                            this.classList.add('ctca');
                                            this.parentElement.getElementsByTagName('textarea')[0].select();
                                            document.execCommand("copy");
                                            window.getSelection().removeAllRanges();
                                            setTimeout(function(){$('.ctca').removeClass('ctca');},1000);
                                        }
                                    }
                                },
                            ]
                        }
                    });
                })()
            ]
        });

        for(var i=0; i < animations.length; i++){
            var stylesheet = Globals.elements.new({
                type: "style",
                parent: Globals.window.head,
                text: animations[i].css
            });
        }
    }

    planExpired(){
        const self = this;
        document.getElementsByTagName('loader')[0].remove();
        var exatExpiry = moment(self.data.expires_at.substring(0,10)).format("dddd, MMMM Do YYYY");
        Globals.membershipHandler.notice('plan-expired', exatExpiry);

        setTimeout(function(){
            window.location.href = '../profile/';
        },7500);

        document.getElementsByTagName('head')[0].innerHTML += '<link rel="stylesheet" type="text/css" href="../assets/css/notice.css">';
    }

    async deleteElement(type,id,element){
        var data;

        if(type == 'animation'){
            data = {'a_id':id};
        }

        if(type == 'element'){
            data = {'e_id':id};
        }

        const response = await Globals.api.request({ route: `me/${type}/delete`, method: "post", data });
        if(response.success === true){
            //Globals.notificationHandler.new(type+' deleted successfully.');
            element.parentNode.remove();
        }
    }

    stopAnimation(type,id,etype,element){
        var state = '';
        var duration = '';

        if($(element).attr('class').includes('off')){
            console.log('1');
            state = 'on';
            duration = '1s';
        }else{
            if($(element).attr('class').includes('on')){
                console.log('2');
                state = 'off';
                duration = '0s';
            }
        }

        if(type == 'element'){
            if(etype == 'paragraph'){
                element.parentNode.getElementsByTagName('p')[0].style.animationDuration = duration;
                element.setAttribute('class','fas fa-toggle-'+state);
            }else{
                if(etype == 'input'){
                    element.parentNode.getElementsByTagName(etype)[1].style.animationDuration = duration;
                    element.setAttribute('class','fas fa-toggle-'+state);
                }else{
                    element.parentNode.getElementsByTagName(etype)[0].style.animationDuration = duration;
                    element.setAttribute('class','fas fa-toggle-'+state);
                }
            }
        }
    }
}
