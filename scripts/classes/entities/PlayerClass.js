class Player extends Entity {
    constructor({name, team, type, pos, state, direction, health, maxHealth, data, textureName}) {
        super({type, pos, size:[80,80], state, direction, height: 2});

        this.textureName = textureName;

        this.name = name;
        this.team = team;

        this.health = health;
        this.maxHealth = maxHealth;
        
        this.data = data;

        this.healthBar = new BarUI({
            pos: [-40, -60],
            size: [80,15],
            max: maxHealth,
            value: health,
            color:`rgba(200,0,0,0.7)`,
            emptyColor:`rgba(200,0,0,0.4)`,
            text:`${health}/${maxHealth}`,
            fontSize: 10
        });

        this.cooldownBar = new BarUI({
            pos: [-40,-60],
            size: [80,15],
            max: data.cooldowns.maxShot,
            value: data.cooldowns.shot,
            color:`rgba(255,100,0,0.7)`,
            emptyColor:`rgba(255,50,0,0.4)`,
            text:`${data.cooldowns.shot}/${data.cooldowns.maxShot}`,
            fontSize: 10
        })

        this.textures = {
            moving: {
                right:[
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","r0"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","r1"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","r2"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","r3"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","r4"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","r5")
                ],
                left:[
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","l0"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","l1"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","l2"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","l3"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","l4"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","l5")
                ]
            },

            idle: {
                right: [
                    new Texture("entities",`${this.type}_${this.textureName}`,"idle","r0"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"idle","r1"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"idle","r2"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"idle","r3")
                ],
                left: [
                    new Texture("entities",`${this.type}_${this.textureName}`,"idle","l0"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"idle","l1"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"idle","l2"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"idle","l3")
                ]
            }
        }
    }

    setPos(pos) {
        if (this.pos[0] < pos[0]) {
            if (this.direction != DIRECTION.RIGHT)
                this.animation.isReverse = true;
            else
                this.animation.isReverse = false;
        } else {
            if (this.direction != DIRECTION.LEFT)
                this.animation.isReverse = true;
            else
                this.animation.isReverse = false;
        }

        this.state = "moving";
        this.timeToChangeState = 10;

        super.setPos(pos);
    }

    update() {
        super.update();
    }

    setSkin(name) {
        this.textureName = name;

        this.textures = {
            moving: {
                right:[
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","r0"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","r1"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","r2"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","r3"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","r4"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","r5")
                ],
                left:[
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","l0"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","l1"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","l2"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","l3"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","l4"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"moving","l5")
                ]
            },

            idle: {
                right: [
                    new Texture("entities",`${this.type}_${this.textureName}`,"idle","r0"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"idle","r1"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"idle","r2"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"idle","r3")
                ],
                left: [
                    new Texture("entities",`${this.type}_${this.textureName}`,"idle","l0"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"idle","l1"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"idle","l2"),
                    new Texture("entities",`${this.type}_${this.textureName}`,"idle","l3")
                ]
            }
        }
    }

    render(func) {
        super.render(func);
    }

    getTexture() {
        return this.textures[this.state][this.direction][this.animation.currentFrame].get();
    }

    updateFrame() {
        super.updateFrame();

        if (!this.animation.isReverse) {
            if (this.animation.currentFrame > this.textures[this.state][this.direction].length - 1) {
                this.animation.currentFrame = 0;
            }
        } else {
            if (this.animation.currentFrame < 0) {
                this.animation.currentFrame = this.textures[this.state][this.direction].length - 1;
            }
        }
    }
    
    renderUI() {
        super.renderUI();
        this.cooldownBar.pos[0] = -this.size[0] / 2 * game.state.camera.FOV;
        this.cooldownBar.pos[1] = (-this.size[1] / 2 - 5) * game.state.camera.FOV;

        this.cooldownBar.size[0] = this.size[0] * game.state.camera.FOV;
        this.cooldownBar.size[1] = 12 * game.state.camera.FOV;

        const currReloadProgress = Math.round((this.data.cooldowns.maxShot - this.data.cooldowns.shot) / this.data.cooldowns.maxShot * 100)

        this.cooldownBar.fontSize = 8 * game.state.camera.FOV;
        this.cooldownBar.progress.current = this.data.cooldowns.maxShot - this.data.cooldowns.shot;
        this.cooldownBar.progress.max = this.data.cooldowns.maxShot;
        this.cooldownBar.text = `${currReloadProgress}%`;

        let changeFromDefault = 0;

        if (currReloadProgress != 100)
            this.cooldownBar.render();
        else
            changeFromDefault = 6;

        ctx.font = `${15 * game.state.camera.FOV}px arial`;
        ctx.fillStyle = `white`;
        ctx.textAlign = ALIGN.CENTER;
        ctx.fillText(this.name, 0 * game.state.camera.FOV, (-this.size[1] / 2 - 18 + changeFromDefault) * game.state.camera.FOV);
        ctx.fillText(this.data.serverState, 0 * game.state.camera.FOV, (-this.size[1] / 2 + 20) * game.state.camera.FOV);
        ctx.textAlign = ALIGN.LEFT;

        this.healthBar.pos[0] = -this.size[0] / 2 * game.state.camera.FOV;
        this.healthBar.pos[1] = (-this.size[1] / 2 - 17 + changeFromDefault) * game.state.camera.FOV;

        this.healthBar.size[0] = this.size[0] * game.state.camera.FOV;
        this.healthBar.size[1] = 12 * game.state.camera.FOV;

        this.healthBar.fontSize = 8 * game.state.camera.FOV;
        this.healthBar.progress.current = this.health;
        this.healthBar.progress.max = this.maxHealth;
        this.healthBar.text = `${this.health}/${this.maxHealth}`;
        this.healthBar.render();
    }
}