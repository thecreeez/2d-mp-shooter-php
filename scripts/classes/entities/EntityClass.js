class Entity {
    constructor({type, pos, size, state, direction, height}) {
        this.type = type;
        this.pos = [Number(pos[0]),Number(pos[1])];
        this.size = size;
        this.state = state;

        this.direction = direction;

        this.height = height;

        this.animation = {
            currentFrame: 0,
            
            frameStateCount: 0,
            frameToChangeState: 0,

            frameCount: 0,
            framesToChange: 10,

            isReverse: false,
        }

        this.textures = [
            new Texture("maps","dev","wall","0"),
        ];
    }

    update() {
        if (this.animation.frameStateCount >= this.animation.frameToChangeState && this.state != "idle") {
            //this.setState("idle");
        }
    }

    setState(state) {
        this.state = state;
        this.animation.currentFrame = 0;
    }

    render(func) {
        const camPos = game.state.camera.pos;
        const ownFOV = game.state.camera.FOV * ((this.height + 10) / 10);

        ctx.translate((this.pos[0] - camPos[0]) * game.state.camera.FOV, (this.pos[1] - camPos[1]) * game.state.camera.FOV);

        ctx.fillStyle = `rgba(0,0,0,0.5)`

        ctx.beginPath();
        ctx.ellipse(0 * game.state.camera.FOV,this.size[1] / 2 * game.state.camera.FOV, this.size[0] / 2 * game.state.camera.FOV, this.size[1] / 8 * game.state.camera.FOV, 0, 0, Math.PI * 2)
        ctx.fill();

        ctx.translate(-(this.pos[0] - camPos[0]) * game.state.camera.FOV, -(this.pos[1] - camPos[1]) * game.state.camera.FOV);
        ctx.translate((this.pos[0] - camPos[0]) * game.state.camera.FOV, (this.pos[1] - camPos[1]) * game.state.camera.FOV);

        this.modifyTexture();

        try {
            ctx.drawImage(this.getTexture(),
                -this.size[0] / 2 * game.state.camera.FOV, -this.size[1] / 2 * game.state.camera.FOV, 
                this.size[0] * game.state.camera.FOV, this.size[1] * game.state.camera.FOV
            );
        } catch(e) {
            this.animation.currentFrame = 0;
            
            ctx.drawImage(this.getTexture(),
                -this.size[0] / 2 * game.state.camera.FOV, -this.size[1] / 2 * game.state.camera.FOV, 
                this.size[0] * game.state.camera.FOV, this.size[1] * game.state.camera.FOV
            );
        }

        this.resetModify();

        if (CONFIG.isDebug && CONFIG.debug.drawHitboxes) {
            ctx.strokeStyle = `white`;
            ctx.strokeRect(
                -this.size[0] / 2 * game.state.camera.FOV, -this.size[1] / 2 * game.state.camera.FOV, 
                this.size[0] * game.state.camera.FOV, this.size[1] * game.state.camera.FOV)
        }

        if (func)
            func();

        this.renderUI();

        ctx.translate(-(this.pos[0] - camPos[0]) * game.state.camera.FOV, -(this.pos[1] - camPos[1]) * game.state.camera.FOV);
        this.updateFrame();
    }

    modifyTexture() {

    }

    resetModify() {
        
    }

    getTexture() {
        return this.textures[this.animation.currentFrame].get();
    }

    setPos(pos) {
        this.pos = pos;
    }

    updateFrame() {
        if (this.animation.frameCount >= this.animation.framesToChange) {
            this.animation.frameCount = 0;

            if (!this.animation.isReverse)
                this.animation.currentFrame++;
            else
                this.animation.currentFrame--;
        }
    }

    renderUI() {
        if (CONFIG.isDebug && CONFIG.debug.drawEntityPos) {
            let fontSize = 15 * game.state.camera.FOV;
            ctx.textAlign = ALIGN.LEFT;
            ctx.fillStyle = 'white';
            ctx.font = `${fontSize}px arial`;
            ctx.fillText(this.pos, -this.size[0] / 2 * game.state.camera.FOV, this.size[1] / 2 * game.state.camera.FOV - fontSize / 2)
        }
    }
}