<?php

require_once('App/Answer.php');
require_once('App/Database.php');

require_once('App/AuthManager/AuthManager.php');
require_once('App/UserManager/UserManager.php');
require_once('App/SessionManager/SessionManager.php');
require_once('App/GameManager/GameManager.php');

class Application {

    function __construct() {
        $this->answer = new Answer();

        $db = new Database();

        // Все методы для авторизации/регистрации/аутентификации
        $this->authManager = new AuthManager($db);

        // Все методы для получения/изменения данных в таблице users
        $this->userManager = new UserManager($db);

        // Все методы для получения данных о сессиях и для взаимодействия игроков с сессиями (подкл./откл.)
        $this->sessionManager = new SessionManager($db);

        // Все методы для взаимодействия между игроком и игрой
        $this->gameManager = new GameManager($db);
    }

    /**
     * AuthManager
     */
    public function register($params) {
        $name = $params['name'];
        $password = $params['pass'];

    // Проверяется:

        // Используется ли ник системой
        if (in_array($name, $this->authManager->systemNames))
            return $this->answer->error('name '.$name.' is reserved by a system.');
        
        // Длина ника больше 4
        if (strlen($name) < 4)
            return $this->answer->error('min symbols in name 4 char.');

        // Длина ника меньше 25
        if (strlen($name) > 24)
            return $this->answer->error('max symbols in name 24 char.');

        // Пароль не меньше 8 символов
        if (strlen($password) < 8)
            return $this->answer->error('min symbols in pass 8 char.');

        // Пароль не больше 32 символов
        if (strlen($password) > 32)
            return $this->answer->error('max symbols in pass 32 char.');

        // Есть ли уже пользователь с таким же ником
        if ($this->userManager->getByName($name))
            return $this->answer->error('user with this name already exists.');

        $data = $this->authManager->register($name,$password);

        $user = $this->userManager->getByName($name);
        $data['additional'] = $this->gameManager->createStats($user);

        return $this->answer->success($data);
    }

    public function login($params) {
        $name = $params['name'];
        $password = $params['pass'];

        // Возвращает новый сгенерированный токен и данные игрока.
        $data = $this->authManager->login($name, $password);

        // Если пароль неверный то возвращает false
        if (!$data)
            return $this->answer->error('name or pass is not correct.');

        return $this->answer->success($data);
    }

    public function auth($params) {
        $token = $params['token'];

        $user = $this->userManager->getByToken($token);

        // Если пользователь по токену не обнаружен
        if (!$user)
            return $this->answer->error('token isn\'t valid.');

        $userData = array(
            'name' => $user['name'],
            'rating' => $user['rating']
        );

        // Возвращает его данные
        return $this->answer->success($userData);
    }

    // Возвращает топ игроков по рейтингу
    public function top($params) {
        return $this->answer->success($this->userManager->getTopPlayers());
    }

    // Возвращает все сессии
    public function sessions($params) {
        return $this->answer->success($this->sessionManager->getAll());
    }

    public function connect($params) {
        $token = $params['token'];
        $sessions_id = $params['session'];

        $user = $this->userManager->getByToken($token);

        if (!$user)
            return $this->answer->error('token isn\'t valid.');

        $session = $this->sessionManager->getSession($sessions_id);

        if (!$session)
            return $this->answer->error('Session '.$sessions_id.' isn\'t exist.');

        //userE = userEntity (Сущность в сессии которая управляется игроком)
        $userE = $this->userManager->getUserEntity('token', $token);

        $data = array(
            'session_id' => $sessions_id,
            'helloMessage' => $session['hello_message']
        );

        if (!$userE) {
            $this->userManager->addUserEntity($user, $sessions_id, 'blue');
            return $this->answer->success($data);//'Successfully connected added entity.');
        }

        if ($userE['sessions_id'] != $sessions_id) {
            $this->userManager->removeUserEntity($userE);
            $this->userManager->addUserEntity($user, $sessions_id);

            return $this->answer->success($data);//'Successfully moved from '.$userE['sessions_id'].' to '.$sessions_id);
        }

        return $this->answer->success($data);
    }

    public function disconnect($params) {
        $token = $params['token'];

        $userE = $this->userManager->getUserEntity('token', $token);

        if ($userE) {
            $this->userManager->removeUserEntity($userE);
            return $this->answer->success('User successfully leaved from session '.$userE['sessions_id']);
        }

        return $this->answer->error('User already wasn\'t in sessions.');
    }

    // Возвращает ошибку при неверном методе
    public function unexpectedMethod($params) {
        $method = $params['method'];

        return $this->answer->error('Unexpected method: '.$method);
    }

    public function updateGameData($params) {
        $token = $params['token'];
        $time = $params['time'];
        $userE = $this->userManager->getUserEntity('token', $token);

        if (!$userE)
            return $this->answer->error('User isn\'t any session.');

        $user = $this->userManager->getByToken($token);
        $session = $this->sessionManager->getSession($userE['sessions_id']);

        $data = $this->gameManager->getData($userE, $session);
        $data['time'] = $time;
        $data['user'] = array(
            'name' => $user['name']
        );

        $data['debug'] = array(
            'query' => 'SELECT entity_users.*, users.name, users.rating FROM entity_users INNER JOIN users, sessions WHERE users.id = entity_users.users_id AND sessions.'.'id'.' = "'.$userE['sessions_id'].'"'
        );

        return $this->answer->success($data);
    }

    public function control($params) {
        $token = $params['token'];
        $time = $params['time'];

        $userE = $this->userManager->getUserEntity('token', $token);

        if (!$userE)
            return $this->answer->error('User isn\'t any session or token wrong.');


        $x = $params['x'];
        $y = $params['y'];

        $rotation = $params['rotation'];

        $isShot = $params['isShot'];

        $debug = $this->gameManager->control($userE, array($x, $y), $rotation, $isShot);

        return $this->answer->success(array(
            'time' => $time,
            'debug' => $debug
        ));
    }

    public function debug($params) {
        $token = $params['token'];

        $data = $this->gameManager->getData($userE, $session);

        $userE = $this->userManager->getUserEntity('token', $token);
        return $this->answer->success(array(
            'userE' => $userE,
            'token' => $token,
            'query' => 'SELECT entity_users.* FROM entity_users INNER JOIN users WHERE users.token = "'.$token.'"'
        ));
    }
}