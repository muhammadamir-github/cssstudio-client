class InternalImageManagerView{
    constructor(controller){
        this.controller = controller;
        this._element = null;
        this.hidden = true;
        this._isSelecting = false;
        this._selected = null;

        this._dragDetails = {
            x: 0,
            y: 0,
            mouse: {
                x: 0,
                y: 0,
                isDown: false,
            },
        };

        this._resizeDetails = {
            mouse: {
                isDown: false,
                x: 0,
                y: 0,
            },
            height: 0,
            width: 0,
        };
    }

    async create(options = {}){
        const self = this;
        const { data, parent, prepend, before, component_id } = options;

        self._element = Globals.elements.new({
            type: "div",
            parent,
            style: data.style ? data.style : null,
            id: "image-manager",
            attributes: {
                "data-component-id": component_id,
            },
            children: [
                {
                    type: "div",
                    classes: [ "banner" ],
                    children: [
                        {
                            type: "p",
                            text: "Image Manager",
                            classes: [ "banner-heading" ],
                        },
                        /*{
                            type: "checkbox-one",
                            //classes: [ "checkbox-one" ],
                            attributes: {
                                "data-bg-hv": "grey",
                                "data-checked": "1",
                                'data-e-type': 'checkbox-one',
                                "data-bg": "black"
                            },
                            children: [
                                {
                                    type: "span",
                                    classes: [ "box" ],
                                    attributes: { "data-restrictions": "selection" },
                                    children: [
                                        {
                                            type: "span",
                                            classes: [ "checkmark" ],
                                            attributes: { "data-restrictions": "selection" },
                                            listeners: {
                                                mouseover: function(){
                                                    let span = this.parentElement.getElementsByTagName("span")[0];
                                                    publicEvents.checkbox_hover(span);
                                                },
                                                mouseout: function(){
                                                    let span = this.parentElement.getElementsByTagName("span")[0];
                                                    publicEvents.checkbox_hoverOut(span);
                                                },
                                                click: function(){
                                                    let checkboxOption = this.parentElement;
                                                    publicEvents.checkbox_click(checkboxOption);
                                                }
                                            }
                                        }
                                    ]
                                },
                                {
                                    type: "p",
                                    attributes: { "data-restrictions": "selection" },
                                    text: "Media Storage Search",
                                },
                            ]
                        },*/
                        {
                            type: "input",
                            attributes: { type: "text", placeholder: "Search..." },
                            listeners: {
                                keydown: async function(e){
                                    if(e.keyCode == 13){
                                        /*let checkboxOption = this.parentElement.getElementsByClassName("checkbox-one")[0];
                                        if(stateOf.checkbox(checkboxOption) == 1){
                                            Globals.pageHandler.mediaManager.searchUserMedia("images",this.value);
                                        }else{*/
                                            this.setAttribute("disabled", true);
                                            setTimeout(() => {
                                                this.setAttribute("disabled", false);
                                            }, 60000)

                                            await self.reset();
                                            await self.search(this.value);
                                            this.setAttribute("disabled", false);
                                        //}
                                    }
                                }
                            }
                        },
                        {
                            type: "i",
                            classes: [ "fas", "fa-times" ],
                            listeners: {
                                click: function(){
                                    self.hide();
                                }
                            }
                        }
                    ]
                },
                {
                    type: "div",
                    classes: [ "flex-container" ],
                    id: "image-manager-container"
                },
                {
                    type: "div",
                    id: "image-manager-footer",
                    children: [
                        ...(() => {
                            return ["../assets/images/giphylogo2.png", "../assets/images/pixelbaylogo.png", "../assets/images/unsplashlogo.jpg"].map((x,i) => {
                                return {
                                    type: "img",
                                    attributes: { src: x }
                                }
                            });
                        })(),
                        /*{
                            type: "button",
                            text: "Upload Image",
                            listeners: {
                                click: function(){
                                    let fileinput = this.parentElement.getElementsByTagName("input")[0];
                                    fileinput.click();
                                }
                            }
                        },
                        {
                            type: "input",
                            attributes: { type: "file", accept: "image/png, image/jpeg, image/jpg" },
                            style: {
                                display: "none",
                                opacity: "0",
                                width: "0px",
                                height: "0px"
                            },
                            listeners: {
                                change: function(){
                                    Globals.pageHandler.mediaManager.uploadMedia('Image', this.files[0]);
                                }
                            }
                        }*/
                    ]
                }
            ],
            before: before,
            prepend: prepend
        });

        await Globals.draggableFactory.new({
            element: self._element,
            triggers: [
                self._element.getElementsByClassName("banner-heading")[0],
                document.getElementById("image-manager-footer")
            ],
            detailsHolder: self._dragDetails,
        });

        await Globals.resizeableFactory.new({
            element: self._element,
            detailsHolder: self._resizeDetails,
        });

        self._element.getElementsByClassName("eResizer")[0].classList.add("eResizer-visible");
    }

    async show(){
        this._element.style.display = "flex";
        this._element.style.left = ((window.innerWidth/2) - (this._element.getBoundingClientRect().width/2))+"px";
        this._element.style.top = ((window.innerHeight/2) - (this._element.getBoundingClientRect().height/2))+"px";
        this.hidden = false;
    }

    hide(){
        this._element.style.display = "none";
        this.hidden = true;
    }

    toggle(){
        this.hidden ? this.show() : this.hide();
    }

    async reset(){
        let images = document.getElementById("image-manager-container").getElementsByTagName("div");
        await [...images].forEach(async (x) => { x.remove(); });
    }

    select(){
        const self = this;
        self.show();
        self._isSelecting = true;

        return new Promise((resolve, reject) => {
            let timeElapsed = 0;
            function check(){
                timeElapsed += 1000;
                if(self._selected){
                    resolve(self._selected);
                    self._selected = null;
                    self._isSelecting = false;
                    self.hide();
                }else{
                    if(timeElapsed >= 60000*20){
                        reject("Timed Out");
                        self._selected = null;
                        self._isSelecting = false;
                        self.hide();
                    }else{
                        setTimeout(check, 1000);
                    }
                }
            }

            check();
        });
    }

    async search(query){
        const self = this;
        let images = [];
        let response = await Globals.api.request({ route: `search/thirdparty/images/${query}`, method: "get" });
        if(response.success === true){
            images = response.data;
        }

        let chunks = [];
        while(images.length) {
            chunks.push(images.splice(0, 5));
        }

        for (let chunk of chunks){
            let loader = new Worker("../assets/js/misc/ImagesLoader.js");
            loader.postMessage(chunk);

            loader.addEventListener("message",async function(e){
                let promises = e.data.map(async loadedImageData => {
                    if(loadedImageData){
                        return await self.loadImage(loadedImageData);
                    }
                });

                await Promise.all(promises);
            }, false);
        }
    }

    async loadImage(imageData){
        const self = this;
        //let path = image.largeImageURL ? image.largeImageURL : image.urls && image.urls.full ? image.urls.full : image.images && image.images.original && image.images.original.url ? image.images.original.url : null;
        //let title = image.tags || image.description || image.title || null;

        Globals.elements.new({
            type: "div",
            parent: document.getElementById("image-manager-container"),
            listeners: {
                click: function(e){
                    if(self._isSelecting === true){
                        self._selected = imageData;
                        self.hide();
                    }
                }
                /*click: document.getElementsByClassName('selElForImgPik')[0] ? function(){
                    let image = this.getElementsByTagName("img")[0];

                    if(document.getElementsByClassName('selElForImgPik')[0]){
                        document.getElementsByClassName('selElForImgPik')[0].setAttribute('src', 'http://localhost:8000/api/assets/'+image.src);
                        if(document.getElementsByClassName('selElForImgPik_invoker')[0]){
                            document.getElementsByClassName('selElForImgPik_invoker')[0].setAttribute('src', 'http://localhost:8000/api/assets/'+image.src);
                        }
                    }
                } : $(document.getElementsByClassName("selected")[0]).attr("data-e-type") == 'video' ? function(e){
                    let image = this.getElementsByTagName("img")[0];
                    document.getElementsByClassName('selected')[0].setAttribute('poster', 'http://localhost:8000/api/assets/'+image.src);
                } : function(){
                    let image = this.getElementsByTagName("img")[0];
                    document.getElementsByClassName('selected')[0].src = 'http://localhost:8000/api/assets/'+image.src;
                }*/
            },
            children: [
                {
                    type: "img",
                    id: Globals.randomizer.id(100),
                    attributes: {
                        src: imageData,
                        /*"data-title": image.name,
                        "data-size": image.size,
                        "data-image-title": image.title,
                        "data-description": image.description,
                        "data-m-id": image.id,*/
                    },
                    /*listeners: {
                        error: reject,
                        load: resolve,
                    }*/
                },
                /*{
                    type: "span",
                    //text: user_images[i].title ? (user_images[i].title.length > 15 ? user_images[i].title.substring(0,15)+"..." : user_images[i].title) : user_images[i].name ? (user_images[i].name.length > 15 ? user_images[i].name.substring(0,15)+"..." : user_images[i].name) : "",
                    /*listeners: {
                        mouseover: function(e){
                            let image = this.parentElement.getElementsByTagName("img")[0];
                            self.showImageInfo(e, image);
                        },
                        mouseout: function(){
                            let image = this.parentElement.getElementsByTagName("img")[0];
                            self.hideImageInfo(image);
                        }
                    }
                },
                {
                    type: "i",
                    classes: [ "fas", "fa-trash" ],
                    listeners: {
                        click: function(){
                            self.deleteMedia(user_images[i].id, 'Image');
                        }
                    }
                },
                {
                    type: "i",
                    classes: [ "fas", "fa-pen" ],
                    listeners: {
                        click: function(){
                            let image = this.parentElement.getElementsByTagName("img")[0];
                            mediaEditor.open("image", image);
                        }
                    }
                },*/
            ]
        });
    }
}
