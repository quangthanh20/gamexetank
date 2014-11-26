// ----------------------------------
// Enemies class
//var GameTest = {};
GameTest.Enemies = function(game){};

GameTest.Enemies = {
	play: function(game){
		var temp = remoteEnemies[remoteEnemies.length - 1].get();
        //console.log(temp);
        var c = enemies.create(temp.x, temp.y, 'enemies');
        c.health = level;
        //console.log(temp.name);
        c.name = temp.name;
    	//c.body.enable = false;	
		//c.body.immovable = true;
		c.body.collideWorldBounds = true;
        c.anchor.setTo(0.5,0.5); 
		c.body.bounce.setTo(1, 1);
        //c.enableBody = true;		
		game.physics.enable(c, Phaser.Physics.ARCADE);
        //c.physicsBodyType = Phaser.Physics.ARCADE;
        
        c.tempRotation = temp.rotation;
        this.moving( c, c.tempRotation, 100 ); 
       
		
	},
	bulletsEnemies: function( enemies, rotation ){
	    //console.log(rotation);
        var bullet = bulletsEnemies.create(enemies.x + 5, enemies.y + 1, 'bullet-enemies');
        this.moving( bullet, rotation, seedBullet );             
		
	},
    
    moving: function( enemies, rotation, seed ){
        
        //c.body.velocity.y = 100;
        //var seedEnemies = 100
        enemies.angle += 1;
        //console.log(enemies);
        enemies.body.velocity.y = 0;
        enemies.body.velocity.x = 0;
        switch(rotation) {
            case 0:
                enemies.rotation = 1.5707963267948966;
                enemies.body.velocity.y = seed;
                
                break;
            case 1:
                enemies.rotation = -1.5707963267948966;
                enemies.body.velocity.y = -seed;
                
                break;
            case 2:                
                enemies.rotation = 0;
                enemies.body.velocity.x = seed;
                
                break;
            case 3:
                enemies.rotation = 3.141592653589793;
                enemies.body.velocity.x = -seed;                
                break;
            default:
                enemies.body.velocity.y = seed;
        }  
        
    },
	
};

function checkEnemies( name ) { 
    var x;
    for (x in enemies.children) {
        var temp = enemies.children[x];
        if ( temp.name == name ) {
            return x;
        }
    }
    return -1;
}

function movingEnemies( data, order ) { 
    
    var tempCheck  = checkEnemies ( data.name ) ;
     
    if ( tempCheck != -1 ) {
        var temp = enemies.children[tempCheck];
        if ( order == 1 ) {
                temp.tempRotation = data.rotation;
                GameTest.Enemies.moving( temp, data.rotation, 100 );  
            }else if ( order == 2 ){
                //console.log(temp.name);               
                GameTest.Enemies.bulletsEnemies( temp, temp.tempRotation, 100 )
            }
    }
    	
}

function recreateEnemies( data ) {
    //console.log(data.name);
    var tempCheck  = checkEnemies ( data.name ) ;     
    if ( tempCheck != -1 ) {        
        game.physics.arcade.moveToXY(enemies.children[tempCheck],data.x, data.y,100, 200);
    }
    
}

function killEnemies( data ) { 
    //console.log(data);
    maxEnemies = data.max;
    var tempCheck  = checkEnemies ( data.name ) ; 
    //console.log(tempCheck);    
    if ( tempCheck != -1 ) {                
        objectBoom ( enemies.children[tempCheck] );            	                
       	enemies.children[tempCheck].destroy();
    }    
}









