function onPlayerStateChange(event){
    if(event.data == YT.PlayerState.PLAYING) {
        //stopVideo;
        site.selectElement($('[data-e-type="video"]')[0]);
        console.log('1')
    }else{
        if(event.data == YT.PlayerState.PAUSED){
            site.selectElement($('[data-e-type="video"]')[0]);
            console.log('2')
            //startVideo;
        }
    }
}
