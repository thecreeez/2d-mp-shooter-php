class Light extends Entity {
    constructor({pos, size, state, direction, height, power}) {
        super({type:"light",pos,size,state,direction,height});

        this.power = power;
    }

    render() {
        const camPos = game.state.camera.pos;
        const ownFOV = game.state.camera.FOV * ((this.height + 10) / 10);

        ctx.translate((this.pos[0] - camPos[0]) * game.state.camera.FOV, (this.pos[1] - camPos[1]) * game.state.camera.FOV);

        ctx.fillStyle = `rgba(255,255,255,1)`;
        ctx.fillRect(0, 0, this.size[0], this.size[1]);

        ctx.translate(-(this.pos[0] - camPos[0]) * game.state.camera.FOV, -(this.pos[1] - camPos[1]) * game.state.camera.FOV);

        //ctx.fillStyle = `rgba(255,255,255,${this.power / 100})`;
        //ctx.fillRect(centerPosLight[0], centerPosLight[1], this.size[0] * this.power / 10, this.size[1] * this.power / 10);
    }
}