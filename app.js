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
      const promise = auth.signInWithEmailAndPassword(email,pass);
      promise
        .catch(e => console.log(e.message));
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
        if(firebaseUser.pass == txtPassword.value){
            console.log(firebaseUser);
            currentUser = firebaseUser;
            window.location.href='room.html';
            window.localStorage.clear();
        }else{
            console.log('Failed to log in');
        }
    });
//});
