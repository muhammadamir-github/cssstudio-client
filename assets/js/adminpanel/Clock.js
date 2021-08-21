class Clock{
    constructor(){}

    update(){
        document.getElementById('clock').innerText = moment().utc().format('hh:mm:ss A');
    }
}
