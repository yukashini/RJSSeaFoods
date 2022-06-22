var folderFileDataByFolder = [

{ 'id': '1001', 'parent': '#', 'text': 'Root node 1', 'icon': ' fa fa-folder m-font-warning' },
{ 'id': '1002', 'parent': '1001', 'text': ' Initially selected ', 'icon': ' fa fa-folder m-font-warning', 'state': {
    'opened': true
}
},
{ 'id': '10021', 'parent': '1002', 'text': '2017_Returns',  'state': {
    'selected': true
}
},
{ 'id': '10022', 'parent': '1002', 'text': 'Mar_2017_BalanceOverview' },
{ 'id': '10023', 'parent': '1002', 'text': 'Aug_2017_Transfers',  'state': {
    'selected': true
}
},
{ 'id': '10024', 'parent': '1002', 'text': 'Nov_2017_DeclinedTranscations' },
{ 'id': '1003', 'parent': '#', 'text': 'Receivables', 'icon': ' fa fa-folder m-font-warning' },
{ 'id': '1004', 'parent': '#', 'text': 'Payables', 'icon': ' fa fa-folder m-font-warning' },
{ 'id': '1005', 'parent': '#', 'text': 'Payroll', 'icon': ' fa fa-folder m-font-warning' },
{ 'id': '1006', 'parent': '#', 'text': 'Financial Reporting', 'icon': ' fa fa-folder m-font-warning' },

];

var folderFileDataByProcess = [

{ 'id': '1001', 'parent': '#', 'text': 'Prepare Tax'},
{ 'id': '1002', 'parent': '#', 'text': 'Review Tax'},
{ 'id': '1003', 'parent': '#', 'text': 'eFile Documents', 'state': {
    'opened': true,
    'selected': true
}
},
{ 'id': '10021', 'parent': '1003', 'text': '2017_Returns.pdf', 'icon': 'fa fa-file-pdf-o' },
{ 'id': '10022', 'parent': '1003', 'text': 'Mar_2017_BalanceOverview.xlsx', 'icon': 'fa fa-file-excel-o' },
{ 'id': '10023', 'parent': '1003', 'text': 'Aug_2017_Transfers.pdf', 'icon': 'fa fa-file-pdf-o' },
{ 'id': '10024', 'parent': '1003', 'text': 'Nov_2017_DeclinedTranscations.xlsx', 'icon': 'fa fa-file-excel-o' }
];


$(function () {
    $('#storage-folder-file-nav-container').jstree({ 'core': {
        'data': folderFileDataByFolder
    },
        "plugins": ["checkbox"]
    });
    $('#storage-3rdparty-folder-file-nav-container').jstree({ 'core': {
        'data': folderFileDataByProcess
    },
        "plugins": ["checkbox"]
    });

    $('#lnk_cloudstorage_folderfile').jstree({ 'core': {
        'data': folderFileDataByFolder
    },
        "plugins": ["checkbox"]
    });
    $('#lnk_3rdparty_folderfile').jstree({ 'core': {
        'data': folderFileDataByProcess
    },
        "plugins": ["checkbox"]
    });




});

$(function () {
    $('#storage-folder-file-nav-container').jstree({ 'core': {
        'data': folderFileDataByFolder
    }

    });
    demo5();
});

var demo5 = function () {
    $("#storage-folder-file-nav-container-drag").jstree({
        "core": {
            "themes": {
                "responsive": false
            },
            // so that create works
            "check_callback": true,
            'data': [{
                "text": "Parent Node",
                "children": [{
                    "text": "Initially selected",
                    "state": {
                        "selected": true
                    }
                }, {
                    "text": "Custom Icon",
                    "icon": "fa fa-warning m-font-warning"
                }, {
                    "text": "Initially open",
                    "icon": "fa fa-folder m-font-success",
                    "state": {
                        "opened": true
                    },
                    "children": [
                                { "text": "Another node", "icon": "fa fa-file m-font-warning" }
                            ]
                }, {
                    "text": "Another Custom Icon",
                    "icon": "fa fa-warning m-font-danger"
                }, {
                    "text": "Disabled Node",
                    "icon": "fa fa-check m-font-success",
                    "state": {
                        "disabled": true
                    }
                }, {
                    "text": "Sub Nodes",
                    "icon": "fa fa-folder m-font-danger",
                    "children": [
                                { "text": "Item 1", "icon": "fa fa-file m-font-warning" },
                                { "text": "Item 2", "icon": "fa fa-file m-font-success" },
                                { "text": "Item 3", "icon": "fa fa-file m-font-warning" },
                                { "text": "Item 4", "icon": "fa fa-file m-font-danger" },
                                { "text": "Item 5", "icon": "fa fa-file m-font-info" }
                            ]
                }]
            },
                    "Another Node",
                     "Custom Node"
                ]
        },
        "types": {
            "default": {
                "icon": "fa fa-folder m-font-warning"
            },
            "file": {
                "icon": "fa fa-file m-font-warning"
            }
        },
        "state": { "key": "demo2" },
        "plugins": ["dnd", "state", "types"]
    });
}
