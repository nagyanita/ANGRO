var databases = {
    items: new IDBStore({
        dbVersion: 1,
        storeName: 'items',
        keyPath: '_id',
        autoIncrement: false,
        onStoreReady: function () {
            console.log('Store ready!');
            databases.items.getAll((result) => {
                cols.items = _.keyBy(result, '_id');

                var max = _.maxBy(result, function (elem) {
                    return Number(elem._id);
                });

                if (max) {
                    itemAutoIncrement = Number(max._id) + 1;
                }
            });
        }
    }),
    partners: new IDBStore({
        dbVersion: 1,
        storeName: 'partners',
        keyPath: '_id',
        autoIncrement: false,
        onStoreReady: function () {
            console.log('Store ready!');
            databases.partners.getAll((result) => {
                cols.partners = _.keyBy(result, '_id');

                var max = _.maxBy(result, function (elem) {
                    return Number(elem._id);
                });

                if (max) {
                    partnerAutoIncrement = Number(max._id)  + 1;
                }
            });
        }
    }),

    saleInvoice: new IDBStore({
        dbVersion: 9,
        storeName: 'saleInvoice',
        keyPath: '_id',
        autoIncrement: false,
        indexes: [{
            name: '_id',
            keyPath: '_id',
            unique: true
        }],
        onStoreReady: function () {
            console.log('Store ready!');
            databases.saleInvoice.iterate(function onItem(elem) {
                invoiceAutoIncrement = elem._id + 1;
            },
                {
                    index: '_id',
                    order: 'DESC',
                    limit: 1,
                    filterDuplicates: false,
                    writeAccess: false,
                    onEnd: function onEndCallback() {
                        console.log('saleInvoice database is ready');
                    },
                    onError: function onErrorCallback(error) {
                        console.log(error);
                    }
                });
        }
    })
};