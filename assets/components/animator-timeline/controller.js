class AnimatorTimelineController{
    constructor(data){
        this.view = new AnimatorTimelineView(this);
        this.model = new AnimatorTimelineModel(data, this);
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
