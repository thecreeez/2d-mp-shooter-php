<?php

class BulletEntityManager {
    function __construct($db) {
        $this->db = $db;
    }

    function get($userE) {
        $entities = $this->db->getBulletEntitiesBySession($userE['sessions_id']);
        $entitiesArr = array();

        foreach ($entities as $entity) {
            array_push($entitiesArr, array(
                'name' => $entity['uuid'],
                'id' => $entity['id'],
                'users_id' => $entity['users_id'],
                'pos' => array($entity['x'],$entity['y']),
                'type' => 'bullet',
                'direction' => $entity['direction'],
                'damage' => $entity['damage'],
                'speed' => $entity['speed'],
                'playerName' => $userE['name']
            ));
        }

        return $entitiesArr;
    }

    function addBullet($userE, $x, $y, $rotation) {
        return $this->db->addBulletEntity($userE, $x, $y, $rotation);
    }

    function updateBullet($bulletE, $mapSize, $ups) {
        $bulletPos = $this->movingBullet($bulletE, $ups);

        return $bulletPos;
    }

    function movingBullet($bulletE, $ups) {
        $newPos = array(
            $bulletE['pos'][0] + ($bulletE['speed'] * cos($bulletE['direction'] * pi() / 180) / $ups),
            $bulletE['pos'][1] + ($bulletE['speed'] * sin($bulletE['direction'] * pi() / 180) / $ups)
        );

        return $this->db->setBulletPos($bulletE['id'], $newPos);
    }

    function killBullet($bulletE) {
        return $this->db->removeBulletEntity($bulletE['id']);
    }
}