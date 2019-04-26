//alert("connected");
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
    //  key = childSnapshot.key;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTrainNew = moment(childSnapshot.val().first, "hh:mm").subtract(1, "years");
    console.log(firstTrainNew);

     // Current Time
    var currentTime = moment();

    console.log("CURRENT TIME: " + moment(currentTime).format("hh.mm:"));
    //   console.log("CURRENT TIME: " + moment(date));

    // Difference between the times(current and firstTrain)
    var diffTime = moment(currentTime).diff(moment(firstTrainNew), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    // var tRemainder = diffTime % tFrequency;
    var tRemainder = diffTime % childSnapshot.val().freq;
    // console.log(tRemainder);



    // Minute Until next Train - minutes away
      var minAway = childSnapshot.val().freq - tRemainder;
       console.log("MINUTES TILL TRAIN: " + minAway);

    // Next Train
     var nextTrain = moment(nextTrain).add(minAway, "minutes");
        nextTrain = moment(nextTrain).format("hh:mm");
     console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Append new row
    //  var newRow = $("<tr>").append(
    //    $("<td>").text(name),
    //    $("<td>").text(dest),
    //    $("<td>").text(frequency),
    //    $("<td>").text(nextTrain),
    //    $("<td>").text(minAway)

    var newRow = $("<tr>");
    newRow.append($("<td>" + childSnapshot.val().name + "</td>"));
    newRow.append($("<td>" + childSnapshot.val().dest + "</td>"));
    newRow.append($("<td class='text-center'>" + childSnapshot.val().freq + "</td>"));
    newRow.append($("<td class='text-center'>" + nextTrain + "</td>"));
    newRow.append($("<td class='text-center'>" + minAway + "</td>"));
    // newRow.append($("<td class='text-center'><button class='delete btn btn-danger btn-xs' data-key='" + key + "'>X</button></td>"));
//Append the new row to the table
    $("#trainTable").append(newRow);

 //Delete rows
 $(".delete").on("click", function (event) {
  var r = confirm("Are you sure you want to Remove this train info from the database?");
  if (r == true) {
    keyref = $(this).attr("data-key");
    console.log(keyref);
    database.ref().child(keyref).remove();
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
  

    // 
    //   //Train info
    //   console.log(trainName);
    //   console.log(destination);
    //   console.log(frequency);
    //   console.log(nextTrain);
    //   console.log(tMinutesTillTrain);

    //  

    //   );
    //   
  });
});




$("body").css("background-image", 'url(assets/images/Amtrak-California.jpg');
function updateClock() {

  var clock = moment().format("MM/DD/YY h:mm:ss a");

  $(".date-time").html(clock);

  // Get current time in seconds
  var currentTimeSec = moment();
  console.log("Current Time in seconds:" + moment(currentTimeSec).format("ss"));
  if (moment(currentTimeSec).format("ss") == 00) {
    // When current seconds=00
    location.reload();
  }
};