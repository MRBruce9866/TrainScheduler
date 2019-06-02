$(document).ready(function(){

    //onClick event listener for the submit button (Add Train Form)
    $("#submitTrainBtn").on("click", function(event){
        event.preventDefault();

        
        addTrainToDatabase();
        

    })

});


// Setup firebase config and intialize
var firebaseConfig = {
    apiKey: "AIzaSyBpMWAhZ2n_JKc2kqMjT1RWLemM5ZSQqYs",
    authDomain: "traintime-cc054.firebaseapp.com",
    databaseURL: "https://traintime-cc054.firebaseio.com",
    projectId: "traintime-cc054",
    storageBucket: "traintime-cc054.appspot.com",
    messagingSenderId: "78509455555",
    appId: "1:78509455555:web:58cd6486cbf391fb"
  };

// Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  var database = firebase.database();

//Update Display
database.ref().on("child_added", function(snapshot){

    var sv = snapshot.val();

    var trainName = sv.trainName;
    var destination = sv.destination;
    var startTime = moment(sv.startTime, "HH:mm");
    var frequency = parseInt(sv.frequency);
    
    var nextArrival = getNextArrival(startTime, frequency);
    var minutesAway = getMinutesAway(nextArrival);

    var row = $("<tr>");
    var trainNameHTML = $("<td>").text(trainName);
    var destinationHTML = $("<td>").text(destination);
    var frequencyHTML = $("<td>").text(frequency);
    var nextArrivalHTML = $("<td>").text(nextArrival.format("HH:mm"));
    var minutesAwayHTML = $("<td>").text(minutesAway);

    row.append(trainNameHTML, destinationHTML, frequencyHTML, nextArrivalHTML, minutesAwayHTML);

    $("#tableBody").append(row);    
})

// check if inputs meet the required format
function areInputsValid(){
    return true;
}

function addTrainToDatabase(){

    if(!areInputsValid()) return;

    var trainName = $("#tNameInput").val().trim();
    var destination = $("#tDestinationInput").val().trim();
    var startTime = $("#tTimeInput").val().trim();
    var frequency = $("#tFrequencyInput").val().trim();


    database.ref().push({
        trainName: trainName,
        destination: destination,
        startTime: startTime,
        frequency: frequency
    });
}

function getNextArrival(startTime, frequency){

    var minutesSinceStartTime = moment().diff(startTime, "minutes");
    var nextTrainStopInterval = Math.floor(minutesSinceStartTime / frequency) + 1;
    var nextTimeInMinutes = nextTrainStopInterval * frequency;

    var nextArrival = moment(startTime).add(nextTimeInMinutes, "minutes");
    return nextArrival;
}

function getMinutesAway(nextArrival){

    return nextArrival.diff(moment(), "minutes")

}
