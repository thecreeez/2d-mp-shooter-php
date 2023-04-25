<?php

class PredicateManager {

    function __construct() {
        $this->isRespawnPredicate = 'entity_users.state = "DEAD" AND respawn_cooldown = -1';
    }

    function isRespawn($yes, $no) {
        return 'IF('.$this->isRespawnPredicate.','.$yes.','.$no.')';
    }
}