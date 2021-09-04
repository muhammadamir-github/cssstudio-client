self.addEventListener("message", async function(e){
    let images = e.data;
    let loaded = await Promise.all(
        images.map(async image => {
            try{
                let url = image.largeImageURL ? image.largeImageURL : image.urls && image.urls.full ? image.urls.full : image.images && image.images.original && image.images.original.url ? image.images.original.url : null;

                const response = await fetch(url);
                const fileBlob = await response.blob();
                return URL.createObjectURL(fileBlob);
            }catch(error){
                return null;
            }
        })
    );

    self.postMessage(loaded);
}, false);
