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

    $mainCurr = 0;

    $string = 'Started... ';

    foreach ($entities as $firstEntity) {
      $string = $string.'Current mainEntity is '.$firstEntity['name'].'. Started finding other entities.';
      for ($i = $mainCurr + 1; $i < count($entities); $i++) {
        $string = $string.' Current id secondEntity = '.$i.'... ';
        $secondEntity = $entities[$i];
        if ($firstEntity != $secondEntity)
          if ($this->isCollision($firstEntity, $secondEntity))
            array_push($collisions, array(
              'first' => $firstEntity,
              'second' => $secondEntity
            ));
      }

      $mainCurr++;
    }

    return $collisions;
  }

  private function isCollision($firstEntity, $secondEntity) {
    if (($firstEntity['type'] == 'player' && $secondEntity['type'] == 'bullet') || 
        ($firstEntity['type'] == 'bullet' && $secondEntity['type'] == 'player')) 
    {
      if ($firstEntity['users_id'] == $secondEntity['users_id'])
        return false;
    }

    $leftEntity = null;
    $rightEntity = null;

    $isCollisionX = false;

    if ($firstEntity['pos'][0] < $secondEntity['pos'][0]) {
      $leftEntity = $firstEntity;
      $rightEntity = $secondEntity;
    } else if ($firstEntity['pos'][0] > $secondEntity['pos'][0]) {
      $leftEntity = $secondEntity;
      $rightEntity = $firstEntity;
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