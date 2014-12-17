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
				 <div class="login-form">


		<?php
				if(isset($_GET['Report']))
								{
									$Report = $_GET['Report'];
								
										if ($Report == 'W'){
										echo "<form id ='reportform' enctype='multipart/form-data' action='Wanted.php' method='POST'>";
										echo "<h1>Wanted List</h1>";
										echo "<tr>
										<td><input name='Search' type='Text' value='Search Here'></td>
										<td><input value='Submit' type='submit' name='submit'></td>
										</tr></table><br><br>";
										
										echo "<table border='0' width=400>";
										
											echo "<tr>
											 <td><a style=color:#FFFFFF;>ID</a></td>
											 <td><a style=color:#FFFFFF;>First Name</a></td>
											  <td><a style=color:#FFFFFF;>Last Name</a></td>
											 </tr>";
											 
										$query = mysql_query("SELECT * FROM `report_files` WHERE Report = 'W' ");
										//$query = mysql_query("SELECT * FROM 'files'");
										while($row = mysql_fetch_assoc($query))
									{	
										$id = $row['Report_id'];
										$Fname = $row['Fname'];
										$Lname = $row['Lname'];
										
										
										
									
										
										echo "<tr>
											 <td><a style=color:#FFA500; href='ViewRecord.php?id=$id'>$id:</a></td>
											 <td><a style=color:#FFA500; href='ViewRecord.php?id=$id'>$Fname</a></td>
											  <td><a style=color:#FFA500; href='ViewRecord.php?id=$id'>$Lname</a></td>
											 </tr>";
										
									}
										echo "</table>";
									}	else {	
										echo "<form id ='reportform' enctype='multipart/form-data' action='Missing.php' method='POST'>";
										echo "<h1>Missing List</h1>";
										echo "	
										<input name='Search' type='Text' value='Search Here'>
										<input value='Submit' type='submit' name='submit'>
										<br><br>";
										
										echo "<table border='0' width=400>";
										
											echo "<tr>
											 <td><a style=color:#FFFFFF;>ID</a></td>
											 <td><a style=color:#FFFFFF;>First Name</a></td>
											  <td><a style=color:#FFFFFF;>Last Name</a></td>
											 </tr>";
										
										$query = mysql_query("SELECT * FROM `report_files` WHERE Report = 'M' ");
										//$query = mysql_query("SELECT * FROM 'files'");
										while($row = mysql_fetch_assoc($query))
									{	
										$id = $row['Report_id'];
										$Fname = $row['Fname'];
										$Lname = $row['Lname'];
										
											echo "<tr>
											 <td><a style=color:#FFA500; href='ViewRecord.php?id=$id'>$id:</a></td>
											 <td><a style=color:#FFA500; href='ViewRecord.php?id=$id'>$Fname</a></td>
											  <td><a style=color:#FFA500; href='ViewRecord.php?id=$id'>$Lname</a></td>
											 </tr>";
										
									}
										echo "</table>";
										
									}
								}
		?>
		<br>
			<input type="button" onclick="window.location.href='Main.php'" value="Back">
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