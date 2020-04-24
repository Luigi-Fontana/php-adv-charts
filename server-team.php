<?php
    include 'data.php';
    header('Content-Type: application/json');
    echo json_encode($graphs['team_efficiency']);
?>
