<?php

header('Content-Type: application/json; charset=utf-8');
require_once('App/App.php');

require_once('App/Database.php');

function router($params) {
    $app = new Application();
    $db = new Database();
    $method = $params['method'];

    switch ($method) {
        // Авторизация
        case 'register': return $app->register($params);
        case 'login': return $app->login($params);
        case 'auth': return $app->auth($params);

        // Меню
        case 'getTopPlayers': return $app->top($params);
        case 'getSessions': return $app->sessions($params);

        // Подключение к сессиям
        case 'connect': return $app->connect($params);
        case 'disconnect': return $app->disconnect($params);

        // Получение данных игры
        case 'updateGameData': return $app->updateGameData($params);

        // Движение/Выстрелы/Поворот персонажа
        case 'control': return $app->control($params);

        // Отправить сообщение в чат
        case 'sendMessageOnChat': return $app->sendMessageOnChat($params);

        case 'getDamage': return $app->getDamage($params);

        // Дебаг штука не для чего по прикольчику =)
        case 'debug': return $app->debug($params);

        case 'shitMethod': {
            $userId = $params['id'];
            $x = $params['x'];

            $db->customQuery('UPDATE entity_users SET x = '.$x.' WHERE entity_users.users_id = '.$userId);

            return false;
        }

        // Если не нашелся метод
        default: return $app->unexpectedMethod($params);
    }
}

echo json_encode(router($_GET));