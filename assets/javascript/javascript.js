$(document).ready(function(){

    //onClick event listener for the submit button (Add Train Form)
    $("#submitTrainBtn").on("click", function(event){
        event.preventDefault();

        if(areInputsValid()){
            addTrainToDatabase();
        }

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
    
})

// check if inputs meet the required format
function areInputsValid(){
    return true;
}

function addTrainToDatabase(train){
    
}
