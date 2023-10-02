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

    $.ajax({
        url: "http://localhost:5001/api/v1/places_search/",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({}),
        success: function (data) {
            for (place in data) {
                create_article(data[place]);
            }
        }
    });
};


function create_article(place) {
    let article = document.createElement("article")

    let div_title = create_div("title_box")
    let h2_title = document.createElement("h2")
    h2_title.textContent = place.name
    div_title.appendChild(h2_title)

    let div_price = create_div("price_by_night")
    div_price.textContent = "$" + place.price_by_night
    div_title.appendChild(div_price)
    article.appendChild(div_title)

    let div_information = create_div("information")

    let div_guests = create_div("max_guest")
    if (place.max_guest != 1) { div_guests.textContent = place.max_guest + " Guests" }
    else { div_guests.textContent = place.max_guest + " Guest" }
    div_information.appendChild(div_guests)

    let div_room = create_div("number_rooms")
    if (place.number_rooms != 1) { div_room.textContent = place.number_rooms + " Bedrooms" }
    else { div_room.textContent = place.number_rooms + " Bedroom" }
    div_information.appendChild(div_room)

    let div_bathroom = create_div("number_bathrooms")
    if (place.number_bathrooms != 1) { div_bathroom.textContent = place.number_bathrooms + " Bathroom" }
    else { div_bathroom.textContent = place.number_bathrooms + " Bathroom" }
    div_information.appendChild(div_bathroom)
    article.appendChild(div_information)


    let div_description = create_div("description")
    div_description.textContent = place.description
    article.appendChild(div_description)

    document.querySelector("section.places").appendChild(article)
}

function create_div(classname) {
    let div = document.createElement("div")
    div.className = classname;
    return div;
}
