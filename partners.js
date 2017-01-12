/*globals databases col newElemObj cols sales buys partnerAutoIncrement:true editingItemId:true partnersDB createElem deleteElem*/
/*Partnerek tárolása*/
$('#saveNewPartner').on('click', function saveNewPartnerCallBack() {
    createElem('partners', {
        _id: String(partnerAutoIncrement++),
        name: $('#partnerName').val(),
        address: $('#partnerAddress').val(),
        taxNumber: $('#taxNumber').val()
    });
    document.getElementById('partnerCreateForm').reset();
});

/*Partnerek tárolásánál elvetés*/
$('#dropPartner').on('click', function dropPartnerCallBack() {
    document.getElementById('partnerCreateForm').reset();
});

/*Partnerek kilistázása*/
$('#listPartnersToggle').on('show.bs.tab', function listPartnersToggleCallBack() {
    var elem = document.createElement('tbody');

    _.each(cols.partners, function eachPartner(partner) {
        $(elem).append(`
        <tr id="rowId${partner._id}">
            <td>${partner._id}</td>
            <td>${partner.name}</td>
            <td>${partner.address}</td>
            <td>${partner.taxNumber}</td>
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

/*Partnerek szerkesztése*/
$('#partnersMainTable').on('click', '[data-element="partnerEdit"]', function partnersMainTableCallBack(e) {
    $('#editingPartners').modal('show');
    var partners = cols.partners,
        partnerId = $(e.target).attr('data-itemid'),
        partnerName = partners[partnerId].name,
        partnerAddress = partners[partnerId].address,
        partnerTaxNumber = partners[partnerId].taxNumber;

    $('#partnersName').val(partnerName);
    $('#partnersAddress').val(partnerAddress);
    $('#partnersTaxNumber').val(partnerTaxNumber);
    editingItemId = partnerId;
});

/*Módosított partner elmentése*/
$('#saveEditedPartner').on('click', function saveEditedPartnerCallBack() {
    var editedPartnerName = $('#partnersName').val(),
        editedPartnerAddress = $('#partnersAddress').val(),
        editedPartnerTaxNumber = Number($('#partnersTaxNumber').val());

    createElem('partners', {
        _id: editingItemId,
        name: editedPartnerName,
        address: editedPartnerAddress,
        taxNumber: editedPartnerTaxNumber
    });
    document.getElementById('partnerCreateForm').reset();

    var elem = document.createElement('tr'),
        partner = 'partners'[editingItemId];

    $(elem).append(`
            <td>${partner._id}</td>
            <td>${partner.name}</td>
            <td>${partner.address}</td>
            <td>${partner.taxNumber}</td>
            <td><button type="button" class="btn btn-default" data-element="partnerEdit" data-itemid="${partner._id}">
                <span class="glyphicon glyphicon-pencil" aria-hidden="true" data-itemid="${partner._id}"></span>
            </button></td>
            <td><button type="button" class="btn btn-default" data-element="partnerDelete" data-itemid="${partner._id}">
                <span class="glyphicon glyphicon-trash" aria-hidden="true" data-itemid="${partner._id}"></span>
            </button></td>`
    );
    $(`#rowId${partner._id}`).replaceWith(elem);
    elem.setAttribute('id', `rowId${partner._id}`);
    $('#editingPartners').modal('hide');
});

/*Partner törlése */
$('#partnersMainTable').on('click', '[data-element="partnerDelete"]', function partnerDeleteCallBack(e) {
    $('#deletePartners').modal('show');
    $('#yesDelPartner').one('click', function yesDelPartnerCallBack() {
        editingItemId = $(e.target).attr('data-itemid');
        $(`#rowId${editingItemId}`).remove();
        deleteElem('partners', editingItemId);
        $('#deletePartners').modal('hide');
    });
});