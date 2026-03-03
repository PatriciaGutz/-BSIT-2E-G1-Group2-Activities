<?php

function generateReceipt($groceryList) {
    $overallTotal = 0;

    echo "QTY  DESC          AMT      Total\n";
    echo "----------------------------------\n";

    foreach ($groceryList as $item) {
        $quantity = $item['qty'];
        $description = $item['desc'];
        $amount = $item['amt'];
        
        $itemTotal = $quantity * $amount;
        $overallTotal += $itemTotal;

        printf("(%d) %-13s %-8d %d\n", $quantity, $description, $amount, $itemTotal);
    }

    echo "----------------------------------\n";
    echo "Overall Total         Php " . $overallTotal . "\n";
}

$shoppingCart = [
    ['qty' => 2, 'desc' => 'ITEM 1', 'amt' => 100],
    ['qty' => 7, 'desc' => 'ITEM 2', 'amt' => 35],
    ['qty' => 1, 'desc' => 'ITEM 3', 'amt' => 350],
    ['qty' => 2, 'desc' => 'ITEM 4', 'amt' => 20],
];

generateReceipt($shoppingCart);

?>