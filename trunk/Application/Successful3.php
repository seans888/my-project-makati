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
		<forM ID="main" action= "Report_from.php" method="post">
				
				<h1>Record Input Successful</h1>
				
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
if (isset($_POST['submit']))
{


$sql="INSERT INTO complainant (Comp_id, c_firstName, c_lastName, c_middleName, c_age, c_gender, c_address, c_contactNo, c_report)
VALUES
('',
'$_POST[c_firstName]',
'$_POST[c_lastName]',
'$_POST[c_middleName]',
'$_POST[c_age]',
'$_POST[c_gender]',
'$_POST[c_address]',
'$_POST[c_contactNo]',
'$_POST[Report]')";


if (!mysql_query($sql)) {
	die('Error: ' . mysql_error());
}
}
mysql_close($link);


$report = $_POST['Report'];

echo "<input name='r1' type='hidden' value = ".$report."><br>";
?>
				
				 <input id="Back" type="Submit" name= "submit" value="Enter" >
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