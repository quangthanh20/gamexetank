GameTest.Preloader = function(game){
	// define width and height of the game
	/*this.GAME_WIDTH = 800;
	this.GAME_HEIGHT = 500;*/
};
GameTest.Preloader.prototype = {
	preload: function(){
		// set background color and preload image
		//this.stage.backgroundColor = '#B4D9E7';
		this.preloadBar = this.add.sprite(200, (game.world.height)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);
 	    // load images        		         
		//this.load.image('play', 'assets/img/play.png');
        this.load.image('play0', 'assets/img/play1.png');
        this.load.image('play1', 'assets/img/play2.png');
        this.load.image('minister', 'assets/img/minister.png');
		this.load.image('bullet-play', 'assets/img/bullet-play.png');
		this.load.image('enemies', 'assets/img/enemies.png');
		this.load.image('bullet-enemies', 'assets/img/bullet-enemies.png');   
        this.load.image('brick1', 'assets/img/brick.png');     
				
        // load map
		this.load.tilemap('map', 'assets/tilemaps/map 2.json', null, Phaser.Tilemap.TILED_JSON);
		this.load.image('gameTiles', 'assets/img/tiles.png');				
        
        // load explosion        
		this.load.spritesheet('explosions', 'assets/img/explosions.png', 128, 128);
		/*this.load.spritesheet('rain', 'img/rain.png', 17, 17);*/
        
	},
	create: function(){
		// start the MainMenu state
       startMainMenu();
	}
};
