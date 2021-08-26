class ComboboxController{
    constructor(data){
        this.view = new ComboboxView;
        this.model = new ComboboxModel(data);
    }

    async init(options = {}){
        await this.view.create({
            parent: options.parent,
            before: options.before,
            prepend: options.prepend,
            data: this.model.state
        });
    }
}
