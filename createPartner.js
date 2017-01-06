<<<<<<< HEAD
var partners = {},
    items = {},
    sales = {},
    buys = {},
    autoIncrement = 1,
    editingItemId;

function createElem(col, newElemObj) {
    col[newElemObj._id] = newElemObj;
}

/*function (newElemObj){
    newElemObj._id
} */

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
        <tr id="rowId${item._id}">
            <td>${item._id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.netPrice} Ft</td>
            <td>${item.vat}</td>
            <td><button type="button" class="btn btn-default" data-element="itemEdit" data-itemid="${item._id}">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true" data-itemid="${item._id}"></span>
            </button></td>
            <td><button type="button" class="btn btn-default" data-element="itemDelete" data-itemid="${item._id}">
                <span class="glyphicon glyphicon-trash" aria-hidden="true" data-itemid="${item._id}"></span>
            </button></td>
        </tr>`
        );
    });

    $('#itemsTable').replaceWith(elem);
    elem.setAttribute('id', 'itemsTable');
});


$('#itemsMainTable').on('click', '[data-element="itemEdit"]', function (e) {
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
    editingItemId = itemId;
});

$('#saveEditedItem').on('click', function () {
    var editedItemName = $('#itemsName').val(),
        editedItemQuantity = Number($('#itemsQuantity').val()),
        editedItemNetPrice = Number($('#itemsNetPrice').val()),
        editedItemVat = $('#itemsVat').val();

    createElem(items, {
        _id: editingItemId,
        name: editedItemName,
        quantity: editedItemQuantity,
        netPrice: editedItemNetPrice,
        vat: editedItemVat
    });
    document.getElementById('myForm').reset();

    var elem = document.createElement('tr'),
        item = items[editingItemId];
    $(elem).append(`
            <td>${item._id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.netPrice} Ft</td>
            <td>${item.vat}</td>
            <td><button type="button" class="btn btn-default" data-element="itemEdit" data-itemid="${item._id}">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true" data-element="itemEdit" data-itemid="${item._id}"></span>
            </button></td>
            <td><button type="button" class="btn btn-default" data-element="itemDelete" data-itemid="${item._id}">
                <span class="glyphicon glyphicon-trash" aria-hidden="true" data-element="itemDelete" data-itemid="${item._id}"></span>
            </button></td>`
    );
    $(`#rowId${item._id}`).replaceWith(elem);
    elem.setAttribute('id', `rowId${item._id}`);
    $('#myModal').modal('hide');
});

$('#itemsMainTable').on('click', '[data-element="itemDelete"]', function (e) {
    $('#myModal2').modal('show');
    $('#yesDelete').one('click', function () {
        editingItemId = $(e.target).attr('data-itemid');
        $(`#rowId${editingItemId}`).remove();
        $('#myModal2').modal('hide');
    });
    
});

$('#listPartnersToggle').on('show.bs.tab', function () {
    var elem = document.createElement('tbody');

    _.each(partners, function (partner) {
        $(elem).append(`
        <tr id="rowId${partner._id}">
            <td>${partner._id}</td>
            <td>${partner.name}</td>
            <td>${partner.address}</td>
            <td>${partner.taxNumber} Ft</td>
            <td><button type="button" class="btn btn-default" data-element="partnerEdit" data-itemid="${partner._id}">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true" data-itemid="${partner._id}"></span>
            </button></td>
            <td><button type="button" class="btn btn-default" data-element="partnerDelete" data-itemid="${partner._id}">
                <span class="glyphicon glyphicon-trash" aria-hidden="true" data-itemid="${partner._id}"></span>
            </button></td>
        </tr>`
        );
    });

    $('#partnersTable').replaceWith(elem);
    elem.setAttribute('id', 'partnersTable');
});


$('#partnersMainTable').on('click', '[data-element="partnerEdit"]', function (e) {
    $('#myModal3').modal('show');
    var partnerId = $(e.target).attr('data-itemid'),
        partnerName = partners[partnerId].name,
        partnerAddress = partners[partnerId].address,
        partnerTaxNumber = partners[partnerId].taxNumber;
    $('#partnersName').val(partnerName);
    $('#partnersAddress').val(partnerAddress);
    $('#partnersTaxNumber').val(partnerTaxNumber);
    editingItemId = partnerId;
});

