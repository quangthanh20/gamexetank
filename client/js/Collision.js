// ----------------------------------
// Game Collision: player, bullets, enemies, explosions
/*function collisiOnobject(object1, Object2, expression ) {  
   
  switch(expression) {
        case 1:
            object1.kill();
            break;
        case 2:
            object1.kill();
            object2.kill();
            break;
        case 3:
            object1.destroy();
            object2.destroy();
            break;
        case 4:            
            object2.kill();
            object1.health--
            break;
        case 5:            
            object1.kill();
            Object2.health -= bulletsPlay;
        	if ( Object2.health == 0 ) {
 	              objectBoom ( Object2 );
     	          Object2.kill();
        	}
        	
        	score++;
            break;
        default:
            break;
    }    
    
}*/

function objectBoom ( object ) {
    
    var explosion = explosions.getFirstExists(false);
    	explosion.reset(object.body.x, object.body.y);
    	explosion.play('explosions', 30, false, true);
         
}

function objectStopped( Object ) {
    Object.body.velocity.y = 0;
    Object.body.velocity.x = 0;
}

function testKill(Object1, Object2 ) {
    Object1.destroy();
    Object2.destroy();
}

function notKill(Object1, Object2 ) {
    
}

function collideEnemies(Object1, Object2 ) {
    objectStopped( Object1 );
    //movingOneEnemies( Object1 );    
}

function collidePlayer(Object1, Object2 ) {
    
    //movingOneEnemies( Object2 );
    objectStopped( Object2 );
}


function killOne(Object1, Object2 ) {
    Object1.kill();
}

function killAll(Object1, Object2 ) {
    Object1.kill();
    Object2.kill();
}

function killMinister(Object1, Object2 ) {    
    killAll( Object1, Object2 );
    objectBoom( Object2 );
    gameDie();
    flagLose = true;
}



function killObject1(Object1, Object2 ) {    
    Object1.health--
    Object2.kill();
}

function killObject2(Object1, Object2 ) {    
    Object1.kill();
    Object2.health -= bulletsPlay;
    var name = '';
    if ( Object2.health == 0 ) {
    	 //  And create an explosion :)
        objectBoom ( Object2 );   	      
        name = Object2.name;
    	Object2.destroy();
        
    }
    
    score++;
    //numberEnemies--;
    //maxEnemies--;
    updateGame( 0, name )
}

function resetBullets(Object ) { 
    Object.kill();
}

function killObject3(Object1, Object2 ) {    
    Object1.kill();    
    objectStopped( Object2 );    
}

function killObject4(Object1, Object2 ) {    
    Object2.kill();
    //console.log(Object1);
    objectStopped( Object1 );    
}

function testCollision() {
    
    //collision player
    game.physics.arcade.collide(player, blockedLayer, notKill, null, this); 
    game.physics.arcade.collide(player, bricks, notKill, null, this);    
    game.physics.arcade.collide(player, enemies, collidePlayer, null, this);   
    game.physics.arcade.collide(bullets, blockedLayer, killOne, null, this);   
    game.physics.arcade.collide(bullets, bricks, killAll, null, this);
    
    game.physics.arcade.collide(bullets, enemies, killObject2, null, this);
    game.physics.arcade.collide(bullets, minister, killMinister, null, this);
    
    
    //collision enemies
    game.physics.arcade.collide(enemies, enemies, collideEnemies, null, this);
    
    //objectStopped( enemies );
    game.physics.arcade.collide(enemies, blockedLayer, collideEnemies, null, this);
    //objectStopped( enemies );    
    game.physics.arcade.collide(enemies, bricks, collideEnemies, null, this); 
    game.physics.arcade.collide(enemies, player, collideEnemies, null, this);  
    //game.physics.arcade.overlap(enemies, bricks, notKill, null, this);    
    game.physics.arcade.collide(bulletsEnemies, blockedLayer, killOne, null, this);   
    game.physics.arcade.collide(bulletsEnemies, bricks, killAll, null, this);
    game.physics.arcade.collide(player, bulletsEnemies, killObject1, null, this);
    
    game.physics.arcade.collide(bulletsEnemies, minister, killMinister, null, this);
    //bullets.events.onOutOfBounds.add(resetBullets, this);
    //game.physics.arcade.collide(sprite, bullet );
        
    if ( playerId.length > 0 ){
             //console.log(firePlayer.length);
             
        var x;
        for (x in firePlayer) {                 
            game.physics.arcade.collide(firePlayer[x], blockedLayer, killOne, null, this);            
            game.physics.arcade.collide(firePlayer[x], bricks, killAll, null, this);
            
            game.physics.arcade.collide(firePlayer[x], enemies, killObject3, null, this);
        };
        
        var x;
        for (x in otherPlayers) {                 
            game.physics.arcade.collide(otherPlayers[x], blockedLayer, notKill, null, this);
            
            game.physics.arcade.collide(otherPlayers[x], bricks, notKill, null, this);
            game.physics.arcade.collide(otherPlayers[x], enemies, notKill, null, this);
            game.physics.arcade.collide(otherPlayers[x], bulletsEnemies, killObject4, null, this);
        };
        
        /*var x;
        for (x in otherPlayers) {                 
            game.physics.arcade.collide(otherPlayers[x], player, notKill, null, this);
            //game.physics.arcade.collide(player, bricks, spriteBricks, null, this);
            //game.physics.arcade.collide(otherPlayers[x], bricks, killBricks, null, this);
        }; */
            
    }
    
    /*game.physics.arcade.collide(sprite, bulletsEnemies, killSprite, null, this);*/
    
}