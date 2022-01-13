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
                'pos' => array($entity['x'],$entity['y']),
                'type' => 'bullet',
                'direction' => $entity['direction'],
                'damage' => $entity['damage'],
                'playerName' => $userE['name']
            ));
        }

        return $entitiesArr;
    }

    function addBullet($userE, $x, $y, $rotation) {
        return $this->db->addBulletEntity($userE, $x, $y, $rotation);
    }
}