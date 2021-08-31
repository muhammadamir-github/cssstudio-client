class InternalSliderView{
    constructor(controller){
        this.controller = controller;
        this._element = null;
        this.textKeyMap = {
            "Skew x-axis": { key: "skewX", valueSuffix: "", keyValueSuffix: "" },
            "Skew y-axis": { key: "skewY", valueSuffix: "", keyValueSuffix: "" },
            "Scale x-axis": { key: "scaleX", valueSuffix: "", keyValueSuffix: "" },
            "Scale y-axis": { key: "scaleY", valueSuffix: "", keyValueSuffix: "" },
            "Rotate x-axis": { key: "rotateX", valueSuffix: "", keyValueSuffix: "" },
            "Rotate y-axis": { key: "rotateY", valueSuffix: "", keyValueSuffix: "" },
        };

        this.idKeyMap = {
            "slideScaleX": { key: "slideScaleX", valueSuffix: "", keyValueSuffix: "" },
            "slideScaleY": { key: "slideScaleY", valueSuffix: "", keyValueSuffix: "" },
            "slideRotate": { key: "slideRotate", valueSuffix: "", keyValueSuffix: "" },
            "slideSkewX": { key: "slideSkewX", valueSuffix: "", keyValueSuffix: "" },
            "slideSkewY": { key: "slideSkewY", valueSuffix: "", keyValueSuffix: "" },
            "slideFontSize": { key: "slideFontSize", valueSuffix: "", keyValueSuffix: "" },
            "slideFontWeight": { key: "slideFontWeight", valueSuffix: "", keyValueSuffix: "" },
            "slideBorderSize": { key: "slideBorderSize", valueSuffix: "", keyValueSuffix: "" },
            "slideBorderRadius": { key: "slideBorderRadius", valueSuffix: "", keyValueSuffix: "" },
        };
    }

    create(options = {}){
        const self = this;
        const { data, parent, prepend, before, elementType, component_id } = options;

        self._element = Globals.elements.new({
            type: "div",
            parent,
            id: data.id ? data.id : null,
            style: data.style ? data.style : null,
            attributes: {
                "data-component-id": component_id,
            },
            children: [
                {
                    type: "p",
                    text: data.text,
                },
                {
                    type: "input",
                    classes: [ "slider" ],
                    attributes: {
                        type: "range",
                        min: data.min ? data.min : 0,
                        max: data.max ? data.max : 0,
                        step: data.step ? data.step : 0,
                        value: data.value ? data.value : 0,
                    },
                    listeners: {
                        input: data.id && data.id.startsWith("slide") ? function(){
                            let value = this.value;
                            if(data.id === "slideFontWeight"){ value = value == "0" ? "normal" : "bold"; }

                            dataAttributeBalancer(self.idKeyMap[data.id].key, value);
                        } : function(){
                            updateElement(elementType, self.textKeyMap[data.text].key, this.value);
                        }
                    }
                }
            ],
            before: before,
            prepend: prepend
        });
    }
}
