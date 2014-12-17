<?php
session_start();
define('DB_NAME', 'test');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');
$con =mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);
mysql_select_db(DB_NAME, $con);
?>

<!DOCTYPE html>
<html>
	
<head>
	<title>Sysadd</title>
		<meta charset="utf-8">
		<link href="css/style.css" rel='stylesheet' type='text/css' />
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script type="application/x-javascript"> addEventListener("load", function() { setTimeout(hideURLbar, 0); }, false); function hideURLbar(){ window.scrollTo(0,1); } </script>
		<!--webfonts-->
		<link href='http://fonts.googleapis.com/css?family=Open+Sans:600italic,400,300,600,700' rel='stylesheet' type='text/css'>
		<!--//webfonts-->
</head>
<body>
	
				 <!-----start-main---->
				<div class="login-form">
						<h1>Sign In</h1>
						<h2><a href="Register.php">Create Account</a></h2>
				<form id="index" method="post"  action="validate2.php">
					<li>
						<input type="text" class="text" value="User Name" name="uid" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'User Name';}" ><a class=" icon user"></a>
					</li>
					<li>
						<input type="password" value="Password" name="pid" onfocus="this.value = '';" onblur="if (this.value == '') {this.value = 'Password';}"><a class=" icon lock"></a>
					</li>
					
					 <div class ="forgot">
						<h3><a href="#">Forgot Password?</a></h3>
						<input id="Sign" type="submit" name="submit" onclick="myFunction()" value="Sign In" > <a class=" icon arrow"></a>
						
					</div>
				</form>
			</div>
			<!--//End-login-form-->
					<div class="ad728x90" style="text-align:center">
				<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
				<!-- w3layouts_demo_728x90 -->
				<ins class="adsbygoogle"
				     style="display:inline-block;width:728px;height:90px"
				     data-ad-client="ca-pub-9153409599391170"
				     data-ad-slot="8639520288"></ins>
				
		   </div>

		 		
</body>
</html>