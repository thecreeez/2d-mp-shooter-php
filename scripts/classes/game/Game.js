class Game {

    constructor() {
        this.server = new Server();
        this.audio = new Sound();
        this.playerName = undefined;

        this.timer = {
            fps: 0,
            ups: 0,
            pocketsG: 0,
            pocketsS: 0,
            ping: 0,

            getFPS() {
                return this.fps;
            },

            getUPS() {
                return this.ups;
            },

            fpsTick: 0,
            upsTick: 0,
            pocketsTick: 0,
            pingCounter: []
        }

        this.isDebug = true;

        this.state = new AuthState(this);
        this.getState();
    }

    async getState() {
        if (localStorage.getItem('token')) {
            const data = await this.server.auth();

            if (data.status == STATUS.ERROR) 
                return new AuthState();
            
            console.log(`Успешный вход по заданному токену.`)
            game.playerName = data.data.name;
            game.rating = data.data.rating;
            this.state = new MenuState();

            if (data.data.isPlaying)
                this.state.showBackBtn();
        } else {
            this.state = new AuthState();
        }
    }

    setState(name) {
        switch (name) {
            case "auth": {
                this.state = new AuthState();
                break;
            }
            case "menu": {
                this.state = new MenuState();
                break;
            }
        }
    }

    serverUpdate() {
        this.state.serverUpdate();
    }

    clientUpdate() {
        this.state.clientUpdate();

        this.timer.upsTick++;
    }

    timerUpdate() {
        this.timer.fps = this.timer.fpsTick;
        this.timer.ups = this.timer.upsTick;
        this.timer.pocketsG = this.timer.pocketsGTick;
        this.timer.pocketsS = this.timer.pocketsSTick;

        let summPing = 0;
        this.timer.pingCounter.forEach((ping) => {
            summPing+=ping;
        })

        this.timer.ping = Math.floor(summPing / this.timer.pingCounter.length);

        if (isNaN(game.timer.ping))
            this.timer.ping = `>2000`;

        this.timer.pingCounter = [];

        this.timer.pocketsGTick = 0;
        this.timer.pocketsSTick = 0;
        this.timer.fpsTick = 0;
        this.timer.upsTick = 0;
    }

    render() {
        ctx.clearRect(0,0,canvas.width,canvas.height);
        this.state.render();

        if (this.isDebug) {
            this.drawDebug();
        }

        this.timer.fpsTick++;
    }

    drawDebug() {
        let size = 15;

        let stringNum = 1;

        ctx.font = `${size}px arial`;
        ctx.fillStyle = `white`;

        ctx.fillText(`state:${this.state.name}`,5,0 + size * stringNum);
        stringNum++;

        ctx.fillText(`fps:${this.timer.fps}`,5,0 + size * stringNum);

        stringNum++;
        ctx.fillText(`ups:${this.timer.ups}`,5,0 + size * stringNum);

        stringNum++;
        ctx.fillText(`pockets: g:${this.timer.pocketsG} s:${this.timer.pocketsS}`,5,0 + size * stringNum);

        stringNum++;
        ctx.fillText(`ping:${this.timer.ping}ms`,5,0 + size * stringNum);
        stringNum++;

        if (this.state.playerRotation) {
            stringNum++;
            ctx.fillText(`rotation:${Math.round(this.state.playerRotation)}`,5,0 + size * stringNum);
        }

        if (this.state.entities) {
            stringNum++;
            ctx.fillText(`entities:${this.state.entities.size}`,5,0 + size * stringNum);
        }

        if (this.state.map) {
            stringNum++;
            ctx.fillText(`gameObjects:${this.state.map.gameObjects.length}`,5,0 + size * stringNum);
        }

        if (this.state.camera) {
            stringNum++;
            ctx.fillText(`camPos:[${this.state.camera.pos}]`,5,0 + size * stringNum)

            stringNum++;
            ctx.fillText(`camFOV:${Math.floor(this.state.camera.FOV * 100) / 100}`,5,0 + size * stringNum)

            if (this.state.camera.entityToFollow) {
                stringNum++;
                stringNum++;

                ctx.fillText(`camEntity:`,5,0 + size * stringNum)

                if (this.state.camera.entityToFollow.type == "player") {
                    stringNum++;
                    ctx.fillText(`name:${this.state.camera.entityToFollow.name}`, 8,0 + size * stringNum);
                }

                stringNum++;
                ctx.fillText(`pos:[${this.state.camera.entityToFollow.pos}]`, 8,0 + size * stringNum);

                if (this.state.camera.entityToFollow.health) {
                    stringNum++;
                    ctx.fillText(`health:${this.state.camera.entityToFollow.health}/${this.state.camera.entityToFollow.maxHealth}`, 8,0 + size * stringNum);
                }

                stringNum++;
                ctx.fillText(`type:${this.state.camera.entityToFollow.type}`, 8,0 + size * stringNum);

                stringNum++;
                ctx.fillText(`frames: curr:${this.state.camera.entityToFollow.animation.currentFrame} framesToNext:${this.state.camera.entityToFollow.animation.frameCount}/${this.state.camera.entityToFollow.animation.framesToChange}`, 8,0 + size * stringNum);

                stringNum++;
                ctx.fillText(`state:${this.state.camera.entityToFollow.state}`, 8,0 + size *  stringNum);

                stringNum++;
                ctx.fillText(`direction:${this.state.camera.entityToFollow.direction}`, 8,0 + size *  stringNum);
            }
        }

        if (this.state.entities) {

            if (this.state.hoverEntity) {
                stringNum++;

                stringNum++;
                ctx.fillText(`hoverEntity:`, 5,0 + size *  stringNum);

                stringNum++;
                ctx.fillText(`pos:[${this.state.hoverEntity.pos}]`, 8,0 + size * stringNum);

                if (this.state.hoverEntity.type == "player") {
                    stringNum++;
                    ctx.fillText(`name:${this.state.hoverEntity.name}`, 8,0 + size *  stringNum);

                    stringNum++;
                    ctx.fillText(`health:${this.state.hoverEntity.health}/${this.state.hoverEntity.maxHealth}`, 8,0 + size *  stringNum);
                } else
                if (this.state.hoverEntity.type == "bullet") {
                    stringNum++;
                    ctx.fillText(`id:${this.state.hoverEntity.name}`, 8,0 + size *  stringNum);
                }

                stringNum++;
                ctx.fillText(`type:${this.state.hoverEntity.type}`, 8,0 + size *  stringNum);

                stringNum++;
                ctx.fillText(`frames: curr:${this.state.hoverEntity.animation.currentFrame} framesToNext:${this.state.hoverEntity.animation.frameCount}/${this.state.hoverEntity.animation.framesToChange}`, 8,0 + size *  stringNum);

                stringNum++;
                ctx.fillText(`state:${this.state.hoverEntity.state}`, 8,0 + size *  stringNum);

                stringNum++;
                ctx.fillText(`direction:${this.state.hoverEntity.direction}`, 8,0 + size *  stringNum);
            }
        }
    }

    playSound(sound) {
        this.audio.src = sound.get();
        this.audio.play();
    }

    keyboardPress(code,key) {
        //console.log(`[Game] event: Keyboard Press key: ${code}`)
        this.state.keyboardPress(code,key);

        switch (code) {

            case "Backquote": {
                if (this.isDebug) {
                    this.isDebug = false;
                }
                else {
                    this.isDebug = true;
                }
            }   
        }
    }
}