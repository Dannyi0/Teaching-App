  //(function() {
  
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBnsWtr9YU5afQxxNhcqVL-NiXWD3-aYi0",
    authDomain: "teaching-app-1.firebaseapp.com",
    databaseURL: "https://teaching-app-1.firebaseio.com",
    projectId: "teaching-app-1",
    storageBucket: "teaching-app-1.appspot.com",
    messagingSenderId: "690061668715"
  };
  firebase.initializeApp(config);

  //Firebase user vars
  var currentUser;