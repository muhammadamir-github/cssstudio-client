class InternalComboboxController{
    constructor(data){
        this.view = new InternalComboboxView(this);
        this.model = new InternalComboboxModel(data, this);
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

    _updateModelState(updates = {}){
        this.model.state = {...this.model.state, ...updates};
    }

    _setModelState(state = {}){
        this.model.state = {...state};
    }
}
