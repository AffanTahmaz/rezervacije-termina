<?php
include "db.php";
$datum = $_POST['datum'];
$vrijeme = $_POST['vrijeme'];

$sql = "INSERT INTO reservations (user_id, datum, vrijeme) VALUES ('1', '$datum', '$vrijeme')";
$conn->query($sql);
?>