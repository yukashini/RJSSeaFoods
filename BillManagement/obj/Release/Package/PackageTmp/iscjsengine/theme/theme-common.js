

/// <reference path="jquery-1.11.0.min.js" />

$(document).ready(function () {

//    $('.app-theme').click(function () {
//        var _theme = $(this).attr('data-theme');
//        var _themeicon = "selected-" + _theme;
//        $("#theme-icon").removeClass('selected-theme-green').removeClass('selected-theme-blue').removeClass('selected-theme-purple').removeClass('selected-theme-pink').removeClass('selected-theme-orange').addClass(_themeicon);
//        $('body').removeClass('theme-green').removeClass('theme-blue').removeClass('theme-purple').removeClass('theme-pink').removeClass('theme-orange').addClass(_theme);
//    });
});

function SideMenuSubSelection(rootid, subid) {
    var str = location.href.toLowerCase();
    $('.page-tab  li').each(function () {
        var _txtid = $(this).attr("id");
        if (_txtid == rootid) {
            if ($(this).hasClass("open")) {
                $(this).removeClass("open");
                return;
            }
            $(this).addClass("active open");
            $(this).find("#" + subid).slideDown();
            $(this).find("a span:last-child").addClass("open");
            $('#' + subid + ' li a').each(function () {
                if (str.indexOf(this.href.toLowerCase()) > -1) {
                    $(this).parent().addClass("active");
                }
            });


        }

    });
}

function MenuSelection() {
    var url = window.location.pathname;
    var pagename = url.substring(url.lastIndexOf('/') + 1);
    $('ul.page-tab  a').each(function () {
        var str = $(this).attr('href');
        if (pagename == str) {
            $(this).parent().addClass("active");
        } else {
            $(this).parent().removeClass("active");
        }
    });
}



function PageLoadBlock() {
    Metronic.blockUI({ boxed: true });
    $(".loading-message.loading-message-boxed img").attr("src", "/img/loading-spinner-grey.gif");
    window.setTimeout(function () {
        Metronic.unblockUI();
    }, 2000);
}



function SideMenuSubSelection(rootid, subid) {
    var str = location.href.toLowerCase();
    $('.page-tab-s2 li').each(function () {
        var _txtid = $(this).attr("id");
        if (_txtid == rootid) {
            if ($(this).hasClass("open")) {
                $(this).removeClass("open");
                return;
            }
            $(this).addClass("active open");
            $(this).find("#" + subid).slideDown();
            $(this).find("a span:last-child").addClass("open");
            $('#' + subid + ' li a').each(function () {
                if (str.indexOf(this.href.toLowerCase()) > -1) {
                    $(this).parent().addClass("active");
                }
            });


        }

    });
}

function MenuSelection() {
    var url = window.location.pathname;
    var pagename = url.substring(url.lastIndexOf('/') + 1);
    $('ul.page-tab-s2 a').each(function () {
        var str = $(this).attr('href');
        if (pagename == str) {
            $(this).parent().addClass("active");
        } else {
            $(this).parent().removeClass("active");
        }
    });
}

