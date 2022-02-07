<?php

class SessionManager {

    function __construct($db) {
        $this->db = $db;
    }

    function getSession($id) {
        return $this->db->getSession('id', $id);
    }

    function getAll() {
        $sessions = $this->db->getSessions();
        $sessionsArr = array();

        foreach($sessions as $session) {
            $online = $this->db->getSessionOnline($session['id'])[0];
            array_push($sessionsArr,
                array(
                    'id' => $session['id'],
                    'max_players' => $session['max_players'],
                    'name' => $session['name'],
                    'hello_message' => $session['hello_message'],
                    'status' => $session['status'],
                    'current_players' => $online,
                )
            );
        }

        return $sessionsArr;
    }

    function getSessionData($id) {
        $sessionDB = $this->db->getSession('id', $id);
        $online = $this->db->getSessionOnline($session['id'])[0];

        $session = array();

        $session['id'] = $sessionDB['id'];
        $session['name'] = $sessionDB['name'];
        $session['max_players'] = $sessionDB['max_players'];
        $session['online'] = $online;
        $session['status'] = $sessionDB['status'];

        return $session;
    }

    function getUsersInSession($id) {
        $users = $this->db->getUsersInSession($id);
        $usersF = array();

        foreach ($users as $user) {
            array_push($usersF,
                array(
                    'name' => $user['name'],
                    'rating' => $user['rating']
                )
            );
        };

        return $usersF;
    }

    function getEntityUsersInSession($id) {
        $entityUsers = $this->db->getEntityUsersInSession('sessions_id', $id);
        $userEntitiesArray = array();

        foreach ($entityUsers as $entity) {
            array_push($userEntitiesArray, $entity);
        }

        return $userEntitiesArray;
    }

    function createSessionOwnedByUser($user, $max_players, $type, $name, $hello_message) {
        $this->createSession($max_players, $type, $name, $hello_message);

        $users_id = $user['id'];
        $sessions_id = $this->db->query('SELECT LAST_INSERT_ID();')->fetch()[0];

        return $this->db->query('INSERT INTO `sessions_owners` (`sessions_id`, `users_id`) VALUES ('.$sessions_id.','.$users_id.')');
    }

    function createSession($max_players, $type, $name, $hello_message) {
        return $this->db->query('INSERT INTO `sessions` (`max_players`, `type`, `name`, `hello_message`) VALUES ('.$max_players.', "'.$type.'", "'.$name.'", "'.$hello_message.'")');
    }

    function getSessionsByOwner($users_id) {
        return $this->db->query('SELECT sessions.*, sessions_owners.users_id FROM sessions, sessions_owners WHERE sessions.id = sessions_owners.sessions_id AND sessions_owners.users_id = '.$users_id);
    }

    function getCountOwnedSessions($users_id) {
        return $this->db->query('SELECT COUNT(*) FROM sessions, sessions_owners WHERE sessions.id = sessions_owners.sessions_id AND sessions_owners.users_id = '.$users_id)->fetch();
    }

    function clearSessionsByOwner($users_id) {
        return $this->db->query('DELETE sessions, sessions_owners FROM sessions INNER JOIN sessions_owners WHERE sessions.id = sessions_owners.sessions_id AND sessions_owners.users_id = '.$users_id);
    }

    function setLastUpdate($sessions_id, $miliTime) {
        return $this->db->query('UPDATE sessions SET last_update = '.$miliTime.' WHERE sessions.id = '.$sessions_id);
    }
}