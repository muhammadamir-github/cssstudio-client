class InternalImagePickerController{
    constructor(data){
        this.view = new InternalImagePickerView(this);
        this.model = new InternalImagePickerModel(data, this);
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
    hide(...args){ this.view.hide(...args); }
    toggle(...args){ this.view.toggle(...args); }
    refresh(...args){ this.view.refresh(...args); }
    syncValue(){ this.view.syncValue(); }
}
