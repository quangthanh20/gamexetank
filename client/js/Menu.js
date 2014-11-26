// Simple menu class
//Test.Menu = function(game){};

var timer = 0;
var text = new Array();
var selectedItem = 0;
var selectedBefore = 0;
var timer = 0;

Menu = function(title, items, footer, y, size, callback, backgroundCallback)
{
	this.title = title;
	this.items = items;
	this.footer = footer;	
	this.callback = callback || 'null';
	this.y = y;
	this.size = size;	
	this.backgroundCallback = backgroundCallback || 'null';	
}

Menu.prototype = {

	create: function () {
		
        if ( this.backgroundCallback != 'null' && this.backgroundCallback ) {
            this.backgroundCallback();
         }
        
        //alert((this.items));
        var y = this.y;
        var size = Math.floor(this.size*0.8);        
        var title = this.title
        var styleTitle = { font: size + "px Times New Roman", align:"center", fill: "White" };
        var nameTitle = game.add.text(game.world.centerX,y, title, styleTitle);
        nameTitle.anchor.setTo(0.5,0.5);                
        y = y + 2*size;
        
        for (var i = 0; i < this.items.length; ++i)
		{
			                       
			if (i == selectedItem )
			{				
                var styleselectedItems = { font: size + "px Times New Roman", align:"center", fill: "#EBF704" };
				text[i] = game.add.text(game.world.centerX,y, this.items[i], styleselectedItems);
               
                
			} else {
                var styleItems = { font: size + "px Times New Roman", align:"center", fill: "White" };
                text[i] = game.add.text(game.world.centerX,y, this.items[i], styleItems);
               
            }
            text[i].name = i;
            text[i].inputEnabled = true;
            //text[i].input.enableDrag(); // Move text with cursor
            text[i].input.useHandCursor = true; //if you want a hand cursor
            text[i].events.onInputOver.add(over, this );
            //text[i].events.onInputOver.add(function() {over ( i ); },this);            
            text[i].events.onInputOut.add(out, this);
            //text[i].fixedToCamera = true;
            text[i].anchor.setTo(0.5,0.5);
            y = y + size;
           
            if ( this.callback != 'null' && this.callback[i] ) {
                text[i].events.onInputDown.add(this.callback[i], this);
            }
            
             /*text[i].events.onInputUp.add(up, this);*/
						
		}
        
        if (this.footer)
		{            
            var stylefooter = { font: "14px Times New Roman", align:"right", fill: "White" };			
            var t = game.add.text(game.world.width - 3.2*this.footer.length,game.world.height - 8, this.footer, stylefooter);
            t.anchor.setTo(0.5,0.5);
		}
        
        
        /*text = game.add.text(game.world.centerX, 250, '  dynamic shadows  ');
        text.anchor.set(0.5);
        text.align = 'center';

        text.font = 'Arial Black';
        text.fontSize = 70;
        text.fontWeight = 'bold';
        text.fill = '#ec008c';

        text.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 0);*/

	},
    menuReload: function(){        
        if ( selectedBefore != selectedItem )  {
            text[selectedBefore].fill = "#fff"; 
        }
       
        text[selectedItem].fill = "#EBF704"; 
        selectedBefore = selectedItem;
        
    },
   	render: function(){   	   
       timer += game.time.elapsed; //this is in ms, not seconds.
        if ( timer >= 100 )
        {
            timer -= 100;
            //text[selectedItem].visible = !text[selectedItem].visible;// bi?n m?t            
            flicker();
        }
   	},       	

	/*startGame: function (pointer) {

		// this.music.stop();

		//	And start the actual game
		this.state.start('Game');

	}*/

};

function flicker() {   
    var temp = text[selectedItem].fill;
    if ( temp == "#fff" || temp == "White" ) {
        text[selectedItem].fill = "#EBF704";
    }else {
        text[selectedItem].fill = "#fff";
    }
}

function over(item) {
    
    game.add.tween(item.scale)
    .to({ x: 1.3, y: 1.3 }, 300, null, true);
    selectedItem = item.name;
    this.menuReload(); 
    

}

function out(item) {
    
    game.add.tween(item.scale)
      .to({x: 1, y: 1}, 300, null, true);   

}





