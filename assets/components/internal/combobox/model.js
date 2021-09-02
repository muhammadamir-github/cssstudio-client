class InternalComboboxModel{
    constructor(data, controller){
        this.state = {
            ...data,
            selected: data.selected ? data.selected : null,
            value: data.value ? data.value : null,
        };

        this.controller = controller;
    }
}
