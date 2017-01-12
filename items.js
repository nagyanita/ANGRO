/*globals col  newElemObj cols partners sales buys itemAutoIncrement:true editingItemId:true databases createElem deleteElem saleInvoice*/
/*Cikkek tárolása*/
$('#saveNewItem').on('click', function saveNewItemCallBack() {
    var itemName = $('#itemName').val(),
        itemQuantity = Number($('#itemQuantity').val()),
        itemNetPrice = Number($('#itemNetPrice').val()),
        itemVat = $('#itemVat').val();

    createElem('items', {
        _id: String(itemAutoIncrement++),
        name: itemName,
        quantity: itemQuantity,
        netPrice: itemNetPrice,
        vat: itemVat
    });
    document.getElementById('itemCreateForm').reset();
});

/*Cikkek tárolásánál elvetés*/
$('#dropItem').on('click', function dropItemClickCallback() {
    document.getElementById('itemCreateForm').reset();
});

/*Cikkek kilistázása*/
$('#listItemsToggle').on('show.bs.tab', function listItemsToggleCallBack() {
    var elem = document.createElement('tbody');

    _.each(cols.items, function eachItem(item) {
        $(elem).append(`
        <tr id="rowId${item._id}">
            <td>${item._id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.netPrice} Ft</td>
            <td>${item.vat} %</td>
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

/*Cikkek szerkesztése*/
$('#itemsMainTable').on('click', '[data-element="itemEdit"]', function itemEditCallBack(e) {
    $('#editingItems').modal('show');
    var items = cols.items,
        itemId = $(e.target).attr('data-itemid'),
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

/*Módosított cikk elmentése*/
$('#saveEditedItem').on('click', function saveEditedItemCallBack() {
    var editedItemName = $('#itemsName').val(),
        editedItemQuantity = Number($('#itemsQuantity').val()),
        editedItemNetPrice = Number($('#itemsNetPrice').val()),
        editedItemVat = $('#itemsVat').val();

    createElem('items', {
        _id: editingItemId,
        name: editedItemName,
        quantity: editedItemQuantity,
        netPrice: editedItemNetPrice,
        vat: editedItemVat
    });

    document.getElementById('itemCreateForm').reset();

    var elem = document.createElement('tr'),
        item = 'items'[editingItemId];

    $(elem).append(`
            <td>${item._id}</td>
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>${item.netPrice} Ft</td>
            <td>${item.vat} %</td>
            <td><button type="button" class="btn btn-default" data-element="itemEdit" data-itemid="${item._id}">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true" data-element="itemEdit" data-itemid="${item._id}"></span>
            </button></td>
            <td><button type="button" class="btn btn-default" data-element="itemDelete" data-itemid="${item._id}">
                <span class="glyphicon glyphicon-trash" aria-hidden="true" data-element="itemDelete" data-itemid="${item._id}"></span>
            </button></td>`
    );
    $(`#rowId${item._id}`).replaceWith(elem);
    elem.setAttribute('id', `rowId${item._id}`);
    $('#editingItems').modal('hide');
});

/*Cikk törlése */
$('#itemsMainTable').on('click', '[data-element="itemDelete"]', function itemDeleteCallBack(e) {
    $('#deleteItems').modal('show');
    $('#yesDelete').one('click', function yesDeleteCallBack() {
        editingItemId = $(e.target).attr('data-itemid');
        $(`#rowId${editingItemId}`).remove();
        deleteElem('items', editingItemId);
        $('#deleteItems').modal('hide');
    });
});