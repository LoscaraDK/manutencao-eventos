manutencaoEventosApp.filter("searchDatesBetween", function ($filter) {
    return function (items, from, to) {
        var result = [];

        if (!from || !to) {
            return items;
        }

        var df = moment(from);
        var dt = moment(to);
        for (var i = 0; i < items.length; i++) {
            var tf = moment(items[i].date);
            if (tf > df && tf < dt) {
                result.push(items[i]);
            }
        }
        return result;
    };
});