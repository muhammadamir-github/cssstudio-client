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
            var blog = document.createElement('blog');

            var heading = document.createElement('p');
            heading.setAttribute('class','heading');
            heading.innerText = self.data[i].heading;

            var image = document.createElement('img');
            image.setAttribute('class','image');
            image.src = self.data[i].image_link;

            var author = document.createElement('p');
            author.setAttribute('class','author');
            author.innerText = moment.utc(self.data[i].created_at).local().format("MMMM Do YYYY h:mm a") + ', By ' + self.data[i].author + '.';

            var content = document.createElement('p');
            content.setAttribute('class','content');
            content.innerText = self.data[i].content.slice(0, 500)+'...';

            blog.appendChild(heading);
            blog.appendChild(image);
            blog.appendChild(content);
            blog.appendChild(author);

            blog.addEventListener("click",function(){
                var fullview = document.getElementsByTagName('fullview')[0];
                fullview.style.right = '0%';
                fullview.getElementsByClassName('fw_heading')[0].innerText = self.data[i].heading;
                fullview.getElementsByClassName('fw_image')[0].src = self.data[i].image_link;
                fullview.getElementsByClassName('fw_content')[0].innerText = self.data[i].content;
                fullview.getElementsByClassName('fw_author')[0].innerText = moment.utc(self.data[i].created_at).local().format("MMMM Do YYYY h:mm a") + ', By ' + self.data[i].author + '.';;
            });

            document.getElementsByTagName('body')[0].appendChild(blog);
        }

        var whitespace = document.createElement('div');
        whitespace.setAttribute('class','whitespace');
        document.getElementsByTagName('body')[0].appendChild(whitespace);
    }
}