$('#saveEditedPartner').on('click', function () {
    var editedPartnerName = $('#partnersName').val(),
        editedPartnerAddress = $('#partnersAddress').val(),
        editedPartnerTaxNumber = Number($('#partnersTaxNumber').val());

    createElem(partners, {
        _id: editingItemId,
        name: editedPartnerName,
        address: editedPartnerAddress,
        taxNumber: editedPartnerTaxNumber
    });
    document.getElementById('myForm2').reset();

    var elem = document.createElement('tr'),
        partner = partners[editingItemId];
    $(elem).append(`
            <td>${partner._id}</td>
            <td>${partner.name}</td>
            <td>${partner.address}</td>
            <td>${partner.taxNumber} Ft</td>
            <td><button type="button" class="btn btn-default" data-element="partnerEdit" data-itemid="${partner._id}">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true" data-itemid="${partner._id}"></span>
            </button></td>
            <td><button type="button" class="btn btn-default" data-element="partnerDelete" data-itemid="${partner._id}">
                <span class="glyphicon glyphicon-trash" aria-hidden="true" data-itemid="${partner._id}"></span>
            </button></td>`
    );
    $(`#rowId${partner._id}`).replaceWith(elem);
    elem.setAttribute('id', `rowId${partner._id}`);
    $('#myModal3').modal('hide');
});


$('#partnersMainTable').on('click', '[data-element="partnerDelete"]', function (e) {
    $('#myModal4').modal('show');
    $('#yesDelPartner').one('click', function () {
        editingItemId = $(e.target).attr('data-itemid');
        $(`#rowId${editingItemId}`).remove();
        $('#myModal4').modal('hide');
    });
    
});
=======
var partners = {},
    items = {},
    sales = {},
    buys = {},
    autoIncrement = 1,
    editingItemId;

function createElem(col, newElemObj) {
    col[newElemObj._id] = newElemObj;
}

/*function (newElemObj){
    newElemObj._id
} */

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
        <tr id="rowId${item._id}">
            <td>${item._id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.netPrice} Ft</td>
            <td>${item.vat}</td>
            <td><button type="button" class="btn btn-default" data-element="itemEdit" data-itemid="${item._id}">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true" data-itemid="${item._id}"></span>
            </button></td>
            <td><button type="button" class="btn btn-default" data-element="itemDelete" data-itemid="${item._id}">
                <span class="glyphicon glyphicon-trash" aria-hidden="true" data-itemid="${item._id}"></span>
            </button></td>
        </tr>`
        );
    });

    $('#itemsTable').replaceWith(elem);
    elem.setAttribute('id', 'itemsTable');
});


$('#itemsMainTable').on('click', '[data-element="itemEdit"]', function (e) {
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
    editingItemId = itemId;
});

$('#saveEditedItem').on('click', function () {
    var editedItemName = $('#itemsName').val(),
        editedItemQuantity = Number($('#itemsQuantity').val()),
        editedItemNetPrice = Number($('#itemsNetPrice').val()),
        editedItemVat = $('#itemsVat').val();

    createElem(items, {
        _id: editingItemId,
        name: editedItemName,
        quantity: editedItemQuantity,
        netPrice: editedItemNetPrice,
        vat: editedItemVat
    });
    document.getElementById('myForm').reset();

    var elem = document.createElement('tr'),
        item = items[editingItemId];
    $(elem).append(`
            <td>${item._id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.netPrice} Ft</td>
            <td>${item.vat}</td>
            <td><button type="button" class="btn btn-default" data-element="itemEdit" data-itemid="${item._id}">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true" data-itemid="${item._id}"></span>
            </button></td>
            <td><button type="button" class="btn btn-default" data-element="itemDelete data-itemid="${item._id}>
                <span class="glyphicon glyphicon-trash" aria-hidden="true" data-itemid="${item._id}></span>
            </button></td>`
    );
    $(`#rowId${item._id}`).replaceWith(elem);
    elem.setAttribute('id', `rowId${item._id}`);
    $('#myModal').modal('hide');
});

$('#itemsMainTable').on('click', '[data-element="itemDelete"]', function (e) {
    $('#myModal2').modal('show');
    $('#yesDelete').once('click', function () {
        editingItemId = $(e.target).attr('data-itemid');
        $(`#rowId${editingItemId}`).remove();
    });
    $('#myModal2').modal('hide');
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



>>>>>>> origin/master
