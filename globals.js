var cols = {
    items: {},
    partners: {},
    sales: {},
    buys: {}
},
    itemAutoIncrement = 1,
    partnerAutoIncrement = 1,
    invoiceAutoIncrement = 1,
    totalTotal = 0,
    totalBill = 0,
    editingItemId,
    saleInvoice = {
        items: []
    };


/*Elemek, cikkek, partnerek létrehozásához szükséges függvény*/
function createElem(col, newElemObj) {
    cols[col][newElemObj._id] = newElemObj;
    databases[col].put(
        newElemObj,
        function onSuccess() {
            console.log('Az adatok sikeresen eltárolódtak az adatbázisban');
        },
        function onError(error) {
            console.error(error);
        }
    );
}

/*Elemek, cikkek, partnerek törléséhez szükséges függvény*/
function deleteElem(col, id) {
    delete cols[col][id];
    databases[col].remove(
        Number(id),
        function onSuccess() {
            console.log('siiikeeerült a törlés');
        },
        function onError(error) {
            console.error(error);
        }
    );
}

/*Bizonylat létrehozásához szükséges függvény*/
function createInvoice(newElemObj) {
    databases.saleInvoice.put(
        newElemObj,
        function onSuccess() {
            console.log('A számla sikeresen eltárolódott az adatbázisban');
        },
        function onError(error) {
            console.error(error);
        }
    );
}

/*Fejléc menüpontok beragadó active class fix.*/
$('.dropdown-menu li').on('click', function menuClickCallBack(e) {
    $('li').removeClass('active');
});

/*Nettó ár --> bruttó ár*/
function netPriceToGrossPrice(netPrice, vat) {
    var grossPrice = new BigNumber(netPrice).times(new BigNumber(vat).div(100).plus(1)).round(0, 4);

    return grossPrice;
}

/*Végösszeg*/
function totalPrice(grossPrice, soldItemQuantity) {
    return totalTotal += new BigNumber(grossPrice).times(new BigNumber(soldItemQuantity)).toNumber();
}