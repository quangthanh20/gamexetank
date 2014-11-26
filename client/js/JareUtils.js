// ------------------------------------
// Assorted JavaScript utility functions

function isDef(v) 			{ return v !== undefined; }
function isNull(v) 			{ return v === null; }
function isDefAndNotNull(v) { return vl != null; }

// ----------------------------------
// Load
function playerRotation( rotation ) {
   //console.log(rotation + ' '); 
   var temp;
   switch(rotation) {
        case -1:
            temp =  -1.5707963267948966;
            break;
        case 0:
            temp = 0;
            break;
        case 1:
            temp =  1.5707963267948966;
            break;
        case 3:
            temp = 3.141592653589793;
            break;
        default:
            temp = 0;
    }  
     //console.log(temp); 
    return temp;
}

function sleep(milliSeconds){
    var startTime = new Date().getTime();
    while (new Date().getTime() < startTime + milliSeconds); 
}

function backgroundMenu(){
    var myBitmap = game.add.bitmapData(game.world.width, game.world.height);        
    var grd=myBitmap.context.createLinearGradient(0,0,game.world.width,game.world.height);
    grd.addColorStop(0,"#000");
    grd.addColorStop(1,"#021");
    myBitmap.context.fillStyle=grd;
    myBitmap.context.fillRect(0,0,game.world.width,game.world.height);  
    game.add.sprite(0, 0, myBitmap);
}



