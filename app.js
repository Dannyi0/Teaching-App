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

  //Get elements
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogout = document.getElementById('btnLogout');

  //Add login event
  btnLogin.addEventListener('click', e => {
      console.log('Log in attempted.');
      const email = txtEmail.value;
      const pass = txtPassword.value;
      const auth = firebase.auth();
      //Sign in
      auth.signInWithEmailAndPassword(email,pass);
      //promise.catch(e => console.log(e.message));
  });

    /*Add signup event
    btnSignUp.addEventListener('click', e => {
        const email = txtEmail.value;
        const pass = txtPassword.value;
        const auth = firebase.auth();
        //Sign in
        auth.createUserWithEmailAndPassword(email,pass);
        promise.catch(e => console.log(e.message));
    });
    */

    //AuthChanged listener
    firebase.auth().onAuthStateChanged(firebaseUser=> {
        if(firebaseUser.email == txtEmail.value){
            console.log(firebaseUser);
            window.location.href='room.html';
        }else{
            console.log('Failed to log in');
        }
    });
//});
