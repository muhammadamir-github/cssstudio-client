class InternalTooltipController{
    constructor(data){
        this.view = new InternalTooltipView(this);
        this.model = new InternalTooltipModel(data, this);
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
        this.refresh();
    }

    _setModelState(state = {}){
        this.model.state = {...state};
        this.refresh();
    }

    show(...args){ this.view.show(...args); }
    hide(){ this.view.hide(); }
    toggle(...args){ this.view.toggle(...args); }
    refresh(){ this.view.refresh(); }
}
