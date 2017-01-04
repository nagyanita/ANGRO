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
            <td>${item.netPrice} Ft</td>
            <td>${item.vat}</td>
            <td><button type="button" class="btn btn-default" data-element="itemEdit" data-itemid="${item._id}">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button></td>
            <td><button type="button" class="btn btn-default" data-element="itemDelete">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button></td>
        </tr>`
        );
    });

    $('#itemsTable').replaceWith(elem);
    elem.setAttribute('id', 'itemsTable');
});


$('#itemsMainTable').on('click', '[data-element="itemEdit"]', function(e){
    $('#myModal').modal('show');
    var itemId = $(e.target).attr('data-itemid'),
        itemName = items[itemId].name,
        itemQuantity = items[itemId].quantity,
        itemNetPrice = items[itemId].netPrice,
        itemVat = items[itemId].vat;
    $('#itemsName').val(itemName);
    $('#itemsQuantity').val(itemQuantity);
    $('#itemsNetPrice').val(itemNetPrice);
    $('#itemsVat').val(itemVat);
});

$('#saveEditedItem').on('click', function () {
    var itemName = $('#itemsName').val(),
        itemQuantity = Number($('#itemsQuantity').val()),
        itemNetPrice = Number($('#itemsNetPrice').val()),
        itemVat = $('#itemsVat').val();

    createElem(items, {
        _id: autoIncrement++,
        name: itemName,
        quantity: itemQuantity,
        netPrice: itemNetPrice,
        vat: itemVat
    });
    document.getElementById('myForm').reset();
});

$('#listPartnersToggle').on('show.bs.tab', function () {
    var elem = document.createElement('tbody');

    _.each(partners, function (partner) {
        $(elem).append(`
        <tr>
            <td>${partner._id}</td>
            <td>${partner.name}</td>
            <td>${partner.address}</td>
            <td>${partner.taxNumber} Ft</td>
            <td><button type="button" class="btn btn-default" id="partnerEdit">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true"></span>
            </button></td>
            <td><button type="button" class="btn btn-default" id="partnerDelete">
                <span class="glyphicon glyphicon-trash" aria-hidden="true"></span>
            </button></td>
        </tr>`
        );
    });

    $('#partnersTable').replaceWith(elem);
    elem.setAttribute('id', 'partnersTable');
});