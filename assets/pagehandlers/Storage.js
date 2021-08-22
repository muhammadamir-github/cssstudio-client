const Globals = window.globals;

class StorageHandler{
    constructor(data){
        this.data = data;
    }

    setup(){
        const self = this;
        var animations = self.data.animations;
        var elements = self.data.elements;

        var heading = document.createElement('div');
        heading.setAttribute('class','ph');
        var heading_p = document.createElement('p');
        heading_p.innerText = 'Storage';
        heading.appendChild(heading_p);


        var elements_div = document.createElement('div');
        elements_div.setAttribute('id','eldiv');
        var ellabel = document.createElement('span');
        ellabel.setAttribute('class','alabel_new');
        ellabel.innerText = 'Elements';
        elements_div.appendChild(ellabel);

        var animations_div = document.createElement('div');
        animations_div.setAttribute('id','andiv');
        var anlabel = document.createElement('span');
        anlabel.setAttribute('class','alabel_new');
        anlabel.innerText = 'Animations';
        animations_div.appendChild(anlabel);

        for(var i=0; i < elements.length; i++){
            var storagepreview = document.createElement('storagePreview');

            var css = document.createElement("input");
            css.setAttribute("type",'text');
            var style = elements[i].css;
            css.value = style;
            css.style.visible = 'false';
            css.style.pointerEvents = 'none';
            css.style.width = '1px';
            css.style.height = '1px';
            css.style.opacity = '0';
            css.style.left = '-500px';
            css.style.position = 'relative';
            storagepreview.appendChild(css);

            if(elements[i].type == 'paragraph'){
                var element = document.createElement('p');
            }else{
                var element = document.createElement(elements[i].type);
            }
            element.setAttribute('class',elements[i].name);
            element.style.transform = 'translate(-50%,-50%)';
            element.style.left = '50%';
            element.style.top = '50%';

            if(elements[i].type == 'button' || elements[i].type == 'input' || elements[i].type == 'heading'){
                element.style.width = '70%';
                element.style.height = '20%';
                element.innerText = 'Preview '+elements[i].type;
            }

            if(elements[i].type == 'image' || elements[i].type == 'video'){
                element.style.width = '45%';
                element.style.height = '45%';
                element.style.minWidth = '0%';
                element.style.minHeight = '0%';
            }

            if(elements[i].type == 'div'){
                element.style.width = '45%';
                element.style.height = '45%';
                element.innerText = 'Preview '+elements[i].type;
            }

            if(elements[i].type == 'paragraph' || elements[i].type == 'textarea'){
                element.style.width = '75%';
                element.style.height = '45%';
                element.innerText = 'Preview '+elements[i].type;
            }

            if(elements[i].type == 'textarea' || elements[i].type == 'input'){
                element.value = 'Preview ';+elements[i].name;
                element.innerText = 'Preview '+elements[i].type;
            }

            element.style.marginTop = '0px';
            element.style.animationDuration = '0s';

            storagepreview.appendChild(element);

            var label = document.createElement('span');
            label.setAttribute('class','alabel_new');
            label.innerText = elements[i].name;
            label.style.backgroundColor = '#1a1a1a';
            label.style.color = 'white';
            label.style.fontSize = '12px';
            label.style.borderRadius = '0px';
            label.style.height = '17px';
            label.style.bottom = '0px';
            label.style.width = '100%';
            storagepreview.appendChild(label);

            var p = document.createElement('p');
            p.setAttribute('class','ctc');
            p.innerText = 'Copy Css';
            p.addEventListener('click',function(){
                this.classList.add('ctca');
                this.parentElement.getElementsByTagName('input')[0].select();
                document.execCommand("copy");
                window.getSelection().removeAllRanges();
                setTimeout(function(){$('.ctca').removeClass('ctca');},1000);
            });
            storagepreview.appendChild(p);

            var eid = elements[i].id;
            var etype = elements[i].type;

            var deleteicon = document.createElement('i');
            deleteicon.setAttribute('class','fas fa-trash');

            (function(eid){
                deleteicon.addEventListener('click',function(){
                    self.deleteElement('element',eid,this);
                });
            })(eid);

            var toggleanimationicon = document.createElement('i');
            toggleanimationicon.setAttribute('class','fas fa-toggle-off');
            toggleanimationicon.style.marginLeft = '25px';

            (function(eid,etype){
                toggleanimationicon.addEventListener('click',function(){
                    self.stopAnimation('element',eid,etype,this);
                });
            })(eid,etype);

            storagepreview.appendChild(deleteicon);
            storagepreview.appendChild(toggleanimationicon);

            elements_div.appendChild(storagepreview);

            var stylesheet = document.createElement('style');
            stylesheet.innerText = elements[i].css;

            document.getElementsByTagName('head')[0].appendChild(stylesheet);
        }

        for(var i=0; i < animations.length; i++){
            var storagepreview = document.createElement('storagePreview');

            var animation = document.createElement('textarea');
            animation.setAttribute('readonly','');
            animation.innerText = animations[i].css;
            animation.style.resize = 'none';
            animation.style.height = '85%';
            animation.style.width = '100%';
            animation.style.marginTop = '10%';

            storagepreview.appendChild(animation);

            var label = document.createElement('span');
            label.setAttribute('class','alabel_new');
            label.innerText = animations[i].name;
            label.style.backgroundColor = '#1a1a1a';
            label.style.color = 'white';
            label.style.fontSize = '12px';
            label.style.borderRadius = '0px';
            label.style.height = '17px';
            label.style.bottom = '0px';
            label.style.width = '100%';
            storagepreview.appendChild(label);

            var aid = animations[i].id;

            var deleteicon = document.createElement('i');
            deleteicon.setAttribute('class','fas fa-trash');

            (function(aid){
                deleteicon.addEventListener('click',function(){
                    self.deleteElement('animation',aid,this);
                });
            })(aid);

            storagepreview.appendChild(deleteicon);

            var p = document.createElement('p');
            p.setAttribute('class','ctc');
            p.innerText = 'Copy css';
            p.addEventListener('click',function(){
                this.classList.add('ctca');
                this.parentElement.getElementsByTagName('textarea')[0].select();
                document.execCommand("copy");
                window.getSelection().removeAllRanges();
                setTimeout(function(){$('.ctca').removeClass('ctca');},1000);
            });
            storagepreview.appendChild(p);

            animations_div.appendChild(storagepreview);

            var stylesheet = document.createElement('style');
            stylesheet.innerText = animations[i].css;

            document.getElementsByTagName('head')[0].appendChild(stylesheet);
        }

        $('body').append(heading);
        $('body').append(elements_div);
        $('body').append(animations_div);
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

        //var upgradeplan = document.createElement('div');
        //upgradeplan.setAttribute('id','upgp');

        //document.getElementsByTagName('body')[0].appendChild(upgradeplan);

        //setUpPaypal(self.data);
        //document.getElementById('upgp').style.display = 'block';
        //document.getElementById('upgp').style.opacity = '1';
    }

    deleteElement(type,id,element){
        var data;

        if(type == 'animation'){
            data = {'a_id':id};
        }

        if(type == 'element'){
            data = {'e_id':id};
        }

        $.ajax({
            url:global_host+'/api/me/'+type+'/delete',
            type:'POST',
            dataType:'json',
            data:data,
            beforeSend: function(request){
                request.setRequestHeader('Authorization','Bearer '+token);
                request.setRequestHeader('Accept','application/json');
            },
            success: function(response){
                Globals.notificationHandler.new(type+' deleted successfully.');
                element.parentNode.remove();
            },
        });
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