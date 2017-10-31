// Check for the various File API support.
if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}

var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
person + "&api_key=dc6zaTOxFJmzC&limit=10";

$(document).ready(function(){
    $.ajax({
        url: "assets/DKSalaries.csv",
        success: function (csvd) {
            data = $.csv.toArrays(csvd);
        },
        dataType: "text",
    })
    .done(function(response){
        console.log(response);
    });
})

// console.log(data);