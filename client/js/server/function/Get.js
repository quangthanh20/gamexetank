// ----------------------------------
// Server

// check room
function onCheckRoom(data) {
    //console.log(data);
    if ( data.number == 0 || ( data.number > 0 && data.number < 2 ) ) {
        flagCheck = true;
        //this.game.paused = false;
        //game.state.start('Game');                
    }else {
        alert( " room '" + data.name + "' full please select another room, thanks." );
        //header("Location: index.php");
        window.location="index.php";
    }
    return flagCheck;
}
// New player
function onNewPlayer(data) {
    
	console.log("New player connected: "+data.id);
    //console.log(data);
	// Initialise the new player
    if ( data.name != playername ) {
    	var newPlayer = new PlayerInServer(data.x, data.y, data.name, data.order);
        
    	newPlayer.id = data.id;
        playerId.push(data.id);
    	// Add new player to the remote players array
    	remotePlayers.push(newPlayer);
    } else {
        /*console.log(data.x);*/
        //locationPlayer.x = data.x;
        //locationPlayer.y = data.y;
        locationPlayer = data;
        flagConnect = true;
        //console.log(locationPlayer);
        //flag = true;
    }
    
    if ( data.restart == 0 ) {
        //flagConnect = true;
        flagPlayConnect = true;
    }
        
    
     
    //console.log('1 new');
    //console.log(remotePlayers.length);
};

// Move player
function onMovePlayer(data) {
	var movePlayer = playerById(data.id);

	// Player not found
	if (!movePlayer) {
		console.log("Player not found: "+data.id);
		return;
	};

	// Update player position
    data.firePlayer = 0;
    movePlayer.set(data);
	
    //console.log(remotePlayers.length);
};

// Move player
function onBulletsPlayer(data) {
	var bulletsPlayer = playerById(data.id);

	// Player not found
	if (!bulletsPlayer) {
		console.log("Player not found: "+data.id);
		return;
	};
   
    //console.log(data);
	// Update player position
    bulletsPlayer.set(data);	        
    //console.log(remotePlayers.length);
};

// Remove player
function onRemovePlayer(data) {
	var removePlayer = playerById(data.id);

	// Player not found
	if (!removePlayer) {
		console.log("Player not found: "+data.id);
		return;
	};
    //console.log('3 delete');
	// Remove player from array
	remotePlayers.splice(remotePlayers.indexOf(removePlayer), 1);
    if( otherPlayers[data.id] ) {
        //otherPlayers[data.id].kill();.destroy();
        otherPlayers[data.id].destroy();
    }
    
    numberPlayers--;
};

function onPlayerDie(data) {
    var removePlayer = playerById(data.id);
    // Player not found
	if (!removePlayer) {
		console.log("Player not found: "+data.id);
		return;
	};
    
    if( otherPlayers[data.id] ) {
        objectBoom ( otherPlayers[data.id] ); 
        otherPlayers[data.id].kill();
    }
    
}


/**************************************************
** GAME HELPER FUNCTIONS
**************************************************/
// Find player by ID
function playerById(id) {
    //console.log(remotePlayers.length);
	var i;
	for (i = 0; i < remotePlayers.length; i++) {
		if (remotePlayers[i].id == id)
			return remotePlayers[i];
	};
	
	return false;
};

// new Enemie
function newEnemie(data) {	
    var newEnemie = new EnemieInServer(data.x, data.y, data.name, data.rotation);
    remoteEnemies.push(newEnemie);
    GameTest.Enemies.play(game);    
    //console.log("new enemie " + data);
};

// moving Enemie
function movingEnemie(data) {	
    //var newEnemie = new EnemieInServer(data.x, data.y, data.name, data.rotation);
    //remoteEnemies.push(newEnemie);
    //GameTest.Enemies.play(game); 
    if ( flagPlayConnect ) { 
        movingEnemies(data, 1);
    }   
    //console.log("new enemie " + data);
};

// moving to Enemie
function movingToEnemie(data) {	
    //console.log(data); 
    if ( flagPlayConnect ) { 
        recreateEnemies( data );
    }
};

function deteleEnemie(data) {
    //console.log(data.name); 
    killEnemies( data );
};


// moving Enemie
function fireEnemie(data) {	
    //var newEnemie = new EnemieInServer(data.x, data.y, data.name, data.rotation);
    //remoteEnemies.push(newEnemie);
    //GameTest.Enemies.play(game);
    if ( flagPlayConnect ) {  
        movingEnemies(data, 2);   
    }
    //console.log("new enemie " + data);
};

// set game
function onGameGet(data) {
    //console.log(data);
    if ( data.win ) { 
        //score = data.score;
        //maxEnemies = 0;
        flagWin = true;
        locationPlayer.x = data.x;
        locationPlayer.y = data.y;
        locationPlayer.order = data.order;  
    }else {
        if ( data.lost ) {
            flagLose = true;
            //console.log(data);
        }
    }
    
    if ( data.restart == 0 ) {
        flagPlayConnect = true;
    }
    //console.log(data);
	gameInServer.set(data);  
    
    //console.log("Game set: " + data);  
    //console.log(data);
	
};

