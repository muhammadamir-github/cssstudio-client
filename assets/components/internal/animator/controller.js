class InternalAnimatorController{
    constructor(data){
        this.view = new InternalAnimatorView(this);
        this.model = new InternalAnimatorModel(data, this);
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
        this.refresh();
    }

    _setModelState(state = {}){
        this.model.state = {...state};
        this.refresh();
    }

    show(...args){ this.view.show(...args); }
    hide(...args){ this.view.hide(...args); }
    toggle(...args){ this.view.toggle(...args); }
    refresh(...args){ this.view.refresh(...args); }
}
