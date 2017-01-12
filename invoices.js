/*globals cols grossPrice netPriceToGrossPrice saleInvoice partners deleteElem totalPrice soldItemQuantity item databases createInvoice */
/*Partner kiválasztása */
$('#sellInvoices').on('click', function sellInvoicesCallBack() {
    $('#partnersSelect').empty();
    $('#partnersSelect').append(`<option value=""></option>`);
    _.each(cols.partners, function eachPartner(partner) {
        $('#partnersSelect').append(`<option value="${partner._id}">${partner.name}</option>`);
    });
    $('#partnersSelect').change(function partnersPushCallBack(e) {
        var partner = cols.partners[$(e.target).val()];

        saleInvoice.partner = partner;
        $('#customerName').empty();
        $('#customerName').append(`
            Vevő:<br>
            ${partner.name}<br>
            ${partner.address}<br>
            ${partner.taxNumber}<br>`);
    });
});

/*Cikkek megjelenítése*/
$('#sellInvoices').on('show.bs.tab', function sellItemsToggleCallBack() {
    var elem = document.createElement('tbody');

    _.each(cols.items, function eachItem(item) {
        $(elem).append(`
        <tr id="rowId${item._id}">
            <td>${item._id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.netPrice} Ft</td>
            <td>${item.vat} %</td>
            <td>${netPriceToGrossPrice(item.netPrice, item.vat)}</td>
            <td><input type="number" class="form-control col-sm-4" id="soldQuantity" data-soldId="${item._id}"></td>
            <td align="center"><button type="button" class="btn btn-success" id="saveNewItem" data-element="itemAdd" data-itemid="${item._id}">Hozzáadás</button>
        </tr>`
        );
    });

    $('#sellItemsTable').replaceWith(elem);
    elem.setAttribute('id', 'sellItemsTable');
});

/*Cikk hozzáadása a bizonylathoz*/
$('#sellItemsToggle').on('click', '[data-element="itemAdd"]', function itemSelectedCallBack(e) {
    var item = _.cloneDeep(cols.items[$(e.target).attr('data-itemid')]),
        itemInvoice = _.find(saleInvoice.items, { _id: item._id });

    item.quantity = Number($(`[data-soldId="${item._id}"]`).val());

    if (!itemInvoice) {
        $('#selectedItemsTable').append(`
        <tr id="salesRowId${item._id}">
            <td>${item._id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.netPrice} Ft</td>
            <td>${item.vat} %</td>
            <td>${netPriceToGrossPrice(item.netPrice, item.vat)}</td>
            <td><button type="button" class="btn btn-default" data-element="itemNotSold" data-itemid="${item._id}">
                <span class="glyphicon glyphicon-trash" aria-hidden="true" data-itemid="${item._id}"></span>
            </button></tr>`
        );
        saleInvoice.items.push(item);
        $('#totalPrice').empty();
        $(`[data-soldId="${item._id}"]`).val('');
    } else {
        $('#itemIsAlreadySelected').modal('show');
    }

    /*Végösszeg kitöltése */
    if (!itemInvoice) {
        $('#totalPrice').replaceWith(`<td id="totalPrice">${totalPrice(netPriceToGrossPrice(item.netPrice, item.vat), item.quantity)} Ft</td>`);
    } else {
        console.log('Nem változik a végösszeg');
    }
});

/*Cikk törlése a bizonylatból*/
$('#selectedItemsTable').on('click', '[data-element="itemNotSold"]', function itemNotSoldCallBack(e) {
    var itemId = $(e.target).attr('data-itemid');

    $(`#salesRowId${itemId}`).remove();
    _.remove(saleInvoice.items, function (elem) {
        return elem._id == itemId;
    });

    var sumTotal = _.reduce(saleInvoice.items, function (sum, elem) {
        return sum + (netPriceToGrossPrice(elem.netPrice, elem.vat) * elem.quantity);
    }, 0);

    totalTotal = sumTotal;

    $('#totalPrice').replaceWith(`<td id="totalPrice">${sumTotal} Ft</td>`);
});

