class ComboboxController{
    constructor(data){
        this.view = new ComboboxView;
        this.model = new ComboboxModel(data);
    }

    init(options = {}){
        this.view.create({
            elementType: options.elementType,
            parent: options.parent,
            before: options.before,
            prepend: options.prepend,
            data: this.model.state
        });
    }
}
