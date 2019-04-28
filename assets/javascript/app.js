//alert("connected");
var key;
$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAsxcGFOcssR8EFToPj0uFrbx3X9L7luVU",
    authDomain: "train-scheduler-14c50.firebaseapp.com",
    databaseURL: "https://train-scheduler-14c50.firebaseio.com",
    projectId: "train-scheduler-14c50",
    storageBucket: "train-scheduler-14c50.appspot.com",
    messagingSenderId: "754066708462"
  };

  firebase.initializeApp(config);

  var database = firebase.database();


  //. Button for adding Trains
  $("#submit").on("click", (event) => {
    event.preventDefault();


    // Grabs user inputs
    var trainName = $("#name").val().trim();
    // console.log(trainName);
    var trainDest = $("#dest").val().trim();
    // console.log(destination);
    var firstTrain = $("#train-time").val().trim();
    // console.log(firstTime);
    var trainFreq = $("#freq").val().trim();
    // console.log(freq);
    // Creates local "temporary" object for holding train data
    var newTrain = {
      name: trainName,
      dest: trainDest,
      first: firstTrain,
      freq: trainFreq,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    };
    // Uploads trains data to the database
    database.ref().push(newTrain);

    alert("Train successfully added");
    //Clears form
   // $("form").reset();
  });
  //Create Firebase  event adding train to the database and a a row in the html where use adds an entry
  database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());

    var nextArr;
    var minAway;

    // Store everything in a variable
    var trainName = childSnapshot.val().name;
    var trainDest = childSnapshot.val().dest;
    var firstTrain = childSnapshot.val().first;
    var trainFreq = childSnapshot.val().freq;
    

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTrainNew = moment(childSnapshot.val().first, "hh:mm").subtract(1, "years");
    console.log(firstTrainNew);
    // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    // console.log(firstTimeConverted);

     // Current Time
    var currentTime = moment();

    console.log("CURRENT TIME: " + moment(currentTime).format("hh.mm:"));
    //   console.log("CURRENT TIME: " + moment(date));

    // Difference between the times(current and firstTrain)
    var diffTime = moment().diff(moment(firstTrainNew), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);
    

    // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    var tRemainder = diffTime % childSnapshot.val().freq;
    // console.log(tRemainder);



    // Minute Until next Train - minutes away
      var minAway = childSnapshot.val().freq - tRemainder;
       console.log("MINUTES TILL TRAIN: " + minAway);

    // Next Train
     var nextTrain = moment(currentTime).add(minAway, "minutes");
    
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Append new row
      var newRow = $("<tr>").append(
        $("<td>").text(name),
        $("<td>").text(trainDest),
        $("<td>").text(trainFreq),
        $("<td class='nextTr'>").text(nextTrain),               
         $("<td>").text(minAway),
        $("<td>").html("<span class='remove'> X </span>"));

    
  $(".remove").on('click', function(e) {
    //stoping bubling up
    e.stopPropagation();
    $(this).parent().parent().remove();
    // childSnapshot.val().remove();

      });

  //Append the new row to the table
    $("#trainTable").append(newRow);

 //Delete rows
  $(".delete").on("click", function (event) {
   var r = confirm("Are you sure you want to Remove this train info from the database?");
   if (r == true) {
     key= $(this).attr("data-key");
     console.log(key);
     database.ref().child(key).remove();
     window.location.reload();
   } else {
      
   }
  
});

     // Clears all of the text-boxes
      $("#name").val("");
      $("#dest").val("");
      $("#train-time").val("");
      $("#freq").val("");
      $("#minAway").val("");
  
  });
});





$("body").css("background-image", 'url(assets/images/Amtrak-California.jpg');
function updateClock() {

  var clock = moment().format("MM/DD/YY hh:mm:ss a");

  $(".date-time").html(clock);

  // Get current time in seconds
  var currentTimeSec = moment();
  console.log("Current Time in seconds:" + moment(currentTimeSec).format("ss"));
  if (moment(currentTimeSec).format("ss") == 00) {
    // When current seconds=00
    location.reload();
  }
};