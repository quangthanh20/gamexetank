// ----------------------------------
// Game Entities: player, bullets, enemies, explosions
// create
function createObject(startX, startY, life, img, speed, set, bool) {
    
    bool   = bool || false;
    //console.log(img);
    var temp = game.add.sprite(startX, startY, img); 
    temp.health = life;
    temp.speed = speed;
    temp.anchor.setTo(set, set);
    game.physics.enable(temp, Phaser.Physics.ARCADE);
    
    if ( bool ) {
        temp.body.immovable = true;
    }
        
    temp.body.collideWorldBounds = true;
   
    return temp;
}

function createGroup(name, bool, number, img) {
    bool   = bool || false;
    number = number || 0;
    img    = img || '';
    var temp 
    if (name.length > 0 ) {
        temp = game.add.group(game, name, name);     	
	} else {
        temp = game.add.group();   
	}
    
	temp.physicsBodyType = Phaser.Physics.ARCADE;
    temp.enableBody = true;
    //temp.events.onOutOfBounds.add(resetBullets, this);
    //temp.checkWorldBounds = true;
    //temp.events.onOutOfBounds.add(resetGroup, this);
       
        
    if ( bool ) {
        
   	    temp.createMultiple(number, img);
    	//temp.setAll('checkWorldBounds', true);
    	//temp.setAll('outOfBoundsKill', true);
    }
    
    return temp;
}

function createInit() {
    cursors = game.input.keyboard.createCursorKeys();
	key_x = game.input.keyboard.addKey(Phaser.Keyboard.X);
	
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.disableVisibilityChange  = true;
	//  We check bounds collisions against all walls other than the bottom one
	//game.physics.arcade.checkCollision.down = false;
    
    
    
    remotePlayers = [];
    otherPlayers    = [];
    
    firePlayer = [];
    playerId = [];

    nextFirePlayer = [];
    fireFirePlayer = [];
    
    //gameInServer = new GameSerever;
    
    score = 0;
       
    numberPlayers = 0;
    //var randid = RandomIntRange(1,3);
    playerRoom = room_bas;
    //console.log(playerRoom);
    var randid = Math.floor(Math.random() * 9999);
    playername = "player" + randid;
    
}

function createRestart() {
    /*cursors = game.input.keyboard.createCursorKeys();
	key_x = game.input.keyboard.addKey(Phaser.Keyboard.X);*/
	
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.disableVisibilityChange  = true;
      

    nextFirePlayer = [];
    fireFirePlayer = [];
    firePlayer = [];
    
    score = 0;
    maxEnemies = locationPlayer.max;      
    numberPlayers = 0;
    
}



// ----------------------------------
// Explosions

function setupInvader (invader) {

    invader.anchor.x = 0.5;
    invader.anchor.y = 0.5;
    invader.animations.add('explosions');

}



// ----------------------------------
// Load
function loadMap() {
           
    map = this.game.add.tilemap('map');
        
	//the first parameter is the tileset name as specified in Tiled, the second is the key to the asset
	map.addTilesetImage('tiles', 'gameTiles');

	//create layer
	backgroundlayer = map.createLayer('backgroundLayer');
	blockedLayer = map.createLayer('blockedLayer');
    
	//collision on blockedLayer
	map.setCollisionBetween(1, 1500, true, 'blockedLayer');
    			    
    //locationEnemies = this.findObjectsByType('Enemies', map, 'objectsLayer');
    
    locationMinister  = this.findObjectsByType('minister', map, 'objectsLayer', -1);
    //console.log(locationMinister);
    minister = createObject(locationMinister[0].x, locationMinister[0].y, 1, 'minister', 1, 0.5, true);
    
    //locationPlayer = this.findObjectsByType('player', map, 'objectsLayer');
    
	//map.addTilesetImage("brick1", "objectsLayer");

	//resizes the game world to match the layer dimensions
	backgroundlayer.resizeWorld();        
    
    createItems();
}

function createItems(){
     bricks = createGroup('');
	/*bricks = this.game.add.group();
    game.physics.enable(bricks, Phaser.Physics.ARCADE);
	bricks.enableBody = true;*/
	//var item;    
	result = this.findObjectsByType('brick', map, 'objectsLayer');
	//console.log(result);
	result.forEach(function(element){
	  this.createFromTiledObject(element);
	}, this);
};

//find objects in a Tiled layer that containt a property called "type" equal to a certain value
function findObjectsByType(type, mapTemp, layer, bool) {
	var result = new Array();
    bool   = bool || 1;
    //console.log(bool);
	mapTemp.objects[layer].forEach(function(element){
	  if(element.properties.type === type) {
		//Phaser uses top left, Tiled bottom left so we have to adjust
		//also keep in mind that the cup images are a bit smaller than the tile which is 16x16
		//so they might not be placed in the exact position as in Tiled
        if ( bool == 1 ) {
		  element.y -= mapTemp.tileHeight;
        }
		result.push(element);
	  }      
	});
	return result;
};

