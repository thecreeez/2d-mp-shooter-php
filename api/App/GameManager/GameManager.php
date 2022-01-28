<?php

require_once('App/GameManager/ChatManager.php');
require_once('App/GameManager/UserEntityManager.php');
require_once('App/GameManager/BulletEntityManager.php');
require_once('App/GameManager/EventManager.php');

class GameManager {
    function __construct($db) {
        $this->ups = 20;

        // Вся логика чата
        $this->chatManager = new ChatManager($db);

        // Вся логика ивентов (событий)
        $this->eventManager = new EventManager($db);

        // Вся логика передвижений сущностей игроков
        $this->userEntityManager = new UserEntityManager($db);

        // Вся логика передвижений сущностей пуль
        $this->bulletEntityManager = new BulletEntityManager($db);
    }

    function getData($userE, $session) {
        $data = array();

        $usersEntities =  $this->userEntityManager->get($userE['sessions_id']);
        $bulletsEntities = $this->bulletEntityManager->get($userE);

        $this->updateSession($userE, $session, $usersEntities, $bulletsEntities);

        $data['entities'] = array_merge($usersEntities, $bulletsEntities);
        $data['chat'] = array();
        $data['events'] = array();

        return $data;
    }

    function control($userE, $moveAxis, $rotation, $isShot) {
        $controlData = $this->userEntityManager->control($userE, $moveAxis, $rotation, $isShot);
        
        if ($controlData['isShot'])
            $controlData['ggg'] = $this->bulletEntityManager->addBullet($userE, $controlData['x'], $controlData['y'], $controlData['rotation']);
            
        return $controlData;
    }

    function updateSession($userE, $session, $usersEntities, $bulletsEntities) {
        $currentMiliTime = intdiv(microtime(true) * 1000, 1);

        if ($currentMiliTime - $session['last_update'] > 1000 / ($this->ups) || $session['last_update'] == '0') {
            //$this->update($session, $usersEntities, $bulletsEntities);
        }
    }

    function update($session, $usersEntities, $bulletsEntities) {
        $currentTime = time();

        foreach($usersEntities as $userEntity) {
            $fromLastRequest = $currentTime - $entity['last_request'];

            if ($fromLastRequest > 10 && $entity['last_request'] != 0) {
                $this->db->disconnectPlayerEntity($entity['users_id']);
            }
        }
    }

    function damagePlayer($userE, $damage) {
        $this->userEntityManager->damagePlayer($userE, $damage);
    }
}