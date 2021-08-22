function saveTextAsFile(){
    var text = document.getElementById("textareaE").value + '\n' + '\n' + document.getElementById("textareaA").value;
    var textFileAsBlob = new Blob([text], {type:'text/plain'});
    var fileName = 'Css Stylesheet';

    var downloadLink = document.createElement("a");
    downloadLink.download = fileName;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}
