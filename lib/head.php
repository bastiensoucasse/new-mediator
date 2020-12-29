<?php
require_once "utils/environment.php";

$iconSizes = array("128", "192", "256", "512", "1024");
$iconTypes = array("png", "webp");
?>

<head>
    <base href="<?= BASE ?>">
    <link rel="home" href="home">
    <link rel="manifest" crossorigin="use-credentials" href="manifest.webmanifest">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500&display=swap">
    <link rel="shortcut icon" href="assets/imgs/favicon.ico">
    <?php
    foreach ($iconSizes as $s)
    {
        foreach ($iconTypes as $t)
        {
            $h = "assets/imgs/mediator-${s}-maskable.${t}";
            
            foreach (array("icon", "apple-touch-icon", "msapplication-square${s}x${s}logo") as $r)
                echo("<link rel=\"${r}\" sizes=\"${s}x${s}\" type=\"image/${t}\" href=\"$h\">");
        } 
    }
    ?>
    <meta charset="utf-8">
    <meta name="canonical" content="<?= CANONICAL . "/" . $page->getID() ?>">
    <meta name="description" content="<?= $page->getDescription(); ?>">
    <meta name="referer" content="origin">
    <meta name="theme-color" content="#202124">
    <meta name="viewport" content="initial-scale=1, width=device-width">
    <script><?php require "dist/service-worker.min.js"; ?></script>
    <script><?php require "dist/lazysizes.min.js"; ?></script>
    <script><?php require "dist/cards.js"; ?></script>
    <style><?php require "dist/mediator.min.css"; ?></style>
    <title><?= $page->getName() == NAME | $page->getID() == "home" ? NAME : $page->getName() . " - " . NAME ?></title>
</head>
