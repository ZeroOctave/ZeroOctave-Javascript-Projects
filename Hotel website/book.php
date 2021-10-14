<?php
$name = $_POST['name'];
$checkin = $_POST['checkin'];
$checkout = $_POST['checkout'];
$adults = $_POST['adults'];
$roomtype=$_POST["roomtype"]; 
$rooms = $_POST['rooms'];


$conn = new mysqli('localhost','root','','book');
if($conn->connect_error){
    die('Connection Failed :'.$conn->connect_error);
      echo "connectionfailed ";
}
else{
    
    
    $stmt =$conn->prepare("insert into booking(name ,checkin , checkout , adults , roomtype , rooms)
    values(?,?,?,?,?,?)");
    $stmt->bind_param("sssisi", $name ,$checkin,$checkout,$adults,$roomtype,$rooms);
    $stmt->execute();
    $sql = "SELECT SUM(`rooms`) AS total FROM `booking`";
  $result = mysqli_query($conn, $sql);
  $row = mysqli_fetch_object($result) ;
  if($row->total > 50){
  echo "<script>alert('no rooms available')</script>";
  echo "<script>window.location='final.html'</script>";
  }
    else{
        echo "<script>alert('room booked')</script>";
        echo "<script>window.location='final.html'</script>";
    }
    

    $stmt->close();
    $conn->close();
  
}



?>