//create a sprite from an object
function createFromTiledObject(element) {
	var sprite = bricks.create(element.x, element.y, element.properties.sprite);
        
        sprite.body.immovable = true;
        sprite.body.enable = true;
	    sprite.body.collideWorldBounds = true;
        
		/*sprite.body.bounce.setTo(1, 1);
        		
		game.physics.enable(sprite, Phaser.Physics.ARCADE);*/
        //sprite.alive = false;
	    //sprite.body.immovable = true;
        //sprite.exists = false;
        //sprite.visible = false;
        //sprite.checkWorldBounds = true;
        //sprite.events.onOutOfBounds.add(resetBullet, this);
        //console.log(element); 
        //copy all properties to the sprite
        Object.keys(element.properties).forEach(function(key){
            //console.log(key);  
            sprite[key] = element.properties[key];
        });
        //console.log(sprite);
};

function loadObject() {
    
    maxEnemies = locationPlayer.max;  
    //console.log(maxEnemies);
    player = createObject(locationPlayer.x, locationPlayer.y, 10,'play'+locationPlayer.order, 100, 0.5);
    player.rotation = -1.5707963267948966;
    player.body.angle = player.rotation;
    rotationPlayer = -1;
    //player = createObject(game.world.centerX, 500, 10,'play', 100, 0.5);   
            
    enemies = createGroup('enemies');
    /*game.physics.enable(bricks, Phaser.Physics.ARCADE);
	bricks.enableBody = true;*/
	
    bulletsEnemies = createGroup('');
    
    
    bullets = createGroup('', true, 50, 'bullet-play' );
       
    
    //  An explosion pool
    explosions = createGroup('', true, 30, 'explosions');		
	explosions.forEach(setupInvader, this);

    
   	
}

// ----------------------------------
// Player
function movingPlayer() {
    
    //sprite.rotate = game.physics.arcade.moveToPointer(sprite, 0, game.input.activePointer, 40);	
    //if ( player.health  > 0 ) {
        player.body.velocity.x = 0;
    	player.body.velocity.y = 0;
    //}    
	if (cursors.left.isDown)
	{
		//  Move to the left
		player.body.velocity.x -= player.speed;
        rotationPlayer = 3;   
        //console.log(player.body.angle); 
        //var temp = playerRotation ( rotationPlayer );  
        //player.rotation = player.body.angle;
        player.rotation = 3.141592653589793;
        updateXY();		
	} else if (cursors.right.isDown)
		{
			//  Move to the right
			player.body.velocity.x = player.speed;
            //player.rotation = player.body.angle;
            player.rotation = 0;
            //console.log(player.body.angle); 
            rotationPlayer = 0;
            updateXY();			
		} else if (cursors.up.isDown )
        	{
    			player.body.velocity.y = -player.speed;
                //player.rotation = player.body.angle;
                player.rotation = -1.5707963267948966;
                rotationPlayer = -1;
                //console.log(player.body.angle); 
                //console.log(player.body.angle);
                updateXY();
    		} else if (cursors.down.isDown )
            	{
        			player.body.velocity.y = player.speed;
                    //player.rotation = player.body.angle;
                    player.rotation = 1.5707963267948966;
                    rotationPlayer = 1;
                    //console.log(player.body.angle); 
                    updateXY();
        		}
}

function shootPlayer() {
    
    //console.log(fireP);
    if ( fireP == 0 ) {
        updateFire( 0 );
        fireP = -1;
        
    }
    
    if (key_x.isDown )
    {
    	//sprite.body.velocity.y = 1000;       
    	fireBullet();
        updateFire( 1 );
        
        fireP = 0;
    } 
}

// ----------------------------------
// Player other
/**************************************************
** GAME DRAW
**************************************************/
function draw() {
    
    if ( numberPlayers > 0 ) {
        if ( remotePlayers.length > numberPlayers ) {        
            drawNew( remotePlayers.length - numberPlayers - 1 )
        }
    } else if ( numberPlayers == 0 ) {
        if ( playerId.length > 0 ) {
            drawNew(0);
        }
    }
    if ( numberPlayers > 0 ) {
    	var i;
    	for (i = 0; i < remotePlayers.length; i++) {
    	   //console.log(otherPlayers[0]);
    		
            //game.physics.arcade.angleToXY(otherPlayers[i],remotePlayers[i].getX(),remotePlayers[i].getY());
            var data = remotePlayers[i].get();             
            var temp;
            //console.log(data.rotation);
            temp = playerRotation( data.rotation ); 
            //console.log(temp);           
            otherPlayers[remotePlayers[i].id].body.angle = temp;
            //console.log(temp);
            otherPlayers[remotePlayers[i].id].rotation = temp;  
            if ( data.firePlayer > 0 ) {                  
                fireBulletMutiPlayer( remotePlayers[i].id );  
                //console.log(remotePlayers[i].firePlayer);                     
                remotePlayers[i].setFire(0);
                //console.log(remotePlayers[i].get());
            }             
            game.physics.arcade.moveToXY(otherPlayers[remotePlayers[i].id],data.x, data.y,otherPlayers[remotePlayers[i].id].speed, 200);
                
    	}
    }
};

