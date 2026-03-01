<?php
function printReceipt($receipt) {
    $ovrTotal = 0;

    echo "------------------------ \n";
    echo "QTY  DESC    AMT   TOTAL \n";
    echo "------------------------ \n";

    foreach ($receipt as $rcp) {
        $qty = $rcp["qty"];
        $desc = $rcp["desc"];
        $amt = $rcp["cost"];
        $total = $qty * $amt;

        $ovrTotal += $total;

        echo "$qty   $desc   $amt   $total\n";
    }

    echo "------------------------ \n";
    echo "Overall Total :   $ovrTotal\n";
}

$receipt = array(
    array("desc" => "ITEM 1", "qty" => 2, "cost" => 100),
    array("desc" => "ITEM 2", "qty" => 7, "cost" => 35),
    array("desc" => "ITEM 3", "qty" => 1, "cost" => 350),
    array("desc" => "ITEM 4", "qty" => 2, "cost" => 20)
);

printReceipt($receipt);
?>