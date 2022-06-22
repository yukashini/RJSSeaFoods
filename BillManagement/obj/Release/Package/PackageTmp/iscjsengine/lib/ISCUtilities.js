
// Utility Methods
{
    var DefaultMenu = 1000; // Home

    var ISCUtility = function () {
        return {
            MenuState: function () {
                var menu = GetSession('menu');
                if (menu !== null && menu !== 'undefined') {
                    var menuID = GetSession('menu')
                    $('li[data-menu]').removeClass('active');
                    $('li[data-menu="' + menuID + '"]').addClass('active');
                }
                else {
                    SetSession('menu', DefaultMenu);
                    $('li[data-menu]').removeClass('active');
                    $('li[data-menu="' + DefaultMenu + '"]').addClass('active');
                }
            }
        }
    } ();

}

// Session Management

{

    var SetSession = function (key, value) {
        if (typeof (Storage) == "undefined") {
            alert("Your browser does not support HTML5 localStorage. Try upgrading.");
        }
        else {
            sessionStorage.setItem(key, value);
        }
    }

    var GetSession = function (key) {
        if (sessionStorage.getItem(key) === null || sessionStorage.getItem(key) === undefined) {
            return null;
        }
        else {
            return sessionStorage.getItem(key)
        }
    }

    var ClearSession = function (key) {
        if (typeof (Storage) == "undefined") {
            alert("Your browser does not support HTML5 localStorage. Try upgrading.");
        }
        else {
            sessionStorage.removeItem(key);
        }
    }

}

// Evnets
{

    $(document).on('click', '[data-menu]', function (e) {
        var $this = $(this);
        SetSession('menu', $this.attr('data-menu'));
    });

}