/**************************************************
** GAME SERVER PLAYER CLASS
**************************************************/
var GameSerever = function() {
	var score = 0,
		restart = 0,
        paused = 0,
        countRestart = 0,
        array = [];               

	// Getters and setters
	var get = function() {
	    array.score        = score;
        array.restart       = restart;
        array.paused          = paused;   
        array.countRestart  = countRestart;     
		return array;        
	};
	
	var set = function(newArray) {
		score        = newArray.score;
        restart      = newArray.restart;
        paused       = newArray.paused;
        countRestart = newArray.countRestart; 
        
	};
    
   	var setcountRestart = function(newcount) {
		countRestart  = newcount;                
	};


	// Define which variables and methods can be accessed
	return {
		get: get,		
		set: set,
        setcountRestart: setcountRestart,       		
	}
};
