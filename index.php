<?php 
    define('LOCAL_DIR',($_SERVER['SERVER_NAME']=='localhost') ? 'gamexetang/' : '');
    define('BASE_URL','http://' . $_SERVER['SERVER_NAME'] . '/' . LOCAL_DIR);          
    
    define('EXT', '.php');    

?>
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>HTML5 Game Programming Test</title>  
  <script src="server-gamexetank.herokuapp.com/socket.io/socket.io.js" type="text/javascript"></script>
  <script src="library/js/jquery.min.js"></script>
  <script src="client/js/script.js" type="text/javascript"></script> 
  <style>
    #screen { display:block; margin:0 auto; background-color:#F0F; }
      
    .fpsmeter {
        padding: 0;
        margin: 0;
        width: 100%;
        text-align: center;
    }
    .fpsmeter p {
        margin-top: 0px;
        margin-bottom: 0px;
    }

  </style>
</head>
<body>
  <h3>HTML5 Game Programming test</h3>
  <div id="room">
      
  </div>
  <div id="game">
      
  </div>
  <input type="button" id="datasend" value="Create Room" />
</body>
</html>