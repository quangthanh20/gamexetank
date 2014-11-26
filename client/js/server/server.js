// get data tfrom server
function loadServer() {
    //if ( playername == '' ) {
    // Initialise socket connection
    socket = io.connect("gamexetank.herokuapp.com", {port: 8000, transports: ["websocket"]});
    // Socket connection successful
	socket.on("connect", onSocketConnected);
   // }
	// Socket disconnection
	socket.on("disconnect", onSocketDisconnect);
    
    // check room
	socket.on("check room", onCheckRoom);

	// New player message received
	socket.on("new player", onNewPlayer);

	// Player move message received
	socket.on("move player", onMovePlayer);
    
     // Player removed message received
	socket.on("bullets player", onBulletsPlayer);  

	// Player removed message received
	socket.on("remove player", onRemovePlayer);
    
    // Player die message received
	socket.on("player die", onPlayerDie);
    
    // Listen for Enemie
	socket.on("new enemie", newEnemie); 
    
    // Listen for Enemie
	socket.on("moving enemie", movingEnemie); 
    
     // Listen for Enemie
	socket.on("moved to enemie", movingToEnemie); 
    
    // Listen for Enemie
	socket.on("detele enemie", deteleEnemie); 
    
    // Listen for Enemie
	socket.on("fire enemie", fireEnemie); 
    
    // Listen for game get
	socket.on("game get", onGameGet);        
}