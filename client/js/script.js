 ///////////////////////////////////////////////////////////////////////Network Functions////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////
	 
      var socket = io.connect('http://gamexetank.herokuapp.com:8000');
      
      // call the server-side function 'adduser' and send one parameter (value of prompt)
      socket.emit('rooms get');
      
      socket.on( 'get room', getRoom );
      
      socket.on( 'room exist', roomExist );
           
	
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// get room
function getRoom(data, numberPlayer) {
    //console.log(numberPlayer[1]);
    $('#room').empty();
    for (x in data) {
        //console.log(numberPlayer.data[x]);
        /*if ( numberPlayer.data[x] ){
            console.log(numberPlayer.data[x]);
        }*/
        if ( numberPlayer[x] == 2 ) {
            $('#room').append('<div>' + data[x] + '(' + numberPlayer[x] + ')</div>');
        } else {
            $('#room').append('<div><a href="game.php?data='+data[x]+'" onclick="switchRoom(\''+data[x]+'\')">' + data[x] + '(' + numberPlayer[x] + ')</a></div>');
        }
    };
}
// get room
function roomExist(name) {
    alert( " room name" + name + " has already." );
    socket.emit('rooms get');
    
}
// get room
function switchRoom(data) {
    
}

$(document).ready(function(){
    $('#datasend').click( function() {
        //console.log('socket');
        socket.emit('new room', prompt("What's room name?"));
        $('#room').empty();
    });
});
	  	