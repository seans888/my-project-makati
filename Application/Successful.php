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
		<form id="main">
				<h1>Registration Successful</h1>
				
				
				<?php

define('DB_NAME', 'test');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_HOST', 'localhost');

$link = mysql_connect(DB_HOST, DB_USER, DB_PASSWORD);

if(!$link) {
	die('Could not connect: ' . mysql_error());
}

$db_selected = mysql_select_db(DB_NAME, $link);

if (!$db_selected) {
	die('Can\'t use ' . DB_NAME . ': ' . mysql_error());
}


$sql="INSERT INTO users (p_username, p_password, p_lastName, p_firstName, p_middleName, p_age, p_gender, p_address, p_contactNo)
VALUES
('$_POST[p_username]',
'$_POST[p_password]',
'$_POST[p_lastName]',
'$_POST[p_firstName]',
'$_POST[p_middleName]',
'$_POST[p_age]',
'$_POST[Gender]',
'$_POST[p_address]',
'$_POST[p_contactNo]')";

echo 'input successful';

if (!mysql_query($sql)) {
	die('Error: ' . mysql_error());
}

mysql_close($link);




?>
<input type="button" onclick="window.location.href='Main.php'" value="Back" >
				 
					</div>
		</form>
				</div>
			
					<div class="ad728x90" style="text-align:center">
				<script async src="//pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
				
				<ins class="adsbygoogle"
				     style="display:inline-block;width:728px;height:90px"
				     data-ad-client="ca-pub-9153409599391170"
				     data-ad-slot="8639520288"></ins>
			
		   </div>
</body>
</html>