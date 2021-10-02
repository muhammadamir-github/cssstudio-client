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

        this.transforms = ["rotateX", "rotateY", "skewX", "skewY", "scaleX", "scaleY"];
    }

    create(options = {}){
        const self = this;
        const { data, parent, prepend, before, elementType, component_id } = options;

        self._element = Globals.elements.new({
            type: "slider",
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
                    attributes: {
                        type: "range",
                        min: data.min !== undefined && data.min !== null ? data.min : 1,
                        max: data.max !== undefined && data.max !== null ? data.max : 1,
                        step: data.step !== undefined && data.step !== null ? data.step : 1,
                    },
                    listeners: {
                        input: function(){
                            self.changeValue(self, this.value);
                        },
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

    changeValue(self, value){
        let data = self.controller._getModelState();
        let inputElement = self._element.getElementsByTagName("input");

        value = value ? value : inputElement[0] ? inputElement[0].getAttribute("min") : 0;

        if(data.id && data.id.startsWith("slide")){
            if(data.id === "slideFontWeight"){ value = value == 0 ? "normal" : "bold"; }
            dataAttributeBalancer(self.idKeyMap[data.id].key, value);
        }else{
            updateElement(self.textKeyMap[data.text].key, value, function(key, value){
                data.forAnimator === true ? (data.callbacks.onApplyForAnimator ? data.callbacks.onApplyForAnimator(key, value) : false) : false;
            });
        }

        inputElement[0] ? inputElement[0].value = value : false; // Making sure the value is same if changeValue(this function) was called not from an input event.
    }

    async syncValue(){
        const self = this;
        const data = await self.controller._getModelState();

        let applyTo = data.forAnimator === true ? document.getElementById("animator-preview-element") : document.getElementsByClassName("selected-element")[0];
        if(applyTo){
            let key = self.textKeyMap[data.text].key;
            let currentStyleValue = applyTo && key ? (self.transforms.includes(key) ? applyTo.style.transform : applyTo.style[key]) : null;

            if(self.transforms.includes(key)){
                if(currentStyleValue && currentStyleValue.includes(key)){
                    let match = await currentStyleValue.match(new RegExp(`${key}\(([^)]+)\)`));
                    currentStyleValue = Array.isArray(match) && match[1] ? match[1].replaceAll("(", "").replaceAll(")", "").replaceAll("deg", "") : null;
                }else{
                    currentStyleValue = 0;
                }
            }

            await self.changeValue(self, currentStyleValue);
        }
    }
}
