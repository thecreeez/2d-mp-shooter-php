<?php

require_once('App/GameManager/StatManager.php');

class UserEntityManager {
    function __construct($db) {
        $this->playerSpeed = 4;
        $this->shotCooldown = 5;

        $this->db = $db;

        $this->statManager = new StatManager($db);
    }

    function get($sessions_id) {
        $entities = $this->db->query(
            'SELECT entity_users.*, users.name, users.rating, cooldowns_users.* 
            FROM 
                entity_users 
            INNER JOIN 
                users ON users.id = entity_users.users_id
            INNER JOIN
                cooldowns_users ON cooldowns_users.users_id = entity_users.users_id
            WHERE 
                entity_users.sessions_id = '.$sessions_id);
        
        $entitiesArr = array();


        foreach ($entities as $entity) {
            $direction = 'right';

            if ($entity['rotation'] > 90 && $entity['rotation'] < 280)
                $direction = 'left';

            $index = array_push($entitiesArr, array(
                'name' => $entity['name'],
                'users_id' => (int) $entity['users_id'],
                'pos' => array((int) $entity['x'],(int) $entity['y']),
                'cooldowns' => array(
                    'shot' => (int) $entity['shot_cooldown'],
                    'maxShot' => (int) $entity['max_shot_cooldown'],
                    'respawn' => (int) $entity['respawn_cooldown'],
                    'maxRespawn' => (int) $entity['max_respawn_cooldown']
                ),
                'type' => 'player',
                'maxHealth' => (int) 100,
                'health' => (int) $entity['health'],
                'direction' => $direction,
                'last_request' => (int) $entity['last_request'],
                'skin' => 'default'
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
        $this->statManager->addStat($userE['users_id'], 'sessions_played', 1);

        $this->statManager->addStat($userE['users_id'], 'global_kills', 'kills');
        $this->statManager->addStat($userE['users_id'], 'global_deaths', 'deaths');

        $this->statManager->addStat($userE['users_id'], 'kills', '(-kills)');
        $this->statManager->addStat($userE['users_id'], 'deaths', '(-deaths)');

        $this->db->removeUserEntityCooldowns($userE);
        return $this->db->removeUserEntity($userE);
    }

    function damagePlayer($userE, $reason) {
        if ($userE['health'] - $reason['damage'] > 0)
            return $this->db->setUserEntityProperty($userE, 'health', $userE['health'] - $reason['damage']);

        $this->statManager->addStat($reason['users_id'], 'kills', 1);
        $this->statManager->addStat($userE['users_id'], 'deaths', 1);
        $this->disconnectPlayerEntity($userE);
    }

    function createStats($user) {
        return $this->statManager->createStats($user);
    }
}