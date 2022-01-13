class GameObject {
    constructor({name,mapName,pos,size,height,color,isBack}) {
        this.texture = new Texture("maps",mapName,name,0);

        this.pos = pos;
        this.size = size;

        this.height = height;
        this.color = color;

        this.isBack = isBack;
    }

    render() {
        const camPos = game.state.camera.pos;
        const ownFOV = game.state.camera.FOV * (this.height + 10) / 10;

        ctx.translate((this.pos[0] - camPos[0]) * ownFOV, (this.pos[1] - camPos[1])  * ownFOV);
        
        ctx.drawImage(this.texture.get(), -this.size[0] / 2 * ownFOV, -this.size[1] / 2 * ownFOV, this.size[0] * ownFOV, this.size[1] * ownFOV)

        if (game.isDebug) {
            ctx.strokeRect(-this.size[0] / 2 * ownFOV, -this.size[1] / 2 * ownFOV, this.size[0] * ownFOV, this.size[1] * ownFOV)
        }

        ctx.translate(-((this.pos[0] - camPos[0]) * ownFOV), -((this.pos[1] - camPos[1])  * ownFOV));
    }

    renderShadow() {
        const camPos = game.state.camera.pos;
        const shadowSize = (this.height + 10) / 10 * 12;

        ctx.translate((this.pos[0] - camPos[0]) * game.state.camera.FOV, (this.pos[1] - camPos[1])  * game.state.camera.FOV);
        ctx.fillStyle = `rgba(0,0,0,0.4)`
        ctx.fillRect((-this.size[0] / 2 - shadowSize)  * game.state.camera.FOV, (-this.size[1] / 2 - shadowSize)  * game.state.camera.FOV, (this.size[0] + shadowSize * 2) * game.state.camera.FOV, (this.size[1] + shadowSize * 2)  * game.state.camera.FOV)

        ctx.translate(-((this.pos[0] - camPos[0]) * game.state.camera.FOV), -((this.pos[1] - camPos[1])  * game.state.camera.FOV));
    }

    renderRight() {
        const camPos = game.state.camera.pos;
        const ownFOV = game.state.camera.FOV * (this.height + 10) / 10;

        ctx.translate((this.pos[0] - camPos[0]) * game.state.camera.FOV, (this.pos[1] - camPos[1]) * game.state.camera.FOV);

        ctx.beginPath();
        ctx.moveTo(this.size[0] / 2 * game.state.camera.FOV,-this.size[1] / 2 * game.state.camera.FOV);
        ctx.lineTo(this.size[0] / 2 * game.state.camera.FOV,this.size[1] / 2 * game.state.camera.FOV);

        ctx.translate(-(this.pos[0] - camPos[0]) * game.state.camera.FOV, -(this.pos[1] - camPos[1]) * game.state.camera.FOV);
        ctx.translate((this.pos[0] - camPos[0]) * ownFOV, (this.pos[1] - camPos[1])  * ownFOV);

        ctx.lineTo(this.size[0] / 2 * ownFOV,this.size[1] / 2 * ownFOV);
        ctx.lineTo(this.size[0] / 2 * ownFOV,-this.size[1] / 2 * ownFOV);

        ctx.fill();
        ctx.strokeStyle = `black`;
        ctx.stroke();

        ctx.translate(-((this.pos[0] - camPos[0]) * ownFOV), -((this.pos[1] - camPos[1])  * ownFOV));
    }

    renderLeft() {
        const camPos = game.state.camera.pos;
        const ownFOV = game.state.camera.FOV * (this.height + 10) / 10;

        ctx.translate((this.pos[0] - camPos[0]) * game.state.camera.FOV, (this.pos[1] - camPos[1]) * game.state.camera.FOV);
            
        ctx.beginPath();

        ctx.moveTo(-this.size[0] / 2 * game.state.camera.FOV,-this.size[1] / 2 * game.state.camera.FOV);
        ctx.lineTo(-this.size[0] / 2 * game.state.camera.FOV,this.size[1] / 2 * game.state.camera.FOV);

        ctx.translate(-(this.pos[0] - camPos[0]) * game.state.camera.FOV, -(this.pos[1] - camPos[1]) * game.state.camera.FOV);
        ctx.translate((this.pos[0] - camPos[0]) * ownFOV, (this.pos[1] - camPos[1])  * ownFOV);

        ctx.lineTo(-this.size[0] / 2 * ownFOV,this.size[1] / 2 * ownFOV);
        ctx.lineTo(-this.size[0] / 2 * ownFOV,-this.size[1] / 2 * ownFOV);

        ctx.fill();
        ctx.strokeStyle = `black`;
        ctx.stroke();

        ctx.translate(-((this.pos[0] - camPos[0]) * ownFOV), -((this.pos[1] - camPos[1])  * ownFOV));
    }

    renderBot() {
        const camPos = game.state.camera.pos;
        const ownFOV = game.state.camera.FOV * (this.height + 10) / 10;

        ctx.translate((this.pos[0] - camPos[0]) * game.state.camera.FOV, (this.pos[1] - camPos[1]) * game.state.camera.FOV);

        ctx.beginPath();

        ctx.moveTo(this.size[0] / 2 * game.state.camera.FOV,this.size[1] / 2 * game.state.camera.FOV);
        ctx.lineTo(-this.size[0] / 2 * game.state.camera.FOV,this.size[1] / 2 * game.state.camera.FOV);

        ctx.translate(-(this.pos[0] - camPos[0]) * game.state.camera.FOV, -(this.pos[1] - camPos[1]) * game.state.camera.FOV);
        ctx.translate((this.pos[0] - camPos[0]) * ownFOV, (this.pos[1] - camPos[1])  * ownFOV);

        ctx.lineTo(-this.size[0] / 2 * ownFOV,this.size[1] / 2 * ownFOV);
        ctx.lineTo(this.size[0] / 2 * ownFOV,this.size[1] / 2 * ownFOV);

        ctx.fill();
        ctx.strokeStyle = `black`;
        ctx.stroke();

        ctx.translate(-((this.pos[0] - camPos[0]) * ownFOV), -((this.pos[1] - camPos[1])  * ownFOV));
    }

    renderTop() {
        const camPos = game.state.camera.pos;
        const ownFOV = game.state.camera.FOV * (this.height + 10) / 10;

        ctx.translate((this.pos[0] - camPos[0]) * game.state.camera.FOV, (this.pos[1] - camPos[1]) * game.state.camera.FOV);
        ctx.beginPath();

        ctx.moveTo(this.size[0] / 2 * game.state.camera.FOV,-this.size[1] / 2 * game.state.camera.FOV);
        ctx.lineTo(-this.size[0] / 2 * game.state.camera.FOV,-this.size[1] / 2 * game.state.camera.FOV);

        ctx.translate(-(this.pos[0] - camPos[0]) * game.state.camera.FOV, -(this.pos[1] - camPos[1]) * game.state.camera.FOV);
        ctx.translate((this.pos[0] - camPos[0]) * ownFOV, (this.pos[1] - camPos[1])  * ownFOV);

        ctx.lineTo(-this.size[0] / 2 * ownFOV,-this.size[1] / 2 * ownFOV);
        ctx.lineTo(this.size[0] / 2 * ownFOV,-this.size[1] / 2 * ownFOV);

        ctx.fill()

        ctx.translate(-((this.pos[0] - camPos[0]) * ownFOV), -((this.pos[1] - camPos[1])  * ownFOV));
        ctx.translate((this.pos[0] - camPos[0]) * game.state.camera.FOV, (this.pos[1] - camPos[1]) * game.state.camera.FOV);

        ctx.fill();
        ctx.strokeStyle = `black`;
        ctx.stroke();

        ctx.translate(-((this.pos[0] - camPos[0]) * game.state.camera.FOV), -((this.pos[1] - camPos[1])  * game.state.camera.FOV));
    }

    renderWalls() {
        const camPos = game.state.camera.pos;
        const ownFOV = game.state.camera.FOV * (this.height + 10) / 10;
    
        if (this.color) ctx.fillStyle = this.color;
        else ctx.fillStyle = `red`;
    
        if (camPos[0] > this.pos[0]) {
            this.renderLeft();
            this.renderRight();
        } else {
            this.renderRight();
            this.renderLeft();
        }

        if (camPos[1] > this.pos[1]) {
            this.renderTop();
            this.renderBot();
        } else {
            this.renderBot();
            this.renderTop();
        }        
    }
}