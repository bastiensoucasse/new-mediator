<?php
$active = null;
if ($page->getID() == "home") $active = "home";
else if ($page->getID() == "library") $active = "library";
else $active = "browse";
?>

<header>
    <nav id="lnav">
        <ul>
            <li><a id="logo" href="home" aria-label="Mediator"><?php include "assets/imgs/mediator.svg"; ?></a></li>
            <li><a <?= $active == "home" ? "class=\"active\"" : ""; ?> href="home" aria-label="Accueil">Accueil</a></li>
            <li><a <?= $active == "browse" ? "class=\"active\"" : ""; ?> href="browse" aria-label="Parcourir">Parcourir</a></li>
            <li><a <?= $active == "library" ? "class=\"active\"" : ""; ?> href="library" aria-label="Bibliothèque" style="margin-right: -16px;">Bibliothèque</a></li>
        </ul>
    </nav>
    <nav id="rnav"></nav>
</header>
