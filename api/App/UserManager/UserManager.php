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
        $this->db->addUserEntityCooldowns($user);
        return $this->db->addUserEntity($user, $sessions_id);
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