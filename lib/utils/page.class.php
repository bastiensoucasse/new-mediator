<?php
class Page
{
    private $id;
    private $name;
    private $desciption;
    private $locked;

    public function __construct($id, $name, $desciption, $locked = false)
    {
        $this->id = $id;
        $this->name = $name;
        $this->desciption = $desciption;
        $this->locked = $locked;
    }

    public function getID()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getDescription()
    {
        return $this->desciption;
    }

    public function setDescription($description)
    {
        $this->description = $description;
    }
}
