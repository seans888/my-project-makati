<?php
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
				 <div class="form3">
		<form id="reportform">
		<div align="center">
		
		<?php	
						if(isset($_GET['id']))
								{
									$id = $_GET['id'];
									$query = mysql_query("SELECT * FROM `report_files` WHERE Report_id = $id");
									while($row = mysql_fetch_assoc($query))
									{
									$Image = $row ['Image'];
									$url = $row ['url'];
									$Report_id = $row ['Report_id'];
									$Fname = $row ['Fname'];
									$Lname = $row ['Lname'];
									$Alias = $row ['Alias'];
									$Gender = $row ['Gender'];
									$Age = $row ['Age'];
									$Weight = $row ['Weight'];
									$Height = $row ['Height'];
									$Address = $row ['Address'];
									$Reward = $row ['Reward'];
									$Physical = $row ['Physical'];
									$Other = $row ['Other'];
									
									if($Gender === "M"){
										$sex = "Male";
									
									} else {
										$sex = "Female";
									}	
									
									}
									
									echo "<table border='0'>";
									
									echo "<img src='$url' width='250' height='200'><br>";
									
									echo "<tr><td width='100'>Reward: </td><td width='250'>$Reward</td></tr>";
									echo "<tr><td>First name: </td><td>$Fname</td></tr>";
									echo "<tr><td>Last name: </td><td>$Lname</td></tr>";
									echo "<tr><td>Gender: </td><td>$sex</td></tr>";
									echo "<tr><td>Age: </td><td>$Age</td></tr>";
									echo "<tr><td>Weight: </td><td>$Weight</td></tr>";
									echo "<tr><td>Height: </td><td>$Height</td></tr>";
									echo "<tr><td>Address: </td><td>$Address</td></tr>";
									echo "<tr><td>Physical Desc.: </td><td>$Physical</td></tr>";
									echo "<tr><td>Other Desc.: </td><td>$Other</td></tr>";
					
									echo "</table><Br>";
									echo "<a style=color:#FFA500; href='Update.php?id=$id'>Update</a><br><br>";
									}								
		
		?>
	
					
						<input id="Back" type="button" onclick="window.location.href='Main.php'" value="Back">	
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