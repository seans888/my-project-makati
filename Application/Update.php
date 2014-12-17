
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
				 <?php 
				
				 $id1 = $_GET['id'];
		echo "<form id='reportform'  enctype='multipart/form-data' action= 'Update.php?id=$id1' method='post' >";
		
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

				$name = $_FILES  ['upfile'] ['name'];
				$temp = $_FILES ['upfile'] ['tmp_name'];
				move_uploaded_file($temp,"Upload/".$name);
				$url = "Upload/$name";
		


				$id = $_GET['id'];		
		
			$sql="UPDATE `report_files` SET `Image` = '$name', `url` = '$url', `Weight` = '$_POST[Weight]', `Reward` = '$_POST[Reward]', `Physical` = '$_POST[Physical]', `Other` = '$_POST[Other]' ,`Stat` = '$_POST[Stat]' WHERE `report_files`.`Report_id` = $id";
				echo '<a style=color:#FFFFFF;>- input successful -</a>';
				echo "<a style=color:#FFA500; href='ViewRecord.php?id=$id'> Return</a><br><br>";
		if (!mysql_query($sql)) {
					die('Error: ' . mysql_error());
								}
				}
				mysql_close($link);
				echo"<input type='hidden' name='Stat' value='".date ('h:i, jS F Y')."'>";
			?>
	<h1>UPDATE Report</h1>
	<div class="center">

	<table border="0">
	
	<tr>
		<td>Image:</td>
		<td align="left"><input name="upfile" type="file"></td>
	</tr>
	
		<td>Weight:</td>
		<td align="left"><input type="text" name="Weight" size="3" maxlength="3" /></td>
	</tr>
	
	<tr>
		<td>Reward:</td>
		<td align="left"><input type="text" name="Reward" size="15" maxlength="15" /></td>
		
	</tr>
	<tr>
		<td>Physical Desc.:</td>
		<td align="left"><textarea id="text" name="Physical" style="width:300px;height:100px"></textarea></td>
	</tr>
	<tr>
		<td>Other Desc.:</td>
		<td align="left"><textarea id="text" name="Other" style="width:300px;height:100px"></textarea></td>
	</tr>
	
		
		
	</tr>
	</table>
	<br>
	<Br>
	<input id="reg1" type="Submit" name= "submit" value="Submit Report" onclick="myFunction()">
	
						<script>
						
						function myFunction() {
							confirm("Are these information correct? Press Ok to register!");
						}
						</script>
	<br>
	<br>
	<br>
		<input id="reg1" type="reset" value="Reset" />
	<br>
	<br>
	<br>
		<input type="button" onclick="window.location.href='Main.php'" value="Back">	
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