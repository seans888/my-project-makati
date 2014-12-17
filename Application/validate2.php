
<?php
include('conn.php');

if (isset($_POST['submit'])) {
$UserName=$_POST['uid'];
$Password=$_POST['pid'];
$result=mysql_query("select * from users where p_username='$UserName' and p_password='$Password'")or die (mysql_error());
		
$count=mysql_num_rows($result);
$row=mysql_fetch_array($result);
		
		if ($count > 0){
		session_start();
		$_SESSION['member_id']=$row['member_id'];
		header('location:Main.php');
		}else{
		header('location:index.php');
		}
}
?>
