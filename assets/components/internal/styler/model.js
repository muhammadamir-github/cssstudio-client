class InternalStylerModel{
    constructor(data, controller){
        this.state = {
            ...data,
            forAnimator: data.forAnimator !== undefined && data.forAnimator !== null ? data.forAnimator : false,
            callbacks: {
                onApplyForAnimator: data.callbacks && data.callbacks.onApplyForAnimator !== undefined && data.callbacks.onApplyForAnimator !== null ? data.callbacks.onApplyForAnimator : null,
            },
        };
        this.controller = controller;
    }
}
