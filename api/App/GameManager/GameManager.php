<?php

require_once('App/GameManager/ChatManager.php');
require_once('App/GameManager/UserEntityManager.php');
require_once('App/GameManager/BulletEntityManager.php');
require_once('App/GameManager/EventManager.php');
require_once('App/GameManager/CollisionManager.php');

class GameManager {
    function __construct($db) {
        $this->ups = 20;
        $this->timeout = 30;

        $this->mapSize = array(1000,1000);

        // Вся логика чата
        $this->chatManager = new ChatManager($db);

        // Вся логика ивентов (событий)
        $this->eventManager = new EventManager($db);

        // Вся логика передвижений сущностей игроков
        $this->userEntityManager = new UserEntityManager($db);

        // Вся логика передвижений сущностей пуль
        $this->bulletEntityManager = new BulletEntityManager($db);

        $this->collisionManager = new CollisionManager();

        
    }

    function getData($userE, $session) {
        $data = array();

        $usersEntities =  $this->userEntityManager->get($userE['sessions_id']);
        $bulletsEntities = $this->bulletEntityManager->get($userE);

        $data['updateData'] = $this->updateSession($userE, $session, $usersEntities, $bulletsEntities);
        $this->userEntityManager->updateLastRequest($userE);

        $data['entities'] = array_merge($usersEntities, $bulletsEntities);
        $data['chat'] = array();
        $data['events'] = array();

        return $data;
    }

    function control($userE, $moveAxis, $rotation, $isShot) {
        $controlData = $this->userEntityManager->control($userE, $moveAxis, $rotation, $isShot);
        
        if ($controlData['isShot'])
            $controlData['bulletData'] = $this->bulletEntityManager->addBullet($userE, $controlData['x'], $controlData['y'], $controlData['rotation']);
            
        return $controlData;
    }

    function updateSession($userE, $session, $usersEntities, $bulletsEntities) {
        $currentMiliTime = intdiv(microtime(true) * 1000, 1);
        
        if ($currentMiliTime - $session['last_update'] > 1000 / ($this->ups) || $session['last_update'] == '0') {
            return $this->update($session, $usersEntities, $bulletsEntities);
        }
    }

    function update($session, $usersEntities, $bulletsEntities) {
        $currentTime = time();
        $lastBulletUps = 0;

        foreach($usersEntities as $userEntity) {
            $fromLastRequest = $currentTime - $userEntity['last_request'];

            if ($fromLastRequest > $this->timeout && $userEntity['last_request'] != 0)
                $this->userEntityManager->disconnectPlayerEntity($userEntity);
        }

        foreach($bulletsEntities as $bulletEntity)
            $lastBulletUps = $this->bulletEntityManager->updateBullet($bulletEntity, $this->mapSize, $this->ups);

        $collisions = $this->collisionManager->get($usersEntities, $bulletsEntities);

        foreach ($collisions as $collision) {
            if ($collision['first']['type'] == 'bullet')
                $this->bulletEntityManager->killBullet($collision['first']);

            if ($collision['second']['type'] == 'bullet')
                $this->bulletEntityManager->killBullet($collision['second']);

            if ($collision['first']['type'] == 'bullet' && $collision['second']['type'] == 'player')
                $this->userEntityManager->damagePlayer($collision['second'], $collision['first']);

            if ($collision['first']['type'] == 'player' && $collision['second']['type'] == 'bullet')
                $this->userEntityManager->damagePlayer($collision['first'], $collision['second']);
        }

        return $lastBulletUps;
    }

    function createStats($user) {
        return $this->userEntityManager->createStats($user);
    }
}