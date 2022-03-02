$(document).ready(function() {
  //NO ARROW FUNCTIONS USING THIS

  // $('#tweet-text').keypress(() => {

  // })
  
  
  $("#tweet-text").on('keyup', function(){
    let tweetLength = $('#tweet-text').val().length;
    let outputLength = 140 - tweetLength;

    if (outputLength < 0) {
      $('#tweet-text').css("color", "red");
      $('#counterID').css("color", "red");
    }
    if (outputLength > 0) {
      $('#counterID').css("color", "black");
      $('#tweet-text').css("color", "black");
    }

    $('#counterID').val(outputLength);

     //Use CSS to change color??
    // if (outputLength < 0) {
    //   $('#tweet-text').addClass(".red");
    //   $('#counterID').addClass(".red");
    // }
    // if (outputLength > 0) {
    //   $('#counterID').addClass(".black");
    //   $('#tweet-text').addClass(".black");
    // }
     //This key word logs the element that .on('keypress') is pressing on
  });

  //console.log($tweetLength - 144);
  // if ($tweetLength) {
  //   //begin negative numbers
  //   console.log("whoa, too many characters!")
  // }

});