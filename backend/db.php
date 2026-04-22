<?php
$conn = new mysqli("localhost", "root", "", "rezervacije");

if ($conn->connect_error) {
    die("Greška konekcije");
}
?>
