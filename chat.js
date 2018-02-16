//==============================================================================
// VARIABLES
//==============================================================================
var orbiter;
var chatRoom;
//==================
// Input Vars
//==================
var roomID;
var username;
//==============================================================================
// INITIALIZATION
//==============================================================================
function init () {
  roomID = sessionStorage.getItem("roomID");
  username = sessionStorage.getItem("username");
  alert("Logging in to " + roomID + " as "+ username);
  if(roomID != null && username != null){
  // Create the Orbiter instance, used to connect to and communicate with Union,
  // then enable automatic reconnection (one attempt every 15 seconds)
  orbiter = new net.user1.orbiter.Orbiter();
  orbiter.getConnectionMonitor().setAutoReconnectFrequency(15000);
  orbiter.getLog().setLevel(net.user1.logger.Logger.DEBUG);
    
  // If required JavaScript capabilities are missing, abort
  if (!orbiter.getSystem().isJavaScriptCompatible()) {
    displayChatMessage("Your browser is not supported.");
    return;
  }
  
  // Register for Orbiter's connection events
  orbiter.addEventListener(net.user1.orbiter.OrbiterEvent.READY, readyListener, this);
  orbiter.addEventListener(net.user1.orbiter.OrbiterEvent.CLOSE, closeListener, this);
  
  displayChatMessage("Connecting to Union...");

  // Connect to Union Server
  orbiter.connect("tryunion.com", 80);
  }
}

//==============================================================================
// ORBITER EVENT LISTENERS
//==============================================================================
// Triggered when the connection is ready
function readyListener (e) {
  displayChatMessage("Connected.");
  displayChatMessage("Joining chat room...");
  
  // Create the chat room on the server
  chatRoom = orbiter.getRoomManager().createRoom(roomID);
  chatRoom.addEventListener(net.user1.orbiter.RoomEvent.JOIN, joinRoomListener);
  chatRoom.addEventListener(net.user1.orbiter.RoomEvent.ADD_OCCUPANT, addOccupantListener);
  chatRoom.addEventListener(net.user1.orbiter.RoomEvent.REMOVE_OCCUPANT, removeOccupantListener);  
  
  // Listen for chat messages
  chatRoom.addMessageListener("CHAT_MESSAGE", chatMessageListener);
  
  // Join the chat room
  chatRoom.join();
}

// Triggered when the connection is closed
function closeListener (e) {
  displayChatMessage("Orbiter connection closed.");
}

//==============================================================================
// CHAT ROOM EVENT LISTENERS
//==============================================================================
// Triggered when the room is joined
function joinRoomListener (e) {
  displayChatMessage("Chat ready!");
  displayChatMessage("Number of people now chatting: " + chatRoom.getNumOccupants());
}

// Triggered when another client joins the chat room
function addOccupantListener (e) {
  if (chatRoom.getSyncState() != net.user1.orbiter.SynchronizationState.SYNCHRONIZING) { 
    displayChatMessage(username + " joined the chat."
                       + " People chatting: " + chatRoom.getNumOccupants());
  }
}
  
// Triggered when another client leaves the chat room
function removeOccupantListener (e) {
  displayChatMessage(username + " left the chat."
                     + " People chatting: " + chatRoom.getNumOccupants());
}
  
//==============================================================================
// CHAT SENDING AND RECEIVING
//==============================================================================
// Sends a chat message to everyone in the chat room
function sendMessage () {
  var outgoing = document.getElementById("outgoing");
  if (outgoing.value.length > 0) {
    chatRoom.sendMessage("CHAT_MESSAGE", "true", null, outgoing.value);
    outgoing.value = "";
    // Focus text field again after submission (required for IE8 only)
    setTimeout(function () {outgoing.focus();}, 10);
  }
}

// Triggered when a chat message is received
function chatMessageListener (fromClient, message) {
  displayChatMessage(username + ": " + message);
}

// Displays a single chat message
function displayChatMessage (message) {
  // Make the new chat message element
  var msg = document.createElement("span");
  msg.appendChild(document.createTextNode(message));
  msg.appendChild(document.createElement("br"));

  // Append the new message to the chat
  var chatPane = document.getElementById("chatPane");
  chatPane.appendChild(msg);
  
  // Trim the chat to 500 messages
  if (chatPane.childNodes.length > 500) {
    chatPane.removeChild(chatPane.firstChild);
  }
  chatPane.scrollTop = chatPane.scrollHeight;
}