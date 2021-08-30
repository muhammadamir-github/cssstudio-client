class ComboboxController{
    constructor(data){
        this.view = new ComboboxView(this);
        this.model = new ComboboxModel(data, this);
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
