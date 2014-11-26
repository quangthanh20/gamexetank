// Socket connected
function onSocketConnected() {
	console.log("Connected to socket server");

	// Send local player data to the game server    
      
	//socket.emit("new player", {x: player.x, y: player.y, id : playername, file: "map 2.json"});
    socket.emit("new player", {name: playername, file: "map 2.json", room: playerRoom });
};

// Socket disconnected
function onSocketDisconnect() {
	console.log("Disconnected from socket server");
    
    socket.emit("disconnect");
    //socket.disconnect();
};

function checkRoom() {
   socket = io.connect("www.game.thanh", {port: 8000, transports: ["websocket"]}); 
   socket.emit("check room", {room : room_bas}); 
}


/**************************************************
** GAME UPDATE
**************************************************/
function updateXY() {
    // Update local player and check for change
    //console.log(rotationPlayer);
	// Send local player data to the game server   
    socket.emit("move player", {x: player.x, y: player.y, rotation: rotationPlayer, room : playerRoom});
};

function updateEnemieXY() {
	// Update local player and check for change
	     //console.log(rotationPlayer);
		// Send local player data to the game server
        var x;
        for (x in enemies.children) {
            var temp = enemies.children[x];
            //console.log(enemies.children[x].name);
            socket.emit("move enemie", {x: temp.x, y: temp.y, name: temp.name,  rotation: temp.rotation, room : playerRoom});
        }
		
};


function updateFire( temp ) {
	// Update local player and check for change
	
		// Send local player data to the game server
        //console.log(rotationPlayer);
        
		socket.emit("bullets player", {x: player.x, y: player.y, rotation: rotationPlayer, fire: temp, room : playerRoom});
};

function updateGame( restart, name ) {
	// Update local player and check for change
	var temp = gameInServer.get();
    
    if ( score > temp.score ) {
        temp.score = score;  
    }
    
    temp.restart = restart || 0;
    temp.name = name || '';
    gameInServer.set(temp);
    //console.log(name);
	// Send local player data to the game server
    var post = ({
        score: temp.score, 
        name: temp.name, 
        restart: temp.restart, 
        paused: temp.paused, 
        countRestart: temp.countRestart,
        room: playerRoom,
    });
	socket.emit("game set", post);
};

function updatePlayerDie() {
    var post = ({        
        id: locationPlayer.id, 
        room: playerRoom,
    });
    
    socket.emit("player die", post);
}
function gameDie() {
    var post = ({               
        room: playerRoom,
    });
    socket.emit("game die", post);
}
// restart game
function restartGameServer() {
    
    var temp = gameInServer.get();
    console.log("game restart");
    
    var post = ({
        score: 0, 
        restart: 0, 
        paused: 0, 
        countRestart: temp.countRestart,
        room: playerRoom,
    });
    gameInServer.set( post )
    socket.emit("game restart", post);
}