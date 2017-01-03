var partners = {},
    items = {},
    sales = {},
    buys = {},
    autoIncrement = 1;

function createElem(col, newElemObj) {
    col[newElemObj._id] = newElemObj;
}

/*Fejléc menüpontok beragadó active class fix.*/
$('.dropdown-menu li').on('click', function (e) {
    $('li').removeClass('active');
});

$('#saveNewItem').on('click', function () {
    var itemName = $('#itemName').val(),
        itemQuantity = Number($('#itemQuantity').val()),
        itemNetPrice = Number($('#itemNetPrice').val()),
        itemVat = $('#itemVat').val();

    createElem(items, {
        _id: autoIncrement++,
        name: itemName,
        quantity: itemQuantity,
        netPrice: itemNetPrice,
        vat: itemVat
    });
    document.getElementById('myForm').reset();
});

$('#dropItem').on('click', function () {
    document.getElementById('myForm2').reset();
});

$('#saveNewPartner').on('click', function () {
    createElem(partners, {
        _id: autoIncrement++,
        name: $('#partnerName').val(),
        address: $('#partnerAddress').val(),
        taxNumber: $('#taxNumber').val()
    });
    document.getElementById('myForm2').reset();
});

$('#dropPartner').on('click', function () {
    document.getElementById('myForm2').reset();
});

$('#listItemsToggle').on('show.bs.tab', function () {
    var elem = document.createElement('tbody');

    _.each(items, function (item) {
        $(elem).append(`
        <tr>
            <td>${item._id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.netPrice}</td>
            <td>${item.vat}</td>
            <td><button type="button" class="btn btn-default">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button></td>
            <td><button type="button" class="btn btn-default">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button></td>
        </tr>`
        );
    });

    $('#itemsTable').replaceWith(elem);
    elem.setAttribute('id', 'itemsTable');
});

