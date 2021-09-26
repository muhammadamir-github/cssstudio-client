class InternalPanelController{
    constructor(data){
        this.view = new InternalPanelView(this);
        this.model = new InternalPanelModel(data, this);
    }

    async _init(options = {}){
        await this.view.create({
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

    show(...args){ this.view.show(...args); }
    hide(...args){ this.view.hide(...args); }
    toggle(...args){ this.view.toggle(...args); }
}
