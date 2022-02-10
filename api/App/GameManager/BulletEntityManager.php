<?php

class BulletEntityManager {
    function __construct($db) {
        $this->db = $db;
    }

    function get($userE) {
        $entities = $this->db->getBulletEntitiesBySessionOrderByExpression($userE['sessions_id'], 'ABS(x-'.$userE['x'].')+ABS(y-'.$userE['y'].')');
        $entitiesArr = array();

        foreach ($entities as $entity) {
            array_push($entitiesArr, array(
                'name' => $entity['uuid'],
                'id' => (int) $entity['id'],
                'users_id' => (int) $entity['users_id'],
                'pos' => array((int) $entity['x'],(int) $entity['y']),
                'type' => 'bullet',
                'direction' => (int) $entity['direction'],
                'damage' => (int) $entity['damage'],
                'speed' => (int) $entity['speed'],
                'playerName' => $userE['name']
            ));
        }

        return $entitiesArr;
    }

    function addBullet($userE, $x, $y, $rotation) {
        return $this->db->addBulletEntity($userE, $x, $y, $rotation);
    }

    function updateBullets($sessions_id, $mapSize, $ups) {
        $this->db->setBulletsPosBySessionId($sessions_id, 'x + (speed * COS(direction * PI() / 180)) / '.$ups, 'y + (speed * SIN(direction * PI() / 180)) / '.$ups);
        $this->db->deleteBulletsByPosByExpressionSessionId($sessions_id, 'x < '.(-$mapSize[0] / 2).' OR x > '.($mapSize[0] / 2).' OR y < '.(-$mapSize[1] / 2).' OR y > '.($mapSize[1] / 2));
    }

    function killBullet($bulletE) {
        return $this->db->removeBulletEntity($bulletE['id']);
    }
}