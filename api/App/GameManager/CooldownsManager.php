<?php

class CooldownManager {
  function __construct($db) {
      $this->db = $db;
  }

  function get($userE) {
    return $this->db->getCooldownsByUserEntity($userE)->fetch();
  }

  function setCooldown($userE, $cooldownName, $value) {
    return $this->db->query('
      UPDATE 
        cooldowns_users
      SET 
        '.$cooldownName.'_cooldown = '.$value.' 
      WHERE 
        cooldowns_users.users_id = '.$userE['users_id']
    );
  }

  function update($sessions_id) {
    return $this->db->query('
      UPDATE 
        cooldowns_users, 
        entity_users 
      SET 
        shot_cooldown = IF( shot_cooldown > 0, shot_cooldown - 1, shot_cooldown ) 
      WHERE 
        cooldowns_users.users_id = entity_users.users_id AND 
        entity_users.sessions_id = '.$sessions_id
    );
  }
}