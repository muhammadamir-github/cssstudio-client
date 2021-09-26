class InternalAnimatorModel{
    constructor(data, controller){
        this.state = {
            ...data,
            readyMadeAnimations: data.readyMadeAnimations && Array.isArray(readyMadeAnimations) ? data.readyMadeAnimations : [],
        };
        this.controller = controller;
    }
}
