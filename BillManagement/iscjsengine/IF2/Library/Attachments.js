
// Introduction
// Attachments for all entity

// Constants
{
    var lstEntityInstanceAttachments = [];
    var FileEntityID = 3000;
    var FileEntityInstanceID = 4380;
}

// Events
{
    $(document).on('click', '[isc-view-attachments-initiater="true"]', function (e) {
        e.preventDefault();
        FileEntityID = parseInt($(this).attr('File-EntityID'));
        FileEntityInstanceID = parseInt($(this).attr('File-EntityInstanceID'));
        // Get Attachments
        // Bind List of attachments in Pop Up
        lstEntityInstanceAttachments = [];
        lstEntityInstanceAttachments = GetAllAttachments();
        BindAllAttachments();
    });

    $(document).on('click', '[Isc-File-Download-single="true"]', function (e) {
        e.preventDefault();
        // Get AttachmentID
        // Send Single AttachmentID for Download
        var AttachmentID = $(this).attr('file-attachmentid');
        FileSingleDownload(AttachmentID);
    });

    $(document).on('click', '[Isc-File-Download-all="true"]', function (e) {
        e.preventDefault();
        FileEntityID = parseInt($(this).attr('File-EntityID'));
        FileEntityInstanceID = parseInt($(this).attr('File-EntityInstanceID'));
        FileMultiDownload();
    });

    $(document).on('click', '[del-attachment]', function (e) {
        var $this = $(this);
        var AttachmentID = $this.attr("del-attachment");
        DeleteAttachement(AttachmentID);
       
    });

    $(document).on('click', '[Preview-path]', function (e) {
        var $this = $(this);
        var type = $this.attr("type");
        var ext = $this.attr("ext");
        var Attachname = $this.attr("Attach_name");
        $('#Attachmentname').html(Attachname);
        var PreviewPath = $this.attr("Preview-path");
        if (type == ".jpg" || type == ".png" || type == "jpeg") {
            $('#mp_img_view').modal('show');
            $('#showimage').attr('src', PreviewPath + ext);
        }
        else {
            $.notify("The Extension is not valid", {
                position: "right top", className: "error"
            });
        }
        
    });
}

// Dom Manipulation
{
    var readURL = function (type) {
        if (type == ".jpg" || type==".png" || type=="jpeg") {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#image_upload_preview').attr('src', e.target.result);
            }

            reader.readAsDataURL(PreviewPath);
        }
        
    }

    var DeleteAttachement = function (AttachmentID)
    {
        var lst = [];
        var obj = {};
        obj.AttachmentID = AttachmentID;
        lst.push(JSON.stringify(obj));
        var _obj = {
            "StrjsonObject": lst,
            "SPName": "SP_RemoveAttachment"
        }
        $.confirm({
            title: 'Confirm!',
            content: 'Are you want delete the Attachment',
            //type: 'green',
            //autoClose: 'close|8000',
            typeAnimated: true,
            buttons: {
                Yes: function () {
                    $.when(Call_DefaultAJAX("CDM_SP_Action", _obj)).done(function (response) {
                        lstEntityInstanceAttachments = GetAllAttachments(PP_WorkItemsEntity, _CurrentWorkItemID);
                        BindAllAttachments(lstEntityInstanceAttachments);
                        $.alert(' Deleted');
                       
                    });
                },
                //No: function () {
                //    $.alert('Cancelled!');
                //}
            }
        });
    }

    var BindAllAttachments = function (templstEntityInstanceAttachments) {
        var $el = $('#bindattachements');
        var html = '';
        lstEntityInstanceAttachments = templstEntityInstanceAttachments
        if (lstEntityInstanceAttachments.length > 0) {
            $.each(lstEntityInstanceAttachments, function (index, item) {
                html += '<tr>                                                                               ';
                html += '<td>                                                                                ';
                html += '<h2 title="' + item["PhysicalName"] + '">' + item["PhysicalName"] + '</h2>                                                            ';
                html += '</td>                                                                               ';
                //html += '<td>                                                                                ';
                //html += '<h3>' + item["Size"] + '</h3>                                                                      ';
                //html += '</td>                                                                               ';
                html += '<td>';
                html += '<a class="isc-act-cir-cen-btn" title="Delete" del-attachment="' + item["AttachmentID"] + '"><i class="fa fa-trash-o"></i></a> ';
                html += '<a class="isc-act-cir-cen-btn" title="Download" Isc-File-Download-single="true" file-attachmentid="' + item["AttachmentID"] + '" delete-attachement="' + item["AttachmentID"] + '" path="' + item["PhysicalPath"] + '" ><i class="fa fa-download"></i></a>  ';
                html += '<a class="isc-act-cir-cen-btn" title="View" ext="' + item["AttachmentType"] + '" Attach_name="' + item["PhysicalName"] + '" Preview-path="' + AttachmentFolderPath + '\\' + item["LogicalName"] + '" type="' + item["AttachmentType"] + '"><i class="fa fa-eye"></i></a>           ';
                html += '</td>                                                                               ';
                html += '</tr>                                                                               ';
            });
        }

        else {
            html += '<tr><td  colspan="2"><h1  class="no-data-found" style="margin-top:15px;">No file found</h1></td></tr>';
        }
        $el.html(html);
    }

    // CSS
    {
        var cssHTML = '';
        cssHTML += '<style type="text/css">';
        cssHTML += '.isc-btn-pop-action-s3 {';
        cssHTML += 'width: 125px;';
        cssHTML += 'border-radius: 5px !important;';
        cssHTML += 'background-color: rgb(32, 155, 209) !important;';
        cssHTML += 'color: #fff !important;';
        cssHTML += 'padding: 6px 10px;';
        cssHTML += 'font-size: 13px;';
        cssHTML += '}';
        cssHTML += '.custom-vertical-scroll-set{';
        cssHTML += 'height: 73px !important;';
        cssHTML += 'overflow: hidden !important;';
        cssHTML += 'overflow-y: auto !important;';
        cssHTML += '}';
        cssHTML += '.custom-vertical-scroll-set::-webkit-scrollbar{width:6px;}';
        cssHTML += '.custom-header-fixed-set{width:100%;}';
        cssHTML += '</style>';
        $(cssHTML).appendTo('head');

    }
}

