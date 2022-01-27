class Server {

    token = localStorage.getItem('token');
    time = -1;
    isAwaitingUpdate = false;
    isAwaitingControl = false;

    async request(url) {
        const res = await fetch(url);
        const answer = await res.json();

        return answer;
    } 

    async login(name, password) {
        const data = await this.request(`/api/?method=login&name=${name}&pass=${password}`);

        switch (data.status) {
            case STATUS.OK: {
                console.log(`Успешный вход в аккаунт с ником ${name}`)
                this.token = data.data.token;
                localStorage.setItem('token', this.token);
                break;
            }
            case STATUS.ERROR: {
                game.state.errorNotification(data.data, () => {game.state.hideError()});
                break;
            }

            default: {
                console.log(`Неизвестный статус ${data.status}`);
                break;
            }
        }

        return data;
    }

    async register(name, password) {
        const data = await this.request(`/api/?method=register&name=${name}&pass=${password}`);

        switch (data.status) {
            case STATUS.OK: {
                this.token = data.data.token;
                localStorage.setItem('token', this.token);
                break;
            }

            case STATUS.ERROR: {
                game.state.errorNotification(data.data,() => {game.state.hideError()});
                break;
            }

            default: {
                console.log(`Неизвестный статус ${data.status}`);
                break;
            }
        }

        return data;
    }

    async auth() {
        return await this.request(`/api/?method=auth&token=${this.token}`);
    }

    async leave() {
        const data = await this.request(`api/?method=disconnect&token=${localStorage.getItem('token')}`);

        switch (data.status) {
            case STATUS.ERROR: {
                game.state.errorNotification(data.data,() => {game.state.hideError()});
                break;
            }
        }
    }

    async connect(sessionId) {
        console.log(`Подключение к серверу...`)
        const data = await this.request(`api/?method=connect&token=${localStorage.getItem('token')}&session=${sessionId}`);

        switch (data.status) {
            case STATUS.OK: {
                console.log(`Подключение к серверу завершено успешно.`);
                console.log(`Получение данных сессии...`);
                const roomData = await this.request(`api/?method=updateGameData&token=${localStorage.getItem('token')}`);
                this.time = data.data.time;

                console.log(roomData);

                switch (roomData.status) {
                    case STATUS.OK: {
                        this.createScene(data.data, roomData);
                        break;
                    }
                    case STATUS.ERROR: {
                        game.state.errorNotification(roomData.data, () => {game.state.hideError()});
                        break;
                    }

                }
                console.error(roomData);
                break;
            }

            case STATUS.ERROR: {
                game.state.errorNotification(data.data, () => {game.state.hideError()});
            }
        }
    }

    async update() {
        if (this.isAwaitingUpdate)
            return;

        this.isAwaitingUpdate = true;
        const data = await this.request(`api?method=updateGameData&token=${this.token}&rotation=${game.state.playerRotation}&time=${new Date().getTime()}`);
        this.isAwaitingUpdate = false;
        game.timer.pocketsGTick++;

        if (game.state.getName() != "game")
            return 1;

        switch (data.status) {
            case STATUS.OK: {
                game.timer.pingCounter.push((new Date().getTime()) - data.data.time);
                this.syncScene(data.data);
                break;
            }

            case STATUS.ERROR: {
                game.state.errorNotification(data.data, () => {game.state.hideError()});
                break;
            }
        }
    }

    createScene(dataSession, dataGame) {
        const player = dataGame.data?.user;
        const entities = dataGame.data?.entities;

        console.log(`Данные получены. Сущностей: ${entities?.length} Игрок: ${player?.name}`);
        game.state = new PlayState(dataSession.session_id, dataSession.map);

        entities.forEach((entity) => {
            game.state.addEntity(entity);
        })

        if (dataSession.helloMessage)
            game.state.chat.addSystemMessage(dataSession.helloMessage);

        game.state.camera.follow(game.state.entities.get(player.name));
    }

    syncScene(data) {
        const serverEntities = data.entities;
        const clientEntities = game.state.entities;
        const player = data.user;

        /**
         * Entities
         */
        serverEntities.forEach((serverEntity) => {
            const clientEntity = clientEntities.get(serverEntity.name);

            // Существует ли сущность на клиенте, если нет - добавляем
            if (!clientEntity)
                return this.addEntity(serverEntity);

            clientEntity.timeToChangeState--;
  
            // Сдвинулась ли сущность на сервере, если да - сдвигаем и на клиенте
            let serverPos = [Number(serverEntity.pos[0]),Number(serverEntity.pos[1])];
            if (clientEntity.pos[0] != serverPos[0] || clientEntity.pos[1] != serverPos[1])
                clientEntity.setPos(serverPos);

            if (clientEntity.direction != serverEntity.direction)
                clientEntity.direction = serverEntity.direction;

            if (clientEntity.health != Number(serverEntity.health)) {
                clientEntity.health = Number(serverEntity.health);
            }

            if (clientEntity.textureName != serverEntity.skin)
                clientEntity.setSkin(serverEntity.skin);

            if (clientEntity.timeToChangeState < 1) {
                clientEntity.state = "idle";
            }
        })

        // Существует ли сущность на сервере, если нет - удаляем
        clientEntities.forEach((clientEntity) => {
            let isEntityExistOnServer = false;

            serverEntities.forEach((serverEntity) => {
                if (clientEntity.name == serverEntity.name)
                    isEntityExistOnServer = true;
            })

            if (!isEntityExistOnServer)
                this.removeEntity(clientEntity);
        })

        /**
         * Chat
         */

        const serverChat = data.chat;
        const clientChat = game.state.chat.messages;

        serverChat.forEach((serverMessage) => {
            let isExistOnClient = false;

            clientChat.forEach((clientMessage) => {
                if (serverMessage.id == clientMessage.id) 
                    isExistOnClient = true;
            })

            if (!isExistOnClient && clientChat[clientChat.length - 1].time < serverMessage.time)
                game.state.chat.addMessage(serverMessage);
        })

        /**
         * Events
         */

        const serverEvents = data.events;
        const clientEvents = game.state.announcer.events;

        serverEvents.forEach((serverEvent) => {
            let isExistOnClient = false;

            clientEvents.forEach((clientEvent) => {
                if (serverEvent.id == clientEvent.id)
                    isExistOnClient = true;
            })

            if (!isExistOnClient && this.time < serverEvent.time && (clientEvents.length < 1 || clientEvents[clientEvents.length - 1].time) < serverEvent.time)
                game.state.announcer.addEvent(serverEvent);
        })
    }

    addEntity(entity) {
        if (!entity.skin && false)
            entity.skin = `default`;

        game.state.addEntity(entity);

        if (entity.type == ENTITY_TYPE.PLAYER) {
            game.state.chat.addSystemMessage(`Игрок ${entity.name} подключен.`);
        }
    }

    removeEntity(entity) {
        game.state.entities.delete(entity.name);

        if (entity.type == ENTITY_TYPE.PLAYER) {
            game.state.chat.addSystemMessage(`Игрок ${entity.name} отключен.`);
        }
    }

    async control(data) {
        if (this.isAwaitingControl)
            return;

        this.isAwaitingControl = true;
        let request = `api?method=control&token=${this.token}`;

        if (data.move)
            request+= `&x=${data.move.x}&y=${data.move.y}`;

        if (data.rotation)
            request+= `&rotation=${Math.round(data.rotation)}`;

        if (data.isShot)
            request+= `&isShot=1`;
        
        request+= `&time=${new Date().getTime()}`;

        const answer = await this.request(request);
        this.isAwaitingControl = false;
        game.timer.pocketsSTick++;

        switch (answer.status) {
            case STATUS.OK: {
                game.timer.pingCounter.push(new Date().getTime() - answer.data.time);
                break;
            }
            case STATUS.ERROR: {
                game.state = new AuthState();
                game.state.errorNotification(answer.data, () => {game.state.hideError()});
                break;
            }    
        }
    }

    async getOpenSessions() {
        const data = await this.request(`api?method=getSessions&token=${this.token}`);

        switch (data.status) {
            case STATUS.OK: {
                return data.data;
            }
        }
    }

    async getTopPlayers() {
        const data = await this.request(`api?method=getTopPlayers&token=${this.token}`);

        switch (data.status) {
            case STATUS.OK: {
                return data.data;
            }
        }
    }

    async sendChat(content) {
        const data = await this.request(`api?method=sendMessageOnChat&token=${this.token}&content=${content}`);
    }
}