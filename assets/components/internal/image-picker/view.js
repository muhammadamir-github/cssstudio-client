class InternalImagePickerView{
    constructor(controller){
        this.controller = controller;
        this._element = null;
    }

    create(options = {}){
        const self = this;
        const { data, parent, prepend, before, elementType, component_id } = options;

        self._element = Globals.elements.new({
            type: "imagepicker",
            parent,
            id: data.id ? data.id : null,
            style: data.style ? data.style : null,
            attributes: {
                "data-component-id": component_id,
            },
            children: [
                {
                    type: "p",
                    text: data.text,
                    listeners: {
                        click: function(){
                            self.toggle(self);
                        },
                    }
                },
                {
                    type: "img",
                    attributes: {
                        src: data.src,
                    },
                    listeners: {
                        click: function(){
                            Globals.imageManager.select().then(selected => {
                                self.changeImage(selected);
                            }).catch(error => {
                                //console.log(error);
                            });
                        },
                    }
                }
            ],
            before: before,
            prepend: prepend
        });
    }

    changeImage(img){
        const self = this;
        const data = self.controller._getModelState();
        self.controller._updateModelState({ src: img });

        let applyTo = data.forAnimator === true ? document.getElementById("animator-preview-element") : document.getElementsByClassName("selected-element");
        if(applyTo || applyTo[0]){
            applyTo = applyTo[0] ? applyTo[0] : applyTo;
            let tag = applyTo.tagName.toString().toLowerCase();
            if(tag === "video"){
                applyTo.setAttribute('poster', img.toString().replace(/"/g, ''));
            }else{
                if(tag === "img"){
                    applyTo.setAttribute('src', img.toString().replace(/"/g, ''));
                }else{
                    applyTo.style.backgroundImage = `url(${img})`;
                }
            }
        }
    }

    async syncValue(){
        const self = this;
        const data = await self.controller._getModelState();

        let applyTo = data.forAnimator === true ? document.getElementById("animator-preview-element") : document.getElementsByClassName("selected-element")[0];
        let currentStyleValue = null;

        if(applyTo){
            let tag = applyTo.tagName.toString().toLowerCase();
            if(tag === "video"){
                currentStyleValue = applyTo.getAttribute('poster');
            }else{
                if(tag === "img"){
                    currentStyleValue = applyTo.getAttribute('src');
                }else{
                    currentStyleValue = applyTo.style.backgroundImage.toString().replace("url(", "").replace(")", "");
                }
            }

            if((data.src && !currentStyleValue) || (currentStyleValue)){
                await self.changeImage(currentStyleValue);
            }
        }
    }

    toggle(self, specficAction = null){
        let imagepicker = self._element;
        let image = self._element.getElementsByTagName("img");

        if(image[0]){
            image = image[0];
            if((specficAction === null && image.style.display == 'flex') || specficAction === "hide"){
                image.style.display = 'none';
                imagepicker.style.textAlign = 'unset';
            }else{
                image.style.display = 'flex';
                imagepicker.style.textAlign = 'left';
            }
        }
    }

    refresh(){
        const data = this.controller._getModelState();
        this._element.getElementsByTagName("img")[0].setAttribute('src', data.src.toString().replace(/"/g, ''));
    }
}
