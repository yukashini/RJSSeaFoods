
{
    var FROM_PAGE = "";
    var TAB_ID = 0;
    var filterStartDate = null;
    var filterEndDate = null;
    var SelectedTransactionID = [];
    var EmptyBinSelectedTransactionID = [];
    var str_lst_templateID = "";
    var IS_MULTI_TEMPLATE = false;
    var LIST_FILES = [];
}

$(document).ready(function () {
    $loading.show();
    setTimeout(function () {
        try {
            FROM_PAGE = common.NFS(GetQueryStrings()["from"]);
            TAB_ID = common.NFN(GetQueryStrings()["tabid"]);
            Transaction.Init();
            $loading.hide();
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "Document Ready");
        }
    }, 100);

});

var Transaction = (function () {
    var objPDFData = [];
    var Init = function () {
        try {
            $('#hiddenBusinessUnit').val(UserBusinessUnit);
            $('#hiddenUserId').val(UserID);

            data.BindFilterOptions();
            data.BindGenericFilters();
            data.BindGroupBy();
            FROM_PAGE == "home" ? Transaction.HomePageInit(TAB_ID) : Inbox.Init(EsignTransactionStatus.Inbox);
            data.GetTemplateListWithoutFilter();
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "Init");
        }
    }

    var data = {
        BindGenericFilters: function () {
            try {
                var objFilters = service.GetFilterList();
                //dom.BindGenericFilters(objFilters);
                common.RegisterDatePicker();
                common.RegisterSelectPicker();
                dom.RegisterDateRangePicker();
                //dom.SetDateRange();
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "BindGenericFilters");
            }
        },
        AddTransaction: function () {
            try {
                var EsignTransactionID = 0;
                var transactionName = $.trim($('#txtTransactionName').val());
                var transactionDescription = $.trim($('#txtDescription').val());
                var lstfile = $('#transactionFile').prop("files");

                var objFormData = new FormData();
                objFormData.append("TransactionName", transactionName);
                objFormData.append("TransactionDescription", transactionDescription);
                objFormData.append("UserID", UserID);
                objFormData.append("BusinessUnitID", UserBusinessUnit);
                objFormData.append("IsTemplate", false);

                $.each(LIST_FILES, function (index, file) {
                    objFormData.append("key" + index, file);
                });

                $.when(AjaxUploadFile("FileUpload.ashx", objFormData)).done(function (result) {
                    var objTransactionAudit = new Transaction_Audit(result, ApplicationUser.UserName, ESIGN_ACTIONS.Created);
                    EventManager.publish("InsertTransactionAudit", { data: objTransactionAudit });
                    EsignTransactionID = result;
                    Inbox.Init(EsignTransactionStatus.Inbox);
                    swal({
                        text: "Document Saved successfully!",
                        icon: "success",
                        timer: 2000,
                        buttons: false
                    }).then(function () {
                        window.location.href = "SignatureMapping.aspx?EsignTransactionID=" + EsignTransactionID;
                        tr.hide();
                    });
                    dom.ResetAddTransaction();
                    dom.ResetErrorMessage();
                    $('#mp_add_transaction').modal("hide");
                });

            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "AddTransaction");
            }
        },
        IsValidTransaction: function () {
            var isValid = true;
            try {
                $('#error-transaction-name').hide();

                var lstFiles = $('#transactionFile').prop("files");
                var transactionName = $.trim($('#txtTransactionName').val());

                if (lstFiles.length == 0) {
                    $.notify("Please upload PDF file", "error");
                    isValid = false;
                }

                if (transactionName == '') {
                    $('#error-transaction-name').show();
                }


                $.each(lstFiles, function (index, file) {
                    var fileSize = file.size;
                    var fileExtention = file.name.split('.').pop();

                    if (fileSize == 0) {
                        $.notify(file.name + " file is invalid", "error");
                        isValid = false;
                    }

                    if (fileExtention.toLowerCase() != "pdf") {
                        $.notify(file.name + " file is invalid", "error");
                        isValid = false;
                    }
                });


            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "IsValidTransaction");
            }
            return isValid;
        },
        ConfigurePaginationModel: function (objModel, progressStatusID) {
            var obj = {};
            try {
                var recipient = Filters.GetRecipient();
                var transactionName = $('#transactionName').val();
                var createdOnStartDate = common.LocalToUTC(filterStartDate + " 00:00");
                var createdOnEndDate = common.LocalToUTC(filterEndDate + " 23:59");

                var filterColumnName1 = "";
                var filterColumnValue1 = "";
                var tabInfo = Filters.GetValues(progressStatusID);
                if (tabInfo.hasOwnProperty('filterColumnName')) {
                    filterColumnName1 = tabInfo.filterColumnName;
                }
                if (tabInfo.hasOwnProperty('filterColumnValue')) {
                    filterColumnValue1 = tabInfo.filterColumnValue;
                }

                obj.BusinessUnitID = UserBusinessUnit;
                obj.start = objModel.start;
                obj.skip = objModel.length;
                //  obj.createdBy = parseInt($('#ddOwner').val());
                obj.createdBy = UserID;
                //obj.trasactionStatus = parseInt($('#ddSignatureStatus').val());
                obj.transactionName = transactionName;
                obj.createdOnStartDate = createdOnStartDate
                obj.createdOnEndDate = createdOnEndDate;
                obj.progressStatus = progressStatusID;
                obj.orderBy = data.ConfigureOrderBy(objModel);
                obj.recipient = recipient;
                obj.filterColumnName1 = filterColumnName1
                obj.filterColumnValue1 = filterColumnValue1

                //Set Hidden field values for export
                $('#hiddenStartDate').val(filterStartDate);
                $('#hiddenEndDate').val(filterEndDate);
                $('#hiddenProgressStatus').val(progressStatusID);
                $('#hiddenDocumentName').val(transactionName);
                $('#hiddenRecipient').val(recipient);
                $('#hiddenfilterColumnName1').val(filterColumnName1);
                $('#hiddenfilterColumnValue1').val(filterColumnValue1);
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "ConfigurePaginationModel");
            }
            return obj;
        },
        ConfigureOrderBy: function (objModel) {
            var orderBy = "";
            try {
                var currentTab = parseInt($('[data-tab-id]').parent('.active').children().attr("data-tab-id"));
                switch (currentTab) {
                    case 1000:
                        orderBy = Inbox.InboxConfigureOrderBy(objModel);
                        break;
                    case 1001:
                        orderBy = Dispatched.DispatchConfigureOrderBy(objModel);
                        break;
                    case 1002:
                        orderBy = Signed.SignedConfigureOrderBy(objModel);
                        break;
                    case 1003:
                        orderBy = Declined.DeclinedConfigureOrderBy(objModel);
                        break;
                    case 1004:
                        orderBy = Archive.ArchiveConfigureOrderBy(objModel);
                        break;
                }
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "ConfigureOrderBy");
            }
            return orderBy;
        },
        TransactionApplyFilter: function () {
            var currentTab = parseInt($('[data-tab-id]').parent('.active').children().attr("data-tab-id"));
            try {
                switch (currentTab) {
                    case EsignTransactionStatus.Inbox:
                        Inbox.Init(currentTab);
                        break;
                    case EsignTransactionStatus.Dispatched:
                        Dispatched.Init(currentTab);
                        break;
                    case EsignTransactionStatus.Signed:
                        Signed.Init(currentTab);
                        break;
                    case EsignTransactionStatus.Declined:
                        Declined.Init(currentTab);
                        break;
                    case EsignTransactionStatus.Archive:
                        Archive.Init(currentTab);
                        break;
                }
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "TransactionApplyFilter");
            }
        },
        BindGroupBy: function (progressStatusID) {
            try {
                var objGroupBy = service.GetTransactionGroupBy(progressStatusID);
                var lstGroupBy = common.AUF(objGroupBy["TransactionGroupBy"]);
                dom.BindGroupBy(lstGroupBy);
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "BindGroupBy");
            }
        },
        BindFilterOptions: function () {
            try {
                var lstFilterOptions = service.GetFilterOptions();
                dom.BindFilterOptions(lstFilterOptions);
            }
            catch (err) {
                TRACE.Error(err, UserID, "Home.aspx", "BindFilterOptions");
            }
        },
        HomePageInit: function (tabID) {
            try {
                $('[data-tab-id]').parent().removeClass("active");
                $('[data-tab-id="' + tabID + '"]').parent().addClass("active");
                $("[data-tab-content]").hide();
                $("[data-tab-content='" + tabID + "']").show();
                data.TransactionApplyFilter();
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "HomePageInit");
            }
        },
        BindPDFPreview: function (esignTransactionID) {
            try {
                $("#pdf-container").html("");
                var objPreviewData = service.GetPreviewData(parseInt(esignTransactionID));
                var lstPreviewData = common.AUF(objPreviewData["PDFInformation"]);
                if (lstPreviewData.length > 0) {
                    var displayName = lstPreviewData[0].DisplayName;
                    $('#previewTitle').html(displayName);
                    var physicalLocation = lstPreviewData[0].PhysicalLocation.split(',')[0];
                    var originalHeight = lstPreviewData[0].OriginalHeight;
                    var originalWidth = lstPreviewData[0].OrigianalWidth;
                    var pageLength = lstPreviewData[0].PageLength;
                    dom.BindPDFCanvas(pageLength, originalHeight, originalWidth);
                    $.when(dom.BindPDF(physicalLocation)).done(function () {
                        //$("#pdf-container .page-loader").removeClass("page-loader");
                        //$('#dvProgressBar').hide();
                    });
                } else {
                    $("#pdf-container").html("No PDF Found");
                }
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "BindPDFPreview");
            }
        },
        GetPDFDatas: function (esignTransactionID) {
            try {
                objPDFData = service.GetPDFData(esignTransactionID);
                return objPDFData;
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "GetPDFDatas");
            }
        },
        GetTransactionPopUp: function () {
            try {
                $('#mp_add_transaction').modal("show");
                $('#fileList').hide();
                $('#fileUploadControl').show();
                $('#fileUplodDiv').show();
                $('#transactionFile').val("");
                $('#transactionFile').removeClass("remove-screen");
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "GetTransactionPopUp");
            }
        },
        UpdateTransactionFile: function () {
            try {
                var esignTransactionID = parseInt($('#txtTransactionName').attr("esign-transactionid"));
                var transactionName = $.trim($('#txtTransactionName').val());
                var transactionDescription = $('#txtDescription').val();
                if (transactionName != 0) {
                    service.UpdateTransactionDetails(esignTransactionID, transactionName, transactionDescription);
                    $('#mp_add_transaction').modal("hide");
                    $.notify("Document Updated Successfully!", "success");
                }
                else {
                    $('#error-transaction-name').show();

                }
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "UpdateTransactionFile");
            }
        },
        GetTemplateListWithoutFilter: function () {
            var templateList = service.GetTemplateListWithoutFilter();
            dom.BindTemplateListPopUp(templateList);
        },
        GetTemplateTransactionPopUp: function () {
            try {  
                $('#Mp_Add_Template').hide();

                $('#txtTemplateTransactionName').val('');
                $('#txtTemplateDescription').val('');
                $('#error-template-transaction-name').hide();

                $('#mp_add_multi_template').show();
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "GetTemplateTransactionPopUp");
            }
        },

    }

    var dom = {
        BindGenericFilters: function (objFilters) {
            try {

                //var lstSignatureStatus = objFilters["SignatureStatus"];
                //common.BindDropDown($('#ddSignatureStatus'), lstSignatureStatus, "Choose Signature Status", true);
                var lstOwner = objFilters["Owner"];
                common.BindDropDown($('#ddOwner'), lstOwner, "Choose Owner", true);
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "BindGenericFilters");
            }
        },
        SetDateRange: function () {
            try {
                var startDate = moment().subtract(6, 'days');
                var endDate = moment();
                $('#txtDatePeriod').val(startDate.format('MMMM D, YYYY') + ' - ' + endDate.format('MMMM D, YYYY'));
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "SetDateRange");
            }
        },
        BindTransactionFile: function (lstFiles) {
            try {
                var html = '';
                $.each(lstFiles, function (index, file) {
                    html += `<div class="isc-file-upload-tile-con-s1" data-file-container id="${"filename" + index}">
                            <div class="screen-row remove-screen">
                                <div class="div-col-10per pad-lft-med"><i class="isc-file-upl-icon-s1 fa fa-file-text"></i></div>
                                <div class="div-col-85per pad-lft-15">
                                    <h2>${file.name}</h2>
                                </div>
                                <div class="div-col-5per">
                                    <i action-remove-file="true" title="Delete File" data-delete-file="${index}" class="fa fa-trash-o isc-file-upload-trash"></i>
                                </div>
                            </div>
                        </div>`;
                });
                $('#fileList').html(html);
                $('#fileList').show();
                //$('#fileUploadControl').hide();
                var pdffile = $('#transactionFile').prop("files").length > 0
                $('#error-pdffile').hide();
                $('#error-validpdffile').hide();
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "BindTransactionFile");
            }

        },
        RemoveTransactionFile: function () {
            try {
                $('#fileList').html("");
                $('#fileList').hide();
                $('#transactionFile').val("");
                $('#fileUploadControl').show();
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "RemoveTransactionFile");
            }
        },
        ResetAddTransaction: function () {
            try {
                $('#fileList').hide();
                $('#fileUploadControl').show();
                $('#transactionFile').val("");
                $('#txtDescription').val("");
                //$('#ddSignatureMode').val("0");
                $('#txtTransactionName').val("");
                common.RegisterSelectPicker();
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "RemoveTransactionFile");
            }
        },
        ResetTransactionFilters: function () {
            try {

                Filters.Reset();
                common.RegisterSelectPicker();
                $('#ddOwner').val(0).prop('selected', 'selected').change();
                dom.RegisterDateRangePicker();
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "RemoveTransactionFile");
            }
        },
        ResetErrorMessage: function () {
            try {
                $('#error-transaction-name').hide();
                $('#error-pdffile').hide();
                $('#error-validpdffile').hide();
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "ResetErrorMessage");
            }
        },
        RegisterDateRangePicker: function () {
            try {
                filterStartDate = moment().startOf('isoWeek').format('MM/DD/YYYY');
                filterEndDate = moment().endOf('isoWeek').format('MM/DD/YYYY');
                $('#txtDatePeriod').daterangepicker({
                    startDate: moment(filterStartDate),
                    endDate: moment(filterEndDate),
                    ranges: {
                        'Any Date': [moment('01/01/1970', 'MM/DD/YYYY'), moment('01/01/2035', 'MM/DD/YYYY')],
                        'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                        'Today': [moment(), moment()],
                        'Last Week': [moment().subtract(1, 'weeks').startOf('isoWeek'), moment().subtract(1, 'weeks').endOf('isoWeek')],
                        'This Week': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
                        'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                        'Next Month': [moment().add(1, 'month').startOf('month'), moment().add(1, 'month').endOf('month')],
                        'This Month': [moment().startOf('month'), moment().endOf('month')],
                        'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')],
                        'This Year': [moment().startOf('year'), moment().endOf('year')]
                    }
                }, dom.SetSwapDateRange());
                dom.SetSwapDateRange(moment(filterStartDate), moment(filterEndDate));

                $('#txtDatePeriod').on('apply.daterangepicker', function (ev, picker) {
                    $("#checkAll").prop("checked", false);

                    $loading.show();
                    setTimeout(function () {
                        try {
                            filterStartDate = moment(picker.startDate).format('MM/DD/YYYY');
                            filterEndDate = moment(picker.endDate).format('MM/DD/YYYY');
                            var currentTab = parseInt($('[data-tab-id]').parent('.active').children().attr("data-tab-id"));
                            Transaction.BindTransactionGroupBy(currentTab);
                            $('[data-tab-id]').parent().removeClass("active");
                            $('[data-tab-id="' + currentTab + '"]').parent().addClass("active");
                            Transaction.TransactionApplyFilter();
                            $loading.hide();
                        }
                        catch (err) {
                            TRACE.Error(err, UserID, "Transaction.aspx", "daterangepicker");
                        }
                    }, 0);

                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "RegisterDateRangePicker");
            }
        },
        SetSwapDateRange: function (start, end) {
            try {
                if ((new Date(moment(start).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/1970', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())
                    && (new Date(moment(end).format('MM/DD/YYYY')).getTime() === new Date(moment('01/01/2035', 'MM/DD/YYYY').format('MM/DD/YYYY')).getTime())) {
                    $('#txtDatePeriod span').html('<span class="isc-label-question-s1"></span> Any Date');
                }
                else {
                    $('#txtDatePeriod span').html('<span class="isc-label-question-s1"></span> ' + moment(start).format('DD MMM, YYYY') + ' - ' + moment(end).format('DD MMM, YYYY'));
                }
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "SetSwapDateRange");
            }
        },
        BindGroupBy: function (lst) {
            try {
                var html = "";
                lst.forEach(function (item, index) {
                    var count = item["TransactionCount"];
                    html += `<li class="${index == 0 ? "active" : ""}">
                                   <a href="#" data-tab-id="${item["StatusID"]}">
                                       ${item["StatusName"]}
                                       <span style="background-color: ${item["ColorCode"]};">${count}</span>
                                   </a>
                               </li>`;
                });
                $('#ulGroupBy').html(html);
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "BindGroupBy");
            }
        },
        BindFilterOptions: function (lst) {
            var html = "";
            try {
                html += '<option selected value="">Recipients</option>';
                $.each(lst.Recipients, function (index, item) {
                    html += '<option value="' + item.EmailID + '">' + item.EmailID + '</option>';
                });
                $('#filterRecipients').html(html);
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "SetSwapDateRange");
            }
        },
        BindPDF: function (physicalLocation) {
            return new Promise(function (resolve, reject) {
                try {
                    var getPDFURL = HOST_URL + "GetPdfDocument.ashx?FilePath=" + physicalLocation;
                    var loadingTask = pdfjsLib.getDocument({
                        url: getPDFURL
                    });

                    loadingTask.onProgress = function (progress) {
                        var percent = parseInt((progress.loaded / progress.total) * 100);
                        $('#dvProgressBar').css("width", percent + "%");
                        if (percent == 100) {
                            $('#dvProgressBar').hide();
                        }
                    };
                    loadingTask.promise.then(function (pdf) {
                        var pageCount = pdf.numPages;
                        for (var pageNumber = 1; pageNumber <= pageCount; pageNumber++) {
                            dom.BindPageInCanvas(pdf, pageNumber, 1);
                        }
                        resolve(true);
                    }).catch(function (err) {
                        $("#pdf-container").html("No PDF Found");
                        TRACE.Error(err, UserID, "Transaction.aspx", "BindPDF");
                    });
                }
                catch (err) {
                    $("#pdf-container").html("No PDF Found");
                    TRACE.Error(err, UserID, "Transaction.aspx", "BindPDF");
                }
            });
        },
        BindPDFCanvas: function (pageLength, originalHeight, originalWidth) {
            try {
                var viewer = document.getElementById('pdf-container');
                for (var pageNumber = 1; pageNumber <= pageLength; pageNumber++) {
                    var canvas = document.createElement("canvas");
                    canvas.className = 'pdf-page-canvas';
                    dom.HandleCanvasPages(pageNumber, canvas, viewer, pageLength, originalHeight, originalWidth);
                }
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "BindPDFCanvas");
            }
        },
        HandleCanvasPages: function (pageNumber, canvas, viewer, pageCount, originalHeight, originalWidth) {
            try {
                canvas.height = originalHeight;
                canvas.width = originalWidth;

                var progressDiv = document.createElement("div");
                progressDiv.className = "page-loader";

                var footerDiv = document.createElement("div");
                footerDiv.className = "image-footer";
                var spanDocumentName = document.createElement("span");
                spanDocumentName.className = "document-name";
                spanDocumentName.setAttribute("style", "float:left");
                footerDiv.appendChild(spanDocumentName);

                var spanPageNo = document.createElement("span");
                spanPageNo.className = "page-no";
                spanPageNo.textContent = pageNumber + " of " + pageCount;
                spanPageNo.setAttribute("style", "float:right");
                footerDiv.appendChild(spanPageNo);


                var wrapperDiv = document.createElement("div");
                wrapperDiv.className = "image-header droppable sortable";
                wrapperDiv.setAttribute("drop-page", pageNumber);
                wrapperDiv.setAttribute("style", "position:relative;width:" + originalWidth + "px;height:" + originalHeight + "px");
                wrapperDiv.appendChild(footerDiv);
                wrapperDiv.appendChild(progressDiv);

                var div = document.createElement("div");
                div.className = "canvas-wrapper";
                div.setAttribute("data-pagenumber", pageNumber);
                div.appendChild(canvas);

                wrapperDiv.appendChild(div);
                viewer.appendChild(wrapperDiv);
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "HandleCanvasPages");
            }
        },
        BindPageInCanvas: function (pdf, pageNumber, scale) {
            try {
                return new Promise(function (resolve, reject) {
                    pdf.getPage(pageNumber).then(function (page) {
                        var viewport = page.getViewport(scale);
                        var canvas = $("[data-pagenumber='" + pageNumber + "']").find("canvas");
                        var renderingTask = page.render({ canvasContext: canvas[0].getContext('2d'), viewport: viewport });
                        renderingTask.promise.then(function () {
                            var pageID = "[drop-page='" + pageNumber + "']";
                            $(pageID).find(".page-loader").hide();
                        });

                    });


                    resolve(true);
                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "BindPageInCanvas");
            }
        },
        BindTransactionPopUp: function () {
            try {
                var pdfdata = objPDFData
                var esignTransactionID = (pdfdata["PDFInformation"][0]["EsignTransactionID"]);
                var transactionName = (pdfdata["PDFInformation"][0]["Name"]);
                var description = (pdfdata["PDFInformation"][0]["Description"]);
                $('#txtTransactionName').val(transactionName);
                $('#txtTransactionName').attr("esign-TransactionId", esignTransactionID);
                $('#txtDescription').val(description);
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "BindTransactionPopUp");
            }
        },
        BindTemplateListPopUp: function (lst) {
            var templatelist = lst;
            var html = '';
            $.each(templatelist, function (index, item) {
                html += `<tr data-transactionid="${item["EsignTransactionID"]}">
                            <td  class ="text-center"><input data-check-template="${item["EsignTransactionID"]}" type="checkbox" /></td>
                            <td><h5 title="${common.NFTD(item["Name"])}"> ${common.NFTD(item["Name"])}</h5></td>
                            <td><h5 title="${common.NFTD(item["Description"])}">${common.NFTD(item["Description"])}</h5></td>
                            <td><h5 title="${common.NFD(item["CreatedOn"])}">${common.NFD(item["CreatedOn"])}<span class ="pad-lft-med"></span></h5></td>
                            <td><h5 title="${common.NFD(item["UpdatedOn"])}">${common.NFD(item["UpdatedOn"])}<span class ="pad-lft-med"></span></h5></td>
                        </tr>`
            });
            $('#tbltemplate tbody').html(html);
        },

    }

    var service = {
        GetTransactionGroupBy: function (progressStatusID) {
            try {
                var period = $('#txtDatePeriod').val();
                var startDate = "";
                var endDate = "";
                if (period != "") {
                    var arrDates = period.split("-");
                    startDate = common.LocalToUTC($.trim(arrDates[0]) + " 00:00");
                    endDate = common.LocalToUTC($.trim(arrDates[1]) + " 23:59");
                }
                var signedOn = "";
                var dispatchedOn = "";
                var declinedOn = "";
                var updatedOn = "";

                var tabInfo = Filters.GetValues(EsignTransactionStatus.Dispatched);
                dispatchedOn = tabInfo.filterColumnValue;
                tabInfo = Filters.GetValues(EsignTransactionStatus.Signed);
                signedOn = tabInfo.filterColumnValue;
                tabInfo = Filters.GetValues(EsignTransactionStatus.Declined);
                declinedOn = tabInfo.filterColumnValue;
                tabInfo = Filters.GetValues(EsignTransactionStatus.Archive);
                updatedOn = tabInfo.filterColumnValue;


                if (tabInfo.length > 0) {
                    filterColumnName1 = tabInfo[0].filterColumnName;
                }
                var obj = {
                    transactionName: $('#transactionName').val(),
                    recipient: Filters.GetRecipient(),
                    signedOn: signedOn,
                    dispatchedOn: dispatchedOn,
                    declinedOn: declinedOn,
                    updatedOn: updatedOn,
                    createdBy: UserID,
                    createdOnStartDate: startDate,
                    createdOnEndDate: endDate
                }
                var _tempList = {};
                var _obj = {
                    "StrjsonObject": JSON.stringify(obj),
                    "SPName": "SP_ES_GetTransactionGroupBy"
                }
                $.when(Call_AJAX("CDM_SPMulti_Read", _obj)).done(function (response) {
                    _tempList = JSON.parse(response);
                });
                return _tempList;
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "GetTransactionGroupBy");
            }
        },
        GetFilterOptions: function () {
            var _tempList = {};
            try {
                var obj = { CreatedBy: UserID };
                var _obj = {
                    "StrjsonObject": JSON.stringify(obj),
                    "SPName": "SP_ES_GetTransactionFilterOptions"
                }
                $.when(Call_AJAX("CDM_SPMulti_Read", _obj)).done(function (response) {
                    _tempList = JSON.parse(response);
                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Home.aspx", "GetEsignTransactionAudit");
            }
            return _tempList;
        },
        GetFilterList: function () {
            var _tempList = {};
            try {
                var obj = {};
                var _obj = {
                    "StrjsonObject": JSON.stringify(obj),
                    "SPName": "SP_ES_GetTransactionFilters"
                }
                $.when(Call_AJAX("CDM_SPMulti_Read", _obj)).done(function (response) {
                    _tempList = JSON.parse(response);
                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "GetFilterList");
            }
            return _tempList;
        },
        UpdateProgressStaus: function (esignTransactionID, progressStatusID, previousStatus) {
            try {
                var obj = {};
                var lst = [];
                obj.EsignTransactionID = esignTransactionID
                obj.ProgressStatus = progressStatusID
                obj.previousStatus = previousStatus
                lst.push(JSON.stringify(obj));
                var _obj = {
                    "StrjsonObject": lst,
                    "SPName": "SP_ES_UpdteProgressStatus"
                }
                $.when(Call_DefaultAJAX("CDM_SP_Action", _obj)).done(function (response) {

                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "UpdateProgressStaus");
            }
        },
        GetPreviewData: function (esignTransactionID) {
            var _tempList = {};
            try {
                var obj = {
                    EsignTransactionID: esignTransactionID
                };
                var _obj = {
                    "StrjsonObject": JSON.stringify(obj),
                    "SPName": "SP_ES_GetCurrentPDfInfo"
                }
                $.when(Call_DefaultAJAX("CDM_SPMulti_Read", _obj)).done(function (response) {
                    _tempList = JSON.parse(response);
                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "GetPreviewData");
            }
            return _tempList;
        },
        GetPDFData: function (esignTransactionID) {
            var _tempList = {};
            try {
                var obj = {
                    EsignTransactionID: esignTransactionID
                };
                var _obj = {
                    "StrjsonObject": JSON.stringify(obj),
                    "SPName": "SP_ES_GetPDFData"
                }
                $.when(Call_DefaultAJAX("CDM_SPMulti_Read", _obj)).done(function (response) {
                    _tempList = JSON.parse(response);
                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "GetPDFData");
            }
            return _tempList;
        },
        UpdateTransactionDetails: function (esignTransactionID, transactionName, transactionDescription) {
            try {
                var obj = {};
                var lst = [];
                obj.EsignTransactionID = esignTransactionID
                obj.TransactionName = transactionName
                obj.Description = transactionDescription
                lst.push(JSON.stringify(obj));
                var _obj = {
                    "StrjsonObject": lst,
                    "SPName": "SP_ES_UpdateTransactionDetails"
                }
                $.when(Call_DefaultAJAX("CDM_SP_Action", _obj)).done(function (response) {

                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "UpdateTransactionDetails");
            }
        },
        GetTemplateListWithoutFilter: function () {
            var _tempList = {};
            try {
                var obj = { createdBy: UserID };
                var _obj = {
                    "StrjsonObject": JSON.stringify(obj),
                    "SPName": "SP_ES_GetTemplateListWithoutFilter"
                }
                $.when(Call_DefaultAJAX("CDM_SP_Read", _obj)).done(function (response) {
                    _tempList = JSON.parse(response);
                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "GetTemplateListWithoutFilter");
            }
            return _tempList;
        },

    }

    return {
        Init: Init,
        GetTransactionList: service.GetTransactionList,
        BindTransactionFile: dom.BindTransactionFile,
        RemoveTransactionFile: dom.RemoveTransactionFile,
        ResetAddTransaction: dom.ResetAddTransaction,
        AddTransaction: data.AddTransaction,
        ConfigurePaginationModel: data.ConfigurePaginationModel,
        TransactionApplyFilter: data.TransactionApplyFilter,
        UpdateProgressStaus: service.UpdateProgressStaus,
        BindTransactionGroupBy: data.BindGroupBy,
        HomePageInit: data.HomePageInit,
        BindPDFPreview: data.BindPDFPreview,
        ResetTransactionFilters: dom.ResetTransactionFilters,
        GetPDFData: data.GetPDFDatas,
        GetTransactionPopUp: data.GetTransactionPopUp,
        BindTransactionPopUp: dom.BindTransactionPopUp,
        UpdateTransactionFile: data.UpdateTransactionFile,
        ResetErrorMessage: dom.ResetErrorMessage,
        ResetAddTransaction: dom.ResetAddTransaction,
        RegisterDateRangePicker: dom.RegisterDateRangePicker,
        IsValidTransaction: data.IsValidTransaction,
        GetTemplateTransactionPopUp: data.GetTemplateTransactionPopUp

    }

})();

var Inbox = (function () {

    var Init = function (progressStatusID) {
        try {
            $('[data-dynamic-filter]').hide();
            dom.BindInboxList(progressStatusID);
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "Inbox Init");
        }
    }

    var data = {
        TriggerDispatchProcess: function (esignTransactionID, sequence) {
            try {
                var objCanDispatch = service.CanDispatch(esignTransactionID);
                var lstCanDispatch = common.AUF(objCanDispatch["DispatchList"]);
                if (lstCanDispatch.length > 0) {
                    if (lstCanDispatch[0]["IsDispatch"] == 1) {
                        var progressStatusID = parseInt(EsignTransactionStatus.Dispatched);
                        Transaction.UpdateProgressStaus(esignTransactionID, progressStatusID);
                        var objPDFData = Transaction.GetPDFData(esignTransactionID);
                        var lstPdfInfo = objPDFData["PDFInformation"];
                        var transactionName = '';
                        var fileCount = 0;
                        if (lstPdfInfo.length > 0) {
                            transactionName = lstPdfInfo[0]["Name"];
                            fileCount = lstPdfInfo.length;
                        }
                        service.TriggerDispatchProcess(esignTransactionID, transactionName, fileCount);
                        var objTransactionAudit = new Transaction_Audit(esignTransactionID, ApplicationUser.UserName, ESIGN_ACTIONS.Dispatch);
                        EventManager.publish("InsertTransactionAudit", { data: objTransactionAudit });
                        Transaction.BindTransactionGroupBy(progressStatusID);
                        Transaction.TransactionApplyFilter();
                        $.notify("Document Dispatched Successfully!", "success");
                    } else {
                        $.notify("Map All Recipients With Fields!", "error");
                    }
                }
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "TriggerDispatchProcess");
            }
        },
        InboxConfigureOrderBy: function (objModel) {
            var columnName = objModel.order[0].column;
            var direction = objModel.order[0].dir;
            var orderBy = "";
            try {
                switch (columnName) {
                    case 0:
                        orderBy = "ET.Name " + direction;
                        break;
                    case 1:
                        orderBy = "ET.CreatedOn " + direction;
                        break;
                    case 3:
                        orderBy = "ET.Description " + direction;
                        break;
                }
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "InboxConfigureOrderBy");
            }
            return orderBy;

        },

    }

    var dom = {
        BindInboxList: function (progressStatusID) {
            try {
                //var tableBodyStartAt = $('#tblInbox tbody').offset().top;
                //var screenFooterHeight = $('.slds-context-footer-bar').innerHeight();
                //var wHeight = $(".isc-app-body-container").height();
                //console.log("widowheight" + wHeight, "bodystartat:" + tableBodyStartAt, "footer:" + screenFooterHeight);
                //var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight + 60));

                var tableBodyStartAt = 110;
                var screenFooterHeight = 250;
                var wHeight = $(window).height();
                var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
                $('#tblInbox').DataTable({
                    'bServerSide': true,
                    "pagingType": "full_numbers",
                    'bPaginate': true,
                    "scrollY": tableAvailabeHeight + "px",
                    "ajax": {
                        "url": sys_ajaxURL + "CDM_SPMulti_Read",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        async: false,
                        "data": function (dataTableModel) {
                            var obj = Transaction.ConfigurePaginationModel(dataTableModel, progressStatusID);
                            var _obj = {
                                "StrjsonObject": JSON.stringify(obj),
                                "SPName": "SP_ES_GetTransactionList"
                            }
                            return JSON.stringify(_obj);
                        },
                        "dataSrc": function (json) {
                            var objData = JSON.parse(json.d);
                            json.recordsTotal = objData["TransactionAllCount"][0].TransactionCount;
                            json.recordsFiltered = objData["TransactionAllCount"][0].TransactionCount;
                            json.data = $(common.AUF(objData["TransactionList"]));
                            return json.data;
                        }

                    },
                    "autoWidth": false,
                    "order": [[1, "desc"]],
                    "bFilter": false,
                    'bDestroy': true,
                    'bInfo': false,
                    "pageLength": 20,
                    'bLengthChange': false,
                    "language": {
                        "emptyTable": '<span class="no-data-message">No Documents Found</span>'
                    },
                    'createdRow': function (row, data, dataIndex) {
                        $(row).attr('data-transactionid', data.EsignTransactionID);
                        $(row).addClass("isc-table-read-optimal");
                    },
                    'aoColumns': [
                        {
                            //"width": '20%',
                            "mData": function (data, type, dataToSet) {
                                var html = `<h5 title="${common.NFTD(data["Name"])}">${common.NFS(data["Name"])}

                                        </h5>`;
                                return html;
                            }
                        },
                        {
                            //"width": '10%',
                            "mData": function (data, type, dataToSet) {
                                var html = `<h5 title='${common.NFD(data["CreatedOn"])}'>${common.NFD(data["CreatedOn"])}
                                        </h5>`;
                                return html;
                            }
                        },
                        {
                            //"width": '8%',
                            "orderable": false,
                            className: 'text-center',
                            "mData": function (data, type, dataToSet) {
                                var recipientlist = data["RecipientList"];
                                var emailList = common.AUF(JSON.parse(recipientlist));
                                var distEmailList = GetDistinctArray(emailList, 'EmailID')
                                var emailLength = distEmailList.length;
                                var html = '';
                                if (emailList.length > 0) {
                                    if (emailList[0]["EmailID"] != null && emailList[0]["EmailID"] != '') {
                                        html += `
                                               </h1> <span class="cur-ptr isc-lbl-list-collect-s1-span" style="display:${emailLength > 0 ? "inline-block" : "none"}"> ${emailLength}
                                                    <div class ="isc-list-hover-commnt-con-s1">`
                                        for (var i = 0; i < distEmailList.length; i++) {
                                            //if (i == 0) {
                                            //    html += `<a href="TransactionDetails.aspx?transaction=${data.EsignTransactionID}" class="text-left">View Details</a>`;
                                            //}
                                            html += `<div class="isc-in-kpi-det-s1">
                                                    <div class ="isc-lbl-list-hvr-kpi-s1" title='${common.NFS(distEmailList[i]["EmailID"])}'>
                                                        ${common.NFS(distEmailList[i]["EmailID"])}
                                                 </div>`;
                                        };
                                        html += `           </div>
                                                    </div>
                                                </span>
                                            `;

                                    }
                                    else {
                                        html += `<h1 class="isc-lbl-list-collect-s1"> - </h1>`;
                                    }
                                }
                                else {
                                    html += `<h1 class="isc-lbl-list-collect-s1"> - </h1>`;
                                }

                                return html;
                            }
                        },
                        {
                            //"width": '8%',
                            "mData": function (data, type, dataToSet) {
                                var html = `<a title='${common.NFTD(data["Description"])}' class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-upload">${common.NFS(data["Description"])}</a>`;
                                return html;
                            }
                        },
                        {
                            //"width": '5%',
                            "orderable": false,
                            "mData": function (data, type, dataToSet) {
                                var recipientlist = common.AUF(data["RecipientList"]);
                                var html = '';
                                html += `
                             <div class ="screen-row isc-inline-pop-action-s1">
                                  <a class ="isc-action-badge-td-s1" style="visibility:${(recipientlist.length > 0) ? "" : "hidden"}" data-filename="${data["FileName"]}" action-dispatch="true" data-EsignTransactionID=${data["EsignTransactionID"]} data-sequence=1 data-dispatched="true" class ="isc-action-badge-td-s1" title="Send" href="#">
                                    <i class ="fa fa-share" ></i>
                                  </a>
                                  <a class ="isc-action-badge-td-s1" title="Setup" href="SignatureMapping.aspx?${(data["IsTemplateCopy"] == true ? "IsTemplateCopy=true&" : "")}${(data["IsMultiTemplate"] == true ? "IsMultiTemplate=true&" : "")}EsignTransactionID=${data["EsignTransactionID"]}">
                                    <i class ="fa fa-cog"></i>
                                  </a>
                                  <ul class ="isc-list-act-icon-s1">
                                       <li class ="">
                                         <a title="More Options" type="button" class ="isc-dd-drat-btn-s1 isc-sub-menu-list-s1 " data-toggle="dropdown">
                                            <i class ="fa fa-ellipsis-h"></i>
                                         </a>
                                   <ul class ="isc-nested--list-dd-ls1" role="menu">
                                        <li class ="">
                                            <a class ="isc-action-badge-td-s1" title="Preview" href="#" action-preview="${data["EsignTransactionID"]}">
                                               <i class ="fa fa-eye"></i>Preview
                                            </a>
                                        </li>
                                         <li class ="">
                                            <a title="Edit" data-transaction-Edit="true" data-EsignTransactionID=${data["EsignTransactionID"]} >
                                               <i class ="fa fa-pencil"></i>Edit
                                            </a>
                                        </li>
                                        <li>
                                          <a title="Delete"  data-transaction-Delete="true"  data-EsignTransactionID=${data["EsignTransactionID"]}>
                                          <i class =" fa fa-trash-o" ></i>Delete</a>
                                        </li>
                                   </ul>
                                        </li>
                                   </ul>
                               </div>`;
                                return html;
                            }
                        },
                    ]
                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "BindInboxList");
            }
        },
    }

    var service = {
        DeleteTransaction: function (esignTransactionID, UserID) {
            try {
                var obj = {};
                var lst = [];
                obj.EsignTransactionID = esignTransactionID
                obj.UserID = UserID
                lst.push(JSON.stringify(obj));
                var _obj = {
                    "StrjsonObject": lst,
                    "SPName": "SP_ES_DeleteTransaction"
                }
                $.when(Call_DefaultAJAX("CDM_SP_Action", _obj)).done(function (response) {

                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "DeleteTransaction");
            }
        },
        TriggerDispatchProcess: function (esignTransactionID, transactionName, fileCount) {
            try {
                var _obj = {
                    "esignTransactionID": esignTransactionID,
                    "businessUnitID": UserBusinessUnit,
                    "createdBy": UserID,
                    "userName": User_Display_Name,
                    "isResend": false,
                    "transactionname": transactionName,
                    "filecount": fileCount
                }
                $.when(Call_AsynAJAX("DispatchPDFWithMappedFields", _obj)).done(function (response) {

                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "TriggerDispatchProcess");
            }
        },
        CanDispatch: function (esignTransactionID) {
            var obj = {};
            var _tempList = [];
            try {
                obj.EsignTransactionID = esignTransactionID
                var _obj = {
                    "StrjsonObject": JSON.stringify(obj),
                    "SPName": "SP_ES_CheckCanDispatch"
                }
                $.when(Call_DefaultAJAX("CDM_SPMulti_Read", _obj)).done(function (response) {
                    _tempList = $.parseJSON(response);
                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "CanDispatch");
            }
            return _tempList;
        }
    }

    return {
        Init: Init,
        BindInboxList: dom.BindInboxList,
        DeleteTransaction: service.DeleteTransaction,
        TriggerDispatchProcess: data.TriggerDispatchProcess,
        InboxConfigureOrderBy: data.InboxConfigureOrderBy,
    }
})();

var Dispatched = (function () {

    var Init = function (progressStatusID) {
        try {
            $('[data-dynamic-filter]').hide();
            $('#div-dispatchedOn').show();
            dom.BindDispatchedList(progressStatusID);
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "Dispatched Init");
        }
    }

    var data = {
        DispatchConfigureOrderBy: function (objModel) {
            var columnName = objModel.order[0].column;
            var direction = objModel.order[0].dir;
            var orderBy = "";
            try {
                switch (columnName) {
                    case 0:
                        orderBy = "ET.Name " + direction;
                        break;
                    case 1:
                        orderBy = "ET.DispatchedOn " + direction;
                        break;
                    case 3:
                        orderBy = "ET.Description " + direction;
                        break;
                }
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "DispatchConfigureOrderBy");
            }
            return orderBy;
        },
    }

    var dom = {
        BindDispatchedList: function (progressStatusID) {
            try {
                var tableBodyStartAt = 110;
                var screenFooterHeight = 250;
                var wHeight = $(window).height();
                var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
                $('#tblDispatched').DataTable({
                    'bServerSide': true,
                    "pagingType": "full_numbers",
                    'bPaginate': true,
                    "scrollY": tableAvailabeHeight + "px",
                    "ajax": {
                        "url": sys_ajaxURL + "CDM_SPMulti_Read",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        async: false,
                        "data": function (dataTableModel) {
                            var obj = Transaction.ConfigurePaginationModel(dataTableModel, progressStatusID);
                            var _obj = {
                                "StrjsonObject": JSON.stringify(obj),
                                "SPName": "SP_ES_GetTransactionList"
                            }
                            return JSON.stringify(_obj);
                        },
                        "dataSrc": function (json) {
                            var objData = JSON.parse(json.d);
                            json.recordsTotal = objData["TransactionAllCount"][0].TransactionCount;
                            json.recordsFiltered = objData["TransactionAllCount"][0].TransactionCount;
                            json.data = $(common.AUF(objData["TransactionList"]));
                            return json.data;
                        }

                    },
                    "autoWidth": false,
                    "order": [[1, "desc"]],
                    "bFilter": false,
                    'bDestroy': true,
                    'bInfo': false,
                    "pageLength": 20,
                    'bLengthChange': false,
                    "language": {
                        "emptyTable": '<span class="no-data-message">No Documents Found</span>'
                    },
                    'createdRow': function (row, data, dataIndex) {
                        $(row).attr('data-transactionid', data.EsignTransactionID);
                        $(row).addClass("isc-table-read-optimal");
                    },
                    'aoColumns': [
                        {
                            //"width": '20%',
                            "mData": function (data, type, dataToSet) {
                                var html = `<h5 title='${common.NFTD(data["Name"])}'>${common.NFS(data["Name"])}

                                        </h5>`;
                                return html;
                            }
                        },
                        {
                            //"width": '10%',
                            "mData": function (data, type, dataToSet) {
                                var html = `<h5 title='${common.NFD(data["DispatchedOn"])}'>${common.NFD(data["DispatchedOn"])}</h5>`;
                                return html;
                            }
                        },
                        {
                            //"width": '8%',
                            "orderable": false,
                            className: 'text-center',
                            "mData": function (data, type, dataToSet) {
                                var recipientlist = data["RecipientList"];
                                var emailList = common.AUF(JSON.parse(recipientlist));
                                var distEmailList = GetDistinctArray(emailList, 'EmailID')
                                var emailLength = distEmailList.length;
                                var html = '';
                                if (emailList.length > 0) {
                                    if (emailList[0]["EmailID"] != null) {
                                        //<h1 class="isc-lbl-list-collect-s1" title="${common.NFS(emailList[0]["EmailID"])}"> ${common.NFS(emailList[0]["EmailID"])}
                                        html += `
                                               </h1> <span class="cur-ptr isc-lbl-list-collect-s1-span" style="display:${emailLength > 0 ? "inline-block" : "none"}"> ${emailLength}
                                                    <div class ="isc-list-hover-commnt-con-s1">`
                                        for (var i = 0; i < distEmailList.length; i++) {
                                            if (i == 0) {
                                                html += `<a href="TransactionDetails.aspx?transaction=${data.EsignTransactionID}" class="text-left">View Details</a>`;
                                            }
                                            html += `<div class="isc-in-kpi-det-s1">
                                                    <div class ="isc-lbl-list-hvr-kpi-s1" title='${common.NFS(distEmailList[i]["EmailID"])}'>
                                                        ${common.NFS(distEmailList[i]["EmailID"])}
                                                 </div>`;
                                        };
                                        html += `           </div>
                                                    </div>
                                                </span>
                                            `;
                                    }
                                }
                                else if (emailList == null) {
                                    html += `<h1 class="isc-lbl-list-collect-s1"> - </h1>`;
                                }
                                return html;
                            }
                        },
                        {
                            //"width": '8%',
                            "mData": function (data, type, dataToSet) {
                                var html = `<a title='${common.NFTD(data["Description"])}' class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-upload">${common.NFS(data["Description"])}</a>`;
                                return html;
                            }
                        },
                        {
                            //"width": '5%',
                            "orderable": false,
                            "mData": function (data, type, dataToSet) {
                                var recipientlist = common.AUF(data["RecipientList"]);
                                var html = '';
                                html += `<div class="screen-row isc-inline-pop-action-s1">
                                            <a class ="isc-action-badge-td-s1" title="Preview" href="#" action-preview="${data["EsignTransactionID"]}">
                                            <i class ="fa fa-eye"></i>
                                            </a>
                                            <a class ="isc-action-badge-td-s1" title="Edit &amp; Resend" href="SignatureMapping.aspx?${(data["IsTemplateCopy"] == true ? "IsTemplateCopy=true&" : "")}${(data["IsMultiTemplate"] == true ? "IsMultiTemplate=true&" : "")}from=dispatch&EsignTransactionID=${data["EsignTransactionID"]}">
                                           <i class ="fa fa-edit"></i></a>
                                      </div>`;
                                return html;
                            }
                        },
                    ]
                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "BindDispatchedList");
            }
        },
    }

    var service = {

    }

    return {
        Init: Init,
        BindDispatchedList: dom.BindDispatchedList,
        DispatchConfigureOrderBy: data.DispatchConfigureOrderBy,
    }
})();

var Signed = (function () {

    var Init = function (progressStatusID) {
        try {
            $('[data-dynamic-filter]').hide();
            $('#div-signedOn').show();
            dom.BindSignedList(progressStatusID);
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "Signed Init");
        }
    }

    var data = {
        SignedConfigureOrderBy: function (objModel) {
            var columnName = objModel.order[0].column;
            var direction = objModel.order[0].dir;
            try {
                var orderBy = "";
                switch (columnName) {
                    case 0:
                        orderBy = "ET.Name " + direction;
                        break;
                    case 1:
                        orderBy = "ET.SignedOn " + direction;
                        break;
                    case 3:
                        orderBy = "ET.Description " + direction;
                        break;
                }
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "SignedConfigureOrderBy");
            }
            return orderBy;
        },
    }

    var dom = {
        BindSignedList: function (progressStatusID) {
            try {
                var tableBodyStartAt = 110;
                var screenFooterHeight = 250;
                var wHeight = $(window).height();
                var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
                $('#tblSigned').DataTable({
                    'bServerSide': true,
                    "pagingType": "full_numbers",
                    'bPaginate': true,
                    "scrollY": tableAvailabeHeight + "px",
                    "ajax": {
                        "url": sys_ajaxURL + "CDM_SPMulti_Read",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        async: false,
                        "data": function (dataTableModel) {
                            var obj = Transaction.ConfigurePaginationModel(dataTableModel, progressStatusID);
                            var _obj = {
                                "StrjsonObject": JSON.stringify(obj),
                                "SPName": "SP_ES_GetTransactionList"
                            }
                            return JSON.stringify(_obj);
                        },
                        "dataSrc": function (json) {
                            var objData = JSON.parse(json.d);
                            json.recordsTotal = objData["TransactionAllCount"][0].TransactionCount;
                            json.recordsFiltered = objData["TransactionAllCount"][0].TransactionCount;
                            json.data = $(common.AUF(objData["TransactionList"]));
                            return json.data;
                        }
                    },
                    "autoWidth": false,
                    "order": [[1, "desc"]],
                    "bFilter": false,
                    'bDestroy': true,
                    'bInfo': false,
                    "pageLength": 20,
                    'bLengthChange': false,
                    "language": {
                        "emptyTable": '<span class="no-data-message">No Documents Found</span>'
                    },
                    'createdRow': function (row, data, dataIndex) {
                        $(row).attr('data-transactionid', data.EsignTransactionID);
                        $(row).addClass("isc-table-read-optimal");
                    },
                    'aoColumns': [
                        {
                            //"width": '20%',
                            "mData": function (data, type, dataToSet) {
                                var html = `<h5 title='${common.NFTD(data["Name"])}'>${common.NFS(data["Name"])}

                                        </h5>`;
                                return html;
                            }
                        },
                        {
                            //"width": '10%',
                            "mData": function (data, type, dataToSet) {
                                var html = `<h5 title='${common.NFD(data["SignedOn"])}'>${common.NFD(data["SignedOn"])}</h5>`;
                                return html;
                            }
                        },
                        {
                            //"width": '8%',
                            "orderable": false,
                            className: 'text-center',
                            "mData": function (data, type, dataToSet) {
                                var recipientlist = data["RecipientList"];
                                var emailList = common.AUF(JSON.parse(recipientlist));
                                var distEmailList = GetDistinctArray(emailList, 'EmailID')
                                var signedList = distEmailList.filter(x => x["SignatureStatus"] == ESIGN_SIGNATURE_STATUS.Signed);
                                var emailLength = distEmailList.length;

                                var html = '';
                                if (emailList.length > 0) {
                                    if (emailList[0]["EmailID"] != null) {
                                        //<h1 class="isc-lbl-list-collect-s1" title="${common.NFS(emailList[0]["EmailID"])}"> ${common.NFS(emailList[0]["EmailID"])}
                                        html += `
                                               </h1> <span class="cur-ptr isc-lbl-list-collect-s1-span" title="${signedList.length} out of ${emailLength} signed" style="display:${signedList.length > 0 ? "inline-block" : "none"}"> ${signedList.length}/${emailLength}
                                                    <div class ="isc-list-hover-commnt-con-s1">`
                                        for (var i = 0; i < signedList.length; i++) {
                                            if (i == 0) {
                                                html += `<a href="TransactionDetails.aspx?transaction=${data.EsignTransactionID}&status=${ESIGN_SIGNATURE_STATUS.Signed}" class="text-left">View Details</a>`;
                                            }
                                            html += `<div class="isc-in-kpi-det-s1">
                                                    <div class ="isc-lbl-list-hvr-kpi-s1" title='${common.NFS(signedList[i]["EmailID"])}'>
                                                        ${common.NFS(signedList[i]["EmailID"])}
                                                 </div>`;
                                        };
                                        html += `           </div>
                                                    </div>
                                                </span>
                                            `;
                                    }
                                }
                                else if (emailList == null) {
                                    html += `<h1 class="isc-lbl-list-collect-s1"> - </h1>`;
                                }
                                return html;
                            }
                        },
                        {
                            //"width": '8%',
                            "mData": function (data, type, dataToSet) {
                                var html = `<a title='${common.NFTD(data["Description"])}' class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-upload">${common.NFS(data["Description"])}</a>`;
                                return html;
                            }
                        },
                        {
                            "orderable": false,
                            //"width": '5%',
                            "mData": function (data, type, dataToSet) {
                                var previousStatus = parseInt(EsignTransactionStatus.Signed);
                                var html = `<div class="screen-row isc-inline-pop-action-s1">
                                            <a class="isc-action-badge-td-s1" title="Preview" href="#" action-signpreview="${data["EsignTransactionID"]}">
                                                <i class="fa fa-eye"></i>
                                            </a>
                                            <a class="isc-action-badge-td-s1" href="DownloadTransactionFile.aspx?EsignTransactionID=${data["EsignTransactionID"]}" title="Download">
                                                <i class="fa fa-download"></i>
                                            </a>
                                            <a class ="isc-action-badge-td-s1" data-previousstatus=${previousStatus} data-esigntransactionid=${data["EsignTransactionID"]} progress-status-update="true" title="Archive">
                                                <i class="fa fa-archive"></i>
                                            </a>
                                        </div>`;
                                return html;
                            }
                        },
                    ]
                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "BindSignedList");
            }
        },
    }

    var service = {

    }

    return {
        Init: Init,
        BindSignedList: dom.BindSignedList,
        SignedConfigureOrderBy: data.SignedConfigureOrderBy,
    }
})();

var Declined = (function () {

    var Init = function (progressStatusID) {
        try {
            $('[data-dynamic-filter]').hide();
            $('#div-declinedOn').show();
            dom.BindDeclinedList(progressStatusID);
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "Declined Init");
        }
    }

    var data = {
        DeclinedConfigureOrderBy: function (objModel) {
            var columnName = objModel.order[0].column;
            var direction = objModel.order[0].dir;
            var orderBy = "";
            try {
                switch (columnName) {
                    case 0:
                        orderBy = "ET.Name " + direction;
                        break;
                    case 1:
                        orderBy = "ET.SignedOn " + direction;
                        break;
                    case 3:
                        orderBy = "ET.Description " + direction;
                        break;
                }
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "DeclinedConfigureOrderBy");
            }
            return orderBy;
        },
    }

    var dom = {
        BindDeclinedList: function (progressStatusID) {
            try {
                var tableBodyStartAt = 110;
                var screenFooterHeight = 250;
                var wHeight = $(window).height();
                var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
                $('#tblDeclined').DataTable({
                    'bServerSide': true,
                    "pagingType": "full_numbers",
                    'bPaginate': true,
                    "scrollY": tableAvailabeHeight + "px",
                    "ajax": {
                        "url": sys_ajaxURL + "CDM_SPMulti_Read",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        async: false,
                        "data": function (dataTableModel) {
                            var obj = Transaction.ConfigurePaginationModel(dataTableModel, progressStatusID);
                            var _obj = {
                                "StrjsonObject": JSON.stringify(obj),
                                "SPName": "SP_ES_GetTransactionList"
                            }
                            return JSON.stringify(_obj);
                        },
                        "dataSrc": function (json) {
                            var objData = JSON.parse(json.d);
                            json.recordsTotal = objData["TransactionAllCount"][0].TransactionCount;
                            json.recordsFiltered = objData["TransactionAllCount"][0].TransactionCount;
                            json.data = $(common.AUF(objData["TransactionList"]));
                            return json.data;
                        }
                    },
                    "autoWidth": false,
                    "order": [[1, "desc"]],
                    "bFilter": false,
                    'bDestroy': true,
                    'bInfo': false,
                    "pageLength": 20,
                    'bLengthChange': false,
                    "language": {
                        "emptyTable": '<span class="no-data-message">No Documents Found</span>'
                    },
                    'createdRow': function (row, data, dataIndex) {
                        $(row).attr('data-transactionid', data.EsignTransactionID);
                        $(row).addClass("isc-table-read-optimal");
                    },
                    'aoColumns': [
                        {
                            //"width": '20%',
                            "mData": function (data, type, dataToSet) {
                                var html = `<h5 title='${common.NFTD(data["Name"])}'>${common.NFS(data["Name"])}

                                        </h5>`;
                                return html;
                            }
                        },
                        {
                            //"width": '10%',
                            "mData": function (data, type, dataToSet) {
                                var html = `<h5 title='${common.NFD(data["SignedOn"])}'>${common.NFD(data["SignedOn"])}</h5>`;
                                return html;
                            }
                        },
                        {
                            //"width": '8%',
                            "orderable": false,
                            className: 'text-center',
                            "mData": function (data, type, dataToSet) {
                                var recipientlist = data["RecipientList"];
                                var tmpEmailList = common.AUF(JSON.parse(recipientlist));
                                var distEmailList = GetDistinctArray(tmpEmailList, 'EmailID')
                                var declinedList = distEmailList.filter(x => x["SignatureStatus"] == ESIGN_SIGNATURE_STATUS.Declined);
                                var emailLength = distEmailList.length;
                                var html = '';
                                if (declinedList.length > 0) {
                                    if (declinedList[0]["EmailID"] != null) {
                                        //<h1 class="isc-lbl-list-collect-s1" title="${common.NFS(emailList[0]["EmailID"])}"> ${common.NFS(emailList[0]["EmailID"])}
                                        html += `
                                               </h1> <span class="cur-ptr isc-lbl-list-collect-s1-span" title="${declinedList.length} out of ${emailLength} declined" style="display:${declinedList.length > 0 ? "inline-block" : "none"}"> ${declinedList.length}/${emailLength}
                                                    <div class ="isc-list-hover-commnt-con-s1">`
                                        for (var i = 0; i < declinedList.length; i++) {
                                            if (i == 0) {
                                                html += `<a href="TransactionDetails.aspx?transaction=${data.EsignTransactionID}&status=${ESIGN_SIGNATURE_STATUS.Declined}" class="text-left">View Details</a>`;
                                            }
                                            html += `<div class="isc-in-kpi-det-s1">
                                                    <div class ="isc-lbl-list-hvr-kpi-s1" title='${common.NFS(declinedList[i]["EmailID"])}'>
                                                        ${common.NFS(declinedList[i]["EmailID"])}
                                                 </div>`;
                                        };
                                        html += `           </div>
                                                    </div>
                                                </span>
                                            `;
                                    }
                                }
                                else if (emailList == null) {
                                    html += `<h1 class="isc-lbl-list-collect-s1"> - </h1>`;
                                }
                                return html;
                            }
                        },
                        {
                            //"width": '8%',
                            "mData": function (data, type, dataToSet) {
                                var html = `<a title='${common.NFTD(data["Description"])}' class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-upload">${common.NFS(data["Description"])}</a>`;
                                return html;
                            }
                        },
                        {
                            "orderable": false,
                            //"width": '5%',
                            "mData": function (data, type, dataToSet) {
                                var previousStatus = parseInt(EsignTransactionStatus.Declined);
                                var html = ` <div class="screen-row isc-inline-pop-action-s1">
                                            <a class="isc-action-badge-td-s1" title="Preview" href="#" action-preview="${data["EsignTransactionID"]}">
                                                <i class="fa fa-eye"></i>
                                            </a>
                                            <a class="isc-action-badge-td-s1" href="DownloadTransactionFile.aspx?EsignTransactionID=${data["EsignTransactionID"]}" title="Download">
                                                <i class="fa fa-download"></i>
                                            </a>
                                            <a class ="isc-action-badge-td-s1" data-previousstatus=${previousStatus} data-esigntransactionid=${data["EsignTransactionID"]} progress-status-update="true" title="Archive">
                                                <i class="fa fa-archive"></i>
                                            </a>
                                        </div>`;
                                return html;
                            }
                        },
                    ]
                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "BindDeclinedList");
            }
        },
    }

    var service = {

    }

    return {
        Init: Init,
        BindDeclinedList: dom.BindDeclinedList,
        DeclinedConfigureOrderBy: data.DeclinedConfigureOrderBy,
    }
})();

var Archive = (function () {

    var Init = function (progressStatusID) {
        try {
            $('[data-dynamic-filter]').hide();
            $('#div-updatedOn').show();
            dom.BindArchiveList(progressStatusID);
            $('#deleteArchive').hide();
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "Archive Init");
        }
    }

    var data = {
        ArchiveConfigureOrderBy: function (objModel) {
            var columnName = objModel.order[0].column;
            var direction = objModel.order[0].dir;
            var orderBy = "";
            try {
                switch (columnName) {
                    case 0:
                        orderBy = "ET.Name " + direction;
                        break;
                    case 1:
                        orderBy = "ET.Description " + direction;
                        break;
                    case 3:
                        orderBy = "ET.UpdatedOn " + direction;
                        break;
                    case 4:
                        orderBy = "ET.UpdatedOn " + direction;
                        break;
                }
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "ArchiveConfigureOrderBy");
            }
            return orderBy;
        },
        ShowBulkDelete: function () {
            var allCheckBoxCount = $('#tblArchive tbody [data-check]').length;
            var selectedCheckBoxCount = $('#tblArchive tbody [data-check]:checked').length;
            if (selectedCheckBoxCount > 0) {
                $('#deleteArchive').show();
            }
            else {
                $('#deleteArchive').hide();
                $("#checkAll").prop("checked", false);
            }
            if (allCheckBoxCount == selectedCheckBoxCount) {
                $("#checkAll").prop("checked", true);

            }
            else {
                $("#checkAll").prop("checked", false);
            }
        },
        BulkDelete: function () {
            var TransactionID = [];
            var TransactionAuditData = [];
            $('#tblArchive  tbody [data-check]:checked').each(function (index, item) {
                var objDeletedTransaction = {};
                var objTransactionAuditData = {};
                objDeletedTransaction.TransactionID = $(item).attr("data-check");
                objDeletedTransaction.IsDeleted = 1;
                objTransactionAuditData.TransactionID = parseInt($(item).attr("data-check"));
                objTransactionAuditData.UserName = ApplicationUser.UserName;
                objTransactionAuditData.ActionType = parseInt(ESIGN_ACTIONS.Deleted);
                TransactionID.push(objDeletedTransaction);
                TransactionAuditData.push(objTransactionAuditData);
            });
            service.DeleteTransaction(TransactionID);
            service.BulkInsertAuditTransaction(TransactionAuditData);


        },
        EmptyBin: function () {
            var TransactionID = [];
            var TransactionAudit = [];
            $('#tblArchive  tbody [data-check]').each(function (index, item) {
                var objDeletedTransaction = {}
                var objTransactionAudit = {};
                objDeletedTransaction.TransactionID = $(item).attr("data-check");
                objDeletedTransaction.IsDeleted = 1;

                objTransactionAudit.TransactionID = parseInt($(item).attr("data-check"));
                objTransactionAudit.UserName = ApplicationUser.UserName;
                objTransactionAudit.ActionType = parseInt(ESIGN_ACTIONS.Deleted);
                TransactionID.push(objDeletedTransaction);
                TransactionAudit.push(objTransactionAudit);

            });
            service.DeleteTransaction(TransactionID);
            service.BulkInsertAuditTransaction(TransactionAudit);

        }
    }

    var dom = {
        BindArchiveList: function (progressStatusID) {
            try {
                var tableBodyStartAt = 110;
                var screenFooterHeight = 250;
                var wHeight = $(window).height();
                var tableAvailabeHeight = parseInt((wHeight) - (tableBodyStartAt + screenFooterHeight));
                $('#tblArchive').DataTable({
                    'bServerSide': true,
                    "pagingType": "full_numbers",
                    'bPaginate': true,
                    "scrollY": tableAvailabeHeight + "px",
                    "ajax": {
                        "url": sys_ajaxURL + "CDM_SPMulti_Read",
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        type: "POST",
                        async: false,
                        "data": function (dataTableModel) {
                            var obj = Transaction.ConfigurePaginationModel(dataTableModel, progressStatusID);
                            var _obj = {
                                "StrjsonObject": JSON.stringify(obj),
                                "SPName": "SP_ES_GetTransactionList"
                            }
                            return JSON.stringify(_obj);
                        },
                        "dataSrc": function (json) {
                            var objData = JSON.parse(json.d);
                            json.recordsTotal = objData["TransactionAllCount"][0].TransactionCount;
                            json.recordsFiltered = objData["TransactionAllCount"][0].TransactionCount;
                            json.data = $(common.AUF(objData["TransactionList"]));
                            return json.data;
                        }
                    },
                    "autoWidth": false,
                    "order": [[4, "desc"]],
                    "bFilter": false,
                    'bDestroy': true,
                    'bInfo': false,
                    "pageLength": 20,
                    'bLengthChange': false,
                    "language": {
                        "emptyTable": '<span class="no-data-message">No Documents Found</span>'
                    },
                    'createdRow': function (row, data, dataIndex) {
                        $(row).attr('data-transactionid', data.EsignTransactionID);
                        $(row).addClass("isc-table-read-optimal");
                    },
                    'aoColumns': [
                        {
                            //"width": '5%',
                            "orderable": false,
                            "mData": function (data, type, dataToSet) {
                                var html = `<input type="checkbox" data-check="${data["EsignTransactionID"]}" value="${data["EsignTransactionID"]}" data-esigntransactionid=${data["EsignTransactionID"]}>

                                      `;
                                return html;
                            }
                        },
                        {
                            //"width": '20%',
                            "mData": function (data, type, dataToSet) {
                                var html = `<h5 title='${common.NFTD(data["Name"])}'>${common.NFS(data["Name"])}

                                        </h5>`;
                                return html;
                            }
                        },
                        {
                            //"width": '8%',
                            "orderable": false,
                            className: 'text-center',
                            "mData": function (data, type, dataToSet) {
                                var recipientlist = data["RecipientList"];
                                var emailList = common.AUF(JSON.parse(recipientlist));
                                var distEmailList = GetDistinctArray(emailList, 'EmailID')
                                var emailLength = distEmailList.length;
                                var html = '';
                                if (emailList.length > 0) {
                                    if (emailList[0]["EmailID"] != null) {
                                        //<h1 class="isc-lbl-list-collect-s1" title="${common.NFS(emailList[0]["EmailID"])}"> ${common.NFS(emailList[0]["EmailID"])}
                                        html += `
                                               </h1> <span class="cur-ptr isc-lbl-list-collect-s1-span" style="display:${emailLength > 0 ? "inline-block" : "none"}"> ${emailLength}
                                                    <div class ="isc-list-hover-commnt-con-s1">`
                                        for (var i = 0; i < distEmailList.length; i++) {
                                            if (i == 0) {
                                                html += `<a href="TransactionDetails.aspx?transaction=${data.EsignTransactionID}" class="text-left">View Details</a>`;
                                            }
                                            html += `<div class="isc-in-kpi-det-s1">
                                                    <div class ="isc-lbl-list-hvr-kpi-s1" title='${common.NFS(distEmailList[i]["EmailID"])}'>
                                                        ${common.NFS(distEmailList[i]["EmailID"])}
                                                 </div>`;
                                        };
                                        html += `           </div>
                                                    </div>
                                                </span>
                                            `;
                                    }
                                }
                                else if (emailList == null) {
                                    html += `<h1 class="isc-lbl-list-collect-s1"> - </h1>`;
                                }
                                return html;
                            }
                        },
                        {
                            //"width": '8%',
                            "mData": function (data, type, dataToSet) {
                                var html = `<a title='${common.NFTD(data["Description"])}' class="isc-lbl-act-read-list-s1 isc-wrk-flw-sta-upload">${common.NFS(data["Description"])}</a>`;
                                return html;
                            }
                        },
                        {
                            //"width": '10%',
                            "mData": function (data, type, dataToSet) {
                                var html = `<h5 title='${common.NFD(data["UpdatedOn"])}'>${common.NFD(data["UpdatedOn"])}</h5>`;
                                return html;
                            }
                        },
                        {
                            //"width": '5%',
                            "orderable": false,
                            "mData": function (data, type, dataToSet) {
                                var recipientlist = common.AUF(data["RecipientList"]);
                                var html = `<div class="screen-row isc-inline-pop-action-s1">
                                            <a class="isc-action-badge-td-s1" title="Preview" href="#" action-preview="${data["EsignTransactionID"]}">
                                                <i class="fa fa-eye"></i>
                                            </a>
                                            <a class="isc-action-badge-td-s1" title="Download" href="DownloadTransactionFile.aspx?EsignTransactionID=${data["EsignTransactionID"]}">
                                                <i class="fa fa-download"></i>
                                            </a>
                                            <a class ="isc-action-badge-td-s1" data-restore="true" data-previousstatus=${data["PreviousStatus"]} data-esigntransactionid=${data["EsignTransactionID"]} title="Restore" href="#">
                                                <i class="fa fa-undo"></i>
                                            </a>
                                          </div>`;
                                return html;
                            }
                        },

                    ]
                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "BindArchiveList");
            }
        },

    }

    var service = {
        DeleteTransaction: function (lstTransaction) {
            try {
                var _tempList = {};
                var lst = [];
                var obj = {

                };
                lst.push(JSON.stringify(obj));
                var _obj = {
                    "TObject": JSON.stringify(lstTransaction),
                    "TypeName": "Tbl_TransactionID",
                    "StrjsonObject": lst,
                    "SPName": "SP_ES_BulkDelete"
                }
                $.when(Call_AJAX("CDM_SP_CustomType_Action", _obj)).done(function (response) {
                    _tempList = JSON.parse(response);
                });
                return _tempList;
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "DeleteTransaction");
            }
        },
        BulkInsertAuditTransaction: function (lstTransactionAudit) {
            try {
                var _tempList = {};
                var lst = [];
                var obj = {

                };
                lst.push(JSON.stringify(obj));
                var _obj = {
                    "TObject": JSON.stringify(lstTransactionAudit),
                    "TypeName": "Tbl_TransactionAuditID",
                    "StrjsonObject": lst,
                    "SPName": "SP_ES_BulkInsertTransactionAudit"
                }
                $.when(Call_AJAX("CDM_SP_CustomType_Action", _obj)).done(function (response) {
                    _tempList = JSON.parse(response);
                });
                return _tempList;
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "BulkInsertAuditTransaction");
            }
        }
    }
    return {
        Init: Init,
        BindArchiveList: dom.BindArchiveList,
        ArchiveConfigureOrderBy: data.ArchiveConfigureOrderBy,
        BulkDelete: data.BulkDelete,
        ShowBulkDelete: data.ShowBulkDelete,
        EmptyBin: data.EmptyBin,
    }
})();

