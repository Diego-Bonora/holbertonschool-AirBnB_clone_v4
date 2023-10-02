window.onload = function () {
    const dict = {}
    $('input[type="checkbox"]').change(function () {
        if (this.checked) {
            dict[$(this).attr('data-id')] = $(this).attr('data-name')

        } else {
            delete (dict[$(this).attr('data-id')])
        }

        let text = Object.values(dict).join(", ")
        if (text.length >= 20) {
            text = text.substring(0, 20) + "..."
        }
        text += "&nbsp;"
        $('.amenities h4').html(text)
    })
    $.ajax({
        url: "http://localhost:5001/api/v1/status/",
        type: "GET",
        statusCode: {
            200: function (response) {
                $("#api_status").addClass("available")
            }
        },
    });
};