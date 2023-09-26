window.onload = function () {
    const dict = {}
    $('input[type="checkbox"]').change(function () {
        if (this.checked) {
            dict[$(this).attr('data-id')] = $(this).attr('data-name')

        } else {
            delete (dict[$(this).attr('data-id')])
        }
        let text = ""
        let comma = ""
        for (key in dict) {
            text += comma + dict[key]
            comma = ", "
            if (text.length >= 20) {
                text = text.substring(0, 20) + "..."
            }
        }
        $('.amenities h4').html(text)
    })
};