var Filters = (function () {

    var tabInfo = [
        { "Id": 1000, "Name": "Not Sent", "filterColumnName": "", "filterColumnValue": "" },
        { "Id": 1001, "Name": "Sent", "filterColumnName": "DispatchedOn", "filterColumnValue": "" },
        { "Id": 1002, "Name": "Signed", "filterColumnName": "SignedOn", "filterColumnValue": "" },
        { "Id": 1003, "Name": "Declined", "filterColumnName": "SignedOn", "filterColumnValue": "" },
        { "Id": 1004, "Name": "Archived", "filterColumnName": "UpdatedOn", "filterColumnValue": "" },
    ];

    var recipient = "";

    var Init = function () {
        $('#filterRecipients').val(recipient);
        common.RegisterSelectPicker();


        $.each(tabInfo, function (index, item) {
            switch (item.Id) {
                case EsignTransactionStatus.Inbox:
                    break;
                case EsignTransactionStatus.Dispatched:
                    $('#dispatchedOn').val(item.filterColumnValue);
                    break;
                case EsignTransactionStatus.Signed:
                    $('#signedOn').val(item.filterColumnValue);
                    break;
                case EsignTransactionStatus.Declined:
                    $('#declinedOn').val(item.filterColumnValue);
                    break;
                case EsignTransactionStatus.Archive:
                    $('#updatedOn').val(item.filterColumnValue);
                    break;
            }
        });
    }

    var data = {
        SetValues: function (tabId) {
            switch (tabId) {
                case EsignTransactionStatus.Inbox:
                    break;
                case EsignTransactionStatus.Dispatched:
                    $.each(tabInfo, function (index, item) {
                        if (item.Id == EsignTransactionStatus.Dispatched) {
                            item.filterColumnValue = $('#dispatchedOn').val();
                        }
                    });
                    break;
                case EsignTransactionStatus.Signed:
                    $.each(tabInfo, function (index, item) {
                        if (item.Id == EsignTransactionStatus.Signed) {
                            item.filterColumnValue = $('#signedOn').val();
                        }
                    });
                    break;
                case EsignTransactionStatus.Declined:
                    $.each(tabInfo, function (index, item) {
                        if (item.Id == EsignTransactionStatus.Declined) {
                            item.filterColumnValue = $('#declinedOn').val();
                        }
                    });
                    break;
                case EsignTransactionStatus.Archive:
                    $.each(tabInfo, function (index, item) {
                        if (item.Id == EsignTransactionStatus.Archive) {
                            item.filterColumnValue = $('#updatedOn').val();
                        }
                    });
                    break;
            }
        },

        GetValues: function (tabId) {
            var objData = {};
            $.each(tabInfo, function (index, item) {
                if (item.Id == tabId) {
                    objData = item;
                }
            });
            return objData;
        },

        Reset: function () {
            $('#transactionName').val('');
            $('#filterRecipients').val('');
            common.RegisterSelectPicker();
            $('#dispatchedOn').val('');
            $('#signedOn').val('');
            $('#declinedOn').val('');
            $('#updatedOn').val('');
            tabInfo = [
                { "Id": 1000, "Name": "Not Sent", "filterColumnName": "", "filterColumnValue": "" },
                { "Id": 1001, "Name": "Sent", "filterColumnName": "DispatchedOn", "filterColumnValue": "" },
                { "Id": 1002, "Name": "Signed", "filterColumnName": "SignedOn", "filterColumnValue": "" },
                { "Id": 1003, "Name": "Declined", "filterColumnName": "SignedOn", "filterColumnValue": "" },
                { "Id": 1004, "Name": "Archived", "filterColumnName": "UpdatedOn", "filterColumnValue": "" },
            ];
            recipient = "";
        },
        GetRecipient: function () {
            return recipient;
        },
        SetRecipient: function () {
            recipient = $('#filterRecipients').val();
        }

    }

    return {
        SetValues: data.SetValues,
        GetValues: data.GetValues,
        GetRecipient: data.GetRecipient,
        SetRecipient: data.SetRecipient,
        Reset: data.Reset,
        Init: Init
    }

})();


