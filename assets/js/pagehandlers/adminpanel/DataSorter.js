class DataSorter{
    constructor(){}

    sortByMonthYear(array1, array2){
        var indices = Object.keys(array1).sort(function (a, b) {
            function getD(i) {
                var months = { Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06', Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12' },
                s = array1[i];
                return s.replace(/^(...)(.+)$/, (_, m, y) => [y.padStart(4, '0'), months[m]].join('-'));
            }
            return getD(a).localeCompare(getD(b));
        });

        [array1, array2].forEach(a => {
            var temp = indices.map(i => a[i]);
            a.length = 0;
            a.push(...temp);
        });

        return [array1, array2];
    }
}
