class ComboboxModel{
    constructor(data, controller){
        this.state = {
            ...data,
            selected: null,
            value: null,
            color: null,
        };
        
        this.controller = controller;
    }
}
