//Service URL
{
   
}

//AJAX CALLS
{

    var RequestServer = function (serviceMethod, formData) {
        var _data = null;
        $.ajax({
            
            async: false,
            type: "POST",
            url:serviceMethod,
            data: JSON.stringify(formData),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                _data = response.d;
            },
            failure: function (msg) {
                // alert(msg.d);
            },
            error: function (xhr, testStatus, error) {
                var a = 1;
            },
            beforeSend: function () {

            },
            complete: function () {

            }
            
        });
         return _data;
    }


        
}