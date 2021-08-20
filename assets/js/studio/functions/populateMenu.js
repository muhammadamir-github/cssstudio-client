function populateMenu(){
    var menuBar = document.getElementById('menuBar');

    var button = document.createElement('button');
    button.innerText = 'Add New Widget';
    button.onclick = function(){
        addWidget();
    }

    menuBar.appendChild(button);
}
