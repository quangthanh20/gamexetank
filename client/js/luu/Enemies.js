// ----------------------------------
// Enemies class
//var GameTest = {};
GameTest.Enemies = function(game){};

GameTest.Enemies = {
	play: function(game){
		//(console.log(enemies));
		
        if ( numberEnemies < 5 && currentEnemies > 0 ) {                
    		var c = enemies.create(locationEnemies[otherEnemies].x, locationEnemies[otherEnemies].y, 'enemies');
    		//c.name = 'enemies' + numberEnemies;
    		c.health = level;
    		
    		//c.body.immovable = true;
    		c.body.collideWorldBounds = true;
            
    		c.body.bounce.setTo(1, 1);
            		
    		game.physics.enable(c, Phaser.Physics.ARCADE);
            //c.setAll('checkWorldBounds', true);
    	    //c.setAll('outOfBoundsKill', true);
            var temp = randomRotation(0,3)
            c.tempRotation = temp;
            this.moving( c, c.tempRotation, 100 ); 
        	//c.body.velocity.y = 100;
    		
    		this.bulletsEnemies( c, c.tempRotation );
    		
            otherEnemies++;
            if ( otherEnemies > 1 ) {
                otherEnemies = 0;
            }
            numberEnemies++ ;
            currentEnemies--;
            
        }
       
		
	},
	bulletsEnemies: function( enemies, rotation ){
	   var bullet = bulletsEnemies.create(enemies.x + 5, enemies.y + 1, 'bullet-enemies');
           this.moving( bullet, rotation, seedBullet );             
		
	},
    
    moving: function( enemies, rotation, seed ){
        
        //c.body.velocity.y = 100;
        //var seedEnemies = 100
        enemies.body.velocity.y = 0;
        enemies.body.velocity.x = 0;
        switch(rotation) {
            case 0:
                enemies.body.velocity.y = seed;
                break;
            case 1:
                enemies.body.velocity.y = -seed;
                break;
            case 2:
                enemies.body.velocity.x = seed;
                break;
            case 3:
                enemies.body.velocity.x = -seed;
                break;
            default:
                enemies.body.velocity.y = seed;
        }  
        
    },
	
};


function randomRotation( rotation ) {    
    var temp = RandomIntRange(0,4);    
    
    while ( temp == rotation ) {
        temp = RandomIntRange(0,4);
    }
    /*console.log(temp + ' ');
    console.log(rotation);*/
    return temp
}

function movingEnemies() { 
    
    for(var i = 0; i <= enemies.length ; i++  ) {		
        var temp = RandomIntRange(0,i);
        movingOneEnemies( enemies.getAt( temp ) )        
	}		
}

function movingOneEnemies( enemies ) { 
                
    /*var tempRotation = randomRotation( enemies.tempRotation );
    enemies.tempRotation = tempRotation;*/
    calculatePlay( enemies );
    var rand = EnemiesRotation[Math.floor(Math.random() * EnemiesRotation.length)];
    enemies.tempRotation = EnemiesRotation[rand];
    if ( enemies.health > 0 ) {
       GameTest.Enemies.moving( enemies, enemies.tempRotation, 100 );       
    }		
}

function calculatePlay( enemies ) {
    var Px = player.x,
        Py = player.y,
        Ex = enemies.x,
        Ey = enemies.y;
    var tempX,tempY;
    tempX = Ex - Px;
    tempY = Ey - Py; 
    var array = [];
    EnemiesRotation = [];    
    
    if ( tempX > 0 ) {
        EnemiesRotation.push(3); 
        array.push(2);          
    } else {            
        EnemiesRotation.push(2);
        array.push(3);
    }
    
    if ( tempY > 0 ) {            
        EnemiesRotation.push(1);
        array.push(0); 
    } else {            
        EnemiesRotation.push(0);
        array.push(1);
    } 
    var rand = array[Math.floor(Math.random() * array.length)];
    EnemiesRotation.push(array[rand]);           
}