var Template = (function () {

    var Init = function () {

    }

    var data = {
        Clone: function (templateID, transactionName, templateDescription) {
            try {
                var esignTransactionID;
                esignTransactionID = service.Clone(templateID, transactionName, templateDescription);
                //esignTransactionID = parseInt(esignTransactionID[0].EsignTransactionID);
            }
            catch (err) {
                TRACE.Error(err, UserID, "Template.aspx", "Clone");
            }
            return esignTransactionID;
        },
    }
    var service = {
        Clone: function (templateID, transactionName,templateDescription) {
            var _tempList = {};
            try {
                var lst = [];
                var obj = {
                    TemplateID: templateID,
                    CreatedBy: UserID,
                    TransactionName: transactionName,
                    Description: templateDescription,
                    IsMultiTemplate: IS_MULTI_TEMPLATE
                };
                lst.push(JSON.stringify(obj));
                var _obj = {
                    "StrjsonObject": lst,
                    "SPName": "SP_ES_CloneTemplate"
                }
                $.when(Call_AJAX("CDM_SP_Action", _obj)).done(function (response) {
                    _tempList = parseInt(response);
                });
            }
            catch (err) {
                TRACE.Error(err, UserID, "Template.aspx", "Clone");
            }
            return _tempList;
        },
    }

    return {
        Clone: data.Clone
    }

})();

