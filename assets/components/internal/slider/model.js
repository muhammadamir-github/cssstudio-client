class InternalSliderModel{
    constructor(data, controller){
        this.state = {
            ...data,
            min: data.min !== undefined && data.min !== null ? data.min : null,
            max: data.max !== undefined && data.max !== null ? data.max : null,
            step: data.step !== undefined && data.step !== null ? data.step : null,
            value: data.value !== undefined && data.value !== null ? data.value : null,
            forAnimator: data.forAnimator !== undefined && data.forAnimator !== null ? data.forAnimator : false,
            callbacks: {
                onApplyForAnimator: data.callbacks && data.callbacks.onApplyForAnimator !== undefined && data.callbacks.onApplyForAnimator !== null ? data.callbacks.onApplyForAnimator : null,
            },
        };

        this.controller = controller;
    }
}
