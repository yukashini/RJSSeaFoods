/// <reference path="../LibraryJS/jquery-1.11.0.min.js" />
$(document).ready(function () {
    var setSession = function (key, value) {
        sessionStorage.setItem(key, value);
    }

    var getSession = function (key) {
        return sessionStorage.getItem(key);
    }

    //show your layout
    $(".req-block-pos").click(function () {
        $(".form-container").show();
    });
    //Slide Right
    $('.toggle-cir-div').on('click', function () {
        $(".form-container").toggle('Right', 0);
    });
    $("#Ulzoomlist li a").on('click', function () {
        var _wWidth;
        var percentage = '';
        var dataSwitch = $(this).attr('data-item');
        if (dataSwitch == "Above 24inch View") {
            _wWidth = 1920;
            percentage = 97;
            var containerWidth = (_wWidth * percentage) / 100;
            var remainingWidth = _wWidth - containerWidth;

            setSession('width', $(".app-responsive-center-container").css("width", containerWidth));
            setSession('margin-right', $(".app-responsive-center-container").css("margin-right", 0));
            setSession('margin-left', $(".app-responsive-center-container").css("margin-left", 0));
            setSession('margin', $(".app-responsive-center-container").css("margin", '0 auto'));

            $("#AppThemeZoomable").css(getSession("width"));
            $("#AppThemeZoomable").css(getSession("margin-right"));
            $("#AppThemeZoomable").css(getSession("margin-left"));
            $("#AppThemeZoomable").css(getSession("margin"));
        }
        else if (dataSwitch == "22inch View") {
            _wWidth = 1600;
            percentage = 85;
            var containerWidth = (_wWidth * percentage) / 100;
            var remainingWidth = _wWidth - containerWidth;

            setSession('width', $(".app-responsive-center-container").css("width", containerWidth));
            setSession('margin-right', $(".app-responsive-center-container").css("margin-right", 0));
            setSession('margin-left', $(".app-responsive-center-container").css("margin-left", 0));
            setSession('margin', $(".app-responsive-center-container").css("margin", '0 auto'));

            $("#AppThemeZoomable").css(getSession("width"));
            $("#AppThemeZoomable").css(getSession("margin-right"));
            $("#AppThemeZoomable").css(getSession("margin-left"));
            $("#AppThemeZoomable").css(getSession("margin"));

        }
        else if (dataSwitch == "20inch View") {
            _wWidth = 1440;
            percentage = 75;
            var containerWidth = (_wWidth * percentage) / 100;
            var remainingWidth = _wWidth - containerWidth;

            setSession('width', $(".app-responsive-center-container").css("width", containerWidth));
            setSession('margin-right', $(".app-responsive-center-container").css("margin-right", 0));
            setSession('margin-left', $(".app-responsive-center-container").css("margin-left", 0));
            setSession('margin', $(".app-responsive-center-container").css("margin", '0 auto'));

            $("#AppThemeZoomable").css(getSession("width"));
            $("#AppThemeZoomable").css(getSession("margin-right"));
            $("#AppThemeZoomable").css(getSession("margin-left"));
            $("#AppThemeZoomable").css(getSession("margin"));


        }
        else if (dataSwitch == "15inch View") {
            _wWidth = 1366;
            percentage = 70;
            var containerWidth = (_wWidth * percentage) / 100;
            var remainingWidth = _wWidth - containerWidth;

            setSession('width', $(".app-responsive-center-container").css("width", containerWidth));
            setSession('margin-right', $(".app-responsive-center-container").css("margin-right", 0));
            setSession('margin-left', $(".app-responsive-center-container").css("margin-left", 0));
            setSession('margin', $(".app-responsive-center-container").css("margin", '0 auto'));

            $("#AppThemeZoomable").css(getSession("width"));
            $("#AppThemeZoomable").css(getSession("margin-right"));
            $("#AppThemeZoomable").css(getSession("margin-left"));
            $("#AppThemeZoomable").css(getSession("margin"));
        }
        else if (dataSwitch == "10inch View") {
            _wWidth = 1280;
            percentage = 60;
            var containerWidth = (_wWidth * percentage) / 100;
            var remainingWidth = _wWidth - containerWidth;
            setSession('width', $(".app-responsive-center-container").css("width", containerWidth));
            setSession('margin-right', $(".app-responsive-center-container").css("margin-right", 0));
            setSession('margin-left', $(".app-responsive-center-container").css("margin-left", 0));
            setSession('margin', $(".app-responsive-center-container").css("margin", '0 auto'));

            $("#AppThemeZoomable").css(getSession("width"));
            $("#AppThemeZoomable").css(getSession("margin-right"));
            $("#AppThemeZoomable").css(getSession("margin-left"));
            $("#AppThemeZoomable").css(getSession("margin"));
        }
        else if (dataSwitch == "8inch View") {
            _wWidth = 1024;
            percentage = 50;
            var containerWidth = (_wWidth * percentage) / 100;
            var remainingWidth = _wWidth - containerWidth;

            setSession('width', $(".app-responsive-center-container").css("width", containerWidth));
            setSession('margin-right', $(".app-responsive-center-container").css("margin-right", 0));
            setSession('margin-left', $(".app-responsive-center-container").css("margin-left", 0));
            setSession('margin', $(".app-responsive-center-container").css("margin", '0 auto'));

            $("#AppThemeZoomable").css(getSession("width"));
            $("#AppThemeZoomable").css(getSession("margin-right"));
            $("#AppThemeZoomable").css(getSession("margin-left"));
            $("#AppThemeZoomable").css(getSession("margin"));
        }
        else if (dataSwitch == "Ipad View") {
            _wWidth = 600;
            percentage = 95;
            var containerWidth = (_wWidth * percentage) / 100;
            var remainingWidth = _wWidth - containerWidth;

            setSession('width', $(".app-responsive-center-container").css("width", containerWidth));
            setSession('margin-right', $(".app-responsive-center-container").css("margin-right", 0));
            setSession('margin-left', $(".app-responsive-center-container").css("margin-left", 0));
            setSession('margin', $(".app-responsive-center-container").css("margin", '0 auto'));

            $("#AppThemeZoomable").css(getSession("width"));
            $("#AppThemeZoomable").css(getSession("margin-right"));
            $("#AppThemeZoomable").css(getSession("margin-left"));
            $("#AppThemeZoomable").css(getSession("margin"));
        }
        else if (dataSwitch == "Mobile View") {
            _wWidth = 420;
            percentage = 99;
            var containerWidth = (_wWidth * percentage) / 100;
            var remainingWidth = _wWidth - containerWidth;

            setSession('width', $(".app-responsive-center-container").css("width", containerWidth));
            setSession('margin-right', $(".app-responsive-center-container").css("margin-right", 0));
            setSession('margin-left', $(".app-responsive-center-container").css("margin-left", 0));
            setSession('margin', $(".app-responsive-center-container").css("margin", '0 auto'));

            $("#AppThemeZoomable").css(getSession("width"));
            $("#AppThemeZoomable").css(getSession("margin-right"));
            $("#AppThemeZoomable").css(getSession("margin-left"));
            $("#AppThemeZoomable").css(getSession("margin"));
        }
        else if (dataSwitch == "Reset") {
            _wWidth = 1920;
            percentage = 87;
            var containerWidth = (_wWidth * percentage) / 100;
            var remainingWidth = _wWidth - containerWidth;

            setSession('width', $(".app-responsive-center-container").css("width", containerWidth));
            setSession('margin-right', $(".app-responsive-center-container").css("margin-right", 0));
            setSession('margin-left', $(".app-responsive-center-container").css("margin-left", 0));
            setSession('margin', $(".app-responsive-center-container").css("margin", '0 auto'));

            $("#AppThemeZoomable").css(getSession("width"));
            $("#AppThemeZoomable").css(getSession("margin-right"));
            $("#AppThemeZoomable").css(getSession("margin-left"));
            $("#AppThemeZoomable").css(getSession("margin"));

        }
        if ($("#Ulzoomlist li a").parent('li').hasClass('active') == true) {
            $("#Ulzoomlist li a").parent('li').removeClass();
        }
        else {
            $(this).parent('li').addClass('active');
        }




    });

    //FullScreenMode
    $("#FullScreenMode").on('click', function () {
        if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {  // current working methods
            if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen();
            } else if (document.documentElement.msRequestFullscreen) {
                document.documentElement.msRequestFullscreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullscreen) {
                document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }
    });

    //ZoomOut
    var zoom
    $("#ZoomLevelIncr").on('click', function () {
        updateZoom(0.1);
    });

    //Zoomin
    $("#ZoomLevelDecr").on('click', function () {
        updateZoom(-0.1);
    });

    $("#ResetAllScreenMode").on('click', function () {

        $("#FullScreenMode").attr("disabled", "disabled").off('click');
        $("#ZoomLevelIncr").attr("disabled", "disabled").off('click');
        $("#ZoomLevelDecr").attr("disabled", "disabled").off('click');

    });

    //MaxScreen
    $("#MaxScreen").on('click', function () {

        var containerWidth = 1400;
        setSession('width', $(".app-responsive-center-container").css("width", containerWidth));
        setSession('transform', $(".app-responsive-center-container").css("transform", 'scale(1.3)'));
        setSession('margin', $(".app-responsive-center-container").css("margin", '0 auto'));
        setSession('margin-top', $(".app-responsive-center-container").css("margin-top", 143));

        $("#AppThemeZoomable").css(getSession("width"));
        $("#AppThemeZoomable").css(getSession("transform"));
        $("#AppThemeZoomable").css(getSession("margin-top"));
        $("#AppThemeZoomable").css(getSession("margin"));

    });

    //Medium screen
    $("#MedScreen").on('click', function () {

        var containerWidth = 1200;
        setSession('width', $(".app-responsive-center-container").css("width", containerWidth));
        setSession('transform', $(".app-responsive-center-container").css("transform", 'scale(0.75)'));
        setSession('margin', $(".app-responsive-center-container").css("margin", '0 auto'));
        setSession('margin-top', $(".app-responsive-center-container").css("margin-top", -120));

        $("#AppThemeZoomable").css(getSession("width"));
        $("#AppThemeZoomable").css(getSession("transform"));
        $("#AppThemeZoomable").css(getSession("margin-top"));
        $("#AppThemeZoomable").css(getSession("margin"));

    });
    //SmallScreen
    $("#SmallScreen").on('click', function () {

        var containerWidth = 780;
        setSession('width', $(".app-responsive-center-container").css("width", containerWidth));
        setSession('transform', $(".app-responsive-center-container").css("transform", 'scale(0.50)'));
        setSession('margin', $(".app-responsive-center-container").css("margin", '0 auto'));
        setSession('margin-top', $(".app-responsive-center-container").css("margin-top", -240));

        $("#AppThemeZoomable").css(getSession("width"));
        $("#AppThemeZoomable").css(getSession("transform"));
        $("#AppThemeZoomable").css(getSession("margin-top"));
        $("#AppThemeZoomable").css(getSession("margin"));

    });
    //VerySmallScreen
    $("#VerySmallScreen").on('click', function () {

        var containerWidth = 400;
        setSession('width', $(".app-responsive-center-container").css("width", containerWidth));
        setSession('transform', $(".app-responsive-center-container").css("transform", 'scale(0.50)'));
        setSession('margin', $(".app-responsive-center-container").css("margin", '0 auto'));
        setSession('margin-top', $(".app-responsive-center-container").css("margin-top", -275));

        $("#AppThemeZoomable").css(getSession("width"));
        $("#AppThemeZoomable").css(getSession("transform"));
        $("#AppThemeZoomable").css(getSession("margin-top"));
        $("#AppThemeZoomable").css(getSession("margin"));

    });

    //ScreenRatioReset
    $("#ScreenRatioReset").on('click', function () {
        location.reload();

    });
});

zoomLevel = 1;
var updateZoom = function (zoom) {
    zoomLevel += zoom;
    $('body').css({ zoom: zoomLevel, '-moz-transform': 'scale(' + zoomLevel + ')' });
}