// Data Manipulation
{
    var GetAllAttachments = function (PP_WorkItemsEntity, _CurrentWorkItemID) {
        var _lstselect = [];
        var _objwhereClause = {};
        var _objJsonObject = {};
        // Read Tag Group        
        _objJsonObject.viewName = "EntityAttachment";
        _objJsonObject.entityID = 0;
        _objwhereClause.EntityID = PP_WorkItemsEntity;
        _objwhereClause.EntityInstanceID = _CurrentWorkItemID;
        _objJsonObject.whereClause = JSON.stringify(_objwhereClause);
        _objJsonObject.orderBy = ["PhysicalName"];
        _objJsonObject.groupBy = [];
        _lstselect.push(_objJsonObject);
        var _obj = {
            "jsonString": _lstselect
        }
        var _tempList = {};
        $.when(Call_AJAX("CDMSelect", _obj)).done(function (response) {
            _tempList = response
        });

        _tempList = ParseStringToObject(_tempList[0]['data'][0]);
        return _tempList;
    }
}


// Actions
{
    // Download files
    {
        var FileSingleDownload = function (AttachmentID) {

            window.location.href = 'DownloadAttachments.aspx?entityid=0&entityinstanceid=' + parseInt(AttachmentID) + '&type=0';
        }

        var FileMultiDownload = function () {
            window.location.href = 'DownloadAttachments.aspx?entityid=' + parseInt(FileEntityID) + '&entityinstanceid=' + parseInt(FileEntityInstanceID) + '&type=1';
            //   $('#file-attachemnt-download').modal('hide');
        }
    }

    // Submit Files
    {

        var UploadAttachments = function () {
            // EntityID
            // EntityInstanceID
            // Files
            var EntityID = $('#UploadAttachement').attr('EntityID');
            var EntityInstanceID = $('#UploadAttachement').attr('EntityInstanceID');
            var Files = $('#filename').prop("files");
            var data = new FormData();
            data.append("EntityID", EntityID);
            data.append("EntityInstanceID", EntityInstanceID);
            for (var i = 0; i < Files.length; i++) {
                data.append("key" + i, Files[i]);
            }
            if (Files.length > 0) {
                $.ajax({
                    async: false,
                    type: "POST",
                    url: "BugAttachements.ashx",
                    contentType: false,
                    processData: false,
                    data: data,
                    success: function (result) {
                       // $.alert("Success");
                    },
                    error: function (jhr, e) {
                        $.alert("error");
                        alert(e);
                    },
                    xhr: function (evt) {
                        var filexhr = $.ajaxSettings.xhr();

                        return filexhr;
                    }
                });
            }
        }
    }
}








