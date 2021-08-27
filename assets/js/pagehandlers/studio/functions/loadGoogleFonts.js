async function loadGoogleFonts(response,element,mode){
    Globals.pageHandler.WebFonts = JSON.parse(response).items;

    var fonts = JSON.parse(response).items;
    let combobox = await Globals.components.new({
        name: "combobox",
        parent: mode == 'elementCreator' ? document.getElementById('googlefontssdiv') : document.getElementsByClassName('fontManager')[0],
        elementType: mode == "elementCreator" ? element : "selected",
        style: mode == "elementCreator" ? {
            left: '50%',
            top: '50%',
            marginTop: '25px',
            marginLeft: '0px',
            transform: 'translate(-50%,-50%)'
        } : null,
        data: {
            id: "googlefonts",
            text: "Google Fonts",
            options: (() => {
                let array = fonts.map(font => {
                    return font.variants.map(variant => {
                        return (font.family + ' ' + variant).replace(/ /g,"_")
                    })
                });

                return array.join();
            })(),
        }
    });

    if(mode == 'webpageBuilder'){
        document.getElementsByClassName('fontManager')[0].style.display = 'inline-block';
        Globals.pageHandler.progressLoader.hide();
    }
}
