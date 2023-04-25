<?php

class UserManager {
    function __construct($db) {
        $this->db = $db;
    }

    function getByName($name) {
        return $this->db->getUser('name', $name);
    }

    function getByToken($token) {
        return $this->db->getUser('token', $token);
    }

    function getTopPlayers() {
        return $this->db->getTopUsers();
    }

    function getUserEntity($field, $value) {
        return $this->db->getUserEntityByUser($field, $value);
    }

    function addUserEntity($user, $sessions_id) {
        return $this->db->query('
            INSERT INTO entity_users (`users_id`, `sessions_id`) VALUES ('.$user['id'].', '.$sessions_id.');
            INSERT INTO cooldowns_users (`users_id`) VALUES ('.$user['id'].');
            ');
    }

    function removeUserEntity($userE) {
        return $this->db->removeUserEntity($userE);
    }

    function removeUserEntityStats($userE) {
        return $this->db->removeUserEntityCooldowns($userE);
    }

    function getStats($user) {
        return $this->db->getStatsByUserId($user['id'])->fetch();
    }
}