class SliderController{
    constructor(data){
        this.view = new SliderView(this);
        this.model = new SliderModel(data, this);
    }

    _init(options = {}){
        this.view.create({
            ...options,
            data: this.model.state
        });
    }

    _getModelState(){
        return this.model.state;
    }
}
