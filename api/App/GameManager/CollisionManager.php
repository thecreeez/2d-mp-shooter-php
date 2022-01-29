<?php

class CollisionManager {
  function __construct() {
    $this->sizes = array(
      'player' => array(80,80),
      'bullet' => array(20,20)
    );
  }

  function get($usersEntities, $bulletsEntities) {
    $collisions = array();
    $entities = array_merge($usersEntities, $bulletsEntities);

    foreach ($entities as $firstEntity) {
      foreach ($entities as $secondEntity) {
        if ($firstEntity != $secondEntity)
          if ($this->isCollision($firstEntity, $secondEntity))
            array_push($collisions, array($firstEntity, $secondEntity));
      }
    }

    return $collisions;
  }

  private function isCollision($firstEntity, $secondEntity) {
    $leftEntity = null;
    $rightEntity = null;

    $isCollisionX = false;

    if ($firstEntity['pos'][0] < $secondEntity['pos'][0]) {
      $leftEntity = $firstEntity;
      $rightEnttiy = $secondEntity;
    } else if ($firstEntity['pos'][0] > $secondEntity['pos'][0]) {
      $leftEntity = $secondEntity;
      $rightEnttiy = $firstEntity;
    } else {
      $isCollisionX = true;
    }

    if (!$isCollisionX) {
      $leftEntityRightPart = $leftEntity['pos'][0] + ($this->sizes[$leftEntity['type']][0] / 2);
      $rightEntityLeftPart = $rightEntity['pos'][0] - ($this->sizes[$rightEntity['type']][0] / 2);

      if ($leftEntityRightPart >= $rightEntityLeftPart)
        $isCollisionX = true;
    }

    if (!$isCollisionX)
      return false;

    $topEntity = null;
    $bottomEntity = null;

    $isCollisionY = false;

    if ($firstEntity['pos'][1] < $secondEntity['pos'][1]) {
      $topEntity = $secondEntity;
      $bottomEntity = $firstEntity;
    } else if ($firstEntity['pos'][1] > $secondEntity['pos'][1]) {
      $topEntity = $firstEntity;
      $bottomEntity = $secondEntity;
    } else {
      $isCollisionY = true;
    }

    if (!$isCollisionY) {
      $topEntityBottomPart = $topEntity['pos'][1] - ($this->sizes[$topEntity['type']][1] / 2);
      $bottomEntityTopPart = $bottomEntity['pos'][1] + ($this->sizes[$bottomEntity['type']][1] / 2);

      if ($bottomEntityTopPart >= $topEntityBottomPart)
        $isCollisionY = true;
    }

    return $isCollisionY;
  }
}