<?php

require_once('App/AuthManager/Hash.php');

class AuthManager {
    function __construct($db) {
        $this->hash = new Hash();

        $this->db = $db;

        $this->systemNames = array(
            'SYSTEM',
            'sadmirror',
            'sadmurror'
        );
    }

    function register($name, $pass) {
        $hashedPassword = $this->hash->getHash($pass);
        $token = $this->hash->getTokenHash($hashedPassword);

        $this->db->pushUser($name, $hashedPassword, $token);

        $userData = array(
            'token' => $token,
            'name' => $name,
            'rating' => 1000
        );

        return $userData;
    }

    function login($name, $pass) {
        $hashedPassword = $this->hash->getHash($pass);

        $user = $this->db->getUser('name', $name);

        if ($user) {

            if ($user['password'] != $hashedPassword)
                return false;

            $token = $this->generateToken($user);
            $userData = array(
                'token' => $token,
                'name' => $user['name'],
                'rating' => $user['rating']
            );

            $this->db->setUserToken($user['id'], $token);
            return $userData;
        }

        return false;
    }

    function auth($token) {
        $user = $this->db->getUser('token', $token);

        if ($user) {
            $userData = array(
                'name' => $user['name'],
                'rationg' => $user['rating']
            );

            return $userData;
        }

        return false;
    }

    private function generateToken($user) {
        return $this->hash->getTokenHash($user['password']);
    }
}