//Events 
{
    $(document).on("click", '#btnAddTransaction', function (e) {
        try {
            e.preventDefault();
            $('#btnSubmit').show();
            $('#btnUpdate').hide();
            $("#mdlTitleTransaction").text("Add Document");
            Transaction.ResetErrorMessage();
            Transaction.ResetAddTransaction();
            Transaction.GetTransactionPopUp();
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "btnAddTransaction");
        }

    });

    $(document).on('change', '#transactionFile', function (e) {
        try {
            LIST_FILES = [];
            var fileName = [];
            for (var i = 0; i < $(this).get(0).files.length; ++i) {
                LIST_FILES.push(e.target.files[i]);
                //fileName[i] = e.target.files[i].name;
            }
            Transaction.BindTransactionFile(LIST_FILES);
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "transactionFile");
        }
    });


    $(document).on('click', '#transactionFile', function (e) {
        try {
            $('#transactionFile').val('');
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "transactionFile");
        }
    });


    //$(document).on('click', '[action-remove-file]', function (e) {
    //    try {
    //        e.preventDefault();
    //        //Transaction.RemoveTransactionFile();
    //        var divId = $(this).closest('.isc-file-upload-tile-con-s1').attr('id');
    //        $(this).closest('.isc-file-upload-tile-con-s1').remove();
    //    }
    //    catch (err) {
    //        TRACE.Error(err, UserID, "Transaction.aspx", "[action-remove-file]");
    //    }
    //});

    $(document).on('click', '[action-close-trnsaction]', function () {
        try {
            Transaction.ResetAddTransaction();
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "[action-remove-file]");
        }
    });

    $(document).on('click', '#btnSubmit', function (e) {
        if (Transaction.IsValidTransaction()) {
            $loading.show();
            setTimeout(function () {
                try {
                    var file = LIST_FILES.length;
                    if (file == 0) {
                        $('#error-validpdffile').show();
                    }
                    var isValid = true;
                    var documentName = $('#txtTransactionName').val();
                    if (documentName.length == 0) {
                        $('#error-transaction-name').show();
                        isValid = false;
                    }

                    var fileCount = LIST_FILES.length;
                    if (fileCount == 0) {
                        $('#error-validpdffile').show();
                        isValid = false;
                    }
                    if (isValid) {
                        Transaction.AddTransaction();
                        Transaction.BindTransactionGroupBy();
                    }
                    $loading.hide();

                }
                catch (err) {
                    TRACE.Error(err, UserID, "Transaction.aspx", "btnSubmit");
                }
            }, 0);
        }
    });

    $(document).on('keyup', '#transactionName', function (e) {
        clearTimeout(LAZYTYPING);
        LAZYTYPING = setTimeout(() => {
            setTimeout(function () {
                try {
                    var currentTab = parseInt($('[data-tab-id]').parent('.active').children().attr("data-tab-id"));
                    Transaction.BindTransactionGroupBy(currentTab);
                    $('[data-tab-id]').parent().removeClass("active");
                    $('[data-tab-id="' + currentTab + '"]').parent().addClass("active");
                    Transaction.TransactionApplyFilter();
                }
                catch (err) {
                    TRACE.Error(err, UserID, "Transaction.aspx", "transactionName KeyupEvent");
                }

            }, 0);

        }, 250);
    });

    $(document).on('click', '#resetTransactionName', function (e) {
        $loading.show();
        setTimeout(function () {
            try {
                $('#transactionName').val('');
                var currentTab = parseInt($('[data-tab-id]').parent('.active').children().attr("data-tab-id"));
                Transaction.BindTransactionGroupBy(currentTab);
                $('[data-tab-id]').parent().removeClass("active");
                $('[data-tab-id="' + currentTab + '"]').parent().addClass("active");
                Transaction.TransactionApplyFilter();
                $loading.hide();
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "daterangepicker");
            }

        }, 0);


    });
    $(document).on('click', '[data-tab-id]', function (e) {
        try {
            $loading.show();
            Filters.Init();
            var progressStatusID = parseInt($(this).attr("data-tab-id"));
            Transaction.BindTransactionGroupBy(progressStatusID);
            $('[data-tab-id]').parent().removeClass("active");
            $('[data-tab-id="' + progressStatusID + '"]').parent().addClass("active");
            $("[data-tab-content]").hide();
            $("[data-tab-content='" + progressStatusID + "']").show();
            setTimeout(function () {
                try {
                    switch (progressStatusID) {
                        case EsignTransactionStatus.Inbox:
                            Inbox.Init(progressStatusID);
                            break;
                        case EsignTransactionStatus.Dispatched:
                            Dispatched.Init(progressStatusID);
                            break;
                        case EsignTransactionStatus.Signed:
                            Signed.Init(progressStatusID);
                            break;
                        case EsignTransactionStatus.Declined:
                            Declined.Init(progressStatusID);
                            break;
                        case EsignTransactionStatus.Archive:
                            Archive.Init(progressStatusID);

                            break;
                    }
                    //Transaction.TransactionApplyFilter();
                    $("#checkAll").prop("checked", false);

                    $loading.hide();


                }
                catch (err) {
                    TRACE.Error(err, UserID, "Transaction.aspx", "[data-tab-id]");
                }
            }, 0);
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "[data-tab-id]");
        }
    });
    $(document).on('click', '[data-dispatched="true"]', function () {
        try {
            var esignTransactionID = parseInt($(this).attr("data-esigntransactionid"));
            var sequence = parseInt($(this).attr("data-sequence"));
            $loading.show();
            setTimeout(function () {
                try {
                    Inbox.TriggerDispatchProcess(esignTransactionID, sequence);
                    $loading.hide();
                }
                catch (err) {
                    TRACE.Error(err, UserID, "Transaction.aspx", "[data-dispatched]");
                }

            }, 0);
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "[data-dispatched]");
        }

    });
    $(document).on('click', '[progress-status-update="true"]', function () {
        try {
            var esignTransactionID = parseInt($(this).attr("data-esigntransactionid"));
            var previousStatus = parseInt($(this).attr("data-previousstatus"));
            $loading.show();
            setTimeout(function () {
                try {
                    var progressStatusID = parseInt(EsignTransactionStatus.Archive);
                    var objTransactionAudit = new Transaction_Audit(esignTransactionID, ApplicationUser.UserName, ESIGN_ACTIONS.Archive);
                    EventManager.publish("InsertTransactionAudit", { data: objTransactionAudit });
                    Transaction.UpdateProgressStaus(esignTransactionID, progressStatusID, previousStatus);
                    var currentTab = parseInt($('[data-tab-id]').parent('.active').children().attr("data-tab-id"));
                    Transaction.BindTransactionGroupBy(progressStatusID);
                    $('[data-tab-id]').parent().removeClass("active");
                    $('[data-tab-id="' + currentTab + '"]').parent().addClass("active");
                    Transaction.TransactionApplyFilter();
                    $.notify("Document Archived Successfully!", "success");
                    $loading.hide();
                }
                catch (err) {
                    TRACE.Error(err, UserID, "Transaction.aspx", "[progress-status-update]");
                }

            }, 0);
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "[progress-status-update]");
        }
    });
    $(document).on('click', '[data-restore="true"]', function () {
        try {
            var esignTransactionID = parseInt($(this).attr("data-esigntransactionid"));
            var progressStatusID = parseInt($(this).attr("data-previousstatus"));
            $loading.show();
            setTimeout(function () {
                try {
                    var objTransactionAudit = new Transaction_Audit(esignTransactionID, ApplicationUser.UserName, ESIGN_ACTIONS.Restore);
                    EventManager.publish("InsertTransactionAudit", { data: objTransactionAudit });
                    Transaction.UpdateProgressStaus(esignTransactionID, progressStatusID);
                    var currentTab = parseInt($('[data-tab-id]').parent('.active').children().attr("data-tab-id"));
                    Transaction.BindTransactionGroupBy(progressStatusID);
                    $('[data-tab-id]').parent().removeClass("active");
                    $('[data-tab-id="' + currentTab + '"]').parent().addClass("active");
                    Transaction.TransactionApplyFilter();
                    $.notify("Document Restored Successfully!", "success");
                    $loading.hide();
                    Archive.ShowBulkDelete();
                    $("#checkAll").prop("checked", false);
                }
                catch (err) {
                    TRACE.Error(err, UserID, "Transaction.aspx", "[data-restore]");
                }
            }, 0);
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "[data-restore]");
        }
    });
    $(document).on("click", "[action-preview]", function (e) {
        try {
            e.preventDefault();
            var esignTransactionID = $(this).attr("action-preview");
            $loading.show();
            setTimeout(function () {
                try {
                    window.open("Preview.aspx?IsDocument=true&EsignTransactionID=" + esignTransactionID);
                    $loading.hide();
                }
                catch (err) {
                    TRACE.Error(err, UserID, "Transaction.aspx", "[action-preview]");
                }
            }, 0);
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "[action-preview]");
        }
    });
    $(document).on("click", "[action-signpreview]", function (e) {
        try {
            e.preventDefault();
            var esignTransactionID = $(this).attr("action-signpreview");
            $loading.show();
            setTimeout(function () {
                try {
                    //$("#mp_preview_doc").modal("show");
                    //  Transaction.BindPDFPreview(esignTransactionID);
                    window.open("Preview.aspx?IsSigned=true&EsignTransactionID=" + esignTransactionID);
                    $loading.hide();
                }
                catch (err) {
                    TRACE.Error(err, UserID, "Transaction.aspx", "[action-preview]");
                }
            }, 0);
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "[action-preview]");
        }
    });
    $(document).on("click", '#filter_togle', function (e) {
        try {
            e.preventDefault();
            // $(this).parent().removeClass("active");
            $(this).parent().toggleClass("active");
            $('#filter_con').toggle();
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "filter_togle");
        }
    });
    $(document).on("click", '[data-transaction-Delete="true"]', function (e) {
        try {
            var esignTransactionID = parseInt($(this).attr("data-esigntransactionid"));
            swal({
                title: "Are you sure?",
                text: "Once deleted, you will not be able to recover this Document file!",
                icon: "warning",
                buttons: true,
                dangerMode: true,
                closeOnClickOutside: false,

            })

                .then((willDelete) => {
                    if (willDelete) {
                        Inbox.DeleteTransaction(esignTransactionID, UserID);
                        var objTransactionAudit = new Transaction_Audit(esignTransactionID, ApplicationUser.UserName, ESIGN_ACTIONS.Deleted);
                        EventManager.publish("InsertTransactionAudit", { data: objTransactionAudit });
                        swal("Your Document file has been deleted!", {
                            icon: "success",
                        });
                        Transaction.TransactionApplyFilter();
                        Transaction.Init();
                    }

                });

        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "data-transaction-Delete");
        }
    });
    $(document).on('keyup', '#txtTransactionName', function () {
        try {
            var filename = $('#txtTransactionName').val();
            if (filename.length != 0) {
                $('#error-transaction-name').hide();
            }
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "txtTransactionName");
        }

    });
    $(document).on('click', '#resetFilter', function () {
        $loading.show();
        setTimeout(function () {
            try {
                Transaction.ResetTransactionFilters();
                var currentTab = parseInt($('[data-tab-id]').parent('.active').children().attr("data-tab-id"));
                Transaction.BindTransactionGroupBy(currentTab);
                $('[data-tab-id]').parent().removeClass("active");
                $('[data-tab-id="' + currentTab + '"]').parent().addClass("active");
                Transaction.TransactionApplyFilter();
                $loading.hide();
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "resetFilter");
            }
        });
    });
    $(document).on("click", '[data-transaction-Edit="true"]', function (e) {
        try {
            e.preventDefault();
            var esignTransactionID = parseInt($(this).attr("data-EsignTransactionID"));
            $("#mdlTitleTransaction").text("Update Documents");
            Transaction.ResetErrorMessage();
            Transaction.GetPDFData(esignTransactionID);
            Transaction.BindTransactionPopUp();
            Transaction.GetTransactionPopUp();
            $('#btnSubmit').hide();
            $('#btnUpdate').show();
            $('#fileUplodDiv').hide();
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "[data-transaction-edit]");
        }
    });
    $(document).on('click', '#btnUpdate', function () {
        $loading.show();
        setTimeout(function () {
            try {
                Transaction.UpdateTransactionFile();
                Inbox.Init(EsignTransactionStatus.Inbox);
                $loading.hide();
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "btnUpdate");
            }
        }, 0)

    });
    $(document).on('click', '#filterSearch', function (e) {
        $("#checkAll").prop("checked", false);
        e.preventDefault();
        $loading.show();
        setTimeout(function () {
            try {
                var currentTab = parseInt($('[data-tab-id]').parent('.active').children().attr("data-tab-id"));
                Filters.SetValues(currentTab);
                Filters.SetRecipient();
                Filters.Init();
                Transaction.BindTransactionGroupBy(currentTab);
                $('[data-tab-id]').parent().removeClass("active");
                $('[data-tab-id="' + currentTab + '"]').parent().addClass("active");
                Transaction.TransactionApplyFilter();

                $loading.hide();
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "daterangepicker");
            }
        }, 0);
    });
    $(document).on('click', '#checkAll', function () {
        var allCheckBoxCount = $('#tblArchive tbody [data-check]').length;
        $('[data-check]').not(this).prop('checked', this.checked);
        if (allCheckBoxCount > 0) {
            $("#checkAll").prop("checked", true);
            Archive.ShowBulkDelete();
        }
        else {
            $("#checkAll").prop("checked", false);
        }

    });
    $(document).on('change', '[data-check]', function () {
        Archive.ShowBulkDelete();
    });
    $(document).on('click', '#emptyArchive', function () {
        try {
            var EmptyBinSelectedTransactionID = $('#tblArchive tbody [data-check]').length;

            if (EmptyBinSelectedTransactionID > 0) {
                swal({
                    title: "Are you sure?",
                    text: "Want to empty the folder!",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                    closeOnClickOutside: false,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            Archive.EmptyBin();
                            swal("Your Document file has been deleted!", {
                                icon: "success",
                            });
                            Transaction.TransactionApplyFilter();
                            var currentTab = parseInt($('[data-tab-id]').parent('.active').children().attr("data-tab-id"));
                            Transaction.BindTransactionGroupBy(currentTab);
                            $('[data-tab-id]').parent().removeClass("active");
                            $('[data-tab-id="' + currentTab + '"]').parent().addClass("active");
                            //  Archive.ShowBulkDelete();
                            $("#checkAll").prop("checked", false);
                        }

                    });

                //$("#checkAll").prop("checked", false);
            }
            else {
                $.notify("Nothing to delete ", "error");
                $('#deleteArchive').hide();
            }
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "data-transaction-Delete");
        }

    });
    $(document).on('click', '#deleteArchive', function () {
        try {
            var selectedCheckBoxCount = $('#tblArchive tbody [data-check]:checked').length;
            if (selectedCheckBoxCount > 0) {
                swal({
                    title: "Are you sure",
                    text: "you want to Delete this transaction?",
                    icon: "warning",
                    buttons: true,
                    dangerMode: true,
                    closeOnClickOutside: false,
                })
                    .then((willDelete) => {
                        if (willDelete) {
                            Archive.BulkDelete();
                            swal("Your Document file has been deleted!", {
                                icon: "success",
                            });
                            Transaction.TransactionApplyFilter();
                            var currentTab = parseInt($('[data-tab-id]').parent('.active').children().attr("data-tab-id"));
                            Transaction.BindTransactionGroupBy(currentTab);
                            $('[data-tab-id]').parent().removeClass("active");
                            $('[data-tab-id="' + currentTab + '"]').parent().addClass("active");
                            // Archive.ShowBulkDelete();
                            $("#checkAll").prop("checked", false);
                        }
                    });
            }
            else {
                $.notify("Nothing to delete!", "error");
                $('#deleteArchive').hide();
            }
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "data-Archive-Delete");
        }
    });

    $(document).on('click', '#btn-from-template', function () {
        
        var isValid = true;
        var datalength = $('#tbltemplate tbody [data-check-template]:checked').length;
        if (datalength == 0) {
            $.notify("Please select template", "error");
            isValid = false;
        }
        if (isValid) {
            try {
                if (datalength >= 1) {
                    str_lst_templateID = $('#tbltemplate tbody [data-check-template]:checked').map(function () {
                        return $(this).attr('data-check-template');
                    }).get().join(",");
                    $("#mdlTitleTemplateTransaction").text("Add Transaction");
                    Transaction.GetTemplateTransactionPopUp();
                }
                if (datalength>1)
                {
                    IS_MULTI_TEMPLATE = true;
                }
            }
            catch (err) {
                TRACE.Error(err, UserID, "Transaction.aspx", "#btn-from-template");
            }
        }


    });
    $(document).on('click', '#btnCreateTemplate', function (e) {
        try {
            
            var isValid = true;
            var transactionName = $('#txtTemplateTransactionName').val();
            var templateDescription = $('#txtTemplateDescription').val();
            if (transactionName.length == 0) {
                $('#error-template-transaction-name').show();
                isValid = false;
            }
            if (isValid) {
                $loading.show();
                setTimeout(function () {

                    var esignTransactionID = Template.Clone(str_lst_templateID, transactionName, templateDescription);

                    if (esignTransactionID > 0) {
                        window.location.href = "SignatureMapping.aspx?IsTemplateCopy=true&IsMultiTemplate="+IS_MULTI_TEMPLATE+"&EsignTransactionID=" + esignTransactionID;
                    }
                    $loading.hide();
                }, 0);
            }
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "#btnCreateTemplate");
        }
    });

    $(document).on('click', '#addTemplate', function (e) {
        try {
            $("[data-check-template]").prop("checked", false);
            $('#Mp_Add_Template').show();
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "#addTemplate");
        }

    });

    $(document).on('click', '.btn-template-close', function (e) {
        try {
            $('#Mp_Add_Template').hide();
            $("[data-check-template]").prop("checked", false);  
            $('#mp_add_multi_template').hide();
        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", ".btn-template-close");
        }

    });

    $(document).on('click', '[data-delete-file]', function (e) {
        try {

            var fileIndexValue = parseInt($(this).attr('data-delete-file'));
            LIST_FILES.splice(fileIndexValue, 1);
            $(this).closest('.isc-file-upload-tile-con-s1').remove();
            Transaction.BindTransactionFile(LIST_FILES);

        }
        catch (err) {
            TRACE.Error(err, UserID, "Transaction.aspx", "[data-delete-file]");
        }
    });

}

