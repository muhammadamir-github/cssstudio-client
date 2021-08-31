export default class Randomizer{
    constructor(){
        this.generated = {
            ids: [],
        };
    }

    id(length){
        var result = '';
        var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for (var i=0; i<length; i++){
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        if(!this.generated.ids.includes(result)){
            this.generated.ids.push(result);
            return result;
        }

        return this.id(length);
    }
}
