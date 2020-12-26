<?php
class Card
{
    private $id;
    private $title;
    private $link;
    private $image;
    private $pos;

    public function __construct($data, $pos)
    {
        $this->id = $data["id"];
        $this->title = $data["title"];
        $this->link = $data["link"];
        $this->image = "https://mediator.profuder.com/images/tiles/x840/$this->id.webp";
        $this->pos = $pos;
    }

    public function render()
    {
        echo("<div id=\"card-$this->id\" class=\"card\" tabindex=\"0\" title=\"$this->title\"><img class=\"lazyload\" data-src=\"$this->image\" width=\"285\" height=\"160\" loading=\"lazy\" alt=\"\"></div>");
    }
}
