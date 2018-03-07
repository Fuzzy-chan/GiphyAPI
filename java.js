var topics = ["Board Games", "Tabletop RPGS", "Final Fantasy"];
var switcher=true;
makeButtons();


//makes the buttons dynamically in the indicated CSS space
function makeButtons(){
    //clears space so buttons are not repeated
    $(".buttonsHere").empty()
    //for Each that spawns buttons with a class and a value equal to the variable in array
    topics.forEach(function(input){
        var buttonsGen = $("<button class='btn btn-primary buttons' value='"+input+"'>");
          buttonsGen.text(input);
          buttonsGen.appendTo($(".buttonsHere"));

    });
}

// Create new topics from user input
$("#addTopic").on("click", function(event) {
    event.preventDefault();
    // takes the input and add the string to original array
    var userText = $("#topicInput").val().trim();
    topics.push(userText)
    //make dah buttons!
    makeButtons();
  });

//spawns gifs when puttons are clicked
  $(document).on("click", ".buttons", function(event){
      var value = $(this).val();
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      value + "&api_key=qprdmkg09kiu5ut6jYKzAUeNksFXKeRE&limit=10";
        console.log(queryURL)
      $.ajax({
          url: queryURL,
          method: "GET"
      })
      .then(function(response){

          var results = response.data
          console.log(results)

          for (var i = 0; i < results.length; i++){

              var gifDiv = $("<div class='giphy'>")

              var p = $("<p>Rating: "+results[i].rating+"</p>")

              var imageUrl = results[i].images.original_still.url;
              

              var gifImage = $("<img class='gifImage' src='"+imageUrl+"' data-animate='"+results[i].images.original.url+"' data-still='"+results[i].images.original_still.url+"'>");

              gifDiv.prepend(p, gifImage);
              $(".giphyHere").prepend(gifDiv);

          };
          
            
      });

  });

  //turns gif on and off
  $(document).on("click", ".gifImage", function(event){
    console.log(this)
  if (switcher === true ) {
      $(this).attr("src", $(this).attr("data-animate"))
      switcher = false;
  }
  else{
    $(this).attr("src", $(this).attr("data-still"))
    switcher = true;
  }

  });