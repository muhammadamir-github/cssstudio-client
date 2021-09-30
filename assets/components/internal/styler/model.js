class InternalStylerModel{
    constructor(data, controller){
        this.state = {
            ...data,
            forAnimator: data.forAnimator !== undefined && data.forAnimator !== null ? data.forAnimator : false,
        };
        this.controller = controller;
    }
}
