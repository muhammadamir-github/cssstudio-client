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
                        min: data.min !== undefined && data.min !== null ? data.min : 1,
                        max: data.max !== undefined && data.max !== null ? data.max : 1,
                        step: data.step !== undefined && data.step !== null ? data.step : 1,
                    },
                    listeners: {
                        input: data.id && data.id.startsWith("slide") ? function(){
                            let value = this.value;
                            if(data.id === "slideFontWeight"){ value = value == 0 ? "normal" : "bold"; }

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

        for (let input of self._element.getElementsByTagName("input")){
            input.value = data.value !== undefined && data.value !== null ? data.value : 0;
        }
    }
}
