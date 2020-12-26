<?php
require_once "card.class.php";

class Database
{
    private $pdo;

    public function __construct()
    {
        try {
            $this->pdo = new PDO("mysql:host=localhost;dbname=Mediator;charset=utf8", "admin", "BS:db!721915");
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die ("[ERROR] " . $e->getMessage() . "<br />");
        }
    }

    private function getAll($sql, $args = array())
    {
        if (!$sql) return null;
        $query = $this->pdo->prepare($sql);
        $query->execute($args);
        return $query->fetchAll();
    }

    public function getNewCards($limited = null)
    {
        $sql = "SELECT `COM`.`id`, `MOV`.`title`, CONCAT('movies?id=', `COM`.`id`) AS `link`, `COM`.`import_date`
                FROM `Commands` `COM`
                INNER JOIN `Movies` `MOV` ON `MOV`.`id` = `COM`.`id`
                WHERE `COM`.`type` = 'movie'
                AND `COM`.`import_date` IS NOT NULL
                UNION
                SELECT `COM`.`id`, `SER`.`title`, CONCAT('series?id=', `COM`.`id`) AS `link`, `COM`.`import_date`
                FROM `Commands` `COM`
                INNER JOIN `Series` `SER` ON `SER`.`id` = `COM`.`id`
                WHERE `COM`.`type` = 'series'
                AND `COM`.`import_date` IS NOT NULL
                ORDER BY `import_date` DESC, `id` DESC";
        if ($limited != null) $sql .= " LIMIT " . $limited;
        $data = $this->getAll($sql);
        if (!$data) return null;
        $cards = array();
        foreach($data as $cardPos => $cardData) array_push($cards, new Card($cardData, $cardPos));
        return $cards;
    }
}
