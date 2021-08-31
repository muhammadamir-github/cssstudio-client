function saveTextAsFile(){
    var text = document.getElementById("textareaE").value + '\n' + '\n' + document.getElementById("textareaA").value;
    var textFileAsBlob = new Blob([text], {type:'text/plain'});
    var fileName = 'Css Stylesheet';

    let downloadLink = Globals.elements.new({
        type: "a",
        parent: Globals.window.body,
        attributes: {
            download: fileName,
            href: window.webkitURL != null ? window.webkitURL.createObjectURL(textFileAsBlob) : window.URL.createObjectURL(textFileAsBlob),
        },
        html: "Download File",
        style: {
            display: "none"
        },
        listeners: window.webkitURL == null ? {
            click: function(){
                this.remove();
            }
        } : null,
    })

    downloadLink.click();
}
