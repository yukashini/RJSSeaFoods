{
    var EmployeeScreenData = [];
    var EmployeeId = 0;
    var sortingBillList = [];
    var isNotesUpdate = 0;
    var editNotesID = 0;
    var InvoiceId = 0;
    var maildata = [];
    var sortingContactList = [];
}

{
    $(document).ready(function () {
        $loading.show();
        setTimeout(function () {
            EmployeeId = ((GetQueryStrings()["Emp_Id"] == undefined || GetQueryStrings()["Emp_Id"] == null) ? 0 : GetQueryStrings()["Emp_Id"]);
            BuildEmployeeInfoScreen();
            RegisterMasking();
            RegisterAlphabetsOnly();
            $loading.hide();
        }, 0);
    });
}
//DOM
{
    var BuildEmployeeInfoScreen = function () {

       // RegisterMasking();
        EmployeeScreenData = GetEmployeeinfo();
       // RegisterAlphabetsOnly();
        if (EmployeeScreenData != undefined && EmployeeScreenData != null) {
           BindTopPanel();
            if (EmployeeScreenData["UserBills"] != undefined && EmployeeScreenData["UserBills"] != null && EmployeeScreenData["UserBills"].length > 0) {
                var unPaidBills = GetunmatchedRecord(EmployeeScreenData["UserBills"], 'BillStatus', "2");
                sortingBillList = unPaidBills;
                
                BindBillList(unPaidBills);
            }
        }
    }

     var BindTopPanel = function () {
        
         var panelDetails = EmployeeScreenData["Emplst"]
        if (panelDetails != undefined && panelDetails != null && panelDetails.length > 0) {
            $('#spn_Employee').html(panelDetails[0]["Emp_First_Name"] == null ? '' : SafeHTML(panelDetails[0]["Emp_First_Name"]));
            $('#spn_email').html(panelDetails[0]["Emp_Email"] == null ? '' : SafeHTML(panelDetails[0]["Emp_Email"]));
            $('#spn_phone').html(panelDetails[0]["Emp_Mob_No"] == null ? '' : SafeHTML(panelDetails[0]["Emp_Mob_No"]));
        }
     }

    var BindEmployeeDetails = function () {
        
        var EmployeeDetails = EmployeeScreenData["Emplst"]

        $("#lbl_name").html(EmployeeDetails[0].Emp_First_Name);
        $("#lbl_email").html(EmployeeDetails[0].Emp_Email);
        $("#lbl_Gender").html(EmployeeDetails[0].Emp_Gender);
        $("#lbl_address").html(EmployeeDetails[0].Emp_Address);
        $("#lbl_city").html(EmployeeDetails[0].Emp_City);
        $("#lbl_state").html(EmployeeDetails[0].Emp_State);
        $("#lbl_country").html(EmployeeDetails[0].Emp_Country);
        $("#lbl_zip").html(EmployeeDetails[0].Emp_ZipCode);
        $("#lbl_phone").html(EmployeeDetails[0].Emp_Mob_No);
        $('#lbl_phone').prop('title', EmployeeDetails[0].Emp_Mob_No); 
        $('#lbl_Designation').html(EmployeeDetails[0].Emp_Designation);
    }
}

