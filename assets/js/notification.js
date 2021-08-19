export default class NotificationHandler{
    constructor(){}

    new(text){
        var notification = document.createElement('notification');
        var notification_heading = document.createElement('p');
        notification_heading.setAttribute('class','heading');
        var notification_message = document.createElement('p');
        notification_message.setAttribute('class','message');
        notification_message.innerText = text;

        if(text.includes('saved') || text.includes('Saved')){
          notification_heading.innerText = 'Saved';
          notification_heading.style.color = 'Green';
          notification.style.border = '2px solid Green';
        }

        if(text.includes('successfully') || ('Successfully')){
          notification_heading.innerText = 'Success';
          notification_heading.style.color = 'Green';
          notification.style.border = '2px solid Green';
        }

        if(text.includes('error') || text.includes('Error')){
          notification_heading.innerText = 'Error';
          notification_heading.style.color = 'DarkRed';
          notification.style.border = '2px solid DarkRed';
        }

        notification.appendChild(notification_heading);
        notification.appendChild(notification_message);

        notification.addEventListener('click',function(){
          this.remove();
        });

        $('body').append(notification);
    }
}
