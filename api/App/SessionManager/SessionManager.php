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
}