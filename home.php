<?php
require_once "lib/utils/page.class.php";
require_once "lib/utils/database.class.php";
require_once "lib/utils/tools.php";

$page = new Page("home", "Accueil", "Mediator est la base cinématographique de Profuder. Trouvez des informations sur les derniers films, séries et célébrités.");
?>

<!doctype html>
<html dir="ltr" lang="fr">

<?php include "lib/head.php"; ?>

<body id="app">
    <?php include "lib/header.php"; ?>
    <main id="main">
        <div id="wrap" class="cards">
            <?php foreach ($database->getNewCards(27) as $card) $card->render(); ?>
            <div class="cards-padding"></div>
        </div>
    </main>
    <?php include "lib/footer.php"; ?>
</body>

</html>
