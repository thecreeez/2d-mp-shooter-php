<?php

class Database {
    function __construct() {
        $user = 'root';
        $password = '';

        try {
            $this->db = new PDO('mysql:dbname=lf2_php;host=127.0.0.1;port=3306',$user,$password);
        } catch(PDOException $e) {
            //echo 'Connection failed. err:'.$e;
        }
    }

    function __destruct() {
        $this->db = null;
    }

    function getUser($field, $value) {
        $query = 'SELECT * FROM users WHERE '.$field.' = "'.$value.'"';

        return $this->db->query($query)->fetch();
    }

    function pushUser($name, $pass, $token = null) {
        $query = 'INSERT INTO users (`name`, `password`, `token`) VALUES ("'.$name.'", "'.$pass.'", "'.$token.'")';

        return $this->db->query($query)->fetch();
    }

    function setUserToken($id, $token) {
        $query = 'UPDATE users SET token = "'.$token.'" WHERE users.id = '.$id;

        return $this->db->query($query)->fetch();
    }

    function getTopUsers() {
        $query = 'SELECT name, rating FROM users ORDER BY users.rating DESC LIMIT 0, 10';
        $users = $this->db->query($query);

        $top = array();

        foreach($users as $user) {
            array_push($top, $user);
        }

        return $top;
    }

    function getSessions() {
        $query = 'SELECT * FROM sessions';

        return $this->db->query($query);
    }

    function getSession($field, $value) {
        $query = 'SELECT * FROM sessions WHERE '.$field.' = "'.$value.'"';

        return $this->db->query($query)->fetch();
    }

    function getUsersInSession($id) {
        $query = 'SELECT users.id, users.name, users.rating FROM entity_users INNER JOIN users ON entity_users.users_id = users.id WHERE entity_users.sessions_id = '.$id;

        return $this->db->query($query);
    }

    function getEntityUsersInSession($id) {
        $query = 'SELECT * FROM entity_users WHERE sessions_id = '.$id;

        return $this->db->query($query);
    }

    function getSessionOnline($id) {
        $query = 'SELECT COUNT(*) FROM entity_users WHERE sessions_id = '.$id;

        return $this->db->query($query)->fetch();
    }

    function getUserEntityByUser($field, $value) {
        $query = 'SELECT entity_users.* FROM entity_users INNER JOIN users WHERE users.'.$field.' = "'.$value.'" AND users.id = entity_users.users_id';

        return $this->db->query($query)->fetch();
    }

    function getUsersEntityBySession($field, $value) {
        $query = 'SELECT entity_users.* FROM entity_users INNER JOIN sessions WHERE sessions.'.$field.' = "'.$value.'"';

        return $this->db->query($query);
    }

    function getUsersEntityAndUserByUser($field, $value) {
        $query = 'SELECT entity_users.*, users.name, users.rating FROM entity_users INNER JOIN users WHERE users.'.$field.' = entity_users.users_'.$value;

        return $this->db->query($query);
    }

    function getUsersEntityAndUserBySession($field, $value) {
        $query = 'SELECT entity_users.*, users.name, users.rating FROM entity_users INNER JOIN users WHERE users.id = entity_users.users_id AND entity_users.'.$field.' = "'.$value.'"';

        return $this->db->query($query);
    }

    function addUserEntity($user, $sessions_id, $skin = 'default', $x = 0, $y = 0, $health = 100, $rotation = 0) {
        $query = 'INSERT INTO entity_users (`users_id`, `sessions_id`, `x`, `y`, `health`, `rotation`, `skin`) VALUES ('.$user['id'].', '.$sessions_id.', '.$x.', '.$y.', '.$health.', '.$rotation.', "'.$skin.'")';

        return $this->db->query($query);
    }

    function updateUserEntity($userE_id, $x, $y, $health, $rotation, $shotCooldown, $deaths, $kills) {
        $query = 'UPDATE entity_users SET ';

        $isFirst = true;

        if ($x !== 'nc') {
            $query = $query.'x = '.$x;
            $isFirst = false;
        }

        if ($y !== 'nc') {
            if (!$isFirst)
                $query = $query.',';

            $query = $query.'y = '.$y;
            $isFirst = false;
        }

        if ($health !== 'nc') {
            if (!$isFirst)
                $query = $query.',';

            $query = $query.'health = '.$health;
            $isFirst = false;
        }

        if ($rotation !== 'nc') {
            if (!$isFirst)
                $query = $query.',';

            $query = $query.'rotation = '.$rotation;
            $isFirst = false;
        }

        if ($shotCooldown !== 'nc') {
            if (!$isFirst)
                $query = $query.',';

            $query = $query.'shotCooldown = '.$shotCooldown;
            $isFirst = false;
        }

        if ($deaths !== 'nc') {
            if (!$isFirst)
                $query = $query.',';

            $query = $query.'deaths = '.$deaths;
            $isFirst = false;
        }

        if ($kills !== 'nc') {
            if (!$isFirst)
                $query = $query.',';

            $query = $query.'kills = '.$kills;
            $isFirst = false;
        }

        $query = $query.' WHERE entity_users.id = '.$userE_id;

        $this->db->query($query);
        $arr = array();

        $arr['req'] = $req;
        $arr['x'] = $x;

        return $arr;
    }

    function removeBulletEntity($bulletId) {
        $query = 'DELETE FROM entity_bullets WHERE entity_bullets.id = '.$bulletId;

        return $this->db->query($query);
    }

    function setUserEntityProperty($userE, $property, $value) {
        $query = 'UPDATE entity_users SET '.$property.' = "'.$value.'" WHERE entity_users.users_id = '.$userE['users_id'];

        return $this->db->query($query);
    }

    function removeUserEntity($userE) {
        $query = 'DELETE FROM entity_users WHERE `entity_users`.`users_id` = '.$userE['users_id'];

        return $this->db->query($query);
    }

    function getBulletEntitiesBySession($sessions_id) {
        $query = 'SELECT * FROM entity_bullets WHERE `entity_bullets`.`sessions_id` = '.$sessions_id;

        return $this->db->query($query);
    }
    
    function addBulletEntity($userE, $x, $y, $direction) {
        $speed = 400;
        $damage = 50;
        $query = 'INSERT INTO entity_bullets (`uuid`, `sessions_id`, `users_id`, `x`, `y`, `direction`, `damage`, `speed`) VALUES ("'.uniqid().'",'.$userE['sessions_id'].','.$userE['users_id'].','.$x.','.$y.','.$direction.','.$damage.','.$speed.')';

        return $this->db->query($query);
    }

    function setBulletPos($bulletId, $pos) {
        $query = 'UPDATE entity_bullets SET x = '.$pos[0].', y = '.$pos[1].' WHERE entity_bullets.id = '.$bulletId;

        return $this->db->query($query);
    }

    function addStat($userId) {
        $query = 'INSERT INTO stats_users (users_id) VALUES ('.$userId.')';

        return $this->db->query($query);
    }

    function addStatValue($usersId, $statName, $value) {
        $query = 'UPDATE stats_users SET '.$statName.' = '.$statName.'+'.$value.' WHERE stats_users.users_id = '.$usersId;

        return $this->db->query($query);
    }

    function setStatValue($usersId, $statName, $value) {
        $query = 'UPDATE stats_users SET '.$statName.' = '.$value.' WHERE stats_users.users_id = '.$usersId;

        return $this->db->query($query);
    }
}