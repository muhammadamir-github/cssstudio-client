const Globals = window.globals;

class BlogHandler{
    constructor(data){
        this.data = data;
    }

    setup(){
        this.loadBlogs();
        document.getElementsByClassName('close')[0].addEventListener('click',function(){
            document.getElementsByTagName('fullview')[0].style.right = '100%';
        });
    }

    loadBlogs(){
        const self = this;

        var oldblogs = document.getElementsByTagName('blog');
        for(var i=0; i < oldblogs.length; i++){
            oldblogs[i].remove();
        }

        for(var i=0; i < self.data.length; i++){
            var blog = Globals.elements.new({
                type: "blog",
                parent: Globals.window.body,
                listeners: {
                    click: function(){
                        var fullview = document.getElementsByTagName('fullview')[0];
                        fullview.style.right = '0%';
                        fullview.getElementsByClassName('fw_heading')[0].innerText = self.data[i].heading;
                        fullview.getElementsByClassName('fw_image')[0].src = self.data[i].image_link;
                        fullview.getElementsByClassName('fw_content')[0].innerText = self.data[i].content;
                        fullview.getElementsByClassName('fw_author')[0].innerText = moment.utc(self.data[i].created_at).local().format("MMMM Do YYYY h:mm a") + ', By ' + self.data[i].author + '.';;
                    }
                },
                children: [
                    {
                        type: "p",
                        classes: [ "heading" ],
                        text: self.data[i].heading
                    },
                    {
                        type: "img",
                        classes: [ "image" ],
                        text: self.data[i].image_link
                    },
                    {
                        type: "p",
                        classes: [ "author" ],
                        text: moment.utc(self.data[i].created_at).local().format("MMMM Do YYYY h:mm a") + ', By ' + self.data[i].author + '.'
                    },
                    {
                        type: "p",
                        classes: [ "content" ],
                        text: self.data[i].content.slice(0, 500)+'...'
                    }
                ]
            })
        }

        var whitespace = Globals.elements.new({
            type: "div",
            parent: Globals.window.body,
            classes: [ "whitespace" ]
        });
    }
}
