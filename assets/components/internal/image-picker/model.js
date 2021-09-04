class InternalImagePickerModel{
    constructor(data, controller){
        this.state = {
            ...data,
            src: data.src ? data.src : null,
        };
        this.controller = controller;
    }
}
