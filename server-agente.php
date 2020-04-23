<?php
    include 'data.php';
    header('Content-Type: application/json');
    echo json_encode($graphs['fatturato_by_agent']);
?>
