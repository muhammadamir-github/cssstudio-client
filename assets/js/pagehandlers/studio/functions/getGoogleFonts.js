async function getGoogleFonts(){
    const response = await Globals.api.request({ route: `googleFonts`, method: "get" });
    if(response.success === true){
        Globals.pageHandler.WebFonts = JSON.parse(response.data).items;
        return Globals.pageHandler.WebFonts;
    }
}
