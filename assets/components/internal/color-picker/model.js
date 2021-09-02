class InternalColorPickerModel{
    constructor(data, controller){
        this.state = {
            ...data,
            color: data.color ? data.color : null,
        };
        this.controller = controller;
    }
}
