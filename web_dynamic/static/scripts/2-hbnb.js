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
    myList = [];
  });
   /**
     * Task 3:
     * Request http://0.0.0.0:5001/api/v1/status/:
     * - If in the status is “OK”, add the class available to the DIV#api_status
     * - Otherwise, remove the class available to the DIV#api_status
     * **/
   let api_status = $('DIV#api_status');
    $.ajax("http://0.0.0.0:5001/api/v1/status/").done(function(data){
        if(data.status === "OK"){
            api_status.addClass("available");
        }
        else{
            api_status.removeClass("available");
        }

    });
});
