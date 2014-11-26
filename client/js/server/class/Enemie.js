/**************************************************
** GAME ENEMIE CLASS
**************************************************/
var EnemieInServer = function(startX, startY, name, rotation) {
	var x = startX,
		y = startY,
        rotation = rotation,
        firePlayer = 0,        
        array = [],
        name = name;
   
    
	// Getters and setters 
    var get = function() {       
        array.x = x;
        array.y = y;
        array.name = name;
        array.rotation = rotation;
        array.firePlayer = firePlayer;        
		return array;
	};

	

	// Define which variables and methods can be accessed
	return {
	    get: get,		
	}
};
