class InternalAnimatorTimelineModel{
    constructor(data, controller){
        this.state = {
            ...data,
            slides: data.slides && Array.isArray(data.slides) ? data.slides : [],
        };
        this.controller = controller;
    }
}
