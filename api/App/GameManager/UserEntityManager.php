<?php

class UserEntityManager {
    function __construct($db) {
        $this->playerSpeed = 4;
        $this->shotCooldown = 5;

        $this->db = $db;
    }

    function get($sessions_id) {
        $entities = $this->db->getUsersEntityAndUserBySession('sessions_id', $sessions_id);
        $entitiesArr = array();


        foreach ($entities as $entity) {
            $direction = 'right';

            if ($entity['rotation'] > 90 && $entity['rotation'] < 280)
                $direction = 'left';

            array_push($entitiesArr, array(
                'name' => $entity['name'],
                'users_id' => $entity['users_id'],
                'pos' => array($entity['x'],$entity['y']),
                'type' => 'player',
                'maxHealth' => 100,
                'health' => $entity['health'],
                'direction' => $direction,
                'shot_cooldown' => $entity['shot_cooldown'],
                'last_request' => $entity['last_request'],
                'kills' => $entity['kills'],
                'deaths' => $entity['deaths'],
                'skin' => $entity['skin']
            ));
        }

        return $entitiesArr;
    }

    function control($userE, $moveAxis, $rotation, $isShot) {
        $returnData = array(
            'x' => $userE['x'],
            'y' => $userE['y'],
            'rotation' => $userE['rotation']
        );

        $newPosX = 'nc';
        $newPosY = 'nc';
        $speed = $this->playerSpeed;

        if ($moveAxis[0] && $moveAxis[1])
            $speed/=1.75;

        if ($moveAxis[0]) {
            $newPosX = $userE['x'] + ($moveAxis[0] * $speed);
            $returnData['x'] = $newPosX;
        }
        
        if ($moveAxis[1]) {
            $newPosY = $userE['y'] + ($moveAxis[1] * $speed);
            $returnData['y'] = $newPosY;
        }

        $newRotation = 'nc';

        if ($rotation) {
            $newRotation = $rotation;
            $returnData['rotation'] = $rotation;
        }

        $isShotBool = false;
        $newShotCooldown = 'nc';

        if ($isShot && $userE['shot_cooldown'] <= 0)
            $isShotBool = true;

        $req = $this->db->updateUserEntity($userE['id'], $newPosX, $newPosY, 'nc', $newRotation, $newShotCooldown, 'nc', 'nc');

        $returnData['isShot'] = $isShotBool;


        return $returnData;
    }

    function update($userE, $x, $y, $rotation, $shotCooldown) {
        return $this->db->updateUserEntity($userE['id'], $x, $y, $userE['health'], $rotation, $shotCooldown, $userE['deaths'], $userE['kills']);
    }

    function updateLastRequest($userE) {
        return $this->db->setUserEntityProperty($userE, 'last_request', time());
    }

    function disconnectPlayerEntity($userE) {
        return $this->db->removeUserEntity($userE);
    }
}