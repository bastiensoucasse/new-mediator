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
        $this->pos = $pos;
    }

    public function render()
    {
        echo("<a id=\"card-$this->id\" class=\"card\" tabindex=\"0\" title=\"$this->title\" aria-label=\"$this->title\" href=\"$this->link\"><img class=\"lazyload\" data-sizes=\"auto\" data-src=\"/assets/images/tiles/162p/$this->id.webp\" data-srcset=\"/assets/images/tiles/108p/$this->id.webp 192w, /assets/images/tiles/162p/$this->id.webp 288w\" width=\"190\" height=\"107\" loading=\"lazy\" alt=\"\"></a>");
    }
}
