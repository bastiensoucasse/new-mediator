<?php
require_once "page.class.php";

define("NAME", "Mediator");
define("DESCRIPTION", "Mediator est la base cinématographique de Profuder. Trouvez des informations sur les derniers films, séries et célébrités.");

define("PROTOCOL", isset($_SERVER["HTTPS"]) && $_SERVER["HTTPS"] != "off" ? "https" : "http");
define("DOMAIN", PROTOCOL . "://" . $_SERVER["SERVER_NAME"]);
define("PAGE", substr($_SERVER["REQUEST_URI"], 1));

if (!isset($page))
    $page = new Page(PAGE, NAME, DESCRIPTION);

if ($page->getDescription() == null)
    $page->setDescription(DESCRIPTION);
