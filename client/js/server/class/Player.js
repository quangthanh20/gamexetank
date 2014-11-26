/**************************************************
** GAME PLAYER CLASS
**************************************************/
var PlayerInServer = function(startX, startY, name, order) {
	var x = startX,
		y = startY,
        rotation = -1,
        firePlayer = 0,
        fire = 0,
        order = order,
        array = [],
        playName = name,
		id;
		//moveAmount = 2;
	
	// Getters and setters
    var get = function() {        
        array.x          = x;
        array.y          = y;
        array.rotation   = rotation;
        array.firePlayer = firePlayer;
        array.playName = playName;
        array.order = order;
       	return array;
    }
    
    var set = function(newArray) {        
        x          = newArray.x;
        y          = newArray.y;
        rotation   = newArray.rotation;
        firePlayer = newArray.fire;
    }    
    
    var setFire = function(newFire) {
		firePlayer = newFire;
	};

	// Define which variables and methods can be accessed
	return {
        get : get,
        set : set,	
        setFire: setFire,
        playName: playName,
		
	}
};