var game = new Phaser.Game( 672, 512, Phaser.AUTO, 'game' );


// add game states
game.state.add('Boot', GameTest.Boot);
game.state.add('Preloader', GameTest.Preloader);
//game.state.add('Play', GameTest.Play);
game.state.add('Game', GameTest.Game);
game.state.add('Close', GameTest.Close);
//game.state.add('Enemies', GameTest.Enemies);
// start the Boot state
game.state.start( 'Boot');


function startMainMenu () {
	
 var MainMenu = new Menu("Test",
				[ "Play", "Settings", "Help", "Credits" ],
				"(C) Copyright 2014 by Thanh Tran",
				50, 70, [startGame], backgroundMenu);
        game.state.add( 'MainMenu', MainMenu);
        
		game.state.start('MainMenu');
	
}

function startGame() {
    
    //	And start the actual game
    /*this.preloadBar = this.add.sprite(100, (800)/2, 'preloaderBar');
    this.load.setPreloadSprite(this.preloadBar);*/

    this.state.start('Game');   

}