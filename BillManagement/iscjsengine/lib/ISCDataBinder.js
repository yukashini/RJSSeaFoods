var Isc_Priority_Binder = {
    "_DataBinder": ["isc-binder"],
    "_ConditionalBinder": ["isc-if", "isc-greater", "isc-lesser"]
};

var ISCBinder = {
    Init: function () {
        $.each(Isc_Priority_Binder, function (index, item) {
            ISCBinder.ProcessAttibutes(item);
        });
    },
    ProcessAttibutes: function (key) {
        var $BinderAttr = $('body [' + key[0] + ']');
        if ($BinderAttr.length > 0) {
            $('[' + key + ']').each(function (index, item) {
                var CallBack = $(item).attr(key[0]);
                if (typeof ISCBinder[CallBack] === 'function') {
                    ISCBinder[CallBack](item);
                }
            });
        }
    },
    parentrepeat: function ($el) {
        var l = $($el).children().find('[isc-binder="repeat"]:last:not([data-repeat="false"])');
        if (l.length > 0) {
            $(l).each(function (index, item) {
                ISCBinder.repeat(item);
            });
            ISCBinder.parentrepeat($el);
        }
        else {
            ISCBinder.repeat($el);
        }
    },
    repeat: function ($el) {
        var l = $($el).children().find('[isc-binder="repeat"]:last:not([data-repeat="false"])');
        if (l.length > 0) {
            var dataSource = screenData[$(l).attr('isc-source')];
            var repeaterElementHtml = l[0].outerHTML;
            $(l).replaceWith(ISCBinder.repeaterdatahandler(dataSource, repeaterElementHtml));
            ISCBinder.repeat($el);
        }
        else {
            var dataSource = screenData[$($el).attr('isc-source')];
            var repeaterElementHtml = $el.outerHTML;
            $($el).replaceWith(ISCBinder.repeaterdatahandler(dataSource, repeaterElementHtml));
        }
    },
    repeaterdatahandler: function (dataSource, repeaterElementHtml) {
        var parsedHtml = $('<placeholder>').append($.trim(repeaterElementHtml));
        var resultHtml = $('<result></result>');
        if (dataSource.length > 0) {
            $.each(dataSource, function (index, item) {
                var cloneHtml = $('<placeholder>').append($(parsedHtml[0].innerHTML).clone());
                $.each(item, function (key, value) {
                    var regEx = new RegExp('{{' + key + '}}', 'g');
                    var $el = $(cloneHtml[0]);
                    $el.html($el.html().replace(regEx, value));
                });
                $(cloneHtml[0]).find('[isc-binder]').attr('data-repeat', 'false');
                $(resultHtml[0]).append(cloneHtml[0].innerHTML);
            });
        }
        return resultHtml[0].innerHTML;
    },
    static: function () {
        $.each(screenData, function (index, item) {
            $.each(item, function (key, value) {
                var regEx = new RegExp('{{' + index + '.' + key + '}}', 'g');
                $('body').html($('body').html().replace(regEx, value));
            });
        });
    }
}



var _iscrepeater = function ($_el, _data, _maxsize) {
    // find children without data-repeat="false"
    // if found children having repeat
    // call _iscrepeater
    // else
    // process repeater
}