//data
{
    var GetEmployeeinfo = function () {
       
        var _obj = {
            'EmployeeId': parseInt(EmployeeId),
        };
        var tempList = {};
        $.when(RequestServer("ViewEmployee360.aspx/GetEmployeeScreenData", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
 }

//Common
{
    {
        var GetStatusColor = function (status) {
            var colorClass = ''
            status = status.toString();
            switch (status) {
                case "1":
                    colorClass = "isc-approved-color";
                    break;
                case "2":
                    colorClass = "isc-approved-color";
                    break;
                case "3":
                    colorClass = 'isc-wrk-flw-sta-open-req';
                    break;
                case "4":
                    colorClass = 'isc-wrk-flw-sta-re-req'
                    break;
                case "5":
                    colorClass = 'isc-wrk-flw-flg';
                    break;
                case "6":
                    colorClass = 'isc-wrk-flw-sta-upload'
                    break;

                case "7":
                    colorClass = "isc-wrk-flw-sta-aprove";
                    break;

                case "8":
                    colorClass = "isc-wrk-flw-sta-re-req";
                    break;

                case "9":
                    colorClass = "isc-pay-pnd";
                    break;
                case "10":
                    colorClass = "isc-dsp-clr";
                    break;
                case "11":
                    colorClass = 'isc-flg-clr';
                    break;
                case "12":
                    colorClass = 'isc-pay-failed'
                    break;
                case "13":
                    colorClass = 'isc-pay-comp'
                    break;

            }
            return colorClass;

        }
    }
}
//Click
{

    $(document).on('click', '#tab-details', function () {

        BindEmployeeDetails();
    });
    $(document).on('click', '#btn-editEmployee', function () {

        window.location.href = "AddEmployee.aspx?Emp_Id=" + EmployeeId + "";
    });

    $(document).on('click', '#tab_unpaid', function () {

        if (customerScreenData["UserBills"] != undefined && customerScreenData["UserBills"] != null && customerScreenData["UserBills"].length > 0) {
            var paidBills = GetmatchedRecord(customerScreenData["UserBills"], 'BillStatus', "1");
            sortingBillList = paidBills;
            BindPaymentDetails(paidBills);
        }

    });


    $(document).on('click', '#Btn-close', function () {
        $('#MP_Batch').hide();
        $('#MP_Email').hide();
    });
    $(document).on('click', '#btn-close', function () {
        $('#MP_Batch').hide();
    });
    $(document).on('click', '[data-emailid]', function () {
        $('#MP_Email').show();
        $('#exist-valuesTo').val('');
        $('#exist-valuescc').val('');
        InvoiceId = $(this).attr('data-emailid');

        var Maildetails = GetIvoiceMaildetails(InvoiceId)
        var Maildetail = common.AUF(Maildetails['Invoice']);
        var Orderlist = common.AUF(Maildetails['OrderList']);
        BindMailDetails(Maildetail);
        BindOrderDetails(Orderlist);

    });

    $(document).on('click', '#btn_sendemail', function () {

        var x = document.getElementById("editor").textContent;
        mailbody = x;
        var Tomail = $('#exist-valuesTo').val();
        var Ccail = $('#exist-valuescc').val();
        var Subject = $("#txt_subject").val();
        if ($('#exist-valuesTo').val() != '') {
            var obj = {
                'Tomail': Tomail,
                'Ccmail': Ccail,
                'Subject': Subject,
                'Body': mailbody,
            }
            maildata.push(obj);
            Sendmail(maildata);
        }
        else {
            $.notify("Please enter emailid!!!", { position: "right top", className: "error" });
        }

        $(document).on('change', '[data-textbox]', function () {
            var $this = $(this);
            var VAL = $.trim($this.val());
            var pattern = /^[a-zA-Z' ]*$/

            if (VAL != '') {
                $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").hide();
                $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").attr('error-active', false);
            }

        });

        $(document).on('change', '[data-Phone]', function () {
            var $this = $(this);

            $("span.validation-message[data-validation='" + $this.attr("data-Phone") + "']").hide();
            $("span.validation-message[data-validation='" + $this.attr("data-Phone") + "']").attr('error-active', false);

        });
        var RegisterMasking = function () {
            $('[phone-Number]').mask('+0 (000) 000-0000');
            $('[data-Name]').mask('Z', { translation: { 'Z': { pattern: /[a-zA-Z0-9 ]/, recursive: true } } })
        }

        var RegisterAlphabetsOnly = function () {
            $('.alphabets-only').mask('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ', {
                translation: {
                    'Z': {
                        pattern: /[a-zA-Z ]/, reverse: true
                    }
                }
            });
        }

        $(document).on('change', '[data-Email]', function () {
            var $this = $(this);
            var contact = $this.attr('data-Email');
            var VAL = $this.val();
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            var emailFirstCharacter = VAL.charAt(0);
            if (VAL != '') {
                var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (!mailformat.test(VAL)) {

                    $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").show();
                    $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").attr('error-active', true);
                }
                else {
                    $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").hide();
                    $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").attr('error-active', false);
                }
            }
            else {
                $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").hide();
                $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").attr('error-active', false);
            }
            if (VAL != '' && emailFirstCharacter == '_') {
                $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").show();
                $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").attr('error-active', true);
            }
            if (VAL != '') {
                $('#email-Validation').hide();
            }

        });

        $(document).on('change', '[data-textbox]', function () {
            var $this = $(this);
            var VAL = $.trim($this.val());
            var pattern = /^[a-zA-Z' ]*$/

            if (VAL != '') {
                $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").hide();
                $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").attr('error-active', false);
            }

        });
    });

    $(document).on('change', '[data-textbox]', function () {
        var $this = $(this);
        var VAL = $.trim($this.val());
        var pattern = /^[a-zA-Z' ]*$/

        if (VAL != '') {
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").hide();
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").attr('error-active', false);
        }

    });

    $(document).on('change', '[data-Phone]', function () {
        var $this = $(this);

        $("span.validation-message[data-validation='" + $this.attr("data-Phone") + "']").hide();
        $("span.validation-message[data-validation='" + $this.attr("data-Phone") + "']").attr('error-active', false);

    });
    var RegisterMasking = function () {
        $('[phone-Number]').mask('+0 (000) 000-0000');
        $('[data-Name]').mask('Z', { translation: { 'Z': { pattern: /[a-zA-Z0-9 ]/, recursive: true } } })
    }

    var RegisterAlphabetsOnly = function () {
        $('.alphabets-only').mask('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ', {
            translation: {
                'Z': {
                    pattern: /[a-zA-Z ]/, reverse: true
                }
            }
        });
    }

    $(document).on('change', '[data-Email]', function () {
        var $this = $(this);
        var contact = $this.attr('data-Email');
        var VAL = $this.val();
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        var emailFirstCharacter = VAL.charAt(0);
        if (VAL != '') {
            var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            if (!mailformat.test(VAL)) {

                $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").show();
                $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").attr('error-active', true);
            }
            else {
                $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").hide();
                $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").attr('error-active', false);
            }
        }
        else {
            $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").hide();
            $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").attr('error-active', false);
        }
        if (VAL != '' && emailFirstCharacter == '_') {
            $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").show();
            $("span.validation-message[data-validation='" + $this.attr("data-Email") + "']").attr('error-active', true);
        }
        if (VAL != '') {
            $('#email-Validation').hide();
        }

    });

    $(document).on('change', '[data-textbox]', function () {
        var $this = $(this);
        var VAL = $.trim($this.val());
        var pattern = /^[a-zA-Z' ]*$/

        if (VAL != '') {
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").hide();
            $("span.validation-message[data-validation='" + $this.attr("data-textbox") + "']").attr('error-active', false);
        }

    });

    $(document).on('click', 'th[data-sort-contact]', function (e) {
        
        var $this = $(this).parents('table');
        if ($('th[data-sort-contact]').hasClass('write-row')) {
            alert("Can't sort when list has writting rows");
            return false;
        }

        // Set Groupby Fields
        {
            //var tablegroupby = 'Entityname'
            // var tableLogicalgroupby = 'ProjectID';//$('#sltentitygroupby option:selected').attr('data-logicalFieldName');
            var columngroupby = $(this).attr('data-sort-contact');
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
                $('#tbl-Contact th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Contact th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default').addClass('sorting-asc headerSortDown');
                $(this).find('img').attr('src', sortingascendingicon);
                currentSortOrder = "asc";
            }
            else if (activesortorder === "asc") {
                $('#tbl-Contact th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Contact th[sort-column-Type]').removeClass('headerSortUp')
                $(this).removeClass('sorting-default sorting-asc headerSortDown').addClass('sorting-desc headerSortUp');
                $(this).find('img').attr('src', sortingdescendingicon);
                currentSortOrder = "desc";
            }
            else if (activesortorder === "desc") {
                $('#tbl-Contact th[sort-column-Type]').removeClass('headerSortDown');
                $('#tbl-Contact th[sort-column-Type]').removeClass('headerSortUp')
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
            var lstResult = sortingContactList

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
                BindContactList();

            }
            //    $loading.hide();
            //}, 0);
        }
    });
}
