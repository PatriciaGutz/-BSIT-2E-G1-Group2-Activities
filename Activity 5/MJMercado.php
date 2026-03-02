<?php
 
$GroceryList = [
    ["desc" => "ITEM 1", "qty" => 2, "amt" => 100],
    ["desc" => "ITEM 2", "qty" => 7, "amt" => 35],
    ["desc" => "ITEM 3", "qty" => 1, "amt" => 350],
    ["desc" => "ITEM 4", "qty" => 2, "amt" => 20]
];

function showReceipt($items) {
    $overallTotal = 0;
    
    echo "QTY\tDESC\tAMT\tTOTAL\n";
    echo "---------------------------\n";
    
    foreach ($items as $item) {
        $rowTotal = $item['qty'] * $item['amt'];
        
        $overallTotal = $overallTotal + $rowTotal;

        echo "(" . $item['qty'] . ")\t" . $item['desc'] . "\t" . $item['amt'] . "\t" . $rowTotal . "\n";
}
    echo "---------------------------\n";
    echo "Overall Total: Php " . $overallTotal;
}

showReceipt($GroceryList);
    
?>