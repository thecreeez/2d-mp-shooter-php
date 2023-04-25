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

    function query($query) {
        return $this->db->query($query);
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

    function updateUserEntity($userE_id, $x, $y, $health, $rotation) {
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

        $query = $query.' WHERE entity_users.id = '.$userE_id;

        return $this->db->query($query);
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
        $query = 'DELETE FROM entity_users WHERE `users_id` = '.$userE['users_id'];

        return $this->db->query($query);
    }

    function removeUserEntityCooldowns($userE) {
        $query = 'DELETE FROM cooldowns_users WHERE users_id = '.$userE['users_id'];

        return $this->db->query($query);
    }

    function getCooldownsByUserEntity($userE) {
        $query = 'SELECT * FROM cooldowns_users WHERE users_id = '.$userE['users_id'];

        return $this->db->query($query);
    }

    function getBulletEntitiesBySessionOrderByExpression($sessions_id, $expression) {
        $query = 'SELECT * FROM entity_bullets WHERE `entity_bullets`.`sessions_id` = '.$sessions_id.' ORDER BY ('.$expression.') LIMIT 70';

        return $this->db->query($query);
    }
    
    function addBulletEntity($userE, $x, $y, $direction) {
        $speed = 400;
        $damage = 50;
        $query = 'INSERT INTO entity_bullets (`uuid`, `sessions_id`, `users_id`, `x`, `y`, `direction`, `damage`, `speed`) VALUES ("'.uniqid().'",'.$userE['sessions_id'].','.$userE['users_id'].','.$x.','.$y.','.$direction.','.$damage.','.$speed.')';

        return $this->db->query($query);
    }

    function setBulletsPosBySessionId($sessions_id, $x, $y) {
        $query = 'UPDATE entity_bullets SET x = '.$x.', y = '.$y.' WHERE sessions_id = '.$sessions_id;

        return $this->db->query($query);
    }

    function deleteBulletsByPosByExpressionSessionId($sessions_id, $expression) {
        $query = 'DELETE FROM entity_bullets WHERE sessions_id = '.$sessions_id.' AND ('.$expression.')';

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

    function getStatsByUserId($userId) {
        $query = 'SELECT * FROM stats_users WHERE stats_users.users_id = '.$userId;

        return $this->db->query($query);
    }

    function addMessage($sessions_id, $users_id, $content, $time) {
        $query = 'INSERT INTO messages (sessions_id, users_id, content, time) VALUES ('.$sessions_id.','.$users_id.',"'.$content.'",'.$time.')';

        return $this->db->query($query);
    }

    function getMessagesBySession($sessions_id) {
        $query = 'SELECT messages.*, users.name FROM messages INNER JOIN users WHERE users.id = messages.users_id AND messages.sessions_id = '.$sessions_id;

        return $this->db->query($query);
    }
}