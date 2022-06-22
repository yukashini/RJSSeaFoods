//Global Variables
{
    var approveBillId = 0;
    var approvalDetails = [];
    var balanceAmount = 0;
    var subtractedAmount = 0;
    var Status = 50016;
    var recentPayments = [];
}

//Load && Events
{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
           
        approveBillId = ((GetQueryStrings()["BillID"] == undefined || GetQueryStrings()["BillID"] == null) ? 0 : GetQueryStrings()["BillID"]);
        if (approveBillId != 0) {
            BuildApproveScreen();
        }
        $loading.hide();
        }, 0);
    });

    //$(document).on('change', '#approval-Amount', function () {

    //    var enteredScore = $(this).val();
    //    if (enteredScore != '') {
    //        var positveSign = Math.sign(enteredScore);
    //        if (positveSign != 1) {
    //            // $.notify("Amount should be positive numeric!", { position: "right top", className: "error" });
    //            $(this).val("");
    //        }
    //        else {
    //            var approvalAmount = $(this).val();
    //            approvalAmount = approvalAmount.replace(/,/g, '')
    //            if (parseFloat(balanceAmount) >= parseFloat(approvalAmount)) {
    //                subtractedAmount = parseFloat(balanceAmount) - parseFloat(approvalAmount);

    //                $('#txt-balance-amount').val((subtractedAmount == "" ? '$0' : '$ ' + subtractedAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
    //            }
    //            else {
    //                $('#approval-Amount').val('');
    //                $('#txt-balance-amount').val((parseFloat(balanceAmount) == "" ? '$0' : '$ ' + parseFloat(balanceAmount).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
    //                $.notify("Approved amount should not be greater than  " + (balanceAmount == "" ? '$0.00' : '$ ' + balanceAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + " ", { position: "right top", className: "error" });
    //            }
    //        }
    //    }
    //});

    $(document).on('click','[approve-Type]', function () {
        var approveType = parseInt($(this).attr('approve-Type'));
        var approvedAmount = $('#approval-Amount').val();
        var approvedFloatAmount = approvedAmount.replace(/,/g, '')
        approvedFloatAmount = parseFloat(approvedFloatAmount);
        var actionKey = 1;
        if (subtractedAmount == 0) {
            Status = 50015;
        }
        if (approveType == 1) {
            if ($('#approval-Amount').val() != "" && approvedFloatAmount != 0)
            {
                ApproveOrRejectBill(actionKey);
                window.location.replace("ApproverHome.aspx");
            }
            else
            {
                $.notify("Approved amount should not be empty and zero!", { position: "right top", className: "error" });
            }
            
        }
        else {
            actionKey = 2;
            ApproveOrRejectBill(actionKey);
            window.location.replace("ApproverHome.aspx");
        }


    });

    $(document).on('click', '#billFileName', function () {
        var billDetails = $.parseJSON(approvalDetails[0]["Table"]);
        $('#billFileTitle').text(billDetails[0]["FileDisplayName"]);
        $('#billFileTitle').prop('title', billDetails[0]["FileDisplayName"]);
        BillFrames(billDetails[0]["FileName"]);
        $('#mp_bill-view').show();
    });

    $(document).on('click', '#bill-Close', function () {
        $('#mp_bill-view').hide();
    });

    $(document).on('click', 'th[data-sort]', function (e) {
        var $this = $(this).parents('table');
        if ($('th[data-sort]').hasClass('write-row')) {
            alert("Can't sort when list has writting rows");
            return false;
        }

        // Set Groupby Fields
        {
            //var tablegroupby = 'Entityname'
            // var tableLogicalgroupby = 'ProjectID';//$('#sltentitygroupby option:selected').attr('data-logicalFieldName');
            var columngroupby = $(this).attr('data-sort');
            var columType = $(this).attr('sort-column-Type');
            var sortingdefaulticon = "img/appimages/Sorting-icon-default.png";
            var sortingascendingicon = "img/appimages/Sorting-icon-asc.png";
            var sortingdescendingicon = "img/appimages/Sorting-icon-desc.png";

        }

        // Get Active sort order
        {
            var activesortorder = "default";
            if ($(this).hasClass('sorting-default'))
                activesortorder = "default";
            else if ($(this).hasClass('sorting-asc'))
                activesortorder = "asc";
            else if ($(this).hasClass('sorting-desc'))
                activesortorder = "desc";
        }

        // Restore all to default
        {
            $this.find('thead th').removeClass('sorting-asc sorting-desc').addClass('sorting-default');
            $this.find('thead th').find('img').attr('src', sortingdefaulticon);
            var currentSortOrder = "asc";
        }

        // Change Icon and Class
        {
            if (activesortorder === "default") {
                $('#tbl-recent-pay th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-recent-pay th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default').addClass('sorting-asc');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";
            }
            else if (activesortorder === "asc") {
                $('#tbl-recent-pay th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-recent-pay th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                $(this).find('img').attr('src', sortingdescendingicon);
                currentSortOrder = "desc";
            }
            else if (activesortorder === "desc") {
                $('#tbl-recent-pay th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-recent-pay th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-desc headerSortUp').addClass('sorting-asc headerSortDown');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";
            }
        }


        // Sort it and Render List
        {
            //$loading.show();
            //setTimeout(function () {
            // Sort it by Default Groupby and then by Column
            var lstResult = recentPayments

            if (columType == "text") {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorter(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorter(lstResult, columngroupby, '321');
            }
            else if (columType == 'date') {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorterByDate(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorterByDate(lstResult, columngroupby, '321');
            }
            else {
                if (currentSortOrder === "asc")
                    lstResult = ObjSorterByNumber(lstResult, columngroupby, '123');
                else
                    lstResult = ObjSorterByNumber(lstResult, columngroupby, '321');
            }


            // Render List
            {
                BindRecentPayments(lstResult);
            }
            //    $loading.hide();
            //}, 0);
        }
    });

    //$(document).on('change', '#approval-Amount', function () {
       

    //});

    
}

//DOM Manipulation
{
    var BuildApproveScreen = function () {
        approvalDetails = GetBillDetails();
        var billDetails = $.parseJSON(approvalDetails[0]["Table"]);
        recentPayments = $.parseJSON(approvalDetails[1]["Table1"]);
        BindFields(billDetails);
        BindBreakage(billDetails);
        BindRecentPayments(recentPayments);

    }

    var BindFields = function (billDetails) {
        if (billDetails.length > 0) {
           // $('#approval-Amount').maskMoney();
            var distinctBillDetails = GetDistinctArray(billDetails, 'BillID');
            var amount = distinctBillDetails[0]['Amount'].replace(/,/g, '');
            amount = parseFloat(amount);
            balanceAmount = distinctBillDetails[0]['Balance'].replace(/,/g, '');
            balanceAmount = parseFloat(balanceAmount);
            if (distinctBillDetails[0]['Status'] == "50034") {
                $('#btn-Reject').hide();
            }
            else {
                $('#btn-Reject').show();
            }

            var BillInvoice = ((distinctBillDetails[0]['InvoiceNumber'] == null || distinctBillDetails[0]['InvoiceNumber'] =='' ? '-' : distinctBillDetails[0]['InvoiceNumber']));
            $('#txt-Vendor').val(distinctBillDetails[0]['VendorName'] == null ? '' : distinctBillDetails[0]['VendorName']);
            $('#txt-Bill-Invoice').val(BillInvoice);
            $('#txt-PO').val(distinctBillDetails[0]['PurchaseOrder'] == null ? '' : distinctBillDetails[0]['PurchaseOrder']);
            $('#txt-Payable-Amount').val((amount == "" ? '-' : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            $('#txt-Invoice-Date').val(distinctBillDetails[0]['BillDate'] == null ? '' :moment(distinctBillDetails[0]['BillDate']).format('MM/DD/YYYY'));
            $('#txt-Due-Date').val(distinctBillDetails[0]['DueDate'] == null ? '' :moment(distinctBillDetails[0]['DueDate']).format('MM/DD/YYYY'));
            $('#txt-Bill-Description').val(distinctBillDetails[0]['Description'] == null ? '' : distinctBillDetails[0]['Description']);
            $('#txt-Notes').val(distinctBillDetails[0]['Notes'] == null ? '' : distinctBillDetails[0]['Notes']);
            $('#txt-Payment-Terms').val(distinctBillDetails[0]['PaymentTermName'] == null ? '' : distinctBillDetails[0]['PaymentTermName']);
            $('#txt-balance-amount').val((balanceAmount == "" ? '-' : '$' + balanceAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            if (distinctBillDetails[0]['IsSplitted'] == "50013") {
                $('#txt-Amount-Split').val("Yes");
            }
            else {
                $('#txt-Amount-Split').val("No");
            }
            if (distinctBillDetails[0]["PhysicalLocation"] != null && distinctBillDetails[0]["PhysicalLocation"] != "") {
                $('#file_Viewer').html('');
                var extension = distinctBillDetails[0]["PhysicalLocation"].substr((distinctBillDetails[0]["PhysicalLocation"].lastIndexOf('.') + 1));
                if (extension == 'pdf') {
                    $('#pdf-icon').show();
                    $('#img-icon').hide();
                }
                else {
                    $('#pdf-icon').hide();
                    $('#img-icon').show();
                }
                $('#billFileName').text(distinctBillDetails[0]["FileDisplayName"]);
                $('#billFileName').prop('title', distinctBillDetails[0]["FileDisplayName"]);
            }
          
           
        }
    }

    var BindBreakage = function (billDetails) {
        var html="";
        var $el=$('#tbl-breakage-Body');
        if (billDetails.length > 0) {
            var distinctBillDetails = GetDistinctArray(billDetails, 'BillBreakageID');
            distinctBillDetails = GetunmatchedRecord(distinctBillDetails, 'BillBreakageStatus', '50006')
            distinctBillDetails = GetunmatchedRecord(distinctBillDetails, 'BillBreakageStatus', '50004')
            distinctBillDetails = GetunmatchedRecord(distinctBillDetails, 'BillBreakageStatus', '50005')
            distinctBillDetails = GetunmatchedRecord(distinctBillDetails, 'BillBreakageStatus', '50007')
            distinctBillDetails = GetunmatchedRecord(distinctBillDetails, 'BillBreakageStatus', '50008')
            distinctBillDetails = GetunmatchedRecord(distinctBillDetails, 'BillBreakageStatus', '0')
            if (distinctBillDetails.length > 0) {
                $.each(distinctBillDetails, function (index, item) {
                    var amount = item["BreakageAmount"].replace(/,/g, '');
                    amount = parseFloat(amount);
                    html+='<tr>';
                    html+='<td>';
                    html += '<h5>' + (item["BreakageTypeName"] == null ? '-' : item["BreakageTypeName"] )+ '</h5>';
                    html+='</td>';
                    html+='<td>';
                    html += '<h5>' + (item["BreakageDescription"] == null ? '' : item["BreakageDescription"] )+ '';
                    html+='</h5>';
                    html+='</td>';
                    html+='<td class="isc-bill-amt-pad">';
                    html += '<h5 style="text-align:right;">' + (amount == "" ? 0 : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + ' ';
                    html+='</h5>';
                    html+='</td>';
                    html += '</tr>';
                });
            }
            else {
                html += '<p>No Data Found</p>';
            }
            $el.html(html);
        }
    }

    var BindRecentPayments = function (recentPayments) {
        var html = '';
        var $el = $('#tbl-recent-Payment-Body');
        if (recentPayments.length > 0) {
            var distinctRecentPayments = GetDistinctArray(recentPayments, 'IdentityID');
            if (distinctRecentPayments.length > 0) {
                $.each(distinctRecentPayments, function (index, item) {
                    var amount = 0;
                    html += '<tr>';
                    html += '<td>';
                    html += '<h5>' + (item["InvoiceNumber"] == null ? '-' : item["InvoiceNumber"]) + '</h5>';
                    html += '</td>';
                    html += '<td>';
                    html += '<h5>' + (item["CreatedOn"] == null ? '-' : moment(item["CreatedOn"]).format('MM/DD/YYYY')) + '</h5>';
                    html += '</td>';
                    html += '<td class="isc-bill-amt-pad">';
                    if (item["TableName"] == 'RecentBillPayment') {
                        amount = (item["ApprovedAmount"] == null ? 0 : item["ApprovedAmount"]);
                        amount =amount.replace(/,/g, '');
                        amount = parseFloat(amount);
                    }
                    else {
                        amount = (item["ApprovedAmount"] == null ? 0 : item["ApprovedAmount"]);
                        amount = amount.replace(/,/g, '');
                        amount = parseFloat(amount);
                    }
                    html += '<h5 style="text-align:right;">' + (amount == "" ? 0 : '$' + amount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + ' ';
                    html += '</h5>';
                    html += '</td>';
                    html += '</tr>';
                })

            }
        }
        else {
            html += '<p>No data found </p>';
        }
        $el.html(html);
    }

    var BillFrames = function (fileImage) {
        $('#bill_File_Block').html('');
        var iframe = document.getElementById("bill_Frame");
        if (null !== iframe) {
            document.body.removeChild(iframe);
        }
        else {
            var iframe = document.createElement("iframe");
            iframe.id = "bill_Frame";
            var iframewidth = 390;
            // iframe.src = "http://localhost:49504/images/FileBills/".concat(fileImage);
            iframe.src = filePathUrl + fileImage;
            //  iframe.src = "https://testing.archarena.com/BillManagement/images/FileBills/".concat(fileImage);
            //iframe.src = "http://localhost:49504/images/FileBills/sample.pdf";
            iframe.className = 'isc-new-exp-pdf';
            iframe.setAttribute("style", "border: none; width: 100%; height: 500px; overflow: hidden; overflow-y: auto;")
            $('#bill_File_Block').append(iframe);
        }
    }
        
    }

//Data Manipulation
{
    var GetBillDetails = function () {
        var _obj = {
            'billId': parseInt(approveBillId)
        };

        var tempList = {};
        $.when(RequestServer("ApprovalDetails.aspx/GetApprovalBillDetails", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }

    var ApproveOrRejectBill = function (actionKey) {

        var approverComment= $('#approver-Comment-Area').val();
        var billDetails = $.parseJSON(approvalDetails[0]["Table"]);
        var approvedAmount = $('#approval-Amount').val();
        if (approvedAmount != "") {
            approvedAmount = approvedAmount.replace(/,/g, '')
        }
        else {
            approvedAmount = 0;
        }
        if (subtractedAmount != 0)
        {
            Status=50034
        }

        var billObj = {
            'VendorID':parseInt(billDetails[0]["VendorID"]),
            'BillId': parseInt(billDetails[0]["BillID"]),
            'ApproverComment': approverComment,
            'BalanceAmount':parseFloat(subtractedAmount),
            'PayableAmount': parseFloat(billDetails[0]["Amount"]),
            'Status': Status,
            'ApprovedAmount':parseFloat(approvedAmount),
            'ActionKey':actionKey,
            'DueOn': moment(billDetails[0]["DueDate"]),

            //'PaymentTerms': parseInt(billDetails[0]["PaymentTerms"]),
            //'FileName': billDetails[0]["FileName"],
            //'FileDisplayName': billDetails[0]["FileDisplayName"],
            //'PhysicalPath': billDetails[0]["PhysicalLocation"],
            //'Category': parseInt(billDetails[0]["Category"]),
            //'Notes': billDetails[0]["Notes"],
            //'BillDate': moment(billDetails[0]["BillDate"]),
            //'InvoiceNumber': billDetails[0]['InvoiceNumber'],
            //'Description': billDetails[0]['Description'],
            //'IsSplited': parseInt(billDetails[0]['IsSplitted']),
            //'ClientId': parseInt(billDetails[0]['ClientID']),
            //'FileSize': parseFloat(billDetails[0]['FileSize']),
            //'UserComment': billDetails[0]['UserComment'],
            //'PurchaseOreder': billDetails[0]['PurchaseOrder'],
            //'BillOwner': parseInt(billDetails[0]['AccountID']),
        }
        var _obj = {
            'BillDetails': billObj
        };
        var tempList = {};
        $.when(RequestServer("ApprovalDetails.aspx/BillApprovalOrReject", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
            if (actionKey == 2) {
                $.notify("Bill rejected!!", {
                    position: "right top", className: "success"
                });
            }
            else {
                $.notify("Bill approved!!", {
                    position: "right top", className: "success"
                });
            }
        });
        return tempList;
    }
}

//Common
{
    $(document).on('keyup', 'input[data-type=currency]', function () {
        formatCurrency($(this));
        var approvalAmount = $(this).val();
        approvalAmount = approvalAmount.replace(/,/g, '')
        if (parseFloat(balanceAmount) >= parseFloat(approvalAmount)) {
            subtractedAmount = parseFloat(balanceAmount) - parseFloat(approvalAmount);
            $('#txt-balance-amount').val((subtractedAmount == "" ? '$0' : '$' + subtractedAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
        }
        else {
            $('#approval-Amount').val('');
            $('#txt-balance-amount').val((parseFloat(balanceAmount) == "" ? '$0' : '$' + parseFloat(balanceAmount).toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")));
            if (parseFloat(balanceAmount) < parseFloat(approvalAmount)) {
                $.notify("Approved amount should not be greater than  " + (balanceAmount == "" ? '$0.00' : '$' + balanceAmount.toFixed(2).replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")) + " ", { position: "right top", className: "error" });
            }
            
         
        }
    });
    $(document).on('blur', 'input[data-type=currency]', function () {
        formatCurrency($(this));
    })

    function formatNumber(n) {
        // format number 1000000 to 1,234,567
        return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    function formatCurrency(input, blur) {
        // appends $ to value, validates decimal side
        // and puts cursor back in right position.

        // get input value
        var input_val = input.val();

        // don't validate empty input
        if (input_val === "") { return; }

        // original length
        var original_len = input_val.length;

        // initial caret position 
        var caret_pos = input.prop("selectionStart");

        // check for decimal
        if (input_val.indexOf(".") >= 0) {

            // get position of first decimal
            // this prevents multiple decimals from
            // being entered
            var decimal_pos = input_val.indexOf(".");

            // split number by decimal point
            var left_side = input_val.substring(0, decimal_pos);
            var right_side = input_val.substring(decimal_pos);

            // add commas to left side of number
            left_side = formatNumber(left_side);

            // validate right side
            right_side = formatNumber(right_side);

            // On blur make sure 2 numbers after decimal
            if (blur === "blur") {
                right_side += "00";
            }

            // Limit decimal to only 2 digits
            right_side = right_side.substring(0, 2);

            // join number by .
            input_val = left_side + "." + right_side;

        } else {
            // no decimal entered
            // add commas to number
            // remove all non-digits
            input_val = formatNumber(input_val);
            input_val = input_val;

            // final formatting
            if (blur === "blur") {
                input_val += ".00";
            }
        }

        // send updated string to input
        input.val(input_val);
      
        // put caret back in the right position
        var updated_len = input_val.length;
        caret_pos = updated_len - original_len + caret_pos;
        input[0].setSelectionRange(caret_pos, caret_pos);
    }
}