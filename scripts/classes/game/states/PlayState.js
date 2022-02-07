class PlayState extends GameState {

    constructor(roomId, map) {
        super();
        this.name = 'game';

        this.playerEntity = undefined;

        this.map = maps["chill"];

        this.camera = new Camera();
        this.camera.FOV = CONFIG.camera.defaultFOV;

        this.chat = new Chat();
        this.healthBar = new HealthBar();
        this.cooldownBar = new CooldownBar();

        this.announcer = new Announcer();

        this.death = {
            ui: new TextUI({
                align: ALIGN.CENTER,
                color: 'white',
                pos: [canvas.width / 2, canvas.height - 200],
                size: 20,
                text: "Вы погибли..."
            })
        }

        game.roomId = roomId;

        this.items = new Map();
        this.entities = new Map();

        this.isMenuOpen = false;

        this.hoverEntity = null;

        this.textures = {
            arrow: new Texture(`icons`,`play`,`arrow`,`yellowArrow`)
        }

        //canvas.style.cursor = "none"
    }

    async serverUpdate() {
        game.server.update();
        kd.tick();

        const player = game.state.entities.get(game.playerName);

        if (!player)
            return game.setState("menu")

        const mouseVec = new Vector2(getWorldMousePos());
        const playerVec = new Vector2(player.pos);
        mouseVec.substract(playerVec);

        this.playerRotation = mouseVec.getAngle();

        const data = {
            isControlled: false
        };

        if (move.x != 0 || move.y != 0) {
            data.move = {x: move.x, y: move.y};
            data.isControlled = true;
        }
        if (move.isShooting) {
            data.isShot = true;
            data.isControlled = true;
        }
        if (player.rotation != this.playerRotation) {
            data.rotation = this.playerRotation;
            data.isControlled = true;
        }

        if (data.isControlled)
            game.server.control(data);
    }

    clientUpdate() {
        this.entities.forEach((entity) => {
            entity.update();

            entity.animation.frameCount++;

            if (entity.animation.isReverse && entity.state == "moving")
                entity.animation.frameCount+=0.75;

            if (entity.state != "idle") {
                entity.animation.frameStateCount++;
            }
        })

        if (CONFIG.GUI.isEnable) {
            if (CONFIG.chat.isEnable)
                this.chat.update();
            this.healthBar.update();
            this.cooldownBar.update();
            this.announcer.update();
        }

        if (!this.playerEntity)
            this.playerEntity = this.entities.get(game.playerName);
    }

    render() {
        const renderArrow = () => {
            ctx.rotate((game.state.playerRotation + 90) * Math.PI / 180);
            ctx.drawImage(this.textures["arrow"].get(), -20 * game.state.camera.FOV, -60 * game.state.camera.FOV, 40 * game.state.camera.FOV, 20 * game.state.camera.FOV);
            ctx.rotate((-game.state.playerRotation - 90) * Math.PI / 180);
        };

        ctx.save();
        this.camera.update();
        this.map.renderBack();

        const entityToRender = [];
        this.entities.forEach((entity) => {
            entityToRender.push(entity);
        })
        entityToRender.sort((a, b) => a.pos[1] > b.pos[1] ? 1 : -1);

        entityToRender.forEach((entity) => {
            if (entity.type == "player" && entity.data.serverState == PLAYER_SERVER_STATES.DEAD)
                return;

            if (entity.name == game.playerName)
                return entity.render(renderArrow);

            entity.render();
        })

        this.map.renderFront();

        ctx.restore();

        if (this.isMenuOpen) {
            ctx.fillStyle = `rgba(0,0,0,0.7)`;
            ctx.fillRect(canvas.width / 2 - 110, 140, 220, 120);

            ctx.fillStyle = `white`;
            ctx.fillText(`session id:${game.roomId}`, canvas.width / 2 - 100, 240)
        };

        if (CONFIG.GUI.isEnable) {
            if (CONFIG.chat.isEnable)
                this.chat.render();
            this.healthBar.render();
            this.cooldownBar.render();
            this.announcer.render();

            if (this.playerEntity.data.serverState == "DEAD")
                this.death.ui.render();
        }
        
        
        this.items.forEach((item) => item.render());
    }

    addEntity(entity) {
        let newEntity;

        switch (entity.type) {
            case ENTITY_TYPE.PLAYER: {
                newEntity = new Player({
                    name: entity.name,
                    pos: [Number(entity.pos[0]),Number(entity.pos[1])],
                    state: "idle",
                    team: "red",
                    type: entity.type,

                    direction: DIRECTION.RIGHT,

                    maxHealth: Number(entity.maxHealth),
                    health: Number(entity.health),

                    data: {
                        cooldowns: entity.cooldowns
                    },

                    textureName: entity.skin
                })
                break;
            }

            case ENTITY_TYPE.BULLET: {
                newEntity = new Bullet({
                    bulletId: entity.name,
                    owner: entity.playerName,
                    pos: [Number(entity.pos[0]),Number(entity.pos[1])],
                    state: "idle",
                    size: [20,20],
                    type: entity.type,

                    direction: Number(entity.direction)
                })
                break;
            }
        }

        this.entities.set(entity.name, newEntity);
    }

    showMenu() {
        this.items.set("menu0", new ButtonUI({
            pos:[canvas.width / 2 - 100, 170],
            size:[200,20],
            text:"Вернуться", 
            onclick: () => {
                this.hideMenu();
                this.isMenuOpen = false;
            }
        }))
        this.items.set("menu1", new ButtonUI({
            pos:[canvas.width / 2 - 100, 200],
            size:[200,20],
            text:"Выйти",
            onclick: () => {
                game.server.leave();
                game.state = new MenuState();
                game.state.showOpenedSessions();
                console.log(`Выход из игры...`)
            }
        }))

        this.isMenuOpen = true;
    }

    hideMenu() {
        this.items.delete("menu0");
        this.items.delete("menu1");
        this.isMenuOpen = false;
    }
    
    keyboardPress(code,key) {
        super.keyboardPress(key);
        if (this.chat.isOpen) {
            switch (code) {
                case "Escape": {
                    this.chat.hide();
                    break;
                }
                case "Enter": {
                    this.chat.send();
                    break;
                }
                case "Backspace": {
                    this.chat.erase();
                    break;
                }
                default: {
                    this.chat.write(key);
                }
            }

            return true;
        }

        switch (code) {
            case "Escape": {
                    if (this.isMenuOpen) {
                        this.hideMenu();
                    } else {
                        this.showMenu();
                    }

                break;
            }

            case "KeyT": {
                if (this.isMenuOpen || !CONFIG.chat.isEnable) 
                    return true;

                this.chat.show();
            }
        }
    }
}