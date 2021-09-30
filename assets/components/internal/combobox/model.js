class InternalComboboxModel{
    constructor(data, controller){
        this.state = {
            ...data,
            selected: data.selected ? data.selected : null,
            value: data.value ? data.value : null,
            forAnimator: data.forAnimator !== undefined && data.forAnimator !== null ? data.forAnimator : false,
        };

        this.controller = controller;
    }
}
