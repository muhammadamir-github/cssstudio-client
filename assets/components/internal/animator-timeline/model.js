class InternalAnimatorTimelineModel{
    constructor(data, controller){
        this.state = {
            ...data,
            slides: data.slides && Array.isArray(data.slides) ? data.slides : [],
            callbacks: {
                onEnable: data.callbacks.onEnable ? data.callbacks.onEnable : null,
                onDisable: data.callbacks.onDisable ? data.callbacks.onDisable : null,
                onStylerToggle: data.callbacks.onStylerToggle ? data.callbacks.onStylerToggle : null,
            },
        };
        this.controller = controller;
    }
}
