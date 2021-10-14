class InternalColorPickerModel{
    constructor(data, controller){
        this.state = {
            ...data,
            color: data.color ? data.color : null,
            forAnimator: data.forAnimator !== undefined && data.forAnimator !== null ? data.forAnimator : false,
        };
        this.controller = controller;
    }
}
