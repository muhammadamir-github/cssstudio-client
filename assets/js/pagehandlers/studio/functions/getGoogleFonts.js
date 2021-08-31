async function getGoogleFonts(element,mode){
    const response = await Globals.api.request({ route: `googleFonts`, method: "get" });
    if(response.success === true){
        loadGoogleFonts(response.data,element,mode);
    }
}

async function loadGoogleFonts(response,element,mode){
    Globals.pageHandler.WebFonts = JSON.parse(response).items;

    var fonts = JSON.parse(response).items;
    let combobox = await Globals.components.new({
        name: "internal-combobox",
        parent: mode == 'elementCreator' ? document.getElementById('googlefontssdiv') : document.getElementsByClassName('fontManager')[0],
        elementType: mode == "elementCreator" ? element : "selected",
        data: {
            id: "googlefonts",
            text: "Google Fonts",
            style: mode == "elementCreator" ? {
                left: '50%',
                top: '50%',
                marginTop: '25px',
                marginLeft: '0px',
                transform: 'translate(-50%,-50%)'
            } : null,
            options: (() => {
                return fonts.map(font => {
                    return font.variants.map(variant => {
                        return (font.family + ' ' + variant).replace(/ /g,"_")
                    })
                }).flat();
            })(),
        }
    });

    if(mode == 'webpageBuilder'){
        document.getElementsByClassName('fontManager')[0].style.display = 'inline-block';
    }
}
