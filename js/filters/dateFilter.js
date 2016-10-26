manutencaoEventosApp.filter("searchDatesBetween", function ($filter) {

    return function (items, from, to) {

        var result = [];
        if (!from || !to) {
            return items;
        }
        var df = moment(moment(from).format('YYYY-MM-DD'));
        var dt = moment(moment(to).format('YYYY-MM-DD'));
        for (var i = 0; i < items.length; i++) {
            var dtSemFt = moment(items[i].date).format('YYYY-MM-DD');
            var tf = moment(dtSemFt);
            // console.log('FROM FT > ' + moment(from).format('YYYY-MM-DDTHH:mm:ss.SSSZ'));
            // console.log('TO FT > '+ moment(to).format('YYYY-MM-DDTHH:mm:ss.SSSZ'));
            // console.log('FROM FT2 > ' + moment(from).format('YYYY-MM-DDT00:00:00.000Z'));
            // console.log('TO FT2 > '+ moment(to).format('YYYY-MM-DDT00:00:00.000Z'));
            //console.log('FROM > ' + df);
            //console.log('TO > ' + dt);
            //console.log('TF > ' + tf);
            // console.log('dtSemFtTF > ' + dtSemFt);
            var isBefore = moment(tf).isSameOrBefore(dt, 'day');
            var isAfter = moment(tf).isSameOrAfter(df, 'day');
            //console.log('isSameOrBefore: ' + isBefore + ' e isAfter: ' + isAfter);
            //if (tf >= df && tf <= dt) {
            if (isBefore && isAfter) {
                result.push(items[i]);
            }
        }
        return result;
    };
});