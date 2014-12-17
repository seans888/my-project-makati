<?php
include('conn.php');
session_start();
if (!isset($_SESSION['member_id'])){
header('location:index.php');
}
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
		<forM ID="main">
				<h1>Master List</h1>
				<div class="center">
				<h2><a href="logout.php">Logout</a></h2>
				
						<input type="button" onclick="window.location.href='ViewList.php?Report=W'" value="Wanted" > <a href="#" class=" wanted icon"></a> 
						
						<br>
						<br>
						<br>
						
						<input type="button" onclick="window.location.href='ViewList.php?Report=M'" value="Missing"> <a href="#" class=" missing icon"></a>   
						
						<br>
						<br>
						<br>
						
						<input type="button" onclick="window.location.href='complainant.php'" value="File A Report">				
				
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