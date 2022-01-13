<?php

class Hash {
    function __construct() {
        $this->hashWord = 'crybAbycry01';
    }

    function getHash($password) {
        return md5($password.$this->hashWord);
    }

    function getTokenHash($password) {
        return md5($password.uniqid(rand(1000,5000)));
    }
}