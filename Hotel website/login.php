<?php 

$username = $_POST['username'];
$password = $_POST['password'];


$conn = new mysqli('localhost','root','','register');
if($conn->connect_error){
    die('Connection Failed :'.$conn->connect_error);

}
else{
    $stmt =$conn->prepare("insert into log(username ,password )
    values(?,?)");
    $stmt->bind_param("ss", $username ,$password);
    $stmt->execute();
    $username = stripcslashes($username);  
        $password = stripcslashes($password);  
        $username = mysqli_real_escape_string($conn, $username);  
        $password = mysqli_real_escape_string($conn, $password);  
      
        $sql = "select *from register where Name = '$username' and password = '$password'";  
        $result = mysqli_query($conn, $sql);  
        $row = mysqli_fetch_array($result, MYSQLI_ASSOC);  
        $count = mysqli_num_rows($result);  
          
        if($count == 1){  
            echo "<script>alert('Login Successfully'   )</script>";
           
            echo "<script>window.location='final.html'</script>";
        }  
        else{  
            echo "<h1> Login failed. Invalid username or password. regiter yourself first.</h1>"; 
           echo "<a href='registration.html'>REGISTER HERE </a> ";
            

        
        }  
    $stmt->close();
    $conn->close();
  
}



?>


