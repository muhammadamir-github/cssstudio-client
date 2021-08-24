class TableHandler{
    constructor(){}

    newTable(tid, tclass, theading, appendTo, appendToType, columns){
        var table = Globals.elements.new({
            type: "table",
            parent: appendToType == "id" ? document.getElementById(appendTo) : document.getElementsByClassName(appendTo)[0],
            classes: [ tclass ],
            id: tid,
            children: [
                {
                    type: "p",
                    id: `${tid}_heading`,
                    classes: [ "table_heading" ],
                    text: theading
                },
                {
                    type: "thead",
                    id: `${tid}_thead`,
                    children: [
                        {
                            type: "tr",
                            children: (() => {
                                return columns.split('/').map((x,i) => {
                                    return {
                                        type: "th",
                                        id: `${tid}_th`,
                                        text: capitalizeFirstLetter(x)
                                    }
                                });
                            })(),
                        }
                    ]
                },
                {
                    type: "tbody",
                    id: `${tid}_tbody`
                },
            ]
        });
    }

    populateTable(tid, data, columnsOrderWise){
        var tablebody = document.getElementById(tid).getElementsByTagName('tbody')[0];

        var splitted_columns = columnsOrderWise.split('/');

        for(var i=0; i < data.length; i++){
            var tr = Globals.elements.new({
                type: "tr",
                parent: tablebody,
                children: (() => {
                    return splitted_columns.map(x => {
                        return {
                            type: "td",
                            text: x == 'created_at' ? moment(moment.utc(data[i][x])).fromNow() : data[i][x],
                        }
                    });
                })(),
            });
        }
    }
}
