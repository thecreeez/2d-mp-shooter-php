<?php

class StatManager {
  function __construct($db) {
      $this->db = $db;
  }

  function createStats($user) {
    return $this->db->addStat($user['id']);
  }

  function addStat($usersId, $statName, $value) {
    return $this->db->addStatValue($usersId, $statName, $value);
  }

  function setStat($usersId, $statName, $value) {
    return $this->db->addStatValue($usersId, $statName, $value);
  }
}