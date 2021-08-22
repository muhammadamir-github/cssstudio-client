class TableHandler{
    constructor(){}

    newTable(tid, tclass, theading, appendTo, appendToType, columns){
        var table = document.createElement('table');
        table.setAttribute('class',tclass);
        table.setAttribute('id',tid);

        var table_heading = document.createElement('p');
        table_heading.setAttribute('id',tid+'_heading');
        table_heading.setAttribute('class','table_heading');
        table_heading.innerText = theading;

        var table_thead = document.createElement('thead');
        table_thead.setAttribute('id',tid+'_thead');

        var table_tbody = document.createElement('tbody');
        table_tbody.setAttribute('id',tid+'_tbody');

        table_head_tr = document.createElement('tr');

        var column_names = columns.split('/');
        table.appendChild(table_heading);

        for(var i=0; i < column_names.length; i++){
            var table_head_tr_th = document.createElement('th');
            table_head_tr_th.setAttribute('id',tid+'_th');
            table_head_tr_th.innerText = capitalizeFirstLetter(column_names[i]);
            table_head_tr.appendChild(table_head_tr_th);
        }
        table_thead.appendChild(table_head_tr);
        table.appendChild(table_thead);
        table.appendChild(table_tbody);

        if(appendToType == 'id'){
            document.getElementById(appendTo).appendChild(table);
        }else{
            if(appendToType == 'class'){
                document.getElementsByClassName(appendTo)[0].appendChild(table);
            }
        }
    }

    populateTable(tid, data, columnsOrderWise){
        var tablebody = document.getElementById(tid).getElementsByTagName('tbody')[0];

        var splitted_columns = columnsOrderWise.split('/');

        for(var i=0; i < data.length; i++){
            var tr = document.createElement('tr');
            for(var x=0; x < splitted_columns.length; x++){
                var td = document.createElement('td');

                var valuetopick = splitted_columns[x];

                if(valuetopick == 'created_at'){
                    td.innerText = moment(moment.utc(data[i][valuetopick])).fromNow();
                }else{
                    td.innerText = data[i][valuetopick];
                }

                tr.appendChild(td);
            }

            tablebody.appendChild(tr);
        }
    }
}
