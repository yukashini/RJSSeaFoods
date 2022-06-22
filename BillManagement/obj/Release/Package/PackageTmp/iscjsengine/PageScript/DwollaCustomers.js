//Global Variables
{

}

//Load and Events
{
    $(document).ready(function () {
        BindDcustomersScreen();
    });
}

//Dom Manipulation
{
    var BindDcustomersScreen = function () {
        var dCustomers = GetDCustomersList();
        BindDCustomerList(dCustomers);
    }

    var BindDCustomerList = function (customerList) {
        var html = '';
        var $el = $('#tbl-customers-Body');
        if (customerList != null) {
            if (customerList._embedded.customers != null && customerList._embedded.customers != undefined && customerList._embedded.customers.length > 0) {
                var customers = customerList._embedded.customers;
                $.each(customers, function (index, item) {
                    html += '<tr>';
                    html += '<td>' + (item["businessName"] == null ? '' : item["businessName"]) + '</td>';
                    html += '<td>' + (item["email"] == null ? '' : item["email"]) + '</td >';
                    html += '<td>' + (item["status"] == null ? '' : item["status"]) + ' / ' + (item["type"] == null ? '' : item["type"]) + '</td>';
                    html += '<td>' + (item["created"] == null ? '' : (moment(item["created"]).format("MM/DD/YYYY"))) + '</td>';
                    html += '</tr>';
                });
            }
            else {
                html += '<tr><td colspan="4" style="text-align:center;">No Data Found<td></tr>';
            }
        }
        else {
            html += '<tr><td colspan="4" style="text-align:center;">No Data Found<td></tr>';
        }
        $el.html(html);

    }
}

//Data Manipulation
{
    var GetDCustomersList = function () {
        var _obj = {

        };
        var tempList = {};
        $.when(RequestServer("DwollaCustomersList.aspx/GetDCustomers", _obj)).done(function (response) {
            tempList = $.parseJSON(response);
        });
        return tempList;
    }
}

//Common
{

}