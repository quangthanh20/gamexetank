<?php 
    define('LOCAL_DIR',($_SERVER['SERVER_NAME']=='localhost') ? 'gamexetank/' : '');
    define('BASE_URL','http://' . $_SERVER['SERVER_NAME'] . '/' . LOCAL_DIR);          
    
    define('EXT', '.php');  
    
    if(isset($_GET['data']) && !empty($_GET['data'])) {    
        $data =$_GET['data'];  
    } else{       
        header("Location: index.php");
    }    

?>
<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>HTML5 Game Programming Test</title>
  <?php 
         
     require_once ('client/js' . EXT);
    
  ?>
  <script type="text/javascript">
        var room_bas = '<?php echo $data?>';    
  </script>
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
    <a href="<?php echo BASE_URL; ?>gamexetank"> Trang chủ </a>
    <div id="game">
      
    </div>
</body>
</html>