<?php

class ChatManager {
  function __construct($db) {
    $this->db = $db;
  }

  function get($sessions_id) {
    $dbMessages = $this->db->getMessagesBySession($sessions_id);
    $messages = array();

    foreach($dbMessages as $dbMessage) {
      array_push($messages, $dbMessage);
    }

    return $messages;
  }

  function createMessage($sessions_id, $users_id, $content) {
    return $this->db->addMessage($sessions_id, $users_id, $content, time());
  }

  function clearOldMessages($sessions_id, $time) {
    return $this->db->query('DELETE FROM messages WHERE messages.sessions_id = '.$sessions_id.' AND messages.time + 10 < '.$time);
  }
}