function drawNew( number ) {    
    //console.log('5 ' + remotePlayers[0].id);
	var i;
	for (i = number; i < remotePlayers.length; i++) {    	    
        var data = remotePlayers[i].get();         
        otherPlayers[remotePlayers[i].id] = createObject(data.x, data.y, 10,'play'+data.order, 300, 0.5);  
        otherPlayers[remotePlayers[i].id].alpha = 0.5;                      
        numberPlayers++;       
	}; 
}




// ----------------------------------
// Bullet
function movingBullet(ObjectBullet, ObjectPlayer, rotation, seed) {
    //console.log(rotation);
    
    if ( rotation < 0 ) { 
       ObjectBullet.reset(ObjectPlayer.x - 1 , ObjectPlayer.y - 15 );
       ObjectBullet.body.velocity.y = -seed; 
    } else {
        if ( rotation == 0 ) {  
           ObjectBullet.reset(ObjectPlayer.x + 8 , ObjectPlayer.y - 3 ); 
           ObjectBullet.body.velocity.x = seed; 
        }else {
            if ( rotation > 0 && rotation > 3  ) { 
               ObjectBullet.reset(ObjectPlayer.x - 13 , ObjectPlayer.y + 3 );
               ObjectBullet.body.velocity.x = -seed; 
            }else {
                if ( rotation > 0 && rotation < 3 ) { 
                   ObjectBullet.reset(ObjectPlayer.x + 1 , ObjectPlayer.y + 15 ); 
                   ObjectBullet.body.velocity.y = seed; 
                }
            }
        }
    } 
}

function fireBullet () {

    if (game.time.now > nextFire && bullets.countDead() > 0)
    {
        nextFire = game.time.now + fireRate;
		var rotation = player.body.angle;        
        
        var bullet = bullets.getFirstExists(false);
        bullet.checkWorldBounds = true;
        bullet.events.onOutOfBounds.add(resetBullets, this);
        bullet.rotation = player.body.angle;		
        //console.log(player.body.angle);
        //console.log(rotation);
        movingBullet(bullet, player, rotation, seedBullet);
        
        
        /*{		
			//game.physics.arcade.moveToPointer(bullet, 600);
			
			//game.physics.arcade.angle(bullet, 600)
			 
		}*/
    }
		
}

function fireBulletMutiPlayer ( id ) {
    
    var nextFireTemp = 0;
    var fireRateTemp = 100;    
    
    if ( !firePlayer[id] ) {
        firePlayer[id] = createGroup('', true, 50, 'bullet-play');  
       	/*firePlayer[id].setAll('checkWorldBounds', true);
    	firePlayer[id].setAll('outOfBoundsKill', true);*/
        
        nextFirePlayer[id] = nextFireTemp;
        fireFirePlayer[id] = fireRateTemp;
        
    }    
    
    if (game.time.now > nextFirePlayer[id] && firePlayer[id].countDead() > 0)
    {
        nextFirePlayer[id] = game.time.now + fireFirePlayer[id];
        
        //temp = playerRotation( data.rotation );
        
		var rotation = otherPlayers[id].rotation;               
        var bullet = firePlayer[id].getFirstExists(false);
        bullet.checkWorldBounds = true;
        bullet.events.onOutOfBounds.add(resetBullets, this);
        bullet.rotation = otherPlayers[id].rotation;
        //console.log(rotation );
        
        movingBullet(bullet, otherPlayers[id], rotation, seedBullet);        
        
    }
		

}

// ----------------------------------
// init
function init() {     
    checkRoom();       
    loadMap();
    createInit();
    loadServer();	
}

function restartGame() {
    loadMap();    
    flagConnect = true; 
    flagDie = false;
    flagLose = false;
    flagWin = false;
    createRestart();
    
    draw();	
    
}

function restartObject(){
    enemies.destroy();
    player.destroy();
    bullets.destroy();
    bulletsEnemies.destroy();
    explosions.destroy();    
    var temp = this.findObjectsByType('player', map, 'objectsLayer', -1);
    //console.log(temp);
	for (var i = 0; i < remotePlayers.length; i++) {    	    
        var data = remotePlayers[i].get();
        var x = temp[data.order].x;
        var y = temp[data.order].y; 
        //console.log(x +  " " + y);  
        data.x = x;
        data.y = y;  
        locationPlayer.x, locationPlayer.y     
        data.rotation = -1;
        data.firePlayer = 0; 
        remotePlayers[i].set(data);       
	}; 

}
