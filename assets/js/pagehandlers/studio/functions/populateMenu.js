function populateMenu(){
    var menuBar = document.getElementById('menuBar');

    let button = Globals.elements.new({
        type: "button",
        parent: menuBar,
        text: "Add New Widget",
        listeners: {
            click: addWidget
        }
    });
}
