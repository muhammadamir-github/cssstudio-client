async function getGoogleFonts(element,mode){
    const response = await Globals.api.request({ route: `google/fonts`, method: "get" });
    if(response.success === true){
        loadGoogleFonts(response.data,element,mode);
    }
}
