class InternalImagePickerModel{
    constructor(data, controller){
        this.state = {
            ...data,
            src: data.src ? data.src : null,
            forAnimator: data.forAnimator !== undefined && data.forAnimator !== null ? data.forAnimator : false,
        };
        this.controller = controller;
    }
}
