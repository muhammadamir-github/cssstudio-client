class AnimatorTimelineController{
    constructor(data){
        this.view = new AnimatorTimelineView;
        this.model = new AnimatorTimelineModel(data);
    }

    init(options = {}){
        this.view.create({
            parent: options.parent,
            before: options.before,
            prepend: options.prepend,
            data: this.model.state
        });
    }
}
