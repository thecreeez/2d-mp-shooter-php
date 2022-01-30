<?php

header('Content-Type: application/json; charset=utf-8');
require_once('App/App.php');

function router($params) {
    $app = new Application();
    $method = $params['method'];

    switch ($method) {
        case 'register': return $app->register($params);
        case 'login': return $app->login($params);
        case 'auth': return $app->auth($params);
    
        case 'getTopPlayers': return $app->top($params);
        case 'getSessions': return $app->sessions($params);
        case 'getStats': return $app->getStats($params);
    
        case 'connect': return $app->connect($params);
        case 'disconnect': return $app->disconnect($params);
    
        case 'updateGameData': return $app->updateGameData($params);
    
        case 'control': return $app->control($params);
        case 'sendMessageOnChat': return $app->sendMessageOnChat($params);
    
        case 'debug': return $app->debug($params);
    
        default: return $app->unexpectedMethod($params);
    }
}

echo json_encode(router($_GET));