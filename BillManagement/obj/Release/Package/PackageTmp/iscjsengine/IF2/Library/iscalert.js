var ALERT_TITLE = "Message";
var ALERT_BUTTON_TEXT = "Ok";

if (document.getElementById) {
    window.alert = function (txt, args) {
        createCustomAlert(txt, args);
        $("#closeBtn").focus();
    }
}

jQuery.fn.center = function () {
    this.css("position", "absolute");
    this.css("top", Math.max(0, (($(window).height() - $(this).outerHeight()) / 2) +
                                                $(window).scrollTop()) + "px");
    this.css("left", Math.max(0, (($(window).width() - $(this).outerWidth()) / 2) +
                                                $(window).scrollLeft()) + "px");
    return this;
}

function createCustomAlert(txt, args) {

    d = document;
    if (d.getElementById("modalContainer")) return;
    mObj = d.getElementsByTagName("body")[0].appendChild(d.createElement("div"));
    mObj.id = "modalContainer";
    mObj.style.height = d.documentElement.scrollHeight + "px";

    alertObj = mObj.appendChild(d.createElement("div"));
    alertObj.id = "alertBox";
    var topPos = 30;
    $(alertObj).css({
        left: ($(window).width()),
        top: topPos > 0 ? topPos : 0
    });
    alertObj.style.visiblity = "visible";
    headerContainer = alertObj.appendChild(d.createElement("div"));
    headerContainer.style.width = "100%";
    $(headerContainer).addClass("header");
    headerLeftCell = headerContainer.appendChild(d.createElement("div"));
    headerLeftCell.style.width = "50%";
    $(headerLeftCell).css('float', 'left');
    headerRigthCell = headerContainer.appendChild(d.createElement("div"));
    headerRigthCell.style.width = "50%";
    $(headerRigthCell).css('float', 'right');
    headerclearboth = headerContainer.appendChild(d.createElement("br"));
    headerclearboth.style.clear = "both";
    headerclearboth.style.height = "0px";
    h1 = headerLeftCell.appendChild(d.createElement("h1"));
    btn = headerRigthCell.appendChild(d.createElement("a"));
    btn.id = "closeBtn";
    btncloseicon = btn.appendChild(d.createElement("i"));
    $(btncloseicon).addClass('fa fa-times');
    msg = alertObj.appendChild(d.createElement("div"));
    $(msg).addClass('container');
    msg.innerHTML = txt;
    msg.style.margin = "0px";
    btn.href = "#";
    btn.focus();
    btn.onclick = function () {
        $(alertObj).fadeIn(500).animate({
            left: ($(window).width())
        }, 'slow', function () {
            removeCustomAlert();
        });

    }
    if (args !== undefined && args !== null) {
        ALERT_TITLE = toTitleCase(args);
        if ("error" === args.toLowerCase()) {
            $(alertObj).addClass("error");
            $(h1).prepend('<i class="fa fa-exclamation-circle" ></i> ');
        }
        else if ("sucess" === args.toLowerCase()) {
            $(alertObj).addClass("sucess");
        }
        else if ("warning" === args.toLowerCase()) {
            $(alertObj).addClass("warning");
        }
        else if ("message" === args.toLowerCase()) {
            $(alertObj).addClass("message");
            $(h1).prepend('<i class="fa fa-info-circle" ></i> ');
        }
    }
    h1.appendChild(d.createTextNode(ALERT_TITLE));
    $(alertObj).fadeIn(500).animate({
        left: ($(window).width() - $(alertObj).outerWidth())
    });
}

function removeCustomAlert() {

    document.getElementsByTagName("body")[0].removeChild(document.getElementById("modalContainer"));
}

function toTitleCase(str) {
    return str.replace(/(?:^|\s)\w/g, function (match) {
        return match.toUpperCase();
    });
}

//$(document).keyup(function (e) {
//    setTimeout(function () {
//        $("#alertBox #closeBtn").click();
//    });
//});

//$(document).on('click', 'body', function (e) {
//    setTimeout(function () {
//        $("#alertBox #closeBtn").click();
//    }, 0);
//});