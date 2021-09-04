async function getGoogleFonts(){
    const response = await Globals.api.request({ route: `googleFonts`, method: "get" });
    if(response.success === true){
        Globals.pageHandler.WebFonts = JSON.parse(response.data).items.map(font => {
            return font.variants.map(variant => {
                return (font.family + ' ' + variant).replace(/ /g,"_")
            })
        }).flat();

        return Globals.pageHandler.WebFonts;
    }
}
