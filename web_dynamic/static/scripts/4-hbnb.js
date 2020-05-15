const $ = window.$;
$(document).ready(function () {
  /**
   * Task 2:
   * Listen for changes on each INPUT checkbox tag:
   * - if the checkbox is checked, you must store the Amenity ID in a variable (dictionary or list)
   * - if the checkbox is unchecked, you must remove the Amenity ID from the variable
   * - update the H4 tag inside the DIV Amenities with the list of Amenities checked
   * **/
  const myAmenities = {};
  let myList = [];
  const checkbox = $('.amenities input[type="checkbox"]');
  checkbox.prop('checked', false);
  checkbox.change(function () {
    myList = [];
    const dataId = $(this).attr('data-id');
    const dataName = $(this).attr('data-name');
    if (this.checked) {
      myAmenities[dataId] = dataName;
    } else {
      delete (myAmenities[dataId]);
    }
    for (const key in myAmenities) {
      myList.push(myAmenities[key]);
    }
    const output = myList.join(', ');
    $('div.amenities > h4').text(output);
  });
  /**
     * Task 3:
     * Request http://0.0.0.0:5001/api/v1/status/:
     * - If in the status is “OK”, add the class available to the DIV#api_status
     * - Otherwise, remove the class available to the DIV#api_status
     * **/
  const apiStatus = $('DIV#api_status');
  $.ajax('http://0.0.0.0:5001/api/v1/status/').done(function (data) {
    if (data.status === 'OK') {
      apiStatus.addClass('available');
    } else {
      apiStatus.removeClass('available');
    }
  });
  /**
   * Task 4:
   * Request http://0.0.0.0:5001/api/v1/places_search/:
   * - Description of this endpoint here. If this endpoint is not available, you will have to add it to the API (you can work all together for creating this endpoint)
   * - Send a POST request with Content-Type: application/json and an empty dictionary in the body - cURL version: curl "http://0.0.0.0:5001/api/v1/places_search" -XPOST -H "Content-Type: application/json" -d '{}'
   * - Loop into the result of the request and create an ARTICLE tag representing a Place in the SECTION.places. (you can remove the Owner tag in the place description)
   */
  function search (theAmenities) {
    let datas = {};
    if (theAmenities != null) { datas = { amenities: theAmenities }; }
    const placesSearch = $.ajax({
      url: 'http://0.0.0.0:5001/api/v1/places_search/',
      dataType: 'json',
      contentType: 'application/json',
      method: 'POST',
      data: JSON.stringify(datas)
    });
    placesSearch.done(function (data) {
      for (let i = 0; i < data.length; i++) {
      /** Prepare data **/
        const placeName = data[i].name;
        const priceByNight = data[i].price_by_night;
        const maxGuest = data[i].max_guest;
        const maxRooms = data[i].number_rooms;
        const maxBathrooms = data[i].number_bathrooms;
        const desc = data[i].description;
        /** Prepare HTML **/
        const article = $('<article></article>');
        const titleBox = $("<div class='title_box'><h2></h2><div class='price_by_night'></div></div>");
        titleBox.find('> h2').html(placeName);
        titleBox.find('.price_by_night').html('$' + priceByNight);
        article.append(titleBox);
        const information = $("<div class='information'></div>");
        let guestString = ' Guest';
        if (maxGuest > 1) { guestString = ' Guests'; }
        const guest = $("<div class='max_guest'></div>").html(maxGuest + guestString);
        information.append(guest);
        let roomString = ' Bedroom';
        if (maxRooms > 1) { roomString = ' Bedrooms'; }
        const rooms = $("<div class='number_rooms'></div>").html(maxRooms + roomString);
        information.append(rooms);
        let bathString = ' Bathroom';
        if (maxBathrooms > 1) { bathString = ' Bathrooms'; }
        const bathrooms = $("<div class='number_bathrooms'></div>").html(maxBathrooms + bathString);
        information.append(bathrooms);
        article.append(information);
        const description = $("<div class='description'></div>").html(desc);
        article.append(description);
        $('SECTION.places').append(article);
      }
    });
  }
  search();

  /**
   * Task 5:
   * When the BUTTON tag is clicked, a new POST request to places_search should be made with the list of Amenities checked
   */
  $('.filters > button').click(function () {
    $('SECTION.places').empty();
    search(myAmenities);
  });
});
