 document.getElementById("btnLogin").addEventListener("click", function() {
      // alert("Logging in to " + roomID + " as "+ username);
      var roomID = document.getElementById("txtRoom").value;
      var username = document.getElementById("txtUser").value;
      sessionStorage.setItem("roomID", roomID);
      sessionStorage.setItem("username", username);
      window.alert("Logging in to " + roomID + " as "+ username);
      window.location = "/room.html";
      //alert("Logging in...");
 });