/*Számla tárolása */
$('#saveInvoice').on('click', function saveInvoiceCallBack(e) {
    var saleInvoiceId = invoiceAutoIncrement++,
        invoiceDate = moment().format('MMM Do YY');
    newInvoice = {};

    saleInvoice.total = totalTotal;
    saleInvoice._id = saleInvoiceId;
    saleInvoice.date = invoiceDate;
    createInvoice(saleInvoice);

    _.each(saleInvoice.items, function eachItem(itemItem) {
        var wantedQuantity = itemItem.quantity, //beírt mennyiség, amennyit vásárolni akarunk belőle
            actualItemId = itemItem._id; //a beírt termék id-je
        cols.items[actualItemId].quantity -= wantedQuantity;
    });

    saleInvoice = {
        items: []
    };
    $('#selectedItemsTable').empty();
    $('#customerName').empty();
    $('#totalPrice').empty();

    var elem = document.createElement('tbody');

    _.each(cols.items, function eachItem(itemIt) {
        $(elem).append(`
        <tr id="rowId${itemIt._id}">
            <td>${itemIt._id}</td>
            <td>${itemIt.name}</td>
            <td>${itemIt.quantity}</td>
            <td>${itemIt.netPrice} Ft</td>
            <td>${itemIt.vat} %</td>
            <td>${netPriceToGrossPrice(itemIt.netPrice, itemIt.vat)}</td>
            <td><input type="number" class="form-control col-sm-4" id="soldQuantity" data-soldId="${itemIt._id}"></td>
            <td align="center"><button type="button" class="btn btn-success" id="saveNewItem" data-element="itemAdd" data-itemid="${itemIt._id}">Hozzáadás</button>
        </tr>`
        );
    });

    $('#sellItemsTable').replaceWith(elem);
    elem.setAttribute('id', 'sellItemsTable');
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ A program újratöltésekor "visszaugrik" a "standard" mennyiségekre, ezt kell korrigálni ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
});

/*Táblázatban való keresés*/
function myFunction() {
    // Declare variables 
    var input, filter, table, tr, td, i;

    input = document.getElementById('myInput');
    filter = input.value.toUpperCase();
    table = document.getElementById('sellItemsToggle');
    tr = table.getElementsByTagName('tr');

    // Loop through all table rows, and hide those who don't match the search query
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[1];
        if (td) {
            if (td.innerHTML.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = '';
            } else {
                tr[i].style.display = 'none';
            }
        }
    }
}

/*Számlák kilistázása Partner/Eladás menüpontban */
$('#invoiceShowToggle').on('click', function invoiceShowCallBack() {
    $('#selectedInvoiceTable').empty();
    databases.saleInvoice.iterate(function onItem(invoice) {
        $('#selectedInvoiceTable').append(`
          <tr id="rowId${invoice._id}">
            <td>${invoice._id}</td>
            <td>${invoice.partner.name}</td>
            <td>${invoice.total} Ft</td>
            <td>${invoice.date}</td>
            <td><button type="button" class="btn btn-default" data-element="invoiceDetailsShow" data-itemid="${invoice._id}">
                <span class="glyphicon glyphicon-fullscreen" aria-hidden="true" data-itemid="${invoice._id}"></span>
            </button></td>
          </tr>`
        );
    },
        {
            index: '_id',
            order: 'DESC',
            limit: 20,
            filterDuplicates: false,
            writeAccess: false,
            onEnd: function onEndCallback() {
                console.log('Számlák kilistázva');
            },
            onError: function onErrorCallback(error) {
                console.log(error);
            }
        });
});

/*Számla részleteinek megjelenítése*/
$('#selectedInvoiceTable').on('click', '[data-element="invoiceDetailsShow"]', function invoiceDetailsShowCallBack(e) {
    $('#nameOfCustomer').empty();
    $('#itemsDetailsTbody').empty();
    $('#dateAndTotal').empty();
    var invoiceId = Number($(e.target).attr('data-itemid')),
        elem = document.createElement('tbody');
    databases.saleInvoice.get(
        invoiceId,
        function onSuccess(invoice) {
            $('#invoiceDetailsShowModal').modal('show');
            $('#nameOfCustomer').append(`
            Vevő:<br>
            ${invoice.partner.name}<br>
            ${invoice.partner.address}<br>
            ${invoice.partner.taxNumber}<br>`);
            _.each(invoice.items, function eachItem(itemItem) {
                $('#itemsDetailsTbody').append(`
                    <tr id="rowId${itemItem._id}">
                        <td>${itemItem._id}</td>
                        <td>${itemItem.name}</td>
                        <td>${itemItem.quantity}</td>
                        <td>${itemItem.netPrice} Ft</td>
                        <td>${itemItem.vat} %</td>
                        <td>${netPriceToGrossPrice(itemItem.netPrice, itemItem.vat)} Ft</td>`
                );
            });
            $('#dateAndTotal').append(`
                   <tr id="rowId${invoice._id}">
                     <td width="25%">Dátum:</td>
                     <td width="25%">${invoice.date}</td>
                     <td width="25%">Végösszeg:</td>
                     <td width="25%">${invoice.total} Ft</td>
                   </tr>`);
        },
        function onError(error) {
            console.error(error);
        }
    );
});