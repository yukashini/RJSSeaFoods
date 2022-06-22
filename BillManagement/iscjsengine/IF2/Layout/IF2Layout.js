
function drawPageHeader() {
    var headerHtml = '';
    headerHtml = '<div class="page-header navbar navbar-fixed-top">'
    + '<div class="page-header-inner">'
    + '<div class="page-logo">'
+ '<div class="menu-toggler sidebar-toggler hide"></div>'
+ '</div>'
+ '<div class="menu-toggler responsive-toggler" data-toggle="collapse" data-target=".navbar-collapse">'
    + '</div>'
    + '<div class="top-menu">'
+ '<ul class="nav navbar-nav pull-right">'
+ '<li class="dropdown dropdown-user"><a href="#" class="dropdown-toggle" data-toggle="dropdown" data-hover="dropdown" data-close-others="true">'
+ '<img alt="" class="img-circle" src="img/USerOG29x29.png" />'
+ '<span class="username" id="logeduser"></span><i class="fa fa-angle-down"></i></a>'
+ '<ul class="dropdown-menu">'
+ '<li><a href="Login.htm"><i class="fa fa-key"></i>Log Out </a></li>'
+ ' </ul>'
+ '</li>'
+ ' </ul>'
+ '</div>'
+ '</div>'
+ '</div>'
+ '<div class="page-container" id="masterpageContainer">'
+ '</div>';
    $('body').append(headerHtml);
}


function drawSideBar() {

    var headerHtml = '';
    headerHtml = '<div class="page-sidebar-wrapper">'
    + '<div class="page-sidebar navbar-collapse collapse">'


+ '<ul id="am_ul_menu" class="page-sidebar-menu select-menu-nav-s1" data-auto-scroll="false" data-auto-speed="200">'

+ '<li class="sidebar-toggler-wrapper"><div class="sidebar-toggler"></div></li>'
+ '<li class="sidebar-search-wrapper hidden-xs"></li>'

+ '</ul>'

+ '</div>'
+ '</div>';

    $('#masterpageContainer').append(headerHtml);
}


function drawPageContent() {

    var headerHtml = '';

    headerHtml = '<div class="page-content-wrapper">'
    + '<div class="page-content">'
    + ' <input type="hidden" id="hfUser" />'
+ '<input type="hidden" id="hfuser_test" />'
+ '<iframe class="t22-iframe-fieldset" id="IframeScreen" scrolling="yes" src="Project.htm">'
+ ' </iframe>'
+ '</div>'
    + '</div>';

    $('#masterpageContainer').append(headerHtml);
}

function drawFooter() {

    var headerHtml = '<div class="page-footer">'
  + '<div class="page-footer-inner"> 2014 &copy; Meeeting</div>'
   + '<div class="page-footer-tools"><span class="go-top"><i class="fa fa-angle-up"></i></span></div>'
   + '<div>'
   + '</div>';
+'</div>';
    $('body').append(headerHtml);
}