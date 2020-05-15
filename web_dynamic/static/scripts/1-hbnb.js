const $ = window.$
$(document).ready(function(){
    let myAmenities = {};
    let myList = [];
    const checkbox = $('input[type="checkbox"]');
    checkbox.prop('checked', false);
    checkbox.change(function(){
        let dataId = $(this).attr('data-id');
        let dataName = $(this).attr('data-name');
        if (this.checked){
            myAmenities[dataId] = dataName;
        }
        else{
            delete(myAmenities[dataId]);
        }
        for (let key in myAmenities) {
            myList.push(myAmenities[key]); }
        const output = myList.join(', ');
        $('div.amenities > h4').text(output);
        myList = [];
    });
});