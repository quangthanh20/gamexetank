// ----------------------------------
// Game class

GameTest.Game = function(game)
{
	// Init game variables
	/*this.time = 0;
	this._spawnTimer = 0;
	this._spawnTimerLevel = 0;
	this._spawnBulletsEnemiesTimer = 0*/

	
	
}

GameTest.Game.prototype = {
	create: function(){
	    var temp;
	    if ( flag ) {
	       gameInServer = new GameSerever; 
           flag = false;            
	    }
        
        temp = gameInServer.get(); 
		if ( temp.countRestart == 0 ) {                
            init();
        } else if ( temp.countRestart > 0 ) {
            //restartGame();
            //game.state.restart();            
            restartGameServer(); 
            restartObject();
            restartGame();
        } 
             
        
	},
		
	managePause: function(){
		// pause the game
		//this.game.paused = true;	
        //socket.on("disconnect", onSocketDisconnect);	
        //game.state.restart();        
		//game.state.start('Over');
        
        //game.world.removeAll()       
        
        if ( !flagLose ) {
                updateGame(1);    
        }     
        game.state.start('Close');   
                
        
		// start the MainMenu state
        /*var MainMenu = new Menu("In-game Menu",
				[ "Continue", "Quit"],
				"",
				70, 50, [startGame],null);
        this.state.add( 'MainMenu', MainMenu);
        
		this.state.start('MainMenu'); */              
		//this.game.paused = false;
	},
    playerDie: function(){
        objectBoom ( player ); 
    	player.destroy();
        updatePlayerDie();
        flagDie = true;
    },
	update: function(){	
	   
	    if ( flagPlayConnect ) {  
            if ( remotePlayers.length > 0 ) {	
                if ( flagConnect ) {
                    loadObject();
                    flagConnect = false; 
                }
                
                draw();                
                testCollision(); 
                  
                if ( !flagDie ) { 
                    movingPlayer();                       
                    shootPlayer();
                    updateEnemieXY(); 
                    
                }               
            
            }       
            var temp = gameInServer.get();
            if ( ( remotePlayers.length > 0 || flagWin )  ) {
            	if ( maxEnemies == 0 || temp.restart == 1 || flagLose ) {    		    
            		this.managePause(this);
            	}
                if ( ( player.health  == 0 || player.health  < 0 ) && !flagDie ) {
                    this.playerDie(this);
                }
            }
        }
        
     },
   
	render: function(){		
        if ( remotePlayers.length > 0 && flagPlayConnect ) {
            game.debug.text('Score: ' + score + " Shields: " + player.health + " Bullets: " + bulletsPlay, 0, 15);
		
            game.debug.text('Level: ' + level, 710, 15);
        }
	
	}
	
};

GameTest.Close = function(game) {};

GameTest.Close.prototype = {
  create: function() {    
    this.spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    var temp = gameInServer.get();
    var tempcount = temp.countRestart;
    tempcount++;
    console.log(tempcount);
    gameInServer.setcountRestart(tempcount);
    flagPlayConnect = false;
    if ( ( flagDie || temp.score > score || flagLose ) && !flagWin  )  {
        label = game.add.text(game.world.centerX , game.world.centerY, 'Score: '+score+'\nGAME OVER\nPress SPACE to restart',{ font: '22px Lucida Console', fill: '#fff', align: 'center'});                
    }else {        
        if ( ( !flagDie && temp.score == score ) || flagWin ) {
            label = game.add.text(game.world.centerX , game.world.centerY, 'Score: '+score+'\nYOU WIN\nPress SPACE to restart',{ font: '22px Lucida Console', fill: '#fff', align: 'center'});                
        }
    }

    label.anchor.setTo(0.5, 0.5);  
    
  },

  update: function() {
    var temp = gameInServer.get();
    if ( ( this.spacebar.isDown || temp.restart == 0 )  )
      //game.state.start('Boot');
      game.state.start('Game');  
  }
};







