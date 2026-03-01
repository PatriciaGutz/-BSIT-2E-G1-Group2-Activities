<?php
function showReceipt($products) {
    $sumTotal = 0;

    echo "QTY  DESC     AMT   Total\n";
    echo "------------------------\n";

    foreach ($products as $product) {
        $qty = $product["qty"];
        $desc = $product["desc"];
        $amt = $product["amt"];
        $total = $qty * $amt;
        $sumTotal += $total;

        printf("(%d) %-8s %-5d %d\n", $qty, $desc, $amt, $total);
    }

    echo "-------------------------\n";
    echo "Overall Total      Php " . $sumTotal;
}

$product = [
    ["qty" => 2, "desc" => "ITEM 1", "amt" => 100],
    ["qty" => 7, "desc" => "ITEM 2", "amt" => 35],
    ["qty" => 1, "desc" => "ITEM 3", "amt" => 350],
    ["qty" => 2, "desc" => "ITEM 4", "amt" => 20],
];

showReceipt($product);
?>