<?php
function generateReceipt($items) {
    $overallTotal = 0;

    echo "QTY  DESC        AMT      Total\n";
    echo "-------------------------------\n";

    foreach ($items as $item) {
        $qty   = $item['qty'];
        $desc  = $item['desc'];
        $amt   = $item['amt'];

        $lineTotal = $qty * $amt;

        $AllTotal += $lineTotal;

        printf("(%d)%-10s %-8d %-8d\n", $qty, $desc, $amt, $AllTotal);
    }

    echo "-------------------------------\n";
    echo "Overall Total        Php " . $AllTotal . "\n";
}

$groceryList = [
    ["qty" => 2, "desc" => "ITEM 1", "amt" => 100],
    ["qty" => 7, "desc" => "ITEM 2", "amt" => 35],
    ["qty" => 1, "desc" => "ITEM 3", "amt" => 350],
    ["qty" => 2, "desc" => "ITEM 4", "amt" => 20],
];

generateReceipt($groceryList);
?>