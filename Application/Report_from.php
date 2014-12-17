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
		<form id="reportform"  enctype="multipart/form-data" action= "Successful2.php" method="post" >
		<?php 
$report1 = $_POST['r1'];
echo "<input name='Report' type='hidden' value =".$report1."><br>";
echo"<input type='hidden' name='Stat' value='".date ('h:i, jS F Y')."'>";
?>
	<h1>Enter Report</h1>
	<div class="center">

	<table border="0">
	
	<tr>
		<td>Image:</td>
		<td align="left"><input name="upfile" type="file"></td>
	</tr>
	
	<tr>
		<td>First Name:</td>
		<td align="left"><input type="text" name="Fname" size="20" maxlength="20" /></td>
	</tr>
	<tr>
		<td>Last Name:</td>
		<td align="left"><input type="text" name="Lname" size="20" maxlength="20" /></td>
	</tr>
	<tr>
		<td>Alias:</td>
		<td align="left"><input type="text" name="Alias" size="10" maxlength="10" /></td>
	</tr>
	<tr>
		<td>Gender:</td>
		<td align="left"><select name="sex"><option name="M">MALE</option><option name="F">FEMALE</option></select></td>
	</tr>
	<tr>
		<td>Age:</td>
		<td align="left"><input type="text" name="Age" size="3" maxlength="3" /></td>
	</tr>
	<tr>
		<td>Weight:</td>
		<td align="left"><select name="Weight" id="height">
   <?php
        for($foot=20;$foot<=300;$foot++){
      
                   echo "<option value='$foot feet'> $foot kg </option>"; 
               
            }
        
   ?>
</select></td>
	</tr>
	<tr>
		<td>Height:</td>
		<td align="left"><select name="Height" id="height">
   <?php
        for($foot=3;$foot<=7;$foot++){
            for($inches=0;$inches<=11;$inches++){
                if($inches==0){
                   echo "<option value='$foot feet'> $foot feet </option>"; 
                 }else{
                    echo "<option value='$foot feet $inches inches'> $foot feet $inches inches </option>";
                 }
            }
        }
   ?>
</select></td>
	</tr>
	<tr>
		<td>Address:</td>
		<td align="left"><input type="text" name="Address" size="30" maxlength="30" /></td>
		
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