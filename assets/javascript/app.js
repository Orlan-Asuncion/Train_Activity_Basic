//alert("connected");
$(document).ready(function(){
    
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
 $("#submit").on("click",  (event) => {
   event.preventDefault();


   // Grabs user inputs
   var trainName = $("#name").val().trim();
   // console.log(trainName);
   var destination = $("#dest").val().trim();
   // console.log(destination);
   var freq = $("#freq").val().trim();
   // console.log(freq);

   var firstTime = $("#train-time").val().trim();
   // console.log(firstTime);
   // First Time (pushed back 1 year to make sure it comes before current time)
   var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");;
   // console.log(firstTimeConverted);

   // Current Time
   var currentTime = moment();
 
    console.log("CURRENT TIME: " + moment(date).format("hh.mm:ss"));
    console.log("CURRENT TIME: " + moment(date));

   // Difference between the times
   var diffTime = currentTime.diff(moment(firstTimeConverted), "minutes");

   // Time apart (remainder)
   var tRemainder = diffTime % freq;
   // console.log(tRemainder);



   // Minute Until Train - minutes away
   var tMinutesTillTrain = freq - tRemainder;
   // console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

   // Next Train
   var nextTrainMin = moment().add(tMinutesTillTrain, "minutes");
   var nextTrain = moment(nextTrainMin).format("hh:mm")
   // console.log("ARRIVAL TIME: " + nextTrain);


   // Creates local "temporary" object for holding employee data
   var newTrain = {
     name: trainName,
     dest: destination,
     freq: frequency,
     train: nextTrain,
     tMinutesTillTrain: tMinutesTillTrain
   };

   // Uploads trains data to the database
   database.ref().push(newTrain);
  // logs evertything to console
  console.log(newTrain.name);
  console.log(newTrain.dest);
  console.log(newTrain.freq);
  console.log(newTrain.train);


   //alert("Train successfully added");

   // Clears all of the text-boxes
   $("#new-train").val("");
   $("#dest").val("");
   $("#train-time").val("");
   $("#freq").val("");

 });

 //Create Firebase  event adding train to the database and a a row in the html where use adds an entry
 database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());
// Store everything in a variable
 var trainName = ChildSnapshot.val().name;
 var destination = ChildSnapshot.val().dest;
 var frequency = ChildSnapshot.val().freq;
 var nextTrain = ChildSnapshot.val().train;

 //Train info
 console.log(trainName);
 console.log(destination);
 console.log(frequency);
 console.log(destination);

 // create new row
  var newRow = ("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(frequency),
    $("<td>").text(nextTrain)
  
  );
  //Append the new row to the table
  $("# >tbody").append(newRow);
 });








});  
  



$("body").css("background-image",'url(assets/images/Amtrak-California